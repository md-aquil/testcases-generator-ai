
import React, { useState } from 'react';
import { generateApiTests } from '../services/geminiService';
import { Server, Loader2, Download, Braces } from 'lucide-react';

interface ApiTestGeneratorProps {
  onGenerateAttempt?: () => boolean;
  onGenerateSuccess?: () => void;
}

export const ApiTestGenerator: React.FC<ApiTestGeneratorProps> = ({ onGenerateAttempt, onGenerateSuccess }) => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) return;

    if (onGenerateAttempt && !onGenerateAttempt()) {
      return;
    }

    setLoading(true);
    try {
      const tests = await generateApiTests(input);
      setResult(tests);
      if (onGenerateSuccess) onGenerateSuccess();
    } catch (e) {
      setResult("// Error generating API tests.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([result], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `postman_collection_${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 animate-fade-in-up">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Server className="w-6 h-6 text-orange-500" />
          Swagger to Postman Generator
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Enter a Swagger/OpenAPI URL or JSON to generate a comprehensive Postman collection with tests.
        </p>
      </div>

      <div className="bg-white dark:bg-[#131316] p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm mb-8">
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
          Swagger URL or JSON Definition
        </label>
        <div className="flex gap-4">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="https://api.example.com/swagger.json"
            className="flex-1 px-4 py-3 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl text-sm outline-none focus:ring-2 focus:ring-orange-500 dark:text-white"
          />
          <button 
            onClick={handleGenerate}
            disabled={loading || !input}
            className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Generate'}
          </button>
        </div>
      </div>

      {result && (
        <div className="bg-[#1e1e20] rounded-xl border border-white/10 overflow-hidden animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-[#2a2a2d] px-4 py-3 border-b border-white/5 flex justify-between items-center">
            <div className="flex items-center gap-2 text-orange-400">
              <Braces className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Postman Collection</span>
            </div>
            <button 
              onClick={handleDownload}
              className="flex items-center gap-2 px-3 py-1.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-lg transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Download JSON
            </button>
          </div>
          <pre className="p-6 overflow-auto max-h-[500px] font-mono text-sm text-orange-100/80 custom-scrollbar">
            {result}
          </pre>
        </div>
      )}
    </div>
  );
};
