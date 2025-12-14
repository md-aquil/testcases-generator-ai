
import { HistoryItem, TestCase, AutomationScript, TeamMember, TeamActivity } from "../types";

// NOTE: In a real Next.js app, you would initialize Firebase here using environment variables.
// import { initializeApp } from "firebase/app";
// import { getFirestore, collection, addDoc, getDocs, query, where } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// --- LOCAL STORAGE MOCK IMPLEMENTATION (For Demo Purposes) ---
// This ensures the app works immediately. To use Firestore, uncomment the code above 
// and replace the function bodies below with actual Firestore calls.

const STORAGE_KEY_HISTORY = 'qa_genai_history';

export const saveGeneratedAsset = async (
  userStory: string,
  testCases: TestCase[],
  automationScripts: AutomationScript[]
): Promise<HistoryItem> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 600));

  const newItem: HistoryItem = {
    id: Math.random().toString(36).substr(2, 9),
    date: new Date().toISOString(),
    userStory,
    testCaseCount: testCases.length,
    scriptCount: automationScripts.length,
    testCases,
    automationScripts
  };

  const existing = getHistory();
  const updated = [newItem, ...existing];
  localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(updated));

  return newItem;
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

export const getTeamMembers = async (): Promise<TeamMember[]> => {
  // Mock Data
  return [
    { id: '1', name: 'Alex Johnson', email: 'alex@company.com', role: 'Admin' },
    { id: '2', name: 'Sarah Lee', email: 'sarah@company.com', role: 'Editor' },
    { id: '3', name: 'Mike Chen', email: 'mike@company.com', role: 'Viewer' },
  ];
};

export const getTeamActivity = async (): Promise<TeamActivity[]> => {
  // Mock Data
  return [
    { id: '1', user: 'Alex Johnson', action: 'Generated test suite for Login Page', time: '10 mins ago' },
    { id: '2', user: 'Sarah Lee', action: 'Exported CSV for Checkout Flow', time: '2 hours ago' },
    { id: '3', user: 'Alex Johnson', action: 'Added new team member', time: '5 hours ago' },
    { id: '4', user: 'Mike Chen', action: 'Viewed Dashboard', time: '1 day ago' },
  ];
};
