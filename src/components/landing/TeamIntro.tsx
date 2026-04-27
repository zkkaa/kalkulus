"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextHeading from "@/components/ui/TextHeading";
import Stack from "@/components/landing/Stack";
import { head } from "framer-motion/client";

gsap.registerPlugin(ScrollTrigger);

// ── Stats ──────────────────────────────────────────────────────────────────────
const STATS = [
  { value: "6", label: "Anggota" },
  { value: "2", label: "Semester" },
  { value: "∞", label: "Kopi" },
];

// ─────────────────────────────────────────────────────────────────────────────
export default function TeamIntro() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Foto slide dari kiri
      gsap.from(photoRef.current, {
        x: -80,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
      });

      // Teks kanan: setiap elemen masuk stagger dari kanan
      const textEls = [
        labelRef.current,
        headingRef.current,
        descRef.current,
        dividerRef.current,
        statsRef.current,
        hintRef.current,
      ].filter(Boolean);

      gsap.from(textEls, {
        x: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
      });

      // Stats counter-like: y dari bawah
      const statItems = statsRef.current?.querySelectorAll(".stat-item");
      if (statItems) {
        gsap.from(Array.from(statItems), {
          y: 24,
          opacity: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden flex items-center px-10 pt-28"
    >

      {/* ── Video Background ─────────────────────────────────── */}
      <div className="absolute inset-0">
        <video
          src="/videos/game-bg.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/75" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-black/10 to-transparent" />
      </div>

      <div className="relative z-10 h-full flex flex-col justify-end px-10 md:px-16 lg:px-24 pb-16 md:pb-20">

        {/* ── Kanan: Teks ────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-5 max-w-lg">

          {/* Label */}
          <span
            ref={labelRef}
            className="text-xs font-semibold tracking-widest text-white/55 uppercase"
          >
            Kelompok 9 · 2026
          </span>

          {/* Judul — per karakter dari bawah */}
        <h1
          className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-none tracking-tight text-white mb-4 select-none"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {/* overflow-hidden di tiap baris supaya karakter tidak keluar sebelum reveal */}
          <span className="block" style={{ overflow: "hidden", paddingBottom: "0.06em" }}>
            <span ref={headingRef}>
              <SplitChars text="Belajar sambil" />
            </span>
          </span>
          <span className="block" style={{ overflow: "hidden", paddingBottom: "0.06em" }}>
            <span ref={headingRef}>
              <SplitChars text="bermain" className="text-indigo-300 italic" />
            </span>
          </span>
        </h1>

          {/* Deskripsi */}
          <p
            ref={descRef}
            className="text-white/55 text-sm md:text-base leading-relaxed"
          >
            Berawal dari tugas kelompok dan bergelas-gelas kopi, kami membangun
            <span className="font-semibold text-indigo-300"> Sigma</span> sebagai tempat belajar
            kalkulus yang lebih visual dan interaktif. Kami percaya, matematika nggak harus
            serem kalau dibikin asik. 😄
          </p>

          {/* Divider */}
          <div ref={dividerRef} className="w-12 h-px bg-gray-200" />

          {/* Stats */}
          <div ref={statsRef} className="flex gap-8">
            {STATS.map((stat) => (
              <div key={stat.label} className="stat-item flex flex-col gap-0.5">
                <span className="text-2xl md:text-3xl font-bold text-indigo-300">
                  {stat.value}
                </span>
                <span className="text-xs text-white/55 tracking-wide">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Helper: split teks jadi span per karakter ─────────────────
function SplitChars({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block overflow-hidden">
          {word.split("").map((char, ci) => (
            <span key={ci} className="char inline-block" aria-hidden="true">
              {char}
            </span>
          ))}
          {wi < words.length - 1 && (
            <span className="inline-block" aria-hidden="true">
              &nbsp;
            </span>
          )}
        </span>
      ))}
    </span>
  );
}