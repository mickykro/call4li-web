/*
 * Design: Editorial / Paper & Ink
 * Footer: Minimal, editorial style with horizontal rule
 */

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-cream/60 py-12">
      <div className="container">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <span
              className="text-2xl font-bold text-cream"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Call4li
            </span>
            <span className="text-cream/30">|</span>
            <span className="text-sm text-cream/40">
              פורלי — העוזרת האישית החכמה
            </span>
          </div>

          {/* Nav links */}
          <nav className="flex items-center gap-6 text-sm">
            <a
              href="#problem"
              className="hover:text-cream transition-colors duration-300"
            >
              הבעיה
            </a>
            <a
              href="#solution"
              className="hover:text-cream transition-colors duration-300"
            >
              הפתרון
            </a>
            <a
              href="#how-it-works"
              className="hover:text-cream transition-colors duration-300"
            >
              איך זה עובד
            </a>
            <a
              href="#features"
              className="hover:text-cream transition-colors duration-300"
            >
              יכולות
            </a>
            <a
              href="#cta"
              className="text-burnt-light hover:text-burnt transition-colors duration-300"
            >
              צור קשר
            </a>
          </nav>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-cream/10 mb-6" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream/30">
          <span>&copy; {year} Call4li. כל הזכויות שמורות.</span>
          <span>נבנה עם אהבה לעסקים קטנים בישראל</span>
        </div>
      </div>
    </footer>
  );
}
