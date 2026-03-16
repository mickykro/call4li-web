/*
 * Aurora Glass — Futuristic Hero
 * Dark space background with aurora gradients
 * Forli owl mascot floating prominently
 * Glass-morphism stat cards, aurora gradient CTA
 */

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663330217393/VZvahsqxvigDNCtzbEoTYw/futuristic-hero-bg-J9fwSruvUEqonLoCBxzp8y.webp";
const MASCOT = "https://d2xsxph8kpxj0f.cloudfront.net/310519663330217393/VZvahsqxvigDNCtzbEoTYw/forli-mascot_583ebf4a.png";

function smoothScroll(href: string) {
  return (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Aurora background */}
      <div className="absolute inset-0">
        <img
          src={HERO_BG}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-deep-space/40" />
        {/* Subtle grid texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(74,234,220,1) 1px, transparent 1px), linear-gradient(90deg, rgba(74,234,220,1) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-aurora-teal/10 blur-[120px]"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-aurora-violet/10 blur-[100px]"
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        />
      </div>

      <div className="container relative z-10 pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Text content — right side in RTL */}
          <motion.div
            className="lg:col-span-7 order-2 lg:order-1"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Eyebrow badge */}
            <motion.div
              className="inline-flex items-center gap-2 glass-card px-4 py-1.5 mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <span className="w-2 h-2 rounded-full bg-aurora-teal animate-pulse" />
              <span className="text-aurora-teal text-xs font-semibold tracking-wider">
                AI-POWERED ASSISTANT
              </span>
            </motion.div>

            {/* Main headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-text-primary leading-[1.1] mb-6">
              שיחה שלא נענתה
              <br />
              <span className="aurora-text">היא לקוח שאבד</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg lg:text-xl text-text-secondary leading-relaxed max-w-xl mb-10">
              <strong className="text-aurora-teal">פורלי</strong> היא העוזרת האישית
              החכמה שמטפלת בכל שיחה שלא נענתה — אוטומטית, דרך WhatsApp, בשלוש
              שפות. בלי שתרימו אצבע.
            </p>

            {/* Stats row */}
            <motion.div
              className="flex flex-nowrap gap-3 sm:gap-4 mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              {[
                { value: "570K+", label: "עסקים פעילים בישראל", color: "text-aurora-teal" },
                { value: "85%", label: "לא ישאירו הודעה", color: "text-aurora-violet" },
                { value: "24/7", label: "זמינות מלאה", color: "text-aurora-blue" },
              ].map((stat, i) => (
                <div key={i} className="glass-card px-4 sm:px-5 py-3 text-center flex-1">
                  <div
                    className={`text-2xl lg:text-3xl font-extrabold ${stat.color}`}
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs text-text-muted mt-1">{stat.label}</div>
                </div>
              ))}
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
                className="relative bg-gradient-to-l from-aurora-teal to-aurora-blue text-deep-space px-8 py-4 rounded-xl text-base font-bold hover:shadow-lg hover:shadow-aurora-teal/30 transition-all duration-300 animate-pulse-glow"
              >
                רוצה לנסות? דברו איתנו
              </a>
              <a
                href="#how-it-works"
                onClick={smoothScroll("#how-it-works")}
                className="glass-card px-8 py-4 text-text-primary text-base font-semibold hover:bg-glass-white transition-all duration-300 !rounded-xl"
              >
                איך זה עובד?
              </a>
            </motion.div>
          </motion.div>

          {/* Mascot — left side in RTL */}
          <motion.div
            className="lg:col-span-5 order-1 lg:order-2 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
          >
            <div className="relative">
              {/* Glow behind mascot */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-full bg-aurora-teal/15 blur-[60px]" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 lg:w-64 lg:h-64 rounded-full bg-aurora-violet/10 blur-[40px]" />
              </div>

              {/* Mascot image */}
              <motion.img
                src={MASCOT}
                alt="פורלי — העוזרת האישית החכמה"
                className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-96 lg:h-96 object-contain drop-shadow-2xl"
                animate={{ y: [0, -12, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              />

              {/* Floating glass badges around mascot */}
              <motion.div
                className="absolute -top-2 -right-4 glass-card px-3 py-1.5 text-xs font-semibold text-aurora-teal"
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 0.5 }}
              >
                🦉 AI חכם
              </motion.div>
              <motion.div
                className="absolute bottom-8 -left-6 glass-card px-3 py-1.5 text-xs font-semibold text-aurora-violet"
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 1 }}
              >
                WhatsApp אוטומטי
              </motion.div>
              <motion.div
                className="absolute top-1/2 -left-8 glass-card px-3 py-1.5 text-xs font-semibold text-aurora-blue"
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut", delay: 1.5 }}
              >
                3 שפות
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
          <ArrowDown className="w-5 h-5 text-aurora-teal/50" />
        </motion.div>
      </div>
    </section>
  );
}
