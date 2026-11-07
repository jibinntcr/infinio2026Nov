import type { MetadataRoute } from 'next';
import { getSiteData } from '@/lib/db-store';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://app-sepia-tau-ngxwehnvd9.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data = await getSiteData();
  const articles = data.articles || [];

  const blogEntries: MetadataRoute.Sitemap = articles.map((article: any) => ({
    url: `${SITE_URL}/blog/${article.slug}`,
    lastModified: article.publishedAt ? new Date(article.publishedAt) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...blogEntries,
  ];
}
