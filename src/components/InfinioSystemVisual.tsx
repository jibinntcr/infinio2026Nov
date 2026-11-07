'use client';

import React, { Component, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { Cpu, Cloud, Layers, CheckCircle2, ArrowRight } from 'lucide-react';

const Scene3D = dynamic(() => import('./Scene3D'), {
  ssr: false,
});

export interface SystemModeInfo {
  id: number;
  tabLabel: string;
  badge: string;
  headline: string;
  explanation: string;
  nodes: {
    id: string;
    title: string;
    subtitle: string;
    positionClass: string;
    accent: string;
  }[];
  outcomes: string[];
}

export const SYSTEM_MODES: SystemModeInfo[] = [
  {
    id: 0,
    tabLabel: 'AI Core',
    badge: 'Intelligent Automation',
    headline: 'Grounded AI & Workflow Automation',
    explanation:
      'Connects your verified product catalogs, documents, and enquiry forms to automated routing and reviewable team workflows.',
    nodes: [
      {
        id: 'ai-1',
        title: 'Business Data',
        subtitle: 'Catalogs & Documents',
        positionClass: 'top-3 left-3 sm:top-4 sm:left-4',
        accent: '#0d9488',
      },
      {
        id: 'ai-2',
        title: 'AI Validation',
        subtitle: 'Grounded Lookup',
        positionClass: 'top-3 right-3 sm:top-4 sm:right-4',
        accent: '#2563eb',
      },
      {
        id: 'ai-3',
        title: 'Smart Routing',
        subtitle: 'Enquiry Triage',
        positionClass: 'bottom-3 left-3 sm:bottom-4 sm:left-4',
        accent: '#0284c7',
      },
      {
        id: 'ai-4',
        title: 'Team Action',
        subtitle: 'Human-Reviewed Output',
        positionClass: 'bottom-3 right-3 sm:bottom-4 sm:right-4',
        accent: '#0d9488',
      },
    ],
    outcomes: [
      'Answers grounded in your approved company documents',
      'Automated enquiry routing with clear human oversight',
    ],
  },
  {
    id: 1,
    tabLabel: 'Cloud Mesh',
    badge: 'Cloud Infrastructure',
    headline: 'Dependable Cloud Hosting & Deployment',
    explanation:
      'Keeps your websites, customer portals, and learning systems fast, secure, and backed up across branches in India and the UAE.',
    nodes: [
      {
        id: 'cl-1',
        title: 'Web & Mobile',
        subtitle: 'Responsive Frontends',
        positionClass: 'top-3 left-3 sm:top-4 sm:left-4',
        accent: '#0284c7',
      },
      {
        id: 'cl-2',
        title: 'Cloud Hosting',
        subtitle: 'Managed Servers',
        positionClass: 'top-3 right-3 sm:top-4 sm:right-4',
        accent: '#2563eb',
      },
      {
        id: 'cl-3',
        title: 'Databases',
        subtitle: 'Structured Storage',
        positionClass: 'bottom-3 left-3 sm:bottom-4 sm:left-4',
        accent: '#0d9488',
      },
      {
        id: 'cl-4',
        title: 'Backups & SSL',
        subtitle: 'Security & Continuity',
        positionClass: 'bottom-3 right-3 sm:bottom-4 sm:right-4',
        accent: '#2563eb',
      },
    ],
    outcomes: [
      'Structured deployment pipelines for smooth updates',
      'Encrypted connections, access controls, and regular backups',
    ],
  },
  {
    id: 2,
    tabLabel: 'Digital ERP',
    badge: 'Operations & Software',
    headline: 'Custom Business Software & Portals',
    explanation:
      'Replaces disconnected spreadsheets with unified web applications tailored to how your teams manage products, partners, and enquiries.',
    nodes: [
      {
        id: 'erp-1',
        title: 'Product Catalogs',
        subtitle: 'Searchable Specs',
        positionClass: 'top-3 left-3 sm:top-4 sm:left-4',
        accent: '#2563eb',
      },
      {
        id: 'erp-2',
        title: 'Partner Portals',
        subtitle: 'Dealer & Client Access',
        positionClass: 'top-3 right-3 sm:top-4 sm:right-4',
        accent: '#0d9488',
      },
      {
        id: 'erp-3',
        title: 'Order Workflows',
        subtitle: 'Status & Approvals',
        positionClass: 'bottom-3 left-3 sm:bottom-4 sm:left-4',
        accent: '#0284c7',
      },
      {
        id: 'erp-4',
        title: 'Management View',
        subtitle: 'Branch Reporting',
        positionClass: 'bottom-3 right-3 sm:bottom-4 sm:right-4',
        accent: '#0d9488',
      },
    ],
    outcomes: [
      'Single source of truth across Kochi, Thrissur, and Dubai teams',
      'Intuitive interfaces designed for everyday staff and customers',
    ],
  },
];

function checkWebGLAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    const gl =
      (canvas.getContext('webgl2') as WebGLRenderingContext | null) ||
      (canvas.getContext('webgl') as WebGLRenderingContext | null) ||
      (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null);
    if (!gl || typeof gl.getParameter !== 'function') {
      return false;
    }
    const version = gl.getParameter(gl.VERSION);
    const loseExt = gl.getExtension('WEBGL_lose_context');
    if (loseExt) {
      loseExt.loseContext();
    }
    return Boolean(version);
  } catch {
    return false;
  }
}

interface ErrorBoundaryProps {
  fallback: React.ReactNode;
  onError?: () => void;
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class VisualErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch() {
    this.props.onError?.();
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export function InfinioSvgFallbackDiagram({
  activeMode,
}: {
  activeMode: number;
}) {
  const mode = SYSTEM_MODES[activeMode % SYSTEM_MODES.length];

  return (
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden p-4"
      role="img"
      aria-label={`Infinio ${mode.headline} architecture diagram connecting ${mode.nodes
        .map((n) => n.title)
        .join(', ')}`}
    >
      <svg
        viewBox="0 0 500 280"
        className="h-full w-full max-w-[460px]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="infinioHexGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7df9d4" />
            <stop offset="50%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
          <linearGradient id="infinioHexGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#efe2dc" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>
        </defs>

        {/* Subtle Grid Background */}
        <circle cx="250" cy="140" r="115" stroke="#e2e8f0" strokeDasharray="4 4" strokeWidth="1.2" />
        <circle cx="250" cy="140" r="76" stroke="#e0f2fe" strokeWidth="1.2" />

        {/* Connection Lines Depending on Active Mode */}
        {activeMode === 0 && (
          <g stroke="#38bdf8" strokeWidth="2" strokeOpacity="0.65">
            <line x1="100" y1="60" x2="225" y2="140" />
            <line x1="400" y1="60" x2="275" y2="140" />
            <line x1="100" y1="220" x2="225" y2="140" />
            <line x1="400" y1="220" x2="275" y2="140" />
            <line x1="100" y1="60" x2="400" y2="60" stroke="#cbd5e1" strokeDasharray="5 5" />
            <line x1="100" y1="220" x2="400" y2="220" stroke="#cbd5e1" strokeDasharray="5 5" />
          </g>
        )}

        {activeMode === 1 && (
          <g stroke="#2563eb" strokeWidth="2" strokeOpacity="0.55">
            <line x1="100" y1="60" x2="400" y2="60" />
            <line x1="100" y1="220" x2="400" y2="220" />
            <line x1="100" y1="60" x2="100" y2="220" />
            <line x1="400" y1="60" x2="400" y2="220" />
            <line x1="100" y1="60" x2="250" y2="140" />
            <line x1="400" y1="60" x2="250" y2="140" />
            <line x1="100" y1="220" x2="250" y2="140" />
            <line x1="400" y1="220" x2="250" y2="140" />
          </g>
        )}

        {activeMode === 2 && (
          <g stroke="#0d9488" strokeWidth="2" strokeOpacity="0.6">
            <path d="M100 60 H250 V140" />
            <path d="M400 60 H250 V140" />
            <path d="M100 220 H250 V140" />
            <path d="M400 220 H250 V140" />
            <rect x="92" y="52" width="316" height="176" rx="20" stroke="#cbd5e1" strokeDasharray="4 4" fill="none" />
          </g>
        )}

        {/* Central Interlocking Double-Hexagon Motif (Matching Infinio Logo Symbol) */}
        <polygon
          points="226,96 258,96 274,124 258,152 226,152 210,124"
          stroke="url(#infinioHexGrad1)"
          strokeWidth="9"
          strokeLinejoin="round"
          fill="#ffffff"
        />
        <polygon
          points="244,126 276,126 292,154 276,182 244,182 228,154"
          stroke="url(#infinioHexGrad2)"
          strokeWidth="8"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="250" cy="140" r="14" fill="#0f172a" />
        <circle cx="250" cy="140" r="5" fill="#7df9d4" />

        {/* Corner Hexagonal Module Nodes */}
        {[
          { cx: 100, cy: 60, color: '#0d9488' },
          { cx: 400, cy: 60, color: '#2563eb' },
          { cx: 100, cy: 220, color: '#0284c7' },
          { cx: 400, cy: 220, color: '#0d9488' },
        ].map((pt, i) => (
          <g key={i}>
            <circle cx={pt.cx} cy={pt.cy} r="18" fill="#ffffff" stroke={pt.color} strokeWidth="3.5" />
            <circle cx={pt.cx} cy={pt.cy} r="6" fill={pt.color} />
          </g>
        ))}
      </svg>
    </div>
  );
}

export default function InfinioSystemVisual({
  activeMode,
  onSelectMode,
}: {
  activeMode: number;
  onSelectMode: (mode: number) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canUseWebGL, setCanUseWebGL] = useState<boolean>(false);
  const [webglFailed, setWebglFailed] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [isMobileDevice, setIsMobileDevice] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    const mqMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mqMobile = window.matchMedia('(max-width: 767px)');

    setReducedMotion(mqMotion.matches);
    setIsMobileDevice(mqMobile.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    const handleMobileChange = (e: MediaQueryListEvent) => setIsMobileDevice(e.matches);

    mqMotion.addEventListener('change', handleMotionChange);
    mqMobile.addEventListener('change', handleMobileChange);

    // Only initialize WebGL on desktop/tablet when WebGL context creation succeeds and reduced motion is off
    if (!mqMotion.matches && !mqMobile.matches) {
      const supported = checkWebGLAvailable();
      setCanUseWebGL(supported);
    }

    const handleVisibility = () => {
      setIsVisible(document.visibilityState === 'visible');
    };
    document.addEventListener('visibilitychange', handleVisibility);

    let observer: IntersectionObserver | null = null;
    if (containerRef.current && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          setIsVisible(entry.isIntersecting && document.visibilityState === 'visible');
        },
        { threshold: 0.05 }
      );
      observer.observe(containerRef.current);
    }

    return () => {
      mqMotion.removeEventListener('change', handleMotionChange);
      mqMobile.removeEventListener('change', handleMobileChange);
      document.removeEventListener('visibilitychange', handleVisibility);
      observer?.disconnect();
    };
  }, []);

  const currentMode = SYSTEM_MODES[activeMode % SYSTEM_MODES.length];
  const show3D = canUseWebGL && !webglFailed && !reducedMotion && !isMobileDevice;

  return (
    <div
      ref={containerRef}
      className="rounded-[28px] border border-[#e2e8f0] bg-[#f8fafc] p-4 shadow-xs sm:p-6"
    >
      <div className="flex flex-col justify-between overflow-hidden rounded-[22px] border border-[#e2e8f0] bg-white p-5 sm:p-6">
        {/* Top Mode Switcher Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#f1f5f9] pb-4">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-[#0d9488] uppercase">
              <span className="h-2 w-2 rounded-full bg-[#0d9488]" />
              {currentMode.badge}
            </span>
            <h2 className="mt-0.5 text-[17px] font-bold text-[#0f172a]">
              {currentMode.headline}
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Infinio technology capabilities"
            className="flex flex-wrap gap-1 rounded-full border border-[#e2e8f0] bg-[#f8fafc] p-1"
          >
            {SYSTEM_MODES.map((m) => {
              const selected = activeMode === m.id;
              return (
                <button
                  key={m.id}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  onClick={() => onSelectMode(m.id)}
                  className={`rounded-full px-3.5 py-1.5 text-[12px] font-semibold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb] ${
                    selected
                      ? 'bg-[#0f172a] text-white shadow-2xs'
                      : 'text-[#475569] hover:text-[#0f172a]'
                  }`}
                >
                  {m.tabLabel}
                </button>
              );
            })}
          </div>
        </div>

        {/* Visual Stage (Reserved Height, Independent of Main Content) */}
        <div className="relative my-4 h-[250px] w-full overflow-hidden rounded-2xl bg-gradient-to-b from-[#f8fafc] via-[#f0f9ff]/50 to-[#f0fdfa]/50 sm:h-[280px]">
          {show3D ? (
            <VisualErrorBoundary
              onError={() => setWebglFailed(true)}
              fallback={<InfinioSvgFallbackDiagram activeMode={activeMode} />}
            >
              <Scene3D
                activeMode={activeMode}
                paused={!isVisible}
                reducedMotion={reducedMotion}
                onContextError={() => setWebglFailed(true)}
              />
            </VisualErrorBoundary>
          ) : (
            <InfinioSvgFallbackDiagram activeMode={activeMode} />
          )}

          {/* Connected Module Callout Pills Around the Stage */}
          {currentMode.nodes.map((node) => (
            <div
              key={node.id}
              className={`pointer-events-none absolute ${node.positionClass} rounded-xl border border-[#e2e8f0] bg-white/95 px-3 py-1.5 shadow-2xs backdrop-blur-xs`}
            >
              <div className="flex items-center gap-1.5">
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: node.accent }}
                />
                <span className="text-[12px] font-bold text-[#0f172a]">
                  {node.title}
                </span>
              </div>
              <p className="text-[11px] font-medium text-[#475569]">
                {node.subtitle}
              </p>
            </div>
          ))}
        </div>

        {/* Plain-Language Customer Value Explanation */}
        <div className="rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-4">
          <p className="text-[14px] leading-[1.6] text-[#334155]">
            {currentMode.explanation}
          </p>
          <div className="mt-3 grid grid-cols-1 gap-2 border-t border-[#e2e8f0] pt-3 sm:grid-cols-2">
            {currentMode.outcomes.map((item) => (
              <div
                key={item}
                className="flex items-start gap-2 text-[12px] font-medium text-[#0f172a]"
              >
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0d9488]" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
