import Link from "next/link";
import { Github, Twitter, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="text-lg font-semibold tracking-tight text-slate-950">
              techfacts
            </Link>
            <p className="mt-4 max-w-sm text-sm text-slate-600 leading-6">
              Practical engineering insights, architecture decisions, and product strategy for modern developers.
            </p>
            <div className="mt-6 flex gap-4">
              <a href="https://github.com" className="text-slate-400 hover:text-slate-600" aria-label="GitHub">
                <Github className="size-5" />
              </a>
              <a href="https://twitter.com" className="text-slate-400 hover:text-slate-600" aria-label="Twitter">
                <Twitter className="size-5" />
              </a>
              <a href="mailto:hello@techfacts.dev" className="text-slate-400 hover:text-slate-600" aria-label="Email">
                <Mail className="size-5" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-950">Navigation</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/" className="text-sm text-slate-600 hover:text-slate-950">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/authors" className="text-sm text-slate-600 hover:text-slate-950">
                  Authors
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-slate-600 hover:text-slate-950">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-slate-600 hover:text-slate-950">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-950">Newsletter</h3>
            <p className="mt-4 text-sm text-slate-600">
              Get weekly articles on engineering, product strategy, and developer tools.
            </p>
            <form className="mt-4 space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
                required
              />
              <button
                type="submit"
                className="w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-200 pt-8">
          <p className="text-center text-sm text-slate-600">
            © {new Date().getFullYear()} techfacts. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;