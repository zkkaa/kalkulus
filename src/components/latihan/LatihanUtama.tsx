"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const options = [
  { id: "A", text: "x³ + C" },
  { id: "B", text: "3x³ + C" },
  { id: "C", text: "6x + C" },
  { id: "D", text: "x² + C" },
];

export default function QuizQuestionSection() {
  const [hideQuestion, setHideQuestion] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHideQuestion(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen bg-[#f7fafc] px-6 py-8 pb-20 md:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">
        {/* Back Button */}
        <Link
          href="/latihan"
          className="mb-10 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 text-xl font-bold text-gray-600 transition hover:scale-105"
        >
          ←
        </Link>

        {/* Progress Bar */}
        <div className="mb-10 h-2 w-full rounded-full bg-gray-200">
          <div className="h-2 w-[10%] rounded-full bg-cyan-500" />
        </div>

        {/* Question Card */}
        <div className="rounded-3xl border border-cyan-100 bg-white p-8 shadow-sm md:p-12">
          <div className="mb-6 flex justify-center flex-col items-center gap-4">
            <span className="rounded-full bg-cyan-50 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-cyan-500">
              Calculus: Basic Integrals
            </span>
            <span className="font-bold text-black text-5xl">
                Tentukan hasil dari ∫ 3x² dx
            </span >
            <span className="font-semibold text-gray-600 text-lg">
                Integrate the function with respect to x.
            </span>
          </div>

          <div
            className={`overflow-hidden transition-all duration-500 ${
              hideQuestion ? "opacity-0 max-h-0" : "opacity-100 max-h-[300px]"
            }`}
          >
            <h1 className="text-center text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
              Tentukan hasil dari
              <span className="ml-2 text-cyan-500">∫ 3x² dx</span>
            </h1>

            <p className="mt-5 text-center text-base text-gray-500 md:text-lg">
              Integrate the function with respect to x.
            </p>
          </div>
        </div>

        {/* Answer Options */}
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {options.map((item) => (
            <button
              key={item.id}
              className="flex items-center gap-5 rounded-2xl border border-gray-100 bg-white p-6 text-left shadow-sm transition hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 font-bold text-gray-600">
                {item.id}
              </div>
              <span className="text-xl font-semibold text-gray-800">
                {item.text}
              </span>
            </button>
          ))}
        </div>

        {/* Bottom Action Bar */}
        <div className="mt-12 rounded-2xl">
          <div className="flex items-center justify-end">
           
            <div className="flex gap-4">
              <button className="rounded-xl border border-gray-300 px-8 py-3 font-medium text-gray-600 transition hover:bg-gray-50">
                Lewati
              </button>

              <button className="rounded-xl bg-cyan-500 px-8 py-3 font-semibold text-white shadow-md transition hover:scale-[1.02]">
                Konfirmasi
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}