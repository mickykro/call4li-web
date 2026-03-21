import { useState, useEffect } from "react";
import { Link } from "wouter";
import { X } from "lucide-react";

const STORAGE_KEY = "call4li_cookie_notice_dismissed";

export default function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (!dismissed) setVisible(true);
  }, []);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 bg-deep-space/95 border-t border-glass-border backdrop-blur-sm"
      dir="rtl"
      role="dialog"
      aria-label="הודעת Cookies"
    >
      <div className="container py-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between">
        <p className="text-sm text-text-muted">
          אתר זה משתמש ב-cookies טכניים הכרחיים בלבד לתפקוד האתר. אין שימוש בcookies שיווקיים או מעקב.{" "}
          <Link href="/privacy" className="text-aurora-teal hover:underline">
            מדיניות פרטיות
          </Link>
        </p>
        <button
          onClick={dismiss}
          aria-label="סגור הודעה"
          className="shrink-0 flex items-center gap-2 text-sm text-text-muted hover:text-text-primary transition-colors px-3 py-1 rounded border border-glass-border hover:border-aurora-teal"
        >
          <span>הבנתי</span>
          <X className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
