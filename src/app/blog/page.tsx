import type { Metadata } from 'next';
import Link from 'next/link';
import { getSiteData } from '@/lib/db-store';
import {
  Sparkles,
  ArrowUpRight,
  Clock,
  BookOpen,
  User,
  Tag,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Engineering & AI Blog — Technical Notes, RAG Architecture & Cloud Case Studies',
  description:
    'Read deep-dive engineering articles, enterprise AI playbooks, cloud architecture guides, and ERP modernization notes from Infinio Technology Solutions (Kochi, Thrissur, Dubai).',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Infinio Engineering & AI Blog',
    description:
      'Technical architectures, agentic AI workflows, and cloud engineering insights from Infinio Technology Solutions.',
    url: '/blog',
    type: 'website',
  },
};

export default async function BlogIndexPage() {
  const data = await getSiteData();
  const articles = data.articles || [];
  const featured = articles[0];

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#1f1f1f]">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-[#e3e8ef] bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1f1f1f] text-white shadow-xs">
              <Sparkles className="h-4 w-4 text-[#8ab4f8]" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-[19px] font-bold tracking-tight text-[#1f1f1f]">
                Infinio
              </span>
              <span className="rounded-full bg-[#f0f4f9] px-2.5 py-0.5 text-[11px] font-semibold text-[#1a73e8]">
                Journal
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            <Link
              href="/#capabilities"
              className="text-[14px] font-medium text-[#444746] transition-colors hover:text-[#1f1f1f]"
            >
              Capabilities
            </Link>
            <Link
              href="/#work"
              className="text-[14px] font-medium text-[#444746] transition-colors hover:text-[#1f1f1f]"
            >
              Case Studies
            </Link>
            <Link
              href="/blog"
              className="text-[14px] font-semibold text-[#1a73e8]"
            >
              Blog
            </Link>
            <Link
              href="/admin"
              className="text-[14px] font-medium text-[#444746] transition-colors hover:text-[#1f1f1f]"
            >
              Admin Portal
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="rounded-full border border-[#dadce0] bg-white px-4 py-2 text-[13px] font-semibold text-[#1f1f1f] transition-colors hover:bg-[#f8fafd]"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Header */}
      <section className="mx-auto max-w-[1240px] px-5 pt-14 pb-12 sm:px-8 sm:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#e3e8ef] bg-[#f8fafd] px-4 py-1.5 text-[13px] font-medium text-[#444746]">
            <BookOpen className="h-3.5 w-3.5 text-[#1a73e8]" />
            <span>Infinio Engineering & AI Notebook</span>
          </div>
          <h1 className="text-[38px] leading-[1.1] font-bold tracking-[-0.03em] text-[#1f1f1f] sm:text-[56px]">
            Insights on{' '}
            <span className="notebook-gradient-text">
              Enterprise AI & Cloud Architecture
            </span>
          </h1>
          <p className="mt-5 text-[17px] leading-[1.6] text-[#444746]">
            Architectural blueprints, production RAG benchmarks, and engineering field notes written by our principal architects in Kochi, Thrissur, and Dubai.
          </p>
        </div>
      </section>

      {/* Featured Article */}
      {featured && (
        <section className="mx-auto max-w-[1240px] px-5 pb-12 sm:px-8">
          <Link
            href={`/blog/${featured.slug}`}
            className="group block overflow-hidden rounded-[32px] border border-[#e3e8ef] bg-[#f8fafd] p-8 transition-all hover:border-[#c2d7fa] hover:bg-[#f0f4f9] sm:p-12"
          >
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-[#e8f0fe] px-3.5 py-1 text-[12px] font-semibold text-[#1a73e8]">
                    Featured Dispatch
                  </span>
                  <span className="rounded-full bg-white px-3.5 py-1 text-[12px] font-medium text-[#444746] border border-[#e3e8ef]">
                    {featured.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[12px] text-[#5f6368]">
                    <Clock className="h-3.5 w-3.5" />
                    {featured.readTime}
                  </span>
                </div>

                <h2 className="mt-5 text-[28px] leading-[1.2] font-bold tracking-[-0.02em] text-[#1f1f1f] group-hover:text-[#1a73e8] sm:text-[36px]">
                  {featured.title}
                </h2>

                <p className="mt-4 text-[16px] leading-[1.65] text-[#444746]">
                  {featured.excerpt || (featured as any).summary}
                </p>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1f1f1f] text-[13px] font-bold text-white">
                      {(featured.author || 'IA')
                        .split(' ')
                        .map((w: string) => w[0])
                        .join('')
                        .slice(0, 2)}
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-[#1f1f1f]">
                        {featured.author || 'Infinio Engineering'}
                      </p>
                      <p className="text-[12px] text-[#5f6368]">
                        {featured.authorRole || 'Principal Architecture Team'}
                      </p>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-2 rounded-full bg-[#1f1f1f] px-5 py-2.5 text-[13px] font-semibold text-white transition-transform group-hover:translate-x-1">
                    Read Full Article
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </div>

              <div className="lg:col-span-4">
                <div className="rounded-[24px] border border-[#e3e8ef] bg-white p-6 shadow-xs">
                  <p className="text-[11px] font-semibold tracking-wider text-[#5f6368] uppercase">
                    Key Topics Covered
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {(featured.tags || ['Enterprise AI', 'Cloud', 'Architecture']).map(
                      (tag: string) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1.5 rounded-full bg-[#f8fafd] border border-[#e3e8ef] px-3 py-1.5 text-[12px] font-medium text-[#1f1f1f]"
                        >
                          <Tag className="h-3 w-3 text-[#1a73e8]" />
                          {tag}
                        </span>
                      )
                    )}
                  </div>
                  <div className="mt-6 border-t border-[#e3e8ef] pt-4 text-[12px] text-[#5f6368]">
                    Published by Infinio Technology Solutions • Verified Technical Brief
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* All Articles Grid */}
      <section className="mx-auto max-w-[1240px] px-5 pb-24 sm:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-[22px] font-bold tracking-tight text-[#1f1f1f]">
            All Engineering Articles ({articles.length})
          </h2>
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#1a73e8] hover:underline"
          >
            Publish or edit articles in Admin Portal
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article: any) => (
            <Link
              key={article._id || article.slug}
              href={`/blog/${article.slug}`}
              className="group flex flex-col justify-between rounded-[28px] border border-[#e3e8ef] bg-white p-7 transition-all hover:-translate-y-1 hover:border-[#c2d7fa] hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full bg-[#f0f4f9] px-3 py-1 text-[11px] font-semibold text-[#1a73e8]">
                    {article.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[12px] text-[#5f6368]">
                    <Clock className="h-3 w-3" />
                    {article.readTime}
                  </span>
                </div>

                <h3 className="mt-5 text-[20px] leading-[1.3] font-bold text-[#1f1f1f] transition-colors group-hover:text-[#1a73e8]">
                  {article.title}
                </h3>

                <p className="mt-3 line-clamp-3 text-[14px] leading-[1.6] text-[#444746]">
                  {article.excerpt || article.summary}
                </p>
              </div>

              <div className="mt-6 border-t border-[#f1f3f4] pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[12px] font-medium text-[#5f6368]">
                    <User className="h-3.5 w-3.5 text-[#1a73e8]" />
                    <span>{article.author || 'Infinio Engineering'}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#1f1f1f] group-hover:text-[#1a73e8]">
                    Read
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#e3e8ef] bg-[#f8fafd] py-12">
        <div className="mx-auto flex max-w-[1240px] flex-col items-center justify-between gap-4 px-5 sm:flex-row sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1f1f1f] text-white">
              <Sparkles className="h-3.5 w-3.5 text-[#8ab4f8]" />
            </div>
            <span className="text-[14px] font-bold text-[#1f1f1f]">
              Infinio Technology Solutions
            </span>
            <span className="text-[12px] text-[#5f6368]">
              • Kochi (CIAL Aero Park) • Thrissur • Dubai
            </span>
          </div>
          <div className="flex items-center gap-5 text-[13px] text-[#5f6368]">
            <Link href="/" className="hover:text-[#1f1f1f]">
              Home
            </Link>
            <Link href="/sitemap.xml" className="hover:text-[#1f1f1f]">
              Sitemap
            </Link>
            <Link href="/admin" className="inline-flex items-center gap-1 hover:text-[#1f1f1f]">
              <ShieldCheck className="h-3.5 w-3.5 text-[#1a73e8]" />
              Admin Portal
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
