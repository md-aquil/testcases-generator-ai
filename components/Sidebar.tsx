
import React from 'react';
import { Page, UserPlan, UsageData, UserProfile } from '../types';
import { 
  LayoutDashboard, 
  History, 
  Users, 
  CreditCard, 
  UserCircle, 
  LogOut, 
  Bot, 
  Zap, 
  Moon, 
  Sun 
} from 'lucide-react';

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  userPlan: UserPlan;
  usageData: UsageData;
  dailyLimit: number;
  onLogout: () => void;
  userProfile: UserProfile;
  isDarkMode: boolean;
  toggleTheme: () => void;
  onUpgrade: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onNavigate,
  userPlan,
  usageData,
  dailyLimit,
  onLogout,
  userProfile,
  isDarkMode,
  toggleTheme,
  onUpgrade
}) => {
  const navItems = [
    { id: 'APP', label: 'Generator', icon: LayoutDashboard },
    { id: 'HISTORY', label: 'History', icon: History },
    { id: 'TEAM', label: 'Team', icon: Users },
    { id: 'BILLING', label: 'Billing', icon: CreditCard },
    { id: 'PROFILE', label: 'Profile', icon: UserCircle },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-[#08080a] border-r border-gray-200 dark:border-white/5 flex flex-col h-full transition-colors duration-300 flex-shrink-0 z-20">
      
      {/* Logo Area */}
      <div className="p-6 flex items-center gap-3">
        <div className="bg-gradient-to-br from-violet-600 via-fuchsia-600 to-indigo-600 text-white p-2.5 rounded-xl shadow-lg shadow-violet-500/20">
          <Bot className="w-5 h-5" />
        </div>
        <div>
          <h1 className="font-bold text-gray-900 dark:text-white leading-tight tracking-tight text-lg">ZiaraQA</h1>
          <p className="text-[10px] text-fuchsia-500 font-bold tracking-widest uppercase opacity-80">Suite</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2 overflow-y-auto py-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id as Page)}
            className={`
              relative group w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
              ${currentPage === item.id 
                ? 'text-white' 
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}
            `}
          >
            {/* Active Background Pill */}
            {currentPage === item.id && (
               <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl shadow-lg shadow-violet-500/30 animate-in fade-in zoom-in duration-200"></div>
            )}
            
            <item.icon className={`w-4 h-4 relative z-10 ${currentPage === item.id ? 'text-white' : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'}`} />
            <span className="relative z-10">{item.label}</span>
            
            {/* Hover Glow for non-active items */}
            {currentPage !== item.id && (
                <div className="absolute inset-0 rounded-xl bg-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            )}
          </button>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-200 dark:border-white/5 space-y-4 bg-gray-50/50 dark:bg-black/20">
        
        {/* Usage Card */}
        <div className="bg-white dark:bg-[#131316] rounded-xl p-4 border border-gray-100 dark:border-white/5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              {userPlan === 'STARTER' ? 'Credits' : 'Pro'}
            </span>
            {userPlan === 'STARTER' && (
              <span className="text-xs text-gray-500">
                {usageData.count}/{dailyLimit}
              </span>
            )}
            {userPlan !== 'STARTER' && (
              <Zap className="w-3 h-3 text-amber-500" />
            )}
          </div>
          
          {userPlan === 'STARTER' ? (
            <>
              <div className="h-1.5 w-full bg-gray-200 dark:bg-black/40 rounded-full overflow-hidden mb-3">
                <div 
                  className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(217,70,239,0.5)]"
                  style={{ width: `${Math.min((usageData.count / dailyLimit) * 100, 100)}%` }}
                ></div>
              </div>
              <button 
                onClick={onUpgrade}
                className="w-full py-1.5 text-xs font-semibold text-white bg-gray-900 dark:bg-white dark:text-gray-900 rounded-lg hover:opacity-90 transition-opacity"
              >
                Upgrade Plan
              </button>
            </>
          ) : (
             <div className="text-xs text-gray-500 dark:text-gray-400">
               Unlimited generation active.
             </div>
          )}
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3 pt-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-500 to-indigo-500 flex items-center justify-center text-white text-xs font-bold shadow-md ring-2 ring-white dark:ring-black">
            {userProfile.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-gray-900 dark:text-white truncate">
              {userProfile.name}
            </p>
            <p className="text-[10px] text-gray-500 truncate">{userPlan} Plan</p>
          </div>
          <button 
            onClick={toggleTheme}
            className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            {isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>
        </div>

        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-2 text-xs font-medium text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition-colors pl-1"
        >
          <LogOut className="w-3.5 h-3.5" />
          Sign Out
        </button>

      </div>
    </aside>
  );
};
