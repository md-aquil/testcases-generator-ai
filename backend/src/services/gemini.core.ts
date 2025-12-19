import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("❌ GEMINI_API_KEY is missing in .env file");
}

const genAI = new GoogleGenerativeAI(apiKey || "");

// Default model configuration
const DEFAULT_MODEL = "gemini-2.5-flash";

/**
 * Executes a prompt with optional configuration (Schema, MIME type).
 * Handles basic fallback or error logging.
 */
export const executeModelRequestWithFallback = async (
  prompt: string, 
  config: any = {}
) => {
  try {
    const model = genAI.getGenerativeModel({ 
        model: config.model || DEFAULT_MODEL,
        generationConfig: {
            responseMimeType: config.responseMimeType,
            responseSchema: config.responseSchema,
        },
        // Agar system instruction config mein pass ho raha hai
        systemInstruction: config.systemInstruction 
    });

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("❌ Gemini Core Error:", error);
    throw error;
  }
};

/**
 * Handles Chat interactions.
 * Uses System Instruction for context and processes the new user message.
 */
export const executeChatMessage = async (
  systemInstruction: string, 
  message: string
) => {
    try {
        const model = genAI.getGenerativeModel({ 
            model: DEFAULT_MODEL,
            systemInstruction: systemInstruction
        });

        // System Instruction set karne ke baad, user message bhejein
        const result = await model.generateContent(message);
        return result.response.text();
    } catch (error) {
        console.error("❌ Chat Core Error:", error);
        throw error;
    }
};