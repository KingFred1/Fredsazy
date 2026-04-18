'use client';

import { useEffect } from 'react';
import { Copy, Check } from 'lucide-react';

export default function CodeBlockEnhancer() {
  useEffect(() => {
    const addCopyButtons = () => {
      const preElements = document.querySelectorAll('pre.hljs');
      
      preElements.forEach((pre) => {
        // Skip if already has a copy button
        if (pre.querySelector('.copy-button')) return;
        
        const button = document.createElement('button');
        button.className = 'copy-button absolute top-2 right-2 p-2 bg-slate-700 hover:bg-slate-600 rounded transition-colors text-slate-300 hover:text-white';
        button.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>';
        button.title = 'Copy code';
        
        const code = pre.querySelector('code')?.textContent || '';
        
        button.onclick = async () => {
          try {
            await navigator.clipboard.writeText(code);
            const originalHTML = button.innerHTML;
            button.innerHTML = '<svg class="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>';
            setTimeout(() => {
              button.innerHTML = originalHTML;
            }, 2000);
          } catch (err) {
            console.error('Failed to copy:', err);
          }
        };
        
        pre.style.position = 'relative';
        pre.appendChild(button);
      });
    };
    
    // Run on mount
    addCopyButtons();
    
    // Watch for dynamic content
    const observer = new MutationObserver(addCopyButtons);
    observer.observe(document.body, { childList: true, subtree: true });
    
    return () => observer.disconnect();
  }, []);
  
  return null;
}
