import TampilanUtama from "@/components/latihan/TampilanUtama";
import TopikLatihan from "@/components/latihan/TopikLatihan";
import Navbar from "@/components/Navbar";

export default function LatihanPage() {
    return (
        <main>
            <Navbar />  
            <TampilanUtama />
            <TopikLatihan />
        </main>
    )
}