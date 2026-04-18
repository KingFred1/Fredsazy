import React from "react";

export default function AboutPage() {
  return (
    <main className="section_container py-20">
      <div className="mx-auto max-w-5xl space-y-8">
        <p className="text-14-normal uppercase tracking-[0.35em] text-slate-500">About techfacts</p>
        <h1 className="text-5xl font-extrabold tracking-tight text-slate-950 sm:text-6xl">
          Practical engineering insights that help you ship better products.
        </h1>
        <p className="text-lg leading-8 text-slate-600">
          techfacts is a personal tech blog dedicated to modern software craftsmanship, architecture decisions, and the thinking behind developer tools. Every post is written for engineers who want concise guidance, honest opinions, and ideas they can use right away.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
            <h2 className="text-2xl font-semibold text-slate-950">What I write about</h2>
            <ul className="mt-5 space-y-4 text-slate-600">
              <li>• Software architecture and systems design</li>
              <li>• Developer tooling and productivity</li>
              <li>• Product decisions and engineering strategy</li>
              <li>• Career growth for engineers and technical leaders</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-950">Why techfacts</h2>
            <p className="mt-5 text-slate-600 leading-7">
              This site is built for readers who prefer a clear, modern voice over noise. Every article is curated to be practical, thoughtful, and rooted in real development experience.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
