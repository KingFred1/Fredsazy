'use client';

import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export default function CodeBlock({ code, language = 'javascript' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const highlightedCode = hljs.highlight(code, { language, ignoreIllegals: true }).value;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="relative group rounded-lg overflow-hidden bg-slate-900">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 bg-slate-700 hover:bg-slate-600 rounded transition-colors opacity-0 group-hover:opacity-100 z-10"
        title="Copy code"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-400" />
        ) : (
          <Copy className="w-4 h-4 text-slate-300" />
        )}
      </button>
      <pre className="p-4 overflow-x-auto">
        <code
          className={`language-${language} text-sm`}
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </pre>
    </div>
  );
}
