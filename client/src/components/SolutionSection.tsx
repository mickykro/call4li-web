/*
 * Solution Section — Emerald / Green theme
 * Warm green palette, slide-from-left list items
 * Concentric pulsing emerald rings around mascot
 * Left-border emphasis card in emerald
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MessageCircle, Bot, Zap } from "lucide-react";

const MASCOT = "https://d2xsxph8kpxj0f.cloudfront.net/310519663330217393/VZvahsqxvigDNCtzbEoTYw/forli-mascot_583ebf4a.png";

const highlights = [
  {
    icon: Bot,
    title: "זיהוי אוטומטי",
    text: "פורלי מזהה שיחה שלא נענתה ופונה ללקוח מיד",
    color: "#10B981",   // emerald-500
    bg: "rgba(16,185,129,0.12)",
  },
  {
    icon: MessageCircle,
    title: "שיחה חכמה ב-WhatsApp",
    text: "מנהלת שיחה בשפה טבעית בשם העסק שלכם",
    color: "#34D399",   // emerald-400
    bg: "rgba(52,211,153,0.10)",
  },
  {
    icon: Zap,
    title: "סיכום מלא לבעל העסק",
    text: "כל מה שצריך לדעת — מסוכם ומוכן, בלי מאמץ",
    color: "#6EE7B7",   // emerald-300
    bg: "rgba(110,231,183,0.08)",
  },
];

export default function SolutionSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="solution" ref={ref} className="relative py-24 lg:py-36 overflow-hidden">
      {/* Background — emerald wisps */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-space via-emerald-950/20 to-deep-space" />
      <div className="absolute top-0 left-0 w-[600px] h-[300px] bg-emerald-500/6 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[450px] h-[250px] bg-emerald-700/8 blur-[100px] rounded-full pointer-events-none" />

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          className="max-w-3xl mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 glass-card px-4 py-1.5 mb-5 border border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 text-xs font-semibold tracking-wider">הפתרון</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary leading-tight">
            הכירו את{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #10B981, #34D399, #6EE7B7, #10B981)",
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "aurora-shift 4s ease-in-out infinite",
              }}
            >
              פורלי
            </span>
            <br />
            העוזרת האישית החכמה שלכם
          </h2>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Text content */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <p className="text-lg text-text-secondary leading-relaxed mb-10 max-w-xl">
              Call4li מפעילה עוזרת אישית חכמה בשם{" "}
              <strong style={{ color: "#10B981" }}>פורלי</strong> — שפועלת ברגע
              שהשיחה לא נענית. כשלקוח מתקשר לעסק ולא נענה, פורלי מזהה אוטומטית
              את השיחה, פונה ללקוח ב-WhatsApp בשמו של העסק, ומנהלת שיחה חכמה
              בשפה טבעית.
            </p>

            <div className="space-y-4">
              {highlights.map((item, i) => (
                <motion.div
                  key={i}
                  className="glass-card-hover p-5 flex gap-4 items-start"
                  style={{ borderRight: `2px solid ${item.color}33`, borderRadius: "1rem" }}
                  initial={{ opacity: 0, x: -40 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.15, duration: 0.6, ease: "easeOut" }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: item.bg }}
                  >
                    <item.icon className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-text-primary mb-1">{item.title}</h4>
                    <p className="text-text-secondary text-sm leading-relaxed">{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Emphasis */}
            <motion.div
              className="mt-8 glass-card p-5 border-r-4 !rounded-r-none"
              style={{ borderRightColor: "#10B981" }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <p className="text-base font-semibold" style={{ color: "#34D399" }}>
                מסבירה, קובעת שיחה חוזרת, עונה על שאלות, ושולחת סיכום מלא — הכל
                בלי שהרמתם אצבע.
              </p>
            </motion.div>
          </motion.div>

          {/* Mascot with emerald rings */}
          <motion.div
            className="lg:col-span-5 flex justify-center"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative">
              {/* Expanding rings */}
              {[0, 0.7, 1.4].map((delay, i) => (
                <div
                  key={i}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                  <div
                    className="rounded-full border border-emerald-400/40 animate-emerald-ring"
                    style={{
                      width: `${200 + i * 60}px`,
                      height: `${200 + i * 60}px`,
                      animationDelay: `${delay}s`,
                    }}
                  />
                </div>
              ))}

              {/* Glow */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 lg:w-56 lg:h-56 rounded-full blur-[50px]" style={{ background: "rgba(16,185,129,0.15)" }} />
              </div>

              {/* Mascot */}
              <motion.img
                src={MASCOT}
                alt="פורלי — העוזרת האישית החכמה"
                className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-80 lg:h-80 object-contain drop-shadow-2xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
