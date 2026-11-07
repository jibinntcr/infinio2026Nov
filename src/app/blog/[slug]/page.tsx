import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import BrandLogo from '@/components/BrandLogo';
import { getArticleBySlug, getSiteData } from '@/lib/db-store';
import {
  ArrowLeft,
  Clock,
  Calendar,
  Tag,
  ArrowUpRight,
  CheckCircle2,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://app-sepia-tau-ngxwehnvd9.vercel.app';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Article Not Found | Infinio Technology Solutions',
    };
  }

  const title = article.seoTitle || `${article.title} | Infinio Insights`;
  const description =
    article.seoDescription || article.excerpt || (article as any).summary;

  return {
    title,
    description,
    keywords: article.tags || [
      'Custom Software',
      'Infinio Technology Solutions',
      'Web Engineering',
    ],
    authors: [{ name: article.author || 'Infinio Engineering' }],
    alternates: {
      canonical: `/blog/${article.slug}`,
    },
    openGraph: {
      type: 'article',
      url: `${SITE_URL}/blog/${article.slug}`,
      title,
      description,
      publishedTime: article.publishedAt || new Date().toISOString(),
      authors: [article.author || 'Infinio Engineering'],
      tags: article.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

function renderFormattedBlocks(article: any) {
  const blocks: string[] =
    Array.isArray(article.body) && article.body.length > 0
      ? article.body
      : typeof article.content === 'string'
      ? article.content.split('\n\n')
      : [article.excerpt || ''];

  return blocks.map((block, index) => {
    const trimmed = block.trim();
    if (trimmed.startsWith('### ')) {
      return (
        <h2
          key={index}
          className="mt-8 mb-3 text-[22px] font-bold tracking-tight text-[#0f172a]"
        >
          {trimmed.replace('### ', '')}
        </h2>
      );
    }
    if (trimmed.startsWith('## ')) {
      return (
        <h2
          key={index}
          className="mt-10 mb-4 text-[24px] font-bold tracking-tight text-[#0f172a]"
        >
          {trimmed.replace('## ', '')}
        </h2>
      );
    }
    if (trimmed.startsWith('- ') || trimmed.startsWith('1. ')) {
      const lines = trimmed.split('\n');
      return (
        <ul
          key={index}
          className="my-5 space-y-2.5 rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] p-6"
        >
          {lines.map((line, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3 text-[15px] leading-[1.65] text-[#334155]"
            >
              <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#0d9488]" />
              <span>
                {line
                  .replace(/^(-|\d+\.)\s+/, '')
                  .replace(/\*\*(.*?)\*\*/g, '$1')}
              </span>
            </li>
          ))}
        </ul>
      );
    }
    return (
      <p key={index} className="my-5 text-[16px] leading-[1.75] text-[#334155]">
        {trimmed}
      </p>
    );
  });
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const siteData = await getSiteData();
  const relatedArticles = (siteData.articles || [])
    .filter((a: any) => a.slug !== article.slug)
    .slice(0, 2);

  const summaryText =
    article.excerpt || (article as any).summary || article.subtitle;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.seoDescription || summaryText,
    author: {
      '@type': 'Organization',
      name: article.author || 'Infinio Engineering Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Infinio Technology Solutions',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/infinio-logo.png`,
      },
    },
    datePublished: article.publishedAt || new Date().toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${article.slug}`,
    },
    keywords: (article.tags || []).join(', '),
  };

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#0f172a]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Top Bar with Official Logo */}
      <header className="sticky top-0 z-40 border-b border-[#e2e8f0] bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1120px] items-center justify-between px-4 py-3.5 sm:px-8">
          <BrandLogo size="sm" href="/" />

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#334155] transition-colors hover:text-[#0f172a]"
          >
            <ArrowLeft className="h-4 w-4" />
            All Insights
          </Link>

          <Link
            href="/#contact"
            className="rounded-full bg-[#0f172a] px-4 py-2 text-[13px] font-semibold text-white hover:bg-[#1e293b]"
          >
            Discuss Your Project
          </Link>
        </div>
      </header>

      {/* Article Container */}
      <article className="mx-auto max-w-[820px] px-4 pt-10 pb-20 sm:px-8 sm:pt-14">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-[#e0f2fe] px-3.5 py-1 text-[12px] font-bold text-[#0284c7]">
            {article.category}
          </span>
          <span className="inline-flex items-center gap-1.5 text-[13px] text-[#475569]">
            <Clock className="h-3.5 w-3.5" />
            {article.readTime}
          </span>
          <span className="inline-flex items-center gap-1.5 text-[13px] text-[#475569]">
            <Calendar className="h-3.5 w-3.5" />
            {article.publishedAt || 'Nov 2026'}
          </span>
        </div>

        <h1 className="mt-5 text-[30px] leading-[1.18] font-extrabold tracking-[-0.025em] text-[#0f172a] sm:text-[42px]">
          {article.title}
        </h1>

        <p className="mt-4 text-[18px] leading-[1.6] font-normal text-[#334155]">
          {summaryText}
        </p>

        {/* Author Bar */}
        <div className="mt-7 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] p-5">
          <div className="flex items-center gap-3.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0f172a] text-[13px] font-bold text-white">
              {(article.author || 'IE')
                .split(' ')
                .map((w: string) => w[0])
                .join('')
                .slice(0, 2)}
            </div>
            <div>
              <p className="text-[14px] font-bold text-[#0f172a]">
                {article.author || 'Infinio Engineering Team'}
              </p>
              <p className="text-[12px] text-[#475569]">
                {article.authorRole || 'Kochi, Thrissur & Dubai'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {(article.tags || []).map((tag: string) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-full border border-[#e2e8f0] bg-white px-3 py-1 text-[11px] font-semibold text-[#334155]"
              >
                <Tag className="h-3 w-3 text-[#0d9488]" />
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Main Body */}
        <div className="mt-8 border-t border-[#e2e8f0] pt-6">
          {renderFormattedBlocks(article)}
        </div>

        {/* CTA Banner inside Blog */}
        <div className="mt-12 rounded-[24px] border border-[#bae6fd] bg-[#f0f9ff] p-7 sm:p-9">
          <h2 className="text-[22px] font-bold text-[#0f172a]">
            Planning a software, web, or automation project?
          </h2>
          <p className="mt-2 text-[15px] leading-[1.6] text-[#334155]">
            Speak with Infinio’s engineering teams in Kochi (CIAL Aero Park), Thrissur, or Dubai to scope your requirements clearly.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#0f172a] px-6 py-3 text-[14px] font-semibold text-white hover:bg-[#1e293b]"
            >
              Discuss Your Project
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full border border-[#cbd5e1] bg-white px-6 py-3 text-[14px] font-semibold text-[#0f172a] hover:bg-[#f8fafc]"
            >
              Browse All Articles
            </Link>
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-14 border-t border-[#e2e8f0] pt-10">
            <h2 className="text-[20px] font-bold text-[#0f172a]">
              More Insights
            </h2>
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {relatedArticles.map((rel: any) => (
                <Link
                  key={rel.slug}
                  href={`/blog/${rel.slug}`}
                  className="group rounded-[20px] border border-[#e2e8f0] bg-[#f8fafc] p-6 transition-all hover:border-[#bae6fd] hover:bg-white"
                >
                  <span className="text-[11px] font-bold text-[#0284c7]">
                    {rel.category}
                  </span>
                  <h3 className="mt-2 text-[17px] font-bold text-[#0f172a] group-hover:text-[#2563eb]">
                    {rel.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-[13px] text-[#475569]">
                    {rel.excerpt || rel.summary}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
