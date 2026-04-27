"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: "2x", label: "Lebih cepat paham" },
  { value: "5+", label: "Topik kalkulus" },
  { value: "1v1", label: "Mode duel" },
  { value: "∞",  label: "Sesi bermain" },
];

export default function GameWhy() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef   = useRef<HTMLHeadingElement>(null);
  const descRef    = useRef<HTMLParagraphElement>(null);
  const statsRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Judul: per kata muncul dari bawah (word reveal) ───
      if (titleRef.current) {
        // Bungkus tiap kata dengan span overflow:hidden
        const rawText = titleRef.current.innerHTML;
        // Kita animasikan per child element (em dan text nodes)
        // Lebih aman: animasikan seluruh heading dengan clip path
        gsap.from(titleRef.current, {
          clipPath: "inset(0 100% 0 0)",
          opacity: 0,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 83%",
            toggleActions: "play none none reverse",
          },
        });
      }

      // ── Deskripsi: slide dari bawah + blur ────────────────
      gsap.from(descRef.current, {
        y: 24,
        opacity: 0,
        filter: "blur(5px)",
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: descRef.current,
          start: "top 87%",
          toggleActions: "play none none reverse",
        },
      });

      // ── Stats: setiap item muncul dengan scale + stagger ──
      if (statsRef.current) {
        const items = statsRef.current.querySelectorAll<HTMLElement>(".stat-item");
        gsap.from(items, {
          y: 28,
          opacity: 0,
          scale: 0.88,
          stagger: 0.1,
          duration: 0.65,
          ease: "back.out(1.6)",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });

        // Garis bawah stat value: animasi width dari 0
        const values = statsRef.current.querySelectorAll<HTMLElement>(".stat-value");
        gsap.from(values, {
          scale: 0.5,
          opacity: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 86%",
            toggleActions: "play none none reverse",
          },
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="bg-white px-10 md:px-24 lg:px-36 py-20 md:py-24 z-10 relative"
    >
      {/* ── Header ──────────────────────────────────────────── */}
      <div className="mb-14">
        <h2
          ref={titleRef}
          className="text-3xl md:text-4xl font-bold leading-[1.1] text-gray-900 mb-4 max-w-xl"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Kenapa belajar sambil{" "}
          <em className="italic text-5xl text-indigo-500">bermain </em>
          {/* <br /> */}
          bisa membuatmu lebih mudah paham?
        </h2>
        <p
          ref={descRef}
          className="text-gray-500 text-sm md:text-base leading-relaxed max-w-lg"
        >
          Otak menyerap informasi jauh lebih efektif ketika ada elemen
          kompetisi dan kesenangan. Game ini dirancang agar kamu tanpa sadar
          mengulang konsep kalkulus berkali-kali.
        </p>
      </div>

      {/* ── Stats Bar ────────────────────────────────────────── */}
      <div
        ref={statsRef}
        className="grid grid-cols-2 sm:grid-cols-4 border border-gray-100 rounded-2xl overflow-hidden"
      >
        {STATS.map((s, i) => (
          <div
            key={i}
            className={`stat-item flex flex-col items-center justify-center py-7 px-4
              ${i < STATS.length - 1 ? "border-r border-gray-100" : ""}`}
          >
            <span
              className="stat-value text-3xl font-bold text-gray-900 mb-1"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {s.value}
            </span>
            <span className="text-[11px] text-gray-400 tracking-wide text-center">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}