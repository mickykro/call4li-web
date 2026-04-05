/*
 * Trust Section — Each metric gets a completely unique color identity
 * Spinning outer ring decoration on icon containers
 * Scroll-responsive entrance/exit animations
 * Horizontal scanning band background
 */

import { motion, useScroll, useTransform } from "framer-motion";
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
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Transform scroll progress to animation values for each card
  // As scroll progress goes from 0 to 1 (scrolling down), animation goes from 0 to 1 (components come into view)
  const createCardAnimation = (index: number) => {
    const delay = index * 0.1;
    const startProgress = Math.max(0, delay - 0.2);
    const endProgress = Math.min(1, delay + 0.3);
    
    return useTransform(scrollYProgress, [startProgress, endProgress], [0, 1]);
  };

  return (
    <section ref={ref} className="relative py-20 lg:py-28 overflow-hidden">
      {/* Horizontal scan-band background */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-space via-slate-700/40 to-deep-space" />

      {/* Horizontal glowing band */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-[200px] bg-gradient-to-b from-transparent via-white/[0.05] to-transparent pointer-events-none" />

      <div className="container relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {metrics.map((metric, i) => {
            const progressOpacity = createCardAnimation(i);
            
            return (
              <motion.div
                key={i}
                className="glass-card p-6 lg:p-8 text-center relative overflow-hidden"
                style={{
                  border: `1px solid ${metric.accent}30`,
                  borderBottom: `2px solid ${metric.accent}60`,
                  x: useTransform(progressOpacity, [0, 1], [i % 2 === 0 ? -250 : 250, 0]),
                  opacity: useTransform(progressOpacity, [0, 1], [0, 1]),
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

                {/* Number — scroll-responsive pop */}
                <motion.div
                  className="text-3xl lg:text-4xl font-extrabold mb-2"
                  style={{
                    color: metric.accent,
                    fontFamily: "var(--font-display)",
                    scale: useTransform(progressOpacity, [0, 1], [0.4, 1]),
                    opacity: useTransform(progressOpacity, [0, 1], [0, 1]),
                  }}
                >
                  {metric.display}
                </motion.div>

                <div className="text-text-primary font-semibold text-sm mb-1">{metric.label}</div>
                <div className="text-text-muted text-xs leading-relaxed">{metric.description}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
