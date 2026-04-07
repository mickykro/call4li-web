/**
 * Features Section — Amber / Gold theme
 * Each card has a unique gradient border color
 * Scroll-responsive entrance/exit animations (hooks-compliant)
 * Shimmer sweep on hover
 * Radial mesh background
 */

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Globe, CalendarClock, HelpCircle, Image, Users, FileBarChart } from "lucide-react";

const FEATURES_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663330217393/VZvahsqxvigDNCtzbEoTYw/futuristic-features-bg-T4dw3cKPT6ftzz2AsSQWVh.webp";

const features = [
  {
    icon: Globe,
    title: "שלוש שפות",
    description: "עברית, ערבית ואנגלית — עם זיהוי שפה אוטומטי. פורלי מתאימה את עצמה ללקוח.",
    accent: "#F59E0B",
    span: "md:col-span-2",
  },
  {
    icon: CalendarClock,
    title: "קביעת שיחות חוזרות",
    description: '"מחר ב-8", "בין 4 ל-6", "בשבוע הבא אחה״צ" — פורלי מבינה הכל ושולחת תזכורת 30 דקות לפני.',
    accent: "#A78BFA",
    span: "md:col-span-1",
  },
  {
    icon: HelpCircle,
    title: "מענה על שאלות",
    description: "בהתבסס על FAQ, מוצרים ושירותים שהעסק הגדיר — פורלי עונה בצורה חכמה ומדויקת.",
    accent: "#34D399",
    span: "md:col-span-1",
  },
  {
    icon: Image,
    title: "ניתוח תמונות ומסמכים",
    description: "לקוח שולח תמונה או מסמך? פורלי מנתחת ומבינה את התוכן כדי לתת מענה מדויק.",
    accent: "#F97316",
    span: "md:col-span-2",
  },
  {
    icon: Users,
    title: "זיהוי לקוחות חוזרים",
    description: "פורלי מזהה לקוחות חוזרים ועסקים מרובים מאותו מספר — ומתאימה את השיחה בהתאם.",
    accent: "#38BDF8",
    span: "md:col-span-1",
  },
  {
    icon: FileBarChart,
    title: "סיכום שיחה אוטומטי",
    description: "סיכום מלא נשלח לעסק וגם ללקוח עצמו — שקיפות מלאה, אפס מאמץ.",
    accent: "#FB7185",
    span: "md:col-span-2",
  },
];

// ─── Single card with its own scroll tracking ─────────────────────────────────

function FeatureCard({
  feature,
  index,
  sectionRef,
}: {
  feature: (typeof features)[number];
  index: number;
  sectionRef: React.RefObject<HTMLElement | null>;
}) {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const delay = index * 0.08;
  const startIn = Math.max(0, delay);
  const endIn = Math.min(0.6, delay + 0.25);
  const startOut = Math.max(0.5, delay + 0.35);
  const endOut = Math.min(1, delay + 0.65);

  const fromX = index % 2 === 0 ? -300 : 300;

  const x = useTransform(
    scrollYProgress,
    [0, startIn, endIn, startOut, endOut, 1],
    [fromX, fromX, 0, 0, fromX * 0.6, fromX * 0.6],
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, startIn, endIn, startOut, endOut, 1],
    [0, 0, 1, 1, 0, 0],
  );

  return (
    <motion.div
      className={`shimmer-hover p-7 lg:p-8 relative overflow-hidden group cursor-default ${feature.span}`}
      style={{
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderRadius: "1rem",
        border: `1px solid ${feature.accent}35`,
        x,
        opacity,
      }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    >
      {/* Corner glow */}
      <div
        className="absolute top-0 right-0 w-40 h-40 rounded-full blur-[70px] opacity-40 group-hover:opacity-70 transition-opacity duration-500 pointer-events-none"
        style={{ background: `${feature.accent}30` }}
      />

      {/* Top border line */}
      <div
        className="absolute top-0 right-0 left-0 h-[2px]"
        style={{ background: `linear-gradient(to left, ${feature.accent}, transparent 80%)` }}
      />

      <div className="relative">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
          style={{ background: `${feature.accent}18`, border: `1px solid ${feature.accent}40` }}
        >
          <feature.icon className="w-6 h-6" style={{ color: feature.accent }} />
        </div>
        <h3 className="text-lg font-bold text-text-primary mb-3">{feature.title}</h3>
        <p className="text-text-secondary text-sm leading-relaxed">{feature.description}</p>
      </div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function FeaturesSection() {
  const ref = useRef<HTMLElement>(null);

  return (
    <section id="features" ref={ref} className="relative py-24 lg:py-36 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={FEATURES_BG} alt="" className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-deep-space/70" />
      </div>

      {/* Radial amber glow center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-amber-500/25 blur-[70px] rounded-full pointer-events-none" />

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <div className="inline-flex items-center gap-2 glass-card px-4 py-1.5 mb-5 border border-amber-400/30">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-amber-400 text-xs font-semibold tracking-wider">יכולות</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary leading-tight">
            מה פורלי{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #F59E0B, #FBBF24, #FDE68A, #F59E0B)",
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "aurora-shift 4s ease-in-out infinite",
              }}
            >
              יודעת לעשות?
            </span>
          </h2>
        </motion.div>

        {/* Bento grid */}
        <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
          {features.map((feature, i) => (
            <FeatureCard
              key={i}
              feature={feature}
              index={i}
              sectionRef={ref}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
