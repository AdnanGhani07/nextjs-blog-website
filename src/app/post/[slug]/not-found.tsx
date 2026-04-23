import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GiInkSwirl } from "react-icons/gi";

export default function NotFound() {
  return (
    <main className="p-6 flex flex-col max-w-4xl mx-auto min-h-screen text-center py-32">
      <GiInkSwirl className="h-16 w-16 text-[#d3a625]/20 mx-auto mb-6" />
      <h2 className="font-cinzel text-4xl font-bold text-[#1a0f0a]">
        Scroll Not Found
      </h2>
      <p className="font-serif italic text-lg text-[#1a0f0a]/60 mt-4">
        The archives are silent on this matter.
      </p>
      <Link href="/" className="mt-10">
        <Button
          variant="outline"
          className="font-cinzel font-bold tracking-widest border-4 border-double border-[#740001] text-[#740001] hover:bg-[#740001] hover:text-white transition-all"
        >
          Return to Ledger
        </Button>
      </Link>
    </main>
  );
}
