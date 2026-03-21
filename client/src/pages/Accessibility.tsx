import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import SEO from "@/components/SEO";

const Accessibility = () => {
  return (
    <>
      <SEO
        title="הצהרת נגישות - Call4li"
        description="הצהרת הנגישות של אתר Call4li — מחויבותנו לנגישות דיגיטלית."
        canonicalUrl={`${import.meta.env.VITE_DOMAIN_URL || "https://call4li.com"}/accessibility`}
      />
      <div className="min-h-screen bg-background text-foreground" dir="rtl">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="mb-8">
            <Link href="/">
              <Button variant="ghost" className="mb-4 text-muted-foreground hover:text-foreground">
                <ArrowRight className="ml-2 h-4 w-4" />
                חזרה לדף הבית
              </Button>
            </Link>
            <h1 className="text-4xl font-bold mb-4 text-foreground">הצהרת נגישות</h1>
            <p className="text-muted-foreground">
              עודכן לאחרונה: {new Date().toLocaleDateString("he-IL")}
            </p>
          </div>

          <div className="space-y-8 text-foreground/90 leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold mb-4">מחויבותנו לנגישות</h2>
              <p className="mb-3">
                Call4li מחויבת להנגיש את האתר ואת שירותיה לאנשים עם מוגבלויות, בהתאם לחוק שוויון
                זכויות לאנשים עם מוגבלות, התשנ"ח-1998, ותקנות הנגישות הנגזרות ממנו.
              </p>
              <p>
                אנו שואפים לעמוד בדרישות תקן ישראלי 5568 (המבוסס על WCAG 2.1 ברמה AA) ולהבטיח שהאתר
                נגיש ושמיש עבור כלל המשתמשים.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">מה עשינו לשיפור הנגישות</h2>
              <ul className="list-disc pr-6 space-y-2">
                <li>שימוש בעיצוב RTL (ימין לשמאל) מלא עבור תוכן בעברית</li>
                <li>ניגודיות צבעים תקנית בין טקסט לרקע</li>
                <li>כותרות מובנות היררכית (H1, H2, H3)</li>
                <li>טקסט חלופי (alt text) לתמונות</li>
                <li>קישורים ברורים עם תיאור תוכן מובן</li>
                <li>תמיכה בניווט מקלדת</li>
                <li>שימוש ב-semantic HTML לנגישות כלי עזר</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">מגבלות ידועות</h2>
              <p className="mb-3">
                אנו עובדים באופן שוטף לשיפור הנגישות. יתכנו אזורים באתר שטרם הונגשו במלואם, ובהם:
              </p>
              <ul className="list-disc pr-6 space-y-2">
                <li>אנימציות ותכנים דינמיים — בחלק מהמקרים לא ניתן לכבות אנימציות</li>
                <li>רכיבי צד שלישי (כגון ממשקי מפות) — ייתכן שאינם נגישים במלואם</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">פניות בנושא נגישות</h2>
              <p className="mb-4">
                נתקלת בבעיית נגישות? אנו מזמינים אותך לפנות אלינו. נשתדל לטפל בפנייה בהקדם האפשרי
                ולא יאוחר מ-5 ימי עסקים.
              </p>
              <div className="bg-card border border-border/20 p-6 rounded-lg space-y-2">
                <p className="font-semibold">רכז/ת נגישות — Call4li</p>
                <p>אימייל: <a href="mailto:info@call4li.com" className="text-aurora-teal hover:underline">info@call4li.com</a></p>
                <p>
                  טלפון:{" "}
                  <a href="tel:+972548018957" className="text-aurora-teal hover:underline" dir="ltr">
                    054-801-8957
                  </a>
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">תאריך עדכון אחרון</h2>
              <p>
                הצהרת נגישות זו עודכנה לאחרונה ב-{new Date().toLocaleDateString("he-IL")}.
                אנו מתחייבים לעדכנה בהתאם לשינויים באתר ולדרישות החוק.
              </p>
            </section>

            <section className="border-t border-border/20 pt-6">
              <p className="text-sm text-muted-foreground">
                הצהרת נגישות זו נכתבה בהתאם לחוק שוויון זכויות לאנשים עם מוגבלות (תיקון מס' 2), התשע"ה-2014
                ותקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע"ג-2013.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Accessibility;
