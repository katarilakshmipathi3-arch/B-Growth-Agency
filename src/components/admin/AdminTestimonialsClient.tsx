'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Plus, Trash2, Star, CheckCircle } from 'lucide-react';

interface Testimonial {
  id: string;
  clientName: string;
  clientRole: string;
  company: string;
  avatar?: string | null;
  content: string;
  rating: number;
  isFeatured: boolean;
}

export default function AdminTestimonialsClient({ initialItems }: { initialItems: Testimonial[] }) {
  const [items, setItems] = useState<Testimonial[]>(initialItems);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    clientName: '',
    clientRole: 'Founder & CEO',
    company: '',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    content: '',
    rating: 5,
    isFeatured: true,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/admin/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        const newItem = await res.json();
        setItems(prev => [newItem, ...prev]);
        setShowModal(false);
        setForm({
          clientName: '',
          clientRole: 'Founder & CEO',
          company: '',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
          content: '',
          rating: 5,
          isFeatured: true,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;
    try {
      const res = await fetch(`/api/admin/testimonials?id=${id}`, { method: 'DELETE' });
      if (res.ok) setItems(prev => prev.filter(i => i.id !== id));
    } catch {
      alert('Failed to delete');
    }
  };

  return (
    <div className="space-y-6">
      
      <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-4 rounded-2xl border border-brand-border dark:border-slate-800 shadow-soft">
        <span className="text-xs font-bold text-brand-navy dark:text-white">
          Total Reviews: {items.length}
        </span>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-semibold rounded-xl shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add Review</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-brand-border dark:border-slate-800 shadow-soft flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1 text-status-danger hover:bg-status-danger/10 rounded-lg"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs text-brand-navy dark:text-gray-300 italic leading-relaxed">
                &ldquo;{item.content}&rdquo;
              </p>
            </div>

            <div className="pt-4 border-t border-brand-border dark:border-slate-800 flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full overflow-hidden bg-slate-200 flex-shrink-0">
                <Image src={item.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200'} alt={item.clientName} fill className="object-cover" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-brand-navy dark:text-white">{item.clientName}</h4>
                <p className="text-[10px] text-brand-muted">{item.clientRole}, {item.company}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={() => setShowModal(false)} />
          <form onSubmit={handleSubmit} className="relative z-10 w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl border border-brand-border dark:border-slate-800">
            <h3 className="font-bold text-lg text-brand-navy dark:text-white">Add Client Review</h3>

            <div>
              <label className="block text-xs font-bold text-brand-navy dark:text-gray-300 mb-1">Client Name *</label>
              <input
                type="text"
                required
                value={form.clientName}
                onChange={(e) => setForm({ ...form, clientName: e.target.value })}
                placeholder="Rajesh Varma"
                className="w-full text-xs p-2.5 rounded-xl border border-brand-border dark:border-slate-700 bg-brand-bg/40 dark:bg-slate-800"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-brand-navy dark:text-gray-300 mb-1">Role</label>
                <input
                  type="text"
                  value={form.clientRole}
                  onChange={(e) => setForm({ ...form, clientRole: e.target.value })}
                  placeholder="Managing Director"
                  className="w-full text-xs p-2.5 rounded-xl border border-brand-border dark:border-slate-700 bg-brand-bg/40 dark:bg-slate-800"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-brand-navy dark:text-gray-300 mb-1">Company *</label>
                <input
                  type="text"
                  required
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  placeholder="Apex Wealth"
                  className="w-full text-xs p-2.5 rounded-xl border border-brand-border dark:border-slate-700 bg-brand-bg/40 dark:bg-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-brand-navy dark:text-gray-300 mb-1">Avatar Image URL</label>
              <input
                type="text"
                value={form.avatar}
                onChange={(e) => setForm({ ...form, avatar: e.target.value })}
                className="w-full text-xs p-2.5 rounded-xl border border-brand-border dark:border-slate-700 bg-brand-bg/40 dark:bg-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-brand-navy dark:text-gray-300 mb-1">Testimonial Quote *</label>
              <textarea
                required
                rows={3}
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                placeholder="B Growth Agency delivered beyond our wildest expectations..."
                className="w-full text-xs p-2.5 rounded-xl border border-brand-border dark:border-slate-700 bg-brand-bg/40 dark:bg-slate-800"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-brand-border text-xs font-semibold rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-semibold rounded-xl shadow-md"
              >
                {loading ? 'Saving...' : 'Add Review'}
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
