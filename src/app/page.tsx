import React from 'react';
import { ensureSeededAndFetchAll } from '@/lib/db-store';
import InfinioExperience from '@/components/InfinioExperience';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const data = await ensureSeededAndFetchAll();

  return (
    <InfinioExperience
      initialData={{
        engine: data.engine,
        services: data.services,
        projects: data.projects,
        testimonials: data.testimonials,
        articles: data.articles,
        inquiries: data.inquiries,
      }}
    />
  );
}
