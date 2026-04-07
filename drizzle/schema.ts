import { boolean, int, json, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Onboarding state machine for each business client.
 *
 * States:
 *  NEW              - client link opened, nothing dialed yet
 *  AWAITING_004     - client dialed **004*, waiting for Twilio verification
 *  AWAITING_67      - fallback: client dialed **67*, waiting for Twilio verification
 *  AWAITING_6762    - **67* confirmed, client dialed **62*, waiting for verification
 *  AWAITING_676261  - **67*+**62* confirmed, client dialed **61*, waiting for verification
 *  ACTIVE_FULL      - **004* verified — all scenarios covered
 *  ACTIVE_NO_ANSWER - only **67* (forward on no answer) confirmed
 *  ACTIVE_EXTENDED  - **67* + **62* (no answer + unreachable) confirmed
 *  ACTIVE_COMPLETE  - all 3 codes confirmed (67+62+61)
 *  FAILED           - no forwarding detected after all attempts
 */
export const onboardingStates = [
  "NEW",
  "AWAITING_004",
  "AWAITING_67",
  "AWAITING_6762",
  "AWAITING_676261",
  "ACTIVE_FULL",
  "ACTIVE_NO_ANSWER",
  "ACTIVE_EXTENDED",
  "ACTIVE_COMPLETE",
  "FAILED",
] as const;

export type OnboardingState = (typeof onboardingStates)[number];

export const businesses = mysqlTable("businesses", {
  id: int("id").autoincrement().primaryKey(),
  /** Unique client ID used in the onboarding URL: /onboard/:clientId */
  clientId: varchar("clientId", { length: 64 }).notNull().unique(),
  /** Business display name */
  name: text("name"),
  /** The phone number to forward calls from (business owner's number) */
  phoneNumber: varchar("phoneNumber", { length: 20 }),
  /** The Forli forwarding number (destination) */
  forliNumber: varchar("forliNumber", { length: 20 }),
  /** Current onboarding state */
  onboardingState: mysqlEnum("onboardingState", onboardingStates).default("NEW").notNull(),
  /** Which forwarding codes have been verified (JSON array: ["67","62","61"]) */
  verifiedCodes: json("verifiedCodes").$type<string[]>().default([]),
  /** Carrier name if user selected one */
  carrier: varchar("carrier", { length: 64 }),
  /** Whether the carrier is known to block **004* */
  carrierBlocks004: boolean("carrierBlocks004").default(false),
  /** Timestamps */
  onboardingStartedAt: timestamp("onboardingStartedAt"),
  onboardingCompletedAt: timestamp("onboardingCompletedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Business = typeof businesses.$inferSelect;
export type InsertBusiness = typeof businesses.$inferInsert;

/**
 * Tracks each Twilio verification attempt.
 * Used to detect if a test call was forwarded and to limit retry abuse.
 */
export const onboardingAttempts = mysqlTable("onboarding_attempts", {
  id: int("id").autoincrement().primaryKey(),
  businessId: int("businessId").notNull(),
  /** Which code was being verified: "004" | "67" | "62" | "61" */
  codeAttempted: varchar("codeAttempted", { length: 10 }).notNull(),
  /** Twilio call SID of the outbound test call */
  twilioCallSid: varchar("twilioCallSid", { length: 64 }),
  /** Result of the verification */
  result: mysqlEnum("result", ["pending", "success", "failed"]).default("pending").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  resolvedAt: timestamp("resolvedAt"),
});

export type OnboardingAttempt = typeof onboardingAttempts.$inferSelect;
export type InsertOnboardingAttempt = typeof onboardingAttempts.$inferInsert;