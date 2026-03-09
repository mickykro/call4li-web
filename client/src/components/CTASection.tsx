/*
 * Design: Editorial / Paper & Ink
 * CTA section: Dark forest green background with cream text
 * Uses the CTA background image, strong call to action
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowLeft, Phone, Mail } from "lucide-react";

const CTA_BG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663330217393/VZvahsqxvigDNCtzbEoTYw/cta-bg-SVUpM5ywzbhnWu4ps24Qbo.webp";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function CTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="cta"
      ref={ref}
      className="relative py-24 lg:py-36 overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${CTA_BG})` }}
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-forest/92" />

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            {/* Decorative line */}
            <div className="w-16 h-[2px] bg-burnt mx-auto mb-8" />

            <h2
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-cream leading-tight mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              מוכנים להפסיק
              <br />
              <span className="text-burnt-light">לאבד לקוחות?</span>
            </h2>

            <p className="text-cream/75 text-lg lg:text-xl leading-relaxed mb-12 max-w-xl mx-auto">
              הצטרפו לעסקים שכבר לא מפספסים שיחות. פורלי עובדת 24/7, בשלוש
              שפות, בלי שתצטרכו לעשות כלום.
            </p>
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <a
              href="https://wa.me/972000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-burnt text-cream px-8 py-4 rounded-sm text-base font-bold hover:bg-burnt-light transition-all duration-300 shadow-lg shadow-burnt/30 hover:shadow-xl flex items-center gap-3 group"
            >
              <WhatsAppIcon className="w-5 h-5" />
              <span>דברו איתנו בוואטסאפ</span>
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            </a>
            <a
              href="tel:+972000000000"
              className="border-2 border-cream/25 text-cream px-8 py-4 rounded-sm text-base font-semibold hover:border-cream/50 hover:bg-cream/10 transition-all duration-300 flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>התקשרו אלינו</span>
            </a>
          </motion.div>

          {/* Contact info */}
          <motion.div
            className="flex flex-wrap gap-8 justify-center text-cream/50 text-sm"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <a
              href="mailto:info@call4li.com"
              className="flex items-center gap-2 hover:text-cream/80 transition-colors duration-300"
            >
              <Mail className="w-4 h-4" />
              <span>info@call4li.com</span>
            </a>
            <a
              href="tel:+972000000000"
              className="flex items-center gap-2 hover:text-cream/80 transition-colors duration-300"
            >
              <Phone className="w-4 h-4" />
              <span dir="ltr">+972-XX-XXX-XXXX</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
