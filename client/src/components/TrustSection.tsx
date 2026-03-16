/*
 * Trust Section — Each metric gets a completely unique color identity
 * Spinning outer ring decoration on icon containers
 * Spring bounce entrance animation
 * Horizontal scanning band background
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Clock, Globe, Sparkles } from "lucide-react";

const metrics = [
  {
    icon: Clock,
    display: "24/7",
    label: "זמינות מלאה",
    description: "פורלי עובדת סביב השעון, גם כשאתם ישנים",
    accent: "#38BDF8",  // sky
    ringColor: "rgba(56,189,248,0.25)",
  },
  {
    icon: Globe,
    display: "3",
    label: "שפות",
    description: "עברית, ערבית ואנגלית — עם זיהוי אוטומטי",
    accent: "#A78BFA",  // violet
    ringColor: "rgba(167,139,250,0.25)",
  },
  {
    icon: Sparkles,
    display: "100%",
    label: "אוטומטי",
    description: "אפס התערבות נדרשת מבעל העסק",
    accent: "#FB923C",  // orange
    ringColor: "rgba(251,146,60,0.25)",
  },
  {
    icon: Shield,
    display: "30 שניות",
    label: "זמן תגובה",
    description: "מהשיחה שלא נענתה להודעת WhatsApp",
    accent: "#4ADE80",  // green
    ringColor: "rgba(74,222,128,0.25)",
  },
];

export default function TrustSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px" });

  return (
    <section ref={ref} className="relative py-20 lg:py-28 overflow-hidden">
      {/* Horizontal scan-band background */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-space via-midnight to-deep-space" />

      {/* Horizontal glowing band */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-[120px] bg-gradient-to-b from-transparent via-white/[0.02] to-transparent pointer-events-none" />

      <div className="container relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {metrics.map((metric, i) => (
            <motion.div
              key={i}
              className="glass-card p-6 lg:p-8 text-center relative overflow-hidden"
              style={{
                border: `1px solid ${metric.accent}30`,
                borderBottom: `2px solid ${metric.accent}60`,
              }}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                delay: i * 0.12,
                duration: 0.5,
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
            >
              {/* Corner background glow */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1/2 pointer-events-none opacity-30"
                style={{
                  background: `radial-gradient(ellipse at center bottom, ${metric.accent}20, transparent 70%)`,
                }}
              />

              {/* Icon with spinning outer ring */}
              <div className="relative w-14 h-14 mx-auto mb-5">
                {/* Spinning ring */}
                <div
                  className="absolute inset-0 rounded-full animate-spin-slow"
                  style={{
                    background: `conic-gradient(from 0deg, ${metric.accent}60, transparent 60%, ${metric.accent}60)`,
                    borderRadius: "50%",
                    padding: "1px",
                  }}
                />
                {/* Icon container */}
                <div
                  className="absolute inset-[2px] rounded-full flex items-center justify-center"
                  style={{ background: `${metric.accent}18` }}
                >
                  <metric.icon className="w-6 h-6" style={{ color: metric.accent }} />
                </div>
              </div>

              {/* Number — spring pop */}
              <motion.div
                className="text-3xl lg:text-4xl font-extrabold mb-2"
                style={{ color: metric.accent, fontFamily: "var(--font-display)" }}
                initial={{ opacity: 0, scale: 0.4 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  delay: 0.3 + i * 0.15,
                  type: "spring",
                  stiffness: 400,
                  damping: 15,
                }}
              >
                {metric.display}
              </motion.div>

              <div className="text-text-primary font-semibold text-sm mb-1">{metric.label}</div>
              <div className="text-text-muted text-xs leading-relaxed">{metric.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
