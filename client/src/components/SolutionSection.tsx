/*
 * Solution Section — Emerald / Green theme
 * ContainerScroll 3D tilt animation from Aceternity UI
 * WhatsApp chat mockup inside the 3D card
 */

import { motion } from "framer-motion";
import { MessageCircle, Bot, Zap, PhoneCall, CheckCheck } from "lucide-react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

const MASCOT = "https://d2xsxph8kpxj0f.cloudfront.net/310519663330217393/VZvahsqxvigDNCtzbEoTYw/forli-mascot_583ebf4a.png";

const highlights = [
  {
    icon: Bot,
    title: "זיהוי אוטומטי",
    text: "פורלי מזהה שיחה שלא נענתה ופונה ללקוח מיד",
    color: "#10B981",
    bg: "rgba(16,185,129,0.12)",
  },
  {
    icon: MessageCircle,
    title: "שיחה חכמה ב-WhatsApp",
    text: "מנהלת שיחה בשפה טבעית בשם העסק שלכם",
    color: "#34D399",
    bg: "rgba(52,211,153,0.10)",
  },
  {
    icon: Zap,
    title: "סיכום מלא לבעל העסק",
    text: "כל מה שצריך לדעת — מסוכם ומוכן, בלי מאמץ",
    color: "#6EE7B7",
    bg: "rgba(110,231,183,0.08)",
  },
];

const chatMessages = [
  { from: "system", text: "📞 שיחה נכנסת לא נענתה מ-050-1234567", time: "14:32" },
  {
    from: "forli",
    text: "שלום! אני פורלי, העוזרת של 'גרינשטיין שיפוצים'. ראיתי שניסית להתקשר — איך אפשר לעזור? 😊",
    time: "14:32",
  },
  { from: "customer", text: "היי, רציתי לשאול על מחיר לצביעת דירה 4 חדרים", time: "14:33" },
  {
    from: "forli",
    text: "בשמחה! לדירת 4 חדרים הטווח הרגיל הוא 3,500–5,500 ₪ תלוי במצב הקירות. אפשר לתאם ביקור להערכה מדויקת?",
    time: "14:33",
  },
  { from: "customer", text: "כן, מתי אפשר?", time: "14:35" },
  {
    from: "forli",
    text: "נהדר! מה מתאים לך יותר — יום שלישי ב-10:00 או חמישי ב-16:00?",
    time: "14:35",
  },
  { from: "customer", text: "שלישי ב-10 מושלם 👍", time: "14:36" },
  {
    from: "forli",
    text: "מעולה! קבענו ליום שלישי ב-10:00. ירון מגרינשטיין יתקשר לאישור. תודה! ✅",
    time: "14:36",
  },
  {
    from: "summary",
    text: "📋 סיכום נשלח לבעל העסק: לקוח חדש | צביעת דירה 4 חד' | פגישה: שלישי 10:00 | טלפון: 050-1234567",
    time: "14:36",
  },
];

function WhatsAppChat() {
  return (
    <div className="flex flex-col h-full bg-[#0b1a12] rounded-xl overflow-hidden" dir="rtl">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-[#1a3a2a] border-b border-emerald-900/40">
        <div className="relative">
          <img src={MASCOT} alt="פורלי" className="w-9 h-9 rounded-full object-cover bg-emerald-900" />
          <span className="absolute bottom-0 left-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#1a3a2a]" />
        </div>
        <div>
          <p className="text-sm font-bold text-white leading-none">פורלי</p>
          <p className="text-[11px] text-emerald-400 mt-0.5">מחוברת • עוזרת חכמה</p>
        </div>
        <div className="mr-auto flex gap-3 text-emerald-400/60">
          <PhoneCall className="w-4 h-4" />
          <MessageCircle className="w-4 h-4" />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2 scrollbar-hide">
        {chatMessages.map((msg, i) => {
          if (msg.from === "system") {
            return (
              <div key={i} className="flex justify-center">
                <span className="text-[10px] text-emerald-600/80 bg-emerald-950/60 px-3 py-1 rounded-full">
                  {msg.text}
                </span>
              </div>
            );
          }
          if (msg.from === "summary") {
            return (
              <div key={i} className="flex justify-center">
                <span className="text-[10px] text-amber-400/90 bg-amber-950/50 border border-amber-800/30 px-3 py-1.5 rounded-xl max-w-xs text-center leading-relaxed">
                  {msg.text}
                </span>
              </div>
            );
          }
          const isForli = msg.from === "forli";
          return (
            <div key={i} className={`flex ${isForli ? "justify-start" : "justify-end"}`}>
              <div
                className={`max-w-[72%] px-3 py-2 rounded-2xl text-[12px] leading-relaxed ${
                  isForli
                    ? "bg-[#1a3a2a] text-white rounded-tr-none"
                    : "bg-emerald-600 text-white rounded-tl-none"
                }`}
              >
                <p>{msg.text}</p>
                <div className={`flex items-center gap-1 mt-1 ${isForli ? "justify-start" : "justify-end"}`}>
                  <span className="text-[9px] opacity-50">{msg.time}</span>
                  {!isForli && <CheckCheck className="w-3 h-3 opacity-60" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function SolutionSection() {
  return (
    <section id="solution" className="relative overflow-hidden">
      {/* Background — emerald */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-space via-emerald-900/90 to-deep-space" />
      <div className="absolute top-0 left-0 w-[500px] h-[300px] bg-emerald-500/30 blur-[60px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[250px] bg-emerald-600/25 blur-[50px] rounded-full pointer-events-none" />

      <div className="relative z-10">
        <ContainerScroll
          titleComponent={
            <div className="max-w-3xl mx-auto mb-8 text-right" dir="rtl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 glass-card px-4 py-1.5 mb-5 border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 text-xs font-semibold tracking-wider">הפתרון</span>
              </div>

              {/* Headline */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary leading-tight mb-4">
                הכירו את{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #10B981, #34D399, #6EE7B7, #10B981)",
                    backgroundSize: "200% 200%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    animation: "aurora-shift 4s ease-in-out infinite",
                  }}
                >
                  פורלי
                </span>
                <br />
                העוזרת האישית החכמה שלכם
              </h2>

              <p className="text-base text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto text-center">
                כשלקוח מתקשר לעסק ולא נענה — פורלי מזהה אוטומטית, פונה ב-WhatsApp, מנהלת שיחה חכמה ושולחת לכם סיכום.
              </p>

              {/* Highlights row */}
              <div className="flex flex-wrap justify-center gap-3">
                {highlights.map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-2 glass-card px-4 py-2"
                    style={{ borderRight: `2px solid ${item.color}55`, borderRadius: "0.75rem" }}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 3.5 }}
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: item.bg }}
                    >
                      <item.icon className="w-3.5 h-3.5" style={{ color: item.color }} />
                    </div>
                    <span className="text-xs font-semibold text-text-primary">{item.title}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          }
        >
          <WhatsAppChat />
        </ContainerScroll>
      </div>
    </section>
  );
}
