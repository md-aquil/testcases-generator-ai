
import React, { useState } from 'react';
import { generateUnitTests } from '../services/geminiService';
import { FileCode, Loader2, Copy, Check, Play } from 'lucide-react';

interface UnitTestGeneratorProps {
  onGenerateAttempt?: () => boolean;
  onGenerateSuccess?: () => void;
}

export const UnitTestGenerator: React.FC<UnitTestGeneratorProps> = ({ onGenerateAttempt, onGenerateSuccess }) => {
  const [code, setCode] = useState('');
  const [framework, setFramework] = useState<'Jest' | 'Mocha'>('Jest');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!code.trim()) return;

    if (onGenerateAttempt && !onGenerateAttempt()) {
      return;
    }

    setLoading(true);
    try {
      const tests = await generateUnitTests({
        code,
        framework
      });
      setResult(tests);
      if (onGenerateSuccess) onGenerateSuccess();
    } catch (e) {
      setResult("// Error generating tests. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 animate-fade-in-up">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <FileCode className="w-6 h-6 text-blue-500" />
            Code-to-Test Generator
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Paste your React component or Node.js function, get production-ready unit tests.
          </p>
        </div>
        <div className="flex bg-gray-100 dark:bg-white/5 p-1 rounded-lg">
          {(['Jest', 'Mocha'] as const).map((fw) => (
            <button
              key={fw}
              onClick={() => setFramework(fw)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${framework === fw
                  ? 'bg-white dark:bg-blue-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
            >
              {fw}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 h-[600px]">
        {/* Input */}
        <div className="flex flex-col h-full bg-white dark:bg-[#0f0e1a] rounded-xl border border-gray-200 dark:border-white/10 shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-white/5">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Input Source Code</span>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="// Paste your component or function here..."
            className="flex-1 p-4 bg-transparent border-none resize-none focus:ring-0 outline-none font-mono text-sm text-gray-900 dark:text-gray-300 leading-relaxed"
          />
          <div className="p-4 border-t border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-white/5">
            <button
              onClick={handleGenerate}
              disabled={loading || !code}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Generate Tests <Play className="w-4 h-4 fill-white" /></>}
            </button>
          </div>
        </div>

        {/* Output */}
        <div className="flex flex-col h-full bg-[#1e1e20] rounded-xl border border-white/10 shadow-2xl overflow-hidden relative group">
          <div className="px-4 py-3 border-b border-white/5 bg-[#2a2a2d] flex justify-between items-center">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Generated Tests ({framework})</span>
            <button
              onClick={handleCopy}
              className="p-1.5 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <pre className="flex-1 p-4 overflow-auto font-mono text-sm text-blue-100 leading-relaxed custom-scrollbar">
            {result || <span className="text-gray-600 italic">// Generated unit tests will appear here...</span>}
          </pre>
        </div>
      </div>
    </div>
  );
};
