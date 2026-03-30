import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function listModels() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
    try {
        // The SDK doesn't have a direct listModels, we have to use the fetch API or just guess
        console.log("Testing gemini-1.5-flash...");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("Hi");
        console.log("Success with gemini-1.5-flash");
    } catch (e: any) {
        console.error("Failed with gemini-1.5-flash:", e.message);
    }

    try {
        console.log("Testing gemini-1.5-flash-latest...");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
        const result = await model.generateContent("Hi");
        console.log("Success with gemini-1.5-flash-latest");
    } catch (e: any) {
        console.error("Failed with gemini-1.5-flash-latest:", e.message);
    }

    try {
        console.log("Testing gemini-1.0-pro...");
        const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
        const result = await model.generateContent("Hi");
        console.log("Success with gemini-1.0-pro");
    } catch (e: any) {
        console.error("Failed with gemini-1.0-pro:", e.message);
    }
}

listModels();
