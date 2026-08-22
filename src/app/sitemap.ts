import { MetadataRoute } from "next";
import { connect } from "@/lib/mongodb/mongoose";
import Post from "@/lib/models/post.model";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://wovenwords.vercel.app";

  let postRoutes: MetadataRoute.Sitemap = [];
  try {
    await connect();
    const posts = await Post.find({}, { slug: 1, updatedAt: 1 }).lean();
    postRoutes = posts.map((post: any) => ({
      url: `${baseUrl}/post/${post.slug}`,
      lastModified: new Date(post.updatedAt || new Date()),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch (e) {
    console.error("Sitemap error:", e);
  }

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/bookmarks`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.3,
    },
  ];

  return [...staticRoutes, ...postRoutes];
}
