"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface SplitCharsProps {
  /** Teks yang akan di-split per karakter */
  text: string;
  /** Class tambahan untuk wrapper <span> */
  className?: string;
  /**
   * Mode animasi:
   * - "immediate" → langsung animasi saat mount (cocok untuk hero)
   * - "scroll"    → animasi saat elemen masuk viewport via ScrollTrigger
   */
  animateOn?: "immediate" | "scroll";
  /** Delay awal sebelum animasi mulai (detik). Default: 0 */
  delay?: number;
  /** Durasi animasi per karakter (detik). Default: 0.7 */
  duration?: number;
  /** Stagger antar karakter (detik). Default: 0.022 */
  stagger?: number;
  /** ScrollTrigger start position. Default: "top 85%" */
  scrollStart?: string;
}

export function SplitChars({
  text,
  className = "",
  animateOn = "scroll",
  delay = 0,
  duration = 0.7,
  stagger = 0.022,
  scrollStart = "top 85%",
}: SplitCharsProps) {
  const wrapperRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const chars = wrapper.querySelectorAll(".split-char");
    if (!chars.length) return;

    const ctx = gsap.context(() => {
      if (animateOn === "immediate") {
        gsap.from(Array.from(chars), {
          y: "110%",
          opacity: 0,
          duration,
          stagger,
          delay,
          ease: "power3.out",
        });
      } else {
        gsap.from(Array.from(chars), {
          y: "110%",
          opacity: 0,
          duration,
          stagger,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapper,
            start: scrollStart,
            toggleActions: "play none none reverse",
          },
        });
      }
    }, wrapper);

    return () => ctx.revert();
  }, [text, animateOn, delay, duration, stagger, scrollStart]);

  const words = text.split(" ");

  return (
    <span ref={wrapperRef} className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block overflow-hidden">
          {word.split("").map((char, ci) => (
            <span
              key={ci}
              className="split-char inline-block"
              aria-hidden="true"
            >
              {char}
            </span>
          ))}
          {wi < words.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </span>
  );
}