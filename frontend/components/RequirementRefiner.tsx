
import React from 'react';
import { AnalysisResult } from '../types';
import { AlertTriangle, CheckCircle, ArrowRight, X } from 'lucide-react';

interface RequirementRefinerProps {
  analysis: AnalysisResult;
  onProceed: () => void;
  onCancel: () => void;
}

export const RequirementRefiner: React.FC<RequirementRefinerProps> = ({ analysis, onProceed, onCancel }) => {
  if (!analysis.isAmbiguous && analysis.missingDetails.length === 0) {
    return null; // Should auto-proceed if clean, but handled by parent for safety
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCancel}></div>
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#131316] rounded-2xl shadow-2xl border border-gray-200 dark:border-white/10 overflow-hidden animate-in fade-in zoom-in duration-300">
        
        <div className="p-6 border-b border-gray-100 dark:border-white/5 bg-amber-50/50 dark:bg-amber-500/10">
          <h2 className="text-xl font-bold text-amber-800 dark:text-amber-200 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6" />
            Requirement Refinement Needed
          </h2>
          <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
            Our AI detected some ambiguities in your user story. Clarifying these now will prevent bad test cases.
          </p>
        </div>

        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          {analysis.missingDetails.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-2">Missing Details</h3>
              <ul className="space-y-2">
                {analysis.missingDetails.map((item, i) => (
                  <li key={i} className="flex gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <span className="text-red-500 font-bold">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {analysis.issues.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-2">Potential Ambiguities</h3>
              <ul className="space-y-2">
                {analysis.issues.map((item, i) => (
                  <li key={i} className="flex gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <span className="text-amber-500 font-bold">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {analysis.suggestions.length > 0 && (
            <div className="bg-indigo-50 dark:bg-indigo-500/10 p-4 rounded-xl">
              <h3 className="text-sm font-bold text-indigo-900 dark:text-indigo-200 uppercase tracking-wider mb-2">AI Suggestions</h3>
              <ul className="space-y-2">
                {analysis.suggestions.map((item, i) => (
                  <li key={i} className="flex gap-2 text-sm text-indigo-800 dark:text-indigo-300 italic">
                    <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-100 dark:border-white/5 flex justify-between gap-4">
          <button 
            onClick={onCancel}
            className="px-6 py-2.5 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 rounded-xl transition-colors"
          >
            Edit Story
          </button>
          <button 
            onClick={onProceed}
            className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg shadow-indigo-500/20 transition-all"
          >
            Generate Anyway
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
