'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FileCheck, Plus, Search, ExternalLink, Copy, Check, 
  Trash2, FileText, CheckCircle2, Clock, ShieldCheck
} from 'lucide-react';

interface Contract {
  id: string;
  contractNumber: string;
  title: string;
  clientName: string;
  clientEmail: string;
  clientCompany: string;
  serviceScope: string;
  totalValue: number;
  paymentSchedule: string;
  deliverables: string;
  terms: string;
  status: string;
  signedAt?: string;
  signatureName?: string;
  createdAt: string;
}

export default function AdminContractsPage() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // New Contract Form
  const [contractNumber, setContractNumber] = useState(`AGR-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`);
  const [title, setTitle] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientCompany, setClientCompany] = useState('');
  const [serviceScope, setServiceScope] = useState('Full-Stack Next.js 14 Web Development & Brand Architecture');
  const [totalValue, setTotalValue] = useState(49999);
  const [paymentSchedule, setPaymentSchedule] = useState('50% upfront deposit upon signing, 50% upon final staging signoff');
  const [terms, setTerms] = useState(
    '1. IP & Code Ownership: Client owns 100% of custom code, assets, and design upon final settlement.\n2. Revisions: Includes up to 2 rounds of refinement per milestone.\n3. Warranty: 60-day post-launch technical defect warranty included.'
  );

  const fetchContracts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/contracts');
      if (res.ok) {
        const data = await res.json();
        setContracts(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContracts();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !clientName || !clientCompany) return;

    const defaultDeliverables = JSON.stringify([
      'Production-Ready Next.js 14 Web Application',
      'Figma Design System & Style Guide',
      'SEO Metadata & Google Analytics 4 Setup',
      'Lighthouse 98+ Performance Optimization',
      'Client Admin Portal & CMS Access',
    ]);

    try {
      const res = await fetch('/api/admin/contracts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contractNumber,
          title,
          clientName,
          clientEmail,
          clientCompany,
          serviceScope,
          totalValue: Number(totalValue),
          paymentSchedule,
          deliverables: defaultDeliverables,
          terms,
          status: 'SENT',
        }),
      });

      if (res.ok) {
        setModalOpen(false);
        setContractNumber(`AGR-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`);
        setTitle('');
        setClientName('');
        setClientEmail('');
        setClientCompany('');
        fetchContracts();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this contract?')) return;
    try {
      const res = await fetch(`/api/admin/contracts/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setContracts((prev) => prev.filter((c) => c.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const copyLink = (id: string) => {
    const url = `${window.location.origin}/contract/${id}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const filtered = contracts.filter(
    (c) =>
      c.title?.toLowerCase().includes(search.toLowerCase()) ||
      c.clientName?.toLowerCase().includes(search.toLowerCase()) ||
      c.clientCompany?.toLowerCase().includes(search.toLowerCase()) ||
      c.contractNumber?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#1853CF] mb-1">
            <FileCheck className="w-4 h-4" /> Legal & Contracts Suite
          </div>
          <h1 className="text-3xl font-black uppercase text-[#0B1420] tracking-tight">
            Agreements & Quotes.
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Generate legally binding digital agreements with e-signatures, scope deliverables, and payment terms.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-3 bg-[#1853CF] hover:bg-blue-700 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span>New Agreement</span>
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-blue-100/80 shadow-xs flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400 ml-2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by agreement #, client, company, or title..."
          className="w-full text-xs sm:text-sm font-semibold text-[#0B1420] bg-transparent focus:outline-none"
        />
      </div>

      {/* Contracts List */}
      {loading ? (
        <div className="text-center py-20 text-slate-400 font-bold text-sm">
          Loading client agreements...
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-3xl border border-blue-100 p-12 text-center space-y-4">
          <FileCheck className="w-12 h-12 text-[#1853CF] mx-auto opacity-40" />
          <h3 className="text-lg font-black uppercase text-[#0B1420]">No Agreements Created Yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Draft digital project agreements with e-signatures and share directly with prospective clients.
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1853CF] text-white text-xs font-black uppercase rounded-xl"
          >
            Create First Agreement
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((contract) => (
            <div
              key={contract.id}
              className="bg-white border border-blue-100/90 rounded-3xl p-6 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      contract.status === 'SIGNED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-blue-100 text-[#1853CF]'
                    }`}
                  >
                    {contract.status === 'SIGNED' ? '✓ Digitally Signed' : 'Pending Signature'}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => copyLink(contract.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-[#1853CF] hover:bg-blue-50 transition-colors"
                      title="Copy Signing Link"
                    >
                      {copiedId === contract.id ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                    <Link
                      href={`/contract/${contract.id}`}
                      target="_blank"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-[#1853CF] hover:bg-blue-50 transition-colors"
                      title="View Agreement"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(contract.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Delete Agreement"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="font-mono text-[11px] font-bold text-[#1853CF] mb-1">
                  {contract.contractNumber}
                </div>
                <h3 className="text-lg font-black uppercase text-[#0B1420] tracking-tight mb-2">
                  {contract.title}
                </h3>
                <div className="text-xs text-slate-600 font-semibold mb-4">
                  {contract.clientName} · <span className="text-[#1853CF]">{contract.clientCompany}</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 mb-5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Total Investment Value</div>
                  <div className="text-2xl font-black text-[#1853CF]">
                    ₹{contract.totalValue?.toLocaleString()}
                  </div>
                </div>

                {contract.status === 'SIGNED' && (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 space-y-1 mb-4">
                    <div className="font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Signed by {contract.signatureName}
                    </div>
                    <div className="text-[10px] text-emerald-600">
                      {contract.signedAt ? new Date(contract.signedAt).toLocaleString() : ''}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] font-semibold text-slate-400">
                  Created {new Date(contract.createdAt).toLocaleDateString()}
                </span>
                <Link
                  href={`/contract/${contract.id}`}
                  target="_blank"
                  className="inline-flex items-center gap-1 text-xs font-black text-[#1853CF] hover:underline"
                >
                  Open Document <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Contract Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-8 shadow-2xl border border-blue-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black uppercase text-[#0B1420]">Create Project Agreement</h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Agreement #</label>
                  <input
                    type="text"
                    required
                    value={contractNumber}
                    onChange={(e) => setContractNumber(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl border border-blue-100 bg-[#F8FAFF] text-xs font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Company / Brand *</label>
                  <input
                    type="text"
                    required
                    value={clientCompany}
                    onChange={(e) => setClientCompany(e.target.value)}
                    placeholder="e.g. Apex Wealth"
                    className="w-full px-4 py-2 rounded-xl border border-blue-100 bg-[#F8FAFF] text-xs font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Project Agreement Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Master Services Agreement — Web Architecture"
                  className="w-full px-4 py-2 rounded-xl border border-blue-100 bg-[#F8FAFF] text-xs font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Signee Name *</label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-4 py-2 rounded-xl border border-blue-100 bg-[#F8FAFF] text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Signee Email *</label>
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="rahul@apexwealth.com"
                    className="w-full px-4 py-2 rounded-xl border border-blue-100 bg-[#F8FAFF] text-xs font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Total Project Value (₹) *</label>
                  <input
                    type="number"
                    required
                    value={totalValue}
                    onChange={(e) => setTotalValue(Number(e.target.value))}
                    className="w-full px-4 py-2 rounded-xl border border-blue-100 bg-[#F8FAFF] text-xs font-black text-[#1853CF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Payment Schedule</label>
                  <input
                    type="text"
                    value={paymentSchedule}
                    onChange={(e) => setPaymentSchedule(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl border border-blue-100 bg-[#F8FAFF] text-xs font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Core Scope & Objectives</label>
                <textarea
                  rows={2}
                  value={serviceScope}
                  onChange={(e) => setServiceScope(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-blue-100 bg-[#F8FAFF] text-xs font-semibold"
                />
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
                  Create & Send Agreement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

