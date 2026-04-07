/**
 * Onboarding router — handles the call forwarding activation flow.
 *
 * Data source: Google Sheets ("leads" sheet in "Call4li automation").
 * All state writes are performed by n8n after Twilio verification.
 * This router is READ + TRIGGER only:
 *   - getStatus  → reads business row from Sheets
 *   - activate   → triggers n8n webhook to place the Twilio test call
 *
 * Procedures:
 *  getStatus  - get current onboarding state for a business (from Sheets)
 *  activate   - user tapped "Activate"; triggers n8n to place test call
 */

import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "../_core/trpc";
import { getBusinessByClientId } from "../sheets";

export const onboardingRouter = router({
  /** Get the current onboarding state for a business (reads from Google Sheets) */
  getStatus: publicProcedure
    .input(z.object({ clientId: z.string().min(1) }))
    .query(async ({ input }) => {
      let business;
      try {
        business = await getBusinessByClientId(input.clientId);
      } catch (err) {
        console.error("[Onboarding] Failed to read Sheets:", err);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "שגיאה בטעינת הנתונים. אנא נסה שוב.",
        });
      }

      if (!business) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "הקישור אינו תקין. אנא צור קשר עם התמיכה.",
        });
      }

      return {
        clientId: business.businessId,
        name: business.name,
        businessName: business.businessName,
        phoneNumber: business.phone,
        forliNumber: business.forliNumber,
        state: business.onboardingState,
        signupStep: business.signupStep,
        stepMessage: business.stepMessage,
        // Derive verifiedCodes from state for the UI
        verifiedCodes: deriveVerifiedCodes(business.onboardingState),
      };
    }),

  /**
   * Called when the user taps "Activate" and is about to dial a code.
   * Fires a webhook to n8n which will:
   *   1. Wait 10 seconds
   *   2. Place a Twilio test call to the user's number
   *   3. Detect if the call was forwarded
   *   4. Update the sheet status accordingly
   *   5. Send a WhatsApp success/fail message
   */
  activate: publicProcedure
    .input(
      z.object({
        clientId: z.string().min(1),
        code: z.enum(["004", "67", "62", "61"]),
      }),
    )
    .mutation(async ({ input }) => {
      let business;
      try {
        business = await getBusinessByClientId(input.clientId);
      } catch (err) {
        console.error("[Onboarding] Failed to read Sheets:", err);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "שגיאה בטעינת הנתונים. אנא נסה שוב.",
        });
      }

      if (!business) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "הקישור אינו תקין.",
        });
      }

      // Notify n8n to start the verification flow (fire and forget)
      const n8nWebhookUrl = process.env.N8N_ONBOARDING_WEBHOOK_URL;
      if (n8nWebhookUrl) {
        fetch(n8nWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event: "activation_triggered",
            client_id: input.clientId,
            phone_number: business.phone,
            forli_number: business.forliNumber,
            code_dialed: input.code,
            timestamp: new Date().toISOString(),
          }),
        }).catch(err =>
          console.error("[Onboarding] Failed to notify n8n:", err),
        );
      } else {
        console.warn(
          "[Onboarding] N8N_ONBOARDING_WEBHOOK_URL not set — skipping test call trigger",
        );
      }

      // Return the expected next state so the UI can optimistically show "Awaiting verification"
      const nextState = awaitingStateForCode(input.code);
      return { success: true, state: nextState };
    }),
});

// ─── Helpers ─────────────────────────────────────────────────────────────────

import type { OnboardingState } from "../sheets";

function awaitingStateForCode(code: "004" | "67" | "62" | "61"): OnboardingState {
  const map: Record<string, OnboardingState> = {
    "004": "AWAITING_004",
    "67": "AWAITING_67",
    "62": "AWAITING_6762",
    "61": "AWAITING_676261",
  };
  return map[code];
}

/** Derive which codes have been verified from the current state */
function deriveVerifiedCodes(state: OnboardingState): string[] {
  switch (state) {
    case "ACTIVE_NO_ANSWER":
      return ["67"];
    case "ACTIVE_EXTENDED":
      return ["67", "62"];
    case "ACTIVE_FULL":
      return ["004"];
    case "ACTIVE_COMPLETE":
      return ["67", "62", "61"];
    default:
      return [];
  }
}
