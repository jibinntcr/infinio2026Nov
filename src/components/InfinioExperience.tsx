'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { INFINIO_COMPANY } from '@/lib/seed-data';
import {
  Sparkles,
  ArrowUpRight,
  Cpu,
  Globe,
  ShieldCheck,
  CheckCircle2,
  Send,
  X,
  ChevronRight,
  Code2,
  Workflow,
  BookOpen,
  Clock,
  Lock,
} from 'lucide-react';

const Scene3D = dynamic(() => import('./Scene3D'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-[#f8fafd]">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#1a73e8] border-t-transparent" />
    </div>
  ),
});

interface SiteProps {
  initialData: {
    engine?: string;
    dbMode?: string;
    services?: any[];
    testimonials?: any[];
    projects: any[];
    inquiries: any[];
    articles: any[];
    offices?: any[];
    [key: string]: any;
  };
}

const PILLARS = [
  {
    id: 0,
    badge: '01 • AI & Agentic Systems',
    title: 'Turn enterprise knowledge into autonomous workflows.',
    description:
      'We architect production RAG pipelines, multi-agent copilots, and domain-tuned LLM gateways that connect securely to your ERP, CRM, and document repositories.',
    bgClass: 'bg-[#f0f4f9]',
    accentColor: '#1a73e8',
    icon: Cpu,
    highlights: [
      'Private RAG & Vector Search on MongoDB Atlas',
      'Multi-agent orchestration with human-in-the-loop auditability',
      'Sub-second inference pipelines & automated compliance guardrails',
    ],
    metricLabel: '42%',
    metricSub: 'Reduction in manual operations overhead',
  },
  {
    id: 1,
    badge: '02 • Cloud & Product Engineering',
    title: 'Engineered for high-throughput scale and zero-trust security.',
    description:
      'From multi-region microservices on AWS/GCP to sleek Next.js and Flutter interfaces, our squads build mission-critical software that scales effortlessly across borders.',
    bgClass: 'bg-[#f6f7ff]',
    accentColor: '#7b61ff',
    icon: Code2,
    highlights: [
      'Event-driven cloud architectures & Kubernetes orchestration',
      'High-frequency financial, healthcare & logistics platforms',
      '99.98% SLA engineering with automated CI/CD observability',
    ],
    metricLabel: '99.98%',
    metricSub: 'Production uptime across enterprise deployments',
  },
  {
    id: 2,
    badge: '03 • ERP Modernization & Digital Core',
    title: 'Unify fragmented legacy systems into one intelligent core.',
    description:
      'We modernize legacy supply-chain, retail, and enterprise operations with real-time telemetry, automated invoicing, and executive decision dashboards.',
    bgClass: 'bg-[#fef6f5]',
    accentColor: '#d96570',
    icon: Workflow,
    highlights: [
      'Bespoke ERP modules & bi-directional SAP/Oracle connectors',
      'Real-time fleet, warehouse & cross-border customs tracking',
      'Unified executive analytics across India, GCC & Europe',
    ],
    metricLabel: '3.4x',
    metricSub: 'Faster order-to-settlement cycle time',
  },
];

const FAQS = [
  {
    q: 'Where is Infinio Technology Solutions located?',
    a: 'Our primary engineering and product studio in Kochi is located at First Floor, CIASL Business Centre, CIAL Aero Park, F-23A, Nedumbassery, Cochin, Kerala 683111. We also operate full delivery centers in Thrissur (Kuruppam Road) and Dubai (Jebel Ali Freezone).',
  },
  {
    q: 'How does Infinio engage with enterprise and mid-market clients?',
    a: 'We partner through dedicated product engineering squads, fixed-scope architecture sprints, or end-to-end turnkey platform delivery. Every engagement includes direct access to principal architects and weekly production demos.',
  },
  {
    q: 'Can you integrate AI agents into our existing ERP or MongoDB/SQL databases?',
    a: 'Yes. We specialize in non-disruptive AI integration—connecting secure retrieval-augmented generation (RAG) and workflow agents directly to your existing databases, APIs, and identity providers without exposing proprietary data.',
  },
  {
    q: 'What technologies does Infinio specialize in?',
    a: 'Our core stack spans Next.js, TypeScript, Python, Go, Node.js, Flutter, React Native, MongoDB Atlas, PostgreSQL, Kubernetes, AWS, Google Cloud, and enterprise LLM frameworks.',
  },
];

export default function InfinioExperience({ initialData }: SiteProps) {
  const [activeSceneMode, setActiveSceneMode] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [contactModalOpen, setContactModalOpen] = useState<boolean>(false);

  const [projects] = useState<any[]>(initialData.projects || []);
  const [articles] = useState<any[]>(initialData.articles || []);
  const offices = initialData.offices || INFINIO_COMPANY.offices || [];

  // Inquiry Form State
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    company: '',
    serviceInterest: 'AI & Agentic Workflows',
    budget: '$25k – $50k',
    message: '',
  });
  const [submittingInquiry, setSubmittingInquiry] = useState(false);
  const [inquiryNotice, setInquiryNotice] = useState<string | null>(null);

  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];
  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingInquiry(true);
    setInquiryNotice(null);
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inquiryForm),
      });
      const data = await res.json();
      if (res.ok && data.inquiry) {
        setInquiryForm({
          name: '',
          email: '',
          company: '',
          serviceInterest: 'AI & Agentic Workflows',
          budget: '$25k – $50k',
          message: '',
        });
        setInquiryNotice(
          'Thank you! Your inquiry has been logged and our Kochi/Dubai architects will reach out shortly.'
        );
      } else {
        setInquiryNotice(data.error || 'Could not submit inquiry.');
      }
    } catch {
      setInquiryNotice('Network error while saving inquiry.');
    } finally {
      setSubmittingInquiry(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#1f1f1f]">
      {/* 1. MINIMAL STICKY NAVBAR (notebook.google style) */}
      <header className="sticky top-0 z-40 border-b border-[#e3e8ef]/80 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1f1f1f] text-white shadow-xs">
              <Sparkles className="h-4 w-4 text-[#8ab4f8]" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-[19px] font-bold tracking-tight text-[#1f1f1f]">
                Infinio
              </span>
              <span className="hidden rounded-full bg-[#f0f4f9] px-2.5 py-0.5 text-[11px] font-semibold text-[#1a73e8] sm:inline-block">
                Technology Solutions
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#capabilities"
              className="text-[14px] font-medium text-[#444746] transition-colors hover:text-[#1f1f1f]"
            >
              Capabilities
            </a>
            <a
              href="#work"
              className="text-[14px] font-medium text-[#444746] transition-colors hover:text-[#1f1f1f]"
            >
              Case Studies
            </a>
            <Link
              href="/blog"
              className="text-[14px] font-medium text-[#444746] transition-colors hover:text-[#1f1f1f]"
            >
              Blog
            </Link>
            <a
              href="#faq"
              className="text-[14px] font-medium text-[#444746] transition-colors hover:text-[#1f1f1f]"
            >
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/blog"
              className="hidden items-center gap-1.5 rounded-full border border-[#dadce0] bg-white px-4 py-2 text-[13px] font-semibold text-[#1f1f1f] transition-all hover:bg-[#f8fafd] sm:inline-flex"
            >
              <BookOpen className="h-3.5 w-3.5 text-[#1a73e8]" />
              <span>Engineering Blog</span>
            </Link>
            <button
              onClick={() => setContactModalOpen(true)}
              className="notebook-pill-btn inline-flex items-center gap-2 rounded-full bg-[#1f1f1f] px-5 py-2.5 text-[13px] font-semibold text-white shadow-xs hover:bg-[#303134]"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* 2. CENTERED HERO SECTION (notebook.google aesthetic) */}
      <section className="relative overflow-hidden pt-14 pb-20 sm:pt-20 sm:pb-28">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#e3e8ef] bg-[#f8fafd] px-4 py-1.5 text-[13px] font-medium text-[#444746]">
              <span className="h-2 w-2 rounded-full bg-[#1a73e8]" />
              <span>Kochi (CIAL Aero Park) • Thrissur • Dubai</span>
            </div>

            <h1 className="text-[42px] leading-[1.08] font-bold tracking-[-0.03em] text-[#1f1f1f] sm:text-[64px] md:text-[74px]">
              Understand Complexity.{' '}
              <span className="notebook-gradient-text block sm:inline">
                Engineer Intelligence.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-[18px] leading-[1.6] font-normal text-[#444746] sm:text-[21px]">
              Your AI-first software engineering partner. Infinio designs and builds autonomous AI systems, resilient cloud architectures, and digital products for category leaders across India and the GCC.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => setContactModalOpen(true)}
                className="notebook-pill-btn inline-flex items-center gap-2.5 rounded-full bg-[#1f1f1f] px-7 py-4 text-[15px] font-semibold text-white shadow-sm hover:bg-[#303134]"
              >
                <span>Schedule an Architecture Call</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
              <a
                href="#work"
                className="notebook-pill-btn inline-flex items-center gap-2 rounded-full border border-[#dadce0] bg-white px-7 py-4 text-[15px] font-semibold text-[#1f1f1f] hover:bg-[#f8fafd]"
              >
                <span>Explore Case Studies</span>
              </a>
            </div>
          </div>

          {/* Interactive 3D Iridescent Stage Card (Clean Full-Width Notebook Card) */}
          <div className="mt-14 rounded-[32px] border border-[#e3e8ef] bg-[#f8fafd] p-4 shadow-xs sm:p-6">
            <div className="relative flex min-h-[380px] flex-col justify-between overflow-hidden rounded-[24px] border border-[#e3e8ef]/80 bg-white p-6 sm:min-h-[440px] sm:p-8">
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#f0f4f9] px-3.5 py-1.5 text-[12px] font-semibold text-[#1a73e8]">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Interactive 3D Neural Core</span>
                </div>

                <div className="flex flex-wrap gap-1.5 rounded-full border border-[#e3e8ef] bg-[#f8fafd] p-1">
                  {['AI Core', 'Cloud Mesh', 'Digital ERP'].map((label, idx) => (
                    <button
                      key={label}
                      onClick={() => setActiveSceneMode(idx)}
                      className={`rounded-full px-3.5 py-1 text-[12px] font-semibold transition-all ${
                        activeSceneMode === idx
                          ? 'bg-[#1f1f1f] text-white shadow-2xs'
                          : 'text-[#5f6368] hover:text-[#1f1f1f]'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3D Canvas */}
              <div className="my-auto h-[270px] w-full sm:h-[310px]">
                <Scene3D activeMode={activeSceneMode} />
              </div>

              <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-t border-[#f1f3f4] pt-4 text-[13px] text-[#5f6368]">
                <span>
                  Drag or hover to inspect the real-time WebGL topology • Powered by Three.js & Next.js
                </span>
                <span className="font-mono text-[12px] font-semibold text-[#1a73e8]">
                  99.98% Production SLA • ISO-aligned Delivery
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THREE FULL-WIDTH FEATURE PILLARS (NotebookLM Alternating Cards) */}
      <section id="capabilities" className="py-16 sm:py-24">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[13px] font-semibold tracking-wider text-[#1a73e8] uppercase">
              How Infinio Works
            </p>
            <h2 className="mt-3 text-[34px] leading-[1.15] font-bold tracking-[-0.025em] text-[#1f1f1f] sm:text-[48px]">
              Built for teams that ship mission-critical systems
            </h2>
            <p className="mt-4 text-[17px] leading-[1.6] text-[#444746]">
              Every engagement combines deep domain discovery, rapid architectural prototyping, and hardened production delivery.
            </p>
          </div>

          <div className="mt-14 space-y-8">
            {PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.id}
                  className={`rounded-[32px] ${pillar.bgClass} border border-[#e3e8ef]/70 p-8 sm:p-12 lg:p-14`}
                >
                  <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
                    <div className={`lg:col-span-7 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                      <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-[12px] font-semibold text-[#1f1f1f] shadow-2xs">
                        <Icon className="h-3.5 w-3.5" style={{ color: pillar.accentColor }} />
                        <span>{pillar.badge}</span>
                      </div>

                      <h3 className="mt-5 text-[28px] leading-[1.2] font-bold tracking-[-0.02em] text-[#1f1f1f] sm:text-[36px]">
                        {pillar.title}
                      </h3>

                      <p className="mt-4 text-[16px] leading-[1.65] text-[#444746] sm:text-[17px]">
                        {pillar.description}
                      </p>

                      <ul className="mt-6 space-y-3">
                        {pillar.highlights.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-3 text-[15px] font-medium text-[#1f1f1f]"
                          >
                            <CheckCircle2
                              className="mt-0.5 h-5 w-5 shrink-0"
                              style={{ color: pillar.accentColor }}
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className={`lg:col-span-5 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                      <div className="rounded-[24px] border border-[#e3e8ef] bg-white p-7 shadow-xs sm:p-9">
                        <div className="flex items-center justify-between">
                          <span className="text-[12px] font-semibold tracking-wider text-[#5f6368] uppercase">
                            Verified Impact
                          </span>
                          <span
                            className="h-2.5 w-2.5 rounded-full"
                            style={{ backgroundColor: pillar.accentColor }}
                          />
                        </div>

                        <div className="mt-6">
                          <div
                            className="text-[52px] leading-none font-extrabold tracking-tight sm:text-[64px]"
                            style={{ color: pillar.accentColor }}
                          >
                            {pillar.metricLabel}
                          </div>
                          <p className="mt-2 text-[15px] font-medium text-[#444746]">
                            {pillar.metricSub}
                          </p>
                        </div>

                        <div className="mt-8 border-t border-[#f1f3f4] pt-6">
                          <button
                            onClick={() => setContactModalOpen(true)}
                            className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#1f1f1f] hover:text-[#1a73e8]"
                          >
                            <span>Request architecture blueprint</span>
                            <ChevronRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. SELECTED CASE STUDIES (Clean Bento Grid) */}
      <section id="work" className="bg-[#f8fafd] py-20 sm:py-28">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-[13px] font-semibold tracking-wider text-[#1a73e8] uppercase">
                Production Case Studies
              </p>
              <h2 className="mt-2 text-[34px] leading-[1.15] font-bold tracking-[-0.025em] text-[#1f1f1f] sm:text-[44px]">
                Proven outcomes in production
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-4 py-2 text-[13px] font-semibold transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#1f1f1f] text-white'
                      : 'border border-[#dadce0] bg-white text-[#444746] hover:bg-[#f1f3f4]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {filteredProjects.map((project) => (
              <div
                key={project._id || project.slug || project.title}
                className="notebook-surface-card flex flex-col justify-between rounded-[28px] p-8 sm:p-9"
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-[#f0f4f9] px-3.5 py-1 text-[12px] font-semibold text-[#1a73e8]">
                      {project.category}
                    </span>
                    <span className="font-mono text-[12px] text-[#5f6368]">
                      {project.client} • {project.year || '2026'}
                    </span>
                  </div>

                  <h3 className="mt-5 text-[23px] leading-[1.28] font-bold tracking-tight text-[#1f1f1f]">
                    {project.tagline || project.title}
                  </h3>

                  <p className="mt-3 text-[15px] leading-[1.65] text-[#444746]">
                    {project.description || project.summary}
                  </p>
                </div>

                <div className="mt-7 border-t border-[#f1f3f4] pt-6">
                  <div className="flex flex-wrap gap-2">
                    {(project.metrics || []).map((metric: any, mIdx: number) => {
                      const text =
                        typeof metric === 'string'
                          ? metric
                          : `${metric.value} ${metric.label}`;
                      return (
                        <span
                          key={mIdx}
                          className="rounded-xl border border-[#e3e8ef] bg-[#f8fafd] px-3 py-1.5 text-[12px] font-semibold text-[#1f1f1f]"
                        >
                          {text}
                        </span>
                      );
                    })}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {(project.deliverables || project.tags || []).map((tag: string) => (
                      <span
                        key={tag}
                        className="text-[12px] font-medium text-[#5f6368] after:ml-1.5 after:content-['•'] last:after:content-none"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ENGINEERING & AI BLOG SECTION */}
      <section id="blog" className="py-20 sm:py-28">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-[13px] font-semibold tracking-wider text-[#1a73e8] uppercase">
                Engineering & AI Notebook
              </p>
              <h2 className="mt-2 text-[34px] leading-[1.15] font-bold tracking-[-0.025em] text-[#1f1f1f] sm:text-[44px]">
                Latest from our engineering blog
              </h2>
              <p className="mt-2 max-w-2xl text-[16px] text-[#444746]">
                Deep-dive architectural insights on RAG pipelines, cloud modernization, and high-throughput systems written by our architects in Kochi, Thrissur, and Dubai.
              </p>
            </div>

            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full border border-[#dadce0] bg-white px-5 py-2.5 text-[13px] font-semibold text-[#1f1f1f] transition-colors hover:bg-[#f8fafd]"
            >
              <span>View All Articles</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {articles.slice(0, 3).map((article: any) => (
              <Link
                key={article._id || article.slug}
                href={`/blog/${article.slug}`}
                className="group flex flex-col justify-between rounded-[28px] border border-[#e3e8ef] bg-[#f8fafd] p-7 transition-all hover:-translate-y-1 hover:border-[#c2d7fa] hover:bg-white hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full bg-[#e8f0fe] px-3 py-1 text-[11px] font-semibold text-[#1a73e8]">
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

                <div className="mt-6 flex items-center justify-between border-t border-[#e3e8ef] pt-4 text-[13px] font-semibold text-[#1f1f1f] group-hover:text-[#1a73e8]">
                  <span>Read Technical Article</span>
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PRIVACY, TRUST & ARCHITECTURE GOVERNANCE */}
      <section className="bg-[#f8fafd] py-16">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <div className="rounded-[32px] border border-[#e3e8ef] bg-white p-8 sm:p-14">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#f0f4f9] px-3.5 py-1 text-[12px] font-semibold text-[#1a73e8]">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Enterprise Governance & IP Protection</span>
                </div>
                <h2 className="mt-4 text-[28px] leading-[1.2] font-bold tracking-tight text-[#1f1f1f] sm:text-[36px]">
                  Your proprietary data and source code stay 100% yours.
                </h2>
                <p className="mt-3 text-[16px] leading-[1.65] text-[#444746]">
                  Infinio deploys private LLM endpoints, VPC-isolated databases, and strict role-based access controls so your intellectual property is never used to train public models.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 lg:col-span-4">
                {[
                  { label: 'Zero-Trust VPC', sub: 'AWS / GCP / Azure' },
                  { label: '100% IP Ownership', sub: 'Full repo handover' },
                  { label: 'Audit Logging', sub: 'SOC2-ready pipelines' },
                  { label: '24/7 SRE Support', sub: 'Kochi & Dubai teams' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-[#e3e8ef] bg-[#f8fafd] p-4"
                  >
                    <p className="text-[14px] font-bold text-[#1f1f1f]">{item.label}</p>
                    <p className="mt-1 text-[12px] text-[#5f6368]">{item.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ ACCORDION (NotebookLM style) */}
      <section id="faq" className="py-20 sm:py-24">
        <div className="mx-auto max-w-[860px] px-5 sm:px-8">
          <div className="text-center">
            <h2 className="text-[32px] font-bold tracking-tight text-[#1f1f1f] sm:text-[42px]">
              Frequently asked questions
            </h2>
            <p className="mt-3 text-[16px] text-[#444746]">
              Everything you need to know about partnering with Infinio Technology Solutions.
            </p>
          </div>

          <div className="mt-12 divide-y divide-[#e3e8ef] rounded-[28px] border border-[#e3e8ef] bg-white px-6 sm:px-8">
            {FAQS.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={item.q} className="py-6">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between gap-4 text-left"
                  >
                    <span className="text-[17px] font-semibold text-[#1f1f1f]">
                      {item.q}
                    </span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f8fafd] text-[18px] font-medium text-[#444746]">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <p className="mt-3 pr-8 text-[15px] leading-[1.65] text-[#444746]">
                      {item.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. BOTTOM CTA & FOOTER WITH GLOBAL DELIVERY HUBS */}
      <footer className="border-t border-[#e3e8ef] bg-[#f8fafd] pt-20 pb-14">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <div className="rounded-[32px] border border-[#e3e8ef] bg-white p-8 text-center sm:p-14">
            <h2 className="text-[32px] leading-[1.15] font-bold tracking-tight text-[#1f1f1f] sm:text-[48px]">
              Ready to architect your{' '}
              <span className="notebook-gradient-text">next platform?</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[17px] text-[#444746]">
              Connect with our engineering leadership in Kochi, Thrissur, or Dubai for a technical discovery session.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setContactModalOpen(true)}
                className="notebook-pill-btn inline-flex items-center gap-2 rounded-full bg-[#1f1f1f] px-8 py-4 text-[15px] font-semibold text-white hover:bg-[#303134]"
              >
                <span>Book a Discovery Session</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
              <Link
                href="/blog"
                className="notebook-pill-btn inline-flex items-center gap-2 rounded-full border border-[#dadce0] bg-white px-7 py-4 text-[15px] font-semibold text-[#1f1f1f] hover:bg-[#f8fafd]"
              >
                <BookOpen className="h-4 w-4 text-[#1a73e8]" />
                <span>Read Engineering Blog</span>
              </Link>
            </div>
          </div>

          {/* Office Addresses */}
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {offices.map((office: any) => (
              <div
                key={office.city}
                className="rounded-[24px] border border-[#e3e8ef] bg-white p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-semibold text-[#1a73e8]">
                    {office.badge || office.role || 'Engineering Hub'}
                  </span>
                  <Globe className="h-4 w-4 text-[#5f6368]" />
                </div>
                <h3 className="mt-2 text-[19px] font-bold text-[#1f1f1f]">
                  {office.city}
                </h3>
                <p className="mt-2 text-[13px] leading-[1.6] text-[#444746]">
                  {office.address}
                </p>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[#f1f3f4] pt-3 text-[12px] text-[#5f6368]">
                  <span>{office.phone}</span>
                  <span>{office.email}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#e3e8ef] pt-8 text-[13px] text-[#5f6368] sm:flex-row">
            <div className="flex items-center gap-2.5">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#1f1f1f] text-white">
                <Sparkles className="h-3.5 w-3.5 text-[#8ab4f8]" />
              </div>
              <span className="font-semibold text-[#1f1f1f]">
                Infinio Technology Solutions
              </span>
              <span>• © {new Date().getFullYear()} All rights reserved.</span>
            </div>
            <div className="flex flex-wrap items-center gap-5">
              <Link href="/blog" className="hover:text-[#1f1f1f]">
                Blog
              </Link>
              <Link href="/sitemap.xml" className="hover:text-[#1f1f1f]">
                Sitemap
              </Link>
              <a href="mailto:info@infinio.co.in" className="hover:text-[#1f1f1f]">
                info@infinio.co.in
              </a>
              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 rounded-full border border-[#dadce0] bg-white px-3 py-1 text-[12px] font-semibold text-[#1f1f1f] hover:bg-[#e8f0fe]"
              >
                <Lock className="h-3 w-3 text-[#1a73e8]" />
                Admin Portal
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* 9. START A PROJECT MODAL (Saves directly to MongoDB) */}
      {contactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-[28px] border border-[#e3e8ef] bg-white p-7 shadow-2xl sm:p-9">
            <button
              onClick={() => setContactModalOpen(false)}
              className="absolute top-6 right-6 flex h-9 w-9 items-center justify-center rounded-full bg-[#f0f4f9] text-[#444746] hover:bg-[#e3e8ef]"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="inline-flex items-center gap-2 rounded-full bg-[#e8f0fe] px-3 py-1 text-[12px] font-semibold text-[#1a73e8]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Direct Architecture Briefing</span>
            </div>

            <h3 className="mt-3 text-[26px] font-bold tracking-tight text-[#1f1f1f]">
              Start a project with Infinio
            </h3>
            <p className="mt-1 text-[14px] text-[#5f6368]">
              Your inquiry is persisted directly in our MongoDB store and routed to our Kochi (CIAL Aero Park) and Dubai engineering leads.
            </p>

            <form onSubmit={handleInquirySubmit} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-[12px] font-semibold text-[#444746]">
                    Your Name *
                  </label>
                  <input
                    required
                    type="text"
                    value={inquiryForm.name}
                    onChange={(e) =>
                      setInquiryForm({ ...inquiryForm, name: e.target.value })
                    }
                    placeholder="Arjun Menon"
                    className="w-full rounded-xl border border-[#dadce0] bg-[#f8fafd] px-3.5 py-2.5 text-[14px] text-[#1f1f1f] outline-none focus:border-[#1a73e8] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-[12px] font-semibold text-[#444746]">
                    Work Email *
                  </label>
                  <input
                    required
                    type="email"
                    value={inquiryForm.email}
                    onChange={(e) =>
                      setInquiryForm({ ...inquiryForm, email: e.target.value })
                    }
                    placeholder="arjun@enterprise.com"
                    className="w-full rounded-xl border border-[#dadce0] bg-[#f8fafd] px-3.5 py-2.5 text-[14px] text-[#1f1f1f] outline-none focus:border-[#1a73e8] focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-[12px] font-semibold text-[#444746]">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    value={inquiryForm.company}
                    onChange={(e) =>
                      setInquiryForm({ ...inquiryForm, company: e.target.value })
                    }
                    placeholder="Global Logistics Corp"
                    className="w-full rounded-xl border border-[#dadce0] bg-[#f8fafd] px-3.5 py-2.5 text-[14px] text-[#1f1f1f] outline-none focus:border-[#1a73e8] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-[12px] font-semibold text-[#444746]">
                    Primary Focus
                  </label>
                  <select
                    value={inquiryForm.serviceInterest}
                    onChange={(e) =>
                      setInquiryForm({
                        ...inquiryForm,
                        serviceInterest: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-[#dadce0] bg-[#f8fafd] px-3.5 py-2.5 text-[14px] text-[#1f1f1f] outline-none focus:border-[#1a73e8] focus:bg-white"
                  >
                    <option>AI & Agentic Workflows</option>
                    <option>Cloud & Custom Software</option>
                    <option>Mobile App Ecosystem</option>
                    <option>ERP & Legacy Modernization</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-[12px] font-semibold text-[#444746]">
                  Project Scope & Goals *
                </label>
                <textarea
                  required
                  rows={3}
                  value={inquiryForm.message}
                  onChange={(e) =>
                    setInquiryForm({ ...inquiryForm, message: e.target.value })
                  }
                  placeholder="Tell us about your platform goals, timeline, or integration needs..."
                  className="w-full rounded-xl border border-[#dadce0] bg-[#f8fafd] px-3.5 py-2.5 text-[14px] text-[#1f1f1f] outline-none focus:border-[#1a73e8] focus:bg-white"
                />
              </div>

              {inquiryNotice && (
                <div className="rounded-xl bg-[#e8f0fe] px-4 py-3 text-[13px] font-medium text-[#1a73e8]">
                  {inquiryNotice}
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setContactModalOpen(false)}
                  className="rounded-full px-5 py-2.5 text-[13px] font-semibold text-[#5f6368] hover:bg-[#f1f3f4]"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={submittingInquiry}
                  className="inline-flex items-center gap-2 rounded-full bg-[#1f1f1f] px-6 py-2.5 text-[13px] font-semibold text-white hover:bg-[#303134] disabled:opacity-50"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>{submittingInquiry ? 'Saving...' : 'Submit Inquiry'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
