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
      model: "gemini-3.1-flash-lite-preview",
    });

    // 3. Generate content
    const prompt = `
      Create a blog post that is either a beautiful poem or an insightful article about life, art, philosophy, or nature.
      The response MUST be in JSON format with two fields: 
      1. "title": A catchy title.
      2. "content": The blog post content in HTML format (using <p>, <h2>, <ul>, etc.).
      Keep it high quality and engaging, and worthy to the eyes.
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Attempt to parse JSON from the response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Failed to parse AI response as JSON");
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

    // 5. Create the post
    const newPost = await Post.create({
      userId: adminUser._id.toString(),
      content,
      title,
      image: "",
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
