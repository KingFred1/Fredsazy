import Link from "next/link";

export default function NotFound() {
  return (
    <main className="section_container py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-6xl font-extrabold text-slate-950">404</h1>
        <p className="mt-4 text-xl text-slate-600">Page not found</p>
        <p className="mt-6 text-slate-500">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-10">
          <Link
            href="/"
            className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}