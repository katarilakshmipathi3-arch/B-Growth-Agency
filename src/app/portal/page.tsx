'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, ArrowRight, Lock, KeyRound } from 'lucide-react';

export default function PortalLookupPage() {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!token.trim()) {
      setError('Please enter your project access token or code');
      return;
    }
    const clean = token.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '');
    router.push(`/portal/${clean}`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFF] flex flex-col justify-between">
      
      {/* Header */}
      <header className="bg-[#1853CF] text-white py-4 px-6 sm:px-10 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/">
            <img src="/nav-logo.png" alt="B Growth Agency" className="h-8 w-auto object-contain" />
          </Link>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-100 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-300" /> Client Access Gate
          </span>
        </div>
      </header>

      {/* Main card */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-3xl border border-blue-100 shadow-xl p-8 sm:p-10 text-center">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#1853CF] flex items-center justify-center mx-auto mb-6 shadow-xs">
            <KeyRound className="w-8 h-8" />
          </div>

          <h1 className="text-2xl font-black uppercase text-[#0B1420] mb-2">
            Client Tracking Portal
          </h1>
          <p className="text-xs text-slate-500 leading-relaxed mb-8">
            Enter the unique secret access token provided by B Growth Agency to view your real-time sprint roadmap and deliverables.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                value={token}
                onChange={(e) => { setToken(e.target.value); setError(''); }}
                placeholder="e.g. apex-wealth or your token"
                className="w-full px-4 py-3.5 rounded-xl border border-blue-100 bg-[#F8FAFF] text-center font-mono font-bold text-sm text-[#0B1420] focus:outline-none focus:border-[#1853CF]"
              />
              {error && <p className="text-xs text-rose-500 mt-1.5 text-center font-medium">{error}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#1853CF] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
            >
              <span>Access Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-xs text-slate-400">
            <p>Demo Token: <strong className="text-[#1853CF] cursor-pointer hover:underline" onClick={() => setToken('apex-wealth')}>apex-wealth</strong></p>
            <p className="mt-2 text-[11px]">Need access? Contact your project manager at <a href="mailto:hello@bgrowth.agency" className="text-[#1853CF] hover:underline">hello@bgrowth.agency</a></p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-slate-400">
        © 2024 B Growth Agency. All client workspaces are encrypted and confidential.
      </footer>

    </div>
  );
}

