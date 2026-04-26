"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import AnimatedButton from "../ui/AnimatedButton";

export default function GameHero() {
  const contentRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(badgeRef.current, { y: -16, opacity: 0, duration: 0.6 })
        .from(titleRef.current, { y: 36, opacity: 0, duration: 0.85 }, "-=0.3")
        .from(descRef.current, { y: 20, opacity: 0, duration: 0.7 }, "-=0.4")
        .from(btnRef.current, { y: 14, opacity: 0, duration: 0.6 }, "-=0.35");
    }, contentRef);

    return () => ctx.revert();
  }, []);

  const handleScrollToGames = () => {
    document.getElementById("game-showcase")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="sticky top-0 min-h-[95vh] overflow-hidden flex items-center px-10 pt-28 ">
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
        {/* Overlay gelap */}
        <div className="absolute inset-0 bg-black/75" />
        {/* Gradient bawah supaya transisi ke section 2 smooth */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-black/10 to-transparent" />
      </div>

      {/* ── Content rata kiri ────────────────────────────────── */}
      <div
        ref={contentRef}
        className="relative z-10 h-full flex flex-col justify-end px-10 md:px-16 lg:px-24 pb-16 md:pb-20"
      >
        {/* Badge */}
        <div
          ref={badgeRef}
          className="flex items-center gap-2 mb-4"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
          <span className="font-sans text-[10px] tracking-[0.16em] uppercase text-white/55 font-medium">
            Game Mode — Sigma
          </span>
        </div>

        {/* Judul */}
        <h1
          ref={titleRef}
          className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-none tracking-tight text-white mb-4 select-none"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Belajar sambil
          <br />
          <em className="text-indigo-300 italic">bermain</em>
        </h1>

        {/* Deskripsi */}
        <p
          ref={descRef}
          className="text-white/55 text-sm md:text-base leading-relaxed max-w-sm md:max-w-md mb-8"
        >
          Uji kemampuan kalkulus kamu lewat dua mode game yang seru dan
          kompetitif. Tantang teman, buktikan siapa yang terbaik.
        </p>

        <AnimatedButton  onClick={handleScrollToGames} variant="sigma" size="md">
          Lihat Permainannya
        </AnimatedButton>
      </div>
    </section>
  );
}