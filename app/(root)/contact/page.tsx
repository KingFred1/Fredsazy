import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <main className="section_container py-20">
      <div className="mx-auto max-w-4xl space-y-8">
        <p className="text-14-normal uppercase tracking-[0.35em] text-slate-500">Contact</p>
        <h1 className="text-5xl font-extrabold tracking-tight text-slate-950 sm:text-6xl">
          Let's talk about tech, product, or your next engineering challenge.
        </h1>
        <p className="text-lg leading-8 text-slate-600">
          Have a collaboration, question, or story idea? Drop a note below and I'll get back to you soon.
        </p>
        
        {/* Contact Form */}
        <ContactForm />

        {/* Email Info */}
        <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
          <p className="text-base font-semibold text-slate-900">Email</p>
          <a href="mailto:hello@fredsazy.com" className="mt-2 inline-block text-sky-600 hover:underline">
            hello@fredsazy.com
          </a>
          <div className="mt-10 rounded-2xl bg-slate-50 p-6">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Need feedback?</p>
            <p className="mt-3 text-slate-600 leading-7">
              I read every message personally, whether it's a question about architecture, tooling, or product strategy.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
// import React from "react";

// export default function ContactPage() {
//   return (
//     <main className="section_container py-20">
//       <div className="mx-auto max-w-4xl space-y-8">
//         <p className="text-14-normal uppercase tracking-[0.35em] text-slate-500">Contact</p>
//         <h1 className="text-5xl font-extrabold tracking-tight text-slate-950 sm:text-6xl">
//           Let’s talk about tech, product, or your next engineering challenge.
//         </h1>
//         <p className="text-lg leading-8 text-slate-600">
//           Have a collaboration, question, or story idea? Drop a note below and I’ll get back to you soon.
//         </p>
//         <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
//           <p className="text-base font-semibold text-slate-900">Email</p>
//           <a href="mailto:hello@techfacts.dev" className="mt-2 inline-block text-sky-600 hover:underline">
//             hello@techfacts.dev
//           </a>
//           <div className="mt-10 rounded-2xl bg-slate-50 p-6">
//             <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Need feedback?</p>
//             <p className="mt-3 text-slate-600 leading-7">
//               I read every message personally, whether it's a question about architecture, tooling, or product strategy.
//             </p>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }
