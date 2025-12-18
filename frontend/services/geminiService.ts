// FIX: Port 4000 ensure karein
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

export const generateContentFromStory = async (userStory: string, includeAutomation: boolean) => {
  return post({
    type: "testcases",
    payload: { 
        userStory, 
        // 🔥 FORCE TRUE HERE TOO
        includeAutomation: true 
    }
  });
};

export const analyzeRequirements = async (userStory: string) => {
  return post({
    type: "analyze",
    payload: { userStory }
  });
};

export const generateSyntheticData = async (prompt: string) => {
  return post({
    type: "synthetic_data",
    payload: { prompt }
  });
};

export const generateUnitTests = async (code: string, framework: string) => {
  return post({
    type: "unit_tests",
    payload: { code, framework }
  });
};

export const generateApiTests = async (input: string) => {
  return post({
    type: "api_tests",
    payload: { input }
  });
};

export const sendChatMessage = async (payload: { input: string; userPlan: string; contextStory?: string }) => {
  return post({
    type: "chat",
    payload: {
      message: payload.input,
      userPlan: payload.userPlan,
      contextStory: payload.contextStory
    }
  });
};