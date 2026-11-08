'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, Plus, Search, ExternalLink, Copy, Check, 
  Trash2, Edit3, Clock, AlertCircle, Sparkles, User, Calendar
} from 'lucide-react';

interface Portal {
  id: string;
  token: string;
  clientName: string;
  clientEmail: string;
  company: string;
  projectName: string;
  serviceType: string;
  progressPercent: number;
  status: string;
  timeline: string;
  targetDate: string;
  milestones: string;
  expiresAt?: string;
  createdAt: string;
}

export default function AdminPortalsPage() {
  const [portals, setPortals] = useState<Portal[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  // New Portal Form State
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [company, setCompany] = useState('');
  const [projectName, setProjectName] = useState('');
  const [token, setToken] = useState('');
  const [serviceType, setServiceType] = useState('Custom Website Development');
  const [timeline, setTimeline] = useState('14-Day Sprint');
  const [targetDate, setTargetDate] = useState('Nov 30, 2026');
  const [progressPercent, setProgressPercent] = useState(25);
  const [expiryDays, setExpiryDays] = useState(60);

  const fetchPortals = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/portals');
      if (res.ok) {
        const data = await res.json();
        setPortals(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortals();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !clientName || !projectName) return;

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + Number(expiryDays));

    const defaultMilestones = JSON.stringify([
      { title: 'Project Kickoff & Architecture Discovery', status: 'COMPLETED', date: 'Day 1' },
      { title: 'Figma UI/UX & High-Fidelity Prototypes', status: 'IN_PROGRESS', date: 'Day 4' },
      { title: 'Next.js 14 Frontend & Responsive Engine', status: 'PENDING', date: 'Day 9' },
      { title: 'Backend APIs, SEO & Lighthouse 98+ Audit', status: 'PENDING', date: 'Day 12' },
      { title: 'Final Production Deployment & Signoff', status: 'PENDING', date: 'Day 14' },
    ]);

    try {
      const res = await fetch('/api/admin/portals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: token.toLowerCase().trim().replace(/[^a-z0-9_-]/g, ''),
          clientName,
          clientEmail,
          company,
          projectName,
          serviceType,
          timeline,
          targetDate,
          progressPercent: Number(progressPercent),
          expiresAt: expiresAt.toISOString(),
          milestones: defaultMilestones,
        }),
      });

      if (res.ok) {
        setModalOpen(false);
        // Reset form
        setClientName('');
        setClientEmail('');
        setCompany('');
        setProjectName('');
        setToken('');
        fetchPortals();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this client tracking portal?')) return;
    try {
      const res = await fetch(`/api/admin/portals/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setPortals((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateProgress = async (id: string, newProgress: number) => {
    try {
      const res = await fetch(`/api/admin/portals/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ progressPercent: newProgress }),
      });
      if (res.ok) {
        setPortals((prev) =>
          prev.map((p) => (p.id === id ? { ...p, progressPercent: newProgress } : p))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const copyLink = (t: string) => {
    const url = `${window.location.origin}/portal/${t}`;
    navigator.clipboard.writeText(url);
    setCopiedToken(t);
    setTimeout(() => setCopiedToken(null), 2500);
  };

  const filtered = portals.filter(
    (p) =>
      p.clientName?.toLowerCase().includes(search.toLowerCase()) ||
      p.company?.toLowerCase().includes(search.toLowerCase()) ||
      p.token?.toLowerCase().includes(search.toLowerCase()) ||
      p.projectName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#1853CF] mb-1">
            <ShieldCheck className="w-4 h-4" /> Client Tracking Portals
          </div>
          <h1 className="text-3xl font-black uppercase text-[#0B1420] tracking-tight">
            Client Workspaces.
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Create temporary, unique tracking portals for clients to monitor milestones, deliverables, and invoices.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-3 bg-[#1853CF] hover:bg-blue-700 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span>New Client Portal</span>
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-blue-100/80 shadow-xs flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400 ml-2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by client, company, token, or project..."
          className="w-full text-xs sm:text-sm font-semibold text-[#0B1420] bg-transparent focus:outline-none"
        />
      </div>

      {/* Portals Table / Cards */}
      {loading ? (
        <div className="text-center py-20 text-slate-400 font-bold text-sm">
          Loading client portals...
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-3xl border border-blue-100 p-12 text-center space-y-4">
          <ShieldCheck className="w-12 h-12 text-[#1853CF] mx-auto opacity-40" />
          <h3 className="text-lg font-black uppercase text-[#0B1420]">No Client Portals Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Create a unique workspace for your clients with temporary access, custom milestones, and live deliverables.
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1853CF] text-white text-xs font-black uppercase rounded-xl"
          >
            Create First Portal
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((portal) => (
            <div
              key={portal.id}
              className="bg-white border border-blue-100/90 rounded-3xl p-6 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-md bg-blue-50 text-[#1853CF] text-[10px] font-black uppercase tracking-wider">
                    {portal.serviceType}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => copyLink(portal.token)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-[#1853CF] hover:bg-blue-50 transition-colors"
                      title="Copy Shareable Link"
                    >
                      {copiedToken === portal.token ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                    <Link
                      href={`/portal/${portal.token}`}
                      target="_blank"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-[#1853CF] hover:bg-blue-50 transition-colors"
                      title="Open Portal"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(portal.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Delete Portal"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h3 className="text-lg font-black uppercase text-[#0B1420] tracking-tight mb-1">
                  {portal.projectName}
                </h3>
                <div className="text-xs text-slate-600 font-semibold mb-4">
                  {portal.clientName} · <span className="text-[#1853CF]">{portal.company}</span>
                </div>

                {/* Progress Bar & Slider */}
                <div className="space-y-2 mb-5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-slate-600">Sprint Progress</span>
                    <span className="text-[#1853CF] font-black">{portal.progressPercent}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#1853CF] rounded-full transition-all duration-300"
                      style={{ width: `${portal.progressPercent}%` }}
                    />
                  </div>
                  <div className="pt-1 flex items-center justify-between text-[10px] text-slate-400">
                    <span>Adjust Progress:</span>
                    <div className="flex gap-1">
                      {[25, 50, 75, 100].map((val) => (
                        <button
                          key={val}
                          onClick={() => handleUpdateProgress(portal.id, val)}
                          className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                            portal.progressPercent === val
                              ? 'bg-[#1853CF] text-white'
                              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {val}%
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-500 mb-5">
                  <div className="flex items-center justify-between">
                    <span>Timeline:</span>
                    <span className="font-bold text-[#0B1420]">{portal.timeline}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Target Delivery:</span>
                    <span className="font-bold text-[#0B1420]">{portal.targetDate}</span>
                  </div>
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span>Token:</span>
                    <span className="font-bold text-[#1853CF] bg-blue-50 px-2 py-0.5 rounded">
                      {portal.token}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] font-semibold text-slate-400">
                  {portal.expiresAt ? `Expires in ${Math.max(1, Math.round((new Date(portal.expiresAt).getTime() - Date.now()) / (1000 * 3600 * 24)))} days` : 'Permanent Access'}
                </span>
                <Link
                  href={`/portal/${portal.token}`}
                  target="_blank"
                  className="inline-flex items-center gap-1 text-xs font-black text-[#1853CF] hover:underline"
                >
                  View Workspace <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Portal Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl border border-blue-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black uppercase text-[#0B1420]">Create Client Tracking Portal</h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Client Name *
                </label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-4 py-2.5 rounded-xl border border-blue-100 bg-[#F8FAFF] text-xs font-semibold focus:outline-none focus:border-[#1853CF]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Client Email
                  </label>
                  <input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="client@company.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-blue-100 bg-[#F8FAFF] text-xs font-semibold focus:outline-none focus:border-[#1853CF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Company / Brand *
                  </label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Apex Wealth"
                    className="w-full px-4 py-2.5 rounded-xl border border-blue-100 bg-[#F8FAFF] text-xs font-semibold focus:outline-none focus:border-[#1853CF]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="e.g. Apex Wealth — Enterprise Next.js Platform"
                  className="w-full px-4 py-2.5 rounded-xl border border-blue-100 bg-[#F8FAFF] text-xs font-semibold focus:outline-none focus:border-[#1853CF]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Unique Secret Token / URL Slug *
                </label>
                <input
                  type="text"
                  required
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="e.g. apex-wealth-2026"
                  className="w-full px-4 py-2.5 rounded-xl border border-blue-100 bg-[#F8FAFF] text-xs font-mono font-bold focus:outline-none focus:border-[#1853CF]"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Client URL: /portal/{token || 'token'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Service Discipline
                  </label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-blue-100 bg-[#F8FAFF] text-xs font-semibold focus:outline-none focus:border-[#1853CF]"
                  >
                    <option>Custom Website Development</option>
                    <option>Poster & Graphic Design</option>
                    <option>Cinematic Video Editing</option>
                    <option>Advertising & Film Production</option>
                    <option>Full Growth Pod Retainer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Temporary Expiration
                  </label>
                  <select
                    value={expiryDays}
                    onChange={(e) => setExpiryDays(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl border border-blue-100 bg-[#F8FAFF] text-xs font-semibold focus:outline-none focus:border-[#1853CF]"
                  >
                    <option value={15}>15 Days</option>
                    <option value={30}>30 Days</option>
                    <option value={60}>60 Days</option>
                    <option value={90}>90 Days</option>
                    <option value={365}>1 Year</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#1853CF] hover:bg-blue-700 text-white text-xs font-black uppercase tracking-wider transition-all shadow-md"
                >
                  Create & Launch Portal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

