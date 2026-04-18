import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | Fredsazy",
  description: "Terms of Service for Fredsazy - Software development, DevOps, and technology insights platform.",
  robots: "noindex, follow",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm text-gray-600 dark:text-gray-400">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>Effective immediately</span>
          </div>
        </div>

        {/* Introduction */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">1. Introduction</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
            Welcome to Fredsazy ("we," "our," or "us"). By accessing or using fredsazy.com (the "Site"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these Terms, you may not access the Site.
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Fredsazy is a platform for software development, DevOps, technology insights, and business strategy content. These Terms apply to all visitors, users, and others who access the Site.
          </p>
        </section>

        {/* Content Ownership */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">2. Content Ownership & Intellectual Property</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
            All content published on Fredsazy—including articles, code snippets, tutorials, graphics, logos, and original research—is the intellectual property of Iria Fredrick Victor (Fredsazy) unless otherwise stated.
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
            You may not:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400 mb-3">
            <li>Republish, redistribute, or sell our content without explicit written permission</li>
            <li>Use our content for commercial purposes without attribution and licensing</li>
            <li>Modify, translate, or create derivative works based on our content</li>
            <li>Remove any copyright or proprietary notices from our content</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Code snippets and examples are provided under the MIT License unless specified otherwise, allowing you to use them in your own projects with attribution.
          </p>
        </section>

        {/* User Conduct */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">3. User Conduct</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
            By using Fredsazy, you agree to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400 mb-3">
            <li>Use the Site only for lawful purposes and in accordance with these Terms</li>
            <li>Not engage in any activity that disrupts or interferes with the Site's functionality</li>
            <li>Not attempt to gain unauthorized access to any portion of the Site</li>
            <li>Not use automated systems (bots, scrapers) to access the Site without permission</li>
            <li>Not post or transmit any malicious code, viruses, or harmful content</li>
          </ul>
        </section>

        {/* Comments & User Content */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">4. Comments & User-Generated Content</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
            When you post comments or submit content to Fredsazy, you grant us a non-exclusive, royalty-free, perpetual license to use, modify, and display that content on the Site.
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
            You represent that you own or have permission to share any content you post. We reserve the right to moderate, edit, or remove any user content that violates these Terms.
          </p>
          <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 p-4 rounded-r-lg">
            <p className="text-sm text-amber-800 dark:text-amber-300">
              <strong>⚠️ Prohibited Content:</strong> We do not permit spam, hate speech, harassment, illegal content, or self-promotion without prior approval.
            </p>
          </div>
        </section>

        {/* Third-Party Links */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">5. Third-Party Links & Affiliate Disclosure</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
            Fredsazy may contain links to third-party websites, products, or services. These links are provided for your convenience and do not signify our endorsement.
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
            Some links on Fredsazy may be affiliate links, meaning we may earn a commission if you make a purchase through those links—at no additional cost to you. We only recommend products and services we genuinely believe provide value.
          </p>
        </section>

        {/* Disclaimer of Warranties */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">6. Disclaimer of Warranties</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
            The content on Fredsazy is provided "as is" and for informational purposes only. While we strive for accuracy, we make no representations or warranties about the completeness, reliability, or accuracy of the information.
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Code examples and technical tutorials are provided for educational purposes. Always test code in your own environment before deploying to production. We are not responsible for any damages resulting from the use of our content.
          </p>
        </section>

        {/* Limitation of Liability */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">7. Limitation of Liability</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            To the fullest extent permitted by law, Fredsazy and its owner shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the Site. This includes damages for loss of profits, data, or other intangible losses.
          </p>
        </section>

        {/* Changes to Terms */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">8. Changes to These Terms</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            We reserve the right to modify these Terms at any time. Changes become effective immediately upon posting. Your continued use of the Site constitutes acceptance of the revised Terms. We will notify users of material changes via a notice on the Site.
          </p>
        </section>

        {/* Governing Law */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">9. Governing Law</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            These Terms shall be governed by and construed in accordance with the laws of [Your Country/State], without regard to its conflict of law provisions.
          </p>
        </section>

        {/* Contact Information */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">10. Contact Us</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
            If you have any questions about these Terms, please contact us:
          </p>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            <li>📧 Email: <a href="mailto:legal@fredsazy.com" className="text-blue-600 hover:underline">legal@fredsazy.com</a></li>
            <li>🌐 Contact Form: <Link href="/contact" className="text-blue-600 hover:underline">fredsazy.com/contact</Link></li>
          </ul>
        </section>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Fredsazy. All rights reserved.</p>
          <p className="mt-2">
            <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
            {" • "}
            <Link href="/disclaimer" className="hover:underline">Disclaimer</Link>
            {" • "}
            <Link href="/contact" className="hover:underline">Contact</Link>
          </p>
        </div>
      </div>
    </div>
  );
}