/*
 * Design: Editorial / Paper & Ink
 * Hero: Full-width with asymmetric layout, oversized Hebrew headline
 * Large editorial typography with warm cream background
 * Hero illustration on the left, text on the right (RTL)
 */

import { motion } from "framer-motion";
import { PhoneOff, ArrowDown } from "lucide-react";

const HERO_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663330217393/VZvahsqxvigDNCtzbEoTYw/hero-bg-8w2z4ffK5ERjCWEzwZudgZ.webp";

function smoothScroll(href: string) {
  return (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center paper-texture overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-forest/5 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-burnt/5 blur-3xl" />

      <div className="container pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Text content — right side in RTL */}
          <motion.div
            className="lg:col-span-7 order-2 lg:order-1"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Eyebrow */}
            <motion.div
              className="flex items-center gap-3 mb-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="w-12 h-[2px] bg-burnt" />
              <span className="text-burnt font-semibold text-sm tracking-wide uppercase">
                Call4li
              </span>
            </motion.div>

            {/* Main headline */}
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-charcoal leading-[1.15] mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              שיחה שלא נענתה
              <br />
              <span className="text-forest">היא לקוח שאבד</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg lg:text-xl text-warm-gray leading-relaxed max-w-xl mb-8">
              <strong className="text-charcoal">פורלי</strong> היא העוזרת האישית
              החכמה שמטפלת בכל שיחה שלא נענתה — אוטומטית, דרך WhatsApp, בשלוש
              שפות. בלי שתרימו אצבע.
            </p>

            {/* Stats bar */}
            <motion.div
              className="flex flex-wrap gap-8 mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <div>
                <div
                  className="text-3xl lg:text-4xl font-black text-forest"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  570K+
                </div>
                <div className="text-sm text-warm-gray mt-1">
                  עסקים פעילים בישראל
                </div>
              </div>
              <div className="w-[1px] bg-forest/15 hidden sm:block" />
              <div>
                <div
                  className="text-3xl lg:text-4xl font-black text-burnt"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  85%
                </div>
                <div className="text-sm text-warm-gray mt-1">
                  לא ישאירו הודעה
                </div>
              </div>
              <div className="w-[1px] bg-forest/15 hidden sm:block" />
              <div>
                <div className="flex items-center gap-2">
                  <PhoneOff className="w-6 h-6 text-burnt/60" />
                  <span
                    className="text-3xl lg:text-4xl font-black text-charcoal"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    מיליוני
                  </span>
                </div>
                <div className="text-sm text-warm-gray mt-1">
                  שיחות אבודות ביום
                </div>
              </div>
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <a
                href="#cta"
                onClick={smoothScroll("#cta")}
                className="bg-forest text-cream px-8 py-4 rounded-sm text-base font-semibold hover:bg-forest-light transition-all duration-300 shadow-lg shadow-forest/20 hover:shadow-xl hover:shadow-forest/30"
              >
                רוצה לנסות? דברו איתנו
              </a>
              <a
                href="#how-it-works"
                onClick={smoothScroll("#how-it-works")}
                className="border-2 border-forest/20 text-forest px-8 py-4 rounded-sm text-base font-semibold hover:border-forest/40 hover:bg-forest/5 transition-all duration-300"
              >
                איך זה עובד?
              </a>
            </motion.div>
          </motion.div>

          {/* Hero image — left side in RTL */}
          <motion.div
            className="lg:col-span-5 order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative">
              {/* Decorative frame */}
              <div className="absolute -inset-3 bg-forest/5 rounded-sm -rotate-2" />
              <div className="absolute -inset-3 border-2 border-forest/10 rounded-sm rotate-1" />
              <img
                src={HERO_IMG}
                alt="בעלת עסק עסוקה בחנות בזמן שהטלפון מצלצל ללא מענה"
                className="relative rounded-sm shadow-2xl shadow-charcoal/10 w-full"
              />
              {/* Floating badge */}
              <motion.div
                className="absolute -bottom-4 -right-4 bg-burnt text-cream px-4 py-2 rounded-sm shadow-lg"
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              >
                <span className="text-xs font-bold">100% אוטומטי</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown className="w-5 h-5 text-forest/40" />
        </motion.div>
      </div>
    </section>
  );
}
