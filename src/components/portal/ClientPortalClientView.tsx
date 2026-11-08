'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  FileText, 
  MessageSquare, 
  Send, 
  ShieldCheck, 
  Sparkles, 
  User, 
  Phone, 
  Mail, 
  MessageCircle, 
  AlertCircle,
  FileCheck,
  ChevronRight,
  Download,
  Calendar,
  Layers,
  Check
} from 'lucide-react';

interface Props {
  portal: any;
  contract: any;
}

export default function ClientPortalClientView({ portal, contract }: Props) {
  const [messages, setMessages] = useState(portal.messages || []);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);

  let milestones: any[] = [];
  try {
    milestones = JSON.parse(portal.milestones || '[]');
  } catch {}

  let deliverables: any[] = [];
  try {
    deliverables = JSON.parse(portal.deliverables || '[]');
  } catch {}

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || sending) return;

    setSending(true);
    try {
      const res = await fetch(`/api/portal/${portal.token}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender: 'CLIENT',
          senderName: portal.clientName,
          message: newMessage.trim(),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessages((prev: any[]) => [...prev, data.message]);
        setNewMessage('');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return <span className="px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-500/15 text-emerald-600 border border-emerald-500/30 flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" /> Delivered & Live</span>;
      case 'development':
      case 'in progress':
        return <span className="px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-blue-500/15 text-[#1853CF] border border-blue-500/30 flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#1853CF] animate-ping" /> Active Sprint</span>;
      case 'design':
        return <span className="px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-purple-500/15 text-purple-600 border border-purple-500/30 flex items-center gap-1.5"><Layers className="w-3.5 h-3.5" /> Design & Prototype</span>;
      default:
        return <span className="px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-amber-500/15 text-amber-600 border border-amber-500/30 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {status}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFF]">
      
      {/* ── TOP SECURE CLIENT BAR ── */}
      <header className="bg-[#1853CF] text-white border-b border-blue-600/50 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center">
              <img src="/nav-logo.png" alt="B Growth Agency" className="h-7 sm:h-8 w-auto object-contain" />
            </Link>
            <div className="hidden sm:block h-5 w-px bg-white/20" />
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-blue-100 uppercase">
              <ShieldCheck className="w-4 h-4 text-emerald-300" /> Private Client Workspace
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-blue-100">
              {portal.company}
            </span>
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs font-black text-white">
              {portal.clientName[0]}
            </div>
          </div>
        </div>
      </header>

      {/* ── PROJECT HERO OVERVIEW ── */}
      <section className="bg-white border-b border-blue-100 py-10 sm:py-14 shadow-xs">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1853CF] bg-blue-50 px-3 py-1 rounded-md">
                  {portal.serviceType}
                </span>
                {getStatusBadge(portal.status)}
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-[#0B1420] tracking-tight">
                {portal.projectName}
              </h1>
              <p className="text-sm text-slate-500 font-medium mt-1">
                Client: <strong className="text-slate-800">{portal.clientName}</strong> · {portal.company} · Target Delivery: <strong className="text-slate-800">{portal.deliveryDate || 'TBD'}</strong>
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-3">
              {portal.stagingUrl && (
                <a
                  href={portal.stagingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1853CF] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md hover:bg-blue-700 transition-all"
                >
                  <span>Open Staging Build</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {portal.figmaUrl && (
                <a
                  href={portal.figmaUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-slate-50 transition-all shadow-xs"
                >
                  <span>Figma Workspace</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-[#F8FAFF] border border-blue-100 rounded-2xl p-6">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider mb-2.5">
              <span className="text-slate-700">Sprint Progress & Delivery Readiness</span>
              <span className="text-[#1853CF] text-base font-black">{portal.progress}% Complete</span>
            </div>
            <div className="w-full h-3.5 bg-blue-100/70 rounded-full overflow-hidden p-0.5">
              <div 
                className="h-full bg-gradient-to-r from-[#1853CF] to-blue-400 rounded-full transition-all duration-1000 shadow-xs" 
                style={{ width: `${portal.progress}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN WORKSPACE CONTENT ── */}
      <main className="max-w-7xl mx-auto px-6 sm:px-10 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column (8 cols): Milestones & Deliverables */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* 1. Milestone Roadmap */}
            <div className="bg-white rounded-2xl border border-blue-100 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-black uppercase text-[#0B1420]">
                    Project Roadmap & Milestones
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Live stage tracking updated directly by B Growth engineering leads
                  </p>
                </div>
                <span className="text-xs font-bold text-[#1853CF] bg-blue-50 px-3 py-1 rounded-full">
                  {milestones.filter(m => m.status === 'completed').length} / {milestones.length} Completed
                </span>
              </div>

              <div className="relative border-l-2 border-blue-100 ml-4 space-y-8 py-2">
                {milestones.map((step, idx) => {
                  const isDone = step.status === 'completed';
                  const isInProgress = step.status === 'in_progress';

                  return (
                    <div key={idx} className="relative pl-7">
                      {/* Node Icon */}
                      <div className={`absolute -left-[17px] top-0 w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                        isDone 
                          ? 'bg-emerald-500 border-white text-white shadow-sm' 
                          : isInProgress 
                          ? 'bg-[#1853CF] border-white text-white shadow-md animate-pulse' 
                          : 'bg-white border-slate-300 text-slate-400'
                      }`}>
                        {isDone ? <Check className="w-4 h-4 stroke-[3]" /> : <span className="text-xs font-black">{idx + 1}</span>}
                      </div>

                      <div className="bg-[#F8FAFF] border border-blue-100/80 rounded-xl p-5 hover:border-[#1853CF] transition-colors">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                          <h3 className="text-base font-black text-[#0B1420]">
                            {step.title}
                          </h3>
                          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-[#1853CF]" /> {step.date}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed font-normal">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. Deliverables & Assets */}
            <div className="bg-white rounded-2xl border border-blue-100 p-6 sm:p-8 shadow-xs">
              <h2 className="text-xl font-black uppercase text-[#0B1420] mb-1">
                Deliverables & Handover Assets
              </h2>
              <p className="text-xs text-slate-500 mb-6">
                Direct access to your production files, design tokens, and review links
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {deliverables.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-blue-100 bg-[#F8FAFF] flex items-center justify-between hover:border-[#1853CF] transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 text-[#1853CF] flex items-center justify-center font-bold">
                        <FileCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-black text-[#0B1420]">{item.name}</div>
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{item.type} · <span className="text-emerald-600">{item.status}</span></div>
                      </div>
                    </div>
                    {item.fileUrl && item.fileUrl !== '#' && (
                      <a href={item.fileUrl} target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white border border-slate-200 text-[#1853CF] hover:bg-blue-50 transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Real-Time Discussion Thread */}
            <div className="bg-white rounded-2xl border border-blue-100 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-black uppercase text-[#0B1420] flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-[#1853CF]" /> Project Communication Feed
                  </h2>
                  <p className="text-xs text-slate-500">
                    Direct channel with Adharsh Katari and the B Growth studio team
                  </p>
                </div>
              </div>

              {/* Message List */}
              <div className="space-y-4 max-h-80 overflow-y-auto mb-6 pr-2">
                {messages.length === 0 ? (
                  <div className="text-center py-8 text-xs text-slate-400">
                    No messages yet. Send a note to the agency below!
                  </div>
                ) : (
                  messages.map((m: any, idx: number) => {
                    const isAgency = m.sender === 'AGENCY';
                    return (
                      <div key={idx} className={`flex flex-col ${isAgency ? 'items-start' : 'items-end'}`}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                            {m.senderName}
                          </span>
                          <span className="text-[9px] text-slate-400">
                            {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <div className={`p-4 rounded-2xl max-w-lg text-xs leading-relaxed ${
                          isAgency 
                            ? 'bg-[#1853CF] text-white rounded-tl-xs shadow-sm' 
                            : 'bg-[#F0F5FF] text-slate-800 border border-blue-100 rounded-tr-xs'
                        }`}>
                          {m.message}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Send Box */}
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Ask a question or request sprint feedback..."
                  className="flex-1 px-4 py-3 text-xs rounded-xl border border-blue-100 bg-[#F8FAFF] focus:outline-none focus:border-[#1853CF] text-slate-800"
                />
                <button
                  type="submit"
                  disabled={sending || !newMessage.trim()}
                  className="px-5 py-3 bg-[#1853CF] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md hover:bg-blue-700 disabled:opacity-50 transition-all flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </form>
            </div>

          </div>

          {/* Right Column (4 cols): Studio Contact, Invoices & Contract */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* 1. Dedicated Agency Account Lead */}
            <div className="bg-white rounded-2xl border border-blue-100 p-6 shadow-xs">
              <div className="text-[10px] font-black uppercase tracking-widest text-[#1853CF] mb-3">
                Dedicated Agency Partner
              </div>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#1853CF] shadow-sm flex-shrink-0">
                  <img src="/founder.jpg" alt="Adharsh Katari" className="w-full h-full object-cover object-[50%_18%]" />
                </div>
                <div>
                  <h3 className="text-base font-black text-[#0B1420]">
                    {portal.agencyContactName || 'Adharsh Katari'}
                  </h3>
                  <p className="text-xs text-[#1853CF] font-bold">
                    {portal.agencyContactRole || 'Founder · Lead Architect'}
                  </p>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Available on Direct Line
                  </span>
                </div>
              </div>

              <div className="space-y-2.5">
                <a
                  href={`https://wa.me/919876543210?text=Hi%20Adharsh,%20tracking%20project:%20${encodeURIComponent(portal.projectName)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-4 bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
                </a>
                <a
                  href={`tel:${portal.agencyContactPhone || '+919876543210'}`}
                  className="w-full py-2.5 px-4 bg-[#F8FAFF] border border-blue-100 text-slate-700 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-[#1853CF]" /> Call Lead Architect
                </a>
              </div>
            </div>

            {/* 2. Invoices Module */}
            <div className="bg-white rounded-2xl border border-blue-100 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-black uppercase text-[#0B1420]">
                  Project Invoices
                </h3>
                <span className="text-[10px] font-bold text-slate-400 uppercase">
                  {portal.invoices?.length || 0} Invoices
                </span>
              </div>

              {portal.invoices && portal.invoices.length > 0 ? (
                <div className="space-y-3">
                  {portal.invoices.map((inv: any) => (
                    <div key={inv.id} className="p-3.5 rounded-xl border border-blue-100 bg-[#F8FAFF] flex items-center justify-between">
                      <div>
                        <div className="text-xs font-black text-[#0B1420]">{inv.invoiceNumber}</div>
                        <div className="text-[10px] text-slate-500">{inv.date} · ₹{inv.total.toLocaleString()}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase ${
                          inv.status === 'PAID' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {inv.status}
                        </span>
                        <Link
                          href={`/invoice/${inv.id}`}
                          target="_blank"
                          className="p-1.5 rounded-lg bg-white border border-slate-200 text-[#1853CF] hover:bg-blue-50"
                          title="View / Print Invoice"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400">No invoices generated yet.</p>
              )}
            </div>

            {/* 3. Contract & MSA */}
            {contract && (
              <div className="bg-white rounded-2xl border border-blue-100 p-6 shadow-xs">
                <div className="text-[10px] font-black uppercase tracking-widest text-[#1853CF] mb-1">
                  Legal & IP Transfer
                </div>
                <h3 className="text-sm font-black uppercase text-[#0B1420] mb-2">
                  Agency Master Agreement
                </h3>
                <p className="text-xs text-slate-500 mb-4 line-clamp-2">
                  {contract.title} ({contract.contractNumber})
                </p>
                <div className="p-3 bg-[#F8FAFF] border border-blue-100 rounded-xl flex items-center justify-between mb-4 text-xs font-bold">
                  <span className="text-slate-600">Status:</span>
                  <span className="text-emerald-600 flex items-center gap-1 font-black">
                    <CheckCircle2 className="w-3.5 h-3.5" /> {contract.status}
                  </span>
                </div>
                <Link
                  href={`/contract/${contract.id}`}
                  target="_blank"
                  className="w-full py-2.5 px-4 bg-[#1853CF] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <FileText className="w-3.5 h-3.5" /> View Signed Agreement
                </Link>
              </div>
            )}

            {/* Help / Security Notice */}
            <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-100 text-xs text-slate-600 space-y-2">
              <div className="font-bold text-[#1853CF] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> 100% Confidential Client Portal
              </div>
              <p className="text-[11px] leading-relaxed">
                This tracking workspace is encrypted and restricted to {portal.company}. IP transfer guarantees activate immediately upon project final milestone signoff.
              </p>
            </div>

          </div>

        </div>
      </main>

    </div>
  );
}

