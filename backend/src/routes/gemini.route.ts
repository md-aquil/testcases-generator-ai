import { Router } from "express";
import {
  analyzeRequirements,
  generateContentFromStory,
  generateSyntheticData,
  generateUnitTests,
  generateApiTests,
  sendChatMessage
} from "../services/gemini.service";

const router = Router();

router.post("/generate", async (req, res) => {
  try {
    const { type, payload } = req.body;
    if (!type || !payload) return res.status(400).json({ error: "Invalid Request" });

    let result;
    switch (type) {
      case "testcases":
        const story = payload.userStory || payload;
        // Always force true for now as per your requirement
        const auto = true; 
        result = await generateContentFromStory(story, auto);
        break;
      
      case "analyze":
        result = await analyzeRequirements(payload.userStory || payload);
        break;
      
      case "synthetic_data":
        result = await generateSyntheticData(payload.prompt);
        break;
      
      case "unit_tests":
        result = await generateUnitTests(payload.code, payload.framework);
        break;
      
      case "api_tests":
        result = await generateApiTests(payload.input);
        break;
      
      case "chat":
        result = await sendChatMessage(
          payload.message, 
          payload.userPlan, 
          payload.contextStory, 
          payload.testCases || []
        );
        break;
      
      default:
        return res.status(400).json({ error: "Invalid type" });
    }
    res.json(result);
  } catch (error: any) {
    console.error("Server Error:", error);
    res.status(500).json({ error: "Failed", details: error.message });
  }
});

export default router;