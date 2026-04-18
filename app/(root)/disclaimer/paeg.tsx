import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Disclaimer | Fredsazy",
  description: "Legal disclaimer for content on Fredsazy - Software development, DevOps, and technology insights.",
  robots: "noindex, follow",
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Disclaimer
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* General Disclaimer */}
        <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-10">
          <p className="text-blue-800 dark:text-blue-300 text-lg font-medium">
            ⚠️ Important: The information on this website is for general informational purposes only. You should not rely solely on this information without seeking professional advice.
          </p>
        </div>

        {/* Professional Advice Disclaimer */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">1. No Professional Advice</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            The content on Fredsazy—including articles, tutorials, code examples, and technical analysis—is provided for educational and informational purposes only. It does not constitute professional advice. You should consult with qualified professionals before making any decisions based on the information provided.
          </p>
        </section>

        {/* Technical Content Disclaimer */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">2. Technical Content & Code</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
            Code snippets, tutorials, and technical guides are provided "as is" for educational purposes. Software development environments vary significantly, and what works in one context may not work in another.
          </p>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg font-mono text-sm text-gray-800 dark:text-gray-200">
            <p>⚠️ Always test code in your own development environment before deploying to production.</p>
            <p className="mt-2">⚠️ We are not responsible for any damages, data loss, or security issues resulting from the use of our code.</p>
          </div>
        </section>

        {/* Accuracy of Information */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">3. Accuracy of Information</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
            Technology evolves rapidly. While we strive to keep our content accurate and up-to-date, we cannot guarantee that all information is current or error-free. Software versions, APIs, and best practices change frequently.
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            We encourage readers to verify critical information from official documentation and primary sources.
          </p>
        </section>

        {/* External Links Disclaimer */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">4. External Links</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Fredsazy may contain links to external websites. We are not responsible for the content, accuracy, or privacy practices of these third-party sites. Inclusion of a link does not imply endorsement.
          </p>
        </section>

        {/* Affiliate Disclosure */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">5. Affiliate Disclosure</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
            Some links on Fredsazy are affiliate links. This means:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400 mb-3">
            <li>If you click on an affiliate link and make a purchase, we may earn a commission at no extra cost to you</li>
            <li>We only recommend products and services we genuinely believe provide value</li>
            <li>Our reviews and recommendations are based on independent research and testing</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-400">
            This disclosure is made in compliance with the Federal Trade Commission (FTC) guidelines.
          </p>
        </section>

        {/* Personal Experience Disclaimer */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">6. Personal Experience & Opinions</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Articles labeled as "opinion" or "personal experience" reflect the author's individual views. They are not intended as definitive advice. Your results may vary based on your specific circumstances.
          </p>
        </section>

        {/* No Guarantees */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">7. No Guarantees</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            We do not guarantee specific outcomes from following our tutorials, implementing our code, or using recommended tools. Career advice, business strategies, and technical implementations involve risk, and past success does not guarantee future results.
          </p>
        </section>

        {/* Copyright Disclaimer */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">8. Copyright & Fair Use</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            All original content is copyrighted. We strive to respect intellectual property rights. If you believe any content on Fredsazy infringes your copyright, please contact us at <a href="mailto:legal@fredsazy.com" className="text-blue-600 hover:underline">legal@fredsazy.com</a>.
          </p>
        </section>

        {/* Contact */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">9. Contact Us</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            If you have questions about this disclaimer, please reach out:
          </p>
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-gray-700 dark:text-gray-300">
              📧 <strong>Email:</strong> <a href="mailto:contact@fredsazy.com" className="text-blue-600 hover:underline">contact@fredsazy.com</a>
            </p>
            <p className="text-gray-700 dark:text-gray-300 mt-2">
              🌐 <strong>Contact Form:</strong> <Link href="/contact" className="text-blue-600 hover:underline">fredsazy.com/contact</Link>
            </p>
          </div>
        </section>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Fredsazy. All rights reserved.</p>
          <p className="mt-2">
            <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
            {" • "}
            <Link href="/terms" className="hover:underline">Terms of Service</Link>
            {" • "}
            <Link href="/contact" className="hover:underline">Contact</Link>
          </p>
        </div>
      </div>
    </div>
  );
}