
import React, { useState } from 'react';
import { Page } from '../types';
import { 
  Shield, 
  Lock, 
  Eye, 
  FileText, 
  Server, 
  Globe, 
  Users, 
  Award, 
  Heart, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Cloud, 
  Mail, 
  MapPin, 
  Phone, 
  MessageSquare, 
  Briefcase,
  Terminal,
  Cpu,
  Layout,
  GitBranch,
  Box,
  Zap,
  Layers,
  Code2,
  BookOpen,
  Calendar,
  ChevronRight,
  Search,
  Key,
  Webhook,
  Database,
  Copy,
  Check,
  Menu,
  X,
  Bot
} from 'lucide-react';

interface StaticPageProps {
  type: Page;
  onNavigate?: (page: Page) => void;
}

// --- Helper Components ---

const SectionHeader = ({ title, subtitle, label }: { title: string, subtitle: string, label?: string }) => (
  <div className="text-center space-y-6 max-w-3xl mx-auto mb-16">
    {label && (
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 text-xs font-bold uppercase tracking-widest mb-2 border border-violet-100 dark:border-violet-500/20">
        {label}
      </div>
    )}
    <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
      {title}
    </h1>
    <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
      {subtitle}
    </p>
  </div>
);

const CodeBlock = ({ code, language = 'bash' }: { code: string, language?: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-xl overflow-hidden bg-[#1e1e24] border border-white/5 shadow-2xl">
      <div className="flex items-center justify-between px-4 py-2 bg-[#2a2a30] border-b border-white/5">
        <span className="text-xs font-mono text-gray-400">{language}</span>
        <button onClick={handleCopy} className="text-gray-400 hover:text-white transition-colors">
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm font-mono text-gray-300 leading-relaxed">
          {code}
        </pre>
      </div>
    </div>
  );
};

const Endpoint = ({ method, path, description }: { method: string, path: string, description: string }) => (
  <div className="border border-gray-200 dark:border-white/10 rounded-xl p-6 bg-gray-50 dark:bg-[#131316]">
    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
      <span className={`px-3 py-1 rounded-lg text-xs font-bold font-mono uppercase ${
        method === 'GET' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400' :
        method === 'POST' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' :
        method === 'DELETE' ? 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400' :
        'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400'
      }`}>
        {method}
      </span>
      <code className="text-sm font-mono text-gray-900 dark:text-white bg-white dark:bg-black/30 px-2 py-1 rounded border border-gray-200 dark:border-white/10">
        {path}
      </code>
    </div>
    <p className="text-gray-600 dark:text-gray-400 text-sm">
      {description}
    </p>
  </div>
);

const LegalLayout = ({ title, lastUpdated, children, onNavigate }: any) => (
  <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12 animate-fade-in-up">
    {/* Sidebar Navigation for Legal Docs */}
    <div className="lg:w-64 flex-shrink-0">
       <div className="sticky top-24 space-y-8">
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 px-2">Legal Center</h3>
            <nav className="space-y-1">
               {[
                 { id: 'PRIVACY', label: 'Privacy Policy' },
                 { id: 'TERMS', label: 'Terms of Service' },
                 { id: 'SECURITY', label: 'Security Policy' },
                 { id: 'COOKIES', label: 'Cookie Policy' }
               ].map(item => (
                 <button
                   key={item.id}
                   onClick={() => onNavigate(item.id)}
                   className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                     title === item.label 
                      ? 'bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300' 
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
                   }`}
                 >
                   {item.label}
                 </button>
               ))}
            </nav>
          </div>
          <div className="bg-indigo-50 dark:bg-indigo-500/10 p-4 rounded-xl border border-indigo-100 dark:border-indigo-500/20">
             <p className="text-xs text-indigo-800 dark:text-indigo-200 mb-2 font-semibold">Questions?</p>
             <p className="text-xs text-indigo-600 dark:text-indigo-300 mb-3">
               Contact our legal team for clarifications.
             </p>
             <a href="mailto:legal@ziaraqa.com" className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">legal@ziaraqa.com</a>
          </div>
       </div>
    </div>

    {/* Main Content */}
    <div className="flex-1 max-w-3xl">
       <div className="mb-10 border-b border-gray-200 dark:border-white/10 pb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">{title}</h1>
          <p className="text-gray-500 dark:text-gray-400 font-mono text-sm">Last updated: {lastUpdated}</p>
       </div>
       <div className="prose prose-lg prose-indigo dark:prose-invert max-w-none">
          {children}
       </div>
    </div>
  </div>
);

// --- Main Component ---

export const StaticPage: React.FC<StaticPageProps> = ({ type, onNavigate }) => {
  const handleCtaClick = () => {
    if (onNavigate) {
      onNavigate('LANDING');
    }
  };

  const renderContent = () => {
    switch (type) {
      // ---------------- ABOUT PAGE ----------------
      case 'ABOUT':
        return (
          <div className="max-w-7xl mx-auto px-6 py-12 space-y-24 animate-fade-in-up">
            <SectionHeader 
              label="Our Mission"
              title="The End of Boilerplate"
              subtitle="We transform User Stories into rigorous Manual Test Cases, Gherkin Scenarios, and production-ready Automation Scripts. Stop translating requirements manually. Start shipping quality software."
            />

            {/* Origin Story Grid */}
            <div className="grid md:grid-cols-2 gap-12 items-center bg-gray-50 dark:bg-[#0f0e1a] p-10 rounded-[2.5rem] border border-gray-100 dark:border-white/5">
               <div className="space-y-8">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Why We Built This</h2>
                  <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    <p>
                       For years, QA engineers have been stuck in a loop: Read a Jira ticket, write the same test steps in a spreadsheet, translate them into Gherkin, and then write the boilerplate code for automation. It's tedious, error-prone, and slow.
                    </p>
                    <p>
                       We built ZiaraQA to break this cycle. We believe QA talent should be focused on <strong>exploratory testing, strategy, and complex edge cases</strong>—not on writing documentation that an AI can generate in seconds.
                    </p>
                    <p>
                       Our models are fine-tuned specifically on millions of high-quality test plans and automation repositories, ensuring that the output isn't just generic text—it's executable, reliable engineering work.
                    </p>
                  </div>
               </div>
               <div className="relative h-full min-h-[400px] bg-white dark:bg-[#08080a] rounded-2xl border border-gray-200 dark:border-white/10 p-8 shadow-2xl transform md:rotate-2 hover:rotate-0 transition-transform duration-500 flex flex-col justify-center">
                   {/* Abstract Representation of the AI Engine */}
                   <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-fuchsia-500/5 rounded-2xl"></div>
                   <div className="relative space-y-4">
                      <div className="flex items-center gap-3 mb-6">
                         <div className="w-12 h-12 rounded-xl bg-violet-600 flex items-center justify-center">
                            <Bot className="w-6 h-6 text-white" />
                         </div>
                         <div>
                            <div className="h-2 w-24 bg-gray-200 dark:bg-white/10 rounded mb-2"></div>
                            <div className="h-2 w-16 bg-gray-200 dark:bg-white/10 rounded"></div>
                         </div>
                      </div>
                      <div className="space-y-2">
                         <div className="h-2 w-full bg-gray-100 dark:bg-white/5 rounded"></div>
                         <div className="h-2 w-5/6 bg-gray-100 dark:bg-white/5 rounded"></div>
                         <div className="h-2 w-4/6 bg-gray-100 dark:bg-white/5 rounded"></div>
                      </div>
                      <div className="p-4 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg border border-emerald-100 dark:border-emerald-500/20 mt-6">
                         <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-bold mb-2">
                            <CheckCircle2 className="w-4 h-4" /> TEST PASSED
                         </div>
                         <div className="h-1.5 w-full bg-emerald-200 dark:bg-emerald-500/20 rounded-full overflow-hidden">
                            <div className="h-full w-full bg-emerald-500"></div>
                         </div>
                      </div>
                   </div>
                   {/* Badge */}
                   <div className="absolute -bottom-6 -right-6 bg-violet-600 text-white px-6 py-3 rounded-xl shadow-xl text-sm font-bold transform -rotate-3 border-4 border-white dark:border-[#030014]">
                      Built by Engineers, for Engineers
                   </div>
               </div>
            </div>

            {/* Philosophy Cards */}
            <div className="space-y-12">
               <div className="text-center max-w-2xl mx-auto">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Core Philosophy</h2>
                  <p className="text-gray-500 dark:text-gray-400 mt-4 text-lg">More than just a generator. A complete quality methodology.</p>
               </div>
               <div className="grid md:grid-cols-3 gap-8">
                  {[
                    { icon: Users, color: 'violet', title: 'Collaborative Intelligence', desc: 'QA is a team sport. We provide shared workspaces, role-based access control, and immutable history logs so your entire team stays in sync.' },
                    { icon: Award, color: 'fuchsia', title: 'Precision Engineering', desc: "We don't hallucinate quality. Our models are tuned to identify edge cases, negative scenarios, and security boundaries that humans often miss." },
                    { icon: Globe, color: 'emerald', title: 'Proven Scale', desc: 'Trusted by modern engineering teams. Over 100,000+ test steps and 50,000+ lines of automation code generated to date.' }
                  ].map((card, i) => (
                    <div key={i} className="p-8 bg-white dark:bg-[#0f0e1a] rounded-3xl border border-gray-200 dark:border-white/5 shadow-sm hover:border-violet-500/30 transition-all group hover:-translate-y-1">
                       <div className={`w-14 h-14 bg-${card.color}-100 dark:bg-${card.color}-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                          <card.icon className={`w-7 h-7 text-${card.color}-600 dark:text-${card.color}-400`} />
                       </div>
                       <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{card.title}</h3>
                       <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          {card.desc}
                       </p>
                    </div>
                  ))}
               </div>
            </div>

            {/* Trust & Ethics */}
            <div className="bg-gradient-to-br from-violet-900 to-slate-900 dark:from-violet-950/40 dark:to-slate-950/40 rounded-[2.5rem] p-8 md:p-16 text-center space-y-8 relative overflow-hidden border border-violet-500/20">
               <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
               <div className="relative z-10">
                  <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-8 backdrop-blur-sm border border-white/10">
                     <Shield className="w-10 h-10 text-violet-300" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Your Data is Yours. Period.</h2>
                  <p className="text-violet-200 max-w-3xl mx-auto leading-relaxed text-xl">
                     We are built by QA engineers who understand the importance of IP. We do not use your proprietary user stories or test data to train our public models. All processing is ephemeral and enterprise-grade encrypted.
                  </p>
               </div>
            </div>
            
            {/* CTA */}
            <div className="text-center pt-8 pb-12">
               <p className="text-gray-500 dark:text-gray-400 mb-8 font-medium text-lg">Ready to upgrade your QA workflow?</p>
               <button 
                  onClick={handleCtaClick}
                  className="inline-flex items-center gap-3 px-10 py-5 bg-violet-600 hover:bg-violet-500 text-white font-bold text-lg rounded-full transition-all shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:shadow-[0_0_40px_rgba(139,92,246,0.6)] transform hover:-translate-y-1"
               >
                  Start Generating Free
                  <ArrowRight className="w-6 h-6" />
               </button>
            </div>
          </div>
        );

      // ---------------- CAREERS PAGE ----------------
      case 'CAREERS':
        return (
          <div className="max-w-7xl mx-auto px-6 py-12 animate-fade-in-up">
            <SectionHeader 
              label="Join the Team"
              title="Build the future of QA"
              subtitle="We are a team of engineers, designers, and testers obsessed with quality. We're building the tools we wish we had."
            />

            {/* Culture Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-20">
               <div className="p-10 bg-white dark:bg-[#0f0e1a] rounded-[2rem] border border-gray-200 dark:border-white/5 h-full">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Our Culture</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8 text-lg">
                    We believe in "Engineering First". Everyone at ZiaraQA codes, tests, and deploys. We value autonomy, deep work, and shipping fast without breaking things.
                  </p>
                  <ul className="space-y-4">
                     {['Remote-first DNA (Work from anywhere)', 'Zero bureaucracy / Flat hierarchy', 'Open source contributors', 'Competitive Equity & Salary'].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-gray-700 dark:text-gray-300 font-medium">
                           <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center">
                              <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                           </div>
                           {item}
                        </li>
                     ))}
                  </ul>
               </div>
               <div className="p-10 bg-indigo-900 dark:bg-[#13131f] rounded-[2rem] border border-indigo-800 dark:border-white/5 relative overflow-hidden flex flex-col justify-between text-white">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full filter blur-[100px] opacity-20"></div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-6">Perks & Benefits</h3>
                    <div className="grid grid-cols-2 gap-6">
                        {[
                          { icon: Heart, label: 'Full Health & Dental' },
                          { icon: Globe, label: 'Remote Stipend' },
                          { icon: BookOpen, label: 'Learning Budget' },
                          { icon: Calendar, label: 'Unlimited PTO' }
                        ].map((perk, i) => (
                          <div key={i} className="flex flex-col gap-2">
                             <perk.icon className="w-6 h-6 text-indigo-300" />
                             <span className="text-indigo-100 font-medium">{perk.label}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="mt-8 pt-8 border-t border-white/10 relative z-10">
                     <p className="text-indigo-200 mb-2 font-medium">Want to be the first to know?</p>
                     <a href="#" className="inline-flex items-center gap-2 text-white font-bold hover:underline">
                        Follow us on LinkedIn <ArrowRight className="w-4 h-4" />
                     </a>
                  </div>
               </div>
            </div>

            {/* Job Openings */}
            <div className="max-w-4xl mx-auto">
               <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Open Positions</h2>
               <div className="space-y-4">
                  {[
                    { role: 'Senior Frontend Engineer', type: 'Engineering', loc: 'Remote (US/EU)', tag: 'React / TS' },
                    { role: 'Machine Learning Engineer', type: 'AI Research', loc: 'San Francisco / Remote', tag: 'Python / PyTorch' },
                    { role: 'Founding Product Designer', type: 'Design', loc: 'Remote', tag: 'Figma' },
                    { role: 'Developer Advocate', type: 'Marketing', loc: 'Remote', tag: 'Content' }
                  ].map((job, i) => (
                    <div key={i} className="group flex items-center justify-between p-6 bg-white dark:bg-[#0f0e1a] border border-gray-200 dark:border-white/5 rounded-2xl hover:border-violet-500/30 hover:shadow-lg transition-all cursor-pointer">
                       <div className="flex items-center gap-6">
                          <div className="hidden sm:flex w-12 h-12 rounded-xl bg-gray-50 dark:bg-white/5 items-center justify-center font-bold text-gray-400 group-hover:text-violet-500 transition-colors">
                             {job.role.charAt(0)}
                          </div>
                          <div>
                             <h4 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-violet-500 transition-colors">{job.role}</h4>
                             <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mt-1">
                                <span>{job.type}</span>
                                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                <span>{job.loc}</span>
                             </div>
                          </div>
                       </div>
                       <div className="flex items-center gap-4">
                          <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-gray-100 dark:bg-white/10 text-xs font-medium text-gray-600 dark:text-gray-300">
                             {job.tag}
                          </span>
                          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-violet-500 transition-colors" />
                       </div>
                    </div>
                  ))}
               </div>
               <div className="mt-8 text-center">
                  <p className="text-gray-500 dark:text-gray-400">Don't see your role? <a href="#" className="text-violet-600 dark:text-violet-400 font-bold hover:underline">Email us your resume</a>.</p>
               </div>
            </div>
          </div>
        );

      // ---------------- CONTACT PAGE ----------------
      case 'CONTACT':
        return (
          <div className="max-w-7xl mx-auto px-6 py-12 animate-fade-in-up">
             <SectionHeader 
               title="Get in touch"
               subtitle="Have questions about our pricing, enterprise plans, or just want to say hello? We'd love to hear from you."
             />

             <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-start">
                {/* Contact Info Side */}
                <div className="space-y-12">
                   <div className="grid gap-6">
                      <div className="flex items-start gap-5 p-6 rounded-2xl bg-white dark:bg-[#0f0e1a] border border-gray-200 dark:border-white/5 hover:border-violet-500/30 transition-colors">
                         <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                            <Mail className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                         </div>
                         <div>
                            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">Email</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">Our friendly team is here to help.</p>
                            <a href="mailto:support@ziaraqa.com" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">support@ziaraqa.com</a>
                         </div>
                      </div>
                      
                      <div className="flex items-start gap-5 p-6 rounded-2xl bg-white dark:bg-[#0f0e1a] border border-gray-200 dark:border-white/5 hover:border-violet-500/30 transition-colors">
                         <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                            <MapPin className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                         </div>
                         <div>
                            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">Office</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">Come say hello at our HQ.</p>
                            <p className="text-gray-900 dark:text-gray-200 text-sm font-medium">100 Spear Street, Suite 500<br/>San Francisco, CA 94105</p>
                         </div>
                      </div>

                      <div className="flex items-start gap-5 p-6 rounded-2xl bg-white dark:bg-[#0f0e1a] border border-gray-200 dark:border-white/5 hover:border-violet-500/30 transition-colors">
                         <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                            <Phone className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                         </div>
                         <div>
                            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">Phone</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">Mon-Fri from 8am to 5pm.</p>
                            <a href="tel:+15550000000" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">+1 (555) 000-0000</a>
                         </div>
                      </div>
                   </div>

                   {/* FAQ Section */}
                   <div className="space-y-6">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Frequently Asked Questions</h3>
                      <div className="space-y-4">
                         {[
                           { q: "Can I use ZiaraQA for free?", a: "Yes! Our Starter plan includes 5 free generations per day." },
                           { q: "Is my data secure?", a: "Absolutely. We use enterprise-grade encryption and do not train on your data." },
                           { q: "Do you offer custom enterprise contracts?", a: "Yes, for teams larger than 20, we offer custom billing and SLAs." }
                         ].map((faq, i) => (
                           <div key={i} className="border-b border-gray-200 dark:border-white/5 pb-4">
                              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{faq.q}</h4>
                              <p className="text-gray-600 dark:text-gray-400 text-sm">{faq.a}</p>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>

                {/* Contact Form */}
                <div className="bg-white dark:bg-[#0f0e1a] p-8 md:p-10 rounded-[2rem] border border-gray-200 dark:border-white/10 shadow-2xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500 rounded-full filter blur-[120px] opacity-10 pointer-events-none"></div>
                   
                   <form className="space-y-6 relative z-10" onSubmit={(e) => { e.preventDefault(); alert('Message sent!'); }}>
                      <div className="grid grid-cols-2 gap-6">
                         <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">First name</label>
                            <input type="text" className="w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 dark:text-white transition-all" placeholder="Jane" />
                         </div>
                         <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Last name</label>
                            <input type="text" className="w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 dark:text-white transition-all" placeholder="Doe" />
                         </div>
                      </div>
                      <div>
                         <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Email</label>
                         <input type="email" className="w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 dark:text-white transition-all" placeholder="you@company.com" />
                      </div>
                      <div>
                         <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                         <select className="w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 dark:text-white transition-all appearance-none cursor-pointer">
                            <option>General Inquiry</option>
                            <option>Sales / Enterprise</option>
                            <option>Support</option>
                            <option>Partnership</option>
                         </select>
                      </div>
                      <div>
                         <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Message</label>
                         <textarea rows={5} className="w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 dark:text-white resize-none transition-all" placeholder="How can we help you?"></textarea>
                      </div>
                      <button type="submit" className="w-full py-4 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 hover:-translate-y-0.5">
                         Send Message
                      </button>
                   </form>
                </div>
             </div>
          </div>
        );

      // ---------------- BLOG PAGE ----------------
      case 'BLOG':
        const blogPosts = [
            { id: 1, title: 'The Future of AI in QA Testing', date: 'Oct 12, 2023', category: 'Thought Leadership', readTime: '5 min read', summary: 'How generative models are changing the way we think about test coverage and edge cases.' },
            { id: 2, title: 'Playwright vs Cypress in 2024', date: 'Nov 05, 2023', category: 'Technical', readTime: '8 min read', summary: 'A deep dive into the performance benchmarks and developer experience of the two leading tools.' },
            { id: 3, title: 'Implementing BDD at Scale', date: 'Dec 01, 2023', category: 'Strategy', readTime: '6 min read', summary: 'Lessons learned from migrating a 50-person QA team to Gherkin syntax.' },
            { id: 4, title: 'Release Notes: v2.5', date: 'Jan 15, 2024', category: 'Product', readTime: '3 min read', summary: 'Introducing multi-modal generation, visual regression support, and team workspaces.' },
            { id: 5, title: 'Why Manual Testing Won\'t Die', date: 'Feb 02, 2024', category: 'Opinion', readTime: '4 min read', summary: 'AI accelerates testing, but the human intuition for exploratory testing remains irreplaceable.' },
            { id: 6, title: 'Securing Your Test Data', date: 'Feb 20, 2024', category: 'Security', readTime: '7 min read', summary: 'Best practices for handling PII in automated test environments.' },
        ];
        return (
            <div className="max-w-7xl mx-auto px-6 py-12 animate-fade-in-up">
                <SectionHeader 
                  label="Engineering Blog"
                  title="Insights & Updates"
                  subtitle="Tutorials, product announcements, and deep dives from the team building the next generation of testing tools."
                />

                {/* Search & Categories */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
                   <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar w-full md:w-auto">
                      {['All', 'Technical', 'Product', 'Strategy', 'Opinion'].map(cat => (
                         <button key={cat} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${cat === 'All' ? 'bg-violet-600 text-white' : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10'}`}>
                            {cat}
                         </button>
                      ))}
                   </div>
                   <div className="relative w-full md:w-64">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input type="text" placeholder="Search articles..." className="w-full pl-10 pr-4 py-2 bg-white dark:bg-[#131316] border border-gray-200 dark:border-white/10 rounded-xl text-sm focus:ring-2 focus:ring-violet-500/20 outline-none" />
                   </div>
                </div>

                {/* Featured Post */}
                <div className="mb-16 group relative rounded-[2rem] overflow-hidden bg-gray-900 dark:bg-black border border-gray-800 dark:border-white/10 aspect-[21/9] md:aspect-[21/8]">
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10"></div>
                   <img src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80" alt="Code" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
                   <div className="absolute bottom-0 left-0 p-8 md:p-12 z-20 max-w-3xl">
                      <span className="px-3 py-1 bg-violet-600 text-white text-xs font-bold uppercase tracking-wider rounded-md mb-4 inline-block">Featured</span>
                      <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">The Future of AI in QA Testing</h2>
                      <p className="text-lg text-gray-300 mb-6 line-clamp-2">How generative models are changing the way we think about test coverage, edge cases, and the role of the modern QA engineer.</p>
                      <button className="flex items-center gap-2 text-white font-bold hover:gap-3 transition-all">Read Article <ArrowRight className="w-5 h-5" /></button>
                   </div>
                </div>

                {/* Blog Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map(post => (
                        <div key={post.id} className="group bg-white dark:bg-[#0f0e1a] rounded-3xl border border-gray-200 dark:border-white/5 overflow-hidden hover:border-violet-500/30 transition-all cursor-pointer hover:-translate-y-1 hover:shadow-xl">
                            <div className="h-56 bg-gray-100 dark:bg-[#1a1a1d] relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 bg-white/90 dark:bg-black/60 backdrop-blur-md rounded-full text-xs font-bold text-gray-900 dark:text-white border border-gray-200 dark:border-white/10">
                                        {post.category}
                                    </span>
                                </div>
                            </div>
                            <div className="p-8 space-y-4 flex flex-col h-[calc(100%-14rem)]">
                                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                                    <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> {post.readTime}</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-violet-500 transition-colors line-clamp-2">
                                    {post.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm line-clamp-3 flex-1">
                                    {post.summary}
                                </p>
                                <div className="pt-4 mt-auto flex items-center text-sm font-bold text-violet-600 dark:text-violet-400 group-hover:translate-x-2 transition-transform">
                                    Read <ChevronRight className="w-4 h-4 ml-1" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Newsletter Signup */}
                <div className="mt-24 bg-gray-900 dark:bg-white/5 rounded-[2rem] p-12 text-center relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
                   <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                      <h2 className="text-3xl font-bold text-white">Subscribe to our newsletter</h2>
                      <p className="text-gray-400">Get the latest testing strategies and product updates delivered to your inbox.</p>
                      <div className="flex flex-col sm:flex-row gap-4">
                         <input type="email" placeholder="Enter your email" className="flex-1 px-6 py-4 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500" />
                         <button className="px-8 py-4 bg-violet-600 hover:bg-violet-500 text-white font-bold rounded-xl transition-colors">Subscribe</button>
                      </div>
                      <p className="text-xs text-gray-500">No spam, unsubscribe anytime.</p>
                   </div>
                </div>
            </div>
        );

      // ---------------- INTEGRATIONS PAGE ----------------
      case 'INTEGRATIONS':
          const tools = [
              { name: 'Jira', icon: <MessageSquare className="w-8 h-8 text-[#0052CC]" />, desc: 'Bi-directional sync of user stories and test cases.', status: 'Active', category: 'Project Mgmt' },
              { name: 'GitHub', icon: <GitBranch className="w-8 h-8 text-white" />, desc: 'Automatically commit generated automation scripts to your repo.', status: 'Active', category: 'VCS' },
              { name: 'Slack', icon: <MessageSquare className="w-8 h-8 text-[#E01E5A]" />, desc: 'Get notified when new test suites are generated.', status: 'Beta', category: 'Communication' },
              { name: 'Azure DevOps', icon: <Layout className="w-8 h-8 text-[#0078D7]" />, desc: 'Sync work items and test plans.', status: 'Coming Soon', category: 'Project Mgmt' },
              { name: 'TestRail', icon: <Database className="w-8 h-8 text-[#3D2C8D]" />, desc: 'Export manual test cases directly to TestRail.', status: 'Coming Soon', category: 'Test Mgmt' },
              { name: 'Jenkins', icon: <Server className="w-8 h-8 text-[#D24939]" />, desc: 'Trigger generation as part of your CI pipeline.', status: 'Coming Soon', category: 'CI/CD' },
          ];
          return (
              <div className="max-w-7xl mx-auto px-6 py-12 animate-fade-in-up">
                  <SectionHeader 
                    label="Ecosystem"
                    title="Integrations"
                    subtitle="Connect ZiaraQA with the tools you already use to create a seamless quality workflow."
                  />

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {tools.map((tool, i) => (
                          <div key={i} className="p-8 bg-white dark:bg-[#0f0e1a] rounded-[2rem] border border-gray-200 dark:border-white/5 hover:border-violet-500/30 transition-colors flex flex-col justify-between h-full group hover:shadow-xl">
                              <div>
                                  <div className="flex items-center justify-between mb-8">
                                      <div className="w-16 h-16 bg-gray-50 dark:bg-white/5 rounded-2xl flex items-center justify-center border border-gray-100 dark:border-white/5 group-hover:scale-110 transition-transform">
                                          {tool.icon}
                                      </div>
                                      <span className={`text-[10px] font-bold px-3 py-1 rounded-full border ${
                                          tool.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                                          tool.status === 'Beta' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                                          'bg-gray-500/10 text-gray-500 border-gray-500/20'
                                      }`}>
                                          {tool.status.toUpperCase()}
                                      </span>
                                  </div>
                                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{tool.name}</h3>
                                  <p className="text-sm font-medium text-violet-500 mb-4">{tool.category}</p>
                                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-8">
                                      {tool.desc}
                                  </p>
                              </div>
                              <button className={`w-full py-3 rounded-xl text-sm font-bold border transition-colors ${
                                  tool.status === 'Active' || tool.status === 'Beta' 
                                  ? 'bg-white dark:bg-white/5 text-gray-900 dark:text-white border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10'
                                  : 'bg-transparent text-gray-400 border-dashed border-gray-200 dark:border-white/10 cursor-not-allowed'
                              }`}>
                                  {tool.status === 'Coming Soon' ? 'Join Waitlist' : 'Configure Integration'}
                              </button>
                          </div>
                      ))}
                  </div>
                  
                  {/* Request Integration */}
                  <div className="mt-16 text-center bg-gray-50 dark:bg-[#0f0e1a] rounded-[2rem] p-12 border border-dashed border-gray-200 dark:border-gray-800">
                     <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Missing a tool?</h3>
                     <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">We are constantly adding new integrations. Let us know what you need to speed up your workflow.</p>
                     <button className="px-6 py-3 bg-gray-200 dark:bg-white/10 text-gray-900 dark:text-white font-bold rounded-xl hover:bg-gray-300 dark:hover:bg-white/20 transition-colors">Request Integration</button>
                  </div>
              </div>
          );

      // ---------------- API DOCS PAGE ----------------
      case 'API_DOCS':
          return (
              <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12 animate-fade-in-up">
                  {/* Sidebar */}
                  <div className="lg:w-64 flex-shrink-0">
                    <div className="sticky top-24 space-y-8">
                      <div>
                          <h4 className="font-bold text-gray-900 dark:text-white mb-4 px-2 uppercase text-xs tracking-wider">Getting Started</h4>
                          <ul className="space-y-1 text-sm">
                              <li><a href="#" className="block px-2 py-2 text-violet-600 dark:text-violet-400 font-medium bg-violet-50 dark:bg-violet-500/10 rounded-lg">Introduction</a></li>
                              <li><a href="#" className="block px-2 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Authentication</a></li>
                              <li><a href="#" className="block px-2 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Rate Limits</a></li>
                              <li><a href="#" className="block px-2 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Errors</a></li>
                          </ul>
                      </div>
                      <div>
                          <h4 className="font-bold text-gray-900 dark:text-white mb-4 px-2 uppercase text-xs tracking-wider">Resources</h4>
                          <ul className="space-y-1 text-sm">
                              <li><a href="#gen" className="block px-2 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Generations</a></li>
                              <li><a href="#hist" className="block px-2 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">History</a></li>
                              <li><a href="#proj" className="block px-2 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Projects</a></li>
                          </ul>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-16">
                      <div className="space-y-6 border-b border-gray-200 dark:border-white/5 pb-12">
                          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">API Reference</h1>
                          <p className="text-lg text-gray-600 dark:text-gray-300">
                              Integrate ZiaraQA's powerful generation engine directly into your CI/CD pipelines, internal developer platforms, or custom dashboards.
                          </p>
                          <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-xl p-4 flex gap-3">
                              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-500 flex-shrink-0" />
                              <p className="text-sm text-amber-800 dark:text-amber-200">
                                  API access is only available on the <strong>Enterprise Plan</strong>. Please contact sales to obtain an API key.
                              </p>
                          </div>
                      </div>

                      <div className="space-y-6">
                          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Authentication</h2>
                          <p className="text-gray-600 dark:text-gray-400">
                              The ZiaraQA API uses API keys to authenticate requests. You can view and manage your API keys in the Dashboard under Settings.
                          </p>
                          <p className="text-gray-600 dark:text-gray-400">
                              Your API keys carry many privileges, so be sure to keep them secure! Do not share your secret API keys in publicly accessible areas such as GitHub, client-side code, etc.
                          </p>
                          <CodeBlock code={`Authorization: Bearer sk_live_89234789234...`} />
                      </div>

                      <div className="space-y-10" id="gen">
                          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Generations</h2>
                          
                          <Endpoint 
                             method="POST" 
                             path="/v1/generate" 
                             description="Generates test cases and scripts from a raw text description or user story." 
                          />
                          
                          <div className="space-y-4">
                              <h3 className="text-sm font-bold uppercase text-gray-500">Request Body</h3>
                              <CodeBlock language="json" code={`{
  "project_id": "proj_123456",
  "user_story": "As a user, I want to login with SSO so that I can access the dashboard securely.",
  "options": {
    "framework": "playwright",
    "language": "typescript",
    "include_bdd": true
  }
}`} />
                          </div>

                          <div className="space-y-4">
                              <h3 className="text-sm font-bold uppercase text-gray-500">Response</h3>
                              <CodeBlock language="json" code={`{
  "id": "gen_987654",
  "created_at": "2024-02-25T10:00:00Z",
  "status": "completed",
  "test_cases": [
    {
      "id": "TC-001",
      "title": "Verify SSO Login with valid credentials",
      "priority": "High",
      "steps": ["Navigate to login", "Click SSO", "Enter creds"],
      "expected_result": "Dashboard loads"
    }
  ],
  "automation_scripts": [
    {
       "framework": "playwright",
       "code": "import { test } from '@playwright/test';..."
    }
  ]
}`} />
                          </div>
                      </div>

                      <div className="space-y-10" id="hist">
                         <h2 className="text-2xl font-bold text-gray-900 dark:text-white">History</h2>
                         <Endpoint 
                             method="GET" 
                             path="/v1/history" 
                             description="Retrieves a paginated list of past generations." 
                          />
                          <CodeBlock language="bash" code={`curl https://api.ziaraqa.com/v1/history \\
  -H "Authorization: Bearer sk_live_..." \\
  -d limit=10`} />
                      </div>
                  </div>
              </div>
          );

      // ---------------- LEGAL PAGES ----------------
      case 'PRIVACY':
        return (
          <LegalLayout title="Privacy Policy" lastUpdated="February 24, 2025" onNavigate={onNavigate}>
            <p>At ZiaraQA, accessible from https://ziaraqa.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by ZiaraQA and how we use it.</p>
            
            <h3>1. Information We Collect</h3>
            <p>The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.</p>
            <ul>
              <li><strong>Account Information:</strong> When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.</li>
              <li><strong>Usage Data:</strong> We collect information on how the Service is accessed and used. This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, and the pages of our Service that you visit.</li>
              <li><strong>Input Data:</strong> We process the User Stories and requirements you input into the system solely for the purpose of generating the requested output.</li>
            </ul>

            <h3>2. How We Use Your Information</h3>
            <p>We use the information we collect in various ways, including to:</p>
            <ul>
              <li>Provide, operate, and maintain our website</li>
              <li>Improve, personalize, and expand our website</li>
              <li>Understand and analyze how you use our website</li>
              <li>Develop new products, services, features, and functionality</li>
              <li>Send you emails (you can unsubscribe at any time)</li>
            </ul>

            <h3>3. Data Retention & AI Training</h3>
            <p><strong>We do not use your proprietary data to train our public AI models.</strong> Your input data (User Stories, Acceptance Criteria) is processed ephemerally. For Enterprise customers, we offer specific data residency options and dedicated model instances.</p>

            <h3>4. Third Party Privacy Policies</h3>
            <p>ZiaraQA's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information.</p>

            <h3>5. GDPR Data Protection Rights</h3>
            <p>We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:</p>
            <ul>
              <li>The right to access – You have the right to request copies of your personal data.</li>
              <li>The right to rectification – You have the right to request that we correct any information you believe is inaccurate.</li>
              <li>The right to erasure – You have the right to request that we erase your personal data, under certain conditions.</li>
            </ul>
          </LegalLayout>
        );

      case 'TERMS':
        return (
          <LegalLayout title="Terms of Service" lastUpdated="February 24, 2025" onNavigate={onNavigate}>
            <h3>1. Terms</h3>
            <p>By accessing this Website, accessible from https://ziaraqa.com, you are agreeing to be bound by these Website Terms and Conditions of Use and agree that you are responsible for the agreement with any applicable local laws.</p>
            
            <h3>2. Use License</h3>
            <p>Permission is granted to temporarily download one copy of the materials on ZiaraQA's Website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
            <ul>
              <li>modify or copy the materials;</li>
              <li>use the materials for any commercial purpose or for any public display;</li>
              <li>attempt to reverse engineer any software contained on ZiaraQA's Website;</li>
              <li>remove any copyright or other proprietary notations from the materials; or</li>
              <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
            </ul>

            <h3>3. Disclaimer</h3>
            <p>All the materials on ZiaraQA’s Website are provided "as is". ZiaraQA makes no warranties, may it be expressed or implied, therefore negates all other warranties. Furthermore, ZiaraQA does not make any representations concerning the accuracy or likely results of the use of the materials on its Website or otherwise relating to such materials or on any sites linked to this Website.</p>

            <h3>4. Limitations</h3>
            <p>In no event shall ZiaraQA or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on ZiaraQA’s Website.</p>

            <h3>5. Governing Law</h3>
            <p>Any claim related to ZiaraQA's Website shall be governed by the laws of the State of California without regards to its conflict of law provisions.</p>
          </LegalLayout>
        );

      case 'SECURITY':
        return (
          <LegalLayout title="Security Policy" lastUpdated="February 24, 2025" onNavigate={onNavigate}>
            <p>Security is the foundation of our business. We protect your data with the same care that we protect our own.</p>
            
            <h3>1. Infrastructure Security</h3>
            <p>Our application is hosted on secure, SOC 2 Type II compliant cloud infrastructure. We utilize Virtual Private Clouds (VPC) to isolate our network and strictly control ingress/egress traffic.</p>

            <h3>2. Data Encryption</h3>
            <ul>
              <li><strong>At Rest:</strong> All data stored in our databases is encrypted using AES-256 encryption.</li>
              <li><strong>In Transit:</strong> All data transmitted between your client and our servers is encrypted using TLS 1.2 or higher.</li>
            </ul>

            <h3>3. Access Control</h3>
            <p>We implement the principle of least privilege. Our employees do not have access to your customer data unless required for support purposes, and such access is logged and audited.</p>

            <h3>4. Vulnerability Management</h3>
            <p>We perform regular vulnerability scans and penetration testing. We also maintain a Bug Bounty program to encourage responsible disclosure of security issues.</p>
          </LegalLayout>
        );

      case 'COOKIES':
        return (
          <LegalLayout title="Cookie Policy" lastUpdated="February 24, 2025" onNavigate={onNavigate}>
            <p>This Cookie Policy explains how ZiaraQA uses cookies and similar technologies to recognize you when you visit our website.</p>
            
            <h3>1. What are cookies?</h3>
            <p>Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.</p>

            <h3>2. Why do we use cookies?</h3>
            <p>We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our Online Properties.</p>

            <h3>3. Types of cookies we use</h3>
            <ul>
              <li><strong>Essential website cookies:</strong> These cookies are strictly necessary to provide you with services available through our Website.</li>
              <li><strong>Analytics and customization cookies:</strong> These cookies collect information that is used either in aggregate form to help us understand how our Website is being used or how effective our marketing campaigns are.</li>
            </ul>

            <h3>4. How can I control cookies?</h3>
            <p>You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the Cookie Consent Manager.</p>
          </LegalLayout>
        );

      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      {renderContent()}
    </div>
  );
};
