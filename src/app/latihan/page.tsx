import DetailLatihan from "@/components/latihan/DetailLatihan";
import LatihanUtama from "@/components/latihan/LatihanUtama";
import TampilanUtama from "@/components/latihan/TampilanUtama";
import TopikLatihan from "@/components/latihan/TopikLatihan";
import Navbar from "@/components/ui/Navbar";

export default function LatihanPage() {
    return (
        <main>
            <Navbar />  
            <TampilanUtama />
            <TopikLatihan />
            <LatihanUtama />
            <DetailLatihan />
        </main>
    )
}