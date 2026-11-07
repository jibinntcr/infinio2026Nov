'use client';

import React, { useState } from 'react';
import {
  X,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  MapPin,
  Phone,
  Mail,
} from 'lucide-react';
import { INFINIO_COMPANY } from '@/lib/seed-data';
import { soundEngine } from '@/lib/sound-engine';

interface LetsTalkDrawerProps {
  open: boolean;
  onClose: () => void;
  defaultService?: string;
  onSuccessSubmit?: () => void;
}

const SERVICE_OPTIONS = [
  'Software Development',
  'Web & 3D Experiential',
  'Digital Transformation & AI',
  'Cloud Services & DevOps',
  'IT Consulting & Strategy',
  'Cybersecurity & Academy',
];

const STAGE_OPTIONS = [
  'New Concept / Greenfield',
  'Redesign / Re-architecture',
  'Process & AI Automation',
  'Cloud Migration & Security Audit',
];

const BUDGET_OPTIONS = [
  '₹1L – ₹3L / $2k – $5k',
  '₹3L – ₹10L / $5k – $15k',
  '₹10L+ / $15k+ Enterprise',
  'Need Advisory / Undecided',
];

const TIMELINE_OPTIONS = [
  'Immediate (Within 2 Weeks)',
  '1 – 2 Months',
  'Quarter Roadmap',
  'Long-Term Retainer',
];

export default function LetsTalkDrawer({
  open,
  onClose,
  defaultService,
  onSuccessSubmit,
}: LetsTalkDrawerProps) {
  const [step, setStep] = useState(1);
  const [serviceNeeded, setServiceNeeded] = useState(
    defaultService || SERVICE_OPTIONS[0]
  );
  const [projectStage, setProjectStage] = useState(STAGE_OPTIONS[0]);
  const [budgetRange, setBudgetRange] = useState(BUDGET_OPTIONS[1]);
  const [timeline, setTimeline] = useState(TIMELINE_OPTIONS[1]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [submittedRecord, setSubmittedRecord] = useState<{
    id: string;
    engine: string;
  } | null>(null);
  const [error, setError] = useState('');

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please enter your name, email, and project brief.');
      return;
    }

    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          company,
          location,
          serviceNeeded,
          projectStage,
          budgetRange,
          timeline,
          message,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Submission failed');
      }

      soundEngine.playShockwave();
      setSubmittedRecord({
        id: data.inquiry?._id || 'mongo-doc',
        engine: data.engine || 'mongodb',
      });
      onSuccessSubmit?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmittedRecord(null);
    setStep(1);
    setName('');
    setEmail('');
    setPhone('');
    setCompany('');
    setMessage('');
  };

  return (
    <div
      className="fixed inset-0 z-[90] bg-black/45 backdrop-blur-md text-[#1f1f1f] overflow-y-auto flex items-center justify-center p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="Start a Project with Infinio"
      onClick={onClose}
    >
      <div
        className="w-full max-w-5xl rounded-[36px] bg-white border border-[#dde3ea] p-6 sm:p-10 shadow-2xl my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between border-b border-[#e9eef6] pb-5">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1a73e8]" />
            <span className="text-xs font-semibold tracking-wider uppercase text-[#505070]">
              Infinio Project Configurator
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              soundEngine.playTick();
              onClose();
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#f0f4f9] hover:bg-[#e2e8f0] text-xs font-semibold text-[#1f1f1f] transition-colors cursor-pointer"
          >
            <span>Close</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
          {/* Left 7 Columns: 2-Step Configurator */}
          <div className="lg:col-span-7 rounded-[28px] bg-[#f8fafd] border border-[#dde3ea] p-6 sm:p-8">
            {submittedRecord ? (
              <div className="py-8 space-y-5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e6f4ea] text-[#137333] text-xs font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Saved in MongoDB ({submittedRecord.engine})</span>
                </div>
                <h2 className="text-3xl font-semibold tracking-tight text-[#1f1f1f]">
                  Brief received. We&apos;ll connect within 24 hours.
                </h2>
                <p className="text-sm text-[#505070] leading-relaxed">
                  Thank you, <strong className="text-[#1f1f1f]">{name}</strong>. Your inquiry for{' '}
                  <span className="text-[#1a73e8] font-semibold">{serviceNeeded}</span> has been recorded in MongoDB (ID:{' '}
                  <code className="font-mono text-xs bg-white px-2 py-0.5 rounded border border-[#dde3ea]">
                    {submittedRecord.id}
                  </code>
                  ).
                </p>
                <div className="flex flex-wrap gap-3 pt-3">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-3 rounded-2xl bg-black text-white text-sm font-medium cursor-pointer"
                  >
                    Submit another brief
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-3 rounded-2xl bg-white border border-[#dde3ea] text-sm font-medium text-[#1f1f1f] hover:bg-[#f0f4f9] cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#1a73e8]">
                  <span>Configure your project</span>
                  <span>Step 0{step} / 02</span>
                </div>

                {step === 1 ? (
                  <div className="space-y-5">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#505070] mb-2.5">
                        1. Primary capability needed
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {SERVICE_OPTIONS.map((item) => {
                          const active = serviceNeeded === item;
                          return (
                            <button
                              key={item}
                              type="button"
                              onClick={() => {
                                soundEngine.playTick();
                                setServiceNeeded(item);
                              }}
                              className={`text-left px-4 py-3 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                                active
                                  ? 'bg-black text-white border-black font-semibold shadow-2xs'
                                  : 'bg-white text-[#505070] border-[#dde3ea] hover:border-[#1f1f1f]'
                              }`}
                            >
                              {item}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#505070] mb-2.5">
                        2. Project stage
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {STAGE_OPTIONS.map((item) => {
                          const active = projectStage === item;
                          return (
                            <button
                              key={item}
                              type="button"
                              onClick={() => {
                                soundEngine.playTick();
                                setProjectStage(item);
                              }}
                              className={`text-left px-4 py-3 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                                active
                                  ? 'bg-[#e8f0fe] text-[#174ea6] border-[#1a73e8] font-semibold'
                                  : 'bg-white text-[#505070] border-[#dde3ea] hover:border-[#1f1f1f]'
                              }`}
                            >
                              {item}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#505070] mb-2">
                          3. Estimated budget
                        </label>
                        <select
                          value={budgetRange}
                          onChange={(e) => setBudgetRange(e.target.value)}
                          className="w-full rounded-xl bg-white border border-[#dde3ea] px-4 py-3 text-xs text-[#1f1f1f] focus:outline-none focus:border-[#1a73e8]"
                        >
                          {BUDGET_OPTIONS.map((b) => (
                            <option key={b} value={b}>
                              {b}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#505070] mb-2">
                          4. Target timeline
                        </label>
                        <select
                          value={timeline}
                          onChange={(e) => setTimeline(e.target.value)}
                          className="w-full rounded-xl bg-white border border-[#dde3ea] px-4 py-3 text-xs text-[#1f1f1f] focus:outline-none focus:border-[#1a73e8]"
                        >
                          {TIMELINE_OPTIONS.map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          soundEngine.playTick();
                          setStep(2);
                        }}
                        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-black text-white text-sm font-medium hover:bg-[#1f1f1f] transition-all cursor-pointer"
                      >
                        <span>Continue</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#505070] mb-1.5">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Full Name"
                          className="w-full rounded-xl bg-white border border-[#dde3ea] px-4 py-3 text-sm text-[#1f1f1f] focus:outline-none focus:border-[#1a73e8]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#505070] mb-1.5">
                          Work Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@company.com"
                          className="w-full rounded-xl bg-white border border-[#dde3ea] px-4 py-3 text-sm text-[#1f1f1f] focus:outline-none focus:border-[#1a73e8]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#505070] mb-1.5">
                          Phone / WhatsApp
                        </label>
                        <input
                          type="text"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 / +971..."
                          className="w-full rounded-xl bg-white border border-[#dde3ea] px-4 py-3 text-sm text-[#1f1f1f] focus:outline-none focus:border-[#1a73e8]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#505070] mb-1.5">
                          Company
                        </label>
                        <input
                          type="text"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="Organization"
                          className="w-full rounded-xl bg-white border border-[#dde3ea] px-4 py-3 text-sm text-[#1f1f1f] focus:outline-none focus:border-[#1a73e8]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#505070] mb-1.5">
                          Location
                        </label>
                        <input
                          type="text"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="Kochi / Thrissur / Dubai"
                          className="w-full rounded-xl bg-white border border-[#dde3ea] px-4 py-3 text-sm text-[#1f1f1f] focus:outline-none focus:border-[#1a73e8]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#505070] mb-1.5">
                        Project Brief *
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell us about your software, web, cloud, or AI automation goals..."
                        className="w-full rounded-xl bg-white border border-[#dde3ea] p-4 text-sm text-[#1f1f1f] focus:outline-none focus:border-[#1a73e8]"
                      />
                    </div>

                    {error && (
                      <div className="p-3 rounded-xl bg-[#fce8e6] text-xs text-[#a50e0e] font-medium">
                        {error}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="px-5 py-3 rounded-xl bg-white border border-[#dde3ea] text-xs font-semibold text-[#1f1f1f] hover:bg-[#f0f4f9] cursor-pointer"
                      >
                        ← Back
                      </button>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-black text-white text-sm font-medium hover:bg-[#1f1f1f] transition-all cursor-pointer disabled:opacity-50"
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>{submitting ? 'Saving...' : 'Submit Brief'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </form>
            )}
          </div>

          {/* Right 5 Columns: Direct Regional Hubs */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
            <div className="space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#1a73e8]">
                Direct Regional Studios
              </div>
              <h3 className="text-2xl font-semibold text-[#1f1f1f]">
                Kochi · Thrissur · Dubai
              </h3>
              <p className="text-sm text-[#505070] leading-relaxed">
                Connect directly with our engineering hubs in Kerala or the UAE.
              </p>
            </div>

            <div className="space-y-3.5">
              {INFINIO_COMPANY.offices.map((office) => (
                <div
                  key={office.city}
                  className="p-5 rounded-2xl bg-[#f8fafd] border border-[#dde3ea] space-y-2"
                >
                  <div className="flex items-center justify-between text-xs font-semibold text-[#1a73e8]">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      {office.city}
                    </span>
                    <span className="text-[11px] text-[#5f6368] font-mono">
                      {office.region}
                    </span>
                  </div>
                  <p className="text-xs text-[#505070] leading-relaxed">
                    {office.address}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-xs font-medium pt-1">
                    {office.phones.map((ph) => (
                      <a
                        key={ph}
                        href={`tel:${ph.replace(/\s+/g, '')}`}
                        className="inline-flex items-center gap-1 text-[#1f1f1f] hover:text-[#1a73e8]"
                      >
                        <Phone className="w-3 h-3 text-[#1a73e8]" />
                        <span>{ph}</span>
                      </a>
                    ))}
                    <a
                      href={`mailto:${office.email}`}
                      className="inline-flex items-center gap-1 text-[#505070] hover:text-[#1a73e8]"
                    >
                      <Mail className="w-3 h-3 text-[#1a73e8]" />
                      <span>{office.email}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
