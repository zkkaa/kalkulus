"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React from "react";
import { SplitChars } from "@/components/ui/SplitChars";

gsap.registerPlugin(ScrollTrigger);

const POLA_ITEMS = [2, 4, 6, 8, 10];

export default function ApaItuBarisan() {
  const sectionRef = useRef<HTMLElement>(null);
  const bubblesRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Photo slides in from left
      gsap.from(photoRef.current, {
        x: -80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // Content fades from right
      gsap.from(contentRef.current, {
        x: 60,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // Bubbles stagger in
      if (bubblesRef.current) {
        const bubbles = bubblesRef.current.querySelectorAll(".seq-bubble");
        const arrows = bubblesRef.current.querySelectorAll(".seq-arrow");
        gsap.from([...Array.from(bubbles), ...Array.from(arrows)], {
          y: 30,
          opacity: 0,
          duration: 0.5,
          stagger: 0.12,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: bubblesRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="apa-barisan"
      ref={sectionRef}
      className="relative bg-white px-28 py-28 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex items-center gap-20">
        {/* LEFT: Photo */}
        <div ref={photoRef} className="shrink-0 hidden lg:block">
          <div className="relative">
            {/* Decorative bg shape */}
            <div className="absolute -inset-6 bg-linear-to-br from-indigo-50 to-purple-50 rounded-3xl -z-10" />

            <div className="relative w-56 h-72 rounded-2xl overflow-hidden">
              <Image
                src="/gift/plenger2.webp"
                alt="Salma Fauziah – menjelaskan barisan"
                fill
                className="object-cover object-top"
                unoptimized
              />
            </div>

            {/* Label */}
            <div className="mt-3 text-center">
              <p className="text-xs font-semibold text-gray-700">Salma Fauziah</p>
              <p className="text-[10px] text-gray-400 italic">257006111020</p>
            </div>

            {/* Floating note */}
            <div className="absolute -top-5 -right-8 bg-white border border-indigo-100 shadow-sm rounded-xl px-3 py-2">
              <span className="text-xs text-indigo-600 font-mono">{"{a₁, a₂, a₃, ...}"}</span>
            </div>
          </div>
        </div>

        {/* RIGHT: Content */}
        <div ref={contentRef} className="flex-1 min-w-0">
          <h2 className="leading-[1.05] tracking-tight text-gray-900 select-none mb-2" style={{ fontFamily: '"Georgia", serif' }}>
            <span className="block text-3xl md:text-4xl lg:text-5xl font-semibold ">
              <SplitChars
                text="Apa Itu"
                animateOn="immediate"
                delay={0.20}
                duration={0.7}
                stagger={0.022}
              />
              <span className="text-indigo-500 italic ml-4">
                <SplitChars
                  text="Barisan"
                  animateOn="immediate"
                  delay={0.30}
                  duration={0.7}
                  stagger={0.022}
                />
              </span>
            </span>
          </h2>

          <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-xl">
            Barisan bilangan adalah sekumpulan bilangan yang tersusun secara berurutan
            mengikuti <strong className="text-gray-700">pola atau aturan tertentu</strong>.
            Setiap anggota dalam barisan disebut <em>suku</em>, dinotasikan sebagai
            <span className="font-mono text-indigo-600"> a₁, a₂, a₃, ..., aₙ</span>.
          </p>

          {/* Visual sequence */}
          <div className="mb-8">
            <p className="text-sm text-gray-400 mb-4 uppercase tracking-widest font-medium">
              Contoh pola barisan:
            </p>
            <div ref={bubblesRef} className="flex items-center gap-3 flex-wrap">
              {POLA_ITEMS.map((val, i) => (
                <React.Fragment key={i}>
                  <div
                    key={`bubble-${i}`}
                    className="seq-bubble w-14 h-14 rounded-full bg-indigo-50 border-2 border-indigo-200 flex items-center justify-center text-xl font-bold text-indigo-600"
                    style={{ fontFamily: '"Georgia", serif' }}
                  >
                    {val}
                  </div>
                  {i < POLA_ITEMS.length - 1 && (
                    <div key={`arrow-${i}`} className="seq-arrow text-indigo-300 text-xl font-light">
                      →
                    </div>
                  )}
                </React.Fragment>
              ))}
              <div className="seq-arrow text-indigo-300 text-xl font-light">→</div>
              <div
                className="seq-bubble w-14 h-14 rounded-full border-2 border-dashed border-indigo-200 flex items-center justify-center text-xl font-bold text-indigo-300"
                style={{ fontFamily: '"Georgia", serif' }}
              >
                ?
              </div>
            </div>
            <p className="text-sm text-indigo-400 mt-3 font-mono">
              beda = +2 setiap suku (barisan aritmetika)
            </p>
          </div>

          {/* Key facts */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: "∑", label: "Suku ke-n", desc: "Setiap posisi dalam barisan disebut suku, dilambangkan aₙ" },
              { icon: "→", label: "Pola Tetap", desc: "Aturan berpindah dari satu suku ke suku berikutnya selalu konsisten" },
            ].map((f) => (
              <div key={f.label} className="bg-indigo-50 rounded-2xl p-4 border border-indigo-100">
                <div className="text-2xl text-indigo-400 mb-2" style={{ fontFamily: '"Georgia", serif' }}>
                  {f.icon}
                </div>
                <p className="text-sm font-semibold text-gray-800 mb-1">{f.label}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}