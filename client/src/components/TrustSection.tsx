/*
 * Design: Editorial / Paper & Ink
 * Trust section: Social proof with key metrics
 * Clean, minimal, editorial style with large numbers
 */

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Shield, Clock, Globe, Sparkles } from "lucide-react";

function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px" });
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!inView || done) return;
    const end = target;
    const duration = 1200;
    const steps = Math.ceil(duration / 16);
    const increment = end / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        setDone(true);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, done]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function TrustSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px" });

  const metrics = [
    {
      icon: Clock,
      value: 24,
      suffix: "/7",
      label: "זמינות מלאה",
      description: "פורלי עובדת סביב השעון, גם כשאתם ישנים",
    },
    {
      icon: Globe,
      value: 3,
      suffix: "",
      label: "שפות",
      description: "עברית, ערבית ואנגלית — עם זיהוי אוטומטי",
    },
    {
      icon: Sparkles,
      value: 100,
      suffix: "%",
      label: "אוטומטי",
      description: "אפס התערבות נדרשת מבעל העסק",
    },
    {
      icon: Shield,
      value: 30,
      suffix: " שניות",
      label: "זמן תגובה",
      description: "מהשיחה שלא נענתה להודעת WhatsApp",
    },
  ];

  return (
    <section ref={ref} className="relative py-20 lg:py-28 bg-forest overflow-hidden">
      {/* Subtle decorative circles */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div className="absolute top-10 right-20 w-40 h-40 border border-cream rounded-full" />
        <div className="absolute bottom-10 left-20 w-60 h-60 border border-cream rounded-full" />
      </div>

      <div className="container relative z-10">
        {/* Metrics grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {metrics.map((metric, i) => (
            <motion.div
              key={i}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6 }}
            >
              <metric.icon className="w-7 h-7 text-burnt-light mx-auto mb-4" />
              <div
                className="text-4xl lg:text-5xl font-black text-cream mb-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <AnimatedNumber target={metric.value} suffix={metric.suffix} />
              </div>
              <div className="text-cream/90 font-semibold text-sm mb-1">
                {metric.label}
              </div>
              <div className="text-cream/50 text-xs leading-relaxed max-w-[180px] mx-auto">
                {metric.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
