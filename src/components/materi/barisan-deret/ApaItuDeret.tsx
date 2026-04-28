"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DERET_TYPES = [
  {
    title: "Deret Aritmetika",
    formula: "Sₙ = n/2 · (2a + (n−1)b)",
    desc: "Jumlah n suku pertama barisan aritmetika. Pertumbuhannya kuadratik — makin cepat seiring n bertambah.",
    color: "emerald",
    example: "S₅ = 2+5+8+11+14 = 40",
  },
  {
    title: "Deret Geometri",
    formula: "Sₙ = a(rⁿ − 1) / (r − 1)",
    desc: "Jumlah n suku pertama barisan geometri. Ketika r>1, jumlah meledak eksponensial.",
    color: "amber",
    example: "S₄ = 1+2+4+8 = 15",
  },
  {
    title: "Deret Konvergen",
    formula: "S∞ = a / (1 − r), |r| < 1",
    desc: "Deret geometri tak hingga yang hasilnya mendekati nilai terbatas. Terjadi ketika −1 < r < 1.",
    color: "indigo",
    example: "1 + ½ + ¼ + ⅛ + ... = 2",
  },
  {
    title: "Deret Divergen",
    formula: "S∞ = ±∞, |r| ≥ 1",
    desc: "Deret yang jumlahnya tidak terbatas karena r ≥ 1 atau r ≤ −1. Nilai terus membesar.",
    color: "rose",
    example: "1 + 2 + 4 + 8 + ... = ∞",
  },
];

const COLOR_MAP: Record<string, { bg: string; border: string; text: string; badge: string; badgeText: string }> = {
  emerald: {
    bg: "bg-emerald-50",
    border: "border-emerald-100",
    text: "text-emerald-700",
    badge: "bg-emerald-100",
    badgeText: "text-emerald-700",
  },
  amber: {
    bg: "bg-amber-50",
    border: "border-amber-100",
    text: "text-amber-700",
    badge: "bg-amber-100",
    badgeText: "text-amber-700",
  },
  indigo: {
    bg: "bg-indigo-50",
    border: "border-indigo-100",
    text: "text-indigo-700",
    badge: "bg-indigo-100",
    badgeText: "text-indigo-700",
  },
  rose: {
    bg: "bg-rose-50",
    border: "border-rose-100",
    text: "text-rose-700",
    badge: "bg-rose-100",
    badgeText: "text-rose-700",
  },
};

export default function ApaItuDeret() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        x: -60, opacity: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%", toggleActions: "play none none reverse" },
      });

      gsap.from(photoRef.current, {
        x: 80, opacity: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%", toggleActions: "play none none reverse" },
      });

      gsap.from(".deret-card", {
        y: 40, opacity: 0, duration: 0.6, stagger: 0.12, ease: "power2.out",
        scrollTrigger: { trigger: ".deret-cards-grid", start: "top 82%", toggleActions: "play none none reverse" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="apa-deret"
      ref={sectionRef}
      className="relative bg-white px-28 py-28 overflow-hidden"
    >
      {/* Subtle right glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top: heading left, photo right */}
        <div className="flex items-start gap-16 mb-16">
          <div ref={contentRef} className="flex-1 min-w-0">
            <h2
              className="mt-3 text-4xl md:text-5xl font-black text-gray-900 mb-6"
              style={{ fontFamily: '"Georgia", serif' }}
            >
              Apa itu{" "}
              <span className="text-indigo-500 italic">Deret?</span>
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed max-w-xl">
              Deret adalah <strong className="text-gray-700">penjumlahan suku-suku</strong> dari
              suatu barisan. Jika barisan adalah daftar angka berurutan, maka deret
              adalah hasil tambahnya.
            </p>

            {/* Simple illustration */}
            <div className="mt-8 bg-gray-50 rounded-2xl p-6 border border-gray-100 max-w-lg">
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">Ilustrasi</p>
              <div className="font-mono text-sm">
                <p className="text-gray-500 mb-1">Barisan: <span className="text-gray-700">2, 4, 6, 8, 10</span></p>
                <p className="text-gray-500">Deret: <span className="text-emerald-600 font-bold">2 + 4 + 6 + 8 + 10 = 30</span></p>
              </div>
            </div>
          </div>

          {/* Photo right */}
          <div ref={photoRef} className="shrink-0 hidden lg:block">
            <div className="relative">
              <div className="absolute -inset-5 bg-linear-to-bl from-amber-50 to-indigo-50 rounded-3xl -z-10" />
              <div className="relative w-56 h-72 rounded-2xl overflow-hidden">
                <Image
                  src="/gift/plenger2.webp"
                  alt="Aulia Syakhira – menjelaskan deret"
                  fill
                  className="object-cover object-top"
                  unoptimized
                />
              </div>
              <div className="mt-3 text-center">
                <p className="text-xs font-semibold text-gray-700">Aulia Syakhira Raina Hakim</p>
                <p className="text-[10px] text-gray-400 italic">257006111021</p>
              </div>
              {/* Floating formula */}
              <div className="absolute -bottom-5 -left-8 bg-white border border-indigo-100 shadow-sm rounded-xl px-3 py-2">
                <span className="font-mono text-xs text-indigo-600">∑ aₙ = S∞</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Deret type cards */}
        <div className="deret-cards-grid grid md:grid-cols-2 gap-6">
          {DERET_TYPES.map((d) => {
            const c = COLOR_MAP[d.color];
            return (
              <div key={d.title} className={`deret-card rounded-2xl p-6 border ${c.bg} ${c.border}`}>
                <div className="flex items-start justify-between mb-4">
                  <h3 className={`text-lg font-black ${c.text}`} style={{ fontFamily: '"Georgia", serif' }}>
                    {d.title}
                  </h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${c.badge} ${c.badgeText} font-mono`}>
                    {d.color === "indigo" ? "|r|<1" : d.color === "rose" ? "|r|≥1" : d.color === "emerald" ? "b=beda" : "r=rasio"}
                  </span>
                </div>

                <div className={`font-mono text-base font-bold mb-3 px-3 py-2 rounded-lg bg-white/70 border ${c.border} ${c.text}`}>
                  {d.formula}
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-4">{d.desc}</p>

                <div className={`text-xs font-mono px-3 py-2 rounded-lg bg-white/50 ${c.text}`}>
                  Contoh: {d.example}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}