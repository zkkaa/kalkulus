"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ApaItuDeterminan() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef   = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const matrixRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const ST = { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none reverse" };

      gsap.from(photoRef.current,   { x: -80, opacity: 0, duration: 1,   ease: "power3.out", scrollTrigger: ST });
      gsap.from(contentRef.current, { x:  60, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: ST });

      // matrix cells stagger
      gsap.from(".matrix-cell", {
        scale: 0, opacity: 0, duration: 0.4, stagger: 0.07, ease: "back.out(1.7)",
        scrollTrigger: { trigger: matrixRef.current, start: "top 85%", toggleActions: "play none none reverse" },
      });

      // diagonal arrows draw
      gsap.from(".arrow-pos", { strokeDashoffset: 200, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: matrixRef.current, start: "top 82%", toggleActions: "play none none reverse" } });
      gsap.from(".arrow-neg", { strokeDashoffset: 200, duration: 0.8, delay: 0.3, ease: "power2.out", scrollTrigger: { trigger: matrixRef.current, start: "top 82%", toggleActions: "play none none reverse" } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="apa-determinan" ref={sectionRef} className="relative bg-white px-28 py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center gap-20">

        {/* LEFT: Photo */}
        <div ref={photoRef} className="shrink-0 hidden lg:block">
          <div className="relative">
            <div className="absolute -inset-6 bg-linear-to-br from-violet-50 to-purple-50 rounded-3xl -z-10" />
            <div className="relative w-56 h-72 rounded-2xl overflow-hidden">
              <Image src="/gift/plenger2.webp" alt="Zaki Khoirullah" fill className="object-cover object-top" unoptimized />
            </div>
            <div className="mt-3 text-center">
              <p className="text-xs font-semibold text-gray-700">Zaki Khoirullah</p>
              <p className="text-[10px] text-gray-400 italic">257006111028</p>
            </div>
            <div className="absolute -top-5 -right-8 bg-white border border-violet-100 shadow-sm rounded-xl px-3 py-2">
              <span className="font-mono text-xs text-violet-600">|A| = scalar</span>
            </div>
          </div>
        </div>

        {/* RIGHT: Content */}
        <div ref={contentRef} className="flex-1 min-w-0">
          <span className="text-xs font-semibold tracking-widest text-violet-400 uppercase">Konsep Dasar · 01</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-black text-gray-900 mb-6" style={{ fontFamily: '"Georgia", serif' }}>
            Apa itu <span className="text-violet-500 italic">Determinan?</span>
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-xl">
            Determinan adalah sebuah <strong className="text-gray-700">nilai skalar</strong> yang
            dihitung dari elemen-elemen matriks persegi. Dilambangkan dengan{" "}
            <span className="font-mono text-violet-600">det(A)</span> atau{" "}
            <span className="font-mono text-violet-600">|A|</span>, determinan memberi tahu kita
            banyak hal tentang sifat matriks tersebut.
          </p>

          {/* Key properties */}
          <div className="grid grid-cols-2 gap-3 mb-10">
            {[
              { icon: "✓", title: "Matriks Invertible", desc: "Jika det(A) ≠ 0, matriks punya invers" },
              { icon: "✗", title: "Matriks Singular",   desc: "Jika det(A) = 0, matriks tidak punya invers" },
              { icon: "📐", title: "Luas & Volume",      desc: "Menghitung luas jajar genjang dari vektor kolom" },
              { icon: "⚖️", title: "Persamaan Linear",  desc: "Kunci pemecahan SPL dengan Metode Cramer" },
            ].map((p) => (
              <div key={p.title} className="bg-violet-50 rounded-2xl p-4 border border-violet-100">
                <div className="text-xl mb-2">{p.icon}</div>
                <p className="text-sm font-semibold text-gray-800 mb-1">{p.title}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>

          {/* Visual 2x2 matrix */}
          <div ref={matrixRef}>
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-4 font-medium">Visualisasi: Determinan 2×2</p>
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 inline-block">
              <div className="flex items-center gap-6">
                {/* Matrix bracket visual */}
                <div className="relative">
                  {/* Left bracket */}
                  <div className="absolute -left-3 top-0 bottom-0 w-2 border-l-2 border-t-2 border-b-2 border-gray-400 rounded-l" />
                  <div className="grid grid-cols-2 gap-3 px-2">
                    {[
                      { val: "a", pos: "11", color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
                      { val: "b", pos: "12", color: "text-rose-500   bg-rose-50   border-rose-200"   },
                      { val: "c", pos: "21", color: "text-rose-500   bg-rose-50   border-rose-200"   },
                      { val: "d", pos: "22", color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
                    ].map((cell) => (
                      <div key={cell.pos}
                        className={`matrix-cell w-12 h-12 rounded-lg border flex items-center justify-center font-mono text-xl font-bold ${cell.color}`}>
                        {cell.val}
                      </div>
                    ))}
                  </div>
                  {/* Right bracket */}
                  <div className="absolute -right-3 top-0 bottom-0 w-2 border-r-2 border-t-2 border-b-2 border-gray-400 rounded-r" />

                  {/* Diagonal SVG overlay */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 108 108">
                    <line className="arrow-pos" x1="14" y1="14" x2="94" y2="94"
                      stroke="#10B981" strokeWidth="2" strokeDasharray="200" strokeDashoffset="0" opacity="0.6" />
                    <line className="arrow-neg" x1="94" y1="14" x2="14" y2="94"
                      stroke="#F43F5E" strokeWidth="2" strokeDasharray="200" strokeDashoffset="0" opacity="0.6" />
                  </svg>
                </div>

                {/* Formula */}
                <div className="flex flex-col gap-2">
                  <p className="font-mono text-lg font-bold text-gray-800">det(A) = ad − bc</p>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-3 h-0.5 bg-emerald-500 rounded" />
                      <span className="text-gray-500">diagonal utama (+): <span className="font-mono text-emerald-600">a×d</span></span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-3 h-0.5 bg-rose-500 rounded" />
                      <span className="text-gray-500">diagonal silang (−): <span className="font-mono text-rose-500">b×c</span></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}