import { connect } from "@/lib/mongodb/mongoose";
import Post from "@/lib/models/post.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connect();
    const posts = await Post.find().sort({ createdAt: -1 }).limit(20).lean();

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://wovenwords.vercel.app";

    const rssItems = posts
      .map(
        (post: any) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteUrl}/post/${post.slug}</link>
      <guid isPermaLink="true">${siteUrl}/post/${post.slug}</guid>
      <description><![CDATA[${post.aiSummary || post.title}]]></description>
      <category><![CDATA[${post.category || "General"}]]></category>
      <pubDate>${new Date(post.createdAt).toUTCString()}</pubDate>
    </item>`
      )
      .join("");

    const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Woven Words — A Literary &amp; Tech Blog</title>
    <link>${siteUrl}</link>
    <description>A modern, fast blog focused on SEO, literary essays, prose, and smooth reading.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
    ${rssItems}
  </channel>
</rss>`;

    return new NextResponse(rssXml, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "s-maxage=3600, stale-while-revalidate",
      },
    });
  } catch (error) {
    console.error("RSS generation error:", error);
    return new NextResponse("Error generating RSS feed", { status: 500 });
  }
}
