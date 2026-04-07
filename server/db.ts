import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, businesses, onboardingAttempts, users, type InsertBusiness, type InsertOnboardingAttempt, type OnboardingState } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ─── Onboarding helpers ────────────────────────────────────────────────────

/** Get a business by its clientId (used in /onboard/:clientId URL) */
export async function getBusinessByClientId(clientId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(businesses).where(eq(businesses.clientId, clientId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

/** Get a business by its numeric id */
export async function getBusinessById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(businesses).where(eq(businesses.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

/** Create or update a business record */
export async function upsertBusiness(data: InsertBusiness) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(businesses).values(data).onDuplicateKeyUpdate({
    set: {
      name: data.name,
      phoneNumber: data.phoneNumber,
      forliNumber: data.forliNumber,
      carrier: data.carrier,
      carrierBlocks004: data.carrierBlocks004,
      onboardingState: data.onboardingState,
      verifiedCodes: data.verifiedCodes,
      onboardingStartedAt: data.onboardingStartedAt,
      onboardingCompletedAt: data.onboardingCompletedAt,
      updatedAt: new Date(),
    },
  });
}

/** Update the onboarding state and verified codes for a business */
export async function updateBusinessOnboardingState(
  clientId: string,
  state: OnboardingState,
  verifiedCodes?: string[],
  completedAt?: Date,
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db
    .update(businesses)
    .set({
      onboardingState: state,
      ...(verifiedCodes !== undefined ? { verifiedCodes } : {}),
      ...(completedAt ? { onboardingCompletedAt: completedAt } : {}),
      updatedAt: new Date(),
    })
    .where(eq(businesses.clientId, clientId));
}

/** Create a new onboarding attempt record */
export async function createOnboardingAttempt(data: InsertOnboardingAttempt) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(onboardingAttempts).values(data);
  return result;
}

/** Update an onboarding attempt result */
export async function resolveOnboardingAttempt(
  id: number,
  result: "success" | "failed",
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db
    .update(onboardingAttempts)
    .set({ result, resolvedAt: new Date() })
    .where(eq(onboardingAttempts.id, id));
}

/** Get the latest pending attempt for a business */
export async function getLatestPendingAttempt(businessId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db
    .select()
    .from(onboardingAttempts)
    .where(eq(onboardingAttempts.businessId, businessId))
    .orderBy(onboardingAttempts.createdAt)
    .limit(20);
  return result.filter(a => a.result === "pending").pop();
}

/** Count how many attempts a business has made (for rate limiting) */
export async function countOnboardingAttempts(businessId: number) {
  const db = await getDb();
  if (!db) return 0;
  const result = await db
    .select()
    .from(onboardingAttempts)
    .where(eq(onboardingAttempts.businessId, businessId));
  return result.length;
}
