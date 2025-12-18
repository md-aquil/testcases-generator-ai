
import React from 'react';
import { TestCase } from '../types';
import { CheckCircle2, AlertCircle, AlertTriangle, Hash, Play } from 'lucide-react';

interface TestCaseListProps {
  testCases: TestCase[];
}

const PriorityBadge = ({ priority }: { priority: string }) => {
  const styles = {
    High: "bg-red-500/10 text-red-400 border-red-500/20 shadow-[0_0_8px_rgba(248,113,113,0.2)]",
    Medium: "bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-[0_0_8px_rgba(251,191,36,0.2)]",
    Low: "bg-blue-500/10 text-blue-400 border-blue-500/20 shadow-[0_0_8px_rgba(96,165,250,0.2)]",
  };
  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${styles[priority as keyof typeof styles] || styles.Low}`}>
      {priority}
    </span>
  );
};

const TypeIcon = ({ type }: { type: string }) => {
  if (type === 'Positive') return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />;
  if (type === 'Negative') return <AlertCircle className="w-3.5 h-3.5 text-fuchsia-400" />;
  return <AlertTriangle className="w-3.5 h-3.5 text-violet-400" />;
};

export const TestCaseList: React.FC<TestCaseListProps> = ({ testCases }) => {
  if (testCases.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-4">
      {testCases.map((tc, index) => (
        <div 
          key={index} 
          className="group relative bg-white dark:bg-[#0f0e1a] rounded-xl transition-all duration-300 border border-gray-200 dark:border-white/5 hover:border-violet-500/30 overflow-hidden shadow-sm hover:shadow-lg hover:shadow-violet-900/10"
        >
          {/* Header */}
          <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gray-50/50 dark:bg-white/[0.02] border-b border-gray-100 dark:border-white/5">
            <div className="flex items-center gap-4">
               <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-violet-500/10 flex items-center justify-center text-indigo-600 dark:text-violet-400 font-mono text-xs font-bold border border-indigo-100 dark:border-violet-500/20">
                 {index + 1}
               </div>
               <div>
                 <div className="flex items-center gap-2 mb-1">
                   <span className="text-[10px] font-mono text-gray-400">{tc.id}</span>
                   <PriorityBadge priority={tc.priority} />
                 </div>
                 <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-200">
                    {tc.title}
                 </h3>
               </div>
            </div>
            <div className="flex items-center gap-2 pl-12 sm:pl-0">
               <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-300 bg-white dark:bg-black/20 px-2 py-1 rounded border border-gray-200 dark:border-white/5">
                  <TypeIcon type={tc.type} />
                  {tc.type}
               </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
             
             {/* Steps */}
             <div className="lg:col-span-7 space-y-3">
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Test Steps</h4>
                <div className="space-y-2">
                  {tc.steps.map((step, i) => (
                    <div key={i} className="flex gap-3 text-sm text-gray-600 dark:text-gray-400">
                       <span className="text-gray-300 dark:text-gray-600 font-mono select-none">{i+1}.</span>
                       <span>{step}</span>
                    </div>
                  ))}
                </div>
             </div>

             {/* Divider for Mobile */}
             <div className="block lg:hidden h-px bg-gray-100 dark:bg-white/5"></div>

             {/* Pre/Expected */}
             <div className="lg:col-span-5 space-y-4">
                <div>
                   <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Pre-Condition</h4>
                   <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                      {tc.preConditions || "No pre-conditions specified"}
                   </p>
                </div>
                
                <div className="bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-100 dark:border-emerald-500/10 rounded-lg p-3">
                   <h4 className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Expected Result
                   </h4>
                   <p className="text-sm text-emerald-800 dark:text-emerald-200/80">
                      {tc.expectedResult}
                   </p>
                </div>
             </div>

          </div>
        </div>
      ))}
    </div>
  );
};
