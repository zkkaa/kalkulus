"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

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

export default function GameHero() {
  const contentRef = useRef<HTMLDivElement>(null);
  const badgeRef   = useRef<HTMLDivElement>(null);
  const line1Ref   = useRef<HTMLSpanElement>(null);
  const line2Ref   = useRef<HTMLSpanElement>(null);
  const descRef    = useRef<HTMLParagraphElement>(null);
  const btnRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Badge: jatuh dari atas + fade
      if (badgeRef.current) {
        tl.from(badgeRef.current, {
          y: -30,
          opacity: 0,
          duration: 0.7,
        });
      }

      // 2. Baris 1: per karakter naik dari bawah (text reveal clip)
      if (line1Ref.current) {
        const chars = line1Ref.current.querySelectorAll<HTMLElement>(".char");
        tl.from(
          chars,
          {
            y: "110%",
            opacity: 0,
            duration: 0.6,
            stagger: 0.028,
            ease: "power3.out",
          },
          "-=0.3"
        );
      }

      // 3. Baris 2 italic: per karakter, jeda sedikit setelah baris 1
      if (line2Ref.current) {
        const chars = line2Ref.current.querySelectorAll<HTMLElement>(".char");
        tl.from(
          chars,
          {
            y: "110%",
            opacity: 0,
            duration: 0.55,
            stagger: 0.032,
            ease: "power3.out",
          },
          "-=0.42"
        );
      }

      // 4. Deskripsi: slide dari kiri + blur to clear
      if (descRef.current) {
        tl.from(
          descRef.current,
          {
            x: -48,
            opacity: 0,
            filter: "blur(4px)",
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.2"
        );
      }

      // 5. Button: muncul dari bawah + sedikit bounce
      if (btnRef.current) {
        tl.from(
          btnRef.current,
          {
            y: 22,
            opacity: 0,
            scale: 0.9,
            duration: 0.65,
            ease: "back.out(1.8)",
          },
          "-=0.4"
        );
      }
    }, contentRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="sticky top-0 min-h-[95vh] overflow-hidden flex items-center px-10 pt-28">
      {/* ── Video Background ─────────────────────────────────── */}
      <div className="absolute inset-0">
        <video
          src="https://7sqr8euvtsm1cutd.public.blob.vercel-storage.com/team/bg-video.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/75" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-black/10 to-transparent" />
      </div>

      {/* ── Content ──────────────────────────────────────────── */}
      <div
        ref={contentRef}
        className="relative z-10 h-full flex flex-col justify-end px-10 md:px-16 lg:px-24 pb-16 md:pb-20"
      >
        {/* Badge — jatuh dari atas */}
        <div ref={badgeRef} className="flex items-center gap-2 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
          <span className="font-sans text-[10px] tracking-[0.16em] uppercase text-white/55 font-medium">
            Game Mode — Sigma
          </span>
        </div>

        {/* Judul — per karakter dari bawah */}
        <h1
          className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-none tracking-tight text-white mb-4 select-none"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {/* overflow-hidden di tiap baris supaya karakter tidak keluar sebelum reveal */}
          <span className="block" style={{ overflow: "hidden", paddingBottom: "0.06em" }}>
            <span ref={line1Ref}>
              <SplitChars text="Belajar sambil" />
            </span>
          </span>
          <span className="block" style={{ overflow: "hidden", paddingBottom: "0.06em" }}>
            <span ref={line2Ref}>
              <SplitChars text="bermain" className="text-indigo-300 italic" />
            </span>
          </span>
        </h1>

        {/* Deskripsi — slide dari kiri + blur */}
        <p
          ref={descRef}
          className="text-white/55 text-sm md:text-base leading-relaxed max-w-sm md:max-w-md mb-8"
        >
          Uji kemampuan kalkulus kamu lewat dua mode game yang seru dan
          kompetitif. Tantang teman, buktikan siapa yang terbaik.
        </p>
      </div>
    </section>
  );
}