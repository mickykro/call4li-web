import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import SEO from "@/components/SEO";

const TermsOfUse = () => {
  return (
    <>
      <SEO
        title="תקנון אתר - Call4li"
        description="תנאי השימוש באתר Call4li — זכויות, חובות והגבלת אחריות."
        canonicalUrl={`${import.meta.env.VITE_DOMAIN_URL || "https://call4li.com"}/terms`}
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
            <h1 className="text-4xl font-bold mb-4 text-foreground">תקנון אתר ותנאי שימוש</h1>
            <p className="text-muted-foreground">
              עודכן לאחרונה: {new Date().toLocaleDateString("he-IL")}
            </p>
          </div>

          <div className="space-y-8 text-foreground/90 leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. כללי</h2>
              <p className="mb-3">
                ברוכים הבאים לאתר Call4li (להלן: "האתר"). האתר מופעל על ידי Call4li — שירותי מענה חכם
                (להלן: "החברה").
              </p>
              <p>
                השימוש באתר ובשירותים המוצעים בו מהווה הסכמה מלאה לתנאי השימוש המפורטים להלן. אם אינך
                מסכים לתנאים אלה, אנא הימנע משימוש באתר.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. השירות</h2>
              <p className="mb-3">
                Call4li מציעה שירות מענה חכם אוטומטי לעסקים, הכולל העברת שיחות, מענה על שאלות נפוצות,
                ותיאום פגישות באמצעות בינה מלאכותית (להלן: "השירות").
              </p>
              <p>
                החברה שומרת לעצמה את הזכות לשנות, להשעות או להפסיק כל חלק מהשירות בכל עת וללא הודעה
                מוקדמת.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. הגבלת אחריות</h2>
              <p className="mb-3">
                השירות ניתן "כמות שהוא" (AS IS). החברה אינה אחראית לכל נזק ישיר, עקיף, מקרי או תוצאתי
                הנובע מהשימוש בשירות או מאי-יכולת להשתמש בו.
              </p>
              <ul className="list-disc pr-6 space-y-2">
                <li>החברה אינה מתחייבת לזמינות רציפה ומלאה של השירות.</li>
                <li>
                  תשובות הניתנות על ידי מערכת הבינה המלאכותית הן בגדר המלצה בלבד ואינן מהוות ייעוץ
                  מקצועי (משפטי, רפואי, פיננסי וכו').
                </li>
                <li>החברה אינה אחראית לתוכן שיחות המתנהלות דרך המערכת.</li>
                <li>
                  האחריות המרבית של החברה כלפי המשתמש לא תעלה על הסכום ששולם על ידי המשתמש בשלושת
                  החודשים האחרונים שקדמו לאירוע.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. שימוש בשירות — מותר ואסור</h2>
              <h3 className="text-xl font-medium mb-3">4.1 שימוש מותר</h3>
              <ul className="list-disc pr-6 space-y-2 mb-4">
                <li>שימוש לגיטימי לצרכים עסקיים חוקיים</li>
                <li>העברת שיחות ומענה ללקוחות העסק</li>
                <li>גישה לממשק הניהול באמצעות פרטי ההתחברות שהוקצו לך</li>
              </ul>
              <h3 className="text-xl font-medium mb-3">4.2 שימוש אסור</h3>
              <ul className="list-disc pr-6 space-y-2">
                <li>שימוש למטרות הונאה, דיג מידע (phishing) או פעילות בלתי חוקית</li>
                <li>ניסיון לפרוץ, לגשת ללא הרשאה או לשבש את מערכות החברה</li>
                <li>שימוש להטרדה, הפצת תוכן פוגעני או ספאם</li>
                <li>העברה מסחרית של השירות לצד שלישי ללא אישור בכתב מהחברה</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. זכויות יוצרים וקניין רוחני</h2>
              <p className="mb-3">
                כל התכנים, העיצובים, הלוגואים, הטקסטים ומרכיבי האתר הם רכושה הבלעדי של החברה ומוגנים
                תחת חוקי זכויות יוצרים.
              </p>
              <p>
                אין להעתיק, לשכפל, להפיץ, לפרסם או לעשות שימוש מסחרי בתכנים אלה ללא אישור מפורש בכתב
                מהחברה.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. שינויים בתנאי השימוש</h2>
              <p>
                החברה שומרת לעצמה את הזכות לעדכן תנאי שימוש אלה מעת לעת. המשך השימוש באתר לאחר פרסום
                השינויים מהווה הסכמה לתנאים המעודכנים. מומלץ לעיין בתנאים אלה מדי פעם.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. שימוש בבינה מלאכותית</h2>
              <p className="mb-3">
                השירות כולל רכיבי בינה מלאכותית. יש לדעת כי:
              </p>
              <ul className="list-disc pr-6 space-y-2">
                <li>תשובות המערכת הן אוטומטיות ואינן מוחלפות בהכרח על ידי נציג אנושי.</li>
                <li>
                  החברה אינה אחראית לדיוק, שלמות או עדכניות המידע הנמסר על ידי מערכת הבינה המלאכותית.
                </li>
                <li>מומלץ לאמת מידע חשוב ממקורות נוספים.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. סמכות שיפוט</h2>
              <p>
                תנאי שימוש אלה כפופים לחוקי מדינת ישראל. כל מחלוקת בקשר לשימוש באתר תתברר בבתי
                המשפט המוסמכים במחוז תל-אביב-יפו, ישראל, בלבד.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. יצירת קשר</h2>
              <p className="mb-4">לשאלות בנוגע לתנאי שימוש אלה:</p>
              <div className="bg-card border border-border/20 p-6 rounded-lg">
                <p className="mb-2"><strong>Call4li — שירותי מענה חכם</strong></p>
                {/* TODO: הוסף ח.פ/עוסק מורשה */}
                {/* <p>ח.פ / עוסק מורשה: [מספר]</p> */}
                {/* TODO: הוסף כתובת */}
                {/* <p>כתובת: [כתובת מלאה]</p> */}
                <p>אימייל: info@call4li.com</p>
              </div>
            </section>

            <section className="border-t border-border/20 pt-6">
              <p className="text-sm text-muted-foreground">
                תקנון זה נכתב בהתאם לדין הישראלי. השימוש בשירות מהווה הסכמה מלאה לתנאים המפורטים לעיל.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsOfUse;
