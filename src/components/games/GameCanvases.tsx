"use client";

import { useEffect, useRef } from "react";

// ── Duel Canvas ───────────────────────────────────────────────
export function DuelCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;

    const draw = () => {
      c.width = c.parentElement?.offsetWidth ?? 260;
      c.height = c.parentElement?.offsetHeight ?? 300;
      const ctx = c.getContext("2d")!;
      const w = c.width, h = c.height, cx = w / 2, cy = h / 2;

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#f0fdf4";
      ctx.fillRect(0, 0, w, h);

      // Dua set ring konsentris (kiri & kanan)
      [cx * 0.38, cx * 1.62].forEach((ox) => {
        for (let i = 1; i <= 5; i++) {
          ctx.beginPath();
          ctx.arc(ox, cy, i * 20, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(22,163,74,${0.05 + i * 0.02})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });

      // Simbol diagonal
      const micro = ["∫", "lim", "d/dx", "∑", "f′(x)", "∂"];
      micro.forEach((s, i) => {
        const a = (i / micro.length) * Math.PI * 2;
        ctx.font = `${12 + Math.random() * 8}px Georgia, serif`;
        ctx.fillStyle = `rgba(22,163,74,${0.14 + Math.random() * 0.2})`;
        ctx.fillText(s, cx + Math.cos(a) * 88, cy + Math.sin(a) * 78);
      });

      // Icon utama ⚔
      ctx.font = "bold 62px Georgia, serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "rgba(22,163,74,0.18)";
      ctx.fillText("⚔", cx, cy);

      // "VS" label
      ctx.font = "600 11px sans-serif";
      ctx.fillStyle = "rgba(22,163,74,0.45)";
      ctx.fillText("VS", cx, cy + 2);

      ctx.textAlign = "start";
      ctx.textBaseline = "alphabetic";
    };

    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(c.parentElement!);
    return () => ro.disconnect();
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}

// ── Royale Canvas ─────────────────────────────────────────────
export function RoyaleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;

    const SYMS = ["∫", "∑", "lim", "d²/dx²", "∂f", "→", "∞", "Δ"];
    type Particle = {
      angle: number;
      r: number;
      sym: string;
      size: number;
      opacity: number;
      speed: number;
    };

    const particles: Particle[] = SYMS.map((sym, i) => ({
      angle: (i / SYMS.length) * Math.PI * 2,
      r: 50 + Math.random() * 55,
      sym,
      size: 10 + Math.random() * 12,
      opacity: 0.1 + Math.random() * 0.22,
      speed: 0.002 + Math.random() * 0.003,
    }));

    const draw = () => {
      c.width = c.parentElement?.offsetWidth ?? 260;
      c.height = c.parentElement?.offsetHeight ?? 300;
      const ctx = c.getContext("2d")!;
      const w = c.width, h = c.height, cx = w / 2, cy = h / 2;

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#eef2ff";
      ctx.fillRect(0, 0, w, h);

      // Orbit rings
      for (let i = 1; i <= 5; i++) {
        ctx.beginPath();
        ctx.arc(cx, cy, 28 + i * 24, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(99,102,241,${0.05 + i * 0.02})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Rotating symbols
      particles.forEach((p) => {
        p.angle += p.speed;
        const x = cx + Math.cos(p.angle) * p.r;
        const y = cy + Math.sin(p.angle) * p.r;
        ctx.font = `${p.size}px Georgia, serif`;
        ctx.fillStyle = `rgba(99,102,241,${p.opacity})`;
        ctx.fillText(p.sym, x, y);
      });

      // Crown
      ctx.font = "bold 60px Georgia, serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "rgba(99,102,241,0.2)";
      ctx.fillText("♛", cx, cy);

      ctx.textAlign = "start";
      ctx.textBaseline = "alphabetic";

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(c.parentElement!);

    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}