'use client';

import React, { useState } from 'react';
import {
  Database,
  X,
  Plus,
  RefreshCw,
  CheckCircle,
  FolderGit2,
  MessageSquare,
} from 'lucide-react';
import { IProject, IInquiry, IService, ITestimonial } from '@/models';

interface MongoStudioModalProps {
  open: boolean;
  onClose: () => void;
  engine: string;
  inquiries: IInquiry[];
  projects: IProject[];
  services: IService[];
  testimonials: ITestimonial[];
  onRefresh: () => Promise<void>;
}

export default function MongoStudioModal({
  open,
  onClose,
  engine,
  inquiries,
  projects,
  services,
  testimonials,
  onRefresh,
}: MongoStudioModalProps) {
  const [tab, setTab] = useState<'inquiries' | 'projects' | 'add-project'>(
    'inquiries'
  );
  const [client, setClient] = useState('');
  const [location, setLocation] = useState('Kochi, Kerala');
  const [category, setCategory] = useState('Custom Software & Cloud');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);

  if (!open) return null;

  const handleStatusChange = async (
    id: string | undefined,
    status: IInquiry['status']
  ) => {
    if (!id) return;
    await fetch('/api/inquiries', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    await onRefresh();
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!client.trim() || !tagline.trim()) return;
    setSaving(true);
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client,
          location,
          category,
          tagline,
          description,
          year: '2026',
        }),
      });
      if (res.ok) {
        setClient('');
        setTagline('');
        setDescription('');
        await onRefresh();
        setTab('projects');
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[95] bg-black/45 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="Infinio MongoDB Live Studio"
      onClick={onClose}
    >
      <div
        className="w-full max-w-5xl rounded-[32px] bg-white border border-[#dde3ea] text-[#1f1f1f] shadow-2xl overflow-hidden flex flex-col max-h-[88vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 px-7 py-5 border-b border-[#e9eef6] bg-[#f8fafd]">
          <div className="flex items-center gap-3">
            <Database className="w-4 h-4 text-[#1a73e8]" />
            <span className="text-sm font-semibold text-[#1f1f1f]">
              Infinio MongoDB Studio
            </span>
            <span className="px-3 py-0.5 rounded-full bg-[#e8f0fe] text-[#174ea6] font-mono text-[11px] font-medium">
              {engine}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onRefresh}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#dde3ea] text-xs font-medium hover:bg-[#f0f4f9] cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Sync</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black text-white text-xs font-medium cursor-pointer"
            >
              <span>Close</span>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Collection Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-[#e9eef6] bg-white text-xs">
          <div className="p-4 border-r border-[#e9eef6]">
            <div className="text-[11px] text-[#5f6368] font-medium">
              Inquiries Collection
            </div>
            <div className="text-2xl font-semibold text-[#1a73e8] mt-1">
              {inquiries.length}
            </div>
          </div>
          <div className="p-4 border-r border-[#e9eef6]">
            <div className="text-[11px] text-[#5f6368] font-medium">
              Projects Collection
            </div>
            <div className="text-2xl font-semibold text-[#681da8] mt-1">
              {projects.length}
            </div>
          </div>
          <div className="p-4 border-r border-[#e9eef6]">
            <div className="text-[11px] text-[#5f6368] font-medium">
              Services Collection
            </div>
            <div className="text-2xl font-semibold text-[#1f1f1f] mt-1">
              {services.length}
            </div>
          </div>
          <div className="p-4">
            <div className="text-[11px] text-[#5f6368] font-medium">
              Testimonials
            </div>
            <div className="text-2xl font-semibold text-[#137333] mt-1">
              {testimonials.length}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-[#e9eef6] bg-[#f8fafd]">
          <button
            type="button"
            onClick={() => setTab('inquiries')}
            className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
              tab === 'inquiries'
                ? 'border-[#1a73e8] text-[#1a73e8]'
                : 'border-transparent text-[#505070] hover:text-[#1f1f1f]'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Leads ({inquiries.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setTab('projects')}
            className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
              tab === 'projects'
                ? 'border-[#681da8] text-[#681da8]'
                : 'border-transparent text-[#505070] hover:text-[#1f1f1f]'
            }`}
          >
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Projects ({projects.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setTab('add-project')}
            className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
              tab === 'add-project'
                ? 'border-[#137333] text-[#137333]'
                : 'border-transparent text-[#505070] hover:text-[#1f1f1f]'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Insert Project</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1 bg-white">
          {tab === 'inquiries' && (
            <div className="space-y-3">
              {inquiries.map((inq) => (
                <div
                  key={inq._id || inq.email}
                  className="p-5 rounded-2xl bg-[#f8fafd] border border-[#dde3ea] flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="font-semibold text-[#1f1f1f]">
                        {inq.name}
                      </span>
                      {inq.company && (
                        <span className="text-[#505070]">· {inq.company}</span>
                      )}
                      <span className="px-2.5 py-0.5 rounded-full bg-[#e8f0fe] text-[#174ea6] text-[11px] font-medium">
                        {inq.serviceNeeded}
                      </span>
                      <span className="text-[#5f6368] text-[11px]">
                        {inq.budgetRange}
                      </span>
                    </div>
                    <p className="text-sm text-[#505070]">{inq.message}</p>
                    <div className="text-xs text-[#5f6368]">
                      {inq.email} {inq.phone ? `· ${inq.phone}` : ''}{' '}
                      {inq.location ? `· ${inq.location}` : ''}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {(
                      ['new', 'reviewing', 'scheduled', 'archived'] as const
                    ).map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => handleStatusChange(inq._id, st)}
                        className={`px-3 py-1 rounded-full text-[11px] font-medium capitalize border cursor-pointer ${
                          inq.status === st
                            ? 'bg-black text-white border-black'
                            : 'bg-white border-[#dde3ea] text-[#505070] hover:border-[#1f1f1f]'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 'projects' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((p) => (
                <div
                  key={p.slug}
                  className="p-5 rounded-2xl bg-[#f8fafd] border border-[#dde3ea] space-y-2"
                >
                  <div className="flex items-center justify-between text-xs text-[#1a73e8] font-medium">
                    <span>{p.indexCode}</span>
                    <span>
                      {p.location} · {p.year}
                    </span>
                  </div>
                  <div className="text-lg font-semibold text-[#1f1f1f]">
                    {p.client}
                  </div>
                  <div className="text-xs font-medium text-[#681da8]">
                    {p.category}
                  </div>
                  <p className="text-xs text-[#505070]">{p.tagline}</p>
                </div>
              ))}
            </div>
          )}

          {tab === 'add-project' && (
            <form onSubmit={handleCreateProject} className="max-w-xl space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#505070] mb-1">
                  Client / Project Name *
                </label>
                <input
                  type="text"
                  required
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  placeholder="e.g. Malabar Logistics Cloud"
                  className="w-full rounded-xl bg-[#f8fafd] border border-[#dde3ea] px-4 py-2.5 text-sm text-[#1f1f1f]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#505070] mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full rounded-xl bg-[#f8fafd] border border-[#dde3ea] px-4 py-2.5 text-sm text-[#1f1f1f]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#505070] mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-xl bg-[#f8fafd] border border-[#dde3ea] px-4 py-2.5 text-sm text-[#1f1f1f]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#505070] mb-1">
                  Tagline *
                </label>
                <input
                  type="text"
                  required
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="One-line summary"
                  className="w-full rounded-xl bg-[#f8fafd] border border-[#dde3ea] px-4 py-2.5 text-sm text-[#1f1f1f]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#505070] mb-1">
                  Case Study Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="How Infinio engineered this solution..."
                  className="w-full rounded-xl bg-[#f8fafd] border border-[#dde3ea] p-3 text-sm text-[#1f1f1f]"
                />
              </div>
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-black text-white text-xs font-semibold cursor-pointer hover:bg-[#1f1f1f]"
              >
                <CheckCircle className="w-4 h-4" />
                <span>{saving ? 'Saving...' : 'Insert into MongoDB'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
