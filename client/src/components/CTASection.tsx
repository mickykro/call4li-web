/*
 * CTA Section — Rainbow animated border, magenta/pink headline
 * Shimmer sweep on primary button
 * Dramatic violet/magenta background orbs
 * Slow-spinning outer glow ring on card
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Phone } from "lucide-react";

const CTA_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663330217393/VZvahsqxvigDNCtzbEoTYw/futuristic-cta-bg-76wY7NoJNzttDBHqfYFjfU.webp";
const MASCOT = "https://d2xsxph8kpxj0f.cloudfront.net/310519663330217393/VZvahsqxvigDNCtzbEoTYw/forli-mascot_583ebf4a.png";

export default function CTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="cta" ref={ref} className="relative py-24 lg:py-36 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={CTA_BG} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-deep-space/65" />
      </div>

      {/* Dramatic magenta/violet orbs */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "rgba(236,72,153,0.08)", filter: "blur(100px)" }}
        animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-[350px] h-[350px] rounded-full pointer-events-none"
        style={{ background: "rgba(139,92,246,0.10)", filter: "blur(90px)" }}
        animate={{ x: [0, -15, 0], y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 11, ease: "easeInOut" }}
      />

      <div className="container relative z-10">
        {/* Card with animated rainbow border */}
        <motion.div
          className="animate-border-rainbow p-10 lg:p-16 text-center max-w-3xl mx-auto relative overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderRadius: "1.5rem",
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Inner glow effects */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[200px] rounded-full pointer-events-none" style={{ background: "rgba(236,72,153,0.08)", filter: "blur(80px)" }} />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[250px] h-[150px] rounded-full pointer-events-none" style={{ background: "rgba(139,92,246,0.08)", filter: "blur(60px)" }} />

          <div className="relative">
            {/* Mascot */}
            <motion.img
              src={MASCOT}
              alt="פורלי"
              className="w-20 h-20 lg:w-24 lg:h-24 mx-auto mb-6 object-contain drop-shadow-2xl"
              animate={{ y: [0, -7, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            />

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary leading-tight mb-4">
              מוכנים להפסיק
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #EC4899, #A78BFA, #F472B6, #EC4899)",
                  backgroundSize: "200% 200%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: "aurora-shift 3.5s ease-in-out infinite",
                }}
              >
                לאבד לקוחות?
              </span>
            </h2>

            <p className="text-text-secondary text-lg max-w-lg mx-auto mb-10 leading-relaxed">
              הצטרפו לעסקים שכבר לא מפספסים שיחות. פורלי עובדת 24/7,
              בשלוש שפות, בלי שתצטרכו לעשות כלום.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* Primary — shimmer on hover */}
              <a
                href="https://wa.me/972553163293"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shimmer inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #EC4899, #8B5CF6)",
                  color: "#fff",
                  boxShadow: "0 0 30px rgba(236,72,153,0.3)",
                }}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                דברו איתנו בוואטסאפ
              </a>

              {/* Secondary — glass with pink hover */}
              <a

                href="tel:+972548018957"
                className="inline-flex items-center justify-center gap-2 glass-card px-8 py-4 text-text-primary text-base font-semibold hover:bg-glass-white transition-all duration-300 !rounded-xl"
              >
                <Phone className="w-5 h-5" />
                התקשרו אלינו
              </a>
            </div>

            {/* Contact info */}
            <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-text-muted">
              <a href="mailto:info@call4li.com" className="hover:text-pink-400 transition-colors flex items-center gap-1.5">
                <span>✉</span> info@call4li.com
              </a>
              <a href="tel:+972548018957" className="hover:text-aurora-teal transition-colors flex items-center gap-1.5">
                <span>📞</span> חייגו אלינו
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
