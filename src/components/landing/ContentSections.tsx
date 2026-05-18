"use client";

import { MateriCard, MATERI_DATA } from "@/components/ui/MateriCard";

// ... (semua import lain tetap sama) ...
import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextHeading from "@/components/ui/TextHeading";
import AnimatedButton from "../ui/AnimatedButton";
import { featuresData } from "@/data/landing";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

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

      {/* Cards grid — withLink=false karena ini landing page, tidak navigasi langsung */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {MATERI_DATA.map((card, i) => (
          <MateriCard key={card.id} item={card} index={i} withLink={false} />
        ))}
      </div>

      {/* CTA */}
      <div className="flex justify-center mt-10">
        <AnimatedButton href="/materi" variant="sigma" size="sm">
          Lihat lebih lanjut
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