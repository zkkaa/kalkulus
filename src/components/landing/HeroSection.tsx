"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedButton from "../common/AnimatedButton";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

// ─── Helper: pecah teks jadi span per karakter ───────────────────────────────
function SplitText({
  text,
  className = "",
  wordClassName = "",
}: {
  text: string;
  className?: string;
  wordClassName?: string;
}) {
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span
          key={wi}
          className={`inline-block overflow-hidden ${wordClassName}`}
        >
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

// ─────────────────────────────────────────────────────────────────────────────
export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const peekRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Badge sigma: slide dari atas ke bawah
      tl.from(badgeRef.current, {
        y: -40,
        opacity: 0,
        duration: 0.7,
      });

      // 2. Judul baris 1: stagger per .char
      if (line1Ref.current) {
        const chars1 = line1Ref.current.querySelectorAll(".char");
        tl.from(
          chars1,
          { y: "110%", opacity: 0, duration: 0.55, stagger: 0.028 },
          "-=0.2"
        );
      }

      // 3. Judul baris 2: stagger per .char
      if (line2Ref.current) {
        const chars2 = line2Ref.current.querySelectorAll(".char");
        tl.from(
          chars2,
          { y: "110%", opacity: 0, duration: 0.55, stagger: 0.025 },
          "-=0.4"
        );
      }

      // 4. Deskripsi: fade in + slide naik
      tl.from(descRef.current, { y: 22, opacity: 0, duration: 0.7 }, "-=0.15");

      // 5. CTA button
      tl.from(ctaRef.current, { y: 20, opacity: 0, duration: 0.6 }, "-=0.3");

      // 6. Peek box (kotak abu di bawah): fade in lambat
      tl.from(peekRef.current, { opacity: 0, duration: 1 }, "-=0.2");

      tl.from(sectionRef.current, {}, "-=0.2000");

      // Hero harus tetap sticky di tempatnya.
      // Tidak perlu memindahkan hero dengan GSAP karena efek tertutup
      // bisa dicapai oleh bagian abu yang muncul kemudian.
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="tentang"
      className="sticky top-0 min-h-[80vh] flex flex-col items-center justify-center text-center px-6 pt-28 pb-0 overflow-hidden -z-10y"
    >
      {/* ── Konten utama ─────────────────────────────────────────────────── */}
      <div className="sticky z-10 flex flex-col items-center gap-6 max-w-3xl w-full">

        {/* Badge sigma */}
        <div ref={badgeRef} className="flex justify-center items-center gap-2 -mb-3">
          <div className="flex items-center justify-center -mb-2">
            <Image src="/logo.png" alt="Sigma" width={24} height={24} unoptimized
              style={{ width: "24px", height: "auto" }} />
          </div>
          <span className="text-xl tracking-wide font-medium text-gray-700">
            𝖘𝖎𝖌𝖒𝖆
          </span>
        </div>

        {/* Judul */}
        <h1
          className="leading-[1.08] tracking-tight text-gray-900 select-none"
          style={{ fontFamily: '"Georgia", serif' }}
        >
          <span className="block text-3xl md:text-5xl font-black">
            <span ref={line1Ref}>
              <SplitText text="Smart Interactive Graphing" />
            </span>
          </span>
          <span className="block text-3xl md:text-5xl font-black mt-1">
            <span ref={line2Ref} className="text-indigo-500">
              <SplitText text="& Math Application" />
            </span>
          </span>
        </h1>

        {/* Deskripsi */}
        <p
          ref={descRef}
          className="text-gray-500 text-base md:text-lg max-w-xl leading-relaxed"
        >
          Platform pembelajaran kalkulus berbasis teknologi yang membantu kamu
          memahami konsep secara lebih mudah dan interaktif.
        </p>

        <div ref={ctaRef}>
          <AnimatedButton href="/projects" className="" variant="sigma" size="sm">
            Lihat Lebih Lanjut
          </AnimatedButton>
        </div>
      </div>
    </section>
  );
}