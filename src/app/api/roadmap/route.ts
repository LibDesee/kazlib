import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { goal } = await req.json();

        if (!process.env.GEMINI_API_KEY) {
            console.error("Missing GEMINI_API_KEY");
            return NextResponse.json(
                { error: "GEMINI_API_KEY is not set in environment variables." },
                { status: 500 }
            );
        }

        // Initialize inside the handler to ensure fresh env variables
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
      You are an expert career counselor and academic advisor. 
      Generate a detailed step-by-step roadmap for a student whose goal is: "${goal}".
      
      The response must be a JSON array of objects. Each object must have these exactly:
      - title: A short name for the step.
      - description: A brief explanation of what to do in this step (1-2 sentences).
      - duration: An estimated time to complete this step (e.g., "3 months", "Year 1").
      
      Provide exactly 5-7 logical steps.
      Language: Russian.
      Respond ONLY with the JSON array, no other text.
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;

        if (!response.text) {
            console.error("Empty response from Gemini API");
            throw new Error("Empty response from AI");
        }

        const text = response.text();

        // Clean the response if it contains markdown code blocks
        const cleanText = text.replace(/```json|```/g, "").trim();
        const steps = JSON.parse(cleanText);

        return NextResponse.json(steps);
    } catch (error: any) {
        console.error("AI Generation Error Detailed:", {
            message: error.message,
            stack: error.stack,
            response: error.response?.data || error.response
        });
        return NextResponse.json(
            { error: `Failed to generate roadmap: ${error.message || "Unknown error"}` },
            { status: 500 }
        );
    }
}
