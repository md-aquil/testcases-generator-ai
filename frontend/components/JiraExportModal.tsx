
import React, { useState } from 'react';
import { X, Send, CheckCircle2, Loader2, Link as LinkIcon, AlertCircle, ChevronDown } from 'lucide-react';

interface JiraExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  count: number;
}

export const JiraExportModal: React.FC<JiraExportModalProps> = ({ isOpen, onClose, count }) => {
  const [step, setStep] = useState<'CONNECT' | 'CONFIGURE' | 'SUCCESS'>('CONNECT');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleConnect = () => {
    setLoading(true);
    setTimeout(() => {
        setLoading(false);
        setStep('CONFIGURE');
    }, 1000);
  };

  const handlePush = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API Call
    setTimeout(() => {
        setLoading(false);
        setStep('SUCCESS');
        setTimeout(() => {
            onClose();
            // Reset for next time
            setTimeout(() => setStep('CONNECT'), 300);
        }, 2000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-md bg-white dark:bg-[#131316] rounded-3xl shadow-2xl border border-gray-200 dark:border-white/10 overflow-hidden animate-in fade-in zoom-in duration-300">
        
        <div className="p-6 border-b border-gray-100 dark:border-white/5 flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <img src="https://cdn.worldvectorlogo.com/logos/jira-3.svg" alt="Jira" className="w-5 h-5" />
                Push to Jira
            </h3>
            <button onClick={onClose}><X className="w-5 h-5 text-gray-400" /></button>
        </div>

        <div className="p-6">
            {step === 'CONNECT' && (
                <div className="space-y-6 text-center py-4">
                     <div className="mx-auto w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                        <LinkIcon className="w-8 h-8 text-[#0052CC]" />
                     </div>
                     <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">Connect Atlassian Account</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                            To export test cases, we need permission to create issues in your Jira workspace.
                        </p>
                     </div>
                     <button 
                        onClick={handleConnect}
                        disabled={loading}
                        className="w-full py-3 bg-[#0052CC] hover:bg-[#0047B3] text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
                     >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Authorize Connection'}
                     </button>
                </div>
            )}

            {step === 'CONFIGURE' && (
                <form onSubmit={handlePush} className="space-y-4 animate-in slide-in-from-right-8 fade-in duration-300">
                     <div className="bg-blue-50 dark:bg-blue-900/10 p-3 rounded-xl border border-blue-100 dark:border-blue-900/20 flex gap-2 items-start">
                        <AlertCircle className="w-5 h-5 text-[#0052CC] flex-shrink-0" />
                        <p className="text-xs text-[#0052CC] dark:text-blue-200">
                            Ready to export <span className="font-bold">{count} test cases</span>. Select your project details below.
                        </p>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">Jira Domain URL</label>
                        <input type="text" defaultValue="https://acme.atlassian.net" className="w-full px-4 py-2.5 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#0052CC]" />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">Project Key</label>
                        <input type="text" defaultValue="QA" className="w-full px-4 py-2.5 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#0052CC]" />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">Issue Type</label>
                        <div className="relative">
                            <select className="w-full px-4 py-2.5 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#0052CC] appearance-none cursor-pointer">
                                <option>Test Case</option>
                                <option>Bug</option>
                                <option>Task</option>
                                <option>Story</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                        </div>
                    </div>

                    <div className="pt-2">
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 py-3 bg-[#0052CC] hover:bg-[#0047B3] text-white font-semibold rounded-xl transition-all disabled:opacity-70"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Push Tickets'}
                        </button>
                    </div>
                </form>
            )}

            {step === 'SUCCESS' && (
                <div className="flex flex-col items-center justify-center py-8 text-center animate-in zoom-in fade-in duration-300">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                        <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Success!</h4>
                    <p className="text-gray-500 dark:text-gray-400">
                        Successfully created {count} tickets in project <span className="font-mono font-bold text-gray-700 dark:text-gray-300">QA-24</span>.
                    </p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};
