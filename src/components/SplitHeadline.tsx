"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";

gsap.registerPlugin(SplitText, ScrollTrigger);

interface Props {
  as?: "h1" | "h2" | "h3";
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  immediate?: boolean;
  delay?: number;
}

export default function SplitHeadline({
  as: Tag = "h1",
  children,
  className,
  style,
  immediate = false,
  delay = 0,
}: Props) {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !ref.current) return;

    const el = ref.current;
    const split = new SplitText(el, { type: "words" });

    gsap.set(split.words, { opacity: 0, y: 40, display: "inline-block" });

    const anim = gsap.to(split.words, {
      y: 0,
      opacity: 1,
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.06,
      delay,
      ...(immediate
        ? {}
        : {
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              once: true,
            },
          }),
    });

    return () => {
      anim.kill();
      split.revert();
    };
  }, [reduce, immediate, delay]);

  return (
    <Tag ref={ref as React.RefObject<HTMLHeadingElement>} className={className} style={style}>
      {children}
    </Tag>
  );
}
