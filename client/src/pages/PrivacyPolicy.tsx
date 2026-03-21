import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import SEO from "@/components/SEO";

const PrivacyPolicy = () => {
  return (
    <>
      <SEO
        title="מדיניות פרטיות - Call4li"
        description="מדיניות הפרטיות של Call4li — כיצד אנו אוספים, משתמשים ומגנים על המידע שלך."
        canonicalUrl={`${import.meta.env.VITE_DOMAIN_URL || "https://call4li.com"}/privacy`}
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
            <h1 className="text-4xl font-bold mb-4 text-foreground">מדיניות פרטיות</h1>
            <p className="text-muted-foreground">
              עודכן לאחרונה: {new Date().toLocaleDateString("he-IL")}
            </p>
          </div>

          <div className="space-y-8 text-foreground/90 leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. מבוא</h2>
              <p>
                ברוכים הבאים ל-Call4li. אנו מחויבים להגן על פרטיותך ולנהל את המידע האישי שלך באחריות.
                מדיניות פרטיות זו מסבירה כיצד אנו אוספים, משתמשים, מאחסנים ומגנים על המידע שלך בעת
                שימוש בשירותים שלנו.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. מידע שאנו אוספים</h2>
              <h3 className="text-xl font-medium mb-3">2.1 מידע שאתה מספק לנו</h3>
              <p className="mb-4">בעת השימוש בשירותי Call4li, אנו עשויים לאסוף את המידע הבא:</p>
              <ul className="list-disc pr-6 space-y-2">
                <li><strong>שם מלא</strong> — לצורך זיהוי ויצירת קשר</li>
                <li><strong>שם חברה</strong> — להבנת ההקשר העסקי שלך</li>
                <li><strong>תיאור העסק</strong> — כדי להתאים את השירות לצרכים שלך</li>
                <li><strong>כתובת אימייל</strong> — לתקשורת ועדכונים</li>
                <li><strong>מספר טלפון</strong> — לאספקת שירותי העברת שיחות</li>
              </ul>

              <h3 className="text-xl font-medium mb-3 mt-6">2.2 מידע שנאסף אוטומטית</h3>
              <ul className="list-disc pr-6 space-y-2">
                <li>נתוני שימוש באתר ופעולות שבוצעו</li>
                <li>תאריך ושעת פניות ופעולות</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. כיצד אנו משתמשים במידע</h2>
              <ul className="list-disc pr-6 space-y-2">
                <li>לספק ולנהל את שירותי העברת השיחות והמענה האוטומטי</li>
                <li>ליצור איתך קשר בנוגע לשירות ולעדכונים</li>
                <li>לשפר ולהתאים אישית את השירות שלנו</li>
                <li>לנתח ולשפר את ביצועי המערכת</li>
                <li>למלא אחר דרישות חוקיות ותקנות</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. שיתוף מידע עם צדדים שלישיים</h2>
              <p className="mb-4">אנו עשויים לשתף את המידע שלך עם ספקי שירות חיצוניים:</p>
              <ul className="list-disc pr-6 space-y-2">
                <li>ספקי שירותי אוטומציה לעיבוד נתונים (n8n)</li>
                <li>ספקי תשתית ואחסון ענן</li>
                <li>שירותי ניתוח ומדידה</li>
              </ul>
              <p className="mt-4">
                כל הספקים החיצוניים מחויבים לשמור על סודיות המידע ולהשתמש בו רק למטרות שלשמן הועבר.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. אבטחת מידע</h2>
              <ul className="list-disc pr-6 space-y-2 mt-4">
                <li>הצפנת נתונים בעת העברה ואחסון</li>
                <li>גישה מוגבלת למידע רק לעובדים המורשים</li>
                <li>בדיקות אבטחה ועדכונים שוטפים</li>
                <li>גיבויים סדירים של המידע</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. זכויותיך</h2>
              <ul className="list-disc pr-6 space-y-2">
                <li><strong>זכות עיון</strong> — לקבל מידע על הנתונים שאנו שומרים עליך</li>
                <li><strong>זכות תיקון</strong> — לבקש עדכון או תיקון של פרטים לא מדויקים</li>
                <li><strong>זכות מחיקה</strong> — לבקש למחוק את המידע שלך</li>
                <li><strong>זכות להתנגד</strong> — להתנגד לשימושים מסוימים במידע שלך</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. שמירת מידע</h2>
              <p>
                אנו שומרים את המידע האישי שלך כל עוד הוא נחוץ לאספקת השירות או למילוי חובות חוקיות.
                לאחר תקופה זו, המידע יימחק או יעובד לפורמט אנונימי.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. יצירת קשר</h2>
              <p className="mb-4">לשאלות או בקשות בנוגע למדיניות הפרטיות:</p>
              <div className="bg-card border border-border/20 p-6 rounded-lg">
                <p className="mb-2"><strong>Call4li — שירותי מענה חכם</strong></p>
                <p>אימייל: info@call4li.com</p>
              </div>
            </section>

            <section className="border-t border-border/20 pt-6">
              <p className="text-sm text-muted-foreground">
                מדיניות פרטיות זו כתובה בהתאם לחוק הגנת הפרטיות, תשמ"א-1981 ותקנות הגנת הפרטיות
                (אבטחת מידע), תשע"ז-2017. השימוש בשירות מהווה הסכמה למדיניות זו.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
