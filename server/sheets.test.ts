/**
 * Validates that the Google Sheets API key can read the leads sheet.
 */
import { describe, it, expect } from "vitest";
import { fetchLeadsRows, parseState } from "./sheets";

describe("Google Sheets integration", () => {
  it("fetches rows from the leads sheet", async () => {
    const rows = await fetchLeadsRows();
    expect(Array.isArray(rows)).toBe(true);
    expect(rows.length).toBeGreaterThan(0);
    // First data row should have a business_id in column 0
    const firstRow = rows[0];
    expect(firstRow[0]).toBeTruthy();
  }, 15_000);

  it("parses known status values correctly", () => {
    expect(parseState("check")).toBe("NEW");
    expect(parseState("page_opened")).toBe("NEW");
    expect(parseState("active_full")).toBe("ACTIVE_FULL");
    expect(parseState("failed")).toBe("FAILED");
    expect(parseState(undefined)).toBe("NEW");
    expect(parseState("unknown_value")).toBe("NEW");
  });
});
