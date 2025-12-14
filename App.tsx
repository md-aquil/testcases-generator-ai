
import React, { useState, useRef, useMemo, useEffect } from 'react';
import { generateContentFromStory } from './services/geminiService';
import { saveGeneratedAsset, getHistory } from './services/firebaseService';
import { 
  TestCase, 
  AppState, 
  AutomationScript, 
  FrameworkOption, 
  UserPlan, 
  UsageData, 
  HistoryItem,
  Page,
  UserProfile,
  GherkinScenario
} from './types';

// Components
import { TestCaseList } from './components/TestCaseList';
import { EmptyState } from './components/EmptyState';
import { AutomationViewer } from './components/AutomationViewer';
import { LandingPage } from './components/LandingPage';
import { AuthModal } from './components/AuthModal';
import { ContactModal } from './components/ContactModal';
import { UpgradeModal } from './components/UpgradeModal';
import { HistoryDashboard } from './components/HistoryDashboard';
import { TeamWorkspace } from './components/TeamWorkspace';
import { Sidebar } from './components/Sidebar';
import { ProfilePage } from './components/ProfilePage';
import { BillingPage } from './components/BillingPage';
import { BddViewer } from './components/BddViewer';
import { ChatWidget } from './components/ChatWidget';
import { JiraExportModal } from './components/JiraExportModal';
import { Footer } from './components/Footer';
import { StaticPage } from './components/StaticPages';

import { 
  Sparkles, 
  Download, 
  Upload, 
  FileText, 
  Loader2, 
  Eraser,
  Code,
  ListChecks,
  Laptop,
  Lock,
  Bot,
  Sun,
  Moon,
  Zap,
  FileCode,
  Share2,
  Menu
} from 'lucide-react';

const SAMPLE_STORY = `As a registered user, I want to be able to reset my password using a "Forgot Password" link on the login screen so that I can regain access to my account if I forget my credentials. The system should send a recovery email with a time-limited link.`;

const FRAMEWORK_ORDER: FrameworkOption[] = [
  'Playwright (TypeScript)',
  'Cypress (JavaScript)',
  'Selenium (Java)',
  'Selenium (Python)'
];

const DAILY_LIMIT_STARTER = 5;
type ViewMode = 'MANUAL' | 'AUTOMATION' | 'BDD';

const PUBLIC_PAGES: Page[] = [
  'LANDING', 
  'ABOUT', 
  'CAREERS', 
  'BLOG', 
  'CONTACT',
  'PRIVACY', 
  'TERMS', 
  'SECURITY', 
  'COOKIES',
  'INTEGRATIONS',
  'API_DOCS'
];

export default function App() {
  // Navigation & View State
  const [currentPage, setCurrentPage] = useState<Page>('LANDING');
  const [viewMode, setViewMode] = useState<ViewMode>('MANUAL');
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [error, setError] = useState<string | null>(null);
  
  // Data State
  const [userStory, setUserStory] = useState<string>('');
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [automationScripts, setAutomationScripts] = useState<AutomationScript[]>([]);
  const [gherkinScenarios, setGherkinScenarios] = useState<GherkinScenario[]>([]);
  const [activeFramework, setActiveFramework] = useState<FrameworkOption>('Playwright (TypeScript)');
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
  
  // User & Plan State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userPlan, setUserPlan] = useState<UserPlan>('STARTER');
  const [usageData, setUsageData] = useState<UsageData>({ date: new Date().toISOString().slice(0, 10), count: 0 });
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Demo User',
    email: 'user@example.com',
    company: 'Acme Corp',
    jobTitle: 'QA Engineer'
  });

  // Theme State
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  
  // Modals State
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showJiraModal, setShowJiraModal] = useState(false);
  const [upgradeReason, setUpgradeReason] = useState<'LIMIT_REACHED' | 'FEATURE_LOCKED'>('LIMIT_REACHED');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize theme
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Load usage and history on mount
  useEffect(() => {
    // Usage Load
    const storedUsage = localStorage.getItem('qa_genai_usage');
    const today = new Date().toISOString().slice(0, 10);
    
    if (storedUsage) {
      const parsed = JSON.parse(storedUsage) as UsageData;
      if (parsed.date === today) {
        setUsageData(parsed);
      } else {
        const newData = { date: today, count: 0 };
        setUsageData(newData);
        localStorage.setItem('qa_genai_usage', JSON.stringify(newData));
      }
    } else {
      const newData = { date: today, count: 0 };
      setUsageData(newData);
      localStorage.setItem('qa_genai_usage', JSON.stringify(newData));
    }

    // History Load
    const loadedHistory = getHistory();
    setHistoryItems(loadedHistory);
  }, []);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // Auth Handlers
  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowAuthModal(false);
    setCurrentPage('APP');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserPlan('STARTER');
    setCurrentPage('LANDING');
  };

  const handleUpgrade = () => {
    setShowUpgradeModal(false);
    setUserPlan('PRO');
    alert("Successfully upgraded to Pro!");
  };

  const handleClear = () => {
    setUserStory('');
    setTestCases([]);
    setAutomationScripts([]);
    setGherkinScenarios([]);
    setAppState(AppState.IDLE);
    setError(null);
    setViewMode('MANUAL');
  };

  const handleLoadHistoryItem = (item: HistoryItem) => {
    setUserStory(item.userStory);
    setTestCases(item.testCases);
    setAutomationScripts(item.automationScripts);
    setCurrentPage('APP');
    setAppState(AppState.SUCCESS);
  };

  // Generation Logic
  const handleGenerate = async () => {
    if (!userStory.trim()) return;

    if (!isLoggedIn) {
      setShowAuthModal(true);
      return;
    }

    if (userPlan === 'STARTER' && usageData.count >= DAILY_LIMIT_STARTER) {
      setUpgradeReason('LIMIT_REACHED');
      setShowUpgradeModal(true);
      return;
    }

    setAppState(AppState.LOADING);
    setError(null);
    setTestCases([]);
    setAutomationScripts([]);
    setGherkinScenarios([]);
    setViewMode('MANUAL'); 

    try {
      const includeAutomation = userPlan === 'PRO' || userPlan === 'ENTERPRISE';
      const result = await generateContentFromStory(userStory, includeAutomation);
      
      // Validation Check
      if (result.testCases.length > 0 && result.testCases[0].id === 'INVALID_INPUT') {
        setError("Invalid User Story detected. Please enter a valid functional requirement or story.");
        setAppState(AppState.ERROR);
        return;
      }

      setTestCases(result.testCases);
      setAutomationScripts(result.automationScripts);
      setGherkinScenarios(result.gherkinScenarios);
      
      // Save to History (Firestore/DB)
      const newItem = await saveGeneratedAsset(userStory, result.testCases, result.automationScripts);
      setHistoryItems(prev => [newItem, ...prev]);

      // Update Daily Usage
      const newCount = usageData.count + 1;
      const newData = { ...usageData, count: newCount };
      setUsageData(newData);
      localStorage.setItem('qa_genai_usage', JSON.stringify(newData));
      
      setAppState(AppState.SUCCESS);
    } catch (err) {
      setError("Failed to generate content. Please try again later.");
      setAppState(AppState.ERROR);
    }
  };

  const handleTabChange = (mode: ViewMode) => {
    if (mode === 'AUTOMATION' && userPlan === 'STARTER') {
      setUpgradeReason('FEATURE_LOCKED');
      setShowUpgradeModal(true);
      return;
    }
    if (mode === 'BDD' && userPlan === 'STARTER') {
      setUpgradeReason('FEATURE_LOCKED');
      setShowUpgradeModal(true);
      return;
    }
    setViewMode(mode);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setUserStory(content);
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleExportCSV = () => {
    if (testCases.length === 0) return;

    const headers = ["ID", "Title", "Type", "Priority", "Pre-Conditions", "Steps", "Expected Result"];
    const rows = testCases.map(tc => {
      const stepsFormatted = tc.steps.map((s, i) => `${i+1}. ${s}`).join('\n');
      return [
        `"${tc.id}"`,
        `"${tc.title.replace(/"/g, '""')}"`,
        `"${tc.type}"`,
        `"${tc.priority}"`,
        `"${tc.preConditions.replace(/"/g, '""')}"`,
        `"${stepsFormatted.replace(/"/g, '""')}"`,
        `"${tc.expectedResult.replace(/"/g, '""')}"`
      ].join(",");
    });

    const csvContent = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `test_cases_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const currentScript = useMemo(() => {
    return automationScripts.find(s => s.framework === activeFramework) || automationScripts[0];
  }, [automationScripts, activeFramework]);


  const scrollToSection = (id: string) => {
    if (currentPage !== 'LANDING') {
      setCurrentPage('LANDING');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };


  // ---------------- Render Views ----------------

  const renderContent = () => {
    switch (currentPage) {
      case 'PROFILE':
        return <ProfilePage profile={userProfile} onUpdate={setUserProfile} />;
      
      case 'BILLING':
        return (
          <BillingPage 
            userPlan={userPlan} 
            usageData={usageData} 
            dailyLimit={DAILY_LIMIT_STARTER} 
            onUpgrade={() => { setUpgradeReason('LIMIT_REACHED'); setShowUpgradeModal(true); }}
            onPlanChange={setUserPlan}
          />
        );

      case 'HISTORY':
        return (
           <div className="px-6 py-8">
            <HistoryDashboard 
              history={historyItems} 
              onLoadItem={handleLoadHistoryItem} 
              userPlan={userPlan}
              onUpgrade={() => { setUpgradeReason('FEATURE_LOCKED'); setShowUpgradeModal(true); }}
            />
          </div>
        );

      case 'TEAM':
        return (
          <div className="px-6 py-8">
            <TeamWorkspace 
              userPlan={userPlan}
              onContactSales={() => setShowContactModal(true)}
            />
          </div>
        );

      case 'APP':
      default:
        return (
          <div className="px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in-up">
            {/* Input Section */}
            <section className="glass rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <FileText className="w-5 h-5 text-indigo-500" />
                    User Story Definition
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Describe the feature or requirement you want to test.
                  </p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setUserStory(SAMPLE_STORY)}
                    className="text-xs font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 px-4 py-2 rounded-full transition-colors"
                  >
                    Use Sample Story
                  </button>
                  <button 
                    onClick={handleClear}
                    className="text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 px-4 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                  >
                    Clear
                  </button>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl opacity-0 group-focus-within:opacity-20 transition duration-500"></div>
                <textarea
                  value={userStory}
                  onChange={(e) => setUserStory(e.target.value)}
                  placeholder="As a [role], I want [feature] so that [benefit]..."
                  className="relative block w-full h-48 p-5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#050505] text-gray-900 dark:text-gray-100 shadow-inner focus:ring-0 focus:border-indigo-500 dark:focus:border-indigo-500 focus:outline-none resize-y transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 font-mono text-sm leading-relaxed"
                />
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept=".txt,.md"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-white dark:bg-white/5 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 p-2 rounded-lg shadow-lg border border-gray-200 dark:border-white/10 transition-all hover:scale-105 backdrop-blur-sm"
                    title="Upload Text File"
                  >
                    <Upload className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-end pt-2">
                <button
                  onClick={handleGenerate}
                  disabled={!userStory.trim() || appState === AppState.LOADING}
                  className={`
                    relative overflow-hidden group w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold tracking-wide shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0
                    ${!userStory.trim() || appState === AppState.LOADING 
                      ? 'bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed' 
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/25'}
                  `}
                >
                  {appState === AppState.LOADING ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span className="relative z-10">Generating...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 relative z-10" />
                      <span className="relative z-10">Generate Assets</span>
                    </>
                  )}
                </button>
              </div>
            </section>

            {/* Results Section */}
            <section className="space-y-6 pb-20">
              
              {appState === AppState.ERROR && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 p-4 rounded-xl flex items-center gap-3 animate-fade-in-up">
                  <div className="bg-red-100 dark:bg-red-900/50 p-2 rounded-full">
                    <Eraser className="w-5 h-5" />
                  </div>
                  <p>{error}</p>
                </div>
              )}

              {(appState === AppState.SUCCESS || appState === AppState.LOADING) && (
                <div className="flex flex-col gap-6 animate-fade-in-up">
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 dark:border-white/5 pb-1">
                    <div className="flex gap-4 sm:gap-8 overflow-x-auto no-scrollbar">
                      <button
                        onClick={() => handleTabChange('MANUAL')}
                        className={`pb-3 text-sm font-semibold flex items-center gap-2 border-b-2 transition-all duration-300 whitespace-nowrap ${
                          viewMode === 'MANUAL'
                            ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400 shadow-[0_10px_20px_-10px_rgba(99,102,241,0.5)]'
                            : 'border-transparent text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                        }`}
                      >
                        <ListChecks className="w-4 h-4" />
                        Manual Test Cases
                        {testCases.length > 0 && (
                          <span className={`text-xs px-2 py-0.5 rounded-full ml-1 ${
                            viewMode === 'MANUAL' 
                              ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300' 
                              : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                          }`}>
                            {testCases.length}
                          </span>
                        )}
                      </button>
                      <button
                        onClick={() => handleTabChange('BDD')}
                        className={`pb-3 text-sm font-semibold flex items-center gap-2 border-b-2 transition-all duration-300 whitespace-nowrap ${
                          viewMode === 'BDD'
                            ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400 shadow-[0_10px_20px_-10px_rgba(99,102,241,0.5)]'
                            : 'border-transparent text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                        }`}
                      >
                        {userPlan === 'STARTER' ? <Lock className="w-3.5 h-3.5" /> : <FileCode className="w-4 h-4" />}
                        BDD Scenarios
                        {gherkinScenarios.length > 0 && (
                          <span className={`text-xs px-2 py-0.5 rounded-full ml-1 ${
                            viewMode === 'BDD' 
                              ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300' 
                              : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                          }`}>
                            {gherkinScenarios.length}
                          </span>
                        )}
                      </button>
                      <button
                        onClick={() => handleTabChange('AUTOMATION')}
                        className={`pb-3 text-sm font-semibold flex items-center gap-2 border-b-2 transition-all duration-300 whitespace-nowrap ${
                          viewMode === 'AUTOMATION'
                            ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400 shadow-[0_10px_20px_-10px_rgba(99,102,241,0.5)]'
                            : 'border-transparent text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                        }`}
                      >
                        {userPlan === 'STARTER' ? <Lock className="w-3.5 h-3.5" /> : <Code className="w-4 h-4" />}
                        Automation Scripts
                        {automationScripts.length > 0 && (
                          <span className={`text-xs px-2 py-0.5 rounded-full ml-1 ${
                            viewMode === 'AUTOMATION' 
                              ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300' 
                              : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                          }`}>
                            {automationScripts.length}
                          </span>
                        )}
                      </button>
                    </div>

                    <div className="flex gap-2 mb-2">
                        {viewMode === 'MANUAL' && testCases.length > 0 && (
                          <>
                            <button
                                onClick={() => setShowJiraModal(true)}
                                className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 px-4 py-2 rounded-lg transition-colors border border-blue-200 dark:border-blue-900/30"
                            >
                                <Share2 className="w-3.5 h-3.5" />
                                Push to Jira
                            </button>
                            <button
                                onClick={handleExportCSV}
                                className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 bg-emerald-50 dark:bg-emerald-500/10 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 px-4 py-2 rounded-lg transition-colors border border-emerald-200 dark:border-emerald-500/20"
                            >
                                <Download className="w-3.5 h-3.5" />
                                Export CSV
                            </button>
                          </>
                        )}
                    </div>
                  </div>

                  <div className="min-h-[200px]">
                    {appState === AppState.LOADING ? (
                      <div className="grid grid-cols-1 gap-4 animate-pulse">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="h-48 bg-gray-100 dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/5"></div>
                        ))}
                      </div>
                    ) : (
                      <>
                        <div className={viewMode === 'MANUAL' ? 'block' : 'hidden'}>
                          {testCases.length > 0 && <TestCaseList testCases={testCases} />}
                        </div>

                        <div className={viewMode === 'BDD' ? 'block' : 'hidden'}>
                           {userPlan === 'STARTER' ? (
                                <div className="text-center py-20 text-gray-400 dark:text-gray-600 bg-gray-50 dark:bg-[#0a0a0c] rounded-2xl border border-dashed border-gray-200 dark:border-gray-800">
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="p-3 bg-gray-100 dark:bg-white/5 rounded-full">
                                            <Lock className="w-6 h-6 text-gray-400" />
                                        </div>
                                        <p>BDD Scenarios are available on the Pro plan.</p>
                                        <button 
                                          onClick={() => { setUpgradeReason('FEATURE_LOCKED'); setShowUpgradeModal(true); }}
                                          className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
                                        >
                                            Upgrade to Unlock
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <BddViewer scenarios={gherkinScenarios} />
                            )}
                        </div>
                        
                        <div className={viewMode === 'AUTOMATION' ? 'block' : 'hidden'}>
                          {automationScripts.length > 0 ? (
                            <div className="space-y-6">
                              <div className="flex flex-wrap gap-2 p-1 bg-gray-100/50 dark:bg-white/5 rounded-xl w-fit">
                                {FRAMEWORK_ORDER.map((framework) => {
                                    const hasScript = automationScripts.some(s => s.framework === framework);
                                    if (!hasScript) return null;
                                    
                                    return (
                                      <button
                                        key={framework}
                                        onClick={() => setActiveFramework(framework)}
                                        className={`
                                          flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                                          ${activeFramework === framework 
                                            ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm ring-1 ring-black/5 dark:ring-white/10' 
                                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-200/50 dark:hover:bg-white/5'}
                                        `}
                                      >
                                        <Laptop className="w-3.5 h-3.5" />
                                        {framework}
                                      </button>
                                    );
                                })}
                              </div>
                              
                              {currentScript && <AutomationViewer script={currentScript} />}
                            </div>
                          ) : (
                            <div className="text-center py-20 text-gray-400 dark:text-gray-600 bg-gray-50 dark:bg-[#0a0a0c] rounded-2xl border border-dashed border-gray-200 dark:border-gray-800">
                                {userPlan === 'STARTER' ? (
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="p-3 bg-gray-100 dark:bg-white/5 rounded-full">
                                            <Lock className="w-6 h-6 text-gray-400" />
                                        </div>
                                        <p>Automation scripts are available on the Pro plan.</p>
                                        <button 
                                          onClick={() => { setUpgradeReason('FEATURE_LOCKED'); setShowUpgradeModal(true); }}
                                          className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
                                        >
                                            Upgrade to Unlock
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <Zap className="w-12 h-12 mx-auto mb-4 opacity-20" />
                                        <p>No automation scripts generated.</p>
                                    </>
                                )}
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {appState === AppState.IDLE && <EmptyState />}
            </section>
          </div>
        );
    }
  };

  const isPublicPage = PUBLIC_PAGES.includes(currentPage);

  // ---------------------------------------------

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans selection:bg-indigo-500/30 ${isDarkMode ? 'dark bg-[#050505]' : 'bg-gray-50'}`}>
      
      {/* Background Ambience - Global */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-40 animate-blob"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-40 animate-blob animation-delay-2000"></div>
          <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] bg-pink-500/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen opacity-30 animate-blob animation-delay-4000"></div>
          {/* Noise texture overlay for texture */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 flex flex-col h-screen">
          {/* Chat Widget (Always available if Logged In) */}
          {isLoggedIn && <ChatWidget userStory={userStory} testCases={testCases} userPlan={userPlan} />}

          {/* Public Layout */}
          {isPublicPage && (
            <div className="dark flex flex-col h-full overflow-y-auto bg-[#050505] text-slate-200 selection:bg-indigo-500/30">
                <header className="sticky top-0 z-40 w-full backdrop-blur-xl border-b border-gray-200/50 dark:border-white/5 bg-white/70 dark:bg-[#050505]/70 transition-colors duration-300">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="relative group cursor-pointer" onClick={() => setCurrentPage('LANDING')}>
                                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
                                <div className="relative bg-white dark:bg-black rounded-lg p-2 ring-1 ring-gray-900/5 leading-none flex items-center justify-center">
                                    <Bot className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                                </div>
                            </div>
                            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 cursor-pointer" onClick={() => setCurrentPage('LANDING')}>
                            QA GenAI
                            </h1>
                        </div>
                        
                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-8 mr-8">
                          <button onClick={() => scrollToSection('features')} className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-white transition-colors">Features</button>
                          <button onClick={() => scrollToSection('pricing')} className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-white transition-colors">Pricing</button>
                          <button onClick={() => setCurrentPage('BLOG')} className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-white transition-colors">Blog</button>
                          <button onClick={() => setCurrentPage('ABOUT')} className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-white transition-colors">About</button>
                          <button onClick={() => setCurrentPage('CONTACT')} className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-white transition-colors">Contact</button>
                        </div>

                        <div className="flex items-center gap-4">
                            {isLoggedIn ? (
                                <button 
                                    onClick={() => setCurrentPage('APP')}
                                    className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
                                >
                                    Go to App
                                </button>
                            ) : (
                                <button 
                                    onClick={() => setShowAuthModal(true)}
                                    className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-white transition-colors"
                                >
                                    Sign In
                                </button>
                            )}
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-full bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 transition-all border border-transparent dark:border-white/5"
                                >
                                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                </header>
                <main className="flex-1">
                    {currentPage === 'LANDING' ? (
                      <LandingPage 
                          onGetStarted={() => setShowAuthModal(true)} 
                          onContactSales={() => setShowContactModal(true)} 
                      />
                    ) : (
                      <StaticPage type={currentPage} onNavigate={setCurrentPage} />
                    )}
                </main>
                <Footer onNavigate={setCurrentPage} />
            </div>
          )}

          {/* Authenticated App View (Split Layout) */}
          {!isPublicPage && (
            <div className="flex h-full overflow-hidden">
              <Sidebar 
                currentPage={currentPage}
                onNavigate={setCurrentPage}
                userPlan={userPlan}
                usageData={usageData}
                dailyLimit={DAILY_LIMIT_STARTER}
                onLogout={handleLogout}
                userProfile={userProfile}
                isDarkMode={isDarkMode}
                toggleTheme={toggleTheme}
                onUpgrade={() => { setUpgradeReason('LIMIT_REACHED'); setShowUpgradeModal(true); }}
              />

              <main className="flex-1 overflow-y-auto relative scroll-smooth bg-gray-50/50 dark:bg-[#050505]/50 backdrop-blur-sm">
                <div className="relative z-10 min-h-full flex flex-col">
                    {/* Mobile Header */}
                    <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200 dark:border-white/5 bg-white dark:bg-[#050505]">
                        <span className="font-bold text-gray-900 dark:text-white">QA GenAI</span>
                        <button><Menu className="w-6 h-6 text-gray-500" /></button>
                    </div>
                    
                    {renderContent()}
                </div>
              </main>
            </div>
          )}
      </div>

      {/* Global Modals */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        onLogin={handleLogin} 
      />
      <ContactModal 
        isOpen={showContactModal} 
        onClose={() => setShowContactModal(false)} 
      />
      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        onUpgrade={handleUpgrade}
        reason={upgradeReason}
      />
      <JiraExportModal 
        isOpen={showJiraModal}
        onClose={() => setShowJiraModal(false)}
        count={testCases.length}
      />
    </div>
  );
}
