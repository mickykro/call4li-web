import { Link } from "wouter";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight } from "lucide-react";
import SEO from "@/components/SEO";

const faqs = [
  {
    question: "מה זה Call4li?",
    answer:
      "Call4li היא מערכת חכמה שמאפשרת לעסקים לענות על שיחות שלא נענו באופן אוטומטי. כשלקוח מתקשר ולא ענית, המערכת שולחת לו הודעת וואטסאפ, אוספת את הפרטים שלו ומתעדת את הפנייה — כך שאף לקוח לא יאבד.",
  },
  {
    question: "איך Call4li עובד?",
    answer:
      'Call4li מפנה שיחות שלא נענו אליו דרך הגדרת "Follow-Me" בטלפון שלך. ברגע שמתקבלת שיחה, פורלי — הינשוף החכם שלנו — פונה ללקוח בוואטסאפ, אוסף את הפרטים שלו ומעביר לך סיכום.',
  },
  {
    question: "כמה זמן לוקח להתחיל?",
    answer:
      "ההתקנה פשוטה ומהירה. לאחר שתמלא את טופס יצירת הקשר, נשלח לך קישור אישי להפעלה — תהליך של לחיצה אחת שנמשך שניות.",
  },
  {
    question: "האם Call4li מתאים לכל סוג עסק?",
    answer:
      "כן! Call4li מתאים לבעלי עסקים בכל תחום — נדל\"ן, מסעדות, שירותים מקצועיים, קליניקות, עורכי דין ועוד. המערכת מותאמת לצרכים הייחודיים של כל לקוח.",
  },
  {
    question: "איזה מידע אני צריך לספק?",
    answer:
      "נזדקק לשם, שם העסק, תיאור קצר של מה שאתם עושים, ומספר טלפון. זהו — Call4li עושה את השאר.",
  },
  {
    question: "האם המידע שלי מאובטח?",
    answer:
      "בהחלט. כל המידע מאוחסן בצורה מוצפנת ומאובטחת. לפרטים נוספים ראה את מדיניות הפרטיות שלנו.",
  },
  {
    question: "מה קורה אם לקוח שואל שאלה שהמערכת לא יודעת לענות?",
    answer:
      "המערכת תתעד את השאלה ותפנה אותה אליך כדי שתוכל לענות בעצמך. כך אתה תמיד בשליטה מלאה.",
  },
  {
    question: "האם אפשר לבטל את השירות?",
    answer: "כן, ניתן לבטל בכל עת דרך עמוד הביטול באתר או בפנייה ישירה אלינו.",
  },
  {
    question: "כיצד ניתן ליצור קשר?",
    answer: "מלאו את טופס יצירת הקשר באתר ואנחנו נחזור אליכם תוך 24 שעות עם הצעה מותאמת.",
  },
];

const FAQ = () => {
  return (
    <>
      <SEO
        title="שאלות ותשובות - Call4li"
        description="מצא תשובות לשאלות הנפוצות ביותר על Call4li — איך זה עובד, כמה זה עולה, ואיך להתחיל."
        canonicalUrl={`${import.meta.env.VITE_DOMAIN_URL || "https://call4li.com"}/faq`}
      />
      <div className="min-h-screen bg-background text-foreground" dir="rtl">
        {/* Header */}
        <header className="border-b border-border/20">
          <div className="container mx-auto px-4 py-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-primary hover:opacity-80 transition-opacity"
            >
              <ArrowRight className="h-5 w-5" />
              <span className="font-semibold">חזרה לדף הבית</span>
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">שאלות ותשובות</h1>
            <p className="text-lg text-muted-foreground">מצא תשובות לשאלות הנפוצות ביותר על Call4li</p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border/20 rounded-lg px-6 bg-card"
              >
                <AccordionTrigger className="text-right text-lg font-semibold hover:no-underline text-foreground">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-right text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Contact CTA */}
          <div className="mt-16 text-center p-8 bg-card rounded-lg border border-border/20">
            <h2 className="text-2xl font-bold mb-4 text-foreground">לא מצאת את התשובה שחיפשת?</h2>
            <p className="text-muted-foreground mb-6">צוות Call4li זמין לענות על כל שאלה נוספת</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold hover:bg-primary/90 transition-colors"
            >
              צור קשר
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border/20 mt-16">
          <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Call4li. כל הזכויות שמורות.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default FAQ;
