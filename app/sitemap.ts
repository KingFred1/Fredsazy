// app/sitemap.ts
import { client } from "@/sanity/lib/client";
import { MetadataRoute } from 'next'

export const dynamic = 'force-dynamic'

const ALL_POSTS_FOR_SITEMAP = `*[_type == "post" && defined(slug.current)] {
  "slug": slug.current,
  _updatedAt,
  _createdAt
} | order(_createdAt desc)`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://fredsazy.com'
  
  try {
    // Fetch posts using your Sanity client
    const posts = await client.fetch(ALL_POSTS_FOR_SITEMAP);
    
    console.log(`Found ${posts?.length || 0} posts for sitemap`);
    
    // Generate blog post URLs
    const blogUrls = (posts || []).map((post: any) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post._updatedAt || post._createdAt),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

    // Static pages
    const staticUrls = [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1.0,
      },
      {
        url: `${baseUrl}/about`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      },
      {
        url: `${baseUrl}/contact`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      },
      {
        url: `${baseUrl}/privacy`,
        lastModified: new Date(),
        changeFrequency: 'yearly' as const,
        priority: 0.3,
      },
      {
        url: `${baseUrl}/terms`,
        lastModified: new Date(),
        changeFrequency: 'yearly' as const,
        priority: 0.3,
      },
      {
        url: `${baseUrl}/disclaimer`,
        lastModified: new Date(),
        changeFrequency: 'yearly' as const,
        priority: 0.3,
      },
    ]

    return [...staticUrls, ...blogUrls]
    
  } catch (error) {
    console.error('Error generating sitemap:', error);
    
    // Return only static URLs if fetch fails
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1.0,
      },
      {
        url: `${baseUrl}/about`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      },
      {
        url: `${baseUrl}/contact`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      },
    ];
  }
}