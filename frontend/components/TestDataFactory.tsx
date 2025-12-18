import React, { useState } from 'react';
import { generateSyntheticData } from '../services/geminiService';
import { saveSyntheticData } from '../services/firebaseService'; // 🔥 History saving import
import { Database, Copy, Check, Sparkles, Download, FileJson, RefreshCw, AlertCircle } from 'lucide-react';

interface TestDataFactoryProps {
  onGenerateAttempt?: () => boolean;
  onGenerateSuccess?: () => void;
}

export const TestDataFactory: React.FC<TestDataFactoryProps> = ({ onGenerateAttempt, onGenerateSuccess }) => {
  const [prompt, setPrompt] = useState('');
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    // 1. Check Credits
    if (onGenerateAttempt && !onGenerateAttempt()) return;

    setLoading(true);
    setError(null);
    setData(null);

    try {
      // 2. Generate Data from AI
      const result = await generateSyntheticData(prompt);
      
      let finalData = result;

      // 3. Pretty Print JSON
      try {
        const parsed = JSON.parse(result);
        finalData = JSON.stringify(parsed, null, 2);
        setData(finalData);
      } catch (e) {
        setData(result); // Fallback if not valid JSON
      }

      // 4. 🔥 Save to History
      await saveSyntheticData(prompt, finalData);

      // 5. Deduct Credit
      if (onGenerateSuccess) onGenerateSuccess();

    } catch (err) {
      console.error(err);
      setError('Failed to generate data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (data) {
      navigator.clipboard.writeText(data);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (!data) return;
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `mock_data_${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="h-full flex flex-col animate-fade-in max-w-5xl mx-auto w-full">
      
      {/* Header Section */}
      <div className="mb-6 flex items-center justify-between shrink-0">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="p-2 bg-purple-500/10 rounded-lg">
              <Database className="w-6 h-6 text-purple-400" />
            </span>
            Data Factory
          </h2>
          <p className="text-gray-400 text-sm mt-1 ml-1">
            Generate strictly realistic mock data (JSON) for your testing needs.
          </p>
        </div>
      </div>

      {/* Main Content - Vertical Stack */}
      <div className="flex flex-col gap-6 flex-1 min-h-0">
        
        {/* Top Panel: Definition (Input) - Fixed Height */}
        <div className="flex flex-col bg-[#0F0F10] border border-gray-800 rounded-2xl overflow-hidden shadow-xl h-[280px] shrink-0">
          <div className="p-3 border-b border-gray-800 flex justify-between items-center bg-[#151516]">
            <h3 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-purple-400" />
              Define Requirements
            </h3>
            <button 
              onClick={() => setPrompt('')}
              className="text-xs text-gray-500 hover:text-white transition-colors"
            >
              Clear
            </button>
          </div>
          
          <div className="p-5 flex-1 flex flex-col relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the data you need...&#10;&#10;Example:&#10;Generate 50 users with Indian names, valid +91 phone numbers, and random job titles inside Bangalore."
              className="flex-1 w-full bg-transparent border-none text-gray-200 placeholder-gray-600 focus:ring-0 resize-none font-mono text-sm leading-relaxed"
              spellCheck={false}
            />

            {/* Generate Button (Floating Bottom Right) */}
            <div className="absolute bottom-5 right-5">
              <button
                onClick={handleGenerate}
                disabled={loading || !prompt.trim()}
                className={`
                  flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 text-sm
                  ${loading || !prompt.trim()
                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 hover:shadow-purple-500/25 active:scale-95'}
                `}
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate Data
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Panel: Result (Output) - Fills remaining space */}
        <div className="flex flex-col bg-[#0F0F10] border border-gray-800 rounded-2xl overflow-hidden shadow-xl flex-1 min-h-0">
          <div className="p-3 border-b border-gray-800 flex justify-between items-center bg-[#151516]">
            <h3 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
              <FileJson className="w-4 h-4 text-green-400" />
              Generated JSON
            </h3>
            
            {data && (
              <div className="flex gap-2">
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1F1F22] hover:bg-[#2A2A2D] border border-gray-700 rounded-lg transition-all text-xs text-gray-300"
                >
                  {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1F1F22] hover:bg-[#2A2A2D] border border-gray-700 rounded-lg transition-all text-xs text-gray-300"
                >
                  <Download className="w-3 h-3" />
                  Save
                </button>
              </div>
            )}
          </div>

          <div className="flex-1 p-0 overflow-hidden relative bg-[#0a0a0a]">
            {loading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 gap-4">
                <div className="relative">
                  <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
                </div>
                <span className="animate-pulse text-sm">Fabricating synthetic data...</span>
              </div>
            ) : error ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-red-400 gap-3">
                <AlertCircle className="w-10 h-10 opacity-80" />
                <span className="text-sm">{error}</span>
              </div>
            ) : data ? (
              <pre className="h-full w-full p-6 overflow-auto text-xs sm:text-sm font-mono text-green-400 custom-scrollbar leading-relaxed">
                {data}
              </pre>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-700 gap-4">
                <div className="p-4 bg-[#151516] rounded-2xl border border-gray-800">
                  <Database className="w-8 h-8 opacity-40" />
                </div>
                <span className="text-sm">Enter requirements above to generate JSON</span>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default TestDataFactory;