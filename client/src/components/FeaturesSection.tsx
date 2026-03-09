/*
 * Design: Editorial / Paper & Ink
 * Features section: Bento-style grid with editorial cards
 * Each feature has an icon, title, and description
 * Features illustration used as decorative element
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Languages,
  CalendarClock,
  HelpCircle,
  Camera,
  Users,
  FileText,
} from "lucide-react";

const FEATURES_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663330217393/VZvahsqxvigDNCtzbEoTYw/features-illustration-NSD6ReeYDNTmrFSHSouU2B.webp";

const features = [
  {
    icon: Languages,
    title: "שלוש שפות, זיהוי אוטומטי",
    description:
      "פורלי עונה בעברית, ערבית ואנגלית — עם זיהוי שפה אוטומטי. הלקוח מדבר, פורלי מבינה.",
    accent: "forest" as const,
    span: "md:col-span-2 lg:col-span-1",
  },
  {
    icon: CalendarClock,
    title: "קביעת שיחות חוזרות",
    description:
      '"מחר ב-8", "בין 4 ל-6", "בשבוע הבא אחה״צ" — פורלי מבינה הכל ושולחת תזכורת 30 דקות לפני.',
    accent: "burnt" as const,
    span: "md:col-span-1 lg:col-span-1",
  },
  {
    icon: HelpCircle,
    title: "מענה על שאלות",
    description:
      "בהתבסס על FAQ, מוצרים ושירותים שהעסק הגדיר — פורלי עונה בצורה מדויקת ומקצועית.",
    accent: "forest" as const,
    span: "md:col-span-1 lg:col-span-1",
  },
  {
    icon: Camera,
    title: "ניתוח תמונות ומסמכים",
    description:
      "לקוח שולח תמונה או מסמך? פורלי מנתחת ומגיבה בהתאם — בלי שבעל העסק צריך להתערב.",
    accent: "burnt" as const,
    span: "md:col-span-1 lg:col-span-1",
  },
  {
    icon: Users,
    title: "זיהוי לקוחות חוזרים",
    description:
      "פורלי מזהה לקוחות חוזרים ועסקים מרובים מאותו מספר — ומתאימה את השיחה בהתאם.",
    accent: "forest" as const,
    span: "md:col-span-1 lg:col-span-1",
  },
  {
    icon: FileText,
    title: "סיכום שיחה אוטומטי",
    description:
      "סיכום מלא נשלח לבעל העסק ולא פחות חשוב — ללקוח עצמו. שקיפות מלאה, אפס מאמץ.",
    accent: "burnt" as const,
    span: "md:col-span-2 lg:col-span-1",
  },
];

export default function FeaturesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="features" ref={ref} className="relative py-20 lg:py-32 paper-texture">
      <div className="container">
        {/* Header with illustration */}
        <div className="grid lg:grid-cols-12 gap-8 mb-16 lg:mb-20 items-end">
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-forest" />
              <span className="text-forest font-semibold text-sm">יכולות</span>
            </div>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-charcoal leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              מה פורלי
              <br />
              <span className="text-forest">יודעת לעשות?</span>
            </h2>
            <p className="text-warm-gray text-lg mt-4 max-w-xl">
              פורלי היא לא רק בוט — היא עוזרת אישית חכמה שמבינה הקשר, שפה
              ורגש.
            </p>
          </motion.div>

          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <img
              src={FEATURES_IMG}
              alt="איור של יכולות פורלי — שפות, לוח שנה, FAQ, מצלמה, סיכום"
              className="rounded-sm shadow-lg shadow-charcoal/5 w-full"
            />
          </motion.div>
        </div>

        {/* Grid — 3 columns on desktop, 2 on tablet */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              className={`${feature.span} group`}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
            >
              <div
                className={`h-full p-6 lg:p-7 rounded-sm border transition-all duration-300 ${
                  feature.accent === "forest"
                    ? "border-forest/8 hover:border-forest/20 bg-forest/[0.02] hover:bg-forest/[0.05]"
                    : "border-burnt/8 hover:border-burnt/20 bg-burnt/[0.02] hover:bg-burnt/[0.05]"
                }`}
              >
                <div
                  className={`w-11 h-11 rounded-sm flex items-center justify-center mb-4 transition-colors duration-300 ${
                    feature.accent === "forest"
                      ? "bg-forest/10 group-hover:bg-forest group-hover:text-cream"
                      : "bg-burnt/10 group-hover:bg-burnt group-hover:text-cream"
                  }`}
                >
                  <feature.icon
                    className={`w-5 h-5 transition-colors duration-300 ${
                      feature.accent === "forest"
                        ? "text-forest group-hover:text-cream"
                        : "text-burnt group-hover:text-cream"
                    }`}
                  />
                </div>
                <h3
                  className="text-lg font-bold text-charcoal mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {feature.title}
                </h3>
                <p className="text-warm-gray text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
