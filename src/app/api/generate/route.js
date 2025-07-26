import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Handles POST requests
export async function POST(req) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const data = await req.json();

    // data.history is expected to be the message array (see frontend)
    // Build the chat history
    const contents = data.history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }));

    // The current prompt is the last user message
    const result = await model.generateContent({ contents });
    const response = await result.response;
    const output = await response.text();

    return NextResponse.json({ output });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
