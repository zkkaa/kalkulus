import HeroLatihan from "@/components/latihan/HeroLatihan";
import MenuLatihan from "@/components/latihan/MenuLatihan";
import WhyLatihan from "@/components/latihan/WhyLatihan";
import Navbar from "@/components/ui/Navbar";

export default function LatihanPage() {
    return (
        <main>
            <Navbar />  
            <HeroLatihan />
            <WhyLatihan />
            <MenuLatihan />
        </main>
    )
}