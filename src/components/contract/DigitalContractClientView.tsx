'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, CheckCircle2, Lock, Printer, ArrowRight, 
  FileCheck, Calendar, User, Building2, Check, AlertCircle 
} from 'lucide-react';

export default function DigitalContractClientView({ contract: initialContract }: { contract: any }) {
  const [contract, setContract] = useState(initialContract);
  const [fullName, setFullName] = useState('');
  const [designation, setDesignation] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [signing, setSigning] = useState(false);
  const [error, setError] = useState('');

  let deliverables: string[] = [];
  try {
    deliverables = JSON.parse(contract.deliverables || '[]');
  } catch {}

  const handleSign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !agreed) {
      setError('Please enter your full name and confirm agreement');
      return;
    }

    setSigning(true);
    setError('');

    try {
      const res = await fetch(`/api/contract/${contract.id}/sign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          signatureName: `${fullName.trim()} (${designation.trim() || 'Client Principal'})`,
        }),
      });

      if (res.ok) {
        const updated = await res.json();
        setContract(updated);
      } else {
        setError('Failed to sign agreement. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setSigning(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFF] py-8 sm:py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Top Floating Controls */}
        <div className="flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="bg-[#1853CF] px-3.5 py-1.5 rounded-xl shadow-xs">
              <img src="/nav-logo.png" alt="B Growth Agency" className="h-6 w-auto object-contain" />
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-blue-100 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-xs"
            >
              <Printer className="w-4 h-4" />
              <span>Print Agreement</span>
            </button>
            {contract.status === 'SIGNED' ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase">
                <CheckCircle2 className="w-4 h-4" /> Digitally Executed
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-100 text-[#1853CF] text-xs font-black uppercase">
                <FileCheck className="w-4 h-4" /> Ready for Signature
              </span>
            )}
          </div>
        </div>

        {/* Contract Paper View */}
        <div className="bg-white rounded-3xl border border-blue-100/90 shadow-xl p-8 sm:p-14 space-y-10 text-[#0B1420]">
          
          {/* Executive Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-slate-100">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1853CF] mb-1">
                MASTER SERVICES AGREEMENT
              </div>
              <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
                {contract.title}
              </h1>
              <p className="text-xs font-mono font-bold text-slate-400 mt-1">
                Agreement #{contract.contractNumber}
              </p>
            </div>
            
            <div className="text-right sm:self-start">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Date Created</span>
              <span className="text-sm font-bold text-[#0B1420]">
                {new Date(contract.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>
          </div>

          {/* Contracting Parties */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 p-6 rounded-2xl bg-blue-50/50 border border-blue-100 text-xs">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#1853CF] block mb-2">
                Service Provider (Agency)
              </span>
              <div className="font-black text-sm text-[#0B1420]">B Growth Agency</div>
              <div className="text-slate-600 mt-0.5">Represented by Adharsh Katari (Founder)</div>
              <div className="text-slate-500 mt-0.5">HITEC City, Hyderabad, TG, India — 500081</div>
              <div className="text-[#1853CF] font-bold mt-1">contact@bgrowthagency.com</div>
            </div>

            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#1853CF] block mb-2">
                Client Organization
              </span>
              <div className="font-black text-sm text-[#0B1420]">{contract.clientCompany}</div>
              <div className="text-slate-600 mt-0.5">Authorized Signatory: {contract.clientName}</div>
              <div className="text-[#1853CF] font-bold mt-1">{contract.clientEmail}</div>
            </div>
          </div>

          {/* Scope & Objectives */}
          <div className="space-y-3">
            <h2 className="text-xs font-black uppercase tracking-widest text-[#1853CF]">
              1. Project Scope & Purpose
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed font-normal whitespace-pre-line">
              {contract.serviceScope}
            </p>
          </div>

          {/* Deliverables */}
          {deliverables.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-xs font-black uppercase tracking-widest text-[#1853CF]">
                2. Key Agreed Deliverables
              </h2>
              <div className="space-y-2">
                {deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <Check className="w-4 h-4 text-[#1853CF] flex-shrink-0 mt-0.5" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Financial Terms */}
          <div className="space-y-3">
            <h2 className="text-xs font-black uppercase tracking-widest text-[#1853CF]">
              3. Investment Value & Payment Terms
            </h2>
            <div className="p-5 rounded-2xl bg-[#F8FAFF] border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Fixed Investment</span>
                <div className="text-3xl font-black text-[#1853CF] tracking-tight">
                  ₹{contract.totalValue?.toLocaleString()}
                </div>
              </div>
              <div className="max-w-xs text-xs text-slate-600 font-semibold">
                {contract.paymentSchedule}
              </div>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="space-y-3">
            <h2 className="text-xs font-black uppercase tracking-widest text-[#1853CF]">
              4. Standard Governance & Warranty
            </h2>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 space-y-2 leading-relaxed whitespace-pre-line">
              {contract.terms}
            </div>
          </div>

          {/* Signatures Section */}
          <div className="pt-8 border-t border-slate-100 space-y-6">
            <h2 className="text-xs font-black uppercase tracking-widest text-[#1853CF]">
              5. Execution & Digital Signatures
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              
              {/* Agency Signature */}
              <div className="p-6 rounded-2xl bg-blue-50/40 border border-blue-100 space-y-3">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#1853CF] block">
                  Executed for B Growth Agency
                </span>
                <div className="font-serif italic text-2xl text-[#1853CF]">Adharsh Katari</div>
                <div className="text-xs font-bold text-[#0B1420]">Adharsh Katari</div>
                <div className="text-[10px] text-slate-500 uppercase font-semibold">Founder & Principal Lead · B Growth Agency</div>
              </div>

              {/* Client Signature Box */}
              {contract.status === 'SIGNED' ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700">
                      Digitally Signed by Client
                    </span>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="font-serif italic text-2xl text-emerald-800">
                    {contract.signatureName}
                  </div>
                  <div className="text-xs font-bold text-[#0B1420]">{contract.clientName}</div>
                  <div className="text-[10px] text-slate-500">
                    Timestamp: {contract.signedAt ? new Date(contract.signedAt).toLocaleString() : ''}
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSign} className="p-6 rounded-2xl bg-[#F8FAFF] border-2 border-dashed border-[#1853CF]/40 space-y-4">
                  <div>
                    <span className="text-xs font-black uppercase text-[#0B1420] block mb-1">
                      Digital Signature Verification
                    </span>
                    <p className="text-[11px] text-slate-500">
                      Type your legal name below to execute this agreement.
                    </p>
                  </div>

                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Your Full Legal Name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-blue-100 bg-white text-xs font-bold text-[#0B1420] focus:outline-none focus:border-[#1853CF]"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Designation (e.g. Founder, CEO)"
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-blue-100 bg-white text-xs font-semibold text-[#0B1420] focus:outline-none focus:border-[#1853CF]"
                    />
                  </div>

                  <label className="flex items-start gap-2 cursor-pointer text-[11px] text-slate-600">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="mt-0.5 accent-[#1853CF]"
                    />
                    <span>I confirm I am authorized to bind {contract.clientCompany} and agree to these terms.</span>
                  </label>

                  {error && <div className="text-[11px] font-bold text-rose-600">{error}</div>}

                  <button
                    type="submit"
                    disabled={signing || !agreed || !fullName.trim()}
                    className="w-full py-3 bg-[#1853CF] hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md"
                  >
                    {signing ? 'Signing Agreement...' : 'Sign & Execute Agreement →'}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

