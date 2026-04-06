import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Only gemini-flash-latest is confirmed working with this API key
const WORKING_MODEL = "gemini-flash-latest";
const MAX_RETRIES = 4;

async function generateWithRetry(genAI: GoogleGenerativeAI, prompt: string) {
    const model = genAI.getGenerativeModel({ model: WORKING_MODEL });

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            const result = await model.generateContent(prompt);
            return result.response.text();
        } catch (err: any) {
            const msg = err.message || "";
            const isOverloaded = msg.includes("503") || msg.includes("429") ||
                msg.includes("high demand") || msg.includes("quota");

            if (isOverloaded && attempt < MAX_RETRIES) {
                // Exponential backoff: 1s, 2s, 4s, 8s
                const delay = 1000 * Math.pow(2, attempt - 1);
                console.log(`Attempt ${attempt} failed (overload), retrying in ${delay}ms...`);
                await new Promise(r => setTimeout(r, delay));
                continue;
            }
            // Not retriable (404, auth error, etc.) or max retries exceeded
            throw err;
        }
    }
    throw new Error("Server is overloaded. Please try again in a few seconds.");
}

export async function POST(req: Request) {
    try {
        const { goal, level, time, deadline, constraints } = await req.json();

        const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
        if (!GEMINI_API_KEY) {
            throw new Error("GEMINI_API_KEY is not set in environment variables");
        }
        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

        const prompt = `
            Act as an experienced strategist, mentor, and planning expert.
            My main goal: "${goal}".
            
            My input data:
            - Current level: ${level || "Not specified"}.
            - Available time: ${time || "Not specified"}.
            - Deadline (if any): ${deadline || "Not specified"}.
            - Additional constraints: ${constraints || "None"}.
            
            Please create a detailed step-by-step roadmap for achieving this goal.
            
            MANDATORY FORMAT INSTRUCTIONS (CRITICAL):
            The response must be STRICTLY a JSON array of 5 objects, without markdown blocks (pure JSON only).
            Each object must have the following structure:
            - "title": Block title (e.g. "1. Global Stages").
            - "duration": Approximate timeframe or empty string if not applicable.
            - "description": Detailed text description. Elaborate on the block content according to the request.
            
            Split the response into the following 5 blocks:
            1. Block 1 (title: "Global Stages"): Divide the entire path into 3-5 major phases with approximate timeframes for each.
            2. Block 2 (title: "Detailed Phase Plan"): Specific, measurable steps for each stage (what to read, what to do, what to practice).
            3. Block 3 (title: "Tools & Resources"): Best (and preferably free) materials, books, services, or habits.
            4. Block 4 (title: "Checkpoints"): How to objectively understand that a stage has been completed successfully and you can move forward.
            5. Block 5 (title: "Common Pitfalls"): Main mistakes beginners make on this path and how not to lose motivation.
            
            Language: English.
            ONLY RETURN JSON.
    `;

        const text = await generateWithRetry(genAI, prompt);
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

