"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React from "react";

gsap.registerPlugin(ScrollTrigger);

const ARITH_VALS = [2, 5, 8, 11, 14, 17, 20];   // beda 3
const GEO_VALS = [1, 2, 4, 8, 16, 32, 64];       // rasio 2

const CHART_HEIGHT = 96; // px

function BarChart({ values, color }: { values: number[]; color: string }) {
  const max = Math.max(...values);
  return (
    <div
      className="flex items-end gap-2 mt-4"
      style={{ height: `${CHART_HEIGHT + 20}px` }} // +20 for label
    >
      {values.map((v, i) => (
        <div key={i} className="flex flex-col items-center gap-1 flex-1">
          <div
            className="bar-item w-full rounded-t-lg"
            style={{
              height: `${Math.max((v / max) * CHART_HEIGHT, 4)}px`,
              background: color,
            }}
          />
          <span className="text-[9px] text-gray-400 font-mono leading-none">{v}</span>
        </div>
      ))}
    </div>
  );
}

export default function JenisBarisan() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section heading
      gsap.from(".jenis-heading", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Cards stagger
      gsap.from(".jenis-card", {
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".jenis-card-wrap",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Bar items — animate height from 0, NOT scaleY
      gsap.from(".bar-item", {
        height: 0,
        duration: 0.6,
        stagger: 0.06,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".jenis-card-wrap",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // Symbol row
      gsap.from(".symbol-row span", {
        scale: 0,
        opacity: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: ".jenis-card-wrap",
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="jenis-barisan"
      ref={sectionRef}
      className="relative bg-white px-28 py-28 overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <div className="jenis-heading mb-16">
          <h2
            className="mt-3 text-4xl md:text-5xl font-black text-gray-900"
            style={{ fontFamily: '"Georgia", serif' }}
          >
            Dua Jenis{" "}
            <span className="text-indigo-500 italic">Barisan</span>
          </h2>
          <p className="mt-4 text-gray-500 text-lg max-w-2xl leading-relaxed">
            Barisan dibedakan menjadi dua berdasarkan pola pertumbuhannya — linier atau eksponensial.
          </p>
        </div>

        {/* Cards */}
        <div className="jenis-card-wrap grid md:grid-cols-2 gap-8">
          {/* Aritmetika */}
          <div className="jenis-card bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className=" mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-2xl font-black text-emerald-600" style={{ fontFamily: '"Georgia", serif' }}>
                  01
                </div>
                <h3 className="text-2xl font-black text-gray-900" style={{ fontFamily: '"Georgia", serif' }}>
                  Barisan Aritmetika
                </h3>
              </div>
              <p className="text-sm text-gray-500 mt-1">Selisih antar suku selalu konstan (beda)</p>
            </div>

            {/* Formula box */}
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 mb-6">
              <p className="text-xs text-emerald-600 font-semibold uppercase tracking-widest mb-3">Rumus Suku ke-n</p>
              <p className="text-2xl font-mono font-bold text-emerald-700">Uₙ = a + (n−1)b</p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {[
                  ["Uₙ", "suku ke-n"],
                  ["a", "suku pertama"],
                  ["n", "nomor suku"],
                  ["b", "beda (selisih)"],
                ].map(([sym, desc]) => (
                  <div key={sym} className="flex items-center gap-2">
                    <span className="font-mono text-sm text-emerald-600 font-bold w-5">
                      {sym}
                    </span>
                    <span className="text-xs text-gray-500">= {desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sequence example */}
            <div className="mb-2">
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">Contoh: a=2, b=3</p>
              <div className="symbol-row flex items-center gap-2 flex-wrap">
                {ARITH_VALS.map((v, i) => (
                  <React.Fragment key={i}>
                    <span className="w-9 h-9 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-sm font-bold text-emerald-700">
                      {v}
                    </span>
                    {i < ARITH_VALS.length - 1 && (
                      <span className="text-emerald-300 text-xs">→</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
              <BarChart values={ARITH_VALS} color="rgba(16,185,129,0.5)" />
              <p className="text-xs text-emerald-500 mt-2 font-mono">↑ pertumbuhan linier — naik sama rata</p>
            </div>
          </div>

          {/* Geometri */}
          <div className="jenis-card bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className=" mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-2xl font-black text-amber-600" style={{ fontFamily: '"Georgia", serif' }}>
                  02
                </div>
                <h3 className="text-2xl font-black text-gray-900 " style={{ fontFamily: '"Georgia", serif' }}>
                  Barisan Geometri
                </h3>
              </div>
              <p className="text-sm text-gray-500 mt-1">Pengali antar suku selalu konstan (rasio)</p>
            </div>

            {/* Formula box */}
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 mb-6">
              <p className="text-xs text-amber-600 font-semibold uppercase tracking-widest mb-3">Rumus Suku ke-n</p>
              <p className="text-2xl font-mono font-bold text-amber-700">Uₙ = a · rⁿ⁻¹</p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {[
                  ["Uₙ", "suku ke-n"],
                  ["a", "suku pertama"],
                  ["n", "nomor suku"],
                  ["r", "rasio (pengali)"],
                ].map(([sym, desc]) => (
                  <div key={sym} className="flex items-center gap-2">
                    <span className="font-mono text-sm text-amber-600 font-bold w-5">
                      {sym}
                    </span>
                    <span className="text-xs text-gray-500">= {desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sequence example */}
            <div className="mb-2">
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">Contoh: a=1, r=2</p>
              <div className="symbol-row flex items-center gap-2 flex-wrap">
                {GEO_VALS.map((v, i) => (
                  <React.Fragment key={i}>
                    <span className="w-9 h-9 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-sm font-bold text-amber-700">
                      {v}
                    </span>
                    {i < GEO_VALS.length - 1 && (
                      <span className="text-amber-300 text-xs">→</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
              <BarChart values={GEO_VALS} color="rgba(245,158,11,0.5)" />
              <p className="text-xs text-amber-500 mt-2 font-mono">↑ pertumbuhan eksponensial — meledak!</p>
            </div>
          </div>
        </div>

        {/* Fun fact strip */}
        <div className="mt-12 bg-indigo-50 border border-indigo-100 rounded-2xl px-8 py-5 flex items-center gap-4">
          <span className="text-3xl" aria-hidden="true">🐚</span>
          <div>
            <p className="text-xs font-semibold text-indigo-500 uppercase tracking-widest mb-1">Fun Fact</p>
            <p className="text-gray-700 text-sm leading-relaxed">
              Barisan Fibonacci (1, 1, 2, 3, 5, 8, 13...) adalah barisan rekursif yang
              tersembunyi di susunan kelopak bunga matahari, cangkang siput, dan spiral
              galaxy. Barisan ini bukan aritmetika maupun geometri, tapi memiliki pola
              tersendiri!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}