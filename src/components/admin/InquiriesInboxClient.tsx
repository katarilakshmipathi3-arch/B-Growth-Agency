'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Download, 
  Mail, 
  Phone, 
  Calendar, 
  Trash2, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  X, 
  FileSpreadsheet,
  ExternalLink
} from 'lucide-react';
import { formatDate } from '@/lib/utils';
import InquiryStatusSelect from '@/components/admin/InquiryStatusSelect';

interface Inquiry {
  id: string;
  type: string;
  name: string;
  email: string;
  phone?: string | null;
  serviceInterest?: string | null;
  budget?: string | null;
  timeline?: string | null;
  message: string;
  details?: string | null;
  status: string;
  notes?: string | null;
  createdAt: Date | string;
}

export default function InquiriesInboxClient({ initialInquiries }: { initialInquiries: Inquiry[] }) {
  const [inquiries, setInquiries] = useState<Inquiry[]>(initialInquiries);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [noteText, setNoteText] = useState('');
  const [savingNote, setSavingNote] = useState(false);

  const filtered = inquiries.filter((inq) => {
    const matchesStatus = statusFilter === 'All' || inq.status === statusFilter;
    const matchesType = typeFilter === 'All' || inq.type === typeFilter;
    const matchesSearch =
      inq.name.toLowerCase().includes(search.toLowerCase()) ||
      inq.email.toLowerCase().includes(search.toLowerCase()) ||
      inq.message.toLowerCase().includes(search.toLowerCase()) ||
      (inq.serviceInterest && inq.serviceInterest.toLowerCase().includes(search.toLowerCase()));

    return matchesStatus && matchesType && matchesSearch;
  });

  const exportCSV = () => {
    const headers = ['ID', 'Type', 'Name', 'Email', 'Phone', 'Service', 'Budget', 'Timeline', 'Status', 'Date', 'Message'];
    const rows = filtered.map(i => [
      i.id,
      i.type,
      `"${i.name.replace(/"/g, '""')}"`,
      i.email,
      i.phone || '',
      `"${(i.serviceInterest || '').replace(/"/g, '""')}"`,
      `"${(i.budget || '').replace(/"/g, '""')}"`,
      `"${(i.timeline || '').replace(/"/g, '""')}"`,
      i.status,
      new Date(i.createdAt).toISOString(),
      `"${i.message.replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `bgrowth_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openDrawer = (inq: Inquiry) => {
    setSelectedInquiry(inq);
    setNoteText(inq.notes || '');
  };

  const handleSaveNotes = async () => {
    if (!selectedInquiry) return;
    setSavingNote(true);
    try {
      const res = await fetch(`/api/admin/inquiries/${selectedInquiry.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes: noteText, status: selectedInquiry.status }),
      });
      if (res.ok) {
        setInquiries(prev => prev.map(item => item.id === selectedInquiry.id ? { ...item, notes: noteText } : item));
        setSelectedInquiry(prev => prev ? { ...prev, notes: noteText } : null);
      }
    } finally {
      setSavingNote(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) return;
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setInquiries(prev => prev.filter(i => i.id !== id));
        if (selectedInquiry?.id === id) setSelectedInquiry(null);
      }
    } catch {
      alert('Failed to delete');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Controls Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-brand-border dark:border-slate-800 shadow-soft">
        
        {/* Filters */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full md:w-auto">
          {['All', 'New', 'In Progress', 'Closed'].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                statusFilter === s
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-brand-muted hover:text-brand-navy dark:hover:text-white bg-brand-bg dark:bg-slate-800'
              }`}
            >
              {s}
            </button>
          ))}

          <div className="h-5 w-px bg-brand-border mx-1" />

          {['All', 'contact', 'quote'].map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold uppercase whitespace-nowrap transition-all ${
                typeFilter === t
                  ? 'bg-brand-navy text-white'
                  : 'text-brand-muted hover:text-brand-navy dark:hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Search & CSV Export */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 text-brand-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search leads..."
              className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-brand-border dark:border-slate-700 bg-brand-bg/50 dark:bg-slate-800 text-brand-navy dark:text-white focus:outline-none focus:border-primary"
            />
          </div>

          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-brand-bg dark:bg-slate-800 border border-brand-border dark:border-slate-700 hover:border-primary text-xs font-semibold rounded-xl text-brand-navy dark:text-white transition-colors"
            title="Export CSV"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
        </div>

      </div>

      {/* Leads Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-brand-border dark:border-slate-800 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-brand-bg/50 dark:bg-slate-800/50 border-b border-brand-border dark:border-slate-800 text-brand-muted uppercase font-bold text-[10px]">
                <th className="p-3.5">Client & Contact</th>
                <th className="p-3.5">Type</th>
                <th className="p-3.5">Service Interest</th>
                <th className="p-3.5">Budget</th>
                <th className="p-3.5">Submitted</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/60 dark:divide-slate-800">
              {filtered.map((inq) => (
                <tr key={inq.id} className="hover:bg-brand-bg/40 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="p-3.5 cursor-pointer" onClick={() => openDrawer(inq)}>
                    <div className="font-bold text-brand-navy dark:text-white hover:text-primary transition-colors">
                      {inq.name}
                    </div>
                    <div className="text-[11px] text-brand-muted">
                      {inq.email} {inq.phone ? `• ${inq.phone}` : ''}
                    </div>
                  </td>

                  <td className="p-3.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      inq.type === 'quote' 
                        ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30' 
                        : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30'
                    }`}>
                      {inq.type}
                    </span>
                  </td>

                  <td className="p-3.5 font-medium text-brand-navy dark:text-gray-200">
                    {inq.serviceInterest || 'General'}
                  </td>

                  <td className="p-3.5 text-primary font-bold">
                    {inq.budget || 'N/A'}
                  </td>

                  <td className="p-3.5 text-brand-muted">
                    {formatDate(inq.createdAt)}
                  </td>

                  <td className="p-3.5">
                    <InquiryStatusSelect inquiryId={inq.id} currentStatus={inq.status} />
                  </td>

                  <td className="p-3.5 text-right space-x-2">
                    <a
                      href={`mailto:${inq.email}?subject=Re:%20B%20Growth%20Agency%20Proposal%20for%20${encodeURIComponent(inq.name)}`}
                      className="p-1.5 rounded-lg text-primary hover:bg-primary-tint/30 inline-block"
                      title="Reply via Email"
                    >
                      <Mail className="w-3.5 h-3.5" />
                    </a>

                    <button
                      type="button"
                      onClick={() => openDrawer(inq)}
                      className="text-xs font-semibold text-primary hover:underline"
                    >
                      Inspect
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(inq.id)}
                      className="p-1.5 rounded-lg text-status-danger hover:bg-status-danger/10 inline-block"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inspect Drawer */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setSelectedInquiry(null)}
          />
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 h-full shadow-2xl p-6 sm:p-8 overflow-y-auto z-10 border-l border-brand-border dark:border-slate-800 space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-brand-border dark:border-slate-800">
              <div>
                <span className="text-[10px] uppercase font-bold text-primary">Inquiry Details</span>
                <h3 className="text-xl font-bold text-brand-navy dark:text-white">
                  {selectedInquiry.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-1 rounded-lg text-brand-muted hover:text-brand-navy"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-brand-bg dark:bg-slate-800">
                <div>
                  <span className="text-brand-muted block font-semibold">Email:</span>
                  <a href={`mailto:${selectedInquiry.email}`} className="font-bold text-primary hover:underline">
                    {selectedInquiry.email}
                  </a>
                </div>
                <div>
                  <span className="text-brand-muted block font-semibold">Phone:</span>
                  <span className="font-bold text-brand-navy dark:text-white">
                    {selectedInquiry.phone || 'N/A'}
                  </span>
                </div>
                <div>
                  <span className="text-brand-muted block font-semibold">Budget:</span>
                  <span className="font-bold text-primary">
                    {selectedInquiry.budget || 'N/A'}
                  </span>
                </div>
                <div>
                  <span className="text-brand-muted block font-semibold">Timeline:</span>
                  <span className="font-bold text-brand-navy dark:text-white">
                    {selectedInquiry.timeline || 'N/A'}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-brand-muted block font-bold mb-1">Service Requested:</span>
                <div className="p-3 rounded-xl bg-brand-bg dark:bg-slate-800 font-semibold text-brand-navy dark:text-white">
                  {selectedInquiry.serviceInterest || 'Custom Scope'}
                </div>
              </div>

              <div>
                <span className="text-brand-muted block font-bold mb-1">Project Message / Brief:</span>
                <div className="p-4 rounded-xl bg-brand-bg dark:bg-slate-800 leading-relaxed text-brand-navy dark:text-gray-200 whitespace-pre-wrap">
                  {selectedInquiry.message}
                </div>
              </div>

              {/* Multi-step questionnaire answers */}
              {selectedInquiry.details && (
                <div>
                  <span className="text-brand-muted block font-bold mb-1">Quote Questionnaire Answers:</span>
                  <pre className="p-4 rounded-xl bg-slate-950 text-green-400 text-[11px] overflow-x-auto whitespace-pre-wrap">
                    {JSON.stringify(JSON.parse(selectedInquiry.details), null, 2)}
                  </pre>
                </div>
              )}

              {/* Internal Notes Editor */}
              <div className="pt-2">
                <span className="text-brand-muted block font-bold mb-1">Internal Team Notes:</span>
                <textarea
                  rows={3}
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Add internal notes (e.g. follow-up call scheduled for Tuesday)..."
                  className="w-full text-xs p-3 rounded-xl border border-brand-border dark:border-slate-700 bg-brand-bg/50 dark:bg-slate-800 text-brand-navy dark:text-white focus:outline-none focus:border-primary"
                />
                <button
                  type="button"
                  onClick={handleSaveNotes}
                  disabled={savingNote}
                  className="mt-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-semibold rounded-lg shadow-xs"
                >
                  {savingNote ? 'Saving note...' : 'Save Notes'}
                </button>
              </div>

              {/* Quick Reply CTA */}
              <div className="pt-4 border-t border-brand-border dark:border-slate-800">
                <a
                  href={`mailto:${selectedInquiry.email}?subject=B%20Growth%20Agency%20Proposal`}
                  className="w-full py-3 bg-primary hover:bg-primary-hover text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 shadow-md"
                >
                  <Mail className="w-4 h-4" />
                  <span>Reply to {selectedInquiry.name} via Email</span>
                </a>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
