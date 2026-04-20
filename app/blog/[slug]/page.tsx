import { client } from "@/sanity/lib/client";
import { STARTUP_BY_SLUG_QUERY, STARTUPS_BY_CATEGORY_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import { formatDate } from "@/lib/utils";
import { EyeIcon, Share2, Twitter, Linkedin, Facebook, Link2, Check } from "lucide-react";
import markdownit from 'markdown-it';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";
import StartupCard from "@/components/StartupCard";
import CodeBlockEnhancer from "@/components/CodeBlockEnhancer";
import ShareButtons from "@/components/ShareButtons";

export const dynamic = 'force-dynamic';

const md = markdownit({ 
  html: true, 
  linkify: true,
  highlight: (code: string, lang: string) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code class="language-${lang}">${hljs.highlight(code, { language: lang, ignoreIllegals: true }).value}</code></pre>`;
      } catch (err) {
        console.error('Highlight error:', err);
      }
    }
    return `<pre class="hljs"><code>${md.utils.escapeHtml(code)}</code></pre>`;
  }
});

const WORDS_PER_MINUTE = 200;

const getReadingTime = (text?: string) => {
  const words = text?.trim().split(/\s+/).filter(Boolean).length ?? 0;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
};


// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string | string[] }> }) {
  const resolvedParams = await params;
  const rawSlug = Array.isArray(resolvedParams.slug) ? resolvedParams.slug[0] : resolvedParams.slug;
  const slug = rawSlug ? decodeURIComponent(rawSlug) : rawSlug;

  const post = await client.fetch(STARTUP_BY_SLUG_QUERY, { slug });
  
  if (!post) {
    return {
      title: "Post Not Found | Fredsazy",
      description: "The requested article could not be found.",
      robots: "noindex, nofollow",
    };
  }

  const baseUrl = "https://fredsazy.com";
  const postUrl = `${baseUrl}/blog/${slug}`;
  const imageUrl = post.mainImage?.asset 
    ? urlFor(post.mainImage).width(1200).height(630).url()
    : `${baseUrl}/og-image.jpg`;

  return {
    title: `${post.title} | Fredsazy`,
    description: post.description?.slice(0, 160) || `Read ${post.title} on Fredsazy - insights on technology, development, and business.`,
    keywords: [post.category, "software development", "DevOps", "technology", "business", "programming"],
    authors: [{ name: post.author?.name || "Iria Fredrick Victor (Fredsazy)", url: `${baseUrl}/author/${post.author?._id}` }],
    creator: "Iria Fredrick Victor (Fredsazy)",
    publisher: "Fredsazy",
    formatDetection: { email: false, address: false, telephone: false },
    
    // Open Graph (Facebook, LinkedIn)
    openGraph: {
      title: post.title,
      description: post.description?.slice(0, 160),
      url: postUrl,
      siteName: "Fredsazy",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: "en_US",
      type: "article",
      publishedTime: post._createdAt,
      modifiedTime: post._updatedAt,
      authors: [post.author?.name || "Iria Fredrick Victor (Fredsazy)"],
      tags: [post.category, "Technology", "Business", "Software Development"],
    },
    
    // Twitter Card
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description?.slice(0, 160),
      images: [imageUrl],
      creator: "@fredsazy",
      site: "@fredsazy",
    },
    
    // Canonical URL
    alternates: {
      canonical: postUrl,
    },
    
    // Robots
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    
    // Verification (add your codes)
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      // yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
      // me: process.env.NEXT_PUBLIC_ME_VERIFICATION,
    },
    
    // Category
    category: post.category,
    
    // Additional
    appleWebApp: {
      title: "Fredsazy",
      statusBarStyle: "black-translucent",
    },
    applicationName: "Fredsazy",
    referrer: "origin-when-cross-origin",
    manifest: "/site.webmanifest",
    
    // Bookmark and RSS
    other: {
      "twitter:image:alt": post.title,
      "article:published_time": post._createdAt,
      "article:modified_time": post._updatedAt,
      "article:author": post.author?.name || "Iria Fredrick Victor (Fredsazy)",
      "article:tag": post.category,
      "og:image:alt": post.title,
      "og:locale": "en_US",
      "og:type": "article",
      "og:site_name": "Fredsazy",
    },
  };
}

// JSON-LD structured data for rich snippets
function generateStructuredData(post: any, url: string, imageUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": post.title,
    "description": post.description,
    "author": {
      "@type": "Person",
      "name": post.author?.name || "Iria Fredrick Victor (Fredsazy)",
      "url": `https://fredsazy.com/author/${post.author?._id}`,
      "sameAs": [
        "https://twitter.com/fredsazy",
        "https://linkedin.com/in/fredsazy",
        "https://github.com/fredsazy",
      ],
    },
    "publisher": {
      "@type": "Organization",
      "name": "Fredsazy",
      "logo": {
        "@type": "ImageObject",
        "url": "https://fredsazy.com/logo.png",
      },
    },
    "datePublished": post._createdAt,
    "dateModified": post._updatedAt,
    "mainEntityOfPage": url,
    "image": imageUrl,
    "articleSection": post.category,
    "keywords": `${post.category}, software development, DevOps, technology, business`,
    "wordCount": post.pitch?.split(/\s+/).length || 0,
    "timeRequired": `PT${getReadingTime(post.pitch)}M`,
    "inLanguage": "en-US",
    "isAccessibleForFree": true,
  };
}

export const experimental_ppr = true;

const page = async ({ params }: { params: Promise<{ slug: string | string[] }> }) => {
  const resolvedParams = await params;
  const rawSlug = Array.isArray(resolvedParams.slug) ? resolvedParams.slug[0] : resolvedParams.slug;
  const slug = rawSlug ? decodeURIComponent(rawSlug) : rawSlug;

  const post = await client.fetch(STARTUP_BY_SLUG_QUERY, { slug });

  if (!post) return notFound();

  const readingTime = getReadingTime(post.pitch || post.description);
  const parsedContent = md.render(post?.pitch || '');
  const relatedPosts = await client.fetch(STARTUPS_BY_CATEGORY_QUERY, {
    category: post.category,
    id: post._id,
  });

  const baseUrl = "https://fredsazy.com";
  const postUrl = `${baseUrl}/blog/${slug}`;
  const imageUrl = post.mainImage?.asset 
    ? urlFor(post.mainImage).width(1200).height(630).url()
    : `${baseUrl}/og-image.jpg`;
  
  const structuredData = generateStructuredData(post, postUrl, imageUrl);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Additional meta tags for Bing verification and SEO */}
      <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      
      <article className="section_container py-12">
        <div className="mx-auto max-w-4xl">
          <header className="mb-8">
            <div className="mb-4 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <Link
                  href={`/author/${post.author?._id}`}
                  className="flex items-center gap-3 group"
                >
                  <img
                    src={post.author?.image ? urlFor(post.author.image).url() : "https://placehold.co/48x48"}
                    alt={post.author?.name || "Author avatar"}
                    width={48}
                    height={48}
                    className="rounded-full ring-2 ring-transparent group-hover:ring-blue-500 transition-all"
                  />
                  <div>
                    <p className="font-semibold text-slate-950 group-hover:text-blue-600 transition-colors">
                      {post.author?.name}
                    </p>
                    <p className="text-sm text-slate-500">@{post.author?.username || "fredsazy"}</p>
                  </div>
                </Link>
                <span className="text-slate-400">•</span>
                <time className="text-sm text-slate-500" dateTime={post._createdAt}>
                  {formatDate(post._createdAt)}
                </time>
              </div>
              
              {/* Share Buttons - NOW USING IMPORTED COMPONENT */}
              <ShareButtons url={postUrl} title={post.title} />
            </div>
            
            <h1 className="text-2xl  md:font-extrabold font-bold tracking-tight text-slate-950 sm:text-5xl">
              {post.title}
            </h1>
            
            <p className="mt-4 text-xl leading-8 text-slate-600">{post.description}</p>
            
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-1">
                <span className="font-medium">{readingTime}</span> min read
              </span>
              <span className="text-slate-300">•</span>
              <div className="flex items-center gap-1">
                {/* <EyeIcon className="size-4" /> */}
                <Suspense fallback={<span>...</span>}>
                  <View id={post._id} />
                </Suspense>
                {/* <span>views</span> */}
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                {post.category}
              </span>
            </div>
          </header>

          <figure className="mb-8">
            <img
              src={imageUrl}
              alt={post.mainImage?.alt || post.title || "Article image"}
              className="w-full rounded-2xl object-cover"
              loading="eager"
              width={1200}
              height={630}
            />
            {post.mainImage?.caption && (
              <figcaption className="mt-2 text-center text-sm text-slate-500">
                {post.mainImage.caption}
              </figcaption>
            )}
          </figure>

          <div className="prose prose-slate max-w-none prose-headings:text-slate-950 prose-p:text-slate-700 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-950 prose-code:text-slate-900 prose-code:bg-slate-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-transparent prose-pre:p-0 prose-pre:m-0 prose-blockquote:border-l-4 prose-blockquote:border-slate-300 prose-blockquote:pl-4 prose-blockquote:italic">
            {parsedContent ? (
              <div dangerouslySetInnerHTML={{ __html: parsedContent }} />
            ) : (
              <p className="text-slate-600">No content available.</p>
            )}
          </div>

          <CodeBlockEnhancer />

          <hr className="my-12 border-slate-200" />

          {/* Tags section for SEO */}
          {post.tags && post.tags.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-slate-500 mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string) => (
                  <Link
                    key={tag}
                    href={`/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                    className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm rounded-full transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Author bio section */}
          <div className="mt-8 p-6 bg-slate-50 rounded-2xl">
            <div className="flex items-start gap-4">
              <img
                src={post.author?.image ? urlFor(post.author.image).url() : "https://placehold.co/64x64"}
                alt={post.author?.name || "Author"}
                width={64}
                height={64}
                className="rounded-full"
              />
              <div>
                <h3 className="font-semibold text-slate-950">
                  {post.author?.name || "Iria Fredrick Victor (Fredsazy)"}
                </h3>
                <p className="text-sm text-slate-500 mb-2 line-clamp-3">
                  {post.author?.bio || "Software developer, DevOps engineer, and entrepreneur. Building technology and documenting everything."}
                </p>
                <div className="flex gap-3">
                  {post.author?.twitter && (
                    <a href={`https://twitter.com/${post.author.twitter}`} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-600">
                      Twitter
                    </a>
                  )}
                  {post.author?.github && (
                    <a href={`https://github.com/${post.author.github}`} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-600">
                      GitHub
                    </a>
                  )}
                  {post.author?.linkedin && (
                    <a href={`https://linkedin.com/in/${post.author.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-600">
                      LinkedIn
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Share section at bottom */}
          <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between flex-wrap gap-4">
            <p className="text-sm text-slate-500">Share this article:</p>
            <ShareButtons url={postUrl} title={post.title} />
          </div>
        </div>

        {relatedPosts?.length ? (
          <section className="mt-16 rounded-3xl md:border border-slate-200 md:bg-slate-50 md:p-8">
            <div className="mb-8 flex items-center justify-between gap-4 flex-wrap">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-600">
                  Related posts
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-950">
                  More from {post.category}
                </h2>
              </div>
              <Link
                href={`/category/${post.category.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                View all →
              </Link>
            </div>
            <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {relatedPosts.map((item: any) => (
                <StartupCard key={item._id} post={item} />
              ))}
            </ul>
          </section>
        ) : null}
      </article>
    </>
  );
};

export default page;