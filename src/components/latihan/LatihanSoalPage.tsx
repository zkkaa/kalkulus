"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { supabase } from "@/lib/supabase";
import BackButton from "@/components/ui/Backbutton";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Step { step: string; detail: string; }

interface Question {
  id: number;
  question: string;
  answer: string;
  options: string[];
  category: string;
  explanation_intro: string;
  explanation_method: string;
  explanation_analysis: string;
  explanation_steps: Step[];
}

type AnswerState = "idle" | "correct" | "wrong";
type ModalType = "correct" | "wrong" | "pembahasan" | "result" | null;

// ─── Helpers ──────────────────────────────────────────────────────────────────
function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

const CATEGORY_LABEL: Record<string, string> = {
  "barisan-deret": "Barisan & Deret",
  determinan: "Determinan",
};

const CATEGORY_COLOR: Record<string, { primary: string; light: string; border: string }> = {
  "barisan-deret": { primary: "#4F46E5", light: "#EEF2FF", border: "#C7D2FE" },
  determinan: { primary: "#7C3AED", light: "#F5F3FF", border: "#DDD6FE" },
};

// ─── Option button ────────────────────────────────────────────────────────────
function OptionButton({
  label, text, selected, state, onClick, correctAnswer, disabled, accentColor,
}: {
  label: string; text: string; selected: boolean;
  state: AnswerState; onClick: () => void;
  correctAnswer: string; disabled: boolean;
  accentColor: string;
}) {
  const isCorrect = text === correctAnswer;

  // Kelas non-idle — idle ditangani via inline style
  let bg = "bg-white border-gray-200 text-gray-700";
  if (selected && state === "correct") bg = "bg-emerald-50 border-emerald-400 text-emerald-800";
  else if (selected && state === "wrong") bg = "bg-rose-50 border-rose-400 text-rose-800";
  else if (!selected && state === "wrong" && isCorrect) bg = "bg-emerald-50 border-emerald-300 text-emerald-700";
  else if (state !== "idle") bg = "bg-gray-50 border-gray-200 text-gray-400";

  // Inline style untuk idle — agar warna aksen dinamis (indigo / violet)
  const idleSelectedStyle = selected && state === "idle"
    ? { backgroundColor: accentColor + "12", borderColor: accentColor, color: accentColor }
    : {};

  return (
    <motion.button
      onClick={disabled ? undefined : onClick}
      whileHover={disabled ? {} : { scale: 1.015 }}
      whileTap={disabled ? {} : { scale: 0.985 }}
      className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl border-2 text-left transition-all duration-200 ${bg} ${disabled ? "cursor-default" : "cursor-pointer"}`}
      style={idleSelectedStyle}
    >
      <span
        className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shrink-0
          ${selected && state === "correct" ? "bg-emerald-500 text-white"
            : selected && state === "wrong" ? "bg-rose-500 text-white"
              : !selected && state === "wrong" && isCorrect ? "bg-emerald-400 text-white"
                : "bg-gray-100 text-gray-500"}`}
        style={selected && state === "idle" ? { background: accentColor, color: "#fff" } : {}}
      >
        {selected && state === "correct" ? "✓"
          : selected && state === "wrong" ? "✗"
            : !selected && state === "wrong" && isCorrect ? "✓"
              : label}
      </span>
      <span className="text-sm font-medium leading-relaxed">{text}</span>
    </motion.button>
  );
}

// ─── Modal: Correct ───────────────────────────────────────────────────────────
function ModalCorrect({ onNext }: { onNext: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 10 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-gray-100 text-center"
    >
      <motion.div
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ delay: 0.15, type: "spring", stiffness: 300, damping: 20 }}
        className="w-20 h-20 rounded-full bg-emerald-50 border-4 border-emerald-200 flex items-center justify-center text-4xl mx-auto mb-5"
      >
        ✓
      </motion.div>
      <h3 className="text-2xl font-black text-gray-900 mb-2" style={{ fontFamily: '"Georgia", serif' }}>
        Jawaban Tepat!
      </h3>
      <p className="text-gray-500 text-sm mb-7">
        Keren! Kamu berhasil menjawab soal ini dengan benar.
      </p>
      <motion.button
        onClick={onNext}
        whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
        className="w-full py-3.5 rounded-2xl bg-emerald-500 text-white font-bold text-sm"
      >
        Lanjut ke Soal Berikutnya →
      </motion.button>
    </motion.div>
  );
}

// ─── Modal: Wrong ─────────────────────────────────────────────────────────────
function ModalWrong({ onNext, onPembahasan }: { onNext: () => void; onPembahasan: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 10 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-gray-100 text-center"
    >
      <motion.div
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ delay: 0.15, type: "spring", stiffness: 300, damping: 20 }}
        className="w-20 h-20 rounded-full bg-rose-50 border-4 border-rose-200 flex items-center justify-center text-4xl mx-auto mb-5"
      >
        ✗
      </motion.div>
      <h3 className="text-2xl font-black text-gray-900 mb-2" style={{ fontFamily: '"Georgia", serif' }}>
        Sayang Sekali...
      </h3>
      <p className="text-gray-500 text-sm mb-7">
        Jawaban kurang tepat. Mau lihat pembahasan supaya lebih paham?
      </p>
      <div className="flex flex-col gap-3">
        <motion.button
          onClick={onPembahasan}
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
          className="w-full py-3.5 rounded-2xl bg-indigo-500 text-white font-bold text-sm"
        >
          📖 Lihat Pembahasan
        </motion.button>
        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
          className="w-full py-3 rounded-2xl bg-gray-100 text-gray-600 font-semibold text-sm"
        >
          Lanjut Saja →
        </motion.button>
      </div>
    </motion.div>
  );
}

// ─── Modal: Pembahasan ────────────────────────────────────────────────────────
function ModalPembahasan({
  question, onNext, color,
}: { question: Question; onNext: () => void; color: { primary: string; light: string; border: string } }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-gray-100 overflow-hidden max-h-[90vh] flex flex-col"
    >
      {/* Header */}
      <div className="px-8 py-5 border-b border-gray-100 flex items-center justify-between shrink-0"
        style={{ background: color.light }}>
        <div>
          <p className="text-xs font-mono font-bold uppercase tracking-widest mb-0.5"
            style={{ color: color.primary }}>Pembahasan Soal</p>
          <p className="text-xs text-gray-500">{CATEGORY_LABEL[question.category]}</p>
        </div>
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
          style={{ background: color.primary + "20", color: color.primary }}>
          📖
        </div>
      </div>

      {/* Scrollable body */}
      <div ref={scrollRef} className="overflow-y-auto flex-1 px-8 py-6 flex flex-col gap-6">

        {/* Soal */}
        <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
          <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400 mb-2">Pertanyaan</p>
          <p className="text-gray-800 font-medium leading-relaxed">{question.question}</p>
          <div className="mt-3 flex items-center gap-2">
            <span className="text-[10px] font-mono text-gray-400">Jawaban benar:</span>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-lg"
              style={{ background: color.light, color: color.primary }}>{question.answer}</span>
          </div>
        </div>

        {/* Intro */}
        <div>
          <h4 className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full text-white text-[10px] font-bold flex items-center justify-center"
              style={{ background: color.primary }}>1</span>
            Penjelasan Awal
          </h4>
          <p className="text-sm text-gray-600 leading-relaxed pl-7">{question.explanation_intro}</p>
        </div>

        {/* Method */}
        <div>
          <h4 className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full text-white text-[10px] font-bold flex items-center justify-center"
              style={{ background: color.primary }}>2</span>
            Metode yang Digunakan
          </h4>
          <div className="pl-7 p-4 rounded-2xl border" style={{ background: color.light, borderColor: color.border }}>
            <p className="text-sm font-medium leading-relaxed" style={{ color: color.primary }}>
              {question.explanation_method}
            </p>
          </div>
        </div>

        {/* Analysis */}
        <div>
          <h4 className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full text-white text-[10px] font-bold flex items-center justify-center"
              style={{ background: color.primary }}>3</span>
            Analisis Soal
          </h4>
          <p className="text-sm text-gray-600 leading-relaxed pl-7">{question.explanation_analysis}</p>
        </div>

        {/* Steps */}
        <div>
          <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full text-white text-[10px] font-bold flex items-center justify-center"
              style={{ background: color.primary }}>4</span>
            Langkah Penyelesaian
          </h4>
          <div className="pl-7 flex flex-col gap-3">
            {question.explanation_steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.07 }}
                className="flex gap-3"
              >
                <div className="w-6 h-6 rounded-full shrink-0 mt-0.5 flex items-center justify-center text-[10px] font-bold"
                  style={{ background: color.light, color: color.primary, border: `1px solid ${color.border}` }}>
                  {i + 1}
                </div>
                <div className="flex-1 bg-white rounded-xl p-3.5 border border-gray-100">
                  <p className="text-xs font-bold text-gray-500 mb-1">{s.step}</p>
                  <p className="text-sm font-mono text-gray-800 leading-relaxed">{s.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-8 py-5 border-t border-gray-100 shrink-0">
        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
          className="w-full py-3.5 rounded-2xl text-white font-bold text-sm"
          style={{ background: color.primary }}
        >
          Lanjut ke Soal Berikutnya →
        </motion.button>
      </div>
    </motion.div>
  );
}

// ─── Modal: Result ────────────────────────────────────────────────────────────
function ModalResult({
  correct, wrong, total, timeSeconds, category, onRetry, onBack,
}: {
  correct: number; wrong: number; total: number;
  timeSeconds: number; category: string;
  onRetry: () => void; onBack: () => void;
}) {
  const pct = Math.round((correct / total) * 100);
  const color = pct >= 70 ? "#10B981" : pct >= 40 ? "#F59E0B" : "#EF4444";
  const msg = pct === 100 ? "Sempurna! 🎉" : pct >= 70 ? "Bagus sekali! 🌟" : pct >= 40 ? "Lumayan! 💪" : "Ayo coba lagi! 🔄";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-gray-100 overflow-hidden"
    >
      {/* Header */}
      <div className="px-8 pt-8 pb-6 text-center" style={{ background: color + "10" }}>
        <motion.div
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 250, damping: 18 }}
          className="text-6xl mb-4"
        >
          {pct === 100 ? "🏆" : pct >= 70 ? "🌟" : pct >= 40 ? "💪" : "📚"}
        </motion.div>
        <h3 className="text-3xl font-black text-gray-900 mb-1" style={{ fontFamily: '"Georgia", serif' }}>
          {msg}
        </h3>
        <p className="text-sm text-gray-400">{CATEGORY_LABEL[category]}</p>
      </div>

      <div className="px-8 py-6 flex flex-col gap-5">
        {/* Score ring */}
        <div className="flex justify-center">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="50" fill="none" stroke="#F3F4F6" strokeWidth="10" />
              <motion.circle
                cx="60" cy="60" r="50" fill="none"
                stroke={color} strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 50}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 50 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 50 * (1 - pct / 100) }}
                transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-3xl font-black" style={{ color }}>{pct}%</span>
              <span className="text-[10px] text-gray-400">Skor</span>
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Benar", value: correct, color: "#10B981", bg: "#ECFDF5" },
            { label: "Salah", value: wrong, color: "#EF4444", bg: "#FFF1F2" },
            { label: "Waktu", value: formatTime(timeSeconds), color: "#6B7280", bg: "#F9FAFB" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl p-3 text-center border"
              style={{ background: s.bg, borderColor: s.color + "30" }}>
              <p className="text-xl font-black" style={{ color: s.color, fontFamily: '"Georgia", serif' }}>
                {s.value}
              </p>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Motivational message */}
        <div className="text-center text-sm text-gray-500 bg-gray-50 rounded-2xl px-4 py-3 border border-gray-100">
          {pct < 100 ? `Masih ada ${wrong} soal yang bisa kamu pelajari lagi. Lihat pembahasan tiap soal!` : "Luar biasa! Semua soal berhasil dijawab dengan benar!"}
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <motion.button
            onClick={onRetry}
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            className="w-full py-3.5 rounded-2xl bg-indigo-500 text-white font-bold text-sm"
          >
            🔄 Ulangi Latihan
          </motion.button>
          <motion.button
            onClick={onBack}
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            className="w-full py-3 rounded-2xl bg-gray-100 text-gray-600 font-semibold text-sm"
          >
            ← Kembali ke Menu Latihan
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function LatihanSoalPage() {
  const params = useParams();
  const router = useRouter();
  const category = (params?.slug as string) ?? "";
  const color = CATEGORY_COLOR[category] ?? CATEGORY_COLOR["barisan-deret"];

  const [questions, setQuestions] = useState<Question[]>([]);
  const [shuffledOpts, setShuffledOpts] = useState<string[][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>("idle");
  const [modal, setModal] = useState<ModalType>(null);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [timer, setTimer] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // ── Fetch questions ────────────────────────────────────────────────────────
  useEffect(() => {
    supabase
      .from("questions_latihan")
      .select("*")
      .eq("category", category)
      .limit(10)
      .then(({ data, error: err }: { data: Question[] | null; error: unknown }) => {
        if (err || !data) { setError("Gagal memuat soal."); setLoading(false); return; }
        setQuestions(data);
        setShuffledOpts(data.map((q: Question) => shuffleArray(q.options)));
        setLoading(false);
        setTimerRunning(true);
      });
  }, [category]);

  // ── Timer ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (timerRunning) {
      timerRef.current = setInterval(() => setTimer((t) => t + 1), 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [timerRunning]);

  // ── Card entrance animation ────────────────────────────────────────────────
  const animateCardIn = useCallback(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 30, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out" }
      );
    }
  }, []);

  useEffect(() => {
    if (!loading) animateCardIn();
  }, [loading, currentIdx, animateCardIn]);

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleSelect = (opt: string) => {
    if (answerState !== "idle") return;
    setSelected(opt);
  };

  const handleConfirm = () => {
    if (!selected || answerState !== "idle") return;
    const q = questions[currentIdx];
    if (selected === q.answer) {
      setAnswerState("correct");
      setCorrect((c) => c + 1);
      setTimeout(() => setModal("correct"), 400);
    } else {
      setAnswerState("wrong");
      setWrong((w) => w + 1);
      setTimeout(() => setModal("wrong"), 400);
    }
  };

  const handleNext = () => {
    setModal(null);
    const nextIdx = currentIdx + 1;
    if (nextIdx >= questions.length) {
      setTimerRunning(false);
      setTimeout(() => setModal("result"), 300);
    } else {
      setTimeout(() => {
        setCurrentIdx(nextIdx);
        setSelected(null);
        setAnswerState("idle");
        animateCardIn();
      }, 200);
    }
  };

  const handleRetry = () => {
    setModal(null);
    setCurrentIdx(0);
    setSelected(null);
    setAnswerState("idle");
    setCorrect(0);
    setWrong(0);
    setTimer(0);
    setShuffledOpts(questions.map((q) => shuffleArray(q.options)));
    setTimerRunning(true);
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  if (loading) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-10 h-10 border-3 border-indigo-200 border-t-indigo-500 rounded-full" />
        <p className="text-gray-400 text-sm font-mono">Memuat soal...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <p className="text-rose-500 text-sm">{error}</p>
    </div>
  );

  if (questions.length === 0) return null;

  const q = questions[currentIdx];
  const opts = shuffledOpts[currentIdx] ?? q.options;
  const labels = ["A", "B", "C", "D"];
  const progress = ((currentIdx) / questions.length) * 100;
  const modalOpen = modal !== null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <BackButton
        href="/latihan"
        label="Latihan"
        variant="light"
        confirmMessage="Kemajuan latihanmu akan hilang. Yakin mau keluar?"
      />

      {/* ── Top bar ───────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-30 bg-white border-b border-gray-100 px-6 py-7">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
          {/* Category badge */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ background: color.primary }} />
            <span className=" font-semibold text-gray-600">{CATEGORY_LABEL[category]}</span>
          </div>

          {/* Progress */}
          <div className="flex-1 max-w-xs">
            <div className="flex justify-between text-[10px] text-gray-400 mb-1">
              <span>Soal {currentIdx + 1}/{questions.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: color.primary }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>

          {/* Timer */}
          <div className="flex items-center gap-1.5  font-mono text-gray-500">
            <span>⏱</span>
            <span>{formatTime(timer)}</span>
          </div>
        </div>
      </header>

      {/* ── Main content ──────────────────────────────────────────────── */}
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div ref={cardRef} className="w-full max-w-3xl">

          {/* Question card */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-6">
            {/* Top accent */}
            <div className="h-1.5 w-full" style={{ background: color.primary }} />

            <div className="px-8 py-7">
              {/* Soal number + category */}
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-mono font-bold tracking-widest uppercase"
                  style={{ color: color.primary }}>
                  Soal {currentIdx + 1}
                </span>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-[10px]">
                    {correct}
                  </span>
                  <span>benar</span>
                  <span className="mx-1 text-gray-300">·</span>
                  <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center font-bold text-[10px]">
                    {wrong}
                  </span>
                  <span>salah</span>
                </div>
              </div>

              {/* Question text */}
              <h2
                className="text-xl md:text-2xl font-black text-gray-900 leading-snug mb-8"
                style={{ fontFamily: '"Georgia", serif' }}
              >
                {q.question}
              </h2>

              {/* Options */}
              <div className="grid sm:grid-cols-2 gap-3">
                {opts.map((opt, i) => (
                  <OptionButton
                    key={opt}
                    label={labels[i]}
                    text={opt}
                    selected={selected === opt}
                    state={answerState}
                    onClick={() => handleSelect(opt)}
                    correctAnswer={q.answer}
                    disabled={answerState !== "idle"}
                    accentColor={color.primary}
                  />
                ))}
              </div>
            </div>

            {/* Confirm footer */}
            <div className="px-8 py-5 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
              <span className="text-xs text-gray-400">
                {answerState === "idle" ? "Pilih salah satu jawaban" : answerState === "correct" ? "✓ Jawaban benar!" : "✗ Jawaban salah"}
              </span>
              <motion.button
                onClick={handleConfirm}
                disabled={!selected || answerState !== "idle"}
                whileHover={selected && answerState === "idle" ? { scale: 1.03 } : {}}
                whileTap={selected && answerState === "idle" ? { scale: 0.97 } : {}}
                className="px-7 py-3 rounded-2xl text-sm font-bold text-white transition-all duration-200"
                style={{
                  background: selected && answerState === "idle" ? color.primary : "#D1D5DB",
                  cursor: selected && answerState === "idle" ? "pointer" : "not-allowed",
                }}
              >
                Konfirmasi
              </motion.button>
            </div>
          </div>

        </div>
      </main>

      {/* ── Modal overlay ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
          >
            {modal === "correct" && (
              <ModalCorrect onNext={handleNext} />
            )}
            {modal === "wrong" && (
              <ModalWrong
                onNext={handleNext}
                onPembahasan={() => setModal("pembahasan")}
              />
            )}
            {modal === "pembahasan" && (
              <ModalPembahasan question={q} onNext={handleNext} color={color} />
            )}
            {modal === "result" && (
              <ModalResult
                correct={correct} wrong={wrong}
                total={questions.length} timeSeconds={timer}
                category={category}
                onRetry={handleRetry}
                onBack={() => router.push("/latihan")}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}