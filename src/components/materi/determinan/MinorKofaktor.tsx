"use client";

import { useEffect, useState } from "react";

export interface ProgressSection {
  id: string;
  label: string;
}

interface ProgressIndicatorProps {
  sections: ProgressSection[];
  /** Fraction of viewport height at which a section becomes "active". Default: 0.45 */
  activationThreshold?: number;
  /** Tailwind color token used for active/filled states, e.g. "violet" | "indigo". Default: "violet" */
  color?: "violet" | "indigo" | "emerald" | "rose" | "amber" | "sky";
}

const COLOR_MAP: Record<
  NonNullable<ProgressIndicatorProps["color"]>,
  { track: string; bar: string; active: string; passed: string; glow: string }
> = {
  violet: {
    track:  "bg-gray-200",
    bar:    "bg-violet-400",
    active: "bg-violet-500 border-violet-500",
    passed: "bg-violet-300 border-violet-300",
    glow:   "shadow-[0_0_8px_rgba(139,92,246,0.5)]",
  },
  indigo: {
    track:  "bg-gray-200",
    bar:    "bg-indigo-400",
    active: "bg-indigo-500 border-indigo-500",
    passed: "bg-indigo-300 border-indigo-300",
    glow:   "shadow-[0_0_8px_rgba(99,102,241,0.5)]",
  },
  emerald: {
    track:  "bg-gray-200",
    bar:    "bg-emerald-400",
    active: "bg-emerald-500 border-emerald-500",
    passed: "bg-emerald-300 border-emerald-300",
    glow:   "shadow-[0_0_8px_rgba(16,185,129,0.5)]",
  },
  rose: {
    track:  "bg-gray-200",
    bar:    "bg-rose-400",
    active: "bg-rose-500 border-rose-500",
    passed: "bg-rose-300 border-rose-300",
    glow:   "shadow-[0_0_8px_rgba(244,63,94,0.5)]",
  },
  amber: {
    track:  "bg-gray-200",
    bar:    "bg-amber-400",
    active: "bg-amber-500 border-amber-500",
    passed: "bg-amber-300 border-amber-300",
    glow:   "shadow-[0_0_8px_rgba(245,158,11,0.5)]",
  },
  sky: {
    track:  "bg-gray-200",
    bar:    "bg-sky-400",
    active: "bg-sky-500 border-sky-500",
    passed: "bg-sky-300 border-sky-300",
    glow:   "shadow-[0_0_8px_rgba(14,165,233,0.5)]",
  },
};

export default function ProgressIndicator({
  sections,
  activationThreshold = 0.45,
  color = "violet",
}: ProgressIndicatorProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const c = COLOR_MAP[color];

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      setProgress(
        docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0
      );

      sections.forEach((sec, i) => {
        const el = document.getElementById(sec.id);
        if (!el) return;
        const { top, bottom } = el.getBoundingClientRect();
        if (top <= window.innerHeight * activationThreshold && bottom > 0) {
          setActiveIndex(i);
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // run once on mount
    return () => window.removeEventListener("scroll", onScroll);
  }, [sections, activationThreshold]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-2">
      {/* Track */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px ${c.track}`}
      />
      {/* Progress fill */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 top-0 w-px ${c.bar} transition-all duration-300 origin-top`}
        style={{ height: `${progress}%` }}
      />

      {sections.map((sec, i) => (
        <button
          key={sec.id}
          onClick={() => scrollTo(sec.id)}
          className="relative z-10 group flex items-center gap-2 cursor-pointer"
          title={sec.label}
          aria-label={`Go to section: ${sec.label}`}
        >
          {/* Tooltip */}
          <span className="absolute right-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs text-gray-500 whitespace-nowrap bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full border border-gray-100 shadow-sm pointer-events-none">
            {sec.label}
          </span>

          {/* Dot */}
          <div
            className={`transition-all duration-300 rounded-full border ${
              i === activeIndex
                ? `w-3 h-3 ${c.active} ${c.glow}`
                : i < activeIndex
                ? `w-2 h-2 ${c.passed}`
                : "w-2 h-2 bg-white border-gray-300"
            }`}
          />
        </button>
      ))}
    </div>
  );
}