import { useState } from "react";
import { useParams } from "wouter";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { WavyBackground } from "@/components/ui/wavy-background";
import { motion, AnimatePresence } from "framer-motion";
import { trpc } from "@/lib/trpc";
import { Progress } from "@/components/ui/progress";
import {
  Phone,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldCheck,
  PhoneOff,
  PhoneMissed,
  PhoneCall,
} from "lucide-react";
// OnboardingState is inferred from the tRPC response
type OnboardingState =
  | "NEW"
  | "ACTIVE_NO_ANSWER"
  | "ACTIVE_EXTENDED"
  | "ACTIVE_FULL"
  | "ACTIVE_COMPLETE"
  | "FAILED";

// ─── Constants ────────────────────────────────────────────────────────────────

const FORLI_MASCOT = "https://d2xsxph8kpxj0f.cloudfront.net/310519663330217393/VZvahsqxvigDNCtzbEoTYw/forli_no_bg_silver_39b12de6.png";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FallbackStep {
  code: "67" | "62" | "61";
  label: string;
  description: string;
  consequence: string;
  icon: React.ElementType;
  color: string;
  awaitingState?: OnboardingState;
}

const FALLBACK_STEPS: FallbackStep[] = [
  {
    code: "67",
    label: "העברה כשאין מענה",
    description: "כשאתה לא עונה לשיחה — פורלי תענה במקומך",
    consequence: "ללא קוד זה פורלי לא תוכל לענות על שיחות שלא נענו",
    icon: PhoneMissed,
    color: "#4AEADC",
  },
  {
    code: "62",
    label: "העברה כשאין קליטה",
    description: "כשהטלפון כבוי או ללא קליטה — פורלי תענה",
    consequence: "ללא קוד זה לקוחות יקבלו שגיאה כשאתה לא מחובר",
    icon: PhoneOff,
    color: "#A78BFA",
  },
  {
    code: "61",
    label: "העברה כשהקו תפוס",
    description: "כשאתה בשיחה — פורלי תענה לשיחה הנוספת",
    consequence: "ללא קוד זה לקוחות שמתקשרים כשאתה בשיחה לא יגיעו לפורלי",
    icon: PhoneCall,
    color: "#FB923C",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getCompletedStepCount(verifiedCodes: string[]): number {
  return verifiedCodes.filter(c => ["67", "62", "61"].includes(c)).length;
}

/** Build the tel: deep-link for a forwarding code */
function buildTelLink(code: string, forliNumber: string): string {
  const cleaned = forliNumber.replace(/\D/g, "");
  return `tel:**${code}*${cleaned}%23`;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ScreenWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}

function LoadingScreen() {
  return (
    <ScreenWrapper>
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-teal-400" />
        <p className="text-text-secondary text-sm">טוען...</p>
      </div>
    </ScreenWrapper>
  );
}

function NotFoundScreen() {
  return (
    <ScreenWrapper>
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
        <AlertCircle className="w-12 h-12 text-red-400" />
        <h2 className="text-xl font-bold text-text-primary">קישור לא תקין</h2>
        <p className="text-text-secondary text-sm max-w-xs">
          הקישור שקיבלת אינו תקין או פג תוקפו. אנא צור קשר עם התמיכה.
        </p>
      </div>
    </ScreenWrapper>
  );
}

// ─── Screen: Step 1 — Dial **004* ────────────────────────────────────────────

function ActivateScreen({
  forliNumber,
  onActivate,
  isLoading,
}: {
  forliNumber: string;
  onActivate: () => void;
  isLoading: boolean;
}) {
  const telLink = buildTelLink("004", forliNumber);

  return (
    <ScreenWrapper>
      <div className="flex flex-col items-center gap-6 text-center">
        {/* Mascot */}
        <img
          src={FORLI_MASCOT}
          alt="פורלי"
          className="w-28 h-28 object-contain drop-shadow-lg"
        />

        <div>
          <h2 className="text-2xl font-extrabold text-secondary mb-2">
            הפעלת פורלי
          </h2>
          <p className="text-black text-sm leading-relaxed max-w-xs">
            לחץ על הכפתור למטה כדי להפעיל את העברת השיחות. הטלפון שלך יפתח את
            החייגן עם הקוד המוכן — פשוט לחץ על חייג.
          </p>
        </div>
        {/* CTA */}
        <a href={telLink} onClick={onActivate} className="w-full max-w-xs">
          <Button
            size="lg"
            className="w-full bg-teal-400 hover:bg-teal-300 text-deep-space font-bold text-base gap-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Phone className="w-5 h-5" />
            )}
            הפעל את פורלי
          </Button>
        </a>

        <p className="text-black text-xs max-w-xs">
          לאחר הלחיצה, הטלפון יחייג אוטומטית. השיחה תסתיים תוך שנייה — זה
          תקין.
        </p>
      </div>
    </ScreenWrapper>
  );
}

// ─── Screen: Activated — background processing ───────────────────────────────

function ActivatedScreen() {
  return (
    <ScreenWrapper>
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="w-20 h-20 rounded-full bg-teal-400/10 border border-teal-400/40 flex items-center justify-center">
          <CheckCircle2 className="w-9 h-9 text-teal-400" />
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-text-primary mb-2">
            הפעלה בתהליך
          </h2>
          <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
            קיבלנו את הבקשה שלך. פורלי תהיה מוכנה בקרוב — לא צריך לעשות דבר
            נוסף.
          </p>
        </div>
      </div>
    </ScreenWrapper>
  );
}

// ─── Screen: Fallback — 3 codes ───────────────────────────────────────────────

function FallbackScreen({
  forliNumber,
  verifiedCodes,
  onStepActivate,
  isLoading,
}: {
  forliNumber: string;
  verifiedCodes: string[];
  onStepActivate: (code: "67" | "62" | "61") => void;
  isLoading: boolean;
}) {
  const completedCount = getCompletedStepCount(verifiedCodes);
  const progress = (completedCount / 3) * 100;

  return (
    <ScreenWrapper>
      <div className="flex flex-col gap-5">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 glass-card px-3 py-1.5 mb-3 border border-amber-400/30 rounded-full">
            <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-amber-400 text-xs font-semibold">
              הספק שלך דורש הגדרה ידנית
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-text-primary mb-1">
            3 שלבים קצרים
          </h2>
          <p className="text-text-secondary text-xs">
            כל שלב לוקח פחות מ-5 שניות
          </p>
        </div>

        {/* Progress bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-text-muted">
            <span>התקדמות</span>
            <span>{completedCount}/3 שלבים</span>
          </div>
          <Progress value={progress} className="h-2 bg-white/10" />
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-3">
          {FALLBACK_STEPS.map((step, i) => {
            const isVerified = verifiedCodes.includes(step.code);
            const telLink = buildTelLink(step.code, forliNumber);

            return (
              <motion.div
                key={step.code}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-4 rounded-xl border"
                style={{
                  borderColor: isVerified
                    ? `${step.color}60`
                    : "rgba(255,255,255,0.08)",
                  background: isVerified
                    ? `${step.color}08`
                    : "rgba(255,255,255,0.03)",
                }}
              >
                <div className="flex items-start gap-3">
                  {/* Step number / status */}
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{
                      background: isVerified
                        ? `${step.color}20`
                        : `rgba(255,255,255,0.06)`,
                      border: `1px solid ${isVerified ? step.color + "50" : "rgba(255,255,255,0.1)"}`,
                    }}
                  >
                    {isVerified ? (
                      <CheckCircle2
                        className="w-5 h-5"
                        style={{ color: step.color }}
                      />
                    ) : (
                      <span className="text-text-muted text-sm font-bold">
                        {i + 1}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <step.icon
                        className="w-4 h-4 flex-shrink-0"
                        style={{ color: step.color }}
                      />
                      <span className="text-text-primary text-sm font-semibold">
                        {step.label}
                      </span>
                    </div>
                    <p className="text-text-secondary text-xs leading-relaxed mb-1">
                      {step.description}
                    </p>
                    {!isVerified && (
                      <p className="text-text-muted text-xs italic">
                        {step.consequence}
                      </p>
                    )}
                  </div>

                  {/* Action button */}
                  <div className="flex-shrink-0">
                    {isVerified ? (
                      <span
                        className="text-xs font-semibold px-2 py-1 rounded-full"
                        style={{
                          background: `${step.color}15`,
                          color: step.color,
                        }}
                      >
                        ✓ הושלם
                      </span>
                    ) : (
                      <a href={telLink} onClick={() => onStepActivate(step.code)}>
                        <Button
                          size="sm"
                          disabled={isLoading}
                          className="text-xs font-bold gap-1.5"
                          style={{ background: step.color, color: "#0D0B14" }}
                        >
                          <Phone className="w-3.5 h-3.5" />
                          חייג
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </ScreenWrapper>
  );
}

// ─── Screen: Partial Success ──────────────────────────────────────────────────

function PartialSuccessScreen({
  state,
  verifiedCodes,
  forliNumber,
  onContinue,
  isLoading,
}: {
  state: OnboardingState;
  verifiedCodes: string[];
  forliNumber: string;
  onContinue: (code: "67" | "62" | "61") => void;
  isLoading: boolean;
}) {
  const remaining = FALLBACK_STEPS.filter(
    s => !verifiedCodes.includes(s.code),
  );
  const nextStep = remaining[0];

  return (
    <ScreenWrapper>
      <div className="flex flex-col items-center gap-5 text-center">
        <div className="w-20 h-20 rounded-full bg-teal-400/10 border border-teal-400/40 flex items-center justify-center">
          <CheckCircle2 className="w-9 h-9 text-teal-400" />
        </div>

        <div>
          <h2 className="text-2xl font-extrabold text-text-primary mb-1">
            {state === "ACTIVE_NO_ANSWER"
              ? "פורלי פעילה חלקית ✅"
              : "כמעט שם! ✅"}
          </h2>
          <p className="text-text-secondary text-sm max-w-xs leading-relaxed">
            {state === "ACTIVE_NO_ANSWER"
              ? "פורלי תענה כשאתה לא עונה. להגנה מלאה — השלם עוד 2 שלבים."
              : "פורלי תענה כשאתה לא עונה ואין קליטה. עוד שלב אחד להגנה מלאה."}
          </p>
        </div>

        {/* Verified / remaining codes */}
        <div className="flex gap-2 flex-wrap justify-center">
          {verifiedCodes.map(code => (
            <span
              key={code}
              className="text-xs px-3 py-1 rounded-full bg-teal-400/15 text-teal-400 border border-teal-400/30 font-mono"
            >
              **{code}* ✓
            </span>
          ))}
          {remaining.map(s => (
            <span
              key={s.code}
              className="text-xs px-3 py-1 rounded-full bg-white/5 text-text-muted border border-white/10 font-mono"
            >
              **{s.code}* ○
            </span>
          ))}
        </div>

        {/* Next step CTA */}
        {nextStep && (
          <div className="w-full max-w-xs space-y-3">
            <div
              className="glass-card p-4 rounded-xl border text-right"
              style={{ borderColor: `${nextStep.color}30` }}
            >
              <div className="flex items-center gap-2 mb-1">
                <nextStep.icon
                  className="w-4 h-4"
                  style={{ color: nextStep.color }}
                />
                <span className="text-sm font-semibold text-text-primary">
                  {nextStep.label}
                </span>
              </div>
              <p className="text-text-muted text-xs">{nextStep.consequence}</p>
            </div>

            <a
              href={buildTelLink(nextStep.code, forliNumber)}
              onClick={() => onContinue(nextStep.code)}
              className="block"
            >
              <Button
                size="lg"
                className="w-full font-bold gap-2"
                style={{ background: nextStep.color, color: "#0D0B14" }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Phone className="w-5 h-5" />
                )}
                הפעל שלב {verifiedCodes.length + 1}/3
              </Button>
            </a>
          </div>
        )}
      </div>
    </ScreenWrapper>
  );
}

// ─── Screen: Full Success ─────────────────────────────────────────────────────

function SuccessScreen({ name }: { name?: string | null }) {
  return (
    <ScreenWrapper>
      <div className="flex flex-col items-center gap-6 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="w-24 h-24 rounded-full bg-teal-400/15 border-2 border-teal-400/50 flex items-center justify-center"
        >
          <ShieldCheck className="w-12 h-12 text-teal-400" />
        </motion.div>

        <div>
          <h2 className="text-2xl font-extrabold text-text-primary mb-2">
            🎉 פורלי פעילה!
          </h2>
          <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
            {name ? `${name}, ` : ""}ההגדרה הושלמה בהצלחה. מעכשיו פורלי תענה
            על כל שיחה שלא נענית ותשלח ללקוחות הודעת WhatsApp אוטומטית.
          </p>
        </div>

        <div className="flex gap-2 flex-wrap justify-center">
          {["67", "62", "61"].map(code => (
            <span
              key={code}
              className="text-xs px-3 py-1 rounded-full bg-teal-400/15 text-teal-400 border border-teal-400/30 font-mono"
            >
              **{code}* ✓
            </span>
          ))}
        </div>

        <div className="glass-card p-4 rounded-xl border border-teal-400/20 max-w-xs w-full text-right space-y-2">
          <p className="text-teal-400 text-sm font-semibold">מה קורה עכשיו?</p>
          <ul className="text-text-secondary text-xs space-y-1.5">
            <li>📞 שיחה שלא נענית → לקוח מקבל WhatsApp מפורלי</li>
            <li>🤖 פורלי עונה על שאלות ומקבעת פגישות</li>
            <li>📋 אתה מקבל סיכום כל שיחה</li>
          </ul>
        </div>
      </div>
    </ScreenWrapper>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Onboard() {
  const params = useParams<{ client_id: string }>();
  const clientId = params.client_id;

  const [isActivating, setIsActivating] = useState(false);
  const [hasActivated, setHasActivated] = useState(false);

  const {
    data: status,
    isLoading,
    error,
  } = trpc.onboarding.getStatus.useQuery(
    { clientId: clientId ?? "" },
    { enabled: !!clientId, refetchInterval: false },
  );

  const activateMutation = trpc.onboarding.activate.useMutation({
    onSettled: () => setIsActivating(false),
  });

  const handleActivate = (code: "004" | "67" | "62" | "61") => {
    if (!clientId) return;
    setIsActivating(true);
    if (code === "004") setHasActivated(true);
    activateMutation.mutate({ clientId, code });
  };

  const renderContent = () => {
    if (isLoading) return <LoadingScreen />;
    if (error || !status) return <NotFoundScreen />;

    const { state, verifiedCodes, forliNumber, name } = status;
    const fn = forliNumber ?? "0535972420";

    if (state === "NEW" && hasActivated) return <ActivatedScreen />;

    switch (state) {
      case "NEW":
        return (
          <ActivateScreen
            forliNumber={fn}
            onActivate={() => handleActivate("004")}
            isLoading={isActivating}
          />
        );
      case "FAILED":
        return (
          <FallbackScreen
            forliNumber={fn}
            verifiedCodes={verifiedCodes}
            onStepActivate={handleActivate}
            isLoading={isActivating}
          />
        );
      case "ACTIVE_NO_ANSWER":
      case "ACTIVE_EXTENDED":
        return (
          <PartialSuccessScreen
            state={state}
            verifiedCodes={verifiedCodes}
            forliNumber={fn}
            onContinue={handleActivate}
            isLoading={isActivating}
          />
        );
      case "ACTIVE_FULL":
      case "ACTIVE_COMPLETE":
        return <SuccessScreen name={name} />;
      default:
        return <NotFoundScreen />;
    }
  };

  return (
    <>
      <SEO
        title="הפעלת פורלי - Call4li"
        description="הפעלת העברת שיחות אוטומטית לשירות פורלי."
        noIndex={true}
      />
      <WavyBackground containerClassName="min-h-screen" className="w-full flex flex-col text-gray-900" dir="rtl">
        <div className="flex-1 flex flex-col items-center justify-center px-5 py-8">
          <div className="w-full max-w-sm bg-white/50 backdrop-blur-md rounded-2xl border border-border/20 shadow-2xl p-6">
            {status?.name && (
              <p className="text-center text-gray-500 text-xs mb-6">
                הגדרת פורלי עבור{" "}
                <span className="text-gray-900 font-semibold">{status.name}</span>
              </p>
            )}
            <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
          </div>
        </div>
      </WavyBackground>
    </>
  );
}
