"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { motion, AnimatePresence } from "framer-motion";

interface SplashScreenProps {
    onComplete: () => void;
}

function LetterSpan({ text, className = "", delayOffset = 0 }: { text: string; className?: string; delayOffset?: number }) {
    return (
        <span className={className} aria-label={text}>
            {text.split("").map((char, i) => (
                <motion.span
                    key={i}
                    className="inline-block"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.35,
                        delay: delayOffset + i * 0.045,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{ whiteSpace: "pre" }}
                >
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </span>
    );
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
    const [percent, setPercent] = useState(0);
    const [lottieData, setLottieData] = useState<object | null>(null);
    const [LottieComp, setLottieComp] = useState<React.ComponentType<{
        animationData: object;
        loop: boolean;
        autoplay: boolean;
        style?: React.CSSProperties;
    }> | null>(null);
    const [mounted, setMounted] = useState(false);
    const [textPhase, setTextPhase] = useState(0);

    const containerRef = useRef<HTMLDivElement>(null);
    const bgNumRef = useRef<HTMLDivElement>(null);
    const lottieWrapRef = useRef<HTMLDivElement>(null);
    const lineLeftRef = useRef<HTMLDivElement>(null);
    const lineRightRef = useRef<HTMLDivElement>(null);
    const dotRowRef = useRef<HTMLDivElement>(null);

    // Mount & load Lottie
    useEffect(() => {
        setMounted(true);
        import("lottie-react").then((mod) => setLottieComp(() => mod.default));
        fetch("/json/kalkulator.json")
            .then((r) => r.json())
            .then(setLottieData)
            .catch(console.error);
    }, []);

    // Text phase switch: fase 0 → fase 1 setelah 3.7 detik
    useEffect(() => {
        const t = setTimeout(() => setTextPhase(1), 3700);
        return () => clearTimeout(t);
    }, []);

    // GSAP entrance animations
    useEffect(() => {
        if (!mounted) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            tl.fromTo(
                [lineLeftRef.current, lineRightRef.current],
                { scaleY: 0, opacity: 0 },
                { scaleY: 1, opacity: 1, duration: 1.0, stagger: 0.1, ease: "power2.inOut" },
                0
            );

            tl.fromTo(
                bgNumRef.current,
                { x: 60, opacity: 0 },
                { x: 0, opacity: 1, duration: 1.2, ease: "power2.out" },
                0.1
            );

            const dots = dotRowRef.current?.querySelectorAll(".splash-dot");
            if (dots && dots.length) {
                tl.fromTo(
                    dots,
                    { scale: 0, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.4, stagger: 0.08, ease: "back.out(2)" },
                    0.3
                );
            }

            // Float animation untuk simbol matematika di background
            gsap.to(bgNumRef.current, {
                y: -28,
                duration: 5.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: 1.5,
            });
        }, containerRef);

        return () => ctx.revert();
    }, [mounted]);

    // Lottie entrance
    useEffect(() => {
        if (!lottieData || !LottieComp) return;
        gsap.fromTo(
            lottieWrapRef.current,
            { x: 50, scale: 0.82, opacity: 0 },
            { x: 0, scale: 1, opacity: 1, duration: 1.0, ease: "back.out(1.2)", delay: 0.4 }
        );
    }, [lottieData, LottieComp]);

    // Progress bar
    useEffect(() => {
        const interval = setInterval(() => {
            setPercent((p) => {
                if (p >= 100) { clearInterval(interval); return 100; }
                return p + 1;
            });
        }, 70);
        return () => clearInterval(interval);
    }, []);

    // Exit animation saat 100%
    useEffect(() => {
        if (percent < 100) return;
        const t = setTimeout(() => {
            gsap.to(containerRef.current, {
                opacity: 0,
                y: -14,
                duration: 0.75,
                ease: "power3.inOut",
                onComplete: onComplete,
            });
        }, 350);
        return () => clearTimeout(t);
    }, [percent, onComplete]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-50 bg-white overflow-hidden flex flex-col"
        >
            {/* Dot grid background */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.35]"
                style={{
                    backgroundImage: "radial-gradient(circle, #e0e7ff 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                }}
            />

            {/* Decorative blobs */}
            <div
                aria-hidden
                className="pointer-events-none absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-160 h-160 rounded-full bg-indigo-100/70 blur-3xl"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute bottom-12 right-24 w-60 h-60 rounded-full bg-emerald-100/50 blur-3xl"
            />

            {/* Math symbols floating in background */}
            <div
                ref={bgNumRef}
                aria-hidden
                className="pointer-events-none absolute right-[8%] top-[12%] opacity-0 select-none"
            >
                <span
                    className="text-[9rem] font-black text-indigo-50 leading-none"
                    style={{ fontFamily: "Georgia, serif" }}
                >
                    Σ
                </span>
            </div>

            {/* Floating math symbols scattered */}
            {[
                { sym: "∫", top: "20%", left: "5%", size: "3rem", opacity: 0.07, rotate: -15 },
                { sym: "∂", top: "65%", left: "8%", size: "2.5rem", opacity: 0.06, rotate: 10 },
                { sym: "lim", top: "15%", right: "5%", size: "1.4rem", opacity: 0.06, rotate: 5 },
                { sym: "∞", top: "75%", right: "6%", size: "2.8rem", opacity: 0.07, rotate: -8 },
                { sym: "dx", top: "45%", left: "3%", size: "1.6rem", opacity: 0.06, rotate: 0 },
            ].map((item, i) => (
                <motion.span
                    key={i}
                    aria-hidden
                    className="pointer-events-none absolute font-black text-indigo-300 select-none"
                    style={{
                        top: item.top,
                        left: (item as { left?: string }).left,
                        right: (item as { right?: string }).right,
                        fontSize: item.size,
                        opacity: item.opacity,
                        rotate: item.rotate,
                        fontFamily: "Georgia, serif",
                    }}
                    animate={{ y: [0, -12, 0] }}
                    transition={{
                        duration: 4 + i * 0.7,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.5,
                    }}
                >
                    {item.sym}
                </motion.span>
            ))}

            {/* Side lines */}
            <div
                ref={lineLeftRef}
                aria-hidden
                className="pointer-events-none absolute left-0 top-0 h-full w-px origin-top opacity-0"
                style={{ background: "linear-gradient(to bottom, transparent, #c7d2fe, transparent)" }}
            />
            <div
                ref={lineRightRef}
                aria-hidden
                className="pointer-events-none absolute right-0 top-0 h-full w-px origin-top opacity-0"
                style={{ background: "linear-gradient(to bottom, transparent, #c7d2fe, transparent)" }}
            />

            {/* Main content */}
            <div className="relative z-10 flex-1 flex items-center px-12 md:px-20 lg:px-28 gap-12 max-w-7xl mx-auto w-full">

                {/* Text side */}
                <div className="flex-1 max-w-xl min-h-56 flex flex-col justify-center">
                    <AnimatePresence mode="wait">

                        {/* Phase 0: "Selamat Datang di Sigma" */}
                        {textPhase === 0 && (
                            <motion.div
                                key="phase0"
                                exit={{ opacity: 0, x: -40 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className="flex flex-col gap-3"
                            >
                                <motion.span
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className="inline-flex items-center gap-2 text-sm font-bold tracking-[0.2em] uppercase text-indigo-500"
                                >
                                    <span className="w-6 h-px bg-indigo-400" />
                                    Selamat Datang di
                                </motion.span>

                                <div
                                    className="flex items-baseline overflow-hidden flex-wrap"
                                    style={{ perspective: "700px" }}
                                >
                                    {/* "Sig" */}
                                    <LetterSpan
                                        text="Sig"
                                        className="font-black leading-none tracking-tighter text-gray-900 text-7xl"
                                    />

                                    {/* "ma" */}
                                    <LetterSpan
                                        text="ma"
                                        className="font-black leading-none tracking-tighter text-indigo-500 italic text-7xl"
                                        delayOffset={0.18}
                                    />
                                </div>

                                {/* Sub-tagline */}
                                <motion.p
                                    className="text-sm font-medium text-gray-400 tracking-wide"
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.9, duration: 0.5 }}
                                >
                                    Platform Belajar Kalkulus Interaktif
                                </motion.p>
                            </motion.div>
                        )}

                        {/* Phase 1: "Dengan Sigma belajar kalkulus menjadi mudah dan menyenangkan" */}
                        {textPhase === 1 && (
                            <motion.div
                                key="phase1"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="flex flex-col gap-4"
                            >
                                <p
                                    className="font-black leading-tight text-gray-900 text-3xl md:text-5xl"
                                    style={{ fontFamily: "Georgia, serif" }}
                                >
                                    <LetterSpan text="Dengan Sigma," />
                                </p>

                                <p
                                    className="font-black leading-tight text-indigo-400 italic text-2xl md:text-4xl"
                                    style={{ fontFamily: "Georgia, serif" }}
                                >
                                    {"belajar kalkulus menjadi ".split("").map((char, i) => (
                                        <motion.span
                                            key={i}
                                            className="inline-block"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{
                                                duration: 0.35,
                                                delay: 0.6 + i * 0.04,
                                                ease: [0.22, 1, 0.36, 1],
                                            }}
                                            style={{ whiteSpace: "pre" }}
                                        >
                                            {char === " " ? "\u00A0" : char}
                                        </motion.span>
                                    ))}
                                </p>

                                <p
                                    className="font-black leading-tight text-indigo-400 italic text-2xl md:text-4xl"
                                    style={{ fontFamily: "Georgia, serif" }}
                                >
                                    {"mudah & menyenangkan".split("").map((char, i) => (
                                        <motion.span
                                            key={i}
                                            className="inline-block"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{
                                                duration: 0.35,
                                                delay: 0.6 + i * 0.04,
                                                ease: [0.22, 1, 0.36, 1],
                                            }}
                                            style={{ whiteSpace: "pre" }}
                                        >
                                            {char === " " ? "\u00A0" : char}
                                        </motion.span>
                                    ))}
                                </p>

                                {/* Divider line */}
                                <motion.div
                                    className="h-px origin-left"
                                    style={{
                                        width: "88%",
                                        background: "linear-gradient(to right, #6366f1, rgba(99,102,241,0.35), transparent)",
                                    }}
                                    initial={{ scaleX: 0, opacity: 0 }}
                                    animate={{ scaleX: 1, opacity: 1 }}
                                    transition={{ duration: 0.9, delay: 2.2, ease: "easeOut" }}
                                />

                                <motion.p
                                    className="text-xs font-semibold tracking-widest text-gray-400 uppercase"
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 2.5 }}
                                >
                                    Sigma · Belajar Kalkulus
                                </motion.p>
                            </motion.div>
                        )}

                    </AnimatePresence>
                </div>

                {/* Lottie animation side */}
                <div ref={lottieWrapRef} className="relative shrink-0 opacity-0 hidden md:block">

                    {lottieData && LottieComp ? (
                        <LottieComp
                            animationData={lottieData}
                            loop
                            autoplay
                            style={{ width: 320, height: 320 }}
                        />
                    ) : (
                        /* Fallback: Sigma symbol jika Lottie belum load */
                        <div className="w-[320px] h-80 flex items-center justify-center">
                            <motion.span
                                className="text-[10rem] font-black text-indigo-100 select-none"
                                style={{ fontFamily: "Georgia, serif" }}
                                animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            >
                                Σ
                            </motion.span>
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom: progress */}
            <div className="relative z-10 px-12 md:px-20 lg:px-28 pb-8 pt-3 flex flex-col items-center gap-3">
                {/* Progress bar */}
                <div className="w-full max-w-md">
                    <div className="h-0.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-linear-to-r from-indigo-500 to-emerald-400 rounded-full"
                            style={{ width: `${percent}%` }}
                            transition={{ ease: "easeOut" }}
                        />
                    </div>
                </div>

                {/* Percent display */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="text-center"
                >
                    <p
                        className="font-black text-gray-900 leading-none tabular-nums"
                        style={{
                            fontFamily: "Georgia, serif",
                            fontSize: "clamp(2.5rem, 5vw, 4rem)",
                        }}
                    >
                        {percent}
                        <span className="text-indigo-400 text-2xl md:text-3xl ml-1">%</span>
                    </p>
                </motion.div>

                {/* Dot row decorative */}
                <div ref={dotRowRef} className="flex gap-1.5 mt-1">
                    {Array.from({ length: 7 }).map((_, i) => (
                        <span
                            key={i}
                            className="splash-dot block w-1 h-1 rounded-full"
                            style={{
                                backgroundColor: i < Math.ceil((percent / 100) * 7) ? "#6366f1" : "#e0e7ff",
                                transition: "background-color 0.3s ease",
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}