
import React from 'react';
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
  Code2
} from 'lucide-react';

interface StaticPageProps {
  type: Page;
  onNavigate?: (page: Page) => void;
}

export const StaticPage: React.FC<StaticPageProps> = ({ type, onNavigate }) => {
  const handleCtaClick = () => {
    if (onNavigate) {
      onNavigate('LANDING');
    }
  };

  const renderContent = () => {
    switch (type) {
      case 'ABOUT':
        return (
          <div className="max-w-5xl mx-auto px-6 py-12 space-y-16 animate-fade-in-up">
            {/* Hero Section */}
            <div className="text-center space-y-6 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest mb-2 border border-indigo-100 dark:border-indigo-500/20">
                Our Mission
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
                The End of <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">Boilerplate Testing</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                We transform User Stories into rigorous Manual Test Cases, Gherkin Scenarios, and production-ready Automation Scripts.
                Stop translating requirements manually. Start shipping quality software.
              </p>
            </div>

            {/* Origin Story */}
            <div className="grid md:grid-cols-2 gap-8 items-center bg-gray-50 dark:bg-white/5 p-8 rounded-3xl border border-gray-100 dark:border-white/5">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Why We Built This</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                  For years, QA engineers have been stuck in a loop: Read a Jira ticket, write the same test steps in a spreadsheet, translate them into Gherkin, and then write the boilerplate code for automation. It's tedious, error-prone, and slow.
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                  We built QA GenAI Suite to break this cycle. We believe QA talent should be focused on <strong>exploratory testing, strategy, and complex edge cases</strong>—not on writing documentation that an AI can generate in seconds.
                </p>
              </div>
              <div className="relative h-full min-h-[300px] bg-white dark:bg-[#0a0a0c] rounded-2xl border border-gray-200 dark:border-white/10 p-6 shadow-xl transform md:rotate-2 hover:rotate-0 transition-transform duration-500">
                {/* Abstract UI representation */}
                <div className="flex items-center gap-2 mb-4 border-b border-gray-100 dark:border-white/5 pb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div className="ml-auto w-20 h-2 rounded-full bg-gray-100 dark:bg-white/10"></div>
                </div>
                <div className="space-y-3">
                  <div className="w-3/4 h-4 rounded bg-indigo-100 dark:bg-indigo-500/20"></div>
                  <div className="w-full h-2 rounded bg-gray-100 dark:bg-white/5"></div>
                  <div className="w-5/6 h-2 rounded bg-gray-100 dark:bg-white/5"></div>
                  <div className="w-4/6 h-2 rounded bg-gray-100 dark:bg-white/5"></div>
                  <div className="mt-8 p-4 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/5">
                    <div className="w-1/2 h-3 rounded bg-emerald-100 dark:bg-emerald-500/20 mb-2"></div>
                    <div className="w-full h-2 rounded bg-gray-200 dark:bg-white/10"></div>
                  </div>
                </div>
                {/* Badge */}
                <div className="absolute -bottom-4 -right-4 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-bold transform -rotate-3">
                  Built by QA Engineers
                </div>
              </div>
            </div>

            {/* Philosophy Cards */}
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Philosophy</h2>
                <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">More than just a generator. A complete quality methodology.</p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {/* Card 1 */}
                <div className="p-8 bg-white dark:bg-[#131316] rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm hover:border-indigo-500/30 transition-colors group">
                  <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Users className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Collaborative Intelligence</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    QA is a team sport. We provide shared workspaces, role-based access control, and immutable history logs so your entire team stays in sync.
                  </p>
                </div>
                {/* Card 2 */}
                <div className="p-8 bg-white dark:bg-[#131316] rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm hover:border-purple-500/30 transition-colors group">
                  <div className="w-14 h-14 bg-purple-100 dark:bg-purple-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Award className="w-7 h-7 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Precision Engineering</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    We don't hallucinate quality. Our models are tuned to identify edge cases, negative scenarios, and security boundaries that humans often miss.
                  </p>
                </div>
                {/* Card 3 */}
                <div className="p-8 bg-white dark:bg-[#131316] rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm hover:border-emerald-500/30 transition-colors group">
                  <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Globe className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Proven Scale</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Trusted by modern engineering teams. Over 100,000+ test steps and 50,000+ lines of automation code generated to date.
                  </p>
                </div>
              </div>
            </div>

            {/* Trust & Ethics */}
            <div className="bg-gradient-to-br from-indigo-900 to-slate-900 dark:from-indigo-950/40 dark:to-slate-950/40 rounded-3xl p-8 md:p-12 text-center space-y-6 relative overflow-hidden border border-indigo-500/20">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
              <div className="relative z-10">
                <Shield className="w-16 h-16 text-indigo-300 mx-auto mb-6" />
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Your Data is Yours. Period.</h2>
                <p className="text-indigo-200 max-w-2xl mx-auto leading-relaxed text-lg">
                  We are built by QA engineers who understand the importance of IP. We do not use your proprietary user stories or test data to train our public models. All processing is ephemeral and enterprise-grade encrypted.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center pt-4 pb-8">
              <p className="text-gray-500 dark:text-gray-400 mb-6 font-medium">Ready to upgrade your QA workflow?</p>
              <button
                onClick={handleCtaClick}
                className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-lg rounded-full transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] transform hover:-translate-y-1"
              >
                Start Generating Free
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        );

      case 'CAREERS':
        return (
          <div className="max-w-4xl mx-auto px-6 py-12 animate-fade-in-up">
            <div className="text-center mb-10 space-y-6">
              <div className="inline-flex items-center justify-center p-4 bg-indigo-50 dark:bg-indigo-500/10 rounded-full mb-4 text-indigo-600 dark:text-indigo-400">
                <Briefcase className="w-8 h-8" />
              </div>
              <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                Build the future of QA
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                We are a team of engineers, designers, and testers obsessed with quality. We're building the tools we wish we had.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-10">
              <div className="p-8 bg-white dark:bg-[#131316] rounded-3xl border border-gray-200 dark:border-white/5">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Culture</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                  We believe in "Engineering First". Everyone at QA GenAI Suite codes, tests, and deploys. We value autonomy, deep work, and shipping fast without breaking things.
                </p>
                <ul className="space-y-3">
                  {['Remote-first DNA', 'Zero bureaucracy', 'Open source contributors'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium">
                      <CheckCircle2 className="w-5 h-5 text-indigo-500" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-8 bg-white dark:bg-[#131316] rounded-3xl border border-gray-200 dark:border-white/5 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Current Status</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    We are currently a small, tight-knit team in heads-down build mode. We are not actively hiring for new roles at this exact moment, but things change fast in startup land.
                  </p>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-100 dark:border-white/5">
                  <p className="text-sm text-gray-500 mb-2">Want to be the first to know?</p>
                  <a href="#" className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold hover:underline">
                    Follow us on LinkedIn <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        );

      case 'CONTACT':
        return (
          <div className="max-w-6xl mx-auto px-6 py-12 animate-fade-in-up">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
              {/* Contact Info */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">Get in touch</h1>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    Have questions about our pricing, enterprise plans, or just want to say hello? We'd love to hear from you.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                    <Mail className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mt-1" />
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">Email</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Our friendly team is here to help.</p>
                      <a href="mailto:support@qagenai.com" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">support@qagenai.com</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                    <MapPin className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mt-1" />
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">Office</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Come say hello at our office headquarters.</p>
                      <p className="text-gray-900 dark:text-gray-200 text-sm">100 Spear Street, Suite 500<br />San Francisco, CA 94105</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                    <Phone className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mt-1" />
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">Phone</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Mon-Fri from 8am to 5pm.</p>
                      <a href="tel:+15550000000" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">+1 (555) 000-0000</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white dark:bg-[#131316] p-8 rounded-3xl border border-gray-200 dark:border-white/10 shadow-xl">
                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Message sent!'); }}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">First name</label>
                      <input type="text" className="w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 dark:text-white" placeholder="Jane" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Last name</label>
                      <input type="text" className="w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 dark:text-white" placeholder="Doe" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
                    <input type="email" className="w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 dark:text-white" placeholder="you@company.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Message</label>
                    <textarea rows={4} className="w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 dark:text-white resize-none" placeholder="How can we help you?"></textarea>
                  </div>
                  <button type="submit" className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-500/20">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        );

      case 'BLOG':
        return (
          <div className="max-w-6xl mx-auto px-6 py-12 space-y-10 animate-fade-in-up">
            <div className="text-center space-y-4">
              <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">The QA GenAI Blog</h1>
              <p className="text-xl text-gray-500 dark:text-gray-400">Engineering the future of software testing.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  category: 'Strategy',
                  title: "The Death of the Manual Spreadsheet",
                  date: "Oct 24, 2023",
                  readTime: "5 min read",
                  desc: "Why modern engineering teams are moving away from Excel-based test plans and embracing dynamic, AI-generated assets.",
                  author: "Sarah Jenkins, Head of Product"
                },
                {
                  category: 'Technical',
                  title: "Playwright vs Cypress: An AI-Driven Comparison",
                  date: "Nov 02, 2023",
                  readTime: "8 min read",
                  desc: "We ran 10,000 generated scripts through both frameworks. Here is what we found regarding flakiness, speed, and DX.",
                  author: "David Chen, Lead SDET"
                },
                {
                  category: 'Tutorial',
                  title: "Prompt Engineering for QA Professionals",
                  date: "Nov 15, 2023",
                  readTime: "6 min read",
                  desc: "How to write user stories that result in perfect test coverage. The art of specificity in the age of LLMs.",
                  author: "Alex Rivera, QA Lead"
                },
                {
                  category: 'Innovation',
                  title: "Self-Healing Tests: Myth or Reality?",
                  date: "Dec 01, 2023",
                  readTime: "7 min read",
                  desc: "Exploring the capabilities of GenAI to automatically fix broken selectors in CI/CD pipelines.",
                  author: "Sarah Jenkins, Head of Product"
                },
                {
                  category: 'Case Study',
                  title: "Scaling Automation at FinTech Corp",
                  date: "Dec 10, 2023",
                  readTime: "4 min read",
                  desc: "How a regulated financial institution reduced regression time by 60% using generated BDD scenarios.",
                  author: "Guest Contributor"
                },
                {
                  category: 'Technical',
                  title: "The State of AI in Testing 2024",
                  date: "Jan 05, 2024",
                  readTime: "10 min read",
                  desc: "Our predictions for the coming year. Agentic workflows, vision-based verification, and more.",
                  author: "David Chen, Lead SDET"
                }
              ].map((post, i) => (
                <div key={i} className="group flex flex-col bg-white dark:bg-[#131316] border border-gray-200 dark:border-white/5 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-500/30 transition-all cursor-pointer">
                  <div className="h-48 bg-gray-100 dark:bg-white/5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">{post.category}</span>
                      <span className="text-xs text-gray-400">{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                      {post.desc}
                    </p>
                    <div className="pt-4 border-t border-gray-100 dark:border-white/5 flex items-center justify-between text-xs text-gray-500">
                      <span>{post.author}</span>
                      <span>{post.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'INTEGRATIONS':
        return (
          <div className="max-w-6xl mx-auto px-6 py-12 animate-fade-in-up">
            <div className="text-center mb-10 space-y-4">
              <div className="inline-flex items-center justify-center p-4 bg-indigo-50 dark:bg-indigo-500/10 rounded-full mb-4 text-indigo-600 dark:text-indigo-400">
                <Layers className="w-8 h-8" />
              </div>
              <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                Connect your Workflow
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Seamlessly integrate AI-generated tests into your existing ecosystem. <br />
                <span className="text-indigo-500 font-bold">Enterprise Private Beta</span>
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <div className="p-8 bg-white dark:bg-[#131316] rounded-3xl border border-gray-200 dark:border-white/5 hover:border-indigo-500/30 transition-all">
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center mb-6">
                  <Layout className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Issue Tracking</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                  Automatically create Test Case tickets in Jira or Linear when a new story is processed.
                </p>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300"><CheckCircle2 className="w-4 h-4 text-green-500" /> Jira Software</div>
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300"><CheckCircle2 className="w-4 h-4 text-green-500" /> Linear</div>
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300"><CheckCircle2 className="w-4 h-4 text-green-500" /> Azure DevOps</div>
                </div>
              </div>

              <div className="p-8 bg-white dark:bg-[#131316] rounded-3xl border border-gray-200 dark:border-white/5 hover:border-indigo-500/30 transition-all">
                <div className="w-12 h-12 bg-gray-100 dark:bg-white/10 rounded-xl flex items-center justify-center mb-6">
                  <GitBranch className="w-6 h-6 text-gray-700 dark:text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">CI/CD Pipelines</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                  Trigger test generation and execution directly from your deployment pipelines.
                </p>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300"><CheckCircle2 className="w-4 h-4 text-green-500" /> GitHub Actions</div>
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300"><CheckCircle2 className="w-4 h-4 text-green-500" /> GitLab CI</div>
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300"><CheckCircle2 className="w-4 h-4 text-green-500" /> Jenkins</div>
                </div>
              </div>

              <div className="p-8 bg-white dark:bg-[#131316] rounded-3xl border border-gray-200 dark:border-white/5 hover:border-indigo-500/30 transition-all">
                <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/20 rounded-xl flex items-center justify-center mb-6">
                  <MessageSquare className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Communication</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                  Get real-time notifications when tests are generated or when automation suites finish.
                </p>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300"><CheckCircle2 className="w-4 h-4 text-green-500" /> Slack</div>
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300"><CheckCircle2 className="w-4 h-4 text-green-500" /> MS Teams</div>
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300"><CheckCircle2 className="w-4 h-4 text-green-500" /> Discord</div>
                </div>
              </div>
            </div>

            <div className="bg-indigo-600 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
              <div className="relative z-10 space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold">Ready to integrate?</h2>
                <p className="text-indigo-100 max-w-2xl mx-auto">
                  Our integration library is currently in private beta for Enterprise partners. Contact our engineering team to request early access.
                </p>
                <button className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-colors">
                  Request Beta Access
                </button>
              </div>
            </div>
          </div>
        );

      case 'API_DOCS':
        return (
          <div className="max-w-6xl mx-auto px-6 py-12 animate-fade-in-up">
            <div className="text-center mb-10 space-y-4">
              <div className="inline-flex items-center justify-center p-4 bg-purple-50 dark:bg-purple-500/10 rounded-full mb-4 text-purple-600 dark:text-purple-400">
                <Terminal className="w-8 h-8" />
              </div>
              <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                Build on our Intelligence
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                The <span className="text-purple-500 font-bold">QA GenAI API</span> allows you to programmatically generate test assets and integrate quality checks into any workflow.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center mb-10">
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Cpu className="w-6 h-6 text-gray-700 dark:text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Custom QA Pipelines</h3>
                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                      Build your own internal tools that trigger test generation whenever a product requirement document (PRD) is updated.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Automated Regression</h3>
                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                      Feed git diffs into our API to automatically suggest new test cases for changed code areas.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Box className="w-6 h-6 text-indigo-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Standard REST/JSON</h3>
                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                      Simple, predictable, resource-oriented URLs, and uses HTTP response codes to indicate API errors.
                    </p>
                  </div>
                </div>
              </div>

              {/* Code Snippet */}
              <div className="bg-[#0f0f10] rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/5">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
                  </div>
                  <span className="ml-2 text-xs text-gray-500 font-mono">POST /v1/generate</span>
                </div>
                <div className="p-6 overflow-x-auto">
                  <pre className="text-sm font-mono leading-relaxed">
                    <span className="text-purple-400">curl</span> https://api.qagenai.com/v1/generate \<br />
                    -H <span className="text-green-400">"Authorization: Bearer $API_KEY"</span> \<br />
                    -H <span className="text-green-400">"Content-Type: application/json"</span> \<br />
                    -d <span className="text-yellow-400">'{`{
    "story": "As a user...",
    "types": ["manual", "automation"],
    "framework": "playwright"
  }`}'</span>
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-[#131316] border border-gray-200 dark:border-white/10 rounded-3xl p-8 text-center max-w-3xl mx-auto">
              <Lock className="w-8 h-8 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Enterprise Access Only</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-8">
                API access is strictly limited to our Enterprise partners to ensure quality of service and security.
              </p>
              <button className="px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-xl hover:opacity-90 transition-opacity">
                Contact Sales for API Key
              </button>
            </div>
          </div>
        );

      case 'PRIVACY':
        return (
          <div className="max-w-4xl mx-auto px-6 py-12 space-y-8 animate-fade-in-up text-gray-800 dark:text-gray-300">
            <div className="border-b border-gray-200 dark:border-white/10 pb-6">
              <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400 mb-4">
                <Shield className="w-8 h-8" />
                <span className="font-bold tracking-wider text-sm uppercase">Privacy Policy</span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Your Privacy is Our Priority</h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Transparent data practices for the modern enterprise. Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">1. Introduction</h2>
              <p>
                Welcome to QA GenAI Suite ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your data. This Privacy Policy explains how we collect, use, and safeguard your information when you use our AI-powered QA platform. By using our service, you agree to the collection and use of information in accordance with this policy.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">2. Information We Collect</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Account Information:</strong> When you register, we collect your name, email address, and authentication credentials.</li>
                <li><strong>User Content:</strong> We process the User Stories, requirements, and text inputs you submit to the platform for the sole purpose of generating test assets.</li>
                <li><strong>Generated Outputs:</strong> We store the Manual Test Cases, Automation Scripts (Cypress, Playwright, Selenium), and BDD Feature Files generated by the platform associated with your account history.</li>
                <li><strong>Usage Data:</strong> We collect anonymized data regarding feature usage, performance metrics, and system interactions to improve our service.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">3. How We Use Your Data</h2>
              <p>We use the collected data for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To provide and maintain our Service.</li>
                <li>To generate QA assets based on your specific inputs.</li>
                <li>To notify you about changes to our Service.</li>
                <li>To provide customer support and troubleshoot technical issues.</li>
                <li>To monitor the usage of our Service and detect/prevent technical issues.</li>
              </ul>
            </section>

            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-500/30">
              <div className="flex items-start gap-4">
                <Shield className="w-6 h-6 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-indigo-900 dark:text-white mb-2">AI Training & Data Privacy</h3>
                  <p className="text-indigo-800 dark:text-indigo-200 font-medium">
                    Strict No-Training Policy: We do NOT use your User Stories, proprietary requirements, or generated test assets to train our public AI models. Your data remains isolated and is used solely to generate your requested outputs. All processing is transient where possible, and persistent storage is strictly for your account history.
                  </p>
                </div>
              </div>
            </div>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">4. Data Storage & Retention</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Free Plan:</strong> Generated history is retained for 24 hours to facilitate immediate usage and then permanently deleted.</li>
                <li><strong>Paid Plans:</strong> History is retained indefinitely while your subscription is active to allow for regression testing and historical analysis. You may request deletion at any time.</li>
                <li><strong>Enterprise:</strong> Custom retention policies are available upon request.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">5. Third-Party Services</h2>
              <p>We may employ third-party companies and individuals due to the following reasons:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Payment Processing:</strong> We use Stripe for secure payment processing. We do not store your credit card details.</li>
                <li><strong>Cloud Infrastructure:</strong> We use Google Cloud Platform and Firebase for secure hosting and database services.</li>
                <li><strong>AI Inference:</strong> We utilize enterprise-grade APIs from Google (Gemini) with strict data privacy agreements in place (Zero-retention policy on API endpoints).</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">6. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us:</p>
              <ul className="list-none space-y-1">
                <li>By email: privacy@qagenai.com</li>
                <li>By visiting this page on our website: www.qagenai.com/contact</li>
              </ul>
            </section>
          </div>
        );

      case 'TERMS':
        return (
          <div className="max-w-4xl mx-auto px-6 py-12 space-y-8 animate-fade-in-up text-gray-800 dark:text-gray-300">
            <div className="border-b border-gray-200 dark:border-white/10 pb-6">
              <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400 mb-4">
                <FileText className="w-8 h-8" />
                <span className="font-bold tracking-wider text-sm uppercase">Terms of Service</span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Terms & Conditions</h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Please read these terms carefully before using QA GenAI Suite. Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">1. Acceptance of Terms</h2>
              <p>
                By accessing or using QA GenAI Suite, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the Service.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">2. Description of Service</h2>
              <p>
                QA GenAI Suite is an AI-powered platform that assists Quality Assurance professionals by generating manual test cases, automation scripts, and BDD scenarios from user inputs. The Service is provided "as is" and is intended to augment, not replace, human QA oversight.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">3. User Accounts & Responsibilities</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>You must provide accurate, complete, and current information at all times.</li>
                <li>You are responsible for safeguarding the password that you use to access the Service.</li>
                <li>You may not use the Service for any illegal or unauthorized purpose.</li>
                <li>You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service without express written permission by us.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">4. Usage Limits</h2>
              <p>
                <strong>Free Plan:</strong> Limited to 5 User Story generations per day. History is retained for 24 hours.<br />
                <strong>Pro Plan:</strong> Unlimited generations. Permanent history retention. Access to Automation Scripts.<br />
                <strong>Enterprise:</strong> Custom limits and API access as per contract.
              </p>
              <p>We reserve the right to throttle or terminate accounts that abuse the API or service limits.</p>
            </section>

            <div className="bg-amber-50 dark:bg-amber-900/10 p-6 rounded-2xl border border-amber-200 dark:border-amber-500/20">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-amber-900 dark:text-white mb-2">AI Disclaimer & Output Ownership</h3>
                  <p className="text-amber-800 dark:text-amber-200 font-medium mb-3">
                    <strong>Ownership:</strong> You retain full ownership of the User Stories you input and the Test Cases/Scripts generated by the platform. We claim no intellectual property rights over your generated QA assets.
                  </p>
                  <p className="text-amber-800 dark:text-amber-200 text-sm">
                    <strong>Accuracy:</strong> AI-generated content is probabilistic. While we strive for high accuracy, the Service may produce incorrect, incomplete, or biased information. You acknowledge that all outputs should be reviewed and verified by a human QA professional before implementation in production environments.
                  </p>
                </div>
              </div>
            </div>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">5. Limitation of Liability</h2>
              <p>
                In no event shall QA GenAI Suite, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">6. Termination</h2>
              <p>
                We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">7. Governing Law</h2>
              <p>
                These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
              </p>
            </section>
          </div>
        );

      case 'COOKIES':
        return (
          <div className="max-w-3xl mx-auto px-6 py-12 space-y-8 animate-fade-in-up text-gray-800 dark:text-gray-300">
            <div className="border-b border-gray-200 dark:border-white/10 pb-6">
              <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400 mb-4">
                <Eye className="w-8 h-8" />
                <span className="font-bold tracking-wider text-sm uppercase">Cookie Policy</span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">How We Use Cookies</h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Understanding your digital footprint on our platform. Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">1. What Are Cookies?</h2>
              <p>
                Cookies are small text files that are placed on your computer or mobile device by websites that you visit. They are widely used in order to make websites work, or work more efficiently, as well as to provide information to the owners of the site.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">2. How We Use Cookies</h2>
              <p>We use cookies for the following purposes:</p>
              <div className="grid gap-4 mt-4">
                <div className="p-4 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Essential Cookies</h3>
                  <p className="text-sm">Necessary for the website to function (e.g., authentication, session management). You cannot opt-out of these.</p>
                </div>
                <div className="p-4 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Preference Cookies</h3>
                  <p className="text-sm">Allow us to remember your settings such as theme (Light/Dark mode) and language preferences.</p>
                </div>
                <div className="p-4 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Analytics Cookies</h3>
                  <p className="text-sm">Help us understand how visitors interact with the website by collecting and reporting information anonymously.</p>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">3. Third-Party Cookies</h2>
              <p>
                In addition to our own cookies, we may also use various third-parties cookies to report usage statistics of the Service and deliver advertisements on and through the Service. This includes services like Google Analytics and Stripe (for fraud detection).
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">4. Managing Cookies</h2>
              <p>
                You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed. If you do this, however, you may have to manually adjust some preferences every time you visit a site and some services and functionalities may not work.
              </p>
            </section>
          </div>
        );

      case 'SECURITY':
        return (
          <div className="max-w-4xl mx-auto px-6 py-12 space-y-10 animate-fade-in-up text-gray-800 dark:text-gray-300">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="inline-flex items-center justify-center p-3 bg-indigo-50 dark:bg-indigo-500/10 rounded-full mb-6 text-indigo-600 dark:text-indigo-400">
                <Lock className="w-8 h-8" />
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">Security & Trust</h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Enterprise-grade security is built into every layer of QA GenAI Suite.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 bg-white dark:bg-[#131316] rounded-2xl border border-gray-200 dark:border-white/5">
                <Server className="w-8 h-8 text-indigo-500 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Infrastructure Security</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Our platform runs on Google Cloud Platform (GCP), utilizing world-class data centers with SOC 2, ISO 27001, and HIPAA certifications. We employ automated vulnerability scanning and intrusion detection systems.
                </p>
              </div>

              <div className="p-8 bg-white dark:bg-[#131316] rounded-2xl border border-gray-200 dark:border-white/5">
                <Lock className="w-8 h-8 text-emerald-500 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Data Encryption</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption keys. This ensures that your user stories and generated test assets are protected from unauthorized access at all times.
                </p>
              </div>

              <div className="p-8 bg-white dark:bg-[#131316] rounded-2xl border border-gray-200 dark:border-white/5">
                <Cloud className="w-8 h-8 text-blue-500 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">AI Data Handling</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  We operate with a "Zero-Retention for Training" policy. Data sent to our AI models is used strictly for inference and generation of your response. It is not stored by the model provider (Google) for model training or improvement.
                </p>
              </div>

              <div className="p-8 bg-white dark:bg-[#131316] rounded-2xl border border-gray-200 dark:border-white/5">
                <CheckCircle2 className="w-8 h-8 text-purple-500 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Access Control</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  We implement strict Role-Based Access Control (RBAC) internally and for our Enterprise Team Workspaces. Customer data is logically segregated, and employee access is restricted to engineering support on a strictly need-to-know basis.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-white/5 rounded-3xl p-8 border border-gray-200 dark:border-white/10">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Vulnerability Reporting</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Security is a continuous journey. If you believe you have found a vulnerability in QA GenAI Suite, please please let us know right away. We appreciate your help in making our platform safer for everyone.
              </p>
              <a href="mailto:security@qagenai.com" className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors">
                Contact Security Team
              </a>
            </div>
          </div>
        );

      default:
        return <div>Page not found</div>;
    }
  };

  return <div className="animate-in fade-in duration-500">{renderContent()}</div>;
};
