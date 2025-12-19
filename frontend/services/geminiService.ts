import { GeneratedResponse, ChatMessage, TestCase, AnalysisResult } from "../types";

// Ensure this matches your Backend Port
const BACKEND_URL = 'http://localhost:4000'; 

async function post(payload: any) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/gemini/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.details || err.error || "Backend Error");
    }
    return await res.json();
  } catch (error) {
    console.error("API Call Failed:", error);
    throw error;
  }
}

export const analyzeRequirements = async (userStory: string): Promise<AnalysisResult> => {
  return post({
    type: "analyze",
    payload: { userStory }
  });
};

export const generateContentFromStory = async (
  userStory: string, 
  includeAutomation: boolean = true, 
  refinementContext?: AnalysisResult
): Promise<GeneratedResponse> => {
  return post({
    type: "testcases",
    payload: { 
      userStory, 
      includeAutomation,
      refinementContext // Passing refinement data to backend
    }
  });
};

export const generateSyntheticData = async (prompt: string): Promise<string> => {
  return post({
    type: "synthetic_data",
    payload: { prompt }
  });
};

export const generateUnitTests = async (code: string, framework: 'Jest' | 'Mocha' = 'Jest'): Promise<string> => {
  return post({
    type: "unit_tests",
    payload: { code, framework }
  });
};

export const generateApiTests = async (input: string): Promise<string> => {
  return post({
    type: "api_tests",
    payload: { input }
  });
};

export const sendChatMessage = async (
  currentHistory: ChatMessage[], 
  newMessage: string, 
  contextStory: string,
  testCases: TestCase[],
  userPlan: string
): Promise<string> => {
  return post({
    type: "chat",
    payload: {
      message: newMessage,
      userPlan: userPlan,
      contextStory: contextStory,
      testCases: testCases
    }
  });
};