/*
 * Design: Editorial / Paper & Ink
 * Problem section: Magazine-style pull-quote layout
 * Oversized Hebrew numerals, warm tones, editorial dividers
 */

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { PhoneOff, UserX, TrendingDown } from "lucide-react";

function AnimatedCounter({ value, suffix = "" }: { value: string; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      {value}{suffix}
    </motion.span>
  );
}

export default function ProblemSection() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  const problems = [
    {
      icon: PhoneOff,
      title: "שיחות ללא מענה",
      description:
        "כל יום, מיליוני שיחות טלפון לעסקים קטנים נשארות ללא מענה. הלקוח לא ממתין — הוא פשוט הולך.",
    },
    {
      icon: UserX,
      title: "הלקוח לא ישאיר הודעה",
      description:
        "הלקוח לא ישאיר הודעה קולית. הוא ילך למתחרה. כל שיחה שלא נענתה היא הכנסה שאבדה — לצמיתות.",
    },
    {
      icon: TrendingDown,
      title: "עסקים קטנים = צוות קטן",
      description:
        "רוב 570,000 העסקים הפעילים בישראל מנוהלים על ידי אדם אחד או שניים. אי אפשר תמיד לענות לטלפון.",
    },
  ];

  return (
    <section
      id="problem"
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-cream-dark paper-texture"
    >
      <div className="container">
        {/* Section header */}
        <motion.div
          className="max-w-3xl mb-16 lg:mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-burnt" />
            <span className="text-burnt font-semibold text-sm">הבעיה</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-charcoal leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            כל שיחה שלא נענתה
            <br />
            <span className="text-burnt">היא הכנסה שנעלמה</span>
          </h2>
        </motion.div>

        {/* Problem cards — editorial asymmetric layout */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-10">
          {problems.map((problem, i) => (
            <motion.div
              key={i}
              className="relative group"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.7 }}
            >
              {/* Large step number */}
              <div className="step-number absolute -top-2 right-0 select-none">
                {String(i + 1).padStart(2, "0")}
              </div>

              <div className="relative pt-12">
                <div className="w-12 h-12 rounded-sm bg-forest/10 flex items-center justify-center mb-5 group-hover:bg-forest/20 transition-colors duration-300">
                  <problem.icon className="w-6 h-6 text-forest" />
                </div>
                <h3
                  className="text-xl font-bold text-charcoal mb-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {problem.title}
                </h3>
                <p className="text-warm-gray leading-relaxed text-base">
                  {problem.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pull quote */}
        <motion.div
          className="mt-16 lg:mt-24 border-r-4 border-burnt pr-6 lg:pr-10 max-w-2xl"
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.7 }}
        >
          <blockquote
            className="text-2xl lg:text-3xl font-bold text-charcoal leading-snug"
            style={{ fontFamily: "var(--font-display)" }}
          >
            "בישראל לבדה ישנם כ-<AnimatedCounter value="570,000" /> עסקים פעילים.
            רובם לא יכולים לענות לכל שיחה."
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}
