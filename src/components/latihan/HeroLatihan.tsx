"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { motion, AnimatePresence } from "framer-motion";

// ─── Flip counter digit ───────────────────────────────────────────────────────
function FlipDigit({ value }: { value: string }) {
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={value}
        initial={{ rotateX: -90, opacity: 0 }}
        animate={{ rotateX: 0, opacity: 1 }}
        exit={{ rotateX: 90, opacity: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="inline-block"
        style={{ transformOrigin: "center" }}
      >
        {value}
      </motion.span>
    </AnimatePresence>
  );
}

// ─── Animated counter ─────────────────────────────────────────────────────────
function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const step = Math.ceil(target / 40);
          const timer = setInterval(() => {
            start += step;
            if (start >= target) { setCount(target); clearInterval(timer); }
            else setCount(start);
          }, 30);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="font-black tabular-nums" style={{ fontFamily: '"Georgia", serif' }}>
      <FlipDigit value={String(count)} />
      {suffix}
    </div>
  );
}

// ─── Pulsing ring ─────────────────────────────────────────────────────────────
function PulseRing({ color, delay = 0 }: { color: string; delay?: number }) {
  return (
    <motion.div
      className="absolute inset-0 rounded-full border-2 pointer-events-none"
      style={{ borderColor: color }}
      animate={{ scale: [1, 1.6, 1.6], opacity: [0.6, 0, 0] }}
      transition={{ duration: 2.5, repeat: Infinity, delay, ease: "easeOut" }}
    />
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function HeroLatihan() {
  const sectionRef = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hl-eyebrow", { y: -20, opacity: 0, duration: 0.5 });
      tl.from(".hl-title",   { y: 40,  opacity: 0, duration: 0.7 }, "-=0.2");
      tl.from(".hl-sub",     { y: 20,  opacity: 0, duration: 0.6 }, "-=0.3");
      tl.from(".hl-cta",     { y: 20,  opacity: 0, duration: 0.5, stagger: 0.1 }, "-=0.3");
      tl.from(".hl-stats",   { y: 24,  opacity: 0, duration: 0.5, stagger: 0.08 }, "-=0.3");
      tl.from(".hl-right",   { x: 60,  opacity: 0, duration: 0.8, ease: "power2.out" }, "-=0.7");
    }, sectionRef);

    // Delayed ready for CTA pulse
    setTimeout(() => setReady(true), 1200);
    return () => ctx.revert();
  }, []);

  const scrollToMenu = () => {
    document.getElementById("menu-latihan")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-white overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      {/* ── Background ───────────────────────────────────────────────── */}
      {/* Diagonal split bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, #f8f7ff 0%, #ffffff 50%, #eff6ff 100%)",
        }}
      />
      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(#4F46E5 1px,transparent 1px),linear-gradient(90deg,#4F46E5 1px,transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      {/* Top-right glow */}
      <div className="absolute -top-40 -right-40 w-175 h-175 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)" }} />
      {/* Bottom-left glow */}
      <div className="absolute -bottom-40 -left-20 w-125 h-125 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)" }} />

      {/* ── Content ──────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-28 flex items-center min-h-screen gap-16">

        {/* LEFT ─────────────────────────────────────── */}
        <div className="flex-1 min-w-0 py-28">

          {/* Eyebrow */}
          <div className="hl-eyebrow flex items-center gap-3 mb-8">
            <Image src="/logo.png" alt="Sigma" width={20} height={20} unoptimized />
            <span className="text-sm font-medium text-gray-500" style={{ fontFamily: '"Georgia", serif' }}>𝖘𝖎𝖌𝖒𝖆</span>
            <span className="text-gray-300">·</span>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
              <span className="text-xs font-semibold text-indigo-600 tracking-wide">Arena Latihan</span>
            </div>
          </div>

          {/* Title */}
          <div className="hl-title mb-6">
            <h1
              className="leading-[1.05] tracking-tight text-gray-900 select-none"
              style={{ fontFamily: '"Georgia", serif' }}
            >
              <span className="block text-5xl md:text-6xl lg:text-[72px] font-black">
                Siap untuk
              </span>
              <span className="block text-5xl md:text-6xl lg:text-[72px] font-black mt-1 relative">
                <span className="text-indigo-500 italic">tantangan</span>
                <span className="text-gray-900"> ini?</span>
                {/* Underline accent */}
                <motion.div
                  className="absolute -bottom-2 left-0 h-1 rounded-full bg-indigo-400"
                  initial={{ width: 0 }}
                  animate={{ width: "45%" }}
                  transition={{ duration: 1, delay: 1, ease: "easeOut" }}
                />
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <p className="hl-sub text-gray-500 text-lg leading-relaxed max-w-lg mb-10">
            Bukan sekadar pilihan ganda biasa. Setiap jawaban salah membuka
            <strong className="text-gray-700"> pembahasan langkah-demi-langkah</strong> — karena
            yang penting bukan angkanya, tapi prosesnya.
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-4 mb-14">
            <div className="hl-cta relative">
              {ready && (
                <>
                  <PulseRing color="#4F46E5" />
                  <PulseRing color="#4F46E5" delay={0.8} />
                </>
              )}
              <motion.button
                onClick={scrollToMenu}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="relative flex items-center gap-2.5 px-7 py-4 rounded-2xl text-white text-sm font-bold tracking-wide"
                style={{ background: "#4F46E5", fontFamily: '"Georgia", serif' }}
              >
                Pilih Latihan
                <span className="text-base">→</span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* RIGHT — decorative ─────────────────────────── */}
        <div className="hl-right shrink-0 hidden lg:flex flex-col gap-5 w-80">

          {/* Main quiz card */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="bg-white rounded-3xl border border-gray-100 shadow-xl p-6 relative overflow-hidden"
          >
            {/* Top indigo bar */}
            <div className="h-1 w-full bg-linear-to-r from-indigo-500 to-purple-500 rounded-full mb-5" />

            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-indigo-500 font-semibold">Soal 3 / 10</span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-600 font-semibold">MEDIUM</span>
            </div>

            <p className="text-sm text-gray-700 font-medium leading-relaxed mb-5">
              Tentukan suku ke-15 dari barisan: −15, −11, −7, −3, ...
            </p>

            <div className="grid grid-cols-2 gap-2 mb-5">
              {["U₁₅ = 39","U₁₅ = 41","U₁₅ = 43","U₁₅ = 45"].map((opt, i) => (
                <motion.div
                  key={opt}
                  whileHover={{ scale: 1.03 }}
                  className={`text-xs rounded-xl border px-3 py-2.5 font-mono font-semibold text-center cursor-pointer transition-colors
                    ${i === 1
                      ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                      : "bg-gray-50 border-gray-200 text-gray-500 hover:border-indigo-200"
                    }`}
                >
                  {opt}
                  {i === 1 && <span className="ml-1">✓</span>}
                </motion.div>
              ))}
            </div>

            {/* Progress */}
            <div>
              <div className="flex justify-between text-[10px] text-gray-400 mb-1.5">
                <span>Progress</span><span className="text-emerald-600 font-semibold">3/10 benar</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-linear-to-r from-indigo-400 to-indigo-600"
                  initial={{ width: "0%" }}
                  animate={{ width: "30%" }}
                  transition={{ duration: 1.2, delay: 1.5, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Glow bg */}
            <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(99,102,241,0.08), transparent 70%)" }} />
          </motion.div>

          {/* Mini answer card — correct */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex items-start gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-sm shrink-0">✓</div>
            <div>
              <p className="text-xs font-bold text-emerald-700 mb-0.5">Jawaban Tepat!</p>
              <p className="text-[11px] text-emerald-600 leading-relaxed">U₁₅ = −15 + (14)(4) = 41</p>
            </div>
          </motion.div>

          {/* Mini answer card — wrong with pembahasan */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 text-xs">✗</div>
              <p className="text-xs font-bold text-gray-700">Lihat Pembahasan</p>
            </div>
            <div className="text-[11px] text-gray-500 leading-relaxed font-mono">
              <p>det(A) = ad − bc</p>
              <p className="text-indigo-600 font-semibold">= 3(2) − 7(5) = −29</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}