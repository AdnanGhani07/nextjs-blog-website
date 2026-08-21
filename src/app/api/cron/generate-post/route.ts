import Post from "@/lib/models/post.model";
import User from "@/lib/models/user.model";
import { connect } from "@/lib/mongodb/mongoose";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const authHeader = req.headers.get("authorization");

  // Security check: Verify the cron secret
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await connect();

    // 1. Find an admin user to assign the post to
    const adminUser = await User.findOne({ isAdmin: true });
    if (!adminUser) {
      return NextResponse.json(
        { message: "No admin user found" },
        { status: 404 },
      );
    }

    // 2. Initialize Gemini
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
    const model = genAI.getGenerativeModel({
      model: "gemini-3.6-flash",
    });

    // 3. Generate content
    const prompt = `
      Create an evocative blog post for a literary publication called "Woven Words". It can be a beautiful poem, philosophical essay, or prose meditation about art, solitude, the cosmos, nature, or human connection.
      The response MUST be in valid JSON format with two fields: 
      1. "title": A poetic, captivating title.
      2. "content": The blog post content in HTML format (using <p>, <h2>, <blockquote>, etc.).
      Do not include any Markdown formatting or codeblocks around the JSON.
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim();

    // Clean any markdown code fences if present
    const cleanedText = responseText
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```$/i, "")
      .trim();

    // Attempt to parse JSON from the response
    const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Failed to parse AI response as JSON: " + responseText);
    }

    const { title, content } = JSON.parse(jsonMatch[0]);

    if (!title || !content) {
      throw new Error("AI generated incomplete content");
    }

    // 4. Generate slug
    const slug =
      title
        .split(" ")
        .join("-")
        .toLowerCase()
        .replace(/[^a-zA-Z0-9-]/g, "") +
      "-" +
      Math.random().toString(36).substring(2, 7);

    // Curated aesthetic fallback imagery for AI dispatches
    const aiFallbackImages = [
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1499209974431-9dac3ada0047?auto=format&fit=crop&w=1200&q=80",
    ];
    const randomImage =
      aiFallbackImages[Math.floor(Math.random() * aiFallbackImages.length)];

    // 5. Create the post
    const newPost = await Post.create({
      userId: adminUser._id.toString(),
      content,
      title,
      image: randomImage,
      category: "AI",
      slug,
    });

    return NextResponse.json(
      { message: "Post generated successfully", post: newPost },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Cron job error:", error);
    return NextResponse.json(
      { message: "Error in cron job", error: error.message },
      { status: 500 },
    );
  }
};
