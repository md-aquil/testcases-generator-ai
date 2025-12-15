
import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedResponse, ChatMessage, TestCase } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION_FULL = `
You are an expert QA Automation Engineer and Test Lead. 
Your task is to analyze User Stories and generate:
1. Comprehensive manual test cases (Happy path, Negative, Edge cases).
2. Complete, runnable automation scripts for ALL requested frameworks.
3. BDD Gherkin Scenarios (Given-When-Then format).

CRITICAL VALIDATION STEP:
Check if the input provided by the user is a valid User Story, Feature Requirement, or Technical Spec.
If the input is random text, gibberish, a simple greeting (like "hello"), or unrelated content:
- You MUST return a JSON where 'testCases' contains exactly ONE item.
- That item must have id="INVALID_INPUT" and title="Invalid User Story Detected".
- Do not generate scripts or scenarios in this case.

The automation scripts must:
- Be production-ready code.
- Include necessary imports.
- Cover the generated test cases where possible.
- Use best practices (e.g., Page Object Model patterns if applicable, clean selectors).
- Be mapped correctly to the requested frameworks in the output list.

Output must be strictly JSON matching the requested schema.
`;

const SYSTEM_INSTRUCTION_MANUAL_ONLY = `
You are an expert QA Test Lead. 
Your task is to analyze User Stories and generate Comprehensive manual test cases (Happy path, Negative, Edge cases) and BDD Gherkin scenarios.

CRITICAL VALIDATION STEP:
Check if the input provided by the user is a valid User Story, Feature Requirement, or Technical Spec.
If the input is random text, gibberish, a simple greeting (like "hello"), or unrelated content:
- You MUST return a JSON where 'testCases' contains exactly ONE item.
- That item must have id="INVALID_INPUT" and title="Invalid User Story Detected".

Output must be strictly JSON matching the requested schema.
`;

export const generateContentFromStory = async (userStory: string, includeAutomation: boolean = true): Promise<GeneratedResponse> => {
  try {
    const prompt = includeAutomation 
      ? `User Story: "${userStory}"\n\nGenerate manual test cases, Gherkin BDD scenarios, and automation scripts for Playwright, Cypress, Selenium (Java), and Selenium (Python).`
      : `User Story: "${userStory}"\n\nGenerate comprehensive manual test cases and Gherkin BDD scenarios.`;

    const schemaProperties: any = {
      testCases: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING, description: "A unique identifier like TC-001" },
            title: { type: Type.STRING, description: "A concise summary of the test case" },
            preConditions: { type: Type.STRING, description: "Any setup required before testing" },
            steps: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "Step-by-step instructions"
            },
            expectedResult: { type: Type.STRING, description: "What should happen if the feature works correctly" },
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
            name: { type: Type.STRING, description: "Scenario name" },
            steps: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "Gherkin steps starting with Given, When, Then, And, But" 
            }
          },
          required: ["name", "steps"]
        }
      }
    };

    if (includeAutomation) {
      schemaProperties.automationScripts = {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            language: { type: Type.STRING, description: "e.g., TypeScript, Python" },
            framework: { type: Type.STRING, description: "Exactly one of: Playwright (TypeScript), Cypress (JavaScript), Selenium (Java), Selenium (Python)" },
            fileName: { type: Type.STRING, description: "Recommended filename, e.g., login.spec.ts" },
            code: { type: Type.STRING, description: "The full executable source code string." }
          },
          required: ["language", "framework", "fileName", "code"]
        }
      };
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: includeAutomation ? SYSTEM_INSTRUCTION_FULL : SYSTEM_INSTRUCTION_MANUAL_ONLY,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: schemaProperties,
          required: includeAutomation ? ["testCases", "gherkinScenarios", "automationScripts"] : ["testCases", "gherkinScenarios"]
        }
      }
    });

    if (!response.text) {
      throw new Error("No content generated");
    }

    const data = JSON.parse(response.text);
    
    return {
      testCases: data.testCases || [],
      gherkinScenarios: data.gherkinScenarios || [],
      automationScripts: data.automationScripts || []
    };

  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
};

export const sendChatMessage = async (
  currentHistory: ChatMessage[], 
  newMessage: string, 
  contextStory: string,
  testCases: TestCase[],
  userPlan: string
): Promise<string> => {
  try {
    // We summarize test cases to save tokens but provide context
    const testSummary = testCases.map(tc => `- [${tc.priority}] ${tc.title}`).join('\n');

    const appKnowledgeBase = `
    You are the "ZiaraQA" Assistant. Your goal is to help users navigate the app and understand their test results.
    
    APP CAPABILITIES:
    1. Generate Manual Test Cases (Available on all plans).
    2. Generate BDD/Gherkin Scenarios (Locked on STARTER, Available on PRO).
    3. Generate Automation Scripts (Playwright, Cypress, Selenium) (Locked on STARTER, Available on PRO).
    4. Export to CSV (Available on all plans).
    5. Push to Jira (Simulated integration).
    6. Team Workspace (Enterprise only).

    CURRENT CONTEXT:
    - User Plan: ${userPlan}
    - Current User Story: "${contextStory}"
    - Generated Test Cases Summary:
    ${testSummary}

    INSTRUCTIONS:
    - If the user asks about the app (e.g., "How do I export?", "Why can't I see scripts?"), answer based on the APP CAPABILITIES and their User Plan.
    - If the user asks about the tests (e.g., "Add a negative case", "Explain test 3"), use the CURRENT CONTEXT.
    - **FORMATTING:** Use **bold** for key terms. Use bullet points for lists. Keep paragraphs short and readable.
    - Be concise, professional, and helpful.
    `;

    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: appKnowledgeBase
      }
    });

    const result = await chat.sendMessage({
       message: newMessage
    });

    return result.text || "I couldn't process that request.";
  } catch (error) {
    console.error("Chat error:", error);
    return "Sorry, I encountered an error responding to your message.";
  }
};
