import Post from "@/lib/models/post.model";
import { connect } from "@/lib/mongodb/mongoose";
import Link from "next/link";
import {
  GiScrollUnfurled,
  GiWaxSeal,
  GiQuillInk,
  GiOpenBook,
  GiInkSwirl,
} from "react-icons/gi";

export default async function Collections() {
  let categories: { _id: string; count: number }[] = [];

  try {
    await connect();
    categories = await Post.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }

  const getCategoryIcon = (cat: string) => {
    switch (cat.toLowerCase()) {
      case "poem":
        return <GiQuillInk className="h-12 w-12" />;
      case "article":
        return <GiOpenBook className="h-12 w-12" />;
      case "journal":
        return <GiScrollUnfurled className="h-12 w-12" />;
      case "ai":
        return <GiInkSwirl className="h-12 w-12" />;
      default:
        return <GiWaxSeal className="h-12 w-12" />;
    }
  };

  return (
    <main className="min-h-screen py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col items-center gap-6 text-center mb-20">
        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-[#740001]/5 border-2 border-[#740001]/20 text-[#740001] font-cinzel text-xs font-bold tracking-[0.4em] uppercase shadow-sm">
          The Archives
        </div>
        <h1 className="font-cinzel text-4xl md:text-6xl font-bold text-[#2c1e16] tracking-tighter">
          Literary <span className="text-[#740001]">Collections</span>
        </h1>
        <p className="font-serif italic text-xl text-[#2c1e16]/70 max-w-2xl leading-relaxed">
          Explore curated series of poems, prose, and journal entries—each
          collection a journey through emotions, seasons, and stories woven with
          words.
        </p>
        <div className="h-1.5 w-24 bg-[#740001] rounded-full mt-4" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
        {categories.map((cat) => (
          <Link
            key={cat._id}
            href={`/search?category=${cat._id}`}
            className="group relative bg-white/30 border-4 border-double border-[#d3a625]/40 p-8 flex flex-col items-center text-center gap-6 transition-all hover:-translate-y-2 hover:border-[#740001] hover:shadow-2xl overflow-hidden"
          >
            {/* Decorative Corner */}
            <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-[#d3a625]/20 group-hover:border-[#740001]/40 transition-colors" />

            <div className="text-[#740001] transition-transform group-hover:scale-110 duration-500">
              {getCategoryIcon(cat._id)}
            </div>

            <div className="space-y-2">
              <h2 className="font-cinzel text-2xl font-black text-[#2c1e16] uppercase tracking-wider group-hover:text-[#740001] transition-colors">
                {cat._id}
              </h2>
              <p className="font-serif italic text-[#2c1e16]/60">
                {cat.count} {cat.count === 1 ? "Scroll" : "Scrolls"} found
              </p>
            </div>

            <div className="w-full h-px bg-[#d3a625]/20 group-hover:bg-[#740001]/40 transition-colors" />

            <span className="font-cinzel text-[10px] font-black tracking-[0.2em] text-[#740001] opacity-0 group-hover:opacity-100 transition-opacity">
              Open the Vault
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
