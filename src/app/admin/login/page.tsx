'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import BrandLogo from '@/components/BrandLogo';
import { Lock, Mail, ArrowRight, ShieldCheck, KeyRound, ArrowLeft } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@infinio.co.in');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Invalid credentials');
        setLoading(false);
        return;
      }
      router.push('/admin');
      router.refresh();
    } catch {
      setError('Network error while signing in.');
      setLoading(false);
    }
  };

  const fillDefaultCredentials = () => {
    setEmail('admin@infinio.co.in');
    setPassword('Infinio@2026');
    setError('');
  };

  return (
    <div className="flex min-h-screen flex-col justify-between bg-[#f8fafc] text-[#0f172a]">
      {/* Top Bar */}
      <header className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-6 py-5">
        <div className="flex items-center gap-3">
          <BrandLogo size="md" href="/" />
          <span className="rounded-full bg-[#e0f2fe] px-2.5 py-0.5 text-[11px] font-bold text-[#0284c7]">
            Backend Portal
          </span>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-[#cbd5e1] bg-white px-4 py-2 text-[13px] font-semibold text-[#0f172a] hover:bg-[#f1f5f9]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Website
        </Link>
      </header>

      {/* Center Login Card */}
      <main className="mx-auto flex w-full max-w-[460px] flex-1 flex-col justify-center px-5 py-10">
        <div className="rounded-[28px] border border-[#e2e8f0] bg-white p-8 shadow-xs sm:p-10">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f0f9ff] text-[#2563eb]">
            <ShieldCheck className="h-6 w-6" />
          </div>

          <h1 className="text-[26px] font-bold tracking-tight text-[#0f172a]">
            Admin Portal Sign In
          </h1>
          <p className="mt-2 text-[14px] leading-relaxed text-[#475569]">
            Authenticate to manage Infinio’s project enquiries, publish blog articles, and update case studies.
          </p>

          {error && (
            <div
              role="alert"
              className="mt-5 rounded-2xl border border-[#fecaca] bg-[#fef2f2] px-4 py-3 text-[13px] font-medium text-[#b91c1c]"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="admin-email"
                className="mb-1.5 block text-[12px] font-semibold text-[#334155]"
              >
                Admin Email
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute top-3.5 left-4 h-4 w-4 text-[#64748b]" />
                <input
                  id="admin-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@infinio.co.in"
                  className="w-full rounded-xl border border-[#cbd5e1] bg-[#f8fafc] py-3 pr-4 pl-11 text-[14px] text-[#0f172a] outline-none transition-colors focus:border-[#2563eb] focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="mb-1.5 block text-[12px] font-semibold text-[#334155]"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute top-3.5 left-4 h-4 w-4 text-[#64748b]" />
                <input
                  id="admin-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full rounded-xl border border-[#cbd5e1] bg-[#f8fafc] py-3 pr-4 pl-11 text-[14px] text-[#0f172a] outline-none transition-colors focus:border-[#2563eb] focus:bg-white"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-[#0f172a] py-3.5 text-[14px] font-semibold text-white transition-all hover:bg-[#1e293b] disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In to Backend Portal'}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* Quick-fill Credentials Box */}
          <div className="mt-7 rounded-2xl border border-[#bae6fd] bg-[#f0f9ff] p-4">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#0284c7]">
                <KeyRound className="h-3.5 w-3.5" />
                Portal Credentials
              </span>
              <button
                type="button"
                onClick={fillDefaultCredentials}
                className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-[#2563eb] shadow-2xs hover:bg-[#e0f2fe]"
              >
                Auto-fill Credentials
              </button>
            </div>
            <div className="mt-2 space-y-1 font-mono text-[12px] text-[#334155]">
              <p>
                Email: <strong className="text-[#0f172a]">admin@infinio.co.in</strong>
              </p>
              <p>
                Password: <strong className="text-[#0f172a]">Infinio@2026</strong>
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-6 text-center text-[12px] text-[#475569]">
        Infinio Technology Solutions • Protected CMS & Enquiry Portal
      </footer>
    </div>
  );
}
