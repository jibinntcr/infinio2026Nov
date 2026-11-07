'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import Lenis from 'lenis';
import {
  ArrowUpRight,
  Volume2,
  VolumeX,
  Database,
  ExternalLink,
  ChevronRight,
  X,
  MapPin,
  Phone,
  Mail,
  Check,
  Sparkles,
  Building2,
  Layers,
  Maximize2,
  Code2,
  Globe,
  Cpu,
  Cloud,
  Compass,
  ShieldCheck,
} from 'lucide-react';
import { IService, IProject, ITestimonial, IArticle, IInquiry } from '@/models';
import { INFINIO_COMPANY } from '@/lib/seed-data';
import { soundEngine } from '@/lib/sound-engine';
import type { SceneInteractionState } from './Infinio3DScene';
import LetsTalkDrawer from './LetsTalkDrawer';
import MongoStudioModal from './MongoStudioModal';

const Infinio3DScene = dynamic(() => import('./Infinio3DScene'), {
  ssr: false,
});

interface InfinioExperienceProps {
  initialData: {
    engine: string;
    services: IService[];
    projects: IProject[];
    testimonials: ITestimonial[];
    articles: IArticle[];
    inquiries: IInquiry[];
  };
}

const ROTATING_WORDS = [
  'custom software',
  'spatial 3D web',
  'cloud systems',
  'AI workflows',
  'cybersecurity',
];

const TURN_INTO_HEADLINES = [
  {
    prefix: 'Turn your fragmented operations into',
    highlight: 'Custom Enterprise Software',
    bgTone: 'bg-[#f0f4f9]',
    pillTone: 'bg-[#e8f0fe] text-[#174ea6]',
    icon: Code2,
    photo: '/photos/kochi-office-4.jpg',
  },
  {
    prefix: 'Turn your brand presence into',
    highlight: 'Spatial 3D Web & Commerce',
    bgTone: 'bg-[#f6f7ff]',
    pillTone: 'bg-[#f3e8fd] text-[#681da8]',
    icon: Globe,
    photo: '/photos/kochi-office-1.jpg',
  },
  {
    prefix: 'Turn your repetitive manual work into',
    highlight: 'Autonomous AI Workflows',
    bgTone: 'bg-[#fdf4f5]',
    pillTone: 'bg-[#fce8e6] text-[#a50e0e]',
    icon: Cpu,
    photo: '/photos/infinio-team.jpg',
  },
  {
    prefix: 'Turn your on-premise servers into',
    highlight: 'Zero-Downtime Cloud Infrastructure',
    bgTone: 'bg-[#f0f7f4]',
    pillTone: 'bg-[#e6f4ea] text-[#137333]',
    icon: Cloud,
    photo: '/photos/kochi-workspace-2.jpg',
  },
  {
    prefix: 'Turn your technology bottlenecks into',
    highlight: 'Clear Architecture Roadmaps',
    bgTone: 'bg-[#fef9f0]',
    pillTone: 'bg-[#fef7e0] text-[#b06000]',
    icon: Compass,
    photo: '/photos/kochi-office-2.jpg',
  },
  {
    prefix: 'Turn your engineering teams into',
    highlight: 'Cybersecurity & LMS Experts',
    bgTone: 'bg-[#f0f4f9]',
    pillTone: 'bg-[#e8f0fe] text-[#174ea6]',
    icon: ShieldCheck,
    photo: '/photos/kochi-office-3.jpg',
  },
];

const PROJECT_VISUALS = [
  {
    photo: '/photos/kochi-office-4.jpg',
    logo: '/photos/client-1.jpg',
    cardBg: 'bg-[#f0f4f9]',
    badgeBg: 'bg-[#e8f0fe] text-[#174ea6]',
  },
  {
    photo: '/photos/kochi-office-1.jpg',
    logo: '/photos/client-2.png',
    cardBg: 'bg-[#f6f7ff]',
    badgeBg: 'bg-[#f3e8fd] text-[#681da8]',
  },
  {
    photo: '/photos/kochi-office-2.jpg',
    logo: '/photos/client-4.png',
    cardBg: 'bg-[#fef9f0]',
    badgeBg: 'bg-[#fef7e0] text-[#b06000]',
  },
  {
    photo: '/photos/kochi-workspace-2.jpg',
    logo: '/photos/client-3.png',
    cardBg: 'bg-[#f0f7f4]',
    badgeBg: 'bg-[#e6f4ea] text-[#137333]',
  },
  {
    photo: '/photos/kochi-workspace-4.jpg',
    logo: '/photos/client-5.png',
    cardBg: 'bg-[#fdf4f5]',
    badgeBg: 'bg-[#fce8e6] text-[#a50e0e]',
  },
  {
    photo: '/photos/kochi-office-3.jpg',
    logo: '/images/infinio-logo.png',
    cardBg: 'bg-[#f0f4f9]',
    badgeBg: 'bg-[#e8f0fe] text-[#174ea6]',
  },
];

const CLIENT_LOGOS = [
  '/photos/client-1.jpg',
  '/photos/client-2.png',
  '/photos/client-4.png',
  '/photos/client-3.png',
  '/photos/client-5.png',
];

export default function InfinioExperience({ initialData }: InfinioExperienceProps) {
  const [soundOn, setSoundOn] = useState(false);
  const [wordIdx, setWordIdx] = useState(0);
  const [holdingChaos, setHoldingChaos] = useState(false);
  const [formationMode, setFormationMode] = useState<
    'auto' | 'infinity' | 'helix' | 'matrix' | 'ring'
  >('infinity');

  // Live MongoDB state
  const [dbEngine, setDbEngine] = useState(initialData.engine);
  const [services, setServices] = useState<IService[]>(initialData.services);
  const [projects, setProjects] = useState<IProject[]>(initialData.projects);
  const [testimonials, setTestimonials] = useState<ITestimonial[]>(
    initialData.testimonials
  );
  const [articles] = useState<IArticle[]>(initialData.articles);
  const [inquiries, setInquiries] = useState<IInquiry[]>(initialData.inquiries);

  // Interactive UI states
  const [activeServiceIdx, setActiveServiceIdx] = useState(0);
  const [selectedProjectModal, setSelectedProjectModal] = useState<IProject | null>(
    null
  );
  const [selectedArticleModal, setSelectedArticleModal] = useState<IArticle | null>(
    null
  );
  const [lightboxPhoto, setLightboxPhoto] = useState<{
    src: string;
    title: string;
    subtitle: string;
  } | null>(null);
  const [letsTalkOpen, setLetsTalkOpen] = useState(false);
  const [letsTalkDefaultService, setLetsTalkDefaultService] = useState<
    string | undefined
  >(undefined);
  const [mongoStudioOpen, setMongoStudioOpen] = useState(false);

  const sceneStateRef = useRef<SceneInteractionState>({
    scrollProgress: 0,
    shockPulse: 0,
    holdChaos: 0,
    activeWorkIndex: 0,
    formationMode: 'infinity',
    pointerX: 0,
    pointerY: 0,
  });

  const refreshMongoData = useCallback(async () => {
    try {
      const res = await fetch('/api/site');
      if (!res.ok) return;
      const data = await res.json();
      setDbEngine(data.engine);
      setServices(data.services);
      setProjects(data.projects);
      setTestimonials(data.testimonials);
      setInquiries(data.inquiries);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    const handleScroll = () => {
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const p =
        docHeight > 0 ? Math.min(1, Math.max(0, window.scrollY / docHeight)) : 0;
      sceneStateRef.current.scrollProgress = p;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIdx((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let raf = 0;
    const step = () => {
      const cur = sceneStateRef.current.holdChaos;
      const target = holdingChaos ? 1 : 0;
      const next = cur + (target - cur) * 0.1;
      sceneStateRef.current.holdChaos = Math.abs(next) < 0.002 ? 0 : next;
      soundEngine.setHoldResonance(sceneStateRef.current.holdChaos);
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [holdingChaos]);

  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      sceneStateRef.current.pointerX = (e.clientX / window.innerWidth) * 2 - 1;
      sceneStateRef.current.pointerY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLetsTalkOpen(false);
        setMongoStudioOpen(false);
        setSelectedArticleModal(null);
        setSelectedProjectModal(null);
        setLightboxPhoto(null);
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const triggerShockwave = () => {
    sceneStateRef.current.shockPulse = 1;
    soundEngine.playShockwave();
  };

  const changeFormation = (
    mode: 'auto' | 'infinity' | 'helix' | 'matrix' | 'ring'
  ) => {
    setFormationMode(mode);
    sceneStateRef.current.formationMode = mode;
    triggerShockwave();
  };

  const toggleSound = () => {
    const next = soundEngine.toggle();
    setSoundOn(next);
  };

  const openConsultationFor = (serviceTitle?: string) => {
    soundEngine.playTick();
    setLetsTalkDefaultService(serviceTitle);
    setLetsTalkOpen(true);
  };

  const activeService = services[activeServiceIdx] || services[0];
  const activeTurnMeta =
    TURN_INTO_HEADLINES[activeServiceIdx % TURN_INTO_HEADLINES.length];

  return (
    <div className="min-h-screen bg-white text-[#1f1f1f] selection:bg-[#e8f0fe] selection:text-[#174ea6]">
      {/* =========================================================
          STICKY MINIMALIST HEADER (notebook.google style)
         ========================================================= */}
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-xl border-b border-[#e9eef6]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
          <a
            href="#top"
            onClick={() => soundEngine.playTick()}
            className="flex items-center gap-3"
          >
            <img
              src="/images/infinio-logo.png"
              alt="Infinio Technology Solutions"
              className="h-8 w-auto object-contain"
            />
            <span className="hidden sm:inline-block text-sm font-medium text-[#5f6368] border-l border-[#dde3ea] pl-3">
              Technology Solutions
            </span>
          </a>

          <nav
            aria-label="Primary"
            className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#505070]"
          >
            <a href="#capabilities" className="hover:text-[#1f1f1f] transition-colors">
              Capabilities
            </a>
            <a href="#studios" className="hover:text-[#1f1f1f] transition-colors">
              Kochi &amp; Studios
            </a>
            <a href="#work" className="hover:text-[#1f1f1f] transition-colors">
              Deployments
            </a>
            <a href="#story" className="hover:text-[#1f1f1f] transition-colors">
              Our Story
            </a>
            <a
              href={INFINIO_COMPANY.moodlePortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1a73e8] hover:text-[#174ea6] inline-flex items-center gap-1 transition-colors"
            >
              <span>Moodle LMS</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </nav>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setMongoStudioOpen(true)}
              className="p-2.5 rounded-full bg-[#f0f4f9] hover:bg-[#e2e8f0] text-[#1a73e8] transition-colors cursor-pointer"
              title="Open MongoDB Studio"
            >
              <Database className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={toggleSound}
              aria-label="Toggle spatial sound"
              className="p-2.5 rounded-full bg-[#f0f4f9] hover:bg-[#e2e8f0] text-[#505070] transition-colors cursor-pointer"
            >
              {soundOn ? (
                <Volume2 className="w-4 h-4 text-[#1a73e8]" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>

            <button
              type="button"
              onClick={() => openConsultationFor()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-black text-white text-sm font-medium hover:bg-[#1f1f1f] transition-all cursor-pointer shadow-sm"
            >
              <span>Start a project</span>
            </button>
          </div>
        </div>
      </header>

      <main id="top">
        {/* =========================================================
            1. CENTERED HERO + 3D & KOCHI STUDIO SHOWCASE (notebook.google style)
           ========================================================= */}
        <section className="pt-14 pb-20 px-6 md:px-10 max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto text-center space-y-7">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#f0f4f9] border border-[#dde3ea] text-xs font-medium text-[#505070]">
              <span className="w-2 h-2 rounded-full bg-[#1a73e8]" />
              <span>Kochi (CIAL Aero Park) · Thrissur · Dubai · Est. 2016</span>
            </div>

            <h1 className="text-5xl sm:text-7xl lg:text-[5.25rem] font-medium tracking-tight leading-[1.04] text-[#1f1f1f]">
              Engineer{' '}
              <span className="notebook-gradient-text font-semibold">
                {ROTATING_WORDS[wordIdx]}
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-[#505070] max-w-2xl mx-auto leading-relaxed font-normal">
              Your technology and digital transformation partner, grounded in architectural excellence — building custom software, spatial 3D web experiences, cloud systems, and AI workflows.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => openConsultationFor()}
                className="min-h-[60px] px-10 rounded-2xl bg-black text-white text-lg font-medium hover:bg-[#1f1f1f] transition-all cursor-pointer inline-flex items-center gap-2.5 shadow-sm"
              >
                <span>Try Project Configurator</span>
                <ArrowUpRight className="w-5 h-5" />
              </button>

              <a
                href="#studios"
                className="min-h-[60px] px-9 rounded-2xl bg-[#f0f4f9] hover:bg-[#e2e8f0] text-[#1f1f1f] text-lg font-medium transition-colors inline-flex items-center gap-2"
              >
                <Building2 className="w-5 h-5 text-[#1a73e8]" />
                <span>Explore Kochi Studio</span>
              </a>
            </div>
          </div>

          {/* Interactive 3D Stage + Real Kochi Office Card */}
          <div className="mt-14 rounded-[36px] bg-gradient-to-br from-[#f0f4f9] via-[#f6f7ff] to-[#f8fafd] border border-[#dde3ea] p-4 sm:p-6 lg:p-8 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Left 7 Columns: Interactive 3D WebGL Sculpture Stage */}
              <div
                className="lg:col-span-7 relative rounded-[28px] bg-white border border-[#dde3ea] min-h-[380px] sm:min-h-[440px] overflow-hidden flex flex-col justify-between p-5 shadow-xs"
                onPointerDown={() => setHoldingChaos(true)}
                onPointerUp={() => setHoldingChaos(false)}
                onPointerCancel={() => setHoldingChaos(false)}
                onClick={() => triggerShockwave()}
              >
                {/* Live Embedded 3D Canvas */}
                <div className="absolute inset-0">
                  <Infinio3DScene stateRef={sceneStateRef} embedded />
                </div>

                {/* Top Bar Inside 3D Window */}
                <div className="relative z-10 flex flex-wrap items-center justify-between gap-2">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#dde3ea] text-xs font-medium text-[#1f1f1f] shadow-2xs">
                    <Sparkles className="w-3.5 h-3.5 text-[#1a73e8]" />
                    <span>Interactive 3D Architecture · WebGL</span>
                  </div>
                  <span className="text-xs font-mono text-[#5f6368] bg-white/80 backdrop-blur-md px-3 py-1 rounded-full border border-[#dde3ea]">
                    Click to pulse · Hold to expand
                  </span>
                </div>

                {/* Bottom Formation Switcher Pills */}
                <div
                  className="relative z-10 flex flex-wrap items-center gap-1.5 pt-3"
                  onClick={(e) => e.stopPropagation()}
                >
                  {(
                    [
                      { id: 'infinity', label: 'Infinity Ribbon' },
                      { id: 'helix', label: 'Helix Tower' },
                      { id: 'matrix', label: 'Spatial Matrix' },
                      { id: 'ring', label: 'Horizon Ring' },
                      { id: 'auto', label: 'Scroll Sync' },
                    ] as const
                  ).map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => changeFormation(item.id)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                        formationMode === item.id
                          ? 'bg-black text-white shadow-2xs'
                          : 'bg-white/90 text-[#505070] hover:text-black border border-[#dde3ea]'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right 5 Columns: Real Kochi CIAL Aero Park Studio Showcase Card */}
              <div className="lg:col-span-5 rounded-[28px] bg-white border border-[#dde3ea] p-5 flex flex-col justify-between space-y-4 shadow-xs">
                <div
                  className="relative h-56 rounded-2xl overflow-hidden group cursor-pointer"
                  onClick={() =>
                    setLightboxPhoto({
                      src: '/photos/kochi-office-1.jpg',
                      title: 'Infinio Kochi Studio · CIASL Business Centre',
                      subtitle:
                        'First Floor, CIASL Business Centre, CIAL Aero Park, F-23A, Cochin International Airport, Nedumbassery, Kochi, Kerala 683111',
                    })
                  }
                >
                  <img
                    src="/photos/kochi-office-1.jpg"
                    alt="Infinio Kochi Studio at CIASL Business Centre, CIAL Aero Park"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 text-[#174ea6] text-[11px] font-semibold">
                    Kochi Studio · Unit F-23A
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                    <div>
                      <div className="font-semibold text-base">
                        CIASL Business Centre
                      </div>
                      <div className="text-xs text-white/85">
                        CIAL Aero Park, Cochin International Airport
                      </div>
                    </div>
                    <span className="p-2 rounded-full bg-white/20 backdrop-blur-md">
                      <Maximize2 className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                <div className="space-y-3 px-1">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#1a73e8]">
                    Kochi Regional Engineering Hub
                  </div>
                  <p className="text-sm text-[#505070] leading-relaxed">
                    First Floor, CIASL Business Centre, CIAL Aero Park, F-23A, Cochin International Airport, Nedumbassery, Kochi, Kerala 683111
                  </p>
                  <div className="pt-2 border-t border-[#e9eef6] flex items-center justify-between text-xs font-medium">
                    <a
                      href="tel:+919745450618"
                      className="text-[#1f1f1f] hover:text-[#1a73e8] inline-flex items-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#1a73e8]" />
                      <span>+91 97454 50618</span>
                    </a>
                    <a
                      href={INFINIO_COMPANY.googleMapsKochiUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1a73e8] hover:underline inline-flex items-center gap-1"
                    >
                      <span>Open in Google Maps</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            PARTNER STRIP — CLEAN ON CRISP WHITE CANVAS
           ========================================================= */}
        <section className="py-10 px-6 md:px-10 border-t border-b border-[#e9eef6] bg-[#f8fafd]">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-xs font-medium uppercase tracking-widest text-[#5f6368] shrink-0">
              Trusted by leading organizations across India &amp; UAE
            </div>
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-10">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <img
                  key={num}
                  src={`/partners/partner-${num}.png`}
                  alt={`Partner ${num}`}
                  className="h-8 sm:h-9 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                />
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
            2. "TURN YOUR X INTO Y" — SIGNATURE NOTEBOOK.GOOGLE FEATURE SECTION
           ========================================================= */}
        <section id="capabilities" className="py-24 px-6 md:px-10 max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-[#1f1f1f]">
              Turn operational complexity into{' '}
              <span className="notebook-gradient-text font-semibold">
                clarity
              </span>
            </h2>
            <p className="text-base sm:text-lg text-[#505070]">
              Six specialized engineering practices designed to scale your business without friction.
            </p>
          </div>

          {/* Pill Selector Bar (notebook.google style) */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
            {services.map((srv, idx) => {
              const active = idx === activeServiceIdx;
              const Icon =
                TURN_INTO_HEADLINES[idx % TURN_INTO_HEADLINES.length].icon;
              return (
                <button
                  key={srv.slug}
                  type="button"
                  onClick={() => {
                    soundEngine.playTick();
                    triggerShockwave();
                    setActiveServiceIdx(idx);
                  }}
                  className={`inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition-all cursor-pointer ${
                    active
                      ? 'bg-black text-white shadow-sm'
                      : 'bg-[#f0f4f9] text-[#505070] hover:bg-[#e2e8f0] hover:text-[#1f1f1f]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{srv.title}</span>
                </button>
              );
            })}
          </div>

          {/* Large Tonal Showcase Card */}
          {activeService && (
            <div
              className={`rounded-[36px] ${activeTurnMeta.bgTone} border border-[#dde3ea] p-8 sm:p-12 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center transition-colors duration-300`}
            >
              <div className="lg:col-span-7 space-y-6">
                <div
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold ${activeTurnMeta.pillTone}`}
                >
                  <span>0{activeServiceIdx + 1}</span>
                  <span>·</span>
                  <span>{activeService.metrics}</span>
                </div>

                <h3 className="text-3xl sm:text-5xl font-medium tracking-tight text-[#1f1f1f] leading-[1.12]">
                  {activeTurnMeta.prefix}{' '}
                  <span className="notebook-gradient-text font-semibold block mt-1">
                    {activeTurnMeta.highlight}
                  </span>
                </h3>

                <p className="text-base sm:text-lg text-[#505070] leading-relaxed max-w-2xl">
                  {activeService.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  {activeService.capabilities.map((cap) => (
                    <div
                      key={cap.name}
                      className="p-5 rounded-2xl bg-white border border-[#dde3ea] space-y-2 shadow-2xs"
                    >
                      <div className="flex items-center gap-2 text-sm font-semibold text-[#1f1f1f]">
                        <Check className="w-4 h-4 text-[#1a73e8] shrink-0" />
                        <span>{cap.name}</span>
                      </div>
                      <p className="text-xs text-[#505070] leading-relaxed">
                        {cap.detail}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => openConsultationFor(activeService.title)}
                    className="inline-flex items-center gap-2.5 px-7 py-4 rounded-2xl bg-black text-white text-sm font-medium hover:bg-[#1f1f1f] transition-colors cursor-pointer"
                  >
                    <span>Discuss {activeService.title}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-[28px] bg-white p-3 border border-[#dde3ea] shadow-md">
                  <div className="relative h-72 sm:h-80 rounded-2xl overflow-hidden">
                    <img
                      src={activeTurnMeta.photo}
                      alt={activeService.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="text-xs font-mono uppercase tracking-wider text-white/80">
                        Infinio Engineering Standard
                      </div>
                      <div className="text-lg font-semibold mt-0.5">
                        {activeService.title}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* =========================================================
            3. KOCHI STUDIO & GLOBAL OFFICES — REAL PHOTO BENTO GALLERY
           ========================================================= */}
        <section
          id="studios"
          className="py-24 px-6 md:px-10 bg-[#f8fafd] border-t border-b border-[#e9eef6]"
        >
          <div className="max-w-7xl mx-auto space-y-14">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e8f0fe] text-[#174ea6] text-xs font-semibold">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Real Studios &amp; Engineering Campuses</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-[#1f1f1f]">
                  Inside our Kochi, Thrissur &amp; Dubai studios
                </h2>
                <p className="text-base sm:text-lg text-[#505070] leading-relaxed">
                  Explore real photos from our Kochi workspace at{' '}
                  <strong className="text-[#1f1f1f] font-semibold">
                    First Floor, CIASL Business Centre, CIAL Aero Park, F-23A, Cochin International Airport, Nedumbassery, Kochi, Kerala 683111
                  </strong>
                  , alongside our Thrissur HQ and Dubai operations.
                </p>
              </div>

              <a
                href={INFINIO_COMPANY.googleMapsKochiUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-black text-white text-sm font-medium hover:bg-[#1f1f1f] transition-colors self-start lg:self-auto"
              >
                <MapPin className="w-4 h-4" />
                <span>Get Directions to Kochi Studio</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            {/* 6-Photo Architectural Bento Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {INFINIO_COMPANY.studioPhotos.map((item) => (
                <div
                  key={item.src}
                  onClick={() =>
                    setLightboxPhoto({
                      src: item.src,
                      title: item.title,
                      subtitle: item.subtitle,
                    })
                  }
                  className={`${item.span} group relative rounded-[28px] overflow-hidden bg-white border border-[#dde3ea] min-h-[260px] lg:min-h-[290px] cursor-pointer shadow-xs hover:shadow-md transition-all`}
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 text-[#1f1f1f] text-[11px] font-semibold shadow-2xs">
                    {item.tag}
                  </div>
                  <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 text-white">
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-white/85 mt-1">
                        {item.subtitle}
                      </p>
                    </div>
                    <span className="p-2.5 rounded-full bg-white/20 backdrop-blur-md group-hover:bg-white group-hover:text-black transition-colors shrink-0">
                      <Maximize2 className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* 3 Regional Office Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {INFINIO_COMPANY.offices.map((off) => (
                <div
                  key={off.city}
                  className="rounded-[28px] bg-white border border-[#dde3ea] p-7 flex flex-col justify-between space-y-6 shadow-xs hover:border-[#1a73e8] transition-colors"
                >
                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f0f4f9] text-[#1a73e8] text-xs font-semibold">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{off.badge}</span>
                    </div>
                    <h3 className="text-2xl font-semibold text-[#1f1f1f]">
                      {off.city}
                    </h3>
                    <div className="text-xs font-mono text-[#5f6368]">
                      {off.region}
                    </div>
                    <p className="text-sm text-[#505070] leading-relaxed">
                      {off.address}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#e9eef6] space-y-3 text-xs font-medium">
                    <div className="flex flex-wrap gap-3">
                      {off.phones.map((p) => (
                        <a
                          key={p}
                          href={`tel:${p.replace(/\s+/g, '')}`}
                          className="inline-flex items-center gap-1.5 text-[#1f1f1f] hover:text-[#1a73e8]"
                        >
                          <Phone className="w-3.5 h-3.5 text-[#1a73e8]" />
                          <span>{p}</span>
                        </a>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <a
                        href={`mailto:${off.email}`}
                        className="inline-flex items-center gap-1.5 text-[#505070] hover:text-[#1f1f1f]"
                      >
                        <Mail className="w-3.5 h-3.5 text-[#1a73e8]" />
                        <span>{off.email}</span>
                      </a>
                      <a
                        href={off.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[#1a73e8] hover:underline font-semibold"
                      >
                        <span>Google Maps</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
            4. EXPLORE FEATURED DEPLOYMENTS (notebook.google Public Notebooks Grid)
           ========================================================= */}
        <section id="work" className="py-24 px-6 md:px-10 max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-[#1f1f1f]">
              Explore featured{' '}
              <span className="notebook-gradient-text font-semibold">
                deployments
              </span>
            </h2>
            <p className="text-base sm:text-lg text-[#505070]">
              Real production systems engineered for leading organizations across Kerala and Dubai.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((proj, idx) => {
              const vis = PROJECT_VISUALS[idx % PROJECT_VISUALS.length];
              return (
                <div
                  key={proj.slug}
                  onClick={() => setSelectedProjectModal(proj)}
                  className={`group rounded-[28px] ${vis.cardBg} border border-[#dde3ea] p-7 flex flex-col justify-between space-y-6 cursor-pointer hover:shadow-md transition-all`}
                >
                  <div className="space-y-5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="h-12 px-3 py-1.5 rounded-xl bg-white border border-[#dde3ea] flex items-center justify-center shadow-2xs">
                        <img
                          src={vis.logo}
                          alt={proj.client}
                          className="h-7 w-auto object-contain"
                        />
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${vis.badgeBg}`}
                      >
                        {proj.location}
                      </span>
                    </div>

                    <div>
                      <div className="text-xs font-medium text-[#5f6368] mb-1">
                        {proj.category}
                      </div>
                      <h3 className="text-2xl font-semibold text-[#1f1f1f] group-hover:text-[#1a73e8] transition-colors">
                        {proj.client}
                      </h3>
                      <p className="text-sm text-[#505070] leading-relaxed mt-2">
                        {proj.description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-black/10">
                    <div className="grid grid-cols-2 gap-3">
                      {proj.metrics.map((m) => (
                        <div
                          key={m.label}
                          className="p-3 rounded-2xl bg-white/80 border border-black/5"
                        >
                          <div className="text-xl font-semibold text-[#1f1f1f]">
                            {m.value}
                          </div>
                          <div className="text-[11px] font-medium text-[#5f6368]">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs font-semibold text-[#1a73e8]">
                      <span>View case study</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* =========================================================
            5. OUR STORY, CORE VALUES & CLIENT VOICES
           ========================================================= */}
        <section
          id="story"
          className="py-24 px-6 md:px-10 bg-[#f8fafd] border-t border-[#e9eef6]"
        >
          <div className="max-w-7xl mx-auto space-y-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f3e8fd] text-[#681da8] text-xs font-semibold">
                  <span>Our Story &amp; Core Values</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-[#1f1f1f] leading-tight">
                  Grounded in engineering trust since 2016.
                </h2>
                <p className="text-base sm:text-lg text-[#505070] leading-relaxed">
                  {INFINIO_COMPANY.vision}
                </p>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#dde3ea]">
                  <div>
                    <div className="text-3xl font-semibold text-[#1f1f1f]">
                      2016
                    </div>
                    <div className="text-xs font-medium text-[#5f6368] mt-1">
                      Founded
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-semibold text-[#1a73e8]">
                      3 Hubs
                    </div>
                    <div className="text-xs font-medium text-[#5f6368] mt-1">
                      Kochi · Thrissur · UAE
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-semibold text-[#681da8]">
                      100%
                    </div>
                    <div className="text-xs font-medium text-[#5f6368] mt-1">
                      Commitment
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
                {INFINIO_COMPANY.pathStages.map((stage) => (
                  <div
                    key={stage.code}
                    className="rounded-[28px] bg-white border border-[#dde3ea] overflow-hidden flex flex-col justify-between shadow-2xs"
                  >
                    <div className="h-36 overflow-hidden relative">
                      <img
                        src={stage.image}
                        alt={stage.valueName}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 text-[#1f1f1f] text-xs font-semibold">
                        {stage.code} · {stage.valueName}
                      </div>
                    </div>
                    <div className="p-6 space-y-2">
                      <h3 className="text-lg font-semibold text-[#1f1f1f]">
                        {stage.title.split('·')[1] || stage.title}
                      </h3>
                      <p className="text-sm text-[#505070] leading-relaxed">
                        {stage.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Client Testimonials */}
            <div className="space-y-8">
              <h3 className="text-2xl sm:text-3xl font-medium text-[#1f1f1f] text-center">
                What our partners say
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.slice(0, 3).map((t, i) => (
                  <div
                    key={`${t.company}-${i}`}
                    className="p-8 rounded-[28px] bg-white border border-[#dde3ea] flex flex-col justify-between space-y-6 shadow-2xs"
                  >
                    <p className="text-base text-[#1f1f1f] leading-relaxed">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className="pt-4 border-t border-[#e9eef6] flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#f8fafd] border border-[#dde3ea] p-1.5 flex items-center justify-center shrink-0">
                        <img
                          src={CLIENT_LOGOS[i % CLIENT_LOGOS.length]}
                          alt={t.company}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-[#1f1f1f]">
                          {t.company}
                        </div>
                        <div className="text-xs text-[#5f6368] mt-0.5">
                          {t.clientName} · {t.location}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            6. NOTEBOOK.GOOGLE-STYLE FINAL CTA & FOOTER
           ========================================================= */}
        <footer className="py-20 px-6 md:px-10 bg-white border-t border-[#e9eef6]">
          <div className="max-w-7xl mx-auto space-y-16">
            {/* Centered CTA Banner */}
            <div className="rounded-[36px] bg-gradient-to-r from-[#e8f0fe] via-[#f3e8fd] to-[#fce8e6] p-10 sm:p-16 text-center space-y-6">
              <h2 className="text-3xl sm:text-6xl font-medium tracking-tight text-[#1f1f1f]">
                Ready to build your next platform?
              </h2>
              <p className="text-base sm:text-lg text-[#505070] max-w-xl mx-auto">
                Connect with our engineering teams in Kochi (CIAL Aero Park), Thrissur, or Dubai.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => openConsultationFor()}
                  className="min-h-[60px] px-10 rounded-2xl bg-black text-white text-lg font-medium hover:bg-[#1f1f1f] transition-all cursor-pointer inline-flex items-center gap-2.5 shadow-sm"
                >
                  <span>Start Your Project Brief</span>
                  <ArrowUpRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* 3 Regional Offices Directory */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
              {INFINIO_COMPANY.offices.map((off) => (
                <div key={off.city} className="space-y-2.5">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#1a73e8] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{off.city}</span>
                  </div>
                  <p className="text-sm text-[#505070] leading-relaxed">
                    {off.address}
                  </p>
                  <div className="pt-1 flex flex-wrap gap-4 text-xs font-medium text-[#1f1f1f]">
                    {off.phones.map((p) => (
                      <a
                        key={p}
                        href={`tel:${p.replace(/\s+/g, '')}`}
                        className="hover:text-[#1a73e8] inline-flex items-center gap-1"
                      >
                        <Phone className="w-3 h-3 text-[#1a73e8]" />
                        <span>{p}</span>
                      </a>
                    ))}
                    <a
                      href={`mailto:${off.email}`}
                      className="hover:text-[#1a73e8] inline-flex items-center gap-1"
                    >
                      <Mail className="w-3 h-3 text-[#1a73e8]" />
                      <span>{off.email}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-8 border-t border-[#e9eef6] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5f6368]">
              <div className="flex items-center gap-3">
                <img
                  src="/images/infinio-logo.png"
                  alt="Infinio"
                  className="h-6 w-auto object-contain"
                />
                <span>
                  © {new Date().getFullYear()} Infinio Technology Solutions. All rights reserved.
                </span>
              </div>
              <div className="flex items-center gap-6 font-medium">
                <a
                  href={INFINIO_COMPANY.moodlePortalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#1f1f1f]"
                >
                  Moodle LMS Portal
                </a>
                <button
                  type="button"
                  onClick={() => setMongoStudioOpen(true)}
                  className="text-[#1a73e8] hover:underline cursor-pointer"
                >
                  MongoDB Studio ({inquiries.length})
                </button>
              </div>
            </div>
          </div>
        </footer>
      </main>

      {/* Case Study Detail Modal */}
      {selectedProjectModal && (
        <div
          className="fixed inset-0 z-[92] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedProjectModal(null)}
        >
          <div
            className="w-full max-w-2xl rounded-[32px] bg-white border border-[#dde3ea] p-8 md:p-10 space-y-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#e9eef6] pb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#1a73e8]">
                {selectedProjectModal.location} · {selectedProjectModal.category}
              </span>
              <button
                type="button"
                onClick={() => setSelectedProjectModal(null)}
                className="p-2 rounded-full bg-[#f0f4f9] hover:bg-[#e2e8f0] text-[#1f1f1f] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h3 className="text-3xl font-semibold text-[#1f1f1f]">
              {selectedProjectModal.client}
            </h3>

            <p className="text-base text-[#505070] leading-relaxed">
              {selectedProjectModal.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {selectedProjectModal.deliverables.map((d) => (
                <span
                  key={d}
                  className="px-3.5 py-1.5 rounded-full bg-[#f0f4f9] text-xs font-medium text-[#1f1f1f]"
                >
                  {d}
                </span>
              ))}
            </div>

            <div className="pt-4 border-t border-[#e9eef6] flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  const cat = selectedProjectModal.category;
                  setSelectedProjectModal(null);
                  openConsultationFor(cat);
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-black text-white text-sm font-medium hover:bg-[#1f1f1f] cursor-pointer"
              >
                <span>Start similar project</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              {selectedProjectModal.liveUrl && (
                <a
                  href={selectedProjectModal.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1a73e8] hover:underline"
                >
                  <span>Open Live Portal</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Modal for Real Studio Photos */}
      {lightboxPhoto && (
        <div
          className="fixed inset-0 z-[94] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
          role="dialog"
          aria-modal="true"
          onClick={() => setLightboxPhoto(null)}
        >
          <div
            className="max-w-5xl w-full rounded-[32px] bg-white overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-h-[72vh] overflow-hidden bg-black flex items-center justify-center">
              <img
                src={lightboxPhoto.src}
                alt={lightboxPhoto.title}
                className="w-full h-auto max-h-[72vh] object-contain"
              />
              <button
                type="button"
                onClick={() => setLightboxPhoto(null)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 hover:bg-white text-black transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-[#1f1f1f]">
                  {lightboxPhoto.title}
                </h3>
                <p className="text-sm text-[#505070] mt-1">
                  {lightboxPhoto.subtitle}
                </p>
              </div>
              <a
                href={INFINIO_COMPANY.googleMapsKochiUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-black text-white text-xs font-semibold uppercase tracking-wider shrink-0"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Essay Modal */}
      {selectedArticleModal && (
        <div
          className="fixed inset-0 z-[92] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedArticleModal(null)}
        >
          <div
            className="w-full max-w-2xl rounded-[32px] bg-white border border-[#dde3ea] p-8 md:p-12 space-y-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#e9eef6] pb-4 text-xs font-semibold text-[#1a73e8]">
              <span>{selectedArticleModal.readTime}</span>
              <button
                type="button"
                onClick={() => setSelectedArticleModal(null)}
                className="p-2 rounded-full bg-[#f0f4f9] hover:bg-[#e2e8f0] text-[#1f1f1f] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h3 className="text-2xl sm:text-3xl font-semibold text-[#1f1f1f]">
              {selectedArticleModal.title}
            </h3>

            <div className="space-y-4 text-sm sm:text-base text-[#505070] leading-relaxed">
              {selectedArticleModal.body.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Consultation Drawer */}
      <LetsTalkDrawer
        open={letsTalkOpen}
        onClose={() => setLetsTalkOpen(false)}
        defaultService={letsTalkDefaultService}
        onSuccessSubmit={refreshMongoData}
      />

      {/* MongoDB Studio Modal */}
      <MongoStudioModal
        open={mongoStudioOpen}
        onClose={() => setMongoStudioOpen(false)}
        engine={dbEngine}
        inquiries={inquiries}
        projects={projects}
        services={services}
        testimonials={testimonials}
        onRefresh={refreshMongoData}
      />
    </div>
  );
}
