import React, { useState } from 'react';
import { AutomationScript } from '../types';
import { Copy, Download, Check, Terminal, Code2 } from 'lucide-react';

interface AutomationViewerProps {
  script: AutomationScript;
}

export const AutomationViewer: React.FC<AutomationViewerProps> = ({ script }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(script.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([script.code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = script.fileName || 'test_script.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="group relative bg-[#1e1e1e] dark:bg-[#0d0d0d] rounded-2xl overflow-hidden shadow-2xl border border-gray-800 dark:border-white/10 transition-all duration-300">
      
      {/* Header */}
      <div className="bg-[#2d2d2d] dark:bg-[#161618] px-4 py-3 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-500/20 p-2 rounded-lg text-indigo-400 ring-1 ring-inset ring-indigo-500/20">
            <Code2 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-gray-200 font-medium text-sm flex items-center gap-2">
              {script.fileName}
              <span className="hidden sm:inline-flex text-[10px] uppercase tracking-wider text-gray-500 font-bold px-2 py-0.5 bg-white/5 rounded-full border border-white/5">
                {script.language}
              </span>
            </h3>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 text-xs font-medium text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg transition-colors border border-white/5"
            title="Copy to clipboard"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 text-xs font-medium text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg transition-colors border border-white/5"
            title="Download file"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Download</span>
          </button>
        </div>
      </div>

      {/* Code Editor Area */}
      <div className="relative group/editor">
        <div className="absolute top-0 left-0 w-10 h-full bg-[#1e1e1e] dark:bg-[#0d0d0d] border-r border-white/5 flex flex-col items-center py-4 select-none z-10">
          {script.code.split('\n').map((_, i) => (
            <span key={i} className="text-[10px] text-gray-700 font-mono leading-6">{i + 1}</span>
          ))}
        </div>
        <pre className="p-4 pl-14 overflow-x-auto text-sm font-mono text-gray-300 leading-6 custom-scrollbar bg-[#1e1e1e] dark:bg-[#0d0d0d]">
          <code>{script.code}</code>
        </pre>
      </div>

      {/* Footer */}
      <div className="bg-[#252526] dark:bg-[#111111] px-4 py-2 border-t border-white/5 text-[11px] text-gray-500 flex items-center gap-2">
        <Terminal className="w-3 h-3 text-indigo-400" />
        <span>Generated for <strong className="text-gray-400">{script.framework}</strong>. Check dependencies before executing.</span>
      </div>
    </div>
  );
};