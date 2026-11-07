import type { Metadata } from 'next';
import Link from 'next/link';
import BrandLogo from '@/components/BrandLogo';
import { getSiteData } from '@/lib/db-store';
import {
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
  title: 'Insights & Engineering Articles — Software, Automation & Security',
  description:
    'Read articles on custom business software, grounded workflow automation, accessible web engineering, and application security from Infinio Technology Solutions.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Infinio Insights & Engineering Articles',
    description:
      'Practical notes on software architecture, workflow automation, web performance, and security from Infinio Technology Solutions.',
    url: '/blog',
    type: 'website',
  },
};

export default async function BlogIndexPage() {
  const data = await getSiteData();
  const articles = data.articles || [];
  const featured = articles[0];

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#0f172a]">
      {/* Top Navbar with Official Logo */}
      <header className="sticky top-0 z-40 border-b border-[#e2e8f0] bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-4 py-3.5 sm:px-8">
          <BrandLogo size="md" href="/" />

          <nav aria-label="Blog navigation" className="hidden items-center gap-7 md:flex">
            <Link
              href="/#services"
              className="text-[14px] font-semibold text-[#334155] transition-colors hover:text-[#0f172a]"
            >
              Services
            </Link>
            <Link
              href="/#work"
              className="text-[14px] font-semibold text-[#334155] transition-colors hover:text-[#0f172a]"
            >
              Our Work
            </Link>
            <Link
              href="/#about"
              className="text-[14px] font-semibold text-[#334155] transition-colors hover:text-[#0f172a]"
            >
              About
            </Link>
            <Link
              href="/blog"
              className="text-[14px] font-bold text-[#2563eb]"
            >
              Insights
            </Link>
            <Link
              href="/#contact"
              className="text-[14px] font-semibold text-[#334155] transition-colors hover:text-[#0f172a]"
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/#contact"
              className="rounded-full bg-[#0f172a] px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-[#1e293b]"
            >
              Discuss Your Project
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Header */}
      <section className="mx-auto max-w-[1240px] px-4 pt-12 pb-10 sm:px-8 sm:pt-16">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#e2e8f0] bg-[#f8fafc] px-4 py-1.5 text-[12px] font-semibold text-[#334155]">
            <BookOpen className="h-3.5 w-3.5 text-[#0d9488]" />
            <span>Infinio Engineering Insights</span>
          </div>
          <h1 className="text-[34px] leading-[1.12] font-extrabold tracking-[-0.025em] text-[#0f172a] sm:text-[48px]">
            Practical Notes on{' '}
            <span className="infinio-brand-gradient">
              Software, Automation & Web Engineering
            </span>
          </h1>
          <p className="mt-4 text-[16px] leading-[1.6] text-[#334155] sm:text-[17px]">
            Architectural guidance and implementation lessons written by our teams in Kochi, Thrissur, and Dubai.
          </p>
        </div>
      </section>

      {/* Featured Article */}
      {featured && (
        <section className="mx-auto max-w-[1240px] px-4 pb-12 sm:px-8">
          <Link
            href={`/blog/${featured.slug}`}
            className="group block overflow-hidden rounded-[28px] border border-[#e2e8f0] bg-[#f8fafc] p-7 transition-all hover:border-[#bae6fd] hover:bg-[#f0f9ff]/40 sm:p-10"
          >
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-[#e0f2fe] px-3.5 py-1 text-[12px] font-bold text-[#0284c7]">
                    Featured Article
                  </span>
                  <span className="rounded-full border border-[#e2e8f0] bg-white px-3.5 py-1 text-[12px] font-semibold text-[#334155]">
                    {featured.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[12px] text-[#475569]">
                    <Clock className="h-3.5 w-3.5" />
                    {featured.readTime}
                  </span>
                </div>

                <h2 className="mt-4 text-[26px] leading-[1.22] font-bold tracking-[-0.02em] text-[#0f172a] group-hover:text-[#2563eb] sm:text-[34px]">
                  {featured.title}
                </h2>

                <p className="mt-3 text-[15px] leading-[1.65] text-[#334155] sm:text-[16px]">
                  {featured.excerpt || (featured as any).summary}
                </p>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0f172a] text-[13px] font-bold text-white">
                      {(featured.author || 'IE')
                        .split(' ')
                        .map((w: string) => w[0])
                        .join('')
                        .slice(0, 2)}
                    </div>
                    <div>
                      <p className="text-[13px] font-bold text-[#0f172a]">
                        {featured.author || 'Infinio Engineering'}
                      </p>
                      <p className="text-[12px] text-[#475569]">
                        {featured.authorRole || 'Systems Practice'}
                      </p>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-2 rounded-full bg-[#0f172a] px-5 py-2.5 text-[13px] font-semibold text-white transition-transform group-hover:translate-x-1">
                    Read Full Article
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </div>

              <div className="lg:col-span-4">
                <div className="rounded-[22px] border border-[#e2e8f0] bg-white p-6 shadow-2xs">
                  <p className="text-[11px] font-bold tracking-wider text-[#475569] uppercase">
                    Topics Covered
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {(featured.tags || ['Software', 'Architecture']).map(
                      (tag: string) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1.5 rounded-full border border-[#e2e8f0] bg-[#f8fafc] px-3 py-1.5 text-[12px] font-semibold text-[#0f172a]"
                        >
                          <Tag className="h-3 w-3 text-[#0d9488]" />
                          {tag}
                        </span>
                      )
                    )}
                  </div>
                  <div className="mt-5 border-t border-[#f1f5f9] pt-3.5 text-[12px] text-[#475569]">
                    Published by Infinio Technology Solutions
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* All Articles Grid */}
      <section className="mx-auto max-w-[1240px] px-4 pb-20 sm:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-[22px] font-bold tracking-tight text-[#0f172a]">
            All Articles ({articles.length})
          </h2>
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#2563eb] hover:underline"
          >
            Manage articles in Admin Portal
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article: any) => (
            <Link
              key={article._id || article.slug}
              href={`/blog/${article.slug}`}
              className="group flex flex-col justify-between rounded-[24px] border border-[#e2e8f0] bg-white p-7 transition-all hover:-translate-y-1 hover:border-[#bae6fd] hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full bg-[#f0f9ff] px-3 py-1 text-[11px] font-bold text-[#0284c7]">
                    {article.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[12px] text-[#475569]">
                    <Clock className="h-3 w-3" />
                    {article.readTime}
                  </span>
                </div>

                <h3 className="mt-4 text-[19px] leading-[1.32] font-bold text-[#0f172a] transition-colors group-hover:text-[#2563eb]">
                  {article.title}
                </h3>

                <p className="mt-3 line-clamp-3 text-[14px] leading-[1.6] text-[#334155]">
                  {article.excerpt || article.summary}
                </p>
              </div>

              <div className="mt-6 border-t border-[#f1f5f9] pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[12px] font-medium text-[#475569]">
                    <User className="h-3.5 w-3.5 text-[#0d9488]" />
                    <span>{article.author || 'Infinio Engineering'}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[13px] font-bold text-[#0f172a] group-hover:text-[#2563eb]">
                    Read
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer with Official Logo */}
      <footer className="border-t border-[#e2e8f0] bg-[#f8fafc] py-12">
        <div className="mx-auto flex max-w-[1240px] flex-col items-start justify-between gap-6 px-4 sm:flex-row sm:items-center sm:px-8">
          <div className="flex flex-col gap-1.5">
            <BrandLogo size="md" href="/" />
            <span className="text-[12px] text-[#475569]">
              Kochi (CIAL Aero Park) • Thrissur • Dubai
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-5 text-[13px] font-semibold text-[#334155]">
            <Link href="/" className="hover:text-[#0f172a]">
              Home
            </Link>
            <Link href="/#contact" className="hover:text-[#0f172a]">
              Contact
            </Link>
            <Link href="/sitemap.xml" className="hover:text-[#0f172a]">
              Sitemap
            </Link>
            <Link href="/admin" className="inline-flex items-center gap-1 hover:text-[#0f172a]">
              <ShieldCheck className="h-3.5 w-3.5 text-[#2563eb]" />
              Admin Portal
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
