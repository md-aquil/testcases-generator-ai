import { HistoryItem, TestCase, AutomationScript, TeamMember, TeamActivity } from "../types";

const STORAGE_KEY_HISTORY = 'qa_genai_history';

// --- EXISTING FUNCTION (Updated with type) ---
export const saveGeneratedAsset = async (
  userStory: string,
  testCases: TestCase[],
  automationScripts: AutomationScript[]
): Promise<HistoryItem> => {
  await new Promise(resolve => setTimeout(resolve, 600));

  const newItem: HistoryItem = {
    id: Math.random().toString(36).substr(2, 9),
    date: new Date().toISOString(),
    type: 'USER_STORY', // 🔥 Mark as User Story
    userStory,
    testCaseCount: testCases.length,
    scriptCount: automationScripts.length,
    testCases,
    automationScripts
  };

  addToLocalStorage(newItem);
  return newItem;
};

// --- 🔥 NEW FUNCTION: Save Data Factory Content ---
export const saveSyntheticData = async (
  prompt: string,
  jsonData: string
): Promise<HistoryItem> => {
  await new Promise(resolve => setTimeout(resolve, 400));

  const newItem: HistoryItem = {
    id: Math.random().toString(36).substr(2, 9),
    date: new Date().toISOString(),
    type: 'SYNTHETIC_DATA', // 🔥 Mark as Data
    prompt: prompt,
    syntheticData: jsonData
  };

  addToLocalStorage(newItem);
  return newItem;
};

// --- HELPER: Common Storage Logic ---
const addToLocalStorage = (item: HistoryItem) => {
  const existing = getHistory();
  const updated = [item, ...existing];
  localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(updated));
};

export const getHistory = (): HistoryItem[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY_HISTORY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Failed to load history", e);
    return [];
  }
};

// ... (Rest of the mock functions remain same) ...
export const getTeamMembers = async (): Promise<TeamMember[]> => {
  return [
    { id: '1', name: 'Alex Johnson', email: 'alex@company.com', role: 'Admin' },
    { id: '2', name: 'Sarah Lee', email: 'sarah@company.com', role: 'Editor' },
    { id: '3', name: 'Mike Chen', email: 'mike@company.com', role: 'Viewer' },
  ];
};

export const getTeamActivity = async (): Promise<TeamActivity[]> => {
  return [
    { id: '1', user: 'Alex Johnson', action: 'Generated test suite for Login Page', time: '10 mins ago' },
    { id: '2', user: 'Sarah Lee', action: 'Exported CSV for Checkout Flow', time: '2 hours ago' },
    { id: '3', user: 'Alex Johnson', action: 'Added new team member', time: '5 hours ago' },
    { id: '4', user: 'Mike Chen', action: 'Viewed Dashboard', time: '1 day ago' },
  ];
};