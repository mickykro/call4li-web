/*
 * Design: Editorial / Paper & Ink
 * Solution section: Two-column asymmetric layout with phone mockup
 * WhatsApp conversation illustration on left, text on right (RTL)
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MessageCircle, Bot, Zap } from "lucide-react";

const WHATSAPP_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663330217393/VZvahsqxvigDNCtzbEoTYw/whatsapp-conversation-EtZdu85YvP7MgbRmKYY4cZ.webp";

export default function SolutionSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const highlights = [
    {
      icon: Bot,
      title: "זיהוי אוטומטי",
      text: "פורלי מזהה שיחה שלא נענתה ופונה ללקוח מיד",
    },
    {
      icon: MessageCircle,
      title: "שיחה חכמה ב-WhatsApp",
      text: "מנהלת שיחה בשפה טבעית בשם העסק שלכם",
    },
    {
      icon: Zap,
      title: "סיכום מלא לבעל העסק",
      text: "כל מה שצריך לדעת — מסוכם ומוכן, בלי מאמץ",
    },
  ];

  return (
    <section id="solution" ref={ref} className="relative py-20 lg:py-32 paper-texture">
      {/* Decorative diagonal */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-cream-dark" style={{
        clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 100%)"
      }} />

      <div className="container relative">
        {/* Section header */}
        <motion.div
          className="max-w-3xl mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-forest" />
            <span className="text-forest font-semibold text-sm">הפתרון</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-charcoal leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            הכירו את{" "}
            <span className="text-forest">פורלי</span>
            <br />
            העוזרת האישית החכמה שלכם
          </h2>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Text content */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <p className="text-lg text-warm-gray leading-relaxed mb-10 max-w-xl">
              Call4li מפעילה עוזרת אישית חכמה בשם{" "}
              <strong className="text-forest">פורלי</strong> — שפועלת ברגע
              שהשיחה לא נענית. כשלקוח מתקשר לעסק ולא נענה, פורלי מזהה אוטומטית
              את השיחה, פונה ללקוח ב-WhatsApp בשמו של העסק, ומנהלת שיחה חכמה
              בשפה טבעית.
            </p>

            <div className="space-y-6">
              {highlights.map((item, i) => (
                <motion.div
                  key={i}
                  className="flex gap-4 items-start group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.15, duration: 0.6 }}
                >
                  <div className="w-11 h-11 rounded-sm bg-forest/10 flex items-center justify-center shrink-0 group-hover:bg-forest group-hover:text-cream transition-all duration-300">
                    <item.icon className="w-5 h-5 text-forest group-hover:text-cream transition-colors duration-300" />
                  </div>
                  <div>
                    <h4
                      className="text-base font-bold text-charcoal mb-1"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {item.title}
                    </h4>
                    <p className="text-warm-gray text-sm leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Emphasis line */}
            <motion.p
              className="mt-10 text-base font-semibold text-forest border-r-4 border-forest pr-4"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 1, duration: 0.6 }}
            >
              מסבירה, קובעת שיחה חוזרת, עונה על שאלות, ושולחת סיכום מלא — הכל
              בלי שהרמתם אצבע.
            </motion.p>
          </motion.div>

          {/* Phone mockup with WhatsApp conversation */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative max-w-sm mx-auto lg:mx-0">
              {/* Background decoration */}
              <div className="absolute -inset-6 bg-forest/5 rounded-lg -rotate-3" />
              <div className="absolute -inset-4 border-2 border-burnt/10 rounded-lg rotate-2" />

              <img
                src={WHATSAPP_IMG}
                alt="פורלי מנהלת שיחת WhatsApp חכמה עם לקוח"
                className="relative rounded-lg shadow-2xl shadow-charcoal/15 w-full"
              />

              {/* Floating label */}
              <motion.div
                className="absolute -top-3 -left-3 bg-forest text-cream px-3 py-1.5 rounded-sm shadow-lg text-xs font-bold"
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              >
                WhatsApp אוטומטי
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
