// components/ShareButtons.tsx
'use client';

import React from 'react';
import { Twitter, Linkedin, Facebook, Link2, Check } from 'lucide-react';

const getShareUrls = (url: string, title: string) => ({
  twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
  linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
});

export default function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = React.useState(false);
  const shareUrls = getShareUrls(url, title);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => window.open(shareUrls.twitter, '_blank')}
        className="p-2 rounded-full bg-black/5 hover:bg-black/10 transition-colors"
        aria-label="Share on Twitter"
      >
        <Twitter size={18} />
      </button>
      <button
        onClick={() => window.open(shareUrls.linkedin, '_blank')}
        className="p-2 rounded-full bg-black/5 hover:bg-black/10 transition-colors"
        aria-label="Share on LinkedIn"
      >
        <Linkedin size={18} />
      </button>
      <button
        onClick={() => window.open(shareUrls.facebook, '_blank')}
        className="p-2 rounded-full bg-black/5 hover:bg-black/10 transition-colors"
        aria-label="Share on Facebook"
      >
        <Facebook size={18} />
      </button>
      <button
        onClick={copyToClipboard}
        className="p-2 rounded-full bg-black/5 hover:bg-black/10 transition-colors"
        aria-label="Copy link"
      >
        {copied ? <Check size={18} className="text-green-600" /> : <Link2 size={18} />}
      </button>
    </div>
  );
}