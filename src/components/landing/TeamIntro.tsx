"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextHeading from "@/components/ui/TextHeading";
import Stack from "@/components/landing/Stack";

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
      className="relative py-24 px-6 md:px-16 lg:px-24 overflow-hidden bg-gray-100"
    >
      {/* ── Dekorasi background ─────────────────────────────────────────── */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-50 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-56 h-56 bg-gray-100 rounded-full blur-2xl opacity-70 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-16 md:gap-36">

        {/* ── Kanan: Teks ────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-5 max-w-lg">

          {/* Label */}
          <span
            ref={labelRef}
            className="text-xs font-semibold tracking-widest text-indigo-400 uppercase"
          >
            Kelompok 9 · 2026
          </span>

          {/* Heading */}
          <div ref={headingRef}>
            <TextHeading
              title="Orang-orang di balik Sigma"
              titleItalic
              titleSize="xl"
              animateOnScroll={false}
            />
          </div>

          {/* Deskripsi */}
          <p
            ref={descRef}
            className="text-gray-500 text-sm md:text-base leading-relaxed"
          >
            Kami percaya setiap orang bisa memahami kalkulus, asalkan disajikan dengan cara yang tepat. Kelompok 9 yang terdiri dari 6 mahasiswa membangun ruang belajar yang interaktif, visual, dan menyenangkan — karena matematika seharusnya bukan hal yang ditakuti. Berbekal semangat, deadline mepet, dan
            bergelas-gelas kopi, lahirlah{" "}
            <span className="font-semibold text-gray-700">Sigma</span>.
            Semoga bermanfaat, yakkk. 😄
          </p>

          {/* Divider */}
          <div ref={dividerRef} className="w-12 h-px bg-gray-200" />

          {/* Stats */}
          <div ref={statsRef} className="flex gap-8">
            {STATS.map((stat) => (
              <div key={stat.label} className="stat-item flex flex-col gap-0.5">
                <span className="text-2xl md:text-3xl font-bold text-gray-900">
                  {stat.value}
                </span>
                <span className="text-xs text-gray-400 tracking-wide">
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