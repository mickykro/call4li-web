/*
 * Aurora Glass — Futuristic Navbar
 * Glass-morphism nav that transitions from transparent to frosted glass on scroll
 * Teal accent CTA, aurora gradient hover states
 */

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const MASCOT = "https://d2xsxph8kpxj0f.cloudfront.net/310519663330217393/VZvahsqxvigDNCtzbEoTYw/forli-mascot_583ebf4a.png";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setMobileOpen(false);
      if (href === "#") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    []
  );

  const links = [
    { label: "הבעיה", href: "#problem" },
    { label: "הפתרון", href: "#solution" },
    { label: "איך זה עובד", href: "#how-it-works" },
    { label: "יכולות", href: "#features" },
    { label: "צור קשר", href: "#cta" },
  ];

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-deep-space/80 backdrop-blur-xl border-b border-glass-border"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2.5"
          onClick={(e) => handleClick(e, "#")}
        >
          <img src={MASCOT} alt="פורלי" className="w-9 h-9 lg:w-10 lg:h-10" />
          <div className="flex items-center gap-1.5">
            <span
              className="text-xl lg:text-2xl font-bold text-text-primary"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Call4li
            </span>
            <span className="text-xs text-text-secondary hidden sm:inline">
              | פורלי
            </span>
          </div>
        </a>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-7">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="text-sm font-medium text-text-secondary hover:text-aurora-teal transition-colors duration-300 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 right-0 w-0 h-[2px] bg-aurora-teal group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <a
            href="https://wa.me/972553163293"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-aurora-teal/15 text-aurora-teal border border-aurora-teal/30 px-5 py-2 rounded-lg text-sm font-semibold hover:bg-aurora-teal/25 hover:border-aurora-teal/50 transition-all duration-300 glow-teal-sm"
          >
            התחילו עכשיו
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-text-primary p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-deep-space/95 backdrop-blur-xl border-t border-glass-border overflow-hidden"
          >
            <div className="container py-6 flex flex-col gap-3">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-base font-medium text-text-secondary hover:text-aurora-teal transition-colors py-2.5 border-b border-glass-border"
                  onClick={(e) => handleClick(e, link.href)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#cta"
                className="bg-aurora-teal/15 text-aurora-teal border border-aurora-teal/30 px-5 py-3 rounded-lg text-sm font-semibold text-center mt-2 hover:bg-aurora-teal/25 transition-all"
                onClick={(e) => handleClick(e, "#cta")}
              >
                התחילו עכשיו
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
