import { useRef } from "react";
import StickyScrollRevealDemo from "./sticky-scroll-reveal-demo";

export default function ProblemSection() {
  const ref = useRef(null);

  return (
    <section id="problem" ref={ref} className="relative overflow-hidden bg-white/50">
      <div className="z-10 w-full">
        <StickyScrollRevealDemo />
      </div>
    </section>
  );
}
