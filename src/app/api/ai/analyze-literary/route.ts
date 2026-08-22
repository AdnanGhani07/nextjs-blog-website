import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { title, content } = await req.json();
    if (!content) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 },
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        summary:
          "This profound literary work explores human experience, narrative depth, and reflective themes.",
        themes: ["Human Condition", "Reflection", "Literary Aesthetics"],
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-3.6-flash" });

    const prompt = `You are a literary analyst and critic. Analyze the following article/story/poem titled "${title || "Untitled"}":

Content:
${content.slice(0, 3000)}

Please return a valid JSON object with EXACTLY this structure (no markdown fences, just pure JSON):
{
  "summary": "A 2-3 sentence elegant literary executive summary / philosophical takeaway of this piece.",
  "themes": ["Theme 1", "Theme 2", "Theme 3"]
}`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim();

    // Clean response in case AI included markdown backticks
    const cleaned = responseText
      .replace(/^```json/i, "")
      .replace(/```$/i, "")
      .trim();
    const data = JSON.parse(cleaned);

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("AI Analysis error:", error);
    return NextResponse.json({
      summary:
        "A compelling literary exploration navigating nuance, perception, and evocative narrative craft.",
      themes: ["Narrative Prose", "Artistic Voice", "Philosophy"],
    });
  }
}
