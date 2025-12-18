
import React from 'react';
import { GherkinScenario } from '../types';
import { FileCode, Copy, Check } from 'lucide-react';

interface BddViewerProps {
  scenarios: GherkinScenario[];
}

export const BddViewer: React.FC<BddViewerProps> = ({ scenarios }) => {
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);

  const handleCopy = (scenario: GherkinScenario, index: number) => {
    const text = `Scenario: ${scenario.name}\n${scenario.steps.join('\n')}`;
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (!scenarios || scenarios.length === 0) {
    return (
        <div className="text-center py-20 text-gray-400 dark:text-gray-600 bg-gray-50 dark:bg-[#0a0a0c] rounded-2xl border border-dashed border-gray-200 dark:border-gray-800">
            <FileCode className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p>No BDD scenarios generated.</p>
        </div>
    );
  }

  return (
    <div className="space-y-6">
      {scenarios.map((scenario, index) => (
        <div key={index} className="bg-white dark:bg-[#131316] rounded-xl border border-gray-200 dark:border-white/5 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-white/5 flex justify-between items-center bg-gray-50/50 dark:bg-white/5">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-2 py-1 rounded">
                SCENARIO
              </span>
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                {scenario.name}
              </h3>
            </div>
            <button 
              onClick={() => handleCopy(scenario, index)}
              className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              title="Copy Gherkin"
            >
              {copiedIndex === index ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <div className="p-6 bg-[#f8f9fa] dark:bg-[#0d0d0d] font-mono text-sm leading-7">
            {scenario.steps.map((step, i) => {
              const keyword = step.split(' ')[0];
              const rest = step.substring(keyword.length);
              
              let keywordColor = "text-purple-600 dark:text-purple-400";
              if (keyword === 'When') keywordColor = "text-amber-600 dark:text-amber-400";
              if (keyword === 'Then') keywordColor = "text-emerald-600 dark:text-emerald-400";
              if (keyword === 'And' || keyword === 'But') keywordColor = "text-blue-600 dark:text-blue-400";

              return (
                <div key={i} className="flex">
                  <span className={`font-bold w-16 flex-shrink-0 ${keywordColor}`}>{keyword}</span>
                  <span className="text-gray-700 dark:text-gray-300">{rest}</span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
