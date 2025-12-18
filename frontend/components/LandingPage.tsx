
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
  Server,
  Database,
  Terminal,
  Lock
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
          <span>New: Code-to-Test & API Generators</span>
        </div>
        
        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.1] mb-6">
          ZiaraQA <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 animate-pulse-glow">
            AI Powered Test Engineering
          </span>
        </h1>
        
        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
          Turn User Stories into production test suites. Generate manual steps, automation code, synthetic data, and API tests in seconds.
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

      {/* --- FEATURES GRID --- */}
      <section id="features" className="max-w-7xl mx-auto px-4 w-full scroll-mt-24">
        <div className="text-center mb-16">
             <h2 className="text-3xl font-bold text-white mb-4">Platform Capabilities</h2>
             <p className="text-slate-400">Everything you need to ship quality software faster.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-8 rounded-3xl bg-[#0b0a14] border border-white/5 hover:border-fuchsia-500/50 transition-colors">
            <div className="w-12 h-12 bg-fuchsia-500/10 rounded-xl flex items-center justify-center mb-4 border border-fuchsia-500/20">
               <Database className="w-6 h-6 text-fuchsia-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Synthetic Data Factory</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Generate realistic and context-aware test data using natural language prompts. Valid Indian mobile numbers, Stripe-safe cards, and more.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#0b0a14] border border-white/5 hover:border-blue-500/50 transition-colors">
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4 border border-blue-500/20">
               <FileCode className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Code-to-Test</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Developers can paste React components or Node.js functions, and AI automatically generates clean Unit Tests (Jest/Mocha).
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#0b0a14] border border-white/5 hover:border-orange-500/50 transition-colors">
            <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mb-4 border border-orange-500/20">
               <Server className="w-6 h-6 text-orange-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">API Test Generator</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Input a Swagger/OpenAPI URL and automatically generate a Postman Collection with positive and negative test assertions.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#0b0a14] border border-white/5 hover:border-violet-500/50 transition-colors">
            <div className="w-12 h-12 bg-violet-500/10 rounded-xl flex items-center justify-center mb-4 border border-violet-500/20">
               <CheckCircle2 className="w-6 h-6 text-violet-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Requirement Refiner</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              AI analyzes your user story before generation, highlighting ambiguities and missing edge cases to prevent assumptions.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#0b0a14] border border-white/5 hover:border-indigo-500/50 transition-colors">
            <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-4 border border-indigo-500/20">
               <Cpu className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Automation Scripts</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Convert manual steps into runnable code instantly. Supports Playwright, Cypress, and Selenium (Java/Python).
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#0b0a14] border border-white/5 hover:border-emerald-500/50 transition-colors">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4 border border-emerald-500/20">
               <Share2 className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Jira Integration</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              One-click ticket creation. Push your generated test cases directly to your Jira project (Pro Plan).
            </p>
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
              <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-slate-600" /> 5 User Stories / day</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-slate-600" /> Manual Test Cases</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-slate-600" /> 1 Selenium Framework</li>
              <li className="flex items-center gap-3"><Lock className="w-4 h-4 text-gray-500" /> Limited Data Factory (1/day)</li>
            </ul>
            <button onClick={onGetStarted} className="w-full py-3 px-4 rounded-xl border border-white/10 font-semibold text-white hover:bg-white/10 transition-colors">
              Get Started
            </button>
            <p className="text-[10px] text-slate-600 mt-3 text-center w-full">Perfect for students & beginners</p>
          </div>

          {/* Pro Tier (Glowing) */}
          <div className="relative p-8 rounded-3xl bg-[#0f0e1a] border border-violet-500/50 flex flex-col items-start text-left shadow-[0_0_50px_-15px_rgba(139,92,246,0.3)] transform md:-translate-y-4 hover:shadow-[0_0_80px_-10px_rgba(139,92,246,0.4)] transition-all">
            <div className="absolute top-0 right-0 p-4">
              <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">Best Seller</span>
            </div>
            <h3 className="text-lg font-medium text-white">Professional</h3>
            <div className="mt-4 mb-6">
              <span className="text-4xl font-bold text-white">$15</span>
              <span className="text-violet-300">/mo</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1 w-full text-violet-100/90 text-sm">
              <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-violet-400" /> <span className="font-semibold">Unlimited</span> Generations</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-violet-400" /> Cypress & Playwright</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-violet-400" /> <span className="font-semibold">Data Factory</span> & Refiner</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-violet-400" /> Code-to-Test Generator</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-violet-400" /> Jira Integration</li>
            </ul>
            <button onClick={onGetStarted} className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold hover:opacity-90 transition-opacity shadow-lg shadow-violet-500/25">
              Start Free Trial
            </button>
          </div>

          {/* Agency Tier */}
          <div className="p-8 rounded-3xl bg-[#0b0a14] border border-white/5 flex flex-col items-start text-left hover:bg-white/5 transition-colors">
            <h3 className="text-lg font-medium text-white">Agency / Team</h3>
            <div className="mt-4 mb-6">
              <span className="text-4xl font-bold text-white">$49</span>
              <span className="text-slate-500">/mo</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1 w-full text-slate-400 text-sm">
              <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-white" /> 5 Team Members</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-white" /> <span className="font-bold text-orange-400">Swagger to Postman</span></li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-white" /> Shared Workspace</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-white" /> Priority 24h Support</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-white" /> Privacy Mode (No AI Training)</li>
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
