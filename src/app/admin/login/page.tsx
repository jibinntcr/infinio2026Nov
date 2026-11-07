'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Sparkles, Lock, Mail, ArrowRight, ShieldCheck, KeyRound, ArrowLeft } from 'lucide-react';

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
    } catch (err: any) {
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
    <div className="flex min-h-screen flex-col justify-between bg-[#f8fafd] text-[#1f1f1f]">
      {/* Top Bar */}
      <header className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-6 py-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1f1f1f] text-white">
            <Sparkles className="h-4 w-4 text-[#8ab4f8]" />
          </div>
          <div>
            <span className="text-[18px] font-bold tracking-tight text-[#1f1f1f]">
              Infinio
            </span>
            <span className="ml-2 rounded-full bg-[#e8f0fe] px-2.5 py-0.5 text-[11px] font-semibold text-[#1a73e8]">
              Backend Portal
            </span>
          </div>
        </Link>

        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-[#dadce0] bg-white px-4 py-2 text-[13px] font-semibold text-[#1f1f1f] hover:bg-[#f1f3f4]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Website
        </Link>
      </header>

      {/* Center Login Card */}
      <main className="mx-auto flex w-full max-w-[460px] flex-1 flex-col justify-center px-5 py-10">
        <div className="rounded-[32px] border border-[#e3e8ef] bg-white p-8 shadow-sm sm:p-10">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e8f0fe] text-[#1a73e8]">
            <ShieldCheck className="h-6 w-6" />
          </div>

          <h1 className="text-[28px] font-bold tracking-tight text-[#1f1f1f]">
            Admin Portal Sign In
          </h1>
          <p className="mt-2 text-[14px] leading-relaxed text-[#5f6368]">
            Authenticate to manage Infinio’s MongoDB inquiries, publish SEO blog articles, and update portfolio case studies.
          </p>

          {error && (
            <div className="mt-5 rounded-2xl border border-[#f2b8b5] bg-[#fce8e6] px-4 py-3 text-[13px] font-medium text-[#b3261e]">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-[12px] font-semibold text-[#444746]">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute top-3.5 left-4 h-4 w-4 text-[#5f6368]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@infinio.co.in"
                  className="w-full rounded-xl border border-[#dadce0] bg-[#f8fafd] py-3 pr-4 pl-11 text-[14px] text-[#1f1f1f] outline-none transition-colors focus:border-[#1a73e8] focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-[12px] font-semibold text-[#444746]">
                Password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute top-3.5 left-4 h-4 w-4 text-[#5f6368]" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full rounded-xl border border-[#dadce0] bg-[#f8fafd] py-3 pr-4 pl-11 text-[14px] text-[#1f1f1f] outline-none transition-colors focus:border-[#1a73e8] focus:bg-white"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-[#1f1f1f] py-3.5 text-[14px] font-semibold text-white transition-all hover:bg-[#303134] disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In to Backend Portal'}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* Quick-fill Credentials Box */}
          <div className="mt-7 rounded-2xl border border-[#d3e3fd] bg-[#f0f4f9] p-4">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#1a73e8]">
                <KeyRound className="h-3.5 w-3.5" />
                Portal Credentials
              </span>
              <button
                type="button"
                onClick={fillDefaultCredentials}
                className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-[#1a73e8] shadow-xs hover:bg-[#e8f0fe]"
              >
                Auto-fill Credentials
              </button>
            </div>
            <div className="mt-2 space-y-1 font-mono text-[12px] text-[#444746]">
              <p>Email: <strong className="text-[#1f1f1f]">admin@infinio.co.in</strong></p>
              <p>Password: <strong className="text-[#1f1f1f]">Infinio@2026</strong></p>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-6 text-center text-[12px] text-[#5f6368]">
        Infinio Technology Solutions • Protected Enterprise CMS & MongoDB Portal
      </footer>
    </div>
  );
}
