import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";
import { AUTHORS_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

export default async function AuthorsPage() {
  const { data: authors } = await sanityFetch({ query: AUTHORS_QUERY, params: {} });

  return (
    <main className="section_container py-20">
      <div className="mx-auto max-w-6xl space-y-8">
        <div>
          <p className="text-14-normal uppercase tracking-[0.35em] text-slate-500">Authors</p>
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-950 sm:text-6xl">
            Meet the voices behind techfacts.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Profiles and writing from the authors who shape the blog. Click through for their latest posts and author notes.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {(authors || []).map((author: any) => (
            <Link
              key={author._id}
              href={`/author/${author._id}`}
              className="group rounded-[28px] border border-slate-200 bg-white p-8 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-center gap-4">
                <img
                  src={author.image ? urlFor(author.image).url() : "https://placehold.co/64x64"}
                  alt={author.name || "author avatar"}
                  width={64}
                  height={64}
                  className="h-16 w-16 rounded-full object-cover"
                />
                <div>
                  <p className="text-lg font-semibold text-slate-950">{author.name}</p>
                  <p className="text-sm text-slate-500">@{author.username}</p>
                </div>
              </div>
              <p className="mt-5 text-slate-600 line-clamp-3">{author.bio || "No author bio provided yet."}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
