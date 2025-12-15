
import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Code2, 
  CheckCircle2, 
  ArrowRight, 
  Cpu, 
  Share2,
  FileCode,
  ShieldCheck,
  Zap,
  Clock,
  Search,
  Layout,
  Play,
  Terminal
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
  onContactSales: () => void;
}

// Simulated App Animation Component
const AppSimulator = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 2500); // Cycle every 2.5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-5xl mx-auto mt-16 perspective-1000 group">
      <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-indigo-600 rounded-2xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
      
      <div className="relative bg-[#0F0F12] border border-white/10 rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-700 hover:scale-[1.01]">
        {/* Fake Window Header */}
        <div className="h-10 bg-[#1A1A1D] border-b border-white/5 flex items-center px-4 gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
          <div className="ml-4 px-3 py-1 bg-black/20 rounded-md text-[10px] text-gray-500 font-mono flex items-center gap-2">
            <ShieldCheck className="w-3 h-3" /> ZiaraQA Workspace
          </div>
        </div>

        {/* Content Area */}
        <div className="grid md:grid-cols-2 min-h-[400px]">
          
          {/* Left: Input Side */}
          <div className="p-8 border-r border-white/5 space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Input: User Story</label>
              <div className="bg-[#08080a] p-4 rounded-xl border border-white/5 min-h-[140px] font-mono text-sm text-gray-300 relative">
                <div className="absolute top-4 left-4 animate-typewriter overflow-hidden whitespace-nowrap border-r-2 border-fuchsia-500 pr-1">
                  As a user, I want to login via SSO...
                </div>
                {step >= 1 && (
                  <div className="mt-8 text-xs text-gray-500 animate-fade-in-up">
                    <span className="text-violet-400">Context:</span> Authentication System<br/>
                    <span className="text-violet-400">Priority:</span> Critical
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <div className={`h-2 rounded-full flex-1 transition-all duration-500 ${step === 0 ? 'bg-fuchsia-600' : 'bg-gray-800'}`}></div>
              <div className={`h-2 rounded-full flex-1 transition-all duration-500 ${step === 1 ? 'bg-fuchsia-600' : 'bg-gray-800'}`}></div>
              <div className={`h-2 rounded-full flex-1 transition-all duration-500 ${step >= 2 ? 'bg-fuchsia-600' : 'bg-gray-800'}`}></div>
            </div>

            <button className={`w-full py-3 rounded-xl font-bold text-sm transition-all duration-300 ${step >= 1 ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-fuchsia-500/20' : 'bg-white/5 text-gray-500'}`}>
              {step === 0 ? 'Analyzing...' : step === 1 ? 'Generating Assets...' : 'Complete'}
            </button>
          </div>

          {/* Right: Output Side */}
          <div className="p-8 bg-[#08080a] relative overflow-hidden">
            {step === 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4 opacity-50">
                  <Cpu className="w-12 h-12 text-gray-600 animate-pulse" />
                  <span className="text-sm text-gray-500">Waiting for input...</span>
                </div>
              </div>
            )}

            {step >= 1 && (
              <div className="space-y-4 animate-fade-in-up">
                <div className="flex items-center justify-between mb-4">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Generated Output</label>
                  <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold rounded-full border border-emerald-500/20">Success</span>
                </div>

                {/* Simulated Test Case */}
                <div className="bg-[#131316] p-3 rounded-lg border border-white/5 hover:border-violet-500/30 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold bg-violet-500/20 text-violet-300 px-1.5 py-0.5 rounded">TC-001</span>
                    <span className="text-xs font-medium text-white">Verify SSO Redirection</span>
                  </div>
                  <div className="space-y-1">
                    <div className="h-1.5 w-3/4 bg-gray-700 rounded"></div>
                    <div className="h-1.5 w-1/2 bg-gray-700 rounded"></div>
                  </div>
                </div>

                {/* Simulated Code Block */}
                {step >= 2 && (
                  <div className="bg-[#131316] rounded-lg border border-white/5 overflow-hidden animate-slide-in">
                    <div className="px-3 py-1.5 bg-black/20 border-b border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[10px] text-gray-400">
                        <Terminal className="w-3 h-3" />
                        login.spec.ts
                      </div>
                      <span className="text-[10px] text-indigo-400">Playwright</span>
                    </div>
                    <div className="p-3 font-mono text-[10px] text-gray-400 leading-relaxed">
                      <span className="text-fuchsia-400">test</span>('should login', <span className="text-fuchsia-400">async</span> (&#123; page &#125;) =&gt; &#123;<br/>
                      &nbsp;&nbsp;<span className="text-violet-400">await</span> page.goto('/login');<br/>
                      &nbsp;&nbsp;<span className="text-violet-400">await</span> page.click('#sso-btn');<br/>
                      &nbsp;&nbsp;<span className="text-violet-400">await</span> expect(page).toHaveURL('/dash');<br/>
                      &#125;);
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onContactSales }) => {
  return (
    <div className="flex flex-col gap-20 pb-16 animate-fade-in-up bg-[#030014] min-h-screen overflow-x-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="relative text-center pt-28 px-4 max-w-7xl mx-auto w-full z-10">
        {/* Ambient Background */}
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-violet-600/15 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
        <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] bg-fuchsia-600/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-fuchsia-300 text-sm font-medium mb-8 backdrop-blur-md hover:bg-white/10 transition-colors cursor-default shadow-[0_0_20px_rgba(232,121,249,0.15)]">
          <Sparkles className="w-4 h-4 fill-fuchsia-400 text-fuchsia-400" />
          <span>New: Multi-Framework Automation Export</span>
        </div>
        
        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.1] mb-6">
          ZiaraQA <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 animate-pulse-glow">
            AI Powered Test Case Generator
          </span>
        </h1>
        
        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
          Stop writing manual test cases by hand. ZiaraQA analyzes your requirements and instantly generates comprehensive test plans, BDD scenarios, and ready-to-run automation code.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={onGetStarted}
            className="group relative px-8 py-4 bg-white text-black hover:bg-gray-100 text-lg font-bold rounded-full transition-all duration-300 flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          >
            Start Generating Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={onContactSales}
            className="px-8 py-4 bg-white/5 text-white font-semibold rounded-full border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-sm"
          >
            Book a Demo
          </button>
        </div>

        {/* Live Simulator Visual */}
        <AppSimulator />

      </section>

      {/* --- HOW IT WORKS --- */}
      <section className="max-w-7xl mx-auto px-4 w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">From concept to code in four simple steps.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-violet-500/30 to-transparent"></div>

          {[
            { 
              step: '01', 
              title: 'Input Story', 
              desc: 'Paste your Jira ticket, user story, or requirements doc.',
              icon: FileCode
            },
            { 
              step: '02', 
              title: 'AI Analysis', 
              desc: 'Our model identifies happy paths, edge cases, and preconditions.',
              icon: Cpu
            },
            { 
              step: '03', 
              title: 'Generate', 
              desc: 'Get manual steps, BDD Gherkin files, and automation scripts.',
              icon: Zap
            },
            { 
              step: '04', 
              title: 'Export', 
              desc: 'Push directly to Jira or download as CSV/Code files.',
              icon: Share2
            }
          ].map((item, i) => (
            <div key={i} className="relative group">
              <div className="w-24 h-24 mx-auto bg-[#0F0E12] border border-white/10 rounded-full flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform duration-300 shadow-xl shadow-black">
                <div className="absolute inset-0 bg-violet-500/10 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <item.icon className="w-10 h-10 text-violet-400 group-hover:text-white transition-colors" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-xs font-bold text-white border-4 border-[#030014]">
                  {item.step}
                </div>
              </div>
              <div className="text-center mt-6">
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section className="bg-white/[0.02] border-y border-white/5 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Why Modern Teams Switch to ZiaraQA</h2>
              <p className="text-lg text-slate-400 leading-relaxed">
                Traditional QA processes are manual, slow, and prone to human error. We leverage Large Language Models (LLMs) to automate the thinking process, not just the execution.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: '10x Faster Coverage', desc: 'Generate 50+ test cases in the time it takes to write one manually.' },
                  { title: 'Reduce Human Error', desc: 'AI spots edge cases and logic gaps that humans often overlook.' },
                  { title: 'Instant Automation', desc: 'Skip the boilerplate. Get Playwright & Cypress code ready to commit.' }
                ].map((benefit, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1 w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0 border border-emerald-500/20">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-1">{benefit.title}</h4>
                      <p className="text-sm text-slate-400">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Comparison Visual */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-[#0F0E12] border border-white/10 rounded-3xl p-8 space-y-6">
                <div className="flex items-center justify-between border-b border-white/5 pb-6">
                  <h3 className="font-bold text-white">Manual Process</h3>
                  <span className="text-red-400 font-mono text-sm">2-4 Hours</span>
                </div>
                <div className="space-y-3 opacity-50">
                  <div className="h-2 bg-gray-700 rounded w-3/4"></div>
                  <div className="h-2 bg-gray-700 rounded w-1/2"></div>
                  <div className="h-2 bg-gray-700 rounded w-full"></div>
                </div>
                
                <div className="flex items-center justify-center py-4">
                  <ArrowRight className="w-6 h-6 text-gray-600 rotate-90" />
                </div>

                <div className="flex items-center justify-between border-b border-white/5 pb-6">
                  <h3 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">ZiaraQA</h3>
                  <span className="text-emerald-400 font-mono text-sm font-bold">~15 Seconds</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-violet-500/10 border border-violet-500/20 p-3 rounded-lg">
                    <div className="w-full h-10 bg-violet-500/20 rounded animate-pulse"></div>
                  </div>
                  <div className="bg-fuchsia-500/10 border border-fuchsia-500/20 p-3 rounded-lg">
                    <div className="w-full h-10 bg-fuchsia-500/20 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURES GRID --- */}
      <section id="features" className="max-w-7xl mx-auto px-4 w-full scroll-mt-24">
        <div className="text-center mb-16">
             <h2 className="text-3xl font-bold text-white mb-4">Complete QA Coverage</h2>
             <p className="text-slate-400">From manual steps to executable code.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          
          {/* Feature 1 - Manual Testing (Large) */}
          <div className="md:col-span-2 group relative p-8 rounded-3xl bg-[#0b0a14] border border-white/5 overflow-hidden hover:border-violet-500/50 transition-colors">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 h-full flex flex-col justify-between">
               <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-violet-500/10 rounded-xl flex items-center justify-center border border-violet-500/20">
                        <CheckCircle2 className="w-6 h-6 text-violet-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Manual Test Cases</h3>
                  </div>
                  <p className="text-slate-400 max-w-md mb-6 leading-relaxed">
                    AI analyzes requirements to generate comprehensive steps including <span className="text-violet-300 font-semibold">Pre-conditions</span>, <span className="text-fuchsia-300 font-semibold">Test Data</span>, and <span className="text-indigo-300 font-semibold">Expected Results</span>.
                  </p>
                  <div className="flex flex-wrap gap-2">
                     <span className="px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs font-semibold text-violet-300">Happy Path</span>
                     <span className="px-3 py-1 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 text-xs font-semibold text-fuchsia-300">Negative Scenarios</span>
                     <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-300">Edge Cases</span>
                  </div>
               </div>
            </div>
          </div>

          {/* Feature 2 - Automation (Tall) */}
          <div className="md:row-span-2 group relative p-8 rounded-3xl bg-[#0b0a14] border border-white/5 overflow-hidden hover:border-fuchsia-500/50 transition-colors flex flex-col">
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500 pointer-events-none">
               <Cpu className="w-48 h-48 text-fuchsia-500" />
             </div>
             <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-fuchsia-500/10 rounded-xl flex items-center justify-center border border-fuchsia-500/20">
                        <Code2 className="w-6 h-6 text-fuchsia-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Automation Scripts</h3>
                </div>
                <p className="text-slate-400 leading-relaxed mb-6 text-sm">
                  Convert manual steps into runnable code instantly. Supports Page Object Model pattern.
                </p>
                <div className="space-y-3">
                    {['Playwright (TS)', 'Cypress (JS)', 'Selenium (Java)', 'Selenium (Python)'].map(fw => (
                        <div key={fw} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 group-hover:bg-white/10 transition-colors">
                            <div className="w-2 h-2 bg-fuchsia-400 rounded-full shadow-[0_0_8px_rgba(232,121,249,0.8)]"></div>
                            <span className="text-sm text-slate-300 font-mono font-medium">{fw}</span>
                        </div>
                    ))}
                </div>
             </div>
          </div>

          {/* Feature 3 - BDD */}
          <div className="group relative p-8 rounded-3xl bg-[#0b0a14] border border-white/5 overflow-hidden hover:border-emerald-500/50 transition-colors">
            <div className="relative z-10">
               <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20">
                      <FileCode className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">BDD Scenarios</h3>
               </div>
               <p className="text-slate-400 text-sm mb-4">
                 Auto-generated <strong className="text-emerald-400">Gherkin</strong> syntax (Given-When-Then) ready for Cucumber or SpecFlow.
               </p>
            </div>
          </div>

          {/* Feature 4 - Collaboration */}
          <div className="group relative p-8 rounded-3xl bg-[#0b0a14] border border-white/5 overflow-hidden hover:border-blue-500/50 transition-colors">
            <div className="relative z-10">
               <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-500/20">
                      <Share2 className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Collaboration</h3>
               </div>
               <p className="text-slate-400 text-sm mb-4">
                 One-click export to <strong>Jira</strong>, CSV, or share via Team Workspace.
               </p>
            </div>
          </div>

        </div>
      </section>

      {/* --- PRICING SECTION --- */}
      <section id="pricing" className="max-w-7xl mx-auto px-4 w-full text-center space-y-10 scroll-mt-24 z-10 pb-20">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-white">Transparent Pricing</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Start free, upgrade when you scale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          
          {/* Free Tier */}
          <div className="p-8 rounded-3xl bg-[#0b0a14] border border-white/5 flex flex-col items-start text-left hover:bg-white/5 transition-colors group">
            <h3 className="text-lg font-medium text-white">Starter</h3>
            <div className="mt-4 mb-6">
              <span className="text-4xl font-bold text-white">$0</span>
              <span className="text-slate-500">/mo</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1 w-full text-slate-400 text-sm">
              <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-slate-600" /> 5 Stories / day</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-slate-600" /> Manual Test Cases</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-slate-600" /> 24-hour History Retention</li>
            </ul>
            <button onClick={onGetStarted} className="w-full py-3 px-4 rounded-xl border border-white/10 font-semibold text-white hover:bg-white/10 transition-colors">
              Get Started
            </button>
            <p className="text-[10px] text-slate-600 mt-3 text-center w-full group-hover:text-slate-500 transition-colors">Perfect for hobbyists</p>
          </div>

          {/* Pro Tier (Glowing) */}
          <div className="relative p-8 rounded-3xl bg-[#0f0e1a] border border-violet-500/50 flex flex-col items-start text-left shadow-[0_0_50px_-15px_rgba(139,92,246,0.3)] transform md:-translate-y-4 hover:shadow-[0_0_80px_-10px_rgba(139,92,246,0.4)] transition-all">
            <div className="absolute top-0 right-0 p-4">
              <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">Popular</span>
            </div>
            <h3 className="text-lg font-medium text-white">Pro</h3>
            <div className="mt-4 mb-6">
              <span className="text-4xl font-bold text-white">$29</span>
              <span className="text-violet-300">/mo</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1 w-full text-violet-100/90 text-sm">
              <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-violet-400" /> <span className="font-semibold">Unlimited</span> Generations</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-violet-400" /> <span className="font-semibold">Automation Scripts</span> & BDD</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-violet-400" /> Permanent History Archive</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-violet-400" /> Export to Code</li>
            </ul>
            <button onClick={onGetStarted} className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold hover:opacity-90 transition-opacity shadow-lg shadow-violet-500/25">
              Start Free Trial
            </button>
          </div>

          {/* Enterprise Tier */}
          <div className="p-8 rounded-3xl bg-[#0b0a14] border border-white/5 flex flex-col items-start text-left hover:bg-white/5 transition-colors">
            <h3 className="text-lg font-medium text-white">Enterprise</h3>
            <div className="mt-4 mb-6">
              <span className="text-4xl font-bold text-white">$99</span>
              <span className="text-slate-500">/mo</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1 w-full text-slate-400 text-sm">
              <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-white" /> SSO & Admin Controls</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-white" /> Advanced Security & Privacy</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-white" /> Custom Jira Integrations</li>
            </ul>
            <button onClick={onContactSales} className="w-full py-3 px-4 rounded-xl border border-white/10 font-semibold text-white hover:bg-white/10 transition-colors">
              Contact Sales
            </button>
          </div>

        </div>
      </section>

      {/* --- CTA FOOTER --- */}
      <section className="text-center py-20 bg-gradient-to-t from-violet-900/10 to-transparent">
        <h2 className="text-3xl font-bold text-white mb-6">Ready to ship quality faster?</h2>
        <button 
          onClick={onGetStarted}
          className="px-10 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform shadow-2xl"
        >
          Get Started for Free
        </button>
      </section>

    </div>
  );
};
