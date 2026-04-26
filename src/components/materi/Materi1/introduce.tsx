import Link from "next/link";

export default function Introduce() {
  return (
    <section className="relative w-full overflow-hidden bg-white max-w-5xl mx-auto">
      <div className="relative max-w-3xl px-6 md:px-10 pt-32 text-start flex flex-col gap-6 mt-7">
        <span className=" text-7xl font-bold ">Turunan</span>
        <span className=" text-2xl text-shadow-gray-300">
          Apa itu turunan? Secara sederhana, turunan adalah laju perubahan
          sesaat dari sebuah fungsi terhadapvariabelnya.
        </span>
      </div>
      <div className=" w-full h-96 mt-7 flex">
        <div className=" w-full h-full flex items-center justify-center gap-5">
          <div className=" w-full h-72 rounded-2xl flex flex-col p-5 gap-2 justify-center bg-gray-200">
            <div className="flex items-center gap-4">
              <div
                className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  fontSize: "1rem",
                  transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
                  transform: "scale(1) rotate(0deg)",
                }}
              >
                x
              </div>
              <h3
                className="text-2xl font-black text-black leading-snug"
                style={{
                  fontFamily: '"Georgia", serif',
                  fontStyle: "space-grotesque",
                  letterSpacing: "-0.3px",
                }}
              >
                Konsep Dasar
              </h3>
            </div>
            <span className="mb-2">
              Akumulasi area dan konsep antiturunan. Dasar dari kalkulus
              integral untuk perhitungan volume kompleks.
            </span>
            <div className="w-full flex justify-start">
              <div className=" w-80 h-16 rounded-2xl flex flex-col p-5 gap-2 justify-center bg-gray-100 text-[#00B8D4]">f'(x) = lim[h→0] [f(x+h) - f(x)] / h</div>
            </div>
          </div>
          <div className=" w-full h-72 rounded-2xl flex flex-col p-5 gap-2 justify-center bg-gray-200">
            <div className="flex items-center gap-4">
              <div
                className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  fontSize: "1rem",
                  transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
                  transform: "scale(1) rotate(0deg)",
                }}
              >
                x
              </div>
              <h3
                className="text-2xl font-black text-black leading-snug"
                style={{
                  fontFamily: '"Georgia", serif',
                  fontStyle: "space-grotesque",
                  letterSpacing: "-0.3px",
                }}
              >
                Aturan Pangkat
              </h3>
            </div>
            <span className="mb-2">
              Untuk fungsi polinomial sederhana, kitamenggunakan aturan praktis yang sering disebut sebagai Power Rule.
            </span>
            <div className="w-full flex justify-start">
              <div className=" w-80 h-16 rounded-2xl flex flex-col p-5 gap-2 justify-center bg-gray-100 text-[#00B8D4]">f'(x) = lim[h→0] [f(x+h) - f(x)] / h</div>
            </div>
          </div> 
        </div>
      </div>
    </section>
  );
}
