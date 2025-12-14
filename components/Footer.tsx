
import React from 'react';
import { Twitter, Linkedin, Github, Globe } from 'lucide-react';
import { Page } from '../types';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToSection = (id: string) => {
    onNavigate('LANDING');
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <footer className="bg-gray-50 dark:bg-[#0d0d0f] border-t border-gray-200 dark:border-white/5 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="space-y-4">
            <h3 
              className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 cursor-pointer"
              onClick={() => onNavigate('LANDING')}
            >
              QA GenAI Suite
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Empowering QA teams with AI-driven testing strategies. Generate, automate, and ship faster.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-indigo-600 dark:hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-indigo-600 dark:hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-indigo-600 dark:hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Product</h4>
            <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
              <li><button onClick={() => scrollToSection('features')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Features</button></li>
              <li><button onClick={() => scrollToSection('pricing')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Pricing</button></li>
              <li><button onClick={() => onNavigate('INTEGRATIONS')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Integrations</button></li>
              <li><button onClick={() => onNavigate('API_DOCS')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">API Docs</button></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
              <li><button onClick={() => onNavigate('ABOUT')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">About Us</button></li>
              <li><button onClick={() => onNavigate('CAREERS')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Careers</button></li>
              <li><button onClick={() => onNavigate('BLOG')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Blog</button></li>
              <li><button onClick={() => onNavigate('CONTACT')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Contact</button></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Legal</h4>
            <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
              <li><button onClick={() => onNavigate('PRIVACY')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Privacy Policy</button></li>
              <li><button onClick={() => onNavigate('TERMS')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Terms of Service</button></li>
              <li><button onClick={() => onNavigate('COOKIES')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Cookie Policy</button></li>
              <li><button onClick={() => onNavigate('SECURITY')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Security</button></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} QA GenAI Suite. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Systems Operational
            </div>
            <div className="flex items-center gap-2">
               <Globe className="w-4 h-4" />
               English (US)
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
