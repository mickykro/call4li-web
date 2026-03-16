/*
 * How It Works Section — Electric Cyan / Sky theme
 * Animated dot-grid background
 * Sequential "power-on" step cards
 * Scanning line overlay on process image
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, ArrowLeftRight, MessageSquare, ListChecks, FileText } from "lucide-react";

const PROCESS_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663330217393/VZvahsqxvigDNCtzbEoTYw/futuristic-process-flow-cG3YXWkfKiiin6QMsXdsqH.webp";
const PROCESS_IMG_VERTICAL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663330217393/VZvahsqxvigDNCtzbEoTYw/futuristic-process-flow-vertical-fPBCss3po4ootc5CqPFK3N.webp";

const steps = [
  { icon: Phone, number: "01", title: "לקוח מחייג לעסק", description: "לקוח מתקשר לעסק — השיחה לא נענית", color: "#38BDF8" },
  { icon: ArrowLeftRight, number: "02", title: "ניתוב אוטומטי", description: "Follow-Me מנתב את השיחה למספר Twilio של המערכת", color: "#7DD3FC" },
  { icon: MessageSquare, number: "03", title: "הודעת WhatsApp מיידית", description: "פורלי שולחת ללקוח הודעת WhatsApp מיידית בשם העסק", color: "#BAE6FD" },
  { icon: ListChecks, number: "04", title: "הלקוח בוחר", description: "לחזור עכשיו, לקבוע זמן, או לשאול שאלה — הכל אוטומטי", color: "#38BDF8" },
  { icon: FileText, number: "05", title: "סיכום לבעל העסק", description: "פורלי מטפלת, מסכמת, ומעבירה לבעל העסק את כל מה שהוא צריך לדעת", color: "#7DD3FC" },
];

export default function HowItWorksSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="how-it-works" ref={ref} className="relative py-24 lg:py-36 overflow-hidden">
      {/* Animated dot-grid background */}
      <div
        className="absolute inset-0 animate-dot-grid pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(circle, #38BDF8 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Sky-blue tint overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-space via-sky-950/20 to-deep-space" />

      {/* Glowing orbs */}
      <div className="absolute top-0 right-1/3 w-[500px] h-[200px] bg-sky-400/6 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-[400px] h-[200px] bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 glass-card px-4 py-1.5 mb-5 border border-sky-400/30">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            <span className="text-sky-400 text-xs font-semibold tracking-wider">התהליך</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary leading-tight">
            איך זה עובד{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #38BDF8, #BAE6FD, #38BDF8)",
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "aurora-shift 4s ease-in-out infinite",
              }}
            >
              בפועל?
            </span>
          </h2>
          <p className="text-text-secondary text-lg mt-4 max-w-xl mx-auto">
            התהליך כולו אוטומטי. בעל העסק מקבל פינג רק כשיש פעולה שדורשת אותו.
          </p>
        </motion.div>

        {/* Process flow image with scanning line */}
        <motion.div
          className="mb-20 relative glass-card p-4 lg:p-6 overflow-hidden"
          style={{ border: "1px solid rgba(56,189,248,0.2)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <img
            src={PROCESS_IMG}
            alt="תרשים זרימה של תהליך פורלי"
            className="hidden md:block w-full rounded-lg"
          />
          <img
            src={PROCESS_IMG_VERTICAL}
            alt="תרשים זרימה של תהליך פורלי"
            className="block md:hidden w-full max-w-sm mx-auto rounded-lg"
          />

          {/* Scanning line overlay */}
          {inView && (
            <div
              className="absolute left-0 right-0 h-[2px] animate-scan pointer-events-none"
              style={{
                background: "linear-gradient(to right, transparent, rgba(56,189,248,0.7), transparent)",
              }}
            />
          )}
        </motion.div>

        {/* Step cards — sequential power-on */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 lg:gap-5">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className={`glass-card-hover p-6 relative overflow-hidden text-center ${i === 4 ? "col-span-2 md:col-span-1" : ""}`}
              style={{
                borderTop: `2px solid ${step.color}55`,
                borderRadius: "1rem",
              }}
              initial={{ opacity: 0, filter: "brightness(0.2)" }}
              animate={inView ? { opacity: 1, filter: "brightness(1)" } : {}}
              transition={{ delay: 0.6 + i * 0.15, duration: 0.5 }}
            >
              {/* Step number — large glowing */}
              <span
                className="text-xs font-bold mb-3 block"
                style={{ color: step.color, fontFamily: "var(--font-display)" }}
              >
                {step.number}
              </span>

              {/* Icon ring */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 relative"
                style={{ background: `${step.color}15`, border: `1px solid ${step.color}40` }}
              >
                <step.icon className="w-5 h-5" style={{ color: step.color }} />
              </div>

              <h4 className="text-sm font-bold text-text-primary mb-2">{step.title}</h4>
              <p className="text-text-muted text-xs leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
