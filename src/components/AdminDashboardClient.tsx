'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  LogOut,
  Inbox,
  FileText,
  Layers,
  Globe,
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  ExternalLink,
  Database,
  X,
} from 'lucide-react';

interface AdminProps {
  admin: {
    email: string;
    name: string;
    role: string;
  };
  initialData: {
    engine?: string;
    dbMode?: string;
    services?: any[];
    testimonials?: any[];
    projects: any[];
    inquiries: any[];
    articles: any[];
    [key: string]: any;
  };
}

export default function AdminDashboardClient({ admin, initialData }: AdminProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'inquiries' | 'blog' | 'projects'>('overview');

  const [inquiries, setInquiries] = useState<any[]>(initialData.inquiries || []);
  const [articles, setArticles] = useState<any[]>(initialData.articles || []);
  const [projects, setProjects] = useState<any[]>(initialData.projects || []);
  const [toast, setToast] = useState<string>('');

  // Blog Editor State
  const [editingArticleSlug, setEditingArticleSlug] = useState<string | null>(null);
  const [blogForm, setBlogForm] = useState({
    title: '',
    category: 'Enterprise AI',
    readTime: '6 min read',
    author: admin.name || 'Infinio Engineering Practice',
    authorRole: 'Principal Architect, Kochi & Dubai',
    summary: '',
    content: '',
    tags: 'Enterprise AI, RAG, Cloud Architecture',
    seoTitle: '',
    seoDescription: '',
  });
  const [blogSubmitting, setBlogSubmitting] = useState(false);

  // Project Form State
  const [projectForm, setProjectForm] = useState({
    title: '',
    client: '',
    category: 'AI & Automation',
    summary: '',
    metrics: '99.95% Uptime, 3.4x Faster Ops',
    tags: 'Next.js, Python, MongoDB, Cloud',
    year: '2026',
  });
  const [projectSubmitting, setProjectSubmitting] = useState(false);

  const showNotice = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 4000);
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  // Inquiry Actions
  const handleStatusChange = async (id: string, status: string) => {
    const res = await fetch('/api/inquiries', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) {
      setInquiries((prev) =>
        prev.map((item) => (item._id === id ? { ...item, status } : item))
      );
      showNotice(`Lead status updated to "${status}".`);
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    const res = await fetch(`/api/inquiries?id=${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      setInquiries((prev) => prev.filter((item) => item._id !== id));
      showNotice('Inquiry deleted from database.');
    }
  };

  // Blog Actions
  const startEditArticle = (article: any) => {
    setEditingArticleSlug(article.slug);
    setBlogForm({
      title: article.title || '',
      category: article.category || 'Enterprise AI',
      readTime: article.readTime || '6 min read',
      author: article.author || 'Infinio Engineering',
      authorRole: article.authorRole || 'Principal Architecture Team',
      summary: article.excerpt || article.summary || '',
      content: Array.isArray(article.body)
        ? article.body.join('\n\n')
        : article.content || article.excerpt || '',
      tags: Array.isArray(article.tags) ? article.tags.join(', ') : '',
      seoTitle: article.seoTitle || '',
      seoDescription: article.seoDescription || '',
    });
    setActiveTab('blog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetBlogForm = () => {
    setEditingArticleSlug(null);
    setBlogForm({
      title: '',
      category: 'Enterprise AI',
      readTime: '6 min read',
      author: admin.name || 'Infinio Engineering Practice',
      authorRole: 'Principal Architect, Kochi & Dubai',
      summary: '',
      content: '',
      tags: 'Enterprise AI, RAG, Cloud Architecture',
      seoTitle: '',
      seoDescription: '',
    });
  };

  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBlogSubmitting(true);
    try {
      if (editingArticleSlug) {
        const res = await fetch('/api/articles', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ slug: editingArticleSlug, ...blogForm }),
        });
        const data = await res.json();
        if (res.ok && data.article) {
          setArticles((prev) =>
            prev.map((a) => (a.slug === editingArticleSlug ? data.article : a))
          );
          showNotice('Blog article updated and indexed for SEO.');
          resetBlogForm();
        }
      } else {
        const res = await fetch('/api/articles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(blogForm),
        });
        const data = await res.json();
        if (res.ok && data.article) {
          setArticles((prev) => [data.article, ...prev]);
          showNotice('New blog post published and added to sitemap.xml!');
          resetBlogForm();
        }
      }
    } finally {
      setBlogSubmitting(false);
    }
  };

  const handleDeleteArticle = async (slug: string) => {
    const res = await fetch(`/api/articles?slug=${encodeURIComponent(slug)}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      setArticles((prev) => prev.filter((a) => a.slug !== slug));
      showNotice('Blog post removed.');
    }
  };

  // Project Actions
  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProjectSubmitting(true);
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectForm),
      });
      const data = await res.json();
      if (res.ok && data.project) {
        setProjects((prev) => [data.project, ...prev]);
        setProjectForm({
          title: '',
          client: '',
          category: 'AI & Automation',
          summary: '',
          metrics: '99.95% Uptime, 3.4x Faster Ops',
          tags: 'Next.js, Python, MongoDB, Cloud',
          year: '2026',
        });
        showNotice('New case study published to homepage.');
      }
    } finally {
      setProjectSubmitting(false);
    }
  };

  const handleDeleteProject = async (slug: string) => {
    const res = await fetch(`/api/projects?slug=${encodeURIComponent(slug)}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      setProjects((prev) => prev.filter((p) => p.slug !== slug));
      showNotice('Case study removed.');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafd] text-[#1f1f1f]">
      {/* Top Admin Navbar */}
      <header className="sticky top-0 z-40 border-b border-[#e3e8ef] bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1f1f1f] text-white">
                <Sparkles className="h-4 w-4 text-[#8ab4f8]" />
              </div>
              <span className="text-[18px] font-bold tracking-tight text-[#1f1f1f]">
                Infinio
              </span>
            </Link>
            <span className="rounded-full bg-[#e8f0fe] px-3 py-1 text-[11px] font-bold text-[#1a73e8]">
              Admin Portal
            </span>
            <span className="hidden items-center gap-1.5 rounded-full border border-[#e3e8ef] bg-[#f8fafd] px-3 py-1 text-[11px] font-medium text-[#5f6368] sm:inline-flex">
              <Database className="h-3 w-3 text-[#137333]" />
              DB: {initialData.engine || initialData.dbMode || 'mongodb-hybrid'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/blog"
              target="_blank"
              className="hidden items-center gap-1.5 rounded-full border border-[#dadce0] bg-white px-3.5 py-1.5 text-[12px] font-semibold text-[#444746] hover:bg-[#f1f3f4] sm:inline-flex"
            >
              View Live Blog
              <ExternalLink className="h-3 w-3" />
            </Link>
            <Link
              href="/"
              target="_blank"
              className="hidden items-center gap-1.5 rounded-full border border-[#dadce0] bg-white px-3.5 py-1.5 text-[12px] font-semibold text-[#444746] hover:bg-[#f1f3f4] sm:inline-flex"
            >
              View Live Site
              <ExternalLink className="h-3 w-3" />
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#1f1f1f] px-4 py-2 text-[12px] font-semibold text-white hover:bg-[#303134]"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed right-6 bottom-6 z-50 flex items-center gap-2 rounded-full bg-[#1f1f1f] px-5 py-3 text-[13px] font-semibold text-white shadow-lg">
          <CheckCircle2 className="h-4 w-4 text-[#81c995]" />
          {toast}
        </div>
      )}

      <div className="mx-auto max-w-[1320px] px-5 py-8 sm:px-8">
        {/* Welcome & Navigation Tabs */}
        <div className="mb-8 flex flex-col justify-between gap-4 rounded-[28px] border border-[#e3e8ef] bg-white p-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-[12px] font-semibold tracking-wider text-[#1a73e8] uppercase">
              Authenticated Session • {admin.email}
            </p>
            <h1 className="mt-1 text-[26px] font-bold tracking-tight text-[#1f1f1f]">
              Infinio Enterprise CMS & CRM
            </h1>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { id: 'overview', label: 'Overview & SEO', icon: Globe },
              { id: 'inquiries', label: `Leads (${inquiries.length})`, icon: Inbox },
              { id: 'blog', label: `Blog CMS (${articles.length})`, icon: FileText },
              { id: 'projects', label: `Case Studies (${projects.length})`, icon: Layers },
            ].map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-semibold transition-all ${
                    active
                      ? 'bg-[#1f1f1f] text-white shadow-xs'
                      : 'bg-[#f0f4f9] text-[#444746] hover:bg-[#e3e8ef]'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* TAB 1: OVERVIEW & SEO HEALTH */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-[24px] border border-[#e3e8ef] bg-white p-6">
                <span className="text-[12px] font-semibold text-[#5f6368]">
                  Inbound Project Leads
                </span>
                <p className="mt-2 text-[36px] font-bold text-[#1f1f1f]">
                  {inquiries.length}
                </p>
                <button
                  onClick={() => setActiveTab('inquiries')}
                  className="mt-3 text-[12px] font-semibold text-[#1a73e8] hover:underline"
                >
                  Manage CRM Pipeline →
                </button>
              </div>

              <div className="rounded-[24px] border border-[#e3e8ef] bg-white p-6">
                <span className="text-[12px] font-semibold text-[#5f6368]">
                  Published Blog Articles
                </span>
                <p className="mt-2 text-[36px] font-bold text-[#1f1f1f]">
                  {articles.length}
                </p>
                <button
                  onClick={() => setActiveTab('blog')}
                  className="mt-3 text-[12px] font-semibold text-[#1a73e8] hover:underline"
                >
                  Open Blog Editor →
                </button>
              </div>

              <div className="rounded-[24px] border border-[#e3e8ef] bg-white p-6">
                <span className="text-[12px] font-semibold text-[#5f6368]">
                  Portfolio Case Studies
                </span>
                <p className="mt-2 text-[36px] font-bold text-[#1f1f1f]">
                  {projects.length}
                </p>
                <button
                  onClick={() => setActiveTab('projects')}
                  className="mt-3 text-[12px] font-semibold text-[#1a73e8] hover:underline"
                >
                  Manage Case Studies →
                </button>
              </div>

              <div className="rounded-[24px] border border-[#e3e8ef] bg-white p-6">
                <span className="text-[12px] font-semibold text-[#5f6368]">
                  Technical SEO Status
                </span>
                <p className="mt-2 text-[36px] font-bold text-[#137333]">100%</p>
                <p className="mt-3 text-[12px] font-medium text-[#5f6368]">
                  JSON-LD + Sitemap + Canonical Active
                </p>
              </div>
            </div>

            {/* Technical SEO Audit Panel */}
            <div className="rounded-[28px] border border-[#e3e8ef] bg-white p-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-[20px] font-bold text-[#1f1f1f]">
                    Search Engine Optimization (SEO) & Schema Configuration
                  </h2>
                  <p className="mt-1 text-[14px] text-[#5f6368]">
                    All core search engine crawlers, LocalBusiness schemas for Kochi CIAL Aero Park, and dynamic OpenGraph tags are active.
                  </p>
                </div>
                <div className="flex gap-3">
                  <Link
                    href="/sitemap.xml"
                    target="_blank"
                    className="rounded-full border border-[#dadce0] bg-[#f8fafd] px-4 py-2 text-[12px] font-semibold text-[#1f1f1f] hover:bg-[#e8f0fe]"
                  >
                    Inspect /sitemap.xml
                  </Link>
                  <Link
                    href="/robots.txt"
                    target="_blank"
                    className="rounded-full border border-[#dadce0] bg-[#f8fafd] px-4 py-2 text-[12px] font-semibold text-[#1f1f1f] hover:bg-[#e8f0fe]"
                  >
                    Inspect /robots.txt
                  </Link>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                {[
                  {
                    title: 'JSON-LD Structured Data',
                    desc: 'Organization, LocalBusiness (Kochi CIAL Aero Park F-23A, Thrissur, Dubai), WebSite, and BlogPosting schemas injected.',
                  },
                  {
                    title: 'Dynamic XML Sitemap & Robots',
                    desc: 'Auto-updates `/sitemap.xml` whenever you publish or edit a blog post in the Blog CMS tab.',
                  },
                  {
                    title: 'Meta, Canonical & OpenGraph',
                    desc: 'Title templates, canonical URLs, Twitter summary cards, and semantic H1/H2/H3 hierarchy across all pages.',
                  },
                ].map((seo) => (
                  <div
                    key={seo.title}
                    className="rounded-2xl border border-[#e3e8ef] bg-[#f8fafd] p-5"
                  >
                    <div className="flex items-center gap-2 text-[14px] font-bold text-[#1f1f1f]">
                      <CheckCircle2 className="h-4 w-4 text-[#137333]" />
                      {seo.title}
                    </div>
                    <p className="mt-2 text-[13px] leading-relaxed text-[#5f6368]">
                      {seo.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INQUIRIES / LEADS CRM */}
        {activeTab === 'inquiries' && (
          <div className="rounded-[28px] border border-[#e3e8ef] bg-white p-6 sm:p-8">
            <h2 className="text-[20px] font-bold text-[#1f1f1f]">
              Client Inquiries & Architecture Requests ({inquiries.length})
            </h2>
            <p className="mt-1 text-[14px] text-[#5f6368]">
              Every inquiry submitted through the website is stored here in real time.
            </p>

            <div className="mt-6 space-y-4">
              {inquiries.length === 0 ? (
                <p className="py-12 text-center text-[14px] text-[#5f6368]">
                  No inquiries recorded yet.
                </p>
              ) : (
                inquiries.map((inq: any) => (
                  <div
                    key={inq._id}
                    className="flex flex-col justify-between gap-4 rounded-2xl border border-[#e3e8ef] bg-[#f8fafd] p-5 lg:flex-row lg:items-center"
                  >
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="text-[16px] font-bold text-[#1f1f1f]">
                          {inq.name}
                        </span>
                        <span className="rounded-full border border-[#e3e8ef] bg-white px-3 py-0.5 text-[12px] font-semibold text-[#1a73e8]">
                          {inq.company}
                        </span>
                        <span className="rounded-full bg-[#e8f0fe] px-3 py-0.5 text-[11px] font-semibold text-[#1a73e8]">
                          {inq.serviceNeeded || inq.serviceInterest}
                        </span>
                        <span className="text-[12px] font-medium text-[#5f6368]">
                          Budget: {inq.budgetRange || inq.budget}
                        </span>
                      </div>
                      <p className="text-[13px] text-[#5f6368]">
                        Email:{' '}
                        <a
                          href={`mailto:${inq.email}`}
                          className="font-medium text-[#1a73e8] underline"
                        >
                          {inq.email}
                        </a>
                      </p>
                      <p className="mt-2 text-[14px] leading-relaxed text-[#3c4043]">
                        “{inq.message}”
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                      {(['new', 'reviewing', 'scheduled', 'archived'] as const).map(
                        (status) => (
                          <button
                            key={status}
                            onClick={() => handleStatusChange(inq._id, status)}
                            className={`rounded-full px-3.5 py-1.5 text-[12px] font-semibold capitalize transition-all ${
                              inq.status === status
                                ? 'bg-[#1f1f1f] text-white'
                                : 'border border-[#dadce0] bg-white text-[#444746] hover:bg-[#e8f0fe]'
                            }`}
                          >
                            {status}
                          </button>
                        )
                      )}
                      <button
                        onClick={() => handleDeleteInquiry(inq._id)}
                        title="Delete inquiry"
                        className="ml-2 rounded-full border border-[#f2b8b5] bg-[#fce8e6] p-2 text-[#b3261e] hover:bg-[#f9dedc]"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 3: BLOG CMS */}
        {activeTab === 'blog' && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Left: Create / Edit Blog Form */}
            <div className="lg:col-span-5">
              <div className="rounded-[28px] border border-[#e3e8ef] bg-white p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-[20px] font-bold text-[#1f1f1f]">
                    {editingArticleSlug ? 'Edit Blog Article' : 'Publish New Blog Post'}
                  </h2>
                  {editingArticleSlug && (
                    <button
                      onClick={resetBlogForm}
                      className="inline-flex items-center gap-1 rounded-full bg-[#f1f3f4] px-3 py-1 text-[12px] font-semibold text-[#444746]"
                    >
                      <X className="h-3.5 w-3.5" />
                      Cancel Edit
                    </button>
                  )}
                </div>

                <form onSubmit={handleBlogSubmit} className="mt-5 space-y-4">
                  <div>
                    <label className="mb-1 block text-[12px] font-semibold text-[#444746]">
                      Article Headline (H1) *
                    </label>
                    <input
                      type="text"
                      required
                      value={blogForm.title}
                      onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                      placeholder="e.g., Designing Multi-Agent AI Systems in Production"
                      className="w-full rounded-xl border border-[#dadce0] bg-[#f8fafd] px-3.5 py-2.5 text-[14px] outline-none focus:border-[#1a73e8] focus:bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="mb-1 block text-[12px] font-semibold text-[#444746]">
                        Category
                      </label>
                      <input
                        type="text"
                        value={blogForm.category}
                        onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                        className="w-full rounded-xl border border-[#dadce0] bg-[#f8fafd] px-3.5 py-2.5 text-[14px] outline-none focus:border-[#1a73e8] focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-[12px] font-semibold text-[#444746]">
                        Reading Time
                      </label>
                      <input
                        type="text"
                        value={blogForm.readTime}
                        onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
                        className="w-full rounded-xl border border-[#dadce0] bg-[#f8fafd] px-3.5 py-2.5 text-[14px] outline-none focus:border-[#1a73e8] focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="mb-1 block text-[12px] font-semibold text-[#444746]">
                        Author Name
                      </label>
                      <input
                        type="text"
                        value={blogForm.author}
                        onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                        className="w-full rounded-xl border border-[#dadce0] bg-[#f8fafd] px-3.5 py-2.5 text-[14px] outline-none focus:border-[#1a73e8] focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-[12px] font-semibold text-[#444746]">
                        SEO Tags (comma-separated)
                      </label>
                      <input
                        type="text"
                        value={blogForm.tags}
                        onChange={(e) => setBlogForm({ ...blogForm, tags: e.target.value })}
                        className="w-full rounded-xl border border-[#dadce0] bg-[#f8fafd] px-3.5 py-2.5 text-[14px] outline-none focus:border-[#1a73e8] focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-[12px] font-semibold text-[#444746]">
                      Executive Summary / Meta Excerpt *
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={blogForm.summary}
                      onChange={(e) => setBlogForm({ ...blogForm, summary: e.target.value })}
                      placeholder="Concise summary for blog cards and meta description..."
                      className="w-full rounded-xl border border-[#dadce0] bg-[#f8fafd] px-3.5 py-2.5 text-[14px] outline-none focus:border-[#1a73e8] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-[12px] font-semibold text-[#444746]">
                      Full Article Body (Paragraphs separated by blank lines) *
                    </label>
                    <textarea
                      rows={7}
                      required
                      value={blogForm.content}
                      onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                      placeholder="Write full technical article content here. Separate paragraphs with blank lines..."
                      className="w-full rounded-xl border border-[#dadce0] bg-[#f8fafd] px-3.5 py-2.5 text-[14px] outline-none focus:border-[#1a73e8] focus:bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={blogSubmitting}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[#1f1f1f] py-3.5 text-[14px] font-semibold text-white hover:bg-[#303134] disabled:opacity-50"
                  >
                    <Plus className="h-4 w-4" />
                    {blogSubmitting
                      ? 'Saving to MongoDB...'
                      : editingArticleSlug
                      ? 'Update Blog Article'
                      : 'Publish Article to Blog'}
                  </button>
                </form>
              </div>
            </div>

            {/* Right: Published Blog Articles List */}
            <div className="lg:col-span-7">
              <div className="rounded-[28px] border border-[#e3e8ef] bg-white p-6 sm:p-8">
                <h2 className="text-[20px] font-bold text-[#1f1f1f]">
                  Published Blog Articles ({articles.length})
                </h2>
                <p className="mt-1 text-[14px] text-[#5f6368]">
                  Click Edit to modify any article or View to open its live SEO page.
                </p>

                <div className="mt-6 space-y-4">
                  {articles.map((article: any) => (
                    <div
                      key={article._id || article.slug}
                      className="rounded-2xl border border-[#e3e8ef] bg-[#f8fafd] p-5"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="rounded-full bg-[#e8f0fe] px-3 py-0.5 text-[11px] font-semibold text-[#1a73e8]">
                            {article.category}
                          </span>
                          <span className="text-[12px] text-[#5f6368]">
                            {article.readTime}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Link
                            href={`/blog/${article.slug}`}
                            target="_blank"
                            className="inline-flex items-center gap-1 rounded-full border border-[#dadce0] bg-white px-3 py-1 text-[12px] font-semibold text-[#1f1f1f] hover:bg-[#e8f0fe]"
                          >
                            View
                            <ExternalLink className="h-3 w-3" />
                          </Link>
                          <button
                            onClick={() => startEditArticle(article)}
                            className="inline-flex items-center gap-1 rounded-full border border-[#dadce0] bg-white px-3 py-1 text-[12px] font-semibold text-[#1a73e8] hover:bg-[#e8f0fe]"
                          >
                            <Edit3 className="h-3 w-3" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteArticle(article.slug)}
                            className="inline-flex items-center gap-1 rounded-full border border-[#f2b8b5] bg-[#fce8e6] p-1.5 text-[#b3261e] hover:bg-[#f9dedc]"
                            title="Delete article"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>

                      <h3 className="mt-3 text-[17px] font-bold text-[#1f1f1f]">
                        {article.title}
                      </h3>
                      <p className="mt-1.5 line-clamp-2 text-[13px] text-[#5f6368]">
                        {article.excerpt || article.summary}
                      </p>
                      <p className="mt-2 font-mono text-[11px] text-[#5f6368]">
                        URL: /blog/{article.slug}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: CASE STUDIES / PROJECTS */}
        {activeTab === 'projects' && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="rounded-[28px] border border-[#e3e8ef] bg-white p-6 sm:p-8">
                <h2 className="text-[20px] font-bold text-[#1f1f1f]">
                  Add Portfolio Case Study
                </h2>
                <form onSubmit={handleProjectSubmit} className="mt-5 space-y-4">
                  <div>
                    <label className="mb-1 block text-[12px] font-semibold text-[#444746]">
                      Project Headline / Tagline *
                    </label>
                    <input
                      type="text"
                      required
                      value={projectForm.title}
                      onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                      placeholder="e.g., Autonomous Cargo & Port Telemetry Cloud"
                      className="w-full rounded-xl border border-[#dadce0] bg-[#f8fafd] px-3.5 py-2.5 text-[14px] outline-none focus:border-[#1a73e8] focus:bg-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="mb-1 block text-[12px] font-semibold text-[#444746]">
                        Client / Sector *
                      </label>
                      <input
                        type="text"
                        required
                        value={projectForm.client}
                        onChange={(e) => setProjectForm({ ...projectForm, client: e.target.value })}
                        placeholder="e.g., GCC Maritime Hub"
                        className="w-full rounded-xl border border-[#dadce0] bg-[#f8fafd] px-3.5 py-2.5 text-[14px] outline-none focus:border-[#1a73e8] focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-[12px] font-semibold text-[#444746]">
                        Category
                      </label>
                      <input
                        type="text"
                        value={projectForm.category}
                        onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                        className="w-full rounded-xl border border-[#dadce0] bg-[#f8fafd] px-3.5 py-2.5 text-[14px] outline-none focus:border-[#1a73e8] focus:bg-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-[12px] font-semibold text-[#444746]">
                      Outcome Summary *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={projectForm.summary}
                      onChange={(e) => setProjectForm({ ...projectForm, summary: e.target.value })}
                      placeholder="Describe the engineering architecture and business impact..."
                      className="w-full rounded-xl border border-[#dadce0] bg-[#f8fafd] px-3.5 py-2.5 text-[14px] outline-none focus:border-[#1a73e8] focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-[12px] font-semibold text-[#444746]">
                      Key Metrics (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={projectForm.metrics}
                      onChange={(e) => setProjectForm({ ...projectForm, metrics: e.target.value })}
                      className="w-full rounded-xl border border-[#dadce0] bg-[#f8fafd] px-3.5 py-2.5 text-[14px] outline-none focus:border-[#1a73e8] focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-[12px] font-semibold text-[#444746]">
                      Deliverables / Stack (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={projectForm.tags}
                      onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value })}
                      className="w-full rounded-xl border border-[#dadce0] bg-[#f8fafd] px-3.5 py-2.5 text-[14px] outline-none focus:border-[#1a73e8] focus:bg-white"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={projectSubmitting}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[#1f1f1f] py-3.5 text-[14px] font-semibold text-white hover:bg-[#303134] disabled:opacity-50"
                  >
                    <Plus className="h-4 w-4" />
                    {projectSubmitting ? 'Saving...' : 'Publish Case Study'}
                  </button>
                </form>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-[28px] border border-[#e3e8ef] bg-white p-6 sm:p-8">
                <h2 className="text-[20px] font-bold text-[#1f1f1f]">
                  Active Case Studies ({projects.length})
                </h2>
                <div className="mt-6 space-y-4">
                  {projects.map((proj: any) => (
                    <div
                      key={proj._id || proj.slug}
                      className="flex items-start justify-between gap-4 rounded-2xl border border-[#e3e8ef] bg-[#f8fafd] p-5"
                    >
                      <div>
                        <span className="text-[11px] font-bold text-[#1a73e8] uppercase">
                          {proj.category} • {proj.client}
                        </span>
                        <h3 className="mt-1 text-[17px] font-bold text-[#1f1f1f]">
                          {proj.tagline || proj.title}
                        </h3>
                        <p className="mt-1 text-[13px] text-[#5f6368]">
                          {proj.description || proj.summary}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteProject(proj.slug)}
                        className="rounded-full border border-[#f2b8b5] bg-[#fce8e6] p-2 text-[#b3261e] hover:bg-[#f9dedc]"
                        title="Delete project"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
