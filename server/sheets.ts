/**
 * Google Sheets helper for the onboarding flow.
 *
 * Reads business data from the "leads" sheet in the "Call4li automation" spreadsheet.
 * All writes are performed by n8n — this module is READ-ONLY from the landing page side.
 *
 * Sheet columns (row 1 = headers):
 *  A: business_id   B: date        C: phone_key    D: first_response
 *  E: name          F: phone       G: business_name H: status
 *  I: last_called   J: chat_id     K: next_follow_up L: source
 *  M: description   N: opening_hours O: chat_history P: signup_step
 *  Q: step_message
 */

// Column indices (0-based)
const COL = {
  business_id: 0,
  date: 1,
  phone_key: 2,
  first_response: 3,
  name: 4,
  phone: 5,
  business_name: 6,
  status: 7,
  last_called: 8,
  chat_id: 9,
  next_follow_up: 10,
  source: 11,
  description: 12,
  opening_hours: 13,
  chat_history: 14,
  signup_step: 15,
  step_message: 16,
} as const;

export type OnboardingState =
  | "NEW"
  | "AWAITING_004"
  | "AWAITING_67"
  | "AWAITING_6762"
  | "AWAITING_676261"
  | "ACTIVE_NO_ANSWER"
  | "ACTIVE_EXTENDED"
  | "ACTIVE_FULL"
  | "ACTIVE_COMPLETE"
  | "FAILED";

export interface BusinessLead {
  businessId: string;
  name: string | null;
  phone: string | null;
  businessName: string | null;
  onboardingState: OnboardingState;
  signupStep: string | null;
  stepMessage: string | null;
  /** Forli's number to forward calls to */
  forliNumber: string;
}

/** Map raw sheet status values to our OnboardingState enum */
export function parseState(raw: string | undefined): OnboardingState {
  if (!raw) return "NEW";
  const s = raw.trim().toLowerCase();
  const map: Record<string, OnboardingState> = {
    new: "NEW",
    page_opened: "NEW",
    check: "NEW",
    awaiting_004: "AWAITING_004",
    awaiting_67: "AWAITING_67",
    awaiting_6762: "AWAITING_6762",
    awaiting_676261: "AWAITING_676261",
    active_no_answer: "ACTIVE_NO_ANSWER",
    active_extended: "ACTIVE_EXTENDED",
    active_full: "ACTIVE_FULL",
    active_complete: "ACTIVE_COMPLETE",
    failed: "FAILED",
  };
  return map[s] ?? "NEW";
}

/** Fetch all rows from the leads sheet via the Google Sheets REST API (API key auth) */
export async function fetchLeadsRows(): Promise<string[][]> {
  const apiKey = process.env.GOOGLE_SHEETS_API_KEY;
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const sheetName = process.env.GOOGLE_SHEETS_LEADS_TAB ?? "leads";

  if (!apiKey || !spreadsheetId) {
    throw new Error(
      "GOOGLE_SHEETS_API_KEY or GOOGLE_SHEETS_SPREADSHEET_ID env var is not set",
    );
  }

  const range = encodeURIComponent(`${sheetName}!A1:Q`);
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;

  const res = await fetch(url);

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Sheets API error ${res.status}: ${body}`);
  }

  const json = (await res.json()) as { values?: string[][] };
  // Skip header row (index 0)
  return (json.values ?? []).slice(1);
}

/** Look up a business by its business_id (the :client_id URL param) */
export async function getBusinessByClientId(
  clientId: string,
): Promise<BusinessLead | null> {
  const rows = await fetchLeadsRows();
  const row = rows.find(
    r =>
      (r[COL.business_id] ?? "").trim().toLowerCase() ===
      clientId.trim().toLowerCase(),
  );

  if (!row) return null;

  return {
    businessId: row[COL.business_id] ?? clientId,
    name: row[COL.name]?.trim() || null,
    phone: row[COL.phone]?.trim() || null,
    businessName: row[COL.business_name]?.trim() || null,
    onboardingState: parseState(row[COL.status]),
    signupStep: row[COL.signup_step]?.trim() || null,
    stepMessage: row[COL.step_message]?.trim() || null,
    forliNumber: "0535972420",
  };
}
