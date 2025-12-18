import React from 'react';
import { ClipboardList, Sparkles } from 'lucide-react';

export const EmptyState: React.FC = () => {
  return (
    <div className="relative overflow-hidden flex flex-col items-center justify-center py-24 px-4 text-center border border-dashed border-gray-200 dark:border-gray-800 rounded-3xl bg-gray-50/50 dark:bg-white/5 transition-colors duration-300">
      
      {/* Abstract Background Element */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 group">
        <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-20 blur-xl transition duration-500"></div>
        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-none mb-6 ring-1 ring-gray-100 dark:ring-white/10">
          <ClipboardList className="w-10 h-10 text-indigo-500 dark:text-indigo-400" />
        </div>
      </div>
      
      <h3 className="relative z-10 text-xl font-bold text-gray-900 dark:text-white mb-3">
        Ready to Generate
      </h3>
      <p className="relative z-10 text-gray-500 dark:text-gray-400 max-w-sm leading-relaxed">
        Enter a user story above and let our <span className="text-indigo-600 dark:text-indigo-400 font-medium">Gemini AI</span> agent craft a comprehensive test plan and automation scripts for you.
      </p>

      <div className="mt-8 flex gap-2 text-xs font-medium text-gray-400 dark:text-gray-600">
        <span className="flex items-center gap-1"><Sparkles className="w-3 h-3" /> Manual Test Cases</span>
        <span>•</span>
        <span className="flex items-center gap-1"><Sparkles className="w-3 h-3" /> Automation Scripts</span>
      </div>
    </div>
  );
};