import React from 'react';
import { X, CheckCircle2, Zap } from 'lucide-react';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
  reason: 'LIMIT_REACHED' | 'FEATURE_LOCKED';
}

export const UpgradeModal: React.FC<UpgradeModalProps> = ({ isOpen, onClose, onUpgrade, reason }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#131316] rounded-3xl shadow-2xl border border-gray-200 dark:border-white/10 overflow-hidden animate-in fade-in zoom-in duration-300">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white z-10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Left Side - Message */}
          <div className="p-8 md:w-1/2 flex flex-col justify-center">
             <div className="w-12 h-12 bg-amber-100 dark:bg-amber-500/20 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-amber-600 dark:text-amber-400" />
             </div>
             <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
               {reason === 'LIMIT_REACHED' ? 'Daily Limit Reached' : 'Unlock Pro Features'}
             </h2>
             <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
               {reason === 'LIMIT_REACHED' 
                 ? "You've reached your daily limit of 5 user stories on the Starter plan. Upgrade to generate unlimited assets."
                 : "Automation script generation is available exclusively on the Pro plan. Upgrade to automate your workflow instantly."}
             </p>
             <button 
               onClick={onUpgrade}
               className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/20"
             >
               Upgrade to Pro - $29/mo
             </button>
          </div>

          {/* Right Side - Benefits */}
          <div className="bg-gray-50 dark:bg-black/20 p-8 md:w-1/2 border-l border-gray-100 dark:border-white/5">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-6">
              Pro Plan Includes
            </h3>
            <ul className="space-y-4">
               {[
                 'Unlimited User Stories',
                 'All Automation Frameworks',
                 'Export to Code & CSV',
                 'Priority AI Processing',
                 '24/7 Priority Support'
               ].map((item, i) => (
                 <li key={i} className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                   <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                   {item}
                 </li>
               ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
