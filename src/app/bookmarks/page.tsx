import { connect } from "@/lib/mongodb/mongoose";
import User from "@/lib/models/user.model";
import Post from "@/lib/models/post.model";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import PostCard from "@/components/PostCard";
import Link from "next/link";
import { FiBookmark, FiCompass } from "react-icons/fi";

export const dynamic = "force-dynamic";

export default async function BookmarksPage() {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  await connect();
  const dbUser = await User.findOne({ clerkId: user.id });
  const bookmarkIds = dbUser?.bookmarks || [];

  let bookmarkedPosts: any[] = [];
  if (bookmarkIds.length > 0) {
    bookmarkedPosts = await Post.find({ _id: { $in: bookmarkIds } }).sort({ createdAt: -1 });
  }

  return (
    <main className="min-h-screen py-16 px-6 max-w-6xl mx-auto">
      <header className="text-center max-w-2xl mx-auto space-y-4 mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-cinzel font-bold tracking-widest uppercase">
          <FiBookmark className="h-3.5 w-3.5" />
          Personal Archive
        </div>
        <h1 className="font-cinzel text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
          My Saved Pieces
        </h1>
        <p className="text-sm font-serif text-muted-foreground">
          Your curated personal anthology of poems, essays, and stories saved for contemplative reading.
        </p>
      </header>

      {bookmarkedPosts.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-border rounded-3xl bg-card/40 max-w-lg mx-auto space-y-4">
          <div className="p-4 rounded-full bg-muted w-14 h-14 mx-auto flex items-center justify-center text-muted-foreground">
            <FiBookmark className="h-6 w-6" />
          </div>
          <h3 className="font-cinzel text-lg font-bold text-foreground">
            No saved stories yet
          </h3>
          <p className="text-xs font-serif text-muted-foreground max-w-xs mx-auto">
            Click the &quot;Save Story&quot; button on any piece while reading to add it to your personal anthology.
          </p>
          <div className="pt-2">
            <Link
              href="/search"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-xs font-cinzel font-bold tracking-wider hover:opacity-90 transition-opacity"
            >
              <FiCompass className="h-4 w-4" />
              Discover Stories
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bookmarkedPosts.map((post) => (
            <PostCard key={post._id.toString()} post={post} />
          ))}
        </div>
      )}
    </main>
  );
}
