'use client';

import React, { useState } from 'react';
import { Download, Search, Trash2, Mail } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface Subscriber {
  id: string;
  email: string;
  status: string;
  createdAt: Date | string;
}

export default function SubscribersClient({ initialSubscribers }: { initialSubscribers: Subscriber[] }) {
  const [subscribers, setSubscribers] = useState<Subscriber[]>(initialSubscribers);
  const [search, setSearch] = useState('');

  const exportCSV = () => {
    const headers = ['ID', 'Email', 'Status', 'Subscribed At'];
    const rows = subscribers.map(s => [
      s.id,
      s.email,
      s.status,
      new Date(s.createdAt).toISOString(),
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `bgrowth_subscribers_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filtered = subscribers.filter(s =>
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-brand-border dark:border-slate-800 shadow-soft">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-brand-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search emails..."
            className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-brand-border dark:border-slate-700 bg-brand-bg/50 dark:bg-slate-800 text-brand-navy dark:text-white focus:outline-none focus:border-primary"
          />
        </div>

        <button
          onClick={exportCSV}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-primary hover:bg-primary-hover text-white text-xs font-semibold rounded-xl transition-colors shadow-xs"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export {filtered.length} Subscribers to CSV</span>
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-brand-border dark:border-slate-800 shadow-soft overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-brand-bg/50 dark:bg-slate-800/50 border-b border-brand-border dark:border-slate-800 text-brand-muted uppercase font-bold text-[10px]">
              <th className="p-3.5">Subscriber Email</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5">Subscription Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-border/60 dark:divide-slate-800">
            {filtered.map((sub) => (
              <tr key={sub.id} className="hover:bg-brand-bg/40 dark:hover:bg-slate-800/40">
                <td className="p-3.5 font-bold text-brand-navy dark:text-white flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-primary" />
                  <span>{sub.email}</span>
                </td>
                <td className="p-3.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                    {sub.status}
                  </span>
                </td>
                <td className="p-3.5 text-brand-muted">
                  {formatDate(sub.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
