import { section } from "framer-motion/client";

export default function ContohSoal() {
  return (
    <section className="relative w-full overflow-hidden bg-white max-w-5xl mx-auto">
      <div className="relative max-w-3xl px-6 md:px-10 pt-32 text-start flex flex-col gap-6 mt-14">
        <span className=" text-7xl font-bold ">Contoh Soal</span>
      </div>
      <div className=" w-full h-full flex flex-col items-center justify-center gap-5 mt-7">
        <div className=" w-full h-72 rounded-2xl flex gap-6 bg-gray-200">
          <div className="w-96 h-full bg-blue-400 flex items-center justify-center">
            <span className="text-3xl font-bold ">f(x) = 5x3</span>
          </div>
          <div className="w-full h-full bg-pink-200 p-5 flex flex-col gap-3 ">
            <span className="text-2xl font-semibold">
              Langkah Penyelesaian:
            </span>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="rounded-2xl flex items-center justify-center bg-gray-100 text-[#00B8D4] px-3 py-1 ">
                  <span>step 1</span>
                </div>
                <span>Identifikasi konstanta (5) dan pangkat (3).</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="rounded-2xl flex items-center justify-center bg-gray-100 text-[#00B8D4] px-3 py-1 ">
                  <span>step 1</span>
                </div>
                <span>Identifikasi konstanta (5) dan pangkat (3).</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="rounded-2xl flex items-center justify-center bg-gray-100 text-[#00B8D4] px-3 py-1 ">
                  <span>step 1</span>
                </div>
                <span>Identifikasi konstanta (5) dan pangkat (3).</span>
              </div>
            </div>
            <span className="text-xl font-semibold">Hasil: f'(x) = 15x<sub>2</sub></span>
          </div>
        </div>
        <div className=" w-full h-72 rounded-2xl flex gap-6 bg-gray-200">
          <div className="w-96 h-full bg-blue-400 flex items-center justify-center">
            <span className="text-3xl font-bold ">f(x) = 5x3</span>
          </div>
          <div className="w-full h-full bg-pink-200 p-5 flex flex-col gap-3 ">
            <span className="text-2xl font-semibold">
              Langkah Penyelesaian:
            </span>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="rounded-2xl flex items-center justify-center bg-gray-100 text-[#00B8D4] px-3 py-1 ">
                  <span>step 1</span>
                </div>
                <span>Identifikasi konstanta (5) dan pangkat (3).</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="rounded-2xl flex items-center justify-center bg-gray-100 text-[#00B8D4] px-3 py-1 ">
                  <span>step 1</span>
                </div>
                <span>Identifikasi konstanta (5) dan pangkat (3).</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="rounded-2xl flex items-center justify-center bg-gray-100 text-[#00B8D4] px-3 py-1 ">
                  <span>step 1</span>
                </div>
                <span>Identifikasi konstanta (5) dan pangkat (3).</span>
              </div>
            </div>
            <span className="text-xl font-semibold">Hasil: f'(x) = 15x<sub>2</sub></span>
          </div>
        </div>

      </div>
    </section>
  );
}
