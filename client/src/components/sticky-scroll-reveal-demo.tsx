"use client";

import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";

import problem1 from "@/assets/problem1.png";
import problem2 from "@/assets/problem2.png";
import problem3 from "@/assets/problem3.png";
import forliLogo from "@/assets/forli_no_bg_silver.png";

const content = [
  {
    title: "ליד חם שלא נענה — הלך לצמיתות",
    description:
      "הלקוח שהתקשר עכשיו היה מוכן לקנות. הוא לא ישאיר הודעה. הוא לא יחזור. הוא כבר מדבר עם המתחרה שלך.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--red-500),var(--orange-500))] text-white">
        <img
          src={problem1}
          width={300}
          height={300}
          className="h-full w-full object-cover rounded-lg"
          alt="ליד חם שלא נענה"
        />
      </div>
    ),
  },
  {
    title: "אתה לא יודע כמה אתה מפסיד",
    description:
      "כמה לקוחות התקשרו השבוע ולא נענו? אין לך מושג. הכנסה שנעלמת בלי עקבות — כל יום.",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white">
        <img
          src={problem2}
          width={300}
          height={300}
          className="h-full w-full object-cover rounded-lg"
          alt="הפסד הכנסה"
        />
      </div>
    ),
  },
  {
    title: "המתחרה שלך כבר ענה",
    description:
      "בזמן שאתה עסוק ולא עונה — המתחרה שלך כבר קיבל את הפרטים וסגר את העסקה.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] text-white">
        <img
          src={problem3}
          width={300}
          height={300}
          className="h-full w-full object-cover rounded-lg"
          alt="תחרות מהירה"
        />
      </div>
    ),
  },
  {
    title: "הפוך כל שיחה להזדמנות",
    description:
      "במקום לאבד לקוחות — בוא נהפוך כל שיחה שלא נענתה לעסקה סגורה.",
    content: (
      <a
        href="https://wa.me/972553163293"
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col h-full w-full items-center justify-center p-6"
      >
        <p className="text-sm font-bold w-full text-center">לשיחה עם פורלי</p>
        <img
          src={forliLogo}
          width={300}
          height={300}
          className="h-full w-full object-contain rounded-lg transition-transform hover:scale-105 cursor-pointer"
          alt="הפוך כל שיחה להזדמנות"
        />
      </a>
    ),
  },
];
export default function StickyScrollRevealDemo() {
  return (
    <div className="w-full ">
      <StickyScroll content={content} />
    </div>
  );
}
