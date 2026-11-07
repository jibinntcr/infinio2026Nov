import { NextResponse } from 'next/server';
import { getSiteData } from '@/lib/db-store';

export async function POST() {
  const data = await getSiteData();
  return NextResponse.json({
    seeded: true,
    engine: data.engine,
    counts: {
      services: data.services.length,
      projects: data.projects.length,
      testimonials: data.testimonials.length,
      articles: data.articles.length,
      inquiries: data.inquiries.length,
    },
  });
}
