
import React from 'react';
import { HistoryItem, UserPlan } from '../types';
import { Clock, FileText, Code, ChevronRight, Search, Calendar, Lock } from 'lucide-react';

interface HistoryDashboardProps {
  history: HistoryItem[];
  onLoadItem: (item: HistoryItem) => void;
  userPlan: UserPlan;
  onUpgrade: () => void;
}

export const HistoryDashboard: React.FC<HistoryDashboardProps> = ({ 
  history, 
  onLoadItem, 
  userPlan,
  onUpgrade
}) => {
  if (history.length === 0) {
    return (
      <div className="text-center py-20 bg-gray-50 dark:bg-[#0a0a0c] rounded-3xl border border-dashed border-gray-200 dark:border-gray-800">
        <Clock className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">No History Yet</h3>
        <p className="text-gray-500 dark:text-gray-400">Generated assets will appear here automatically.</p>
      </div>
    );
  }

  // Calculate 24 hours ago
  const oneDayAgo = new Date().getTime() - (24 * 60 * 60 * 1000);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Generation History</h2>
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search history..." 
            className="pl-10 pr-4 py-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {history.map((item) => {
          const itemDate = new Date(item.date).getTime();
          const isLocked = userPlan === 'STARTER' && itemDate < oneDayAgo;

          return (
            <div 
              key={item.id}
              onClick={() => isLocked ? onUpgrade() : onLoadItem(item)}
              className={`
                relative group rounded-2xl border transition-all duration-300 overflow-hidden
                ${isLocked 
                  ? 'bg-gray-50 dark:bg-[#131316] border-gray-200 dark:border-white/5 cursor-not-allowed' 
                  : 'cursor-pointer bg-white dark:bg-[#131316] border-gray-100 dark:border-white/5 hover:border-indigo-500/30 dark:hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/5'
                }
              `}
            >
              {/* Blurred Content for Locked Items */}
              <div className={`p-5 flex items-start justify-between gap-4 ${isLocked ? 'blur-sm opacity-50 select-none' : ''}`}>
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500 mb-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(item.date).toLocaleDateString()}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700"></span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-200 line-clamp-2 leading-relaxed">
                    "{item.userStory}"
                  </p>
                  <div className="flex items-center gap-3 pt-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-medium border border-emerald-100 dark:border-emerald-500/20">
                      <FileText className="w-3 h-3" />
                      {item.testCaseCount} Cases
                    </span>
                    {item.scriptCount > 0 && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400 text-xs font-medium border border-purple-100 dark:border-purple-500/20">
                        <Code className="w-3 h-3" />
                        {item.scriptCount} Scripts
                      </span>
                    )}
                  </div>
                </div>
                {!isLocked && (
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 dark:bg-white/5 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-500/20 transition-colors">
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
                  </div>
                )}
              </div>

              {/* Lock Overlay */}
              {isLocked && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-100/10 dark:bg-black/10 hover:bg-gray-100/20 dark:hover:bg-black/20 transition-colors">
                  <div className="bg-white/90 dark:bg-black/80 backdrop-blur-md px-4 py-2 rounded-full shadow-xl border border-gray-200 dark:border-white/10 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-indigo-500" />
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">Upgrade to view past history</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
