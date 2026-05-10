"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const POINTS = [
  {
    icon: "🧠",
    title: "Pahami, bukan hafal",
    desc: "Setiap soal dirancang untuk menguji pemahaman konsep, bukan sekadar menghafal rumus.",
    color: "#4F46E5",
    bg: "#EEF2FF",
    border: "#C7D2FE",
    num: "01",
  },
  {
    icon: "📖",
    title: "Pembahasan langkah-demi-langkah",
    desc: "Jawaban salah? Tidak masalah. Langsung muncul penyelesaian lengkap dengan setiap tahapannya.",
    color: "#7C3AED",
    bg: "#F5F3FF",
    border: "#DDD6FE",
    num: "02",
  },
  {
    icon: "⚡",
    title: "Instan & real-time",
    desc: "Feedback langsung di tiap soal. Hijau = benar, merah = salah. Tanpa menunggu.",
    color: "#059669",
    bg: "#ECFDF5",
    border: "#A7F3D0",
    num: "03",
  },
];

export default function WhyLatihan() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".wl-heading", {
        y: 40, opacity: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reverse" },
      });
      gsap.from(".wl-card", {
        y: 50, opacity: 0, duration: 0.7, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: ".wl-grid", start: "top 82%", toggleActions: "play none none reverse" },
      });
      gsap.from(".wl-bottom", {
        y: 30, opacity: 0, duration: 0.6, ease: "power2.out",
        scrollTrigger: { trigger: ".wl-bottom", start: "top 88%", toggleActions: "play none none reverse" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-white px-28 py-24 overflow-hidden">
      {/* Subtle pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: "radial-gradient(#4F46E5 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }} />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Heading */}
        <div className="wl-heading text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            <span className="text-xs font-semibold text-indigo-600 tracking-widest uppercase">Kenapa Latihan di Sigma?</span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-black text-gray-900 max-w-2xl mx-auto leading-tight"
            style={{ fontFamily: '"Georgia", serif' }}
          >
            Bukan sekadar{" "}
            <span className="text-indigo-500 italic">kuis biasa</span>
          </h2>
        </div>

        {/* 3 cards */}
        <div className="wl-grid grid md:grid-cols-3 gap-6 mb-16">
          {POINTS.map((p, i) => (
            <motion.div
              key={p.num}
              className="wl-card group relative rounded-3xl p-7 border overflow-hidden cursor-default"
              style={{ background: p.bg, borderColor: p.border }}
              whileHover={{ y: -6, boxShadow: `0 20px 40px ${p.color}18` }}
              transition={{ duration: 0.3 }}
            >
              {/* Number watermark */}
              <div
                className="absolute -top-4 -right-2 text-8xl font-black opacity-[0.06] select-none pointer-events-none"
                style={{ color: p.color, fontFamily: '"Georgia", serif' }}
              >
                {p.num}
              </div>

              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 border"
                style={{ background: "white", borderColor: p.border }}
              >
                {p.icon}
              </div>

              {/* Label */}
              <span
                className="text-[10px] font-mono font-bold uppercase tracking-widest mb-3 block"
                style={{ color: p.color }}
              >
                {p.num}
              </span>

              <h3
                className="text-xl font-black text-gray-900 mb-3 leading-snug"
                style={{ fontFamily: '"Georgia", serif' }}
              >
                {p.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>

              {/* Bottom accent line */}
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 w-0 rounded-full"
                style={{ background: p.color }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom strip — flow visual */}
        <div className="wl-bottom relative">
          <div className="bg-gray-50 border border-gray-100 rounded-3xl px-8 py-6 overflow-hidden">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6 text-center">
              Alur Latihan
            </p>
            <div className="flex items-center justify-between relative">
              {/* Connecting line */}
              <div className="absolute top-5 left-[10%] right-[10%] h-px bg-gray-200 z-0" />

              {[
                { icon: "🎯", label: "Pilih Topik",    sub: "2 tersedia" },
                { icon: "❓", label: "Jawab Soal",     sub: "10 soal" },
                { icon: "⚡", label: "Cek Jawaban",    sub: "Real-time" },
                { icon: "📖", label: "Baca Pembahasan", sub: "Jika salah" },
                { icon: "🏁", label: "Selesai!",        sub: "Coba lagi?" },
              ].map((step, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center gap-2 flex-1">
                  <motion.div
                    className="w-10 h-10 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-lg shadow-sm"
                    whileInView={{ scale: [0.8, 1.1, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                  >
                    {step.icon}
                  </motion.div>
                  <p className="text-xs font-bold text-gray-700 text-center">{step.label}</p>
                  <p className="text-[10px] text-gray-400 text-center">{step.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}