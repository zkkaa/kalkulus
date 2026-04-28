"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BAR_MAX_PX = 144; // 144px = h-36

// Define panel types
interface IntroPanel {
  type: "intro";
  title: string;
  desc: string;
  color: string;
  textColor: string;
}

interface MidPanel {
  type: "mid";
  title: string;
  desc: string;
  color: string;
  textColor: string;
}

interface OutroPanel {
  type: "outro";
  title: string;
  desc: string;
  color: string;
  textColor: string;
}

interface ArithPanel {
  type: "arith";
  n: number;
  a: number;
  b: number;
  val: number;
  formula: string;
  label: string;
  color: string;
  textColor: string;
  accent: string;
  barColor: string;
  maxVal: number;
}

interface GeoPanel {
  type: "geo";
  n: number;
  a: number;
  r: number;
  val: number;
  formula: string;
  label: string;
  color: string;
  textColor: string;
  accent: string;
  barColor: string;
  maxVal: number;
}

type Panel = IntroPanel | MidPanel | OutroPanel | ArithPanel | GeoPanel;

// Arith: n=1..5, a=3, b=4 → vals: 3,7,11,15,19 — maxVal = 19
const ARITH_MAX = 3 + 4 * 4; // 19

// Geo: n=1..5, a=1, r=2 → vals: 1,2,4,8,16 — maxVal = 16
const GEO_MAX = Math.pow(2, 4); // 16

const PANELS: Panel[] = [
  {
    type: "intro",
    title: "Eksplorasi Nilai Suku",
    desc: "Scroll ke kanan untuk menjelajahi bagaimana nilai suku berubah dari n=1 hingga n=5 pada dua jenis barisan berbeda.",
    color: "bg-indigo-600",
    textColor: "text-white",
  },
  ...Array.from({ length: 5 }, (_, i) => ({
    type: "arith" as const,
    n: i + 1,
    a: 3,
    b: 4,
    val: 3 + i * 4,
    formula: `U${i + 1} = 3 + (${i + 1}−1)·4 = ${3 + i * 4}`,
    label: "Barisan Aritmetika",
    color: "bg-white",
    textColor: "text-gray-900",
    accent: "text-emerald-600",
    barColor: "bg-emerald-400",
    maxVal: ARITH_MAX,
  })),
  {
    type: "mid",
    title: "Sekarang: Barisan Geometri",
    desc: "Perhatikan betapa berbeda pertumbuhan geometri dibanding aritmetika. Rasio r=2 membuat nilai meledak!",
    color: "bg-amber-50",
    textColor: "text-amber-900",
  },
  ...Array.from({ length: 5 }, (_, i) => ({
    type: "geo" as const,
    n: i + 1,
    a: 1,
    r: 2,
    val: Math.pow(2, i),
    formula: `U${i + 1} = 1·2^${i} = ${Math.pow(2, i)}`,
    label: "Barisan Geometri",
    color: "bg-white",
    textColor: "text-gray-900",
    accent: "text-amber-600",
    barColor: "bg-amber-400",
    maxVal: GEO_MAX,
  })),
  {
    type: "outro",
    title: "Perbedaan Jelas!",
    desc: "Aritmetika: bertambah 4 setiap suku. Geometri: dikalikan 2 setiap suku. Inilah yang membuat keduanya fundamentally berbeda.",
    color: "bg-gray-900",
    textColor: "text-white",
  },
];

export default function HorizontalExplorer() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    const ctx = gsap.context(() => {
      const totalScrollWidth = container.scrollWidth - window.innerWidth;

      const mainST = gsap.to(container, {
        x: -totalScrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalScrollWidth * 1.5}`,
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          pinSpacing: true,
        },
      });

      // Animate panel contents as they scroll into view
      const panels = container.querySelectorAll(".h-panel-inner");
      panels.forEach((panel) => {
        gsap.from(panel, {
          opacity: 0,
          y: 20,
          duration: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: panel,
            containerAnimation: mainST,
            start: "left 80%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="horizontal-explorer"
      ref={sectionRef}
      className="relative overflow-hidden bg-white"
      style={{ height: "100vh" }}
    >
      <div
        ref={containerRef}
        className="flex h-full items-stretch"
        style={{ width: "fit-content" }}
      >
        {PANELS.map((panel, idx) => {
          // Intro / mid / outro cards
          if (
            panel.type === "intro" ||
            panel.type === "mid" ||
            panel.type === "outro"
          ) {
            return (
              <div
                key={idx}
                className={`shrink-0 w-[40vw] h-full flex flex-col justify-center px-16 ${panel.color}`}
              >
                <div className="h-panel-inner">
                  <h2
                    className={`text-3xl md:text-4xl font-black mb-6 ${panel.textColor}`}
                    style={{ fontFamily: '"Georgia", serif' }}
                  >
                    {panel.title}
                  </h2>
                  <p
                    className={`text-base leading-relaxed max-w-xs ${
                      panel.type === "intro"
                        ? "text-indigo-200"
                        : panel.type === "outro"
                        ? "text-gray-400"
                        : "text-amber-700"
                    }`}
                  >
                    {panel.desc}
                  </p>
                  {panel.type === "intro" && (
                    <div className="mt-10 flex items-center gap-3 text-indigo-300">
                      <div className="flex gap-1.5">
                        {[0, 1, 2].map((i) => (
                          <div
                            key={i}
                            className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"
                            style={{ animationDelay: `${i * 0.3}s` }}
                          />
                        ))}
                      </div>
                      <span className="text-xs tracking-widest uppercase">
                        scroll terus →
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          }

          // Suku cards (arith & geo)
          const p = panel as ArithPanel | GeoPanel;
          const isArith = p.type === "arith";
          // ✅ Pixel-based height — no percentage on flex child
          const barHeightPx = Math.max((p.val / p.maxVal) * BAR_MAX_PX, 4);

          return (
            <div
              key={idx}
              className={`shrink-0 w-[28vw] h-full flex flex-col justify-center px-10 border-r border-gray-100 ${p.color}`}
            >
              <div className="h-panel-inner">
                {/* Label */}
                <div
                  className={`text-xs font-semibold uppercase tracking-widest mb-1 ${
                    isArith ? "text-emerald-500" : "text-amber-500"
                  }`}
                >
                  {p.label}
                </div>
                <div className="text-gray-400 text-sm mb-6">
                  {isArith ? "a=3, b=4" : "a=1, r=2"}
                </div>

                {/* N indicator */}
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-gray-400 text-sm font-mono">n =</span>
                  <span
                    className={`text-6xl font-black ${p.accent}`}
                    style={{ fontFamily: '"Georgia", serif' }}
                  >
                    {p.n}
                  </span>
                </div>

                {/* ✅ Bar visual — explicit px height on both container and bar */}
                <div
                  className={`rounded-2xl flex items-end px-4 mb-4 overflow-hidden ${
                    isArith ? "bg-emerald-50" : "bg-amber-50"
                  }`}
                  style={{ height: `${BAR_MAX_PX}px` }}
                >
                  <div
                    className={`${p.barColor} rounded-t-xl w-full`}
                    style={{ height: `${barHeightPx}px` }}
                  />
                </div>

                {/* Value */}
                <div className="mb-4">
                  <p className="text-gray-400 text-xs mb-1">Nilai suku</p>
                  <p
                    className={`text-4xl font-black ${p.accent}`}
                    style={{ fontFamily: '"Georgia", serif' }}
                  >
                    {p.val.toLocaleString()}
                  </p>
                </div>

                {/* Formula */}
                <div
                  className={`rounded-xl px-4 py-3 ${
                    isArith
                      ? "bg-emerald-50 border border-emerald-100"
                      : "bg-amber-50 border border-amber-100"
                  }`}
                >
                  <p className={`font-mono text-xs ${p.accent}`}>
                    {p.formula}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}