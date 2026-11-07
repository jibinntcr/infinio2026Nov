'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import BrandLogo from './BrandLogo';
import InfinioSystemVisual from './InfinioSystemVisual';
import { INFINIO_COMPANY, SEED_SERVICES } from '@/lib/seed-data';
import {
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
  Clock,
  Lock,
  Menu,
  Phone,
  Mail,
  MapPin,
  Cloud,
  Compass,
  AlertCircle,
} from 'lucide-react';

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

const FAQS = [
  {
    q: 'Where are Infinio Technology Solutions’ offices located?',
    a: 'Our Kochi Studio is at First Floor, CIASL Business Centre, CIAL Aero Park, F-23A, Cochin International Airport, Nedumbassery, Kochi, Kerala 683111. Our Thrissur Headquarters is at 2nd Floor, Vimala Building, Rice Bazar Road (Near St. Thomas College), Thrissur, Kerala 680001. Our Dubai Hub operates in Jebel Ali Industrial Area, Dubai, United Arab Emirates.',
  },
  {
    q: 'What types of projects does Infinio deliver?',
    a: 'We design, build, and support custom business software, corporate and catalog websites, organization portals, cloud deployments, workflow automation, and online training environments powered by Moodle LMS.',
  },
  {
    q: 'How does Infinio approach a new client project?',
    a: 'Every engagement begins with a practical discovery conversation to understand your requirements, existing tools, and timeline. We then provide a clear scope and milestone plan, build iteratively with regular reviews, and support your team through launch and ongoing maintenance.',
  },
  {
    q: 'How are source code, data privacy, and access controls handled?',
    a: 'Project deliverables, intellectual property terms, and support responsibilities are defined clearly in our client agreements. We configure role-based access controls, encrypted connections, and private database environments tailored to each client’s operational needs.',
  },
];

const SERVICE_OPTIONS = [
  'Software Development',
  'Web Design & Development',
  'Digital Transformation & Automation',
  'Cloud Services & Hosting',
  'IT Consulting & Strategy',
  'Cybersecurity & LMS Training',
];

export default function InfinioExperience({ initialData }: SiteProps) {
  const [activeSceneMode, setActiveSceneMode] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [contactModalOpen, setContactModalOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const services =
    initialData.services && initialData.services.length > 0
      ? initialData.services
      : SEED_SERVICES;
  const projects = initialData.projects || [];
  const testimonials = initialData.testimonials || [];
  const articles = initialData.articles || [];
  const offices = initialData.offices || INFINIO_COMPANY.offices || [];
  const partners = INFINIO_COMPANY.partners || [];

  // Shared Enquiry Form State
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    serviceNeeded: 'Software Development',
    message: '',
  });
  const [submittingInquiry, setSubmittingInquiry] = useState(false);
  const [inquirySuccess, setInquirySuccess] = useState<string | null>(null);
  const [inquiryError, setInquiryError] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setContactModalOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const openEnquiryWithService = (serviceName?: string) => {
    if (serviceName) {
      setInquiryForm((prev) => ({ ...prev, serviceNeeded: serviceName }));
    }
    setInquirySuccess(null);
    setInquiryError(null);
    setContactModalOpen(true);
  };

  const categories = ['All', 'Web & Catalog', 'Web Platforms', 'Portals & LMS'];
  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySuccess(null);
    setInquiryError(null);

    const trimmedName = inquiryForm.name.trim();
    const trimmedEmail = inquiryForm.email.trim();
    const trimmedCompany = inquiryForm.company.trim();
    const trimmedMessage = inquiryForm.message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedCompany || !trimmedMessage) {
      setInquiryError('Please fill in your name, email, company, and project description.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setInquiryError('Please enter a valid email address.');
      return;
    }

    setSubmittingInquiry(true);
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          phone: inquiryForm.phone.trim(),
          company: trimmedCompany,
          serviceNeeded: inquiryForm.serviceNeeded,
          message: trimmedMessage,
        }),
      });
      const data = await res.json();
      if (res.ok && data.inquiry && data.inquiry._id) {
        setInquiryForm({
          name: '',
          email: '',
          phone: '',
          company: '',
          serviceNeeded: 'Software Development',
          message: '',
        });
        setInquirySuccess(
          'Thank you! Your project enquiry has been saved. Our team in Kochi, Thrissur, or Dubai will respond to you shortly.'
        );
      } else {
        setInquiryError(
          data.error ||
            'We could not save your enquiry right now. Please try again or email info@infinio.co.in directly.'
        );
      }
    } catch {
      setInquiryError(
        'Network connection error while submitting your enquiry. Please try again or contact us at info@infinio.co.in.'
      );
    } finally {
      setSubmittingInquiry(false);
    }
  };

  const getServiceIcon = (index: number) => {
    const icons = [Code2, Globe, Workflow, Cloud, Compass, ShieldCheck];
    return icons[index % icons.length];
  };

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#0f172a]">
      {/* 1. STICKY HEADER WITH OFFICIAL INFINIO LOGO & ACCESSIBLE NAVIGATION */}
      <header className="sticky top-0 z-40 border-b border-[#e2e8f0] bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-4 py-3.5 sm:px-8">
          <BrandLogo size="md" href="/" />

          <nav
            aria-label="Primary Navigation"
            className="hidden items-center gap-7 lg:flex"
          >
            <a
              href="#services"
              className="rounded-md px-1 py-1 text-[14px] font-semibold text-[#334155] transition-colors hover:text-[#0f172a] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563eb]"
            >
              Services
            </a>
            <a
              href="#work"
              className="rounded-md px-1 py-1 text-[14px] font-semibold text-[#334155] transition-colors hover:text-[#0f172a] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563eb]"
            >
              Our Work
            </a>
            <a
              href="#about"
              className="rounded-md px-1 py-1 text-[14px] font-semibold text-[#334155] transition-colors hover:text-[#0f172a] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563eb]"
            >
              About
            </a>
            <Link
              href="/blog"
              className="rounded-md px-1 py-1 text-[14px] font-semibold text-[#334155] transition-colors hover:text-[#0f172a] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563eb]"
            >
              Insights
            </Link>
            <a
              href="#contact"
              className="rounded-md px-1 py-1 text-[14px] font-semibold text-[#334155] transition-colors hover:text-[#0f172a] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563eb]"
            >
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => openEnquiryWithService()}
              className="notebook-pill-btn hidden items-center gap-2 rounded-full bg-[#0f172a] px-5 py-2.5 text-[13px] font-semibold text-white shadow-xs hover:bg-[#1e293b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb] sm:inline-flex"
            >
              <span>Discuss Your Project</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>

            {/* Accessible Mobile Menu Button */}
            <button
              type="button"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-menu"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#e2e8f0] bg-[#f8fafc] text-[#0f172a] hover:bg-[#f1f5f9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb] lg:hidden"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <nav
            id="mobile-nav-menu"
            aria-label="Mobile Navigation"
            className="border-t border-[#e2e8f0] bg-white px-5 py-5 shadow-lg lg:hidden"
          >
            <div className="flex flex-col space-y-3">
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-3 py-2.5 text-[15px] font-semibold text-[#0f172a] hover:bg-[#f8fafc]"
              >
                Services
              </a>
              <a
                href="#work"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-3 py-2.5 text-[15px] font-semibold text-[#0f172a] hover:bg-[#f8fafc]"
              >
                Our Work
              </a>
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-3 py-2.5 text-[15px] font-semibold text-[#0f172a] hover:bg-[#f8fafc]"
              >
                About
              </a>
              <Link
                href="/blog"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-3 py-2.5 text-[15px] font-semibold text-[#0f172a] hover:bg-[#f8fafc]"
              >
                Insights
              </Link>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-3 py-2.5 text-[15px] font-semibold text-[#0f172a] hover:bg-[#f8fafc]"
              >
                Contact
              </a>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openEnquiryWithService();
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#0f172a] px-5 py-3 text-[14px] font-semibold text-white"
                >
                  <span>Discuss Your Project</span>
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </nav>
        )}
      </header>

      {/* 2. BALANCED TWO-COLUMN HERO SECTION */}
      <section className="relative overflow-hidden pt-10 pb-16 sm:pt-16 sm:pb-24">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Left Column: Clear Message & Primary/Secondary CTAs */}
            <div className="lg:col-span-6">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#e2e8f0] bg-[#f8fafc] px-3.5 py-1.5 text-[12px] font-semibold text-[#334155]">
                <span className="h-2 w-2 rounded-full bg-[#0d9488]" />
                <span>Kochi (CIAL Aero Park) • Thrissur • Dubai</span>
              </div>

              <h1 className="text-[34px] leading-[1.12] font-extrabold tracking-[-0.025em] text-[#0f172a] sm:text-[46px] lg:text-[52px]">
                Intelligent Technology.{' '}
                <span className="infinio-brand-gradient block">
                  Practical Business Impact.
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-[16px] leading-[1.65] text-[#334155] sm:text-[18px]">
                Infinio Technology Solutions helps businesses design, build, and improve software, automation, and digital experiences — supporting everyday operations across India and the UAE since 2016.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={() => openEnquiryWithService()}
                  className="notebook-pill-btn inline-flex items-center gap-2 rounded-full bg-[#0f172a] px-6 py-3.5 text-[15px] font-semibold text-white shadow-xs hover:bg-[#1e293b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb]"
                >
                  <span>Discuss Your Project</span>
                  <ArrowUpRight className="h-4 w-4" />
                </button>
                <a
                  href="#work"
                  className="notebook-pill-btn inline-flex items-center gap-2 rounded-full border border-[#cbd5e1] bg-white px-6 py-3.5 text-[15px] font-semibold text-[#0f172a] hover:bg-[#f8fafc] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb]"
                >
                  <span>Explore Our Work</span>
                </a>
              </div>

              <div className="mt-9 grid grid-cols-2 gap-3 border-t border-[#e2e8f0] pt-6 sm:grid-cols-3">
                <div>
                  <p className="text-[13px] font-bold text-[#0f172a]">Custom Software</p>
                  <p className="mt-0.5 text-[12px] text-[#475569]">Web, mobile & internal portals</p>
                </div>
                <div>
                  <p className="text-[13px] font-bold text-[#0f172a]">Cloud & Automation</p>
                  <p className="mt-0.5 text-[12px] text-[#475569]">Deployment & workflow tools</p>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <p className="text-[13px] font-bold text-[#0f172a]">Security & LMS</p>
                  <p className="mt-0.5 text-[12px] text-[#475569]">Reviews & Moodle training</p>
                </div>
              </div>
            </div>

            {/* Right Column: Branded Connected-Node Visual with Error Boundary & SVG Fallback */}
            <div className="lg:col-span-6">
              <InfinioSystemVisual
                activeMode={activeSceneMode}
                onSelectMode={setActiveSceneMode}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. PARTNER & CLIENT ORGANIZATIONS STRIP */}
      <section aria-label="Organizations we have worked with" className="border-y border-[#e2e8f0] bg-[#f8fafc] py-10">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-8">
          <p className="text-center text-[12px] font-bold tracking-wider text-[#475569] uppercase">
            Trusted by businesses, institutions, and community initiatives across Kerala & the UAE
          </p>
          <div className="mt-6 grid grid-cols-2 items-center justify-items-center gap-4 sm:grid-cols-5 lg:grid-cols-10">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="flex h-16 w-full items-center justify-center rounded-xl border border-[#e2e8f0] bg-white p-2.5 shadow-2xs"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  loading="lazy"
                  className="max-h-10 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SERVICES SECTION (#services) */}
      <section id="services" className="scroll-mt-24 py-16 sm:py-24">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[12px] font-bold tracking-wider text-[#0d9488] uppercase">
              Our Services
            </p>
            <h2 className="mt-2 text-[30px] leading-[1.18] font-bold tracking-[-0.02em] text-[#0f172a] sm:text-[42px]">
              Practical engineering services built around your operations
            </h2>
            <p className="mt-3 text-[16px] leading-[1.6] text-[#334155]">
              We focus on clear scope, maintainable code, and systems that your staff and customers can use with confidence.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((srv: any, idx: number) => {
              const Icon = getServiceIcon(idx);
              return (
                <div
                  key={srv.slug || srv.title}
                  className="notebook-surface-card flex flex-col justify-between rounded-[24px] p-7"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f0f9ff] text-[#2563eb]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="rounded-full bg-[#f8fafc] border border-[#e2e8f0] px-3 py-1 text-[11px] font-semibold text-[#475569]">
                        {srv.metrics || srv.shortTitle}
                      </span>
                    </div>

                    <h3 className="mt-5 text-[21px] font-bold text-[#0f172a]">
                      {srv.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-[1.6] text-[#334155]">
                      {srv.description}
                    </p>

                    <ul className="mt-5 space-y-2.5 border-t border-[#f1f5f9] pt-4">
                      {(srv.capabilities || []).map((cap: any) => (
                        <li
                          key={cap.name}
                          className="flex items-start gap-2.5 text-[13px] text-[#334155]"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#0d9488]" />
                          <div>
                            <span className="font-semibold text-[#0f172a]">
                              {cap.name}:
                            </span>{' '}
                            <span>{cap.detail}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 border-t border-[#f1f5f9] pt-4">
                    <button
                      type="button"
                      onClick={() => openEnquiryWithService(srv.title)}
                      className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#2563eb] hover:text-[#1d4ed8]"
                    >
                      <span>Discuss {srv.shortTitle || srv.title}</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. OUR WORK SECTION (#work — Rebuilt Around Real Evidence) */}
      <section id="work" className="scroll-mt-24 bg-[#f8fafc] py-16 sm:py-24">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-8">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-[12px] font-bold tracking-wider text-[#0d9488] uppercase">
                Selected Client Work
              </p>
              <h2 className="mt-2 text-[30px] leading-[1.18] font-bold tracking-[-0.02em] text-[#0f172a] sm:text-[42px]">
                Real projects delivered across Kerala & the UAE
              </h2>
              <p className="mt-2 max-w-2xl text-[15px] text-[#334155]">
                Each engagement below outlines the client’s requirement, Infinio’s contribution, and what was delivered.
              </p>
            </div>

            <div
              role="tablist"
              aria-label="Filter projects by category"
              className="flex flex-wrap gap-2"
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={selectedCategory === cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-4 py-2 text-[13px] font-semibold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb] ${
                    selectedCategory === cat
                      ? 'bg-[#0f172a] text-white'
                      : 'border border-[#cbd5e1] bg-white text-[#334155] hover:bg-[#f1f5f9]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {filteredProjects.map((project: any) => (
              <article
                key={project._id || project.slug || project.client}
                className="notebook-surface-card flex flex-col justify-between rounded-[24px] p-7 sm:p-8"
              >
                <div>
                  {/* Project Card Top Bar with Client Logo & Category */}
                  <div className="flex items-center justify-between gap-4 border-b border-[#f1f5f9] pb-4">
                    <div className="flex items-center gap-3.5">
                      {project.logo && (
                        <div className="flex h-12 w-16 shrink-0 items-center justify-center rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-1.5">
                          <img
                            src={project.logo}
                            alt={`${project.client} logo`}
                            loading="lazy"
                            className="max-h-9 w-auto object-contain"
                          />
                        </div>
                      )}
                      <div>
                        <h3 className="text-[19px] font-bold text-[#0f172a]">
                          {project.client}
                        </h3>
                        <p className="text-[12px] font-medium text-[#475569]">
                          {project.location}
                        </p>
                      </div>
                    </div>

                    <span className="rounded-full bg-[#f0f9ff] px-3 py-1 text-[11px] font-bold text-[#0284c7]">
                      {project.category}
                    </span>
                  </div>

                  <p className="mt-4 text-[16px] font-bold text-[#0f172a]">
                    {project.tagline || project.title}
                  </p>

                  {/* Structured Evidence Breakdown */}
                  <dl className="mt-4 space-y-3 text-[14px] leading-[1.6]">
                    {project.requirement ? (
                      <>
                        <div className="rounded-xl bg-[#f8fafc] p-3.5 border border-[#e2e8f0]">
                          <dt className="text-[11px] font-bold tracking-wider text-[#475569] uppercase">
                            Client Requirement
                          </dt>
                          <dd className="mt-1 text-[#334155]">{project.requirement}</dd>
                        </div>
                        <div className="rounded-xl bg-[#f8fafc] p-3.5 border border-[#e2e8f0]">
                          <dt className="text-[11px] font-bold tracking-wider text-[#0d9488] uppercase">
                            Infinio’s Contribution
                          </dt>
                          <dd className="mt-1 text-[#334155]">{project.contribution}</dd>
                        </div>
                        {project.outcome && (
                          <div className="px-1">
                            <dt className="inline font-bold text-[#0f172a]">Outcome: </dt>
                            <dd className="inline text-[#334155]">{project.outcome}</dd>
                          </div>
                        )}
                      </>
                    ) : (
                      <p className="text-[#334155]">{project.description || project.summary}</p>
                    )}
                  </dl>
                </div>

                <div className="mt-6 border-t border-[#f1f5f9] pt-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-bold tracking-wider text-[#475569] uppercase">
                      Delivered:
                    </span>
                    {(project.deliverables || project.tags || []).map((item: string) => (
                      <span
                        key={item}
                        className="rounded-lg border border-[#e2e8f0] bg-[#f8fafc] px-2.5 py-1 text-[12px] font-semibold text-[#0f172a]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => openEnquiryWithService('Web Design & Development')}
                      className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#2563eb] hover:text-[#1d4ed8]"
                    >
                      <span>Discuss a similar project</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 rounded-full border border-[#cbd5e1] bg-white px-3.5 py-1.5 text-[12px] font-semibold text-[#0f172a] hover:bg-[#f8fafc]"
                      >
                        <span>Open Portal</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Verified Client Endorsements */}
          {testimonials.length > 0 && (
            <div className="mt-16">
              <h3 className="text-center text-[22px] font-bold text-[#0f172a]">
                What our clients say
              </h3>
              <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                {testimonials.map((t: any) => (
                  <blockquote
                    key={t.company}
                    className="flex flex-col justify-between rounded-[24px] border border-[#e2e8f0] bg-white p-6 shadow-2xs"
                  >
                    <p className="text-[14px] leading-[1.65] text-[#334155]">
                      “{t.quote}”
                    </p>
                    <footer className="mt-5 flex items-center gap-3 border-t border-[#f1f5f9] pt-4">
                      {t.avatar ? (
                        <img
                          src={t.avatar}
                          alt={t.clientName}
                          loading="lazy"
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : t.logo ? (
                        <img
                          src={t.logo}
                          alt={t.company}
                          loading="lazy"
                          className="h-9 w-12 object-contain"
                        />
                      ) : null}
                      <div>
                        <cite className="not-italic text-[14px] font-bold text-[#0f172a]">
                          {t.clientName}
                        </cite>
                        <p className="text-[12px] text-[#475569]">
                          {t.role}, {t.company} ({t.location})
                        </p>
                      </div>
                    </footer>
                  </blockquote>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 6. ABOUT INFINIO SECTION (#about) */}
      <section id="about" className="scroll-mt-24 py-16 sm:py-24">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-8">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <p className="text-[12px] font-bold tracking-wider text-[#0d9488] uppercase">
                About Infinio Technology Solutions
              </p>
              <h2 className="mt-2 text-[30px] leading-[1.18] font-bold tracking-[-0.02em] text-[#0f172a] sm:text-[40px]">
                A long-term technology partner for growing organizations
              </h2>
              <p className="mt-4 text-[16px] leading-[1.65] text-[#334155]">
                {INFINIO_COMPANY.aboutSummary}
              </p>
              <p className="mt-3 text-[15px] leading-[1.65] text-[#334155]">
                {INFINIO_COMPANY.vision}
              </p>

              <div className="mt-7 rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] p-6">
                <h3 className="text-[16px] font-bold text-[#0f172a]">
                  Clear Governance, Data Privacy & Contractual Clarity
                </h3>
                <p className="mt-2 text-[14px] leading-[1.6] text-[#334155]">
                  Project deliverables, source-code handover terms, and support responsibilities are defined transparently in every client agreement. When integrating cloud hosting or automation workflows, we configure private database access and role-based permissions so your business records remain under your control.
                </p>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-[28px] border border-[#e2e8f0] bg-[#f8fafc] p-6 sm:p-8">
                <h3 className="text-[19px] font-bold text-[#0f172a]">
                  How We Work With Clients
                </h3>
                <p className="mt-1 text-[14px] text-[#475569]">
                  Four structured stages from initial conversation to long-term support:
                </p>

                <div className="mt-6 space-y-4">
                  {[
                    {
                      step: '01',
                      title: 'Discovery & Requirements',
                      desc: 'We review your current workflows, catalog or software goals, and operational constraints to define a realistic project scope.',
                    },
                    {
                      step: '02',
                      title: 'Architecture & Interface Design',
                      desc: 'We structure the database schema, navigation flow, and responsive screen layouts so your team can review the experience early.',
                    },
                    {
                      step: '03',
                      title: 'Iterative Development & Testing',
                      desc: 'Our engineers build and test the application across desktop and mobile devices, sharing regular progress updates.',
                    },
                    {
                      step: '04',
                      title: 'Deployment, Training & Support',
                      desc: 'We handle cloud deployment, guide your staff through the new system, and provide dependable ongoing maintenance.',
                    },
                  ].map((item) => (
                    <div
                      key={item.step}
                      className="flex items-start gap-4 rounded-2xl border border-[#e2e8f0] bg-white p-4 shadow-2xs"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f0f9ff] font-mono text-[13px] font-bold text-[#2563eb]">
                        {item.step}
                      </span>
                      <div>
                        <h4 className="text-[15px] font-bold text-[#0f172a]">
                          {item.title}
                        </h4>
                        <p className="mt-1 text-[13px] leading-[1.55] text-[#334155]">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. INSIGHTS / BLOG SECTION (#insights) */}
      <section id="insights" className="scroll-mt-24 bg-[#f8fafc] py-16 sm:py-24">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-8">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-[12px] font-bold tracking-wider text-[#0d9488] uppercase">
                Engineering Insights
              </p>
              <h2 className="mt-2 text-[30px] leading-[1.18] font-bold tracking-[-0.02em] text-[#0f172a] sm:text-[40px]">
                Practical notes on software, automation & security
              </h2>
              <p className="mt-2 max-w-2xl text-[15px] text-[#334155]">
                Articles written by our team on structuring business software, grounded automation, accessible web engineering, and application security.
              </p>
            </div>

            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full border border-[#cbd5e1] bg-white px-5 py-2.5 text-[13px] font-semibold text-[#0f172a] transition-colors hover:bg-[#f1f5f9]"
            >
              <span>View All Articles</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {articles.slice(0, 3).map((article: any) => (
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

                <div className="mt-6 flex items-center justify-between border-t border-[#f1f5f9] pt-4 text-[13px] font-bold text-[#0f172a] group-hover:text-[#2563eb]">
                  <span>Read Article</span>
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FAQ SECTION (#faq) */}
      <section id="faq" className="scroll-mt-24 py-16 sm:py-20">
        <div className="mx-auto max-w-[860px] px-4 sm:px-8">
          <div className="text-center">
            <h2 className="text-[28px] font-bold tracking-tight text-[#0f172a] sm:text-[38px]">
              Frequently asked questions
            </h2>
            <p className="mt-2 text-[15px] text-[#334155]">
              Answers to common questions about our offices, services, and project delivery.
            </p>
          </div>

          <div className="mt-10 divide-y divide-[#e2e8f0] rounded-[24px] border border-[#e2e8f0] bg-white px-6 sm:px-8">
            {FAQS.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={item.q} className="py-5">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between gap-4 text-left"
                  >
                    <span className="text-[16px] font-bold text-[#0f172a]">
                      {item.q}
                    </span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f8fafc] text-[18px] font-medium text-[#334155]">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <p className="mt-3 pr-6 text-[14px] leading-[1.65] text-[#334155]">
                      {item.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. DEDICATED CONTACT & PROJECT ENQUIRY SECTION (#contact) */}
      <section id="contact" className="scroll-mt-24 border-t border-[#e2e8f0] bg-[#f8fafc] py-16 sm:py-24">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* Left Column: Direct Office Contacts */}
            <div className="lg:col-span-5">
              <p className="text-[12px] font-bold tracking-wider text-[#0d9488] uppercase">
                Contact Us
              </p>
              <h2 className="mt-2 text-[30px] leading-[1.18] font-bold tracking-[-0.02em] text-[#0f172a] sm:text-[38px]">
                Discuss your project with our team
              </h2>
              <p className="mt-3 text-[15px] leading-[1.6] text-[#334155]">
                Share your requirements using the form or reach out directly to our Kochi, Thrissur, or Dubai offices.
              </p>

              <div className="mt-6 space-y-4">
                {offices.map((office: any) => (
                  <div
                    key={office.city}
                    className="rounded-2xl border border-[#e2e8f0] bg-white p-5 shadow-2xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold tracking-wider text-[#0284c7] uppercase">
                        {office.badge}
                      </span>
                      {office.mapUrl && (
                        <a
                          href={office.mapUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[12px] font-semibold text-[#2563eb] hover:underline"
                        >
                          Map ↗
                        </a>
                      )}
                    </div>
                    <h3 className="mt-1 text-[17px] font-bold text-[#0f172a]">
                      {office.city}
                    </h3>
                    <p className="mt-1 text-[13px] leading-[1.55] text-[#334155]">
                      {office.address}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-4 border-t border-[#f1f5f9] pt-2.5 text-[12px] font-medium text-[#334155]">
                      <a
                        href={`tel:${(office.phones?.[0] || office.phone || '').replace(/\s+/g, '')}`}
                        className="inline-flex items-center gap-1 hover:text-[#2563eb]"
                      >
                        <Phone className="h-3.5 w-3.5 text-[#0d9488]" />
                        {office.phone || office.phones?.join(' / ')}
                      </a>
                      <a
                        href={`mailto:${office.email}`}
                        className="inline-flex items-center gap-1 hover:text-[#2563eb]"
                      >
                        <Mail className="h-3.5 w-3.5 text-[#2563eb]" />
                        {office.email}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Accessible, Validated Enquiry Form */}
            <div className="lg:col-span-7">
              <div className="rounded-[28px] border border-[#e2e8f0] bg-white p-6 shadow-xs sm:p-10">
                <h3 className="text-[22px] font-bold text-[#0f172a]">
                  Project Enquiry Form
                </h3>
                <p className="mt-1 text-[14px] text-[#475569]">
                  Fields marked with * are required. Your submission is stored directly in our project database.
                </p>

                <form onSubmit={handleInquirySubmit} className="mt-6 space-y-4" noValidate>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="inline-name"
                        className="mb-1.5 block text-[13px] font-semibold text-[#0f172a]"
                      >
                        Full Name *
                      </label>
                      <input
                        id="inline-name"
                        required
                        type="text"
                        value={inquiryForm.name}
                        onChange={(e) =>
                          setInquiryForm({ ...inquiryForm, name: e.target.value })
                        }
                        placeholder="Your full name"
                        className="w-full rounded-xl border border-[#cbd5e1] bg-[#f8fafc] px-3.5 py-2.5 text-[14px] text-[#0f172a] outline-none focus:border-[#2563eb] focus:bg-white"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="inline-email"
                        className="mb-1.5 block text-[13px] font-semibold text-[#0f172a]"
                      >
                        Email Address *
                      </label>
                      <input
                        id="inline-email"
                        required
                        type="email"
                        value={inquiryForm.email}
                        onChange={(e) =>
                          setInquiryForm({ ...inquiryForm, email: e.target.value })
                        }
                        placeholder="you@company.com"
                        className="w-full rounded-xl border border-[#cbd5e1] bg-[#f8fafc] px-3.5 py-2.5 text-[14px] text-[#0f172a] outline-none focus:border-[#2563eb] focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="inline-company"
                        className="mb-1.5 block text-[13px] font-semibold text-[#0f172a]"
                      >
                        Company / Organization *
                      </label>
                      <input
                        id="inline-company"
                        required
                        type="text"
                        value={inquiryForm.company}
                        onChange={(e) =>
                          setInquiryForm({ ...inquiryForm, company: e.target.value })
                        }
                        placeholder="Company or organization name"
                        className="w-full rounded-xl border border-[#cbd5e1] bg-[#f8fafc] px-3.5 py-2.5 text-[14px] text-[#0f172a] outline-none focus:border-[#2563eb] focus:bg-white"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="inline-phone"
                        className="mb-1.5 block text-[13px] font-semibold text-[#0f172a]"
                      >
                        Phone Number <span className="font-normal text-[#64748b]">(Optional)</span>
                      </label>
                      <input
                        id="inline-phone"
                        type="tel"
                        value={inquiryForm.phone}
                        onChange={(e) =>
                          setInquiryForm({ ...inquiryForm, phone: e.target.value })
                        }
                        placeholder="+91 / +971 ..."
                        className="w-full rounded-xl border border-[#cbd5e1] bg-[#f8fafc] px-3.5 py-2.5 text-[14px] text-[#0f172a] outline-none focus:border-[#2563eb] focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="inline-service"
                      className="mb-1.5 block text-[13px] font-semibold text-[#0f172a]"
                    >
                      Service Required *
                    </label>
                    <select
                      id="inline-service"
                      value={inquiryForm.serviceNeeded}
                      onChange={(e) =>
                        setInquiryForm({ ...inquiryForm, serviceNeeded: e.target.value })
                      }
                      className="w-full rounded-xl border border-[#cbd5e1] bg-[#f8fafc] px-3.5 py-2.5 text-[14px] text-[#0f172a] outline-none focus:border-[#2563eb] focus:bg-white"
                    >
                      {SERVICE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="inline-message"
                      className="mb-1.5 block text-[13px] font-semibold text-[#0f172a]"
                    >
                      Project Description *
                    </label>
                    <textarea
                      id="inline-message"
                      required
                      rows={4}
                      value={inquiryForm.message}
                      onChange={(e) =>
                        setInquiryForm({ ...inquiryForm, message: e.target.value })
                      }
                      placeholder="Briefly describe what you would like to build or improve..."
                      className="w-full rounded-xl border border-[#cbd5e1] bg-[#f8fafc] px-3.5 py-2.5 text-[14px] text-[#0f172a] outline-none focus:border-[#2563eb] focus:bg-white"
                    />
                  </div>

                  {inquiryError && (
                    <div
                      role="alert"
                      className="flex items-start gap-2.5 rounded-xl border border-[#fecaca] bg-[#fef2f2] px-4 py-3 text-[13px] font-medium text-[#b91c1c]"
                    >
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                      <span>{inquiryError}</span>
                    </div>
                  )}

                  {inquirySuccess && (
                    <div
                      role="status"
                      className="flex items-start gap-2.5 rounded-xl border border-[#a7f3d0] bg-[#ecfdf5] px-4 py-3 text-[13px] font-medium text-[#065f46]"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#059669]" />
                      <span>{inquirySuccess}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submittingInquiry}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0f172a] px-7 py-3.5 text-[14px] font-semibold text-white hover:bg-[#1e293b] disabled:opacity-50 sm:w-auto"
                  >
                    <Send className="h-4 w-4" />
                    <span>
                      {submittingInquiry ? 'Sending Enquiry...' : 'Submit Project Enquiry'}
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FOOTER WITH COMPLETE OFFICIAL LOGO */}
      <footer className="border-t border-[#e2e8f0] bg-white py-12">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-8">
          <div className="flex flex-col items-start justify-between gap-6 border-b border-[#e2e8f0] pb-8 sm:flex-row sm:items-center">
            <div>
              <BrandLogo size="lg" href="/" />
              <p className="mt-2 max-w-md text-[13px] text-[#475569]">
                Software development, web platforms, cloud services, and technical training across Kochi, Thrissur, and Dubai.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-5 text-[13px] font-semibold text-[#334155]">
              <a href="#services" className="hover:text-[#0f172a]">
                Services
              </a>
              <a href="#work" className="hover:text-[#0f172a]">
                Our Work
              </a>
              <a href="#about" className="hover:text-[#0f172a]">
                About
              </a>
              <Link href="/blog" className="hover:text-[#0f172a]">
                Insights
              </Link>
              <a href="#contact" className="hover:text-[#0f172a]">
                Contact
              </a>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-start justify-between gap-4 text-[13px] text-[#475569] sm:flex-row sm:items-center">
            <p>
              © {new Date().getFullYear()} Infinio Technology Solutions. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-5">
              <a href="mailto:info@infinio.co.in" className="hover:text-[#0f172a]">
                info@infinio.co.in
              </a>
              <Link href="/sitemap.xml" className="hover:text-[#0f172a]">
                Sitemap
              </Link>
              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 rounded-full border border-[#cbd5e1] bg-[#f8fafc] px-3 py-1 text-[12px] font-semibold text-[#0f172a] hover:bg-[#e2e8f0]"
              >
                <Lock className="h-3 w-3 text-[#2563eb]" />
                Admin Portal
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* 11. MODAL ENQUIRY DIALOG (Triggered by "Discuss Your Project" CTA) */}
      {contactModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-enquiry-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs"
        >
          <div className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-[28px] border border-[#e2e8f0] bg-white p-6 shadow-2xl sm:p-8">
            <button
              type="button"
              aria-label="Close project enquiry dialog"
              onClick={() => setContactModalOpen(false)}
              className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-[#f1f5f9] text-[#334155] hover:bg-[#e2e8f0]"
            >
              <X className="h-4 w-4" />
            </button>

            <BrandLogo size="sm" href="" />

            <h3
              id="modal-enquiry-title"
              className="mt-4 text-[24px] font-bold tracking-tight text-[#0f172a]"
            >
              Discuss Your Project
            </h3>
            <p className="mt-1 text-[14px] text-[#475569]">
              Share your requirements below and our team in Kochi, Thrissur, or Dubai will get back to you promptly.
            </p>

            <form onSubmit={handleInquirySubmit} className="mt-5 space-y-4" noValidate>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="modal-name"
                    className="mb-1.5 block text-[12px] font-semibold text-[#0f172a]"
                  >
                    Full Name *
                  </label>
                  <input
                    id="modal-name"
                    required
                    type="text"
                    value={inquiryForm.name}
                    onChange={(e) =>
                      setInquiryForm({ ...inquiryForm, name: e.target.value })
                    }
                    placeholder="Your full name"
                    className="w-full rounded-xl border border-[#cbd5e1] bg-[#f8fafc] px-3.5 py-2.5 text-[14px] text-[#0f172a] outline-none focus:border-[#2563eb] focus:bg-white"
                  />
                </div>
                <div>
                  <label
                    htmlFor="modal-email"
                    className="mb-1.5 block text-[12px] font-semibold text-[#0f172a]"
                  >
                    Email Address *
                  </label>
                  <input
                    id="modal-email"
                    required
                    type="email"
                    value={inquiryForm.email}
                    onChange={(e) =>
                      setInquiryForm({ ...inquiryForm, email: e.target.value })
                    }
                    placeholder="you@company.com"
                    className="w-full rounded-xl border border-[#cbd5e1] bg-[#f8fafc] px-3.5 py-2.5 text-[14px] text-[#0f172a] outline-none focus:border-[#2563eb] focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="modal-company"
                    className="mb-1.5 block text-[12px] font-semibold text-[#0f172a]"
                  >
                    Company / Organization *
                  </label>
                  <input
                    id="modal-company"
                    required
                    type="text"
                    value={inquiryForm.company}
                    onChange={(e) =>
                      setInquiryForm({ ...inquiryForm, company: e.target.value })
                    }
                    placeholder="Company name"
                    className="w-full rounded-xl border border-[#cbd5e1] bg-[#f8fafc] px-3.5 py-2.5 text-[14px] text-[#0f172a] outline-none focus:border-[#2563eb] focus:bg-white"
                  />
                </div>
                <div>
                  <label
                    htmlFor="modal-phone"
                    className="mb-1.5 block text-[12px] font-semibold text-[#0f172a]"
                  >
                    Phone <span className="font-normal text-[#64748b]">(Optional)</span>
                  </label>
                  <input
                    id="modal-phone"
                    type="tel"
                    value={inquiryForm.phone}
                    onChange={(e) =>
                      setInquiryForm({ ...inquiryForm, phone: e.target.value })
                    }
                    placeholder="+91 / +971 ..."
                    className="w-full rounded-xl border border-[#cbd5e1] bg-[#f8fafc] px-3.5 py-2.5 text-[14px] text-[#0f172a] outline-none focus:border-[#2563eb] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="modal-service"
                  className="mb-1.5 block text-[12px] font-semibold text-[#0f172a]"
                >
                  Service Required *
                </label>
                <select
                  id="modal-service"
                  value={inquiryForm.serviceNeeded}
                  onChange={(e) =>
                    setInquiryForm({
                      ...inquiryForm,
                      serviceNeeded: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-[#cbd5e1] bg-[#f8fafc] px-3.5 py-2.5 text-[14px] text-[#0f172a] outline-none focus:border-[#2563eb] focus:bg-white"
                >
                  {SERVICE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="modal-message"
                  className="mb-1.5 block text-[12px] font-semibold text-[#0f172a]"
                >
                  Project Description *
                </label>
                <textarea
                  id="modal-message"
                  required
                  rows={3}
                  value={inquiryForm.message}
                  onChange={(e) =>
                    setInquiryForm({ ...inquiryForm, message: e.target.value })
                  }
                  placeholder="Tell us about your project requirements..."
                  className="w-full rounded-xl border border-[#cbd5e1] bg-[#f8fafc] px-3.5 py-2.5 text-[14px] text-[#0f172a] outline-none focus:border-[#2563eb] focus:bg-white"
                />
              </div>

              {inquiryError && (
                <div
                  role="alert"
                  className="flex items-start gap-2 rounded-xl border border-[#fecaca] bg-[#fef2f2] px-4 py-3 text-[13px] font-medium text-[#b91c1c]"
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{inquiryError}</span>
                </div>
              )}

              {inquirySuccess && (
                <div
                  role="status"
                  className="flex items-start gap-2 rounded-xl border border-[#a7f3d0] bg-[#ecfdf5] px-4 py-3 text-[13px] font-medium text-[#065f46]"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#059669]" />
                  <span>{inquirySuccess}</span>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setContactModalOpen(false)}
                  className="rounded-full px-5 py-2.5 text-[13px] font-semibold text-[#475569] hover:bg-[#f1f5f9]"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={submittingInquiry}
                  className="inline-flex items-center gap-2 rounded-full bg-[#0f172a] px-6 py-2.5 text-[13px] font-semibold text-white hover:bg-[#1e293b] disabled:opacity-50"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>{submittingInquiry ? 'Sending...' : 'Submit Enquiry'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
