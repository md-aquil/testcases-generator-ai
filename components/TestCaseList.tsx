import React from 'react';
import { TestCase } from '../types';
import { CheckCircle2, AlertCircle, AlertTriangle, Hash } from 'lucide-react';

interface TestCaseListProps {
  testCases: TestCase[];
}

const PriorityBadge = ({ priority }: { priority: string }) => {
  const styles = {
    High: "bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20",
    Medium: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20",
    Low: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20",
  };
  return (
    <span className={`px-2.5 py-1 rounded-md text-xs font-semibold border ${styles[priority as keyof typeof styles] || styles.Low}`}>
      {priority}
    </span>
  );
};

const TypeIcon = ({ type }: { type: string }) => {
  if (type === 'Positive') return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />;
  if (type === 'Negative') return <AlertCircle className="w-3.5 h-3.5 text-orange-500 dark:text-orange-400" />;
  return <AlertTriangle className="w-3.5 h-3.5 text-purple-500 dark:text-purple-400" />;
};

export const TestCaseList: React.FC<TestCaseListProps> = ({ testCases }) => {
  if (testCases.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-6">
      {testCases.map((tc, index) => (
        <div 
          key={index} 
          className="group relative bg-white dark:bg-[#131316] rounded-2xl p-0.5 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-500/5"
        >
          {/* Gradient Border Effect on Hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 blur-[1px]"></div>
          
          <div className="relative bg-white dark:bg-[#131316] rounded-[15px] overflow-hidden h-full border border-gray-100 dark:border-white/5">
            {/* Header */}
            <div className="px-6 py-4 bg-gray-50/50 dark:bg-white/5 border-b border-gray-100 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white dark:bg-black border border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 font-mono text-xs font-bold shadow-sm">
                  {index + 1}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-gray-400 dark:text-gray-500">
                    <Hash className="w-3 h-3" />
                    {tc.id}
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-base leading-tight">
                    {tc.title}
                  </h3>
                </div>
              </div>
              <div className="flex items-center gap-2 pl-11 sm:pl-0">
                <div className="flex items-center gap-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 bg-white dark:bg-white/5 px-2.5 py-1 rounded-md border border-gray-200 dark:border-white/5 shadow-sm">
                  <TypeIcon type={tc.type} />
                  {tc.type}
                </div>
                <PriorityBadge priority={tc.priority} />
              </div>
            </div>

            {/* Body */}
            <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Left Column */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Pre-Conditions</h4>
                  <div className="text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-white/5 p-3.5 rounded-xl border border-gray-100 dark:border-white/5">
                    {tc.preConditions || "None"}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Test Steps</h4>
                  <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-xl border border-gray-100 dark:border-white/5">
                    <ol className="list-decimal list-inside text-sm text-gray-700 dark:text-gray-300 space-y-2">
                      {tc.steps.map((step, i) => (
                        <li key={i} className="pl-2 marker:text-gray-400 dark:marker:text-gray-600 marker:font-medium">
                          <span className="inline-block align-top">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="flex flex-col h-full">
                <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">Expected Result</h4>
                <div className="flex-grow flex items-start text-sm text-emerald-800 dark:text-emerald-200 bg-emerald-50/80 dark:bg-emerald-500/10 p-5 rounded-xl border border-emerald-100 dark:border-emerald-500/20 leading-relaxed">
                   <div className="mr-3 mt-0.5 bg-emerald-100 dark:bg-emerald-500/20 p-1 rounded-full">
                     <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                   </div>
                   {tc.expectedResult}
                </div>
              </div>

            </div>
          </div>
        </div>
      ))}
    </div>
  );
};