
import React from 'react';
import { 
  Sparkles, 
  Code2, 
  CheckCircle2, 
  ArrowRight, 
  Cpu, 
  Users,
  History,
  Zap,
  ShieldCheck,
  FileCode,
  Share2
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
  onContactSales: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onContactSales }) => {
  return (
    <div className="flex flex-col gap-8 pb-8 animate-fade-in-up bg-[#030014] min-h-screen overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative text-center space-y-6 pt-10 sm:pt-10 px-4 max-w-7xl mx-auto w-full z-10">
        {/* Spotlights */}
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-violet-600/20 rounded-full blur-[120px] opacity-40 mix-blend-screen pointer-events-none"></div>
        <div className="absolute top-[10%] left-[20%] w-[400px] h-[400px] bg-fuchsia-600/10 rounded-full blur-[100px] opacity-30 mix-blend-screen pointer-events-none"></div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-fuchsia-300 text-sm font-medium mb-4 backdrop-blur-md shadow-[0_0_15px_rgba(232,121,249,0.3)]">
          <Sparkles className="w-4 h-4 fill-fuchsia-400 text-fuchsia-400" />
          <span>Next-Gen AI Testing</span>
        </div>
        
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.1]">
          Manual Tests. <br className="hidden sm:block"/>
          BDD Scenarios. <br className="hidden sm:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 animate-pulse-glow">
            Automation Scripts.
          </span>
        </h1>
        
        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Transform user stories into comprehensive test plans with <strong className="text-slate-200">priority</strong>, <strong className="text-slate-200">severity</strong>, and <strong className="text-slate-200">edge cases</strong> covered.
          Stop writing boilerplate. Start shipping quality.
        </p>
        
        <div className="flex flex-col items-center gap-4 pt-4">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
                onClick={onGetStarted}
                className="group relative px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-lg font-bold rounded-full shadow-[0_0_40px_-10px_rgba(139,92,246,0.5)] hover:shadow-[0_0_60px_-10px_rgba(139,92,246,0.6)] transition-all duration-300 flex items-center gap-2"
            >
                Start Generating Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-white/5 text-white font-semibold rounded-full border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-sm"
            >
                See Sample Output
            </button>
            </div>
            <p className="text-xs text-slate-500 font-medium">Free 5 stories/day • No credit card required</p>
        </div>

        {/* Stats Strip */}
        <div className="pt-12 border-t border-white/5 w-full mt-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Test Cases Generated', value: '10k+' },
            { label: 'QA Time Saved', value: '99%', highlight: true },
            { label: 'Automation Frameworks', value: '4+' },
            { label: 'System Uptime', value: '99.9%' },
          ].map((stat, i) => (
             <div key={i} className="flex flex-col items-center">
                <span className={`text-2xl font-bold ${stat.highlight ? 'text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400' : 'text-white'}`}>{stat.value}</span>
                <span className="text-sm text-slate-500">{stat.label}</span>
             </div>
          ))}
        </div>
      </section>

      {/* Features Bento Grid */}
      <section id="features" className="max-w-7xl mx-auto px-6 w-full scroll-mt-28 z-20">
        <div className="text-center mb-10 space-y-2">
             <h2 className="text-3xl font-bold text-white">Complete QA Coverage</h2>
             <p className="text-slate-400">From manual steps to executable code.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Feature 1 - Manual Testing (Large) */}
          <div className="md:col-span-2 group relative p-8 rounded-3xl bg-[#0b0a14] border border-white/5 overflow-hidden hover:border-violet-500/50 transition-colors h-full min-h-[300px]">
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
                     <span className="px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs font-semibold text-violet-300 shadow-[0_0_10px_rgba(139,92,246,0.2)]">Happy Path</span>
                     <span className="px-3 py-1 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 text-xs font-semibold text-fuchsia-300 shadow-[0_0_10px_rgba(232,121,249,0.2)]">Negative Scenarios</span>
                     <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-300 shadow-[0_0_10px_rgba(99,102,241,0.2)]">Edge Cases</span>
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

      {/* Pricing Section - Glass Cards */}
      <section id="pricing" className="max-w-7xl mx-auto px-4 w-full text-center space-y-10 scroll-mt-24 z-10">
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

      {/* Trust Footer */}
      <section className="text-center py-8 border-t border-white/5 z-10">
        <p className="text-slate-500 text-sm flex items-center justify-center gap-2 mb-4">
            <ShieldCheck className="w-4 h-4" />
            <span>Built by QA Engineers. No training on your data.</span>
        </p>
      </section>

    </div>
  );
};
