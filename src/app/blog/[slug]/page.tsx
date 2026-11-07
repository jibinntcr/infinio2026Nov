import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getSiteData } from '@/lib/db-store';
import {
  Sparkles,
  ArrowLeft,
  Clock,
  Calendar,
  Tag,
  ArrowUpRight,
  CheckCircle2,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://app-sepia-tau-ngxwehnvd9.vercel.app';

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

  const title = article.seoTitle || `${article.title} | Infinio Engineering Blog`;
  const description = article.seoDescription || article.excerpt || (article as any).summary;

  return {
    title,
    description,
    keywords: article.tags || ['Enterprise AI', 'Infinio Technology Solutions', 'Cloud Engineering'],
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
  const blocks: string[] = Array.isArray(article.body) && article.body.length > 0
    ? article.body
    : typeof article.content === 'string'
    ? article.content.split('\n\n')
    : [article.excerpt || ''];

  return blocks.map((block, index) => {
    const trimmed = block.trim();
    if (trimmed.startsWith('### ')) {
      return (
        <h3
          key={index}
          className="mt-8 mb-3 text-[22px] font-bold tracking-tight text-[#1f1f1f]"
        >
          {trimmed.replace('### ', '')}
        </h3>
      );
    }
    if (trimmed.startsWith('## ')) {
      return (
        <h2
          key={index}
          className="mt-10 mb-4 text-[26px] font-bold tracking-tight text-[#1f1f1f]"
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
          className="my-5 space-y-2.5 rounded-2xl border border-[#e3e8ef] bg-[#f8fafd] p-6"
        >
          {lines.map((line, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3 text-[16px] leading-[1.65] text-[#3c4043]"
            >
              <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#1a73e8]" />
              <span>
                {line.replace(/^(-|\d+\.)\s+/, '').replace(/\*\*(.*?)\*\*/g, '$1')}
              </span>
            </li>
          ))}
        </ul>
      );
    }
    return (
      <p key={index} className="my-5 text-[17px] leading-[1.78] text-[#3c4043]">
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

  const summaryText = article.excerpt || (article as any).summary || article.subtitle;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.seoDescription || summaryText,
    author: {
      '@type': 'Person',
      name: article.author || 'Infinio Engineering Practice',
      jobTitle: article.authorRole || 'Principal Architect',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Infinio Technology Solutions',
      url: SITE_URL,
    },
    datePublished: article.publishedAt || new Date().toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${article.slug}`,
    },
    keywords: (article.tags || []).join(', '),
  };

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#1f1f1f]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Top Bar */}
      <header className="sticky top-0 z-40 border-b border-[#e3e8ef] bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1120px] items-center justify-between px-5 py-4 sm:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#444746] transition-colors hover:text-[#1f1f1f]"
          >
            <ArrowLeft className="h-4 w-4" />
            All Engineering Articles
          </Link>

          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1f1f1f] text-white">
              <Sparkles className="h-3.5 w-3.5 text-[#8ab4f8]" />
            </div>
            <span className="text-[16px] font-bold text-[#1f1f1f]">Infinio</span>
          </Link>

          <Link
            href="/"
            className="rounded-full bg-[#1f1f1f] px-4 py-2 text-[13px] font-semibold text-white hover:bg-[#303134]"
          >
            Discuss Architecture
          </Link>
        </div>
      </header>

      {/* Article Container */}
      <article className="mx-auto max-w-[820px] px-5 pt-12 pb-20 sm:px-8 sm:pt-16">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-[#e8f0fe] px-3.5 py-1 text-[12px] font-semibold text-[#1a73e8]">
            {article.category}
          </span>
          <span className="inline-flex items-center gap-1.5 text-[13px] text-[#5f6368]">
            <Clock className="h-3.5 w-3.5" />
            {article.readTime}
          </span>
          <span className="inline-flex items-center gap-1.5 text-[13px] text-[#5f6368]">
            <Calendar className="h-3.5 w-3.5" />
            {article.publishedAt || 'Nov 2026'}
          </span>
        </div>

        <h1 className="mt-6 text-[34px] leading-[1.15] font-bold tracking-[-0.03em] text-[#1f1f1f] sm:text-[46px]">
          {article.title}
        </h1>

        <p className="mt-5 text-[19px] leading-[1.6] font-normal text-[#444746]">
          {summaryText}
        </p>

        {/* Author Bar */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#e3e8ef] bg-[#f8fafd] p-5">
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1f1f1f] text-[14px] font-bold text-white">
              {(article.author || 'IA')
                .split(' ')
                .map((w: string) => w[0])
                .join('')
                .slice(0, 2)}
            </div>
            <div>
              <p className="text-[14px] font-bold text-[#1f1f1f]">
                {article.author || 'Infinio Engineering Practice'}
              </p>
              <p className="text-[12px] text-[#5f6368]">
                {article.authorRole || 'Kochi CIAL Aero Park & Dubai Studios'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {(article.tags || []).map((tag: string) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-full border border-[#e3e8ef] bg-white px-3 py-1 text-[11px] font-medium text-[#444746]"
              >
                <Tag className="h-3 w-3 text-[#1a73e8]" />
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Main Body */}
        <div className="mt-10 border-t border-[#e3e8ef] pt-8">
          {renderFormattedBlocks(article)}
        </div>

        {/* CTA Banner inside Blog */}
        <div className="mt-14 rounded-[28px] border border-[#d3e3fd] bg-[#f0f4f9] p-8 sm:p-10">
          <h3 className="text-[24px] font-bold text-[#1f1f1f]">
            Building a similar architecture for your organization?
          </h3>
          <p className="mt-2 text-[15px] leading-[1.6] text-[#444746]">
            Partner with Infinio’s engineering squads in Kochi (CIAL Aero Park), Thrissur, and Dubai to take your AI or cloud platform from blueprint to production.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-[#1f1f1f] px-6 py-3 text-[14px] font-semibold text-white hover:bg-[#303134]"
            >
              Schedule an Architecture Review
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full border border-[#dadce0] bg-white px-6 py-3 text-[14px] font-semibold text-[#1f1f1f] hover:bg-[#f8fafd]"
            >
              Browse More Articles
            </Link>
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-16 border-t border-[#e3e8ef] pt-12">
            <h3 className="text-[20px] font-bold text-[#1f1f1f]">
              Continue Reading
            </h3>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {relatedArticles.map((rel: any) => (
                <Link
                  key={rel.slug}
                  href={`/blog/${rel.slug}`}
                  className="group rounded-[24px] border border-[#e3e8ef] bg-[#f8fafd] p-6 transition-all hover:border-[#c2d7fa] hover:bg-white"
                >
                  <span className="text-[11px] font-semibold text-[#1a73e8]">
                    {rel.category}
                  </span>
                  <h4 className="mt-2 text-[17px] font-bold text-[#1f1f1f] group-hover:text-[#1a73e8]">
                    {rel.title}
                  </h4>
                  <p className="mt-2 line-clamp-2 text-[13px] text-[#5f6368]">
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
