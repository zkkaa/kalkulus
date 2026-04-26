"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const ITEMS = [
  { text: "Calculus Royale", highlight: true },
  { text: "∫ integral", highlight: false },
  { text: "d/dx turunan", highlight: false },
  { text: "Calculus Duel", highlight: true },
  { text: "lim limit", highlight: false },
  { text: "∑ sigma", highlight: false },
  { text: "f′(x) derivative", highlight: false },
  { text: "Kelompok 9", highlight: true },
  { text: "∂ parsial", highlight: false },
  { text: "∞ tak hingga", highlight: false },
  { text: "dy/dx", highlight: false },
  { text: "∇ gradien", highlight: false },
];

// duplikasi 3x supaya infinite terasa natural
const DUPLICATED = [...ITEMS, ...ITEMS, ...ITEMS];

export default function GameTicker() {
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Hitung lebar 1 set item (1/3 dari total)
    const totalWidth = track.scrollWidth;
    const oneSetWidth = totalWidth / 3;

    animRef.current = gsap.to(track, {
      x: -oneSetWidth,
      duration: 22,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: (x) => {
          const parsed = parseFloat(x);
          return ((parsed % oneSetWidth) - oneSetWidth) + "px";
        },
      },
    });

    return () => {
      animRef.current?.kill();
    };
  }, []);

  return (
    <div className="relative border-t border-b border-gray-100 overflow-hidden h-11 flex items-center bg-white z-10">
      <div
        ref={trackRef}
        className="flex whitespace-nowrap will-change-transform"
        style={{ width: "max-content" }}
      >
        {DUPLICATED.map((item, i) => (
          <span
            key={i}
            className={`
              inline-block text-lg tracking-[0.08em] px-5 border-r border-gray-100 leading-11
              ${item.highlight
                ? "text-indigo-500 italic font-medium"
                : "text-gray-400"
              }
            `}
          >
            {item.text}
          </span>
        ))}
      </div>
    </div>
  );
}