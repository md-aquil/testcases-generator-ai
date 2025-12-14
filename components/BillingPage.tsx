
import React from 'react';
import { UserPlan, UsageData } from '../types';
import { CheckCircle2, Zap, Shield, CreditCard, ArrowUpRight, RefreshCw } from 'lucide-react';

interface BillingPageProps {
  userPlan: UserPlan;
  usageData: UsageData;
  dailyLimit: number;
  onUpgrade: () => void;
  onPlanChange?: (plan: UserPlan) => void;
}

export const BillingPage: React.FC<BillingPageProps> = ({ 
  userPlan, 
  usageData, 
  dailyLimit,
  onUpgrade,
  onPlanChange
}) => {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Billing & Subscription</h2>
        {userPlan === 'STARTER' && (
          <button 
            onClick={onUpgrade}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            <Zap className="w-4 h-4" />
            Upgrade Now
          </button>
        )}
      </div>

      {/* Demo Notice */}
      <div className="bg-indigo-50/50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 rounded-xl p-4 mb-8 flex items-start gap-3">
        <div className="bg-indigo-100 dark:bg-indigo-500/20 p-2 rounded-full text-indigo-600 dark:text-indigo-400">
           <RefreshCw className="w-4 h-4" />
        </div>
        <div>
           <h4 className="text-sm font-bold text-indigo-900 dark:text-indigo-100">Demo Environment</h4>
           <p className="text-xs text-indigo-700 dark:text-indigo-300 mt-1">
             You are in a demo environment. Click the buttons below to instantly switch between plans and test plan-specific features (like Automation Scripts and Team Workspace).
           </p>
        </div>
      </div>

      {/* Current Plan Card */}
      <div className="bg-white dark:bg-[#131316] rounded-2xl border border-gray-200 dark:border-white/5 p-6 mb-8 shadow-sm">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Current Plan</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              {userPlan} 
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                userPlan === 'STARTER' 
                  ? 'bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-300' 
                  : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300'
              }`}>
                Active
              </span>
            </h3>
          </div>
          <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-xl">
             <CreditCard className="w-6 h-6 text-gray-400" />
          </div>
        </div>

        {userPlan === 'STARTER' && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-300">Daily Generations</span>
              <span className="font-medium text-gray-900 dark:text-white">{usageData.count} / {dailyLimit}</span>
            </div>
            <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((usageData.count / dailyLimit) * 100, 100)}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-400 pt-1">Resets daily at midnight UTC.</p>
          </div>
        )}
        
        {userPlan !== 'STARTER' && (
           <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm font-medium">
             <CheckCircle2 className="w-4 h-4" />
             Unlimited Usage Active
           </div>
        )}
      </div>

      {/* Available Plans */}
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Available Plans</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Starter */}
        <div className={`p-6 rounded-2xl border ${userPlan === 'STARTER' ? 'border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50/50 dark:bg-indigo-500/5' : 'border-gray-200 dark:border-white/5 bg-white dark:bg-[#131316]'}`}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white">Starter</h4>
              <p className="text-2xl font-bold mt-1">$0<span className="text-sm font-normal text-gray-500">/mo</span></p>
            </div>
            {userPlan === 'STARTER' && <CheckCircle2 className="w-5 h-5 text-indigo-500" />}
          </div>
          <ul className="space-y-3 mb-6 text-sm text-gray-600 dark:text-gray-400">
            <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-gray-400" /> 5 Stories / Day</li>
            <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-gray-400" /> Manual Tests Only</li>
          </ul>
          <button 
             onClick={() => onPlanChange?.('STARTER')}
             disabled={userPlan === 'STARTER'}
             className="w-full py-2 rounded-lg text-sm font-medium border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {userPlan === 'STARTER' ? 'Current Plan' : 'Switch to Starter'}
          </button>
        </div>

        {/* Pro */}
        <div className={`relative p-6 rounded-2xl border ${userPlan === 'PRO' ? 'border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50/50 dark:bg-indigo-500/5' : 'border-gray-200 dark:border-white/5 bg-white dark:bg-[#131316]'}`}>
          {userPlan !== 'PRO' && userPlan !== 'ENTERPRISE' && (
             <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-[10px] font-bold px-3 py-1 rounded-full">RECOMMENDED</div>
          )}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white">Pro</h4>
              <p className="text-2xl font-bold mt-1">$29<span className="text-sm font-normal text-gray-500">/mo</span></p>
            </div>
            {userPlan === 'PRO' && <CheckCircle2 className="w-5 h-5 text-indigo-500" />}
          </div>
          <ul className="space-y-3 mb-6 text-sm text-gray-600 dark:text-gray-400">
            <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-500" /> Unlimited Stories</li>
            <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-500" /> Automation Scripts</li>
            <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-500" /> Priority Support</li>
          </ul>
           <button 
             onClick={() => onPlanChange?.('PRO')}
             disabled={userPlan === 'PRO'}
             className="w-full py-2 rounded-lg text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:bg-indigo-600 transition-colors"
           >
              {userPlan === 'PRO' ? 'Current Plan' : 'Switch to Pro'}
           </button>
        </div>

        {/* Enterprise */}
        <div className={`p-6 rounded-2xl border ${userPlan === 'ENTERPRISE' ? 'border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50/50 dark:bg-indigo-500/5' : 'border-gray-200 dark:border-white/5 bg-white dark:bg-[#131316]'}`}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white">Enterprise</h4>
              <p className="text-2xl font-bold mt-1">$99<span className="text-sm font-normal text-gray-500">/mo</span></p>
            </div>
            {userPlan === 'ENTERPRISE' && <CheckCircle2 className="w-5 h-5 text-indigo-500" />}
          </div>
          <ul className="space-y-3 mb-6 text-sm text-gray-600 dark:text-gray-400">
            <li className="flex gap-2"><Shield className="w-4 h-4 text-purple-500" /> Team Workspace</li>
            <li className="flex gap-2"><Shield className="w-4 h-4 text-purple-500" /> SSO & Admin Controls</li>
            <li className="flex gap-2"><Shield className="w-4 h-4 text-purple-500" /> API Access</li>
          </ul>
          <button 
             onClick={() => onPlanChange?.('ENTERPRISE')}
             disabled={userPlan === 'ENTERPRISE'}
             className="w-full py-2 rounded-lg text-sm font-medium border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
             {userPlan === 'ENTERPRISE' ? 'Current Plan' : 'Switch to Enterprise'}
          </button>
        </div>

      </div>
    </div>
  );
};
