
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
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export type FrameworkOption = 
  | 'Playwright (TypeScript)' 
  | 'Cypress (JavaScript)' 
  | 'Selenium (Java)' 
  | 'Selenium (Python)';

export type UserPlan = 'STARTER' | 'PRO' | 'ENTERPRISE';

export interface UsageData {
  date: string; // ISO date string YYYY-MM-DD
  count: number;
}

export interface HistoryItem {
  id: string;
  date: string;
  userStory: string;
  testCaseCount: number;
  scriptCount: number;
  testCases: TestCase[];
  automationScripts: AutomationScript[];
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

export type Page = 
  | 'LANDING' 
  | 'APP' 
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
