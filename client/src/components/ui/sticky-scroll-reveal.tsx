"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode | any;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    // uncomment line 22 and comment line 23 if you DONT want the overflow container and want to have it change on the entire page scroll
    // target: ref
    container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest: number) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance <= Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0,
    );
    setActiveCard(closestBreakpointIndex);
  });

  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= 1024);
  useEffect(() => {
    const handler = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const linearGradients = [
    "radial-gradient(circle at center, rgba(88, 210, 231, 0.46), rgba(236, 76, 76, 0.3))",
    "radial-gradient(circle at center, rgba(236,72,153,0.3), rgba(99,102,241,0.3))",
    "radial-gradient(circle at center, rgba(249,115,22,0.3), rgba(234,179,8,0.3))",
    isDesktop
      ? "linear-gradient(to bottom, rgba(27,20,35,1), rgba(6,78,59,0.9), rgba(27,20,35,1))"
      : "radial-gradient(circle at center, rgba(255, 255, 255, 1), rgba(6,78,59,0.9), rgba(27, 20, 35, 0.69))",
  ];

  const [backgroundGradient, setBackgroundGradient] = useState(linearGradients[0]);

  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
  }, [activeCard]);

  return (
    <div
      style={{ background: backgroundGradient, transition: "background 0.5s ease", width: "100%" }}
      className="relative flex h-[20rem] lg:h-[30rem] w-full justify-center space-x-4 lg:space-x-10 overflow-y-auto rounded-md p-4 lg:p-10 scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      ref={ref}
    >
      <div className="div relative flex items-start px-2 lg:px-4">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-25 md:my-45">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index || index === 3 ? 1 : 0.3 }}
                className="text-base lg:text-2xl font-bold text-slate-100"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index || index === 3 ? 1 : 0.3 }}
                className="text-xs lg:text-sm mt-4 lg:mt-10 max-w-sm text-slate-300"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-30 " />
        </div>
      </div>
      <div
        style={{ background: backgroundGradient }}
        className={cn(
          "sticky top-4 lg:top-10 h-36 w-36 lg:h-60 lg:w-80 overflow-hidden rounded-md bg-white flex-shrink-0",
          contentClassName,
        )}
      >
        {content[activeCard].content ?? null}
      </div>
    </div>
  );
};
