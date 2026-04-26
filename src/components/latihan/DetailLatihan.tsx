"use client";

import Link from "next/link";

export default function PembahasanSoal() {
  return (
    <section className="relative min-h-screen bg-[#f7f9fb] px-6 py-8">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white shadow-sm border border-gray-100">

        {/* Header */}
        <header className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600 font-bold">
              📊
            </div>

            <div>
              <h1 className="text-lg font-bold text-gray-800">
                Pembahasan Soal
              </h1>
              <p className="text-xs font-semibold tracking-widest text-cyan-600 uppercase">
                Limit • Level 02
              </p>
            </div>
          </div>

          <button className="text-xl text-gray-400 hover:text-gray-700">
            ×
          </button>
        </header>

        <div className="px-6 py-6 space-y-8">

          {/* Pertanyaan */}
          <section>
            <h2 className="mb-4 text-sm font-bold uppercase text-gray-400">
              Pertanyaan
            </h2>

            <div className="rounded-xl border-l-4 border-cyan-500 bg-gray-50 p-5">
              <p className="text-gray-700 leading-relaxed">
                <span className="flex-col ">
                    1.	Diketahui:
                    <span className="flex-col">
                       a = 4 
                    </span>
                    <span>
                       b = 3
                    </span>
	                <span>
                       Tentukan suku ke-10!
                    </span>
                </span>
              </p>

            </div>
          </section>

          {/* Formula */}
          <section>
            <h2 className="mb-4 text-sm font-bold uppercase text-gray-400">
              Formula Utama
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl bg-cyan-700 p-6 text-center text-white">
                <p className="mb-2 text-xs uppercase tracking-widest opacity-80">
                  Hukum II Newton
                </p>
                <h3 className="text-3xl font-bold">ΣF = m • a</h3>
              </div>

              <div className="rounded-xl bg-green-100 p-6 text-center text-green-700">
                <p className="mb-2 text-xs uppercase tracking-widest">
                  Turunan Percepatan
                </p>
                <h3 className="text-3xl font-bold">a = ΣF / m</h3>
              </div>
            </div>
          </section>

          {/* Analisis */}
          <section>
            <h2 className="mb-5 text-sm font-bold uppercase text-gray-400">
              Analisis Langkah Demi Langkah
            </h2>

            <div className="space-y-6">

              {/* Step 1 */}
              <div className="flex gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-700 text-sm font-bold text-white">
                  1
                </div>

                <div>
                  <h3 className="font-bold text-gray-800">
                    Identifikasi Variabel
                  </h3>
                  <p className="mt-2 text-gray-600 leading-relaxed">
                    Massa benda (m) = 5kg dan gaya (F) = 20N. Karena bidang
                    licin, gaya gesek = 0.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-700 text-sm font-bold text-white">
                  2
                </div>

                <div className="w-full">
                  <h3 className="font-bold text-gray-800">
                    Substitusi ke Persamaan
                  </h3>

                  <div className="mt-3 rounded-xl border-l-4 border-cyan-500 bg-gray-50 p-5">
                    <p className="font-semibold text-gray-800">a = F / m</p>
                    <p className="mt-2 text-gray-700">a = 20 / 5</p>
                    <p className="mt-2 font-semibold text-gray-800">
                      a = 4 m/s²
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </section>

        </div>

        {/* Footer */}
        <footer className="flex items-center justify-between border-t border-gray-100 px-6 py-5">
          <p className="text-sm font-medium text-green-600">
            ✅ Kamu menjawab benar pada soal ini
          </p>

          <Link
            href="/next-question"
            className="rounded-xl bg-cyan-700 px-6 py-3 font-semibold text-white shadow-sm transition hover:scale-[1.02]"
          >
            Next Question →
          </Link>
        </footer>

      </div>
    </section>
  );
}