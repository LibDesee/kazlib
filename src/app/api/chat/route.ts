import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { message, history } = await req.json();

        const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
        if (!GEMINI_API_KEY) {
            throw new Error("GEMINI_API_KEY is not set in environment variables");
        }
        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        const formattedHistory = history ? history.map((msg: any) => {
            return `${msg.sender === 'me' ? 'Student' : 'Assistant'}: ${msg.text}`;
        }).join('\n') : '';

        const prompt = `
      You are KazLib Assistant, a highly intelligent, empathetic, and engaging AI helper for students on the KazLib educational platform.
      Your primary role is to assist students with choosing a university, understanding their chances of getting grants, helping them plan their careers, or offering general academic guidance.
      
      Keep your responses supportive and concise. Be a warm buddy for the student!
      Do not output any markdown code blocks, just regular text. Always respond in English.
      
      Here is the conversation history:
      ${formattedHistory}
      
      Student: ${message}
      Assistant:
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;

        if (!response.text) {
            throw new Error("Empty response from AI");
        }

        return NextResponse.json({ reply: response.text().trim() });
    } catch (error: any) {
        console.error("AI Assistant Error:", error);
        return NextResponse.json(
            { error: `Failed to generate reply: ${error.message || "Unknown error"}` },
            { status: 500 }
        );
    }
}
