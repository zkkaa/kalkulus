"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import TextHeading from "@/components/ui/TextHeading";
import AnimatedButton from "../ui/AnimatedButton";
import { featuresData } from "@/data/landing";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

// ─── Materi Data ───────────────────────────────────────────────────────────────
const MATERI_DATA = [
  {
    id: 1,
    slug: "barisan-deret",
    title: "Barisan & Deret",
    subtitle: "Kalkulus Lanjut · Pertemuan 4",
    desc: "Pelajari pola barisan aritmetika dan geometri, rumus suku ke-n, jumlah deret hingga tak hingga, serta uji konvergensinya secara mendalam.",
    icon: "∑",
    tags: ["Barisan Aritmetika", "Barisan Geometri", "Deret", "Konvergensi"],
    color: {
      primary: "#4F46E5",
      hover: "#4338CA",
      light: "#EEF2FF",
      border: "#C7D2FE",
      glow: "rgba(99,102,241,0.12)",
      badge: "bg-indigo-50 text-indigo-600 border-indigo-100",
    },
    soalPreview: [
      { q: "Suku ke-15 dari barisan −15, −11, −7, −3, ...?", a: "U₁₅ = 41" },
      { q: "Jumlah deret geometri 3 + 6 + 12 + ... + 96?", a: "S₆ = 189" },
      { q: "S∞ dari barisan 1, ½, ¼, ⅛, ...?", a: "S∞ = 2" },
    ],
    subTopics: ["Barisan Aritmetika", "Barisan Geometri", "Deret Aritmetika", "Deret Geometri", "Deret Tak Hingga", "Konvergensi"],
  },
  {
    id: 2,
    slug: "determinan",
    title: "Determinan",
    subtitle: "Kalkulus Lanjut · Pertemuan 7",
    desc: "Kuasai perhitungan determinan matriks 2×2 dan 3×3 dengan berbagai metode, serta terapannya dalam penyelesaian sistem persamaan linear.",
    icon: "|A|",
    tags: ["Determinan 2×2", "Metode Sarrus", "Kofaktor", "Aturan Cramer"],
    color: {
      primary: "#7C3AED",
      hover: "#6D28D9",
      light: "#F5F3FF",
      border: "#DDD6FE",
      glow: "rgba(124,58,237,0.12)",
      badge: "bg-violet-50 text-violet-600 border-violet-100",
    },
    soalPreview: [
      { q: "Hitung det(A) dari matriks [3 7 / 5 2]", a: "det = −29" },
      { q: "Determinan 3×3 metode Sarrus: B = [−2 4 −5 / ...]", a: "det = 45" },
      { q: "Pecahkan SPL: 5x + 2y + 19 = 0, 3x + 4y + 17 = 0", a: "x=−3, y=−2" },
    ],
    subTopics: ["Determinan 2×2", "Determinan 3×3", "Metode Sarrus", "Ekspansi Kofaktor", "Aturan Cramer"],
  },
];

// ─── ImageCard ─────────────────────────────────────────────────────────────────
function ImageCard({
  imageSrc,
  label,
  position,
}: {
  imageSrc: string;
  label: string;
  position: "top-left" | "mid-left" | "bottom-left";
}) {
  const posMap = {
    "top-left": "translate-x-0 translate-y-0 z-30",
    "mid-left": "-translate-x-6 translate-y-16 z-20",
    "bottom-left": "-translate-x-12 translate-y-32 z-10",
  };

  const sizeMap = {
    "top-left": "w-130 h-80",
    "mid-left": "w-120 h-72",
    "bottom-left": "w-110 h-64",
  };

  return (
    <div
      className={`absolute left-0 top-0 ${posMap[position]} ${sizeMap[position]} rounded-2xl overflow-hidden shadow-xl`}
      style={{ transition: "all 0.7s cubic-bezier(0.4, 0, 0.2, 1)" }}
    >
      <Image src={imageSrc} alt={label} fill className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/10" />
    </div>
  );
}

// ─── FeatureCarousel ───────────────────────────────────────────────────────────
function FeatureCarousel() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const [cardOrder, setCardOrder] = useState([0, 1, 2]);
  const cardRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];
  const positions: Array<"top-left" | "mid-left" | "bottom-left"> = [
    "top-left",
    "mid-left",
    "bottom-left",
  ];

  const goNext = useCallback(() => {
    if (animating) return;
    setAnimating(true);
    const tl = gsap.timeline({
      onComplete: () => {
        setActive((prev) => (prev + 1) % featuresData.length);
        setCardOrder((prev) => [prev[1], prev[2], prev[0]]);
        setAnimating(false);
      },
    });
    tl.to([titleRef.current, descRef.current, ctaRef.current], {
      x: -40,
      opacity: 0,
      duration: 0.35,
      stagger: 0.06,
      ease: "power2.in",
    });
  }, [animating]);

  useEffect(() => {
    gsap.fromTo(
      [titleRef.current, descRef.current, ctaRef.current],
      { x: 40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power3.out" }
    );
  }, [active]);

  const feat = featuresData[active];

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-20 md:gap-72 py-16 md:py-24 px-6 md:px-16 lg:px-24">
      <div className="relative w-64 h-64 md:w-80 md:h-80 shrink-0 ml-8 md:ml-16">
        {cardOrder.map((featureIdx, posIdx) => (
          <div key={featureIdx} ref={cardRefs[posIdx]}>
            <ImageCard
              imageSrc={featuresData[featureIdx].Image}
              label={featuresData[featureIdx].label}
              position={positions[posIdx]}
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-5 max-w-md">
        <button onClick={goNext} className="flex items-center gap-2 group w-fit" aria-label="Fitur selanjutnya">
          <h2 ref={titleRef} className="text-2xl md:text-4xl font-bold text-gray-900">
            {feat.title}
          </h2>
          <span className="text-2xl md:text-3xl text-gray-400 group-hover:translate-x-1 transition-transform duration-200 cursor-pointer">
            ›
          </span>
        </button>
        <p ref={descRef} className="text-gray-500 text-sm md:text-base leading-relaxed">
          {feat.description}
        </p>
        <a
          ref={ctaRef}
          href={feat.href}
          className="text-sm text-gray-400 hover:text-gray-700 transition-colors duration-200 underline underline-offset-4"
        >
          {feat.cta} →
        </a>
        <div className="flex gap-2 mt-2">
          {featuresData.map((_, i) => (
            <button
              key={i}
              onClick={() => { if (i === active || animating) return; setActive(i); }}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                i === active ? "w-6 bg-gray-800" : "w-2 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Soal Preview Carousel ────────────────────────────────────────────────────
function SoalPreview({
  previews,
  color,
}: {
  previews: { q: string; a: string }[];
  color: { primary: string; light: string; border: string };
}) {
  const [active, setActive] = useState(0);

  return (
    <div
      className="rounded-2xl p-4 border overflow-hidden"
      style={{ background: color.light, borderColor: color.border }}
    >
      <p
        className="text-[10px] font-mono font-bold uppercase tracking-widest mb-3"
        style={{ color: color.primary }}
      >
        Preview Materi
      </p>

      <div className="min-h-15">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <p className="text-sm text-gray-700 leading-relaxed mb-2 font-medium">
              {previews[active].q}
            </p>
            <p className="text-xs font-mono font-bold" style={{ color: color.primary }}>
              → {previews[active].a}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex gap-1.5 mt-3">
        {previews.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === active ? 20 : 6,
              height: 6,
              background: i === active ? color.primary : color.border,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── MateriCard (styled like LatihanCard) ─────────────────────────────────────
function MateriCard({ item, index }: { item: (typeof MATERI_DATA)[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 150, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 150, damping: 25 });
  const [hovered, setHovered] = useState(false);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        ref={cardRef}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={onMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={onMouseLeave}
        animate={{
          boxShadow: hovered
            ? `0 30px 60px ${item.color.glow}, 0 8px 20px rgba(0,0,0,0.06)`
            : "0 2px 12px rgba(0,0,0,0.06)",
        }}
        transition={{ duration: 0.3 }}
        className="relative rounded-3xl bg-white border border-gray-100 overflow-hidden h-full"
      >
        {/* Animated top bar */}
        <motion.div
          className="h-1.5 w-full"
          animate={{
            background: hovered
              ? `linear-gradient(90deg, ${item.color.primary}, ${item.color.primary}70)`
              : "#F3F4F6",
          }}
          transition={{ duration: 0.4 }}
        />

        <div className="p-6">
          {/* Header */}
          <div className="flex items-start gap-4 mb-5">
            <motion.div
              animate={{ rotate: hovered ? -8 : 0, scale: hovered ? 1.08 : 1 }}
              transition={{ duration: 0.3 }}
              className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl border-2 shrink-0"
              style={{
                background: item.color.light,
                borderColor: item.color.border,
                color: item.color.primary,
                fontFamily: '"Georgia", serif',
              }}
            >
              {item.icon}
            </motion.div>
            <div>
              <p className="text-[10px] font-mono text-gray-400 mb-0.5">{item.subtitle}</p>
              <h3
                className="text-xl font-black text-gray-900"
                style={{ fontFamily: '"Georgia", serif' }}
              >
                {item.title}
              </h3>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-500 text-sm leading-relaxed mb-5">{item.desc}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className={`text-xs px-2.5 py-1 rounded-full border font-medium ${item.color.badge}`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Soal Preview */}
          <div className="mb-5">
            <SoalPreview previews={item.soalPreview} color={item.color} />
          </div>
        </div>

        {/* Hover radial glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-3xl"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.35 }}
          style={{
            background: `radial-gradient(circle at 30% 20%, ${item.color.glow}, transparent 65%)`,
          }}
        />
      </motion.div>
    </motion.div>
  );
}

// ─── MateriCards Section ───────────────────────────────────────────────────────
function MateriCards() {
  return (
    <div className="px-6 md:px-16 lg:px-24 pb-20">
      <div className="flex justify-end mb-10">
        <TextHeading
          subtitle="Materi apa saja yang"
          title="bisa dipelajari?"
          titleItalic
          align="right"
          subtitleSize="sm"
          animateOnScroll
        />
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {MATERI_DATA.map((card, i) => (
          <MateriCard key={card.id} item={card} index={i} />
        ))}
      </div>

      {/* CTA */}
      <div className="flex justify-center mt-10">
        <AnimatedButton href="/materi" variant="sigma" size="sm">
          Lihat semua materi
        </AnimatedButton>
      </div>
    </div>
  );
}

// ─── Main Export ───────────────────────────────────────────────────────────────
export default function ContentSections() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        wrapperRef.current,
        { y: 60 },
        {
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} id="ContentSection" className="relative z-10 mx-10 bg-indigo-50 rounded-4xl">
      {/* ── Bagian 2: Pengenalan Fitur ──────────────────────────────────── */}
      <div>
        <div className="px-6 md:px-16 lg:px-24 pt-16 md:pt-20">
          <TextHeading
            subtitle="Semua yang kamu butuhkan"
            title="dalam satu tempat"
            titleItalic
            subtitleSize="sm"
            animateOnScroll
          />
        </div>
        <FeatureCarousel />
      </div>

      {/* ── Bagian 3: Materi ────────────────────────────────────────────── */}
      <div className="pt-16">
        <MateriCards />
      </div>
    </div>
  );
}