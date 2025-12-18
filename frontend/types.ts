
export interface TestCase {
  id: string;
  title: string;
  preConditions: string;
  steps: string[];
  expectedResult: string;
  priority: 'High' | 'Medium' | 'Low';
  type: 'Positive' | 'Negative' | 'Edge Case';
}

export interface AutomationScript {
  language: string;
  framework: string;
  code: string;
  fileName: string;
}

export interface GherkinScenario {
  name: string;
  steps: string[];
}

export interface GeneratedResponse {
  testCases: TestCase[];
  automationScripts: AutomationScript[];
  gherkinScenarios: GherkinScenario[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export enum AppState {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING', // For Requirement Refiner
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export type FrameworkOption = 
  | 'Playwright (TypeScript)' 
  | 'Cypress (JavaScript)' 
  | 'Selenium (Java)' 
  | 'Selenium (Python)';

export type UserPlan = 'STARTER' | 'PRO' | 'AGENCY';

export interface UsageData {
  date: string; // ISO date string YYYY-MM-DD
  storiesCount: number;
  dataFactoryCount: number;
  unitTestCount: number;
  apiTestCount: number;
}

// ✅ NEW: Type identify karne ke liye
export type GenerationType = 'USER_STORY' | 'SYNTHETIC_DATA' | 'UNIT_TEST' | 'API_TEST';

export interface HistoryItem {
  id: string;
  date: string;
  type: GenerationType; // 🔥 New Field

  // Fields for User Story Generator (Optional now)
  userStory?: string;
  testCaseCount?: number;
  scriptCount?: number;
  testCases?: TestCase[];
  automationScripts?: AutomationScript[];

  // Fields for Data Factory (Optional)
  prompt?: string;        // User ne kya manga tha
  syntheticData?: string; // Generated JSON string
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer';
  avatarUrl?: string;
}

export interface TeamActivity {
  id: string;
  user: string;
  action: string;
  time: string;
}

export interface UserProfile {
  name: string;
  email: string;
  company?: string;
  jobTitle?: string;
}

export interface AnalysisResult {
  isAmbiguous: boolean;
  issues: string[];
  suggestions: string[];
  missingDetails: string[];
}

export type Page = 
  | 'LANDING' 
  | 'APP' 
  | 'DATA_FACTORY'
  | 'UNIT_TEST'
  | 'API_TEST'
  | 'MANAGER'
  | 'HISTORY' 
  | 'TEAM' 
  | 'PROFILE' 
  | 'BILLING'
  | 'ABOUT' 
  | 'CAREERS' 
  | 'BLOG' 
  | 'CONTACT'
  | 'PRIVACY' 
  | 'TERMS' 
  | 'SECURITY' 
  | 'COOKIES' 
  | 'INTEGRATIONS' 
  | 'API_DOCS';
