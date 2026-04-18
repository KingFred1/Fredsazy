import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID_QUERY, STARTUPS_BY_AUTHOR_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";

export default async function AuthorPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const author = await client.fetch(AUTHOR_BY_ID_QUERY, { id });

  if (!author) return notFound();

  const posts = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, { id });

  return (
    <main className="section_container py-20">
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-5">
              <img
                src={author.image ? urlFor(author.image).url() : "https://placehold.co/96x96"}
                alt={author.name || "Author avatar"}
                width={96}
                height={96}
                className="h-24 w-24 rounded-full object-cover"
              />
              <div>
                <h1 className="text-4xl font-extrabold text-slate-950">{author.name}</h1>
                <p className="text-sm uppercase tracking-[0.35em] text-slate-500">@{author.username}</p>
              </div>
            </div>
            <Link href="/authors" className="text-sm font-medium text-slate-700 hover:text-slate-950">
              Back to authors
            </Link>
          </div>
          <p className="mt-6 max-w-3xl text-slate-600 leading-7">{author.bio || "This author has not added a bio yet."}</p>
        </div>

        <section>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-14-normal uppercase tracking-[0.35em] text-slate-500">Articles</p>
              <h2 className="text-3xl font-semibold text-slate-950">Latest from {author.name}</h2>
            </div>
          </div>
          <ul className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {posts?.length ? (
              posts.map((post: StartupTypeCard) => (
                <StartupCard key={post._id} post={post} />
              ))
            ) : (
              <li className="rounded-[28px] border border-slate-200 bg-white p-8 text-slate-600">
                No articles published yet.
              </li>
            )}
          </ul>
        </section>
      </div>
    </main>
  );
}
