
import React from 'react';
import { FolderKanban, Star, Clock, Zap } from 'lucide-react';

export const TestManager: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center animate-fade-in-up">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-3xl opacity-20"></div>
        <div className="relative bg-white dark:bg-[#131316] p-8 rounded-[2rem] border border-gray-100 dark:border-white/10 shadow-2xl">
          <FolderKanban className="w-20 h-20 text-cyan-500" />
        </div>
        <div className="absolute -top-4 -right-4 bg-yellow-400 text-black text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg transform rotate-12">
          Coming Soon
        </div>
      </div>

      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
        ZiaraQA Manager
      </h1>
      <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed mb-12">
        A lightweight, AI-powered alternative to Jira and TestRail. Organize suites, execute runs, and let AI self-heal your broken tests.
      </p>

      <div className="grid md:grid-cols-3 gap-6 max-w-4xl w-full">
        {[
          { icon: Zap, title: "Fast Execution", desc: "Excel-like runner. Pass/Fail instantly." },
          { icon: Star, title: "Self-Healing", desc: "AI automatically fixes outdated steps." },
          { icon: Clock, title: "3-Level Hierarchy", desc: "Project > Suite > Test Case. Simple." }
        ].map((feat, i) => (
          <div key={i} className="bg-white dark:bg-white/5 p-6 rounded-2xl border border-gray-200 dark:border-white/5">
            <feat.icon className="w-8 h-8 text-cyan-500 mb-4 mx-auto" />
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">{feat.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{feat.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <button className="px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-xl hover:opacity-90 transition-opacity">
          Join Waitlist
        </button>
      </div>
    </div>
  );
};
