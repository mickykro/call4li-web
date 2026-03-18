/*
 * Problem Section — Danger / Crimson theme
 * Cards slide in from alternating directions
 * Each card has a unique accent color (red → orange → amber)
 * Diagonal danger-stripe border tops, red tinted background
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { PhoneOff, UserX, TrendingDown } from "lucide-react";

const problems = [
  {
    icon: PhoneOff,
    number: "01",
    title: "שיחות ללא מענה",
    description:
      "כל יום, מיליוני שיחות טלפון לעסקים קטנים נשארות ללא מענה. הלקוח לא ממתין — הוא פשוט הולך.",
    accent: "#EF4444",       // red-500
    accentBg: "rgba(239,68,68,0.10)",
    borderClass: "border-r-2 border-red-500",
    slideFrom: { x: 60 },
  },
  {
    icon: UserX,
    number: "02",
    title: "הלקוח לא ישאיר הודעה",
    description:
      "הלקוח לא ישאיר הודעה קולית. הוא ילך למתחרה. כל שיחה שלא נענתה היא הכנסה שאבדה — לצמיתות.",
    accent: "#F97316",       // orange-500
    accentBg: "rgba(249,115,22,0.10)",
    borderClass: "border-r-2 border-orange-500",
    slideFrom: { y: 50 },
  },
  {
    icon: TrendingDown,
    number: "03",
    title: "עסקים קטנים = צוות קטן",
    description:
      "רוב 570,000 העסקים הפעילים בישראל מנוהלים על ידי אדם אחד או שניים. אי אפשר תמיד לענות לטלפון.",
    accent: "#FBBF24",       // amber-400
    accentBg: "rgba(251,191,36,0.10)",
    borderClass: "border-r-2 border-amber-400",
    slideFrom: { x: -60 },
  },
];

export default function ProblemSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="problem" ref={ref} className="relative py-24 lg:py-36 overflow-hidden">
      {/* Red-tinted background */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-space via-red to-deep-space" />

      {/* Glowing red orb dead center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-900/15 rounded-full pointer-events-none" />

      <div className="container relative z-10">
        {/* Section header */}
        <motion.div
          className="max-w-3xl mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {/* Badge — danger style with ring-pulse */}
          <div className="inline-flex items-center gap-2 glass-card px-4 py-1.5 mb-5 border border-red-500/30">
            <span className="relative flex h-2 w-2">
              <span className="animate-danger-pulse absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
            </span>
            <span className="text-red-400 text-xs font-semibold tracking-wider">הבעיה</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary leading-tight">
            כל שיחה שלא נענתה
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #EF4444, #F97316, #EF4444)",
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "aurora-shift 3s ease-in-out infinite",
              }}
            >
              היא הכנסה שנעלמה
            </span>
          </h2>
        </motion.div>

        {/* Problem cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {problems.map((problem, i) => (
            <motion.div
              key={i}
              className={`glass-card-hover p-8 relative overflow-hidden group ${problem.borderClass}`}
              style={{ borderRadius: "1rem" }}
              initial={{ opacity: 0, ...problem.slideFrom }}
              animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.18, duration: 0.7, ease: "easeOut" }}
            >
              {/* Top slash accent */}
              <div
                className="absolute top-0 right-0 left-0 h-[3px]"
                style={{ background: `linear-gradient(to left, ${problem.accent}, transparent)` }}
              />

              {/* Ghost number */}
              <span
                className="text-6xl font-black absolute top-4 left-4 select-none"
                style={{
                  color: problem.accent,
                  opacity: 0.06,
                  fontFamily: "var(--font-display)",
                }}
              >
                {problem.number}
              </span>

              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300"
                style={{ background: problem.accentBg }}
              >
                <problem.icon className="w-6 h-6" style={{ color: problem.accent }} />
              </div>

              <h3 className="text-xl font-bold text-text-primary mb-3">{problem.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{problem.description}</p>

              {/* Bottom-right corner glow on hover */}
              <div
                className="absolute bottom-0 left-0 w-32 h-32 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: problem.accentBg }}
              />
            </motion.div>
          ))}
        </div>

        {/* Pull quote — red left border with animated width expansion */}
        <motion.div
          className="mt-16 lg:mt-20 glass-card p-8 max-w-2xl border-r-4 !rounded-r-none"
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.85, duration: 0.7 }}
        >
          <blockquote className="text-xl lg:text-2xl font-bold text-text-primary leading-snug">
            "בישראל לבדה ישנם כ-<span style={{ color: "#EF4444" }}>570,000</span> עסקים פעילים.
            רובם לא יכולים לענות לכל שיחה."
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}
