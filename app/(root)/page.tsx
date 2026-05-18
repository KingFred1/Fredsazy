import Link from "next/link";
import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { STARTUPS_QUERY, STARTUP_CATEGORIES_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";

export default async function Home({ searchParams }: {
  searchParams: Promise<{ query?: string; category?: string }>
}) {
  const { query, category } = await searchParams;
  const params = { search: query || null, category: category || null };
  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });
  const { data: categoriesData } = await sanityFetch({ query: STARTUP_CATEGORIES_QUERY, params: {} });
  const categories = Array.from(
    new Set(
      ((categoriesData || []) as Array<{ category?: string }>)
        .map((item) => item.category)
        .filter(Boolean) as string[]
    )
  ).slice(0, 8);

  return (
    <>
      <section className="hero_section">
        <div className="section_container hero_inner">
          <div>
            {/* <span className="hero_badge">techfacts</span> */}
            <h1 className="hero_title">Deep tech analysis, practical engineering insights, and product strategy.</h1>
            <p className="hero_copy">
              A personal tech blog for modern engineers, builders, and product thinkers who want sharper, faster learning and latest tech updates.  
            </p>
            <SearchForm query={query} category={category} />

            {categories.length > 0 && (
              <div className="mt-8">
                <p className="text-16-medium text-muted">Filter by topic</p>
                <div className="flex flex-wrap gap-3 mt-4">
                  <Link href={`/${query ? `?query=${encodeURIComponent(query)}` : ``}`} className={`category-chip ${!category ? "category-chip-active" : ""}`}>
                    All
                  </Link>
                  {categories.map((item: string) => (
                    <Link
                      key={item}
                      href={`/?category=${encodeURIComponent(item)}${query ? `&query=${encodeURIComponent(query)}` : ""}`}
                      className={`category-chip ${category === item ? "category-chip-active" : ""}`}
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="hero_card">
            <div className="hero_card_content">
              <p className="text-14-normal uppercase tracking-[0.35em] text-slate-500">Featured writing</p>
              {posts?.[0] && (
                <h2 className="text-30-bold text-slate-950 mt-4 max-w-xl">
                  {posts[0].title}
                </h2>
              )}
              <p className="text-16-medium text-slate-600 mt-5 leading-relaxed max-w-lg">
                {posts?.[0]?.description}
              </p>
              <div className="mt-6">
                <Link href={`/blog/${posts?.[0]?.slug?.current}`} className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                  Read article
                  <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="section_container">
         <div className="mb-8">
           <h2 className="text-3xl font-bold text-slate-950">Featured Articles</h2> 
          <p className="mt-0 text-slate-600">Hand-picked posts you shouldn't miss</p>
        </div>

        Google AdSense Placeholder
         <div className="mb-8 flex justify-center">
          <div className="h-24 w-full max-w-4xl rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 p-4 text-center text-slate-500">
            Google AdSense Banner (728x90)
          </div> 
        </div> 

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          Featured post cards - using first 3 posts as featured
          {posts?.slice(0, 3).map((post: StartupTypeCard) => (
            <article key={post._id} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg">
              <div className="mb-4 flex items-center gap-3">
                <img
                  src={post.author?.image ? urlFor(post.author.image).url() : "https://placehold.co/32x32"}
                  alt={post.author?.name || "Author"}
                  className="h-8 w-8 rounded-full"
                />
                <div>
                  <p className="text-sm font-medium text-slate-950">{post.author?.name}</p>
                  <p className="text-xs text-slate-500">{formatDate(post._createdAt)}</p>
                </div>
              </div>
              <Link href={`/blog/${post.slug?.current}`}>
                <h3 className="mb-3 text-xl font-bold text-slate-950 line-clamp-2 group-hover:text-sky-600">
                  {post.title}
                </h3>
              </Link>
              <p className="mb-4 text-slate-600 line-clamp-3">{post.description}</p>
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                  {post.category}
                </span>
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <EyeIcon className="size-4" />
                  {post.views}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section> */}

      <section className="section_container">
        {/* <div className="section_header">
          <p className="text-30-semibold">
            {category ? `Topic: ${category}` : query ? `Search results for "${query}"` : "All Articles"}
          </p>
          <p className="text-16-medium text-muted max-w-2xl mt-3">
            Browse sharp writing on engineering, productivity, tooling, and modern product thinking.
          </p>
        </div> */}

        {/* Google AdSense Sidebar Placeholder */}
        {/* lg:grid-cols-[1fr_100px] */}
        <div className="grid gap-4">
          <div>
            <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {posts?.length > 0 ? (
                posts.slice(1, 1000).map((post: StartupTypeCard) => (
                  <StartupCard key={post?._id} post={post} />
                ))
              ) : (
                <li className="col-span-full rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600">
                  No articles found
                </li>
              )}
            </ul>
          </div>

          {/* <aside className="space-y-6">
            <div className="rounded-lg border border-slate-200 bg-white p-2">
              <h3 className="text-lg font-semibold text-slate-950">Topics</h3>
              <div className="mt-4 space-y-2">
                {categories.slice(0, 5).map((cat: string) => (
                  <Link
                    key={cat}
                    href={`/?category=${encodeURIComponent(cat)}`}
                    className="block rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>

            <div className="h-64 rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 p-4 text-center text-slate-500">
              Google AdSense Sidebar (300x250)
            </div>
          </aside> */}
        </div>
      </section>

      <SanityLive />
    </>
  );
}
