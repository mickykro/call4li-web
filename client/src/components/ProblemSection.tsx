import { useRef } from "react";
import StickyScrollRevealDemo from "./sticky-scroll-reveal-demo";

export default function ProblemSection() {
  const ref = useRef(null);

  return (
    <section id="problem" ref={ref} className="relative overflow-hidden bg-deep-space">
      <div className="container relative z-10">
        <StickyScrollRevealDemo />
      </div>
    </section>
  );
}
