"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedButton from "../ui/AnimatedButton";

gsap.registerPlugin(ScrollTrigger);

export default function GameCTA() {
  const boxRef    = useRef<HTMLDivElement>(null);
  const labelRef  = useRef<HTMLParagraphElement>(null);
  const titleRef  = useRef<HTMLHeadingElement>(null);
  const descRef   = useRef<HTMLParagraphElement>(null);
  const btnsRef   = useRef<HTMLDivElement>(null);
  const symRef    = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Box: masuk dari bawah ─────────────────────────────
      gsap.from(boxRef.current, {
        y: 40,
        opacity: 0,
        scale: 0.97,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: boxRef.current,
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      });

      // ── Label: slide kiri ─────────────────────────────────
      gsap.from(labelRef.current, {
        x: -18,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: boxRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // ── Judul: clip-path wipe dari kiri ───────────────────
      gsap.from(titleRef.current, {
        clipPath: "inset(0 100% 0 0)",
        opacity: 0,
        duration: 1.0,
        ease: "power4.out",
        scrollTrigger: {
          trigger: boxRef.current,
          start: "top 83%",
          toggleActions: "play none none reverse",
        },
      });

      // ── Deskripsi: fade + blur ─────────────────────────────
      gsap.from(descRef.current, {
        y: 20,
        opacity: 0,
        filter: "blur(4px)",
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: {
          trigger: boxRef.current,
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });

      // ── Buttons: slide dari kanan stagger ─────────────────
      if (btnsRef.current) {
        gsap.from(btnsRef.current.children, {
          x: 24,
          opacity: 0,
          stagger: 0.12,
          duration: 0.65,
          ease: "power3.out",
          scrollTrigger: {
            trigger: boxRef.current,
            start: "top 81%",
            toggleActions: "play none none reverse",
          },
        });
      }

      // ── Simbol ∫ pojok: rotate + float infinite ────────────
      if (symRef.current) {
        // Masuk
        gsap.from(symRef.current, {
          scale: 0,
          opacity: 0,
          rotate: -45,
          duration: 1.0,
          ease: "back.out(1.6)",
          scrollTrigger: {
            trigger: boxRef.current,
            start: "top 86%",
            toggleActions: "play none none reverse",
          },
        });
        // Float terus
        gsap.to(symRef.current, {
          y: -12,
          rotate: 8,
          duration: 3,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative border-t border-gray-100 px-6 md:px-16 lg:px-24 py-20 bg-white">
      <div
        ref={boxRef}
        className="relative overflow-hidden rounded-3xl border border-gray-100 bg-indigo-50/40 px-10 md:px-14 py-14 md:py-16
          flex flex-col md:flex-row items-start md:items-center justify-between gap-10"
      >
        {/* Dekorasi lingkaran */}
        <div className="pointer-events-none absolute -right-16 -top-16 w-64 h-64 rounded-full border border-indigo-100" />
        <div className="pointer-events-none absolute -right-24 -top-24 w-80 h-80 rounded-full border border-indigo-100/60" />
        <div className="pointer-events-none absolute -right-8  -top-8  w-48 h-48 rounded-full border border-indigo-200/40" />

        {/* Simbol ∫ pojok kiri bawah — float animasi */}
        <span
          ref={symRef}
          className="pointer-events-none absolute bottom-6 left-8 text-6xl text-indigo-100 select-none font-serif"
          aria-hidden="true"
          style={{ fontFamily: "Georgia, serif" }}
        >
          ∫
        </span>

        {/* Kiri: teks */}
        <div className="relative z-10 max-w-lg">
          <p
            ref={labelRef}
            className="text-[10px] tracking-[0.16em] uppercase text-indigo-500 font-semibold mb-3"
          >
            Siap buktikan kemampuanmu?
          </p>
          <h2
            ref={titleRef}
            className="text-3xl md:text-4xl font-bold text-gray-900 leading-[1.1] mb-4"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Buktikan kamu yang
            <br />
            paling paham{" "}
            <em className="italic text-indigo-500">kalkulus</em>
          </h2>
          <p
            ref={descRef}
            className="text-gray-500 text-sm leading-relaxed max-w-md"
          >
            Bergabunglah dengan teman-temanmu dan jadikan sesi belajar
            kalkulus sebagai momen paling seru hari ini. Pilih game, ajak
            teman, dan mulai sekarang.
          </p>
        </div>

        {/* Kanan: buttons */}
        <div ref={btnsRef} className="relative z-40 flex items-center gap-4">
          <AnimatedButton onClick={() => document.getElementById("materi-section")?.scrollIntoView({ behavior: "smooth" })} variant="sigma" size="sm">
            Pelajari Materi Dulu
          </AnimatedButton>
        </div>
      </div>
    </section>
  );
}