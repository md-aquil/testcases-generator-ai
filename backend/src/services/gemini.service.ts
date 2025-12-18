import { Type } from "@google/genai";
import { executeModelRequestWithFallback, executeChatMessage } from "./gemini.core";

/**
 * FRONTEND SERVICE LAYER
 * Strategy: Divide & Conquer (5 Parallel Requests) to ensure FULL content.
 */

// --- PROMPTS ---

const PROMPT_MANUAL = (story: string) => `
User Story: "${story}"

TASK:
1. Generate 8-10 comprehensive Manual Test Cases (Positive, Negative, Edge).
2. Generate matching BDD Gherkin Scenarios for each.

OUTPUT: JSON with 'testCases' and 'gherkinScenarios'.
`;

// 🔥 NEW: Specialized Prompt for Single Script
const PROMPT_SINGLE_SCRIPT = (story: string, framework: string, lang: string) => `
User Story: "${story}"

TASK:
Write a COMPLETE, production-ready Automation Script using **${framework}** in **${lang}**.

CRITICAL RULES:
1. **Full Coverage:** You MUST write code for ALL Positive, Negative, and Edge cases found in the story.
2. **NO MINIFICATION:** Use proper indentation and newlines. 
3. **No Placeholders:** Do NOT write "// ...rest of tests". Write every line of code.
4. **Imports:** Include valid imports.

OUTPUT: JSON with 'fileName' and 'code'.
`;

// --- SCHEMAS ---

const SCHEMA_MANUAL = {
  type: Type.OBJECT,
  properties: {
    testCases: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          title: { type: Type.STRING },
          preConditions: { type: Type.STRING },
          steps: { type: Type.ARRAY, items: { type: Type.STRING } },
          expectedResult: { type: Type.STRING },
          priority: { type: Type.STRING, enum: ["High", "Medium", "Low"] },
          type: { type: Type.STRING, enum: ["Positive", "Negative", "Edge Case"] }
        },
        required: ["id", "title", "steps", "expectedResult", "priority", "type", "preConditions"]
      }
    },
    gherkinScenarios: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          steps: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["name", "steps"]
      }
    }
  },
  required: ["testCases", "gherkinScenarios"]
};

// Simple Schema for 1 Script
const SCHEMA_SINGLE_SCRIPT = {
  type: Type.OBJECT,
  properties: {
    fileName: { type: Type.STRING },
    code: { type: Type.STRING, description: "Complete source code with newlines." }
  },
  required: ["fileName", "code"]
};

// --- HELPER FUNCTION ---

async function generateSingleScript(story: string, framework: string, lang: string) {
  try {
    const resultJson = await executeModelRequestWithFallback(
      PROMPT_SINGLE_SCRIPT(story, framework, lang),
      {
        responseMimeType: "application/json",
        responseSchema: SCHEMA_SINGLE_SCRIPT
      }
    );
    const data = JSON.parse(resultJson);
    return {
      framework: `${framework} (${lang})`,
      language: lang,
      fileName: data.fileName || "script",
      code: data.code || "// Error generating code"
    };
  } catch (error) {
    console.error(`Failed to generate ${framework} script`);
    return {
      framework: `${framework} (${lang})`,
      language: lang,
      fileName: `error_${framework.toLowerCase()}.txt`,
      code: "// Failed to generate this script due to AI timeout."
    };
  }
}

// --- MAIN FUNCTIONS ---

export const analyzeRequirements = async (userStory: string) => {
  try {
    const text = await executeModelRequestWithFallback(
      `Analyze user story: "${userStory}"`,
      {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isAmbiguous: { type: Type.BOOLEAN },
            issues: { type: Type.ARRAY, items: { type: Type.STRING } },
            missingDetails: { type: Type.ARRAY, items: { type: Type.STRING } },
            suggestions: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["isAmbiguous", "issues", "missingDetails", "suggestions"]
        }
      }
    );
    return JSON.parse(text);
  } catch (error) {
    return { isAmbiguous: false, issues: [], missingDetails: [], suggestions: [] };
  }
};

export const generateContentFromStory = async (userStory: string, includeAutomation: boolean = true) => {
  try {
    // 🚀 STEP 1: Launch Manual Test Generation
    const manualTask = executeModelRequestWithFallback(
      PROMPT_MANUAL(userStory),
      {
        responseMimeType: "application/json",
        responseSchema: SCHEMA_MANUAL
      }
    );

    let automationScripts: any[] = [];

    // 🚀 STEP 2: Launch 4 Parallel Script Generators (If requested)
    if (includeAutomation) {
      const scriptTasks = [
        generateSingleScript(userStory, "Playwright", "TypeScript"),
        generateSingleScript(userStory, "Cypress", "JavaScript"),
        generateSingleScript(userStory, "Selenium", "Java"),
        generateSingleScript(userStory, "Selenium", "Python")
      ];

      // Wait for Manual + All Scripts together
      const [manualResult, ...scriptsResults] = await Promise.all([manualTask, ...scriptTasks]);
      
      const manualData = JSON.parse(manualResult);
      automationScripts = scriptsResults;

      return {
        testCases: manualData.testCases || [],
        gherkinScenarios: manualData.gherkinScenarios || [],
        automationScripts: automationScripts
      };

    } else {
      // Manual Only case
      const manualResult = await manualTask;
      const manualData = JSON.parse(manualResult);
      return {
        testCases: manualData.testCases || [],
        gherkinScenarios: manualData.gherkinScenarios || [],
        automationScripts: []
      };
    }

  } catch (error) {
    console.error("Generation Error:", error);
    throw error;
  }
};

// ==========================================
// 🔥 UPDATED FUNCTION: STRICT FAKE DATA
// ==========================================
export const generateSyntheticData = async (prompt: string): Promise<string> => {
  const STRICT_PROMPT = `
  You are a Synthetic Data Generator Engine.
  
  User Request: "${prompt}"

  STRICT SAFETY RULES (MUST FOLLOW):
  1. **PHONES:** Use clearly FAKE or DUMMY numbers. 
     - For India (+91), use patterns like **99999XXXXX**, **88888XXXXX**, or sequential **9876543210**.
     - NEVER generate random "realistic" numbers that could belong to real people.
  2. **EMAILS:** STRICTLY use reserved domains only: **@example.com**, **@test.com**, **@invalid.com**.
  3. **NAMES:** Use generic names (e.g., "Test User 1", "Demo Account") or clearly fictional names.
  4. **ADDRESSES:** Use "123 Test St", "Null Island", "Sample City".
  5. **FORMAT:** Return ONLY a valid JSON Array.

  Goal: Data must pass validation regex but MUST NOT be real.
  `;

  return await executeModelRequestWithFallback(
    STRICT_PROMPT,
    { responseMimeType: "application/json" }
  );
};

// ==========================================

export const generateUnitTests = async (code: string, framework: string) => {
  return await executeModelRequestWithFallback(
    `Generate unit tests for this code using ${framework}: \n\n${code}`,
    {}
  );
};

export const generateApiTests = async (input: string) => {
  return await executeModelRequestWithFallback(
    `Generate Postman Collection JSON for: "${input}". Return JSON.`,
    { responseMimeType: "application/json" }
  );
};

export const sendChatMessage = async (
  newMessage: string, 
  userPlan: string,
  contextStory: string,
  testCases: any[]
) => {
  const summary = testCases.map(tc => `- ${tc.title}`).join('\n');
  return await executeChatMessage(
    `ZiaraQA Assistant. Context: ${contextStory}. Tests: ${summary}`, 
    newMessage
  );
};