// File: backend/check-models.js
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");

// .env file load karo
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;

if (!apiKey) {
  console.error("❌ ERROR: API Key nahi mili! Make sure .env file backend folder me hai.");
  process.exit(1);
}

console.log(`🔑 Testing API Key: ${apiKey.substring(0, 5)}...******`);

const genAI = new GoogleGenerativeAI(apiKey);

async function checkAvailableModels() {
  try {
    // Ye direct Google ke server se list mangwata hai
    // Note: Hum native fetch use kar rahe hain taaki SDK version ka issue na ho
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    const models = data.models || [];

    console.log("\n✅ AVAILABLE MODELS FOR YOUR KEY:");
    console.log("===================================");
    
    // Filter karke sirf 'generateContent' wale models dikhayenge
    const usefulModels = models.filter(m => m.supportedGenerationMethods.includes("generateContent"));

    if (usefulModels.length === 0) {
      console.log("⚠️ No chat models found. Key might be invalid.");
    }

    usefulModels.forEach(model => {
      console.log(`• ${model.name.replace('models/', '')}`);
      // console.log(`  (Version: ${model.version})`);
    });

    console.log("===================================");
    console.log("💡 Tip: Jo naam upar list me hai, code me wahi use karna.");

  } catch (error) {
    console.error("❌ Failed to fetch models:", error.message);
  }
}

checkAvailableModels();