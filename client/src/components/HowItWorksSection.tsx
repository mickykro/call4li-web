/*
 * Design: Editorial / Paper & Ink
 * How it works: Vertical timeline with oversized step numbers
 * Process flow illustration, editorial step-by-step layout
 * Mobile: single column with timeline on right
 * Desktop: alternating left/right cards
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, Route, MessageSquare, ListChecks, Bell } from "lucide-react";

const PROCESS_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663330217393/VZvahsqxvigDNCtzbEoTYw/process-flow-LqLwYAq6WsNctSLbNoaAHC.webp";

const steps = [
  {
    num: "01",
    icon: Phone,
    title: "לקוח מחייג — השיחה לא נענית",
    description:
      "לקוח מתקשר לעסק שלכם, אבל אתם עסוקים, בפגישה, או פשוט לא ליד הטלפון.",
    color: "burnt" as const,
  },
  {
    num: "02",
    icon: Route,
    title: "Follow-Me מנתב את השיחה",
    description:
      "המערכת מזהה שהשיחה לא נענתה ומנתבת אותה אוטומטית למספר Twilio של Call4li.",
    color: "forest" as const,
  },
  {
    num: "03",
    icon: MessageSquare,
    title: "פורלי שולחת WhatsApp מיידי",
    description:
      "תוך שניות, פורלי שולחת ללקוח הודעת WhatsApp מותאמת אישית בשם העסק שלכם.",
    color: "burnt" as const,
  },
  {
    num: "04",
    icon: ListChecks,
    title: "הלקוח בוחר מה לעשות",
    description:
      "הלקוח יכול לבחור — לחזור עכשיו, לקבוע זמן לשיחה חוזרת, או לשאול שאלה.",
    color: "forest" as const,
  },
  {
    num: "05",
    icon: Bell,
    title: "פורלי מטפלת ומסכמת",
    description:
      "פורלי מטפלת בכל הבקשות, מסכמת את השיחה, ומעבירה לכם רק את מה שחשוב.",
    color: "burnt" as const,
  },
];

export default function HowItWorksSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="relative py-20 lg:py-32 bg-cream-dark paper-texture"
    >
      <div className="container">
        {/* Section header */}
        <motion.div
          className="max-w-3xl mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-burnt" />
            <span className="text-burnt font-semibold text-sm">התהליך</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-charcoal leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            איך זה עובד
            <br />
            <span className="text-forest">בפועל?</span>
          </h2>
          <p className="text-warm-gray text-lg mt-4 max-w-xl">
            התהליך כולו אוטומטי. בעל העסק מקבל התראה רק כשיש פעולה שדורשת
            אותו.
          </p>
        </motion.div>

        {/* Process flow illustration */}
        <motion.div
          className="mb-16 lg:mb-20 overflow-hidden rounded-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <img
            src={PROCESS_IMG}
            alt="תרשים זרימה של תהליך הטיפול האוטומטי בשיחות שלא נענו"
            className="w-full rounded-sm shadow-lg shadow-charcoal/5"
          />
        </motion.div>

        {/* Steps — simple stacked cards for clarity */}
        <div className="max-w-3xl mx-auto space-y-5">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="group"
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
            >
              <div className="flex gap-5 items-start bg-white/80 backdrop-blur-sm rounded-sm p-5 lg:p-6 shadow-sm border border-forest/5 hover:shadow-md hover:border-forest/15 transition-all duration-300">
                {/* Step number + icon */}
                <div className="shrink-0 flex flex-col items-center gap-2">
                  <span
                    className={`text-3xl lg:text-4xl font-black select-none ${
                      step.color === "burnt" ? "text-burnt/25" : "text-forest/25"
                    }`}
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {step.num}
                  </span>
                  <div
                    className={`w-10 h-10 rounded-sm flex items-center justify-center transition-colors duration-300 ${
                      step.color === "burnt"
                        ? "bg-burnt/10 group-hover:bg-burnt/20"
                        : "bg-forest/10 group-hover:bg-forest/20"
                    }`}
                  >
                    <step.icon
                      className={`w-5 h-5 ${
                        step.color === "burnt" ? "text-burnt" : "text-forest"
                      }`}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-1">
                  <h3
                    className="text-lg font-bold text-charcoal mb-1.5"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-warm-gray text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connector line (not on last item) */}
              </div>
              {i < steps.length - 1 && (
                <div className="flex justify-center py-1">
                  <div className="w-[2px] h-5 bg-forest/15" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
