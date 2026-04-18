import React from "react";

export default function PrivacyPage() {
  return (
    <main className="section_container py-20">
      <div className="mx-auto max-w-4xl space-y-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-950">
          Privacy Policy
        </h1>
        <p className="text-slate-600">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        <div className="prose prose-slate max-w-none">
          <p>
            This Privacy Policy describes how techfacts ("we", "us", or "our") collects, uses, and protects your information when you use our website.
          </p>
          <h2>Information We Collect</h2>
          <p>
            We may collect information you provide directly to us, such as when you contact us or subscribe to our newsletter.
          </p>
          <h2>How We Use Your Information</h2>
          <p>
            We use the information we collect to provide, maintain, and improve our services, communicate with you, and comply with legal obligations.
          </p>
          <h2>Information Sharing</h2>
          <p>
            We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.
          </p>
          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at hello@techfacts.dev.
          </p>
        </div>
      </div>
    </main>
  );
}