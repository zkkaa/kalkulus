"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DuelCanvas, RoyaleCanvas } from "./GameCanvases";

gsap.registerPlugin(ScrollTrigger);

// ── Data game ──────────────────────────────────────────────────
const GAMES = [
  {
    id: "duel",
    num: "01",
    icon: "⚔",
    name: "Calculus Duel",
    badge: "1v1",
    badgeColor: "bg-emerald-50 text-emerald-700",
    logoColor: "bg-emerald-50 text-emerald-600",
    accentColor: "text-emerald-500",
    borderHover: "hover:border-emerald-100",
    btnColor: "bg-gray-900 hover:bg-emerald-600",
    desc: "Duel head-to-head dengan temanmu. Lima pertanyaan kalkulus, siapa yang lebih cepat dan benar — dialah pemenangnya. Tidak ada ampun, tidak ada jalan pintas.",
    tags: ["Speed battle", "5 soal", "Head-to-head", "2 pemain"],
    meta: "2 pemain · ~5 menit",
    video: "/videos/game-bg.mp4",
    canvas: <DuelCanvas />,
    href: "/games/duel",
  },
  {
    id: "royale",
    num: "02",
    icon: "♛",
    name: "Calculus Royale",
    badge: "Multiplayer",
    badgeColor: "bg-indigo-50 text-indigo-600",
    logoColor: "bg-indigo-50 text-indigo-600",
    accentColor: "text-indigo-500",
    borderHover: "hover:border-indigo-100",
    btnColor: "bg-gray-900 hover:bg-indigo-600",
    desc: "Battle kalkulus bersama teman-temanmu. Jawab soal tercepat, raih poin terbanyak, dan buktikan bahwa kamu yang terhebat di antara semuanya.",
    tags: ["Real-time", "Kompetitif", "2–8 pemain", "Leaderboard"],
    meta: "2–8 pemain · ~10 menit",
    video: "/videos/game-bg.mp4",
    canvas: <RoyaleCanvas />,
    href: "/games/royale",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
export default function GameShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Header: label slide kiri, judul clip-path reveal ──
      gsap.from(".showcase-label", {
        x: -20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".showcase-header",
          start: "top 84%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".showcase-title", {
        clipPath: "inset(0 100% 0 0)",
        opacity: 0,
        duration: 1.0,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".showcase-header",
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".showcase-subtitle", {
        x: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".showcase-header",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // ── Cards: masuk dari bawah dengan stagger + scale ────
      gsap.from(".game-card-item", {
        y: 50,
        opacity: 0,
        scale: 0.96,
        stagger: 0.18,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".game-cards-grid",
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="game-showcase"
      className="bg-white border-t border-gray-100 pt-20 pb-24 px-6 md:px-16 lg:px-24 relative"
    >
      {/* ── Header ─────────────────────────────────────────── */}
      <div className="showcase-header mb-14">
        <p className="showcase-label text-[10px] tracking-[0.16em] uppercase text-indigo-500 font-semibold mb-3">
          Pilih permainan
        </p>
        <div className="flex items-end justify-between gap-8">
          <h2
            className="showcase-title text-3xl md:text-4xl font-bold text-gray-900 leading-[1.1]"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Arena <em className="italic text-indigo-500">kalkulus</em>
            <br />
            menunggumu
          </h2>
          <p className="showcase-subtitle hidden md:block text-sm text-gray-400 text-right max-w-55 leading-relaxed pb-1">
            Dua mode berbeda,<br />satu tujuan — kuasai kalkulus.
          </p>
        </div>
      </div>

      {/* ── Game Cards ─────────────────────────────────────── */}
      <div className="game-cards-grid grid grid-cols-1 md:grid-cols-2 gap-6">
        {GAMES.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </section>
  );
}

// ── GameCard ──────────────────────────────────────────────────
type Game = (typeof GAMES)[0];

function GameCard({ game }: { game: Game }) {
  const cardRef       = useRef<HTMLDivElement>(null);
  const videoRef      = useRef<HTMLVideoElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const numRef        = useRef<HTMLDivElement>(null);
  const infoRef       = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // Hover masuk
  const handleMouseEnter = () => {
    setHovered(true);

    // video fade in
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
    gsap.to(canvasWrapRef.current, { opacity: 0, duration: 0.35 });
    gsap.to(videoRef.current,      { opacity: 1, duration: 0.35 });

    // Card lift + shadow
    gsap.to(cardRef.current, {
      scale: 1.018,
      y: -4,
      duration: 0.4,
      ease: "power2.out",
    });

    // Nomor besar: drift ke atas + sedikit lebih besar
    gsap.to(numRef.current, {
      y: -8,
      scale: 1.06,
      opacity: 0.18,
      duration: 0.5,
      ease: "power2.out",
    });

    // Info section: slide sedikit ke atas
    gsap.to(infoRef.current, {
      y: -3,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  // Hover keluar
  const handleMouseLeave = () => {
    setHovered(false);

    if (videoRef.current) videoRef.current.pause();
    gsap.to(canvasWrapRef.current, { opacity: 1, duration: 0.4 });
    gsap.to(videoRef.current,      { opacity: 0, duration: 0.3 });

    gsap.to(cardRef.current, {
      scale: 1,
      y: 0,
      duration: 0.45,
      ease: "power2.out",
    });

    gsap.to(numRef.current, {
      y: 0,
      scale: 1,
      opacity: 1,
      duration: 0.45,
      ease: "power2.out",
    });

    gsap.to(infoRef.current, {
      y: 0,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={cardRef}
      className={`game-card-item group relative bg-white rounded-3xl border border-gray-100 ${game.borderHover}
        overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ transformOrigin: "center center", willChange: "transform" }}
    >
      {/* ── Visual area ──────────────────────────────────── */}
      <div className="relative w-full h-56 md:h-64 overflow-hidden bg-gray-50">
        {/* Canvas default */}
        <div ref={canvasWrapRef} className="absolute inset-0">
          {game.canvas}
        </div>

        {/* Video muncul saat hover */}
        <video
          ref={videoRef}
          src={game.video}
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0 }}
        />

        {/* Nomor besar */}
        <div
          ref={numRef}
          className="absolute top-3 left-4 font-serif text-[64px] font-bold text-gray-100 leading-none select-none pointer-events-none z-10"
          style={{ fontFamily: "Georgia, serif" }}
          aria-hidden="true"
        >
          {game.num}
        </div>

        {/* Badge */}
        <div className="absolute top-4 right-4 z-10">
          <span
            className={`text-[10px] font-semibold px-3 py-1 rounded-full tracking-wide uppercase ${game.badgeColor}`}
          >
            {game.badge}
          </span>
        </div>
      </div>

      {/* ── Info area ─────────────────────────────────────── */}
      <div ref={infoRef} className="p-6">
        {/* Logo + nama */}
        <div className="flex items-center gap-3 mb-3">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center text-base font-bold ${game.logoColor}`}
            style={{
              transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
              transform: hovered ? "scale(1.1) rotate(-6deg)" : "scale(1) rotate(0deg)",
            }}
          >
            {game.icon}
          </div>
          <span
            className="text-lg font-bold text-gray-900"
            style={{ fontFamily: "Georgia, serif" }}
          >
            {game.name}
          </span>
        </div>

        {/* Deskripsi */}
        <p className="text-gray-500 text-sm leading-relaxed mb-4">{game.desc}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {game.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] text-gray-500 border border-gray-100 px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Bottom: tombol + meta */}
        <div className="flex items-center justify-between gap-3">
          <a
            href={game.href}
            className={`${game.btnColor} text-white text-sm font-medium px-5 py-2 rounded-full transition-colors duration-300`}
          >
            Mainkan sekarang
          </a>
          <span className="text-xs text-gray-400">{game.meta}</span>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-6 right-6 h-px bg-indigo-200 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </div>
  );
}