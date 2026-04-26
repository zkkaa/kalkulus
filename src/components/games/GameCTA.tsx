"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function GameCTA() {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(boxRef.current, {
        y: 32,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: {
          trigger: boxRef.current,
          start: "top 86%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(boxRef.current!.querySelectorAll(".cta-stagger"), {
        y: 16,
        opacity: 0,
        stagger: 0.1,
        duration: 0.65,
        ease: "power3.out",
        scrollTrigger: {
          trigger: boxRef.current,
          start: "top 84%",
          toggleActions: "play none none reverse",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative  border-t border-gray-100 px-6 md:px-16 lg:px-24 py-20 bg-white">
      <div
        ref={boxRef}
        className="relative overflow-hidden rounded-3xl border border-gray-100 bg-indigo-50/40 px-10 md:px-14 py-14 md:py-16
          flex flex-col md:flex-row items-start md:items-center justify-between gap-10"
      >
        {/* Dekorasi lingkaran */}
        <div className="pointer-events-none absolute -right-16 -top-16 w-64 h-64 rounded-full border border-indigo-100" />
        <div className="pointer-events-none absolute -right-24 -top-24 w-80 h-80 rounded-full border border-indigo-100/60" />
        <div className="pointer-events-none absolute -right-8 -top-8 w-48 h-48 rounded-full border border-indigo-200/40" />

        {/* Simbol dekoratif pojok kiri bawah */}
        <span
          className="pointer-events-none absolute bottom-6 left-8 text-6xl text-indigo-100 select-none font-serif"
          aria-hidden="true"
          style={{ fontFamily: "Georgia, serif" }}
        >
          ∫
        </span>

        {/* Kiri: teks */}
        <div className="relative z-10 max-w-lg">
          <p className="cta-stagger text-[10px] tracking-[0.16em] uppercase text-indigo-500 font-semibold mb-3">
            Siap buktikan kemampuanmu?
          </p>
          <h2
            className="cta-stagger text-3xl md:text-4xl font-bold text-gray-900 leading-[1.1] mb-4"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Buktikan kamu yang
            <br />
            paling paham{" "}
            <em className="italic text-indigo-500">kalkulus</em>
          </h2>
          <p className="cta-stagger text-gray-500 text-sm leading-relaxed max-w-md">
            Bergabunglah dengan teman-temanmu dan jadikan sesi belajar
            kalkulus sebagai momen paling seru hari ini. Pilih game, ajak
            teman, dan mulai sekarang.
          </p>
        </div>

        {/* Kanan: buttons */}
        <div className="relative z-10 flex flex-col gap-3 shrink-0">
          <a
            href="#game-showcase"
            className="cta-stagger w-full md:w-auto text-center px-8 py-3 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-indigo-600 transition-colors duration-300 cursor-pointer whitespace-nowrap"
          >
            Mulai bermain
          </a>
          <a
            href="/materi"
            className="cta-stagger w-full md:w-auto text-center px-8 py-3 rounded-full bg-white text-gray-500 text-sm border border-gray-200 hover:border-gray-400 hover:text-gray-900 transition-all duration-200 cursor-pointer whitespace-nowrap"
          >
            Pelajari materi dulu
          </a>
        </div>
      </div>
    </section>
  );
}