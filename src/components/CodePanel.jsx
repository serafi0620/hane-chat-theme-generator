import React, { useState } from 'react';

const CodePanel = ({ generatedCSS }) => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        const textArea = document.createElement('textarea');
        textArea.value = generatedCSS;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Copy failed', err);
        }
        document.body.removeChild(textArea);
    };

    return (
        <div className="bg-slate-900 rounded-3xl shadow-xl overflow-hidden flex flex-col border border-slate-800">
            <div className="flex justify-between items-center px-6 py-4 bg-slate-800/50 border-b border-slate-700">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-500/10 rounded-lg">
                        <span className="text-indigo-400 text-sm">📄</span>
                    </div>
                    <span className="text-sm font-bold text-slate-200">CSS</span>
                </div>
                <button 
                    onClick={copyToClipboard} 
                    className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg active:scale-95 ${copied ? 'bg-green-500 text-white shadow-green-500/20' : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-indigo-500/20'}`}
                >
                    {copied ? '복사 완료!' : '코드 복사하기'}
                </button>
            </div>
            <div className="p-6 overflow-x-auto text-sm font-mono text-slate-400 leading-relaxed h-[300px] code-scrollbar bg-[#0f172a]">
                <pre className="m-0"><code>{generatedCSS}</code></pre>
            </div>
        </div>
    );
};

export default CodePanel;
