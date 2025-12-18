import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
if (!apiKey) console.error("❌ API Key missing!");

const getAIClient = () => new GoogleGenAI({ apiKey: apiKey });

// ✅ SPEED OPTIMIZED MODEL LIST
// 2.0 Flash is currently the fastest for large outputs.
const MODELS_TO_TRY = [
  "gemini-2.0-flash",       // 1. Super Fast & Stable
  "gemini-2.5-flash",       // 2. High Quality
  "gemini-1.5-flash",       // 3. Reliable Backup
];

export async function executeModelRequestWithFallback(
  contents: string,
  config: any,
  modelIndex = 0
): Promise<string> {
  const ai = getAIClient();
  
  if (modelIndex >= MODELS_TO_TRY.length) {
    throw new Error("All AI models failed.");
  }

  const currentModel = MODELS_TO_TRY[modelIndex];

  try {
    if (config.thinkingConfig) delete config.thinkingConfig;

    const response = await ai.models.generateContent({
      model: currentModel,
      contents: contents,
      config: config
    });

    const text = typeof response.text === 'function' ? response.text : response.text;
    if (!text) throw new Error("Empty response");
    
    return text;

  } catch (error: any) {
    const msg = (error.message || JSON.stringify(error)).toLowerCase();
    const isRetryable = msg.includes("429") || msg.includes("quota") || msg.includes("503") || msg.includes("overloaded");

    if (isRetryable) {
      console.warn(`⚠️ ${currentModel} busy. Switching...`);
      return executeModelRequestWithFallback(contents, config, modelIndex + 1);
    }
    throw error;
  }
}

export async function executeChatMessage(systemInstruction: string, message: string): Promise<string> {
  try {
    const ai = getAIClient();
    const chat = ai.chats.create({
      model: "gemini-2.0-flash", // Fast chat
      config: { systemInstruction }
    });
    const result = await chat.sendMessage({ message });
    return (typeof result.text === 'function' ? result.text : result.text) || "";
  } catch (error) {
    return "Service unavailable.";
  }
}