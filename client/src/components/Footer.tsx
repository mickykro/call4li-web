/*
 * Aurora Glass — Footer
 * Minimal dark footer with glass border, aurora accents
 */

import { Link } from "wouter";

const MASCOT = "https://d2xsxph8kpxj0f.cloudfront.net/310519663330217393/VZvahsqxvigDNCtzbEoTYw/forli-mascot_583ebf4a.png";

// TODO: עדכן פרטי עסק אלה לפני העלאה לאוויר
const BUSINESS_DETAILS = {
  name: "Call4li",
  // registrationNumber: "ח.פ / עוסק מורשה: [מספר]",
  // address: "[כתובת מלאה]",
  email: "info@call4li.com",
  phone: "054-801-8957",
};

export default function Footer() {
  const navLinks = [
    { label: "הבעיה", href: "#problem" },
    { label: "הפתרון", href: "#solution" },
    { label: "איך זה עובד", href: "#how-it-works" },
    { label: "יכולות", href: "#features" },
    { label: "צור קשר", href: "#cta" },
  ];

  const legalLinks = [
    { label: "תקנון אתר", href: "/terms" },
    { label: "מדיניות פרטיות", href: "/privacy" },
    { label: "הצהרת נגישות", href: "/accessibility" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer className="relative border-t border-glass-border bg-deep-space/80 backdrop-blur-sm" dir="rtl">
      <div className="container py-10">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          {/* Logo + business details */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <img src={MASCOT} alt="פורלי" className="w-8 h-8" />
              <div>
                <span
                  className="text-lg font-bold text-text-primary"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Call4li
                </span>
                <span className="text-text-muted text-xs mr-2">
                  {" "}| פורלי — העוזרת האישית החכמה
                </span>
              </div>
            </div>
            <div className="text-xs text-text-muted space-y-0.5 pr-1">
              {/* TODO: בטל הערה ועדכן לאחר קבלת פרטי עסק */}
              {/* <p>{BUSINESS_DETAILS.registrationNumber}</p> */}
              {/* <p>{BUSINESS_DETAILS.address}</p> */}
              <p>{BUSINESS_DETAILS.email}</p>
              <p dir="ltr" className="text-right">{BUSINESS_DETAILS.phone}</p>
            </div>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-5 justify-center">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm text-text-muted hover:text-aurora-teal transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-glass-border my-6" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-text-muted">
          <p>&copy; {new Date().getFullYear()} Call4li. כל הזכויות שמורות.</p>

          {/* Legal links */}
          <nav className="flex gap-4">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-aurora-teal transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <p>נבנה עם אהבה לעסקים קטנים בישראל</p>
        </div>
      </div>
    </footer>
  );
}
