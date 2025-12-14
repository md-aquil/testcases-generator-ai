
import React, { useEffect, useState } from 'react';
import { TeamMember, TeamActivity, UserPlan } from '../types';
import { getTeamMembers, getTeamActivity } from '../services/firebaseService';
import { Users, UserPlus, MoreHorizontal, Activity, ShieldCheck, Lock } from 'lucide-react';

interface TeamWorkspaceProps {
  userPlan: UserPlan;
  onContactSales: () => void;
}

export const TeamWorkspace: React.FC<TeamWorkspaceProps> = ({ userPlan, onContactSales }) => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [activities, setActivities] = useState<TeamActivity[]>([]);

  useEffect(() => {
    // Only fetch if enterprise
    if (userPlan === 'ENTERPRISE') {
      getTeamMembers().then(setMembers);
      getTeamActivity().then(setActivities);
    }
  }, [userPlan]);

  // Access Control: Block non-Enterprise users
  if (userPlan !== 'ENTERPRISE') {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="relative">
          <div className="absolute inset-0 bg-indigo-500 blur-2xl opacity-20 rounded-full"></div>
          <div className="relative bg-white dark:bg-[#131316] p-6 rounded-3xl border border-gray-100 dark:border-white/10 shadow-2xl">
            <ShieldCheck className="w-16 h-16 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div className="absolute -top-2 -right-2 bg-amber-500 text-white p-1.5 rounded-full border-4 border-gray-50 dark:border-[#0a0a0c]">
            <Lock className="w-4 h-4" />
          </div>
        </div>
        
        <div className="max-w-md space-y-3">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Enterprise Team Workspace
          </h2>
          <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
            Collaborate with your entire QA team, share test assets, and manage permissions. This feature is exclusive to our Enterprise plan.
          </p>
        </div>

        <button 
          onClick={onContactSales}
          className="px-8 py-3.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
        >
          Contact Sales to Upgrade
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-indigo-500" />
            Team Workspace
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Manage members and view activity.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/20">
          <UserPlus className="w-4 h-4" />
          Invite Member
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Members List */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Active Members</h3>
          <div className="bg-white dark:bg-[#131316] rounded-2xl border border-gray-200 dark:border-white/5 overflow-hidden">
            {members.map((member, i) => (
              <div 
                key={member.id} 
                className={`p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-white/5 transition-colors ${i !== members.length - 1 ? 'border-b border-gray-100 dark:border-white/5' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">{member.name}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{member.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    member.role === 'Admin' 
                      ? 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300'
                      : 'bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-300'
                  }`}>
                    {member.role}
                  </span>
                  <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <Activity className="w-4 h-4 text-indigo-500" />
            Recent Activity
          </h3>
          <div className="relative border-l-2 border-gray-200 dark:border-gray-800 ml-3 space-y-6 py-2">
            {activities.map((activity) => (
              <div key={activity.id} className="relative pl-6">
                <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-indigo-500 ring-4 ring-white dark:ring-[#0a0a0c]"></div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <span className="font-semibold text-gray-900 dark:text-white">{activity.user}</span> {activity.action}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{activity.time}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
