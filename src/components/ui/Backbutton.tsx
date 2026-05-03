"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";

interface BackButtonProps {
    /** Override default back behavior with a specific href */
    href?: string;
    /** Label shown on hover (default: "Kembali") */
    label?: string;
    /** Visual variant — "light" for white bg pages, "dark" for dark/video bg pages */
    variant?: "light" | "dark";
}

export default function BackButton({
    href,
    label = "Kembali",
    variant = "light",
}: BackButtonProps) {
    const router = useRouter();
    const btnRef = useRef<HTMLButtonElement>(null);

    // Animate in on mount
    useEffect(() => {
        gsap.fromTo(
            btnRef.current,
            { x: -24, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.3 }
        );
    }, []);

    const handleClick = () => {
        if (href) {
            router.push(href);
        } else {
            router.back();
        }
    };

    const isLight = variant === "light";

    return (
        <motion.button
            ref={btnRef}
            onClick={handleClick}
            whileHover="hover"
            whileTap={{ scale: 0.94 }}
            className={`
        fixed top-6 left-6 z-50
        flex items-center gap-2
        px-4 py-2.5 rounded-2xl
        border backdrop-blur-md
        transition-colors duration-200
        cursor-pointer
        group
        ${isLight
                    ? "bg-white/80 border-gray-200 hover:bg-white hover:border-gray-300 shadow-sm hover:shadow-md"
                    : "bg-black/30 border-white/20 hover:bg-black/50 hover:border-white/40 shadow-lg"
                }
      `}
        >
            {/* Arrow icon */}
            <motion.div
                variants={{ hover: { x: -3 } }}
                transition={{ duration: 0.2 }}
                className={`flex items-center justify-center ${isLight ? "text-gray-700" : "text-white"}`}
            >
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10 12L6 8L10 4"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </motion.div>

            {/* Label */}
            <span
                className={`text-sm font-semibold tracking-wide ${isLight ? "text-gray-700" : "text-white"
                    }`}
                style={{ fontFamily: '"Georgia", serif' }}
            >
                {label}
            </span>

        </motion.button>
    );
}