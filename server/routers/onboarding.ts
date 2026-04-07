/**
 * Onboarding router — handles the call forwarding activation flow.
 *
 * Procedures:
 *  getStatus       - get current onboarding state for a business
 *  activate        - mark that user dialed a code; triggers n8n to place test call
 *  verifyCallback  - called by n8n webhook when test call result is known
 *  setCarrier      - save carrier info and whether 004 is blocked
 */

import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "../_core/trpc";
import {
  getBusinessByClientId,
  updateBusinessOnboardingState,
  upsertBusiness,
  createOnboardingAttempt,
  countOnboardingAttempts,
} from "../db";
import type { OnboardingState } from "../../drizzle/schema";

const MAX_ATTEMPTS = 6; // rate limit per business

/** Determine the next AWAITING state based on which code was just dialed */
function awaitingStateForCode(code: "004" | "67" | "62" | "61"): OnboardingState {
  const map: Record<string, OnboardingState> = {
    "004": "AWAITING_004",
    "67": "AWAITING_67",
    "62": "AWAITING_6762",
    "61": "AWAITING_676261",
  };
  return map[code];
}

/** Determine the new ACTIVE state after a code is verified */
function activeStateAfterVerification(
  currentVerified: string[],
  newCode: string,
): OnboardingState {
  const verified = [...new Set([...currentVerified, newCode])];
  if (verified.includes("004")) return "ACTIVE_FULL";
  const has67 = verified.includes("67");
  const has62 = verified.includes("62");
  const has61 = verified.includes("61");
  if (has67 && has62 && has61) return "ACTIVE_COMPLETE";
  if (has67 && has62) return "ACTIVE_EXTENDED";
  if (has67) return "ACTIVE_NO_ANSWER";
  return "FAILED";
}

export const onboardingRouter = router({
  /** Get the current onboarding state for a business */
  getStatus: publicProcedure
    .input(z.object({ clientId: z.string() }))
    .query(async ({ input }) => {
      const business = await getBusinessByClientId(input.clientId);
      if (!business) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Business not found" });
      }
      return {
        clientId: business.clientId,
        name: business.name,
        phoneNumber: business.phoneNumber,
        forliNumber: business.forliNumber,
        state: business.onboardingState,
        verifiedCodes: (business.verifiedCodes as string[]) ?? [],
        carrier: business.carrier,
        carrierBlocks004: business.carrierBlocks004,
        onboardingStartedAt: business.onboardingStartedAt,
        onboardingCompletedAt: business.onboardingCompletedAt,
      };
    }),

  /** Called when the user taps "Activate" and dials a code */
  activate: publicProcedure
    .input(
      z.object({
        clientId: z.string(),
        code: z.enum(["004", "67", "62", "61"]),
      }),
    )
    .mutation(async ({ input }) => {
      const business = await getBusinessByClientId(input.clientId);
      if (!business) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Business not found" });
      }

      // Rate limit
      const attempts = await countOnboardingAttempts(business.id);
      if (attempts >= MAX_ATTEMPTS) {
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
          message: "יותר מדי ניסיונות. אנא צור קשר עם התמיכה.",
        });
      }

      // Update state to AWAITING
      const newState = awaitingStateForCode(input.code);
      await updateBusinessOnboardingState(input.clientId, newState);

      // Create attempt record
      await createOnboardingAttempt({
        businessId: business.id,
        codeAttempted: input.code,
        result: "pending",
      });

      // Notify n8n to place the test call (fire and forget)
      const n8nWebhookUrl = process.env.N8N_ONBOARDING_WEBHOOK_URL;
      if (n8nWebhookUrl && business.phoneNumber) {
        fetch(n8nWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event: "activation_triggered",
            client_id: input.clientId,
            phone_number: business.phoneNumber,
            forli_number: business.forliNumber,
            code_dialed: input.code,
            timestamp: new Date().toISOString(),
          }),
        }).catch(err => console.error("[Onboarding] Failed to notify n8n:", err));
      }

      return { success: true, state: newState };
    }),

  /** Called by n8n webhook when verification result is known */
  verifyCallback: publicProcedure
    .input(
      z.object({
        clientId: z.string(),
        code: z.string(),
        success: z.boolean(),
        twilioCallSid: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const business = await getBusinessByClientId(input.clientId);
      if (!business) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Business not found" });
      }

      const currentVerified = (business.verifiedCodes as string[]) ?? [];

      if (input.success) {
        const newVerified = [...new Set([...currentVerified, input.code])];
        const newState = activeStateAfterVerification(currentVerified, input.code);
        const isComplete = ["ACTIVE_FULL", "ACTIVE_COMPLETE"].includes(newState);
        await updateBusinessOnboardingState(
          input.clientId,
          newState,
          newVerified,
          isComplete ? new Date() : undefined,
        );
        return { success: true, state: newState, verifiedCodes: newVerified };
      } else {
        // Verification failed — move to FAILED only if no codes verified yet
        if (currentVerified.length === 0) {
          await updateBusinessOnboardingState(input.clientId, "FAILED");
          return { success: false, state: "FAILED" as OnboardingState, verifiedCodes: [] };
        }
        // Already has some codes — keep current active state
        return {
          success: false,
          state: business.onboardingState,
          verifiedCodes: currentVerified,
        };
      }
    }),

  /** Save carrier info */
  setCarrier: publicProcedure
    .input(
      z.object({
        clientId: z.string(),
        carrier: z.string(),
        carrierBlocks004: z.boolean(),
      }),
    )
    .mutation(async ({ input }) => {
      const business = await getBusinessByClientId(input.clientId);
      if (!business) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Business not found" });
      }
      await upsertBusiness({
        ...business,
        carrier: input.carrier,
        carrierBlocks004: input.carrierBlocks004,
        verifiedCodes: (business.verifiedCodes as string[]) ?? [],
      });
      return { success: true };
    }),
});
