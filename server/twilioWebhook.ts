/**
 * Twilio Validation Webhook
 *
 * This Express router handles two things:
 *
 * 1. POST /api/twilio/call-status
 *    Called by n8n after placing a test call.
 *    n8n sends { client_id, call_sid, success: true|false, code_dialed }
 *    This endpoint:
 *      - Receives the validation result from n8n
 *      - Sends a WhatsApp message via Green API (success or fail)
 *      - Returns 200 OK so n8n knows it was received
 *
 * 2. POST /api/twilio/incoming
 *    Called by Twilio when a call arrives at Forli's number.
 *    Twilio sends standard TwiML params (From, To, CallSid, etc.)
 *    This endpoint:
 *      - Detects if the incoming call is a test call (From = Twilio test number)
 *      - Notifies n8n that the forwarding was detected
 *      - Returns TwiML to hang up the test call
 */

import { Router, Request, Response } from "express";

export const twilioWebhookRouter = Router();

// ─── Green API helper ─────────────────────────────────────────────────────────

const GREEN_API_INSTANCE_ID = "7105422200";
const GREEN_API_TOKEN = "740b437ffa5f49e4970f80cd44f9a1930ff7d3755fed4d089e";
const GREEN_API_BASE = `https://api.green-api.com/waInstance${GREEN_API_INSTANCE_ID}`;

/**
 * Send a WhatsApp message via Green API.
 * @param phone - phone number in international format without + (e.g. "972526752904")
 * @param message - text message to send
 */
async function sendWhatsApp(phone: string, message: string): Promise<void> {
  // Green API expects chatId in format: 972XXXXXXXXX@c.us
  const normalized = phone.replace(/^\+/, "").replace(/^0/, "972");
  const chatId = `${normalized}@c.us`;

  const url = `${GREEN_API_BASE}/sendMessage/${GREEN_API_TOKEN}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chatId, message }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Green API error ${res.status}: ${body}`);
  }

  const json = await res.json();
  console.log(`[WhatsApp] Sent to ${chatId}:`, json);
}

// ─── Route 1: Validation result from n8n ─────────────────────────────────────

/**
 * POST /api/twilio/call-status
 *
 * Called by n8n after Twilio test call completes.
 * Body: {
 *   client_id: string,       // e.g. "C067"
 *   phone_number: string,    // user's phone, e.g. "972526752904"
 *   business_name: string,   // e.g. "שמואל מרגלית"
 *   call_sid: string,        // Twilio call SID
 *   success: boolean,        // true = forwarding detected, false = not detected
 *   code_dialed: string,     // "004" | "67" | "62" | "61"
 *   fallback_url?: string,   // URL for the 3-code fallback page (only on failure)
 * }
 */
twilioWebhookRouter.post("/call-status", async (req: Request, res: Response) => {
  const {
    client_id,
    phone_number,
    business_name,
    call_sid,
    success,
    code_dialed,
    fallback_url,
  } = req.body;

  console.log(
    `[Twilio Validation] client=${client_id} code=${code_dialed} success=${success} call_sid=${call_sid}`,
  );

  if (!phone_number) {
    console.error("[Twilio Validation] Missing phone_number in request body");
    res.status(400).json({ error: "Missing phone_number" });
    return;
  }

  try {
    if (success) {
      // ✅ Forwarding detected — send success WhatsApp
      const name = business_name || "שלום";
      let message: string;

      if (code_dialed === "004") {
        message =
          `✅ *${name}, פורלי מוכנה לעבוד!*\n\n` +
          `העברת השיחות הופעלה בהצלחה 🎉\n\n` +
          `כעת כל שיחה שלא נענית, תפוסה, או מחוץ לטווח תועבר אוטומטית לפורלי.\n\n` +
          `_פורלי תענה ללקוחות שלך 24/7 — גם כשאתה לא זמין._`;
      } else {
        const codeNames: Record<string, string> = {
          "67": "אי-מענה",
          "62": "מחוץ לטווח",
          "61": "תפוסה",
        };
        const codeName = codeNames[code_dialed] ?? code_dialed;
        message =
          `✅ *${name}, שלב ${code_dialed} הופעל בהצלחה!*\n\n` +
          `פורלי תענה עכשיו לשיחות ${codeName} 📞\n\n` +
          `המשך להפעיל את שאר הקודים כדי לקבל כיסוי מלא.`;
      }

      await sendWhatsApp(phone_number, message);
    } else {
      // ❌ Forwarding NOT detected — send fallback WhatsApp
      const name = business_name || "שלום";
      const url = fallback_url || "https://call4li.com";

      const message =
        `⚠️ *${name}, לא זיהינו העברת שיחות*\n\n` +
        `נראה שהספק שלך חוסם את קוד ה-004*.\n\n` +
        `לחץ על הקישור כדי להפעיל בשלושה שלבים פשוטים:\n` +
        `👉 ${url}\n\n` +
        `_זה לוקח פחות מ-30 שניות ✨_`;

      await sendWhatsApp(phone_number, message);
    }

    res.json({ received: true, success });
  } catch (err) {
    console.error("[Twilio Validation] Failed to send WhatsApp:", err);
    // Still return 200 so n8n doesn't retry — the call validation itself succeeded
    res.json({ received: true, success, whatsapp_error: String(err) });
  }
});

// ─── Route 2: Incoming call from Twilio (forwarding detection) ────────────────

/**
 * POST /api/twilio/incoming
 *
 * Called by Twilio when a call arrives at Forli's number.
 * If the call is from the Twilio test number, it means forwarding is working.
 * We notify n8n and hang up the call.
 *
 * Twilio standard params: From, To, CallSid, CallStatus, Direction
 */
twilioWebhookRouter.post("/incoming", async (req: Request, res: Response) => {
  const { From, To, CallSid, Direction } = req.body;

  const twilioTestNumber = process.env.TWILIO_TEST_NUMBER || "+972765996026";
  const normalizedFrom = (From || "").replace(/\s/g, "");
  const normalizedTest = twilioTestNumber.replace(/\s/g, "");

  const isTestCall =
    normalizedFrom === normalizedTest ||
    normalizedFrom === normalizedTest.replace("+", "") ||
    normalizedFrom.endsWith(normalizedTest.replace("+972", "0"));

  console.log(
    `[Twilio Incoming] From=${From} To=${To} CallSid=${CallSid} Direction=${Direction} isTestCall=${isTestCall}`,
  );

  if (isTestCall) {
    // Notify n8n that forwarding was detected
    const n8nCallbackUrl = process.env.N8N_CALL_DETECTED_WEBHOOK_URL;
    if (n8nCallbackUrl) {
      fetch(n8nCallbackUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "call_forwarded",
          call_sid: CallSid,
          from: From,
          to: To,
          timestamp: new Date().toISOString(),
        }),
      }).catch(err =>
        console.error("[Twilio Incoming] Failed to notify n8n:", err),
      );
    }

    // Hang up the test call with TwiML
    res.set("Content-Type", "text/xml");
    res.send(`<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Hangup/>
</Response>`);
  } else {
    // Real incoming call — let Forli handle it normally
    // Return empty TwiML (Forli's main call handler takes over)
    res.set("Content-Type", "text/xml");
    res.send(`<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <!-- Real call — handled by Forli's main IVR -->
</Response>`);
  }
});
