import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config({ path: "/home/nurik/kazlib/.env.local" });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function run() {
  const modelsToTest = [
    "gemini-flash-latest",
    "gemini-flash-lite-latest",
    "gemini-2.5-flash-lite",
    "gemini-3-flash-preview"
  ];
  
  for (const m of modelsToTest) {
    try {
      const model = genAI.getGenerativeModel({ model: m });
      const result = await model.generateContent("hello");
      console.log(`Success with: ${m} - ${result.response.text().slice(0, 10)}`);
      break;
    } catch (e) {
      console.log(`Error with ${m}:`, e.message);
    }
  }
}
run();
