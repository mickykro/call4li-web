/*
 * Design: Editorial / Paper & Ink
 * Navbar: Minimal, transparent on top, becomes solid on scroll
 * Font: Frank Ruhl Libre for logo, Heebo for links
 * Colors: Forest green primary, cream background, burnt orange accent
 */

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

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
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
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
          ? "bg-cream/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <span
            className="text-2xl lg:text-3xl font-bold text-forest"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Call4li
          </span>
          <span
            className="text-sm text-warm-gray hidden sm:inline"
            style={{ fontFamily: "var(--font-body)" }}
          >
            | פורלי
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="text-sm font-medium text-charcoal/70 hover:text-forest transition-colors duration-300"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#cta"
            onClick={(e) => handleClick(e, "#cta")}
            className="bg-burnt text-cream px-5 py-2.5 rounded-sm text-sm font-semibold hover:bg-burnt-light transition-colors duration-300 shadow-sm"
            style={{ fontFamily: "var(--font-body)" }}
          >
            התחילו עכשיו
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-forest p-2"
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
            className="lg:hidden bg-cream/98 backdrop-blur-md border-t border-forest/10 overflow-hidden"
          >
            <div className="container py-6 flex flex-col gap-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-base font-medium text-charcoal/80 hover:text-forest transition-colors py-2"
                  onClick={(e) => handleClick(e, link.href)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#cta"
                className="bg-burnt text-cream px-5 py-3 rounded-sm text-sm font-semibold text-center mt-2 hover:bg-burnt-light transition-colors"
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
