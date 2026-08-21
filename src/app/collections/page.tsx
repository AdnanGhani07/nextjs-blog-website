import Post from "@/lib/models/post.model";
import { connect } from "@/lib/mongodb/mongoose";
import Link from "next/link";
import {
  FiFeather,
  FiBook,
  FiFileText,
  FiCpu,
  FiCompass,
  FiArrowRight,
} from "react-icons/fi";

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

  const getCategoryIcon = (cat?: string) => {
    switch ((cat || "uncategorized").toLowerCase()) {
      case "poem":
      case "poetry":
        return <FiFeather className="h-8 w-8 text-primary" />;
      case "article":
        return <FiBook className="h-8 w-8 text-secondary" />;
      case "journal":
        return <FiFileText className="h-8 w-8 text-primary" />;
      case "ai":
        return <FiCpu className="h-8 w-8 text-secondary" />;
      default:
        return <FiCompass className="h-8 w-8 text-primary" />;
    }
  };

  return (
    <main className="min-h-screen py-20 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center gap-4 text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-cinzel font-bold tracking-widest uppercase">
          Curated Archives
        </div>
        <h1 className="font-cinzel text-4xl sm:text-6xl font-bold tracking-tight text-foreground">
          Literary <span className="editorial-gradient-text font-serif italic">Collections</span>
        </h1>
        <p className="font-serif text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
          Explore thoughtfully assembled genres of poems, essays, and journals—each collection reflecting a distinct shade of the human spirit.
        </p>
      </div>

      {/* Grid of Collections */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat, idx) => {
          const categoryName = cat._id || "uncategorized";
          return (
            <Link
              key={cat._id || `cat-${idx}`}
              href={`/search?category=${encodeURIComponent(categoryName)}`}
              className="group relative rounded-2xl border border-border/70 bg-card/80 dark:bg-card/50 backdrop-blur-sm p-8 flex flex-col items-center text-center gap-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-primary/40"
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-muted/50 border border-border/60 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary/10">
                {getCategoryIcon(categoryName)}
              </div>

              {/* Title & Count */}
              <div className="space-y-1.5">
                <h2 className="font-cinzel text-xl font-bold text-foreground capitalize tracking-wide group-hover:text-primary transition-colors">
                  {categoryName}
                </h2>
                <p className="text-xs font-serif text-muted-foreground">
                  {cat.count} {cat.count === 1 ? "Piece" : "Pieces"} published
                </p>
              </div>

              {/* CTA link */}
              <div className="w-full pt-4 border-t border-border/50 flex items-center justify-center gap-1.5 text-xs font-cinzel font-bold text-primary group-hover:underline">
                Explore Collection
                <FiArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
