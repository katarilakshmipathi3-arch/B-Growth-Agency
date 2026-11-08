'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface PortfolioFormState {
  title: string;
  slug: string;
  type: 'Website' | 'Poster Design' | 'Edited Video';
  category: string;
  clientName: string;
  thumbnail: string;
  images: string[];
  videoUrl: string;
  liveUrl: string;
  description: string;
  challenge: string;
  solution: string;
  results: string;
  toolsUsed: string[];
  completionDate: string;
  isFeatured: boolean;
  tags: string[];
  status: 'published' | 'draft';
  order: number;
}

export default function PortfolioEditorForm({ 
  initialData, 
  itemId 
}: { 
  initialData?: any; 
  itemId?: string; 
}) {
  const router = useRouter();
  const isEditing = Boolean(itemId);

  const [form, setForm] = useState<PortfolioFormState>({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    type: initialData?.type || 'Website',
    category: initialData?.category || 'Web Development',
    clientName: initialData?.clientName || '',
    thumbnail: initialData?.thumbnail || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&q=80',
    images: initialData?.images ? (typeof initialData.images === 'string' ? JSON.parse(initialData.images) : initialData.images) : [''],
    videoUrl: initialData?.videoUrl || '',
    liveUrl: initialData?.liveUrl || '',
    description: initialData?.description || '',
    challenge: initialData?.challenge || '',
    solution: initialData?.solution || '',
    results: initialData?.results || '',
    toolsUsed: initialData?.toolsUsed ? (typeof initialData.toolsUsed === 'string' ? JSON.parse(initialData.toolsUsed) : initialData.toolsUsed) : ['Next.js', 'Tailwind CSS'],
    completionDate: initialData?.completionDate || 'November 2025',
    isFeatured: initialData?.isFeatured || false,
    tags: initialData?.tags ? (typeof initialData.tags === 'string' ? JSON.parse(initialData.tags) : initialData.tags) : ['High Conversion'],
    status: initialData?.status || 'published',
    order: initialData?.order || 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const autoGenerateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  const handleTitleChange = (val: string) => {
    setForm(prev => ({
      ...prev,
      title: val,
      slug: !isEditing ? autoGenerateSlug(val) : prev.slug,
    }));
  };

  const addImage = () => {
    setForm(prev => ({ ...prev, images: [...prev.images, ''] }));
  };

  const updateImage = (idx: number, val: string) => {
    const list = [...form.images];
    list[idx] = val;
    setForm(prev => ({ ...prev, images: list }));
  };

  const removeImage = (idx: number) => {
    setForm(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== idx) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const url = isEditing ? `/api/admin/portfolio/${itemId}` : '/api/admin/portfolio';
      const method = isEditing ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          images: form.images.filter(Boolean),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save project');
      }

      router.push('/admin/portfolio');
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to save project');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/portfolio"
          className="flex items-center gap-1.5 text-xs font-semibold text-brand-muted hover:text-brand-navy"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portfolio</span>
        </Link>

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 bg-primary hover:bg-primary-hover text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-md disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{loading ? 'Saving...' : (isEditing ? 'Save Changes' : 'Publish Project')}</span>
        </button>
      </div>

      {error && (
        <div className="p-3 bg-status-danger/10 border border-status-danger/20 rounded-xl text-status-danger text-xs">
          {error}
        </div>
      )}

      {/* Main Info */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-brand-border dark:border-slate-800 shadow-soft space-y-6">
        <h3 className="font-bold text-base text-brand-navy dark:text-white">
          Project Essentials
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-brand-navy dark:text-gray-300 mb-1.5">
              Project Title *
            </label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g. Apex Wealth Management Platform"
              className="w-full text-xs p-3 rounded-xl border border-brand-border dark:border-slate-700 bg-brand-bg/40 dark:bg-slate-800 text-brand-navy dark:text-white focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-brand-navy dark:text-gray-300 mb-1.5">
              URL Slug *
            </label>
            <input
              type="text"
              required
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              placeholder="apex-wealth-platform"
              className="w-full text-xs p-3 rounded-xl border border-brand-border dark:border-slate-700 bg-brand-bg/40 dark:bg-slate-800 text-brand-navy dark:text-white focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-brand-navy dark:text-gray-300 mb-1.5">
              Discipline Type *
            </label>
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value as any })}
              className="w-full text-xs p-3 rounded-xl border border-brand-border dark:border-slate-700 bg-brand-bg/40 dark:bg-slate-800 text-brand-navy dark:text-white focus:outline-none focus:border-primary"
            >
              <option value="Website">Website</option>
              <option value="Poster Design">Poster Design</option>
              <option value="Edited Video">Edited Video</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-brand-navy dark:text-gray-300 mb-1.5">
              Client Name *
            </label>
            <input
              type="text"
              required
              value={form.clientName}
              onChange={(e) => setForm({ ...form, clientName: e.target.value })}
              placeholder="Apex Wealth Partners"
              className="w-full text-xs p-3 rounded-xl border border-brand-border dark:border-slate-700 bg-brand-bg/40 dark:bg-slate-800 text-brand-navy dark:text-white focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-brand-navy dark:text-gray-300 mb-1.5">
              Completion Date
            </label>
            <input
              type="text"
              value={form.completionDate}
              onChange={(e) => setForm({ ...form, completionDate: e.target.value })}
              placeholder="October 2025"
              className="w-full text-xs p-3 rounded-xl border border-brand-border dark:border-slate-700 bg-brand-bg/40 dark:bg-slate-800 text-brand-navy dark:text-white focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-brand-navy dark:text-gray-300 mb-1.5">
              Thumbnail Cover URL *
            </label>
            <input
              type="text"
              required
              value={form.thumbnail}
              onChange={(e) => setForm({ ...form, thumbnail: e.target.value })}
              placeholder="https://... or /uploads/..."
              className="w-full text-xs p-3 rounded-xl border border-brand-border dark:border-slate-700 bg-brand-bg/40 dark:bg-slate-800 text-brand-navy dark:text-white focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-brand-navy dark:text-gray-300 mb-1.5">
              Live Site URL (Websites)
            </label>
            <input
              type="url"
              value={form.liveUrl}
              onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
              placeholder="https://example.com"
              className="w-full text-xs p-3 rounded-xl border border-brand-border dark:border-slate-700 bg-brand-bg/40 dark:bg-slate-800 text-brand-navy dark:text-white focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-brand-navy dark:text-gray-300 mb-1.5">
            Video Embed or YouTube URL (for Video items)
          </label>
          <input
            type="url"
            value={form.videoUrl}
            onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
            placeholder="https://www.youtube.com/watch?v=... or Vimeo"
            className="w-full text-xs p-3 rounded-xl border border-brand-border dark:border-slate-700 bg-brand-bg/40 dark:bg-slate-800 text-brand-navy dark:text-white focus:outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-brand-navy dark:text-gray-300 mb-1.5">
            Short Description *
          </label>
          <textarea
            required
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Brief case study overview"
            className="w-full text-xs p-3 rounded-xl border border-brand-border dark:border-slate-700 bg-brand-bg/40 dark:bg-slate-800 text-brand-navy dark:text-white focus:outline-none focus:border-primary resize-none"
          />
        </div>

        <div className="flex items-center gap-2 pt-2">
          <input
            type="checkbox"
            id="featured"
            checked={form.isFeatured}
            onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
            className="w-4 h-4 rounded text-primary focus:ring-primary"
          />
          <label htmlFor="featured" className="text-xs font-bold text-brand-navy dark:text-white cursor-pointer">
            Feature on Homepage Works Grid
          </label>
        </div>
      </div>

      {/* Case Study Deep Dive: Challenge / Solution / Results */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-brand-border dark:border-slate-800 shadow-soft space-y-4">
        <h3 className="font-bold text-base text-brand-navy dark:text-white">
          Case Study Breakdown
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-brand-navy dark:text-gray-300 mb-1.5">
              The Client Challenge
            </label>
            <textarea
              rows={2}
              value={form.challenge}
              onChange={(e) => setForm({ ...form, challenge: e.target.value })}
              placeholder="What friction or hurdles was the client facing?"
              className="w-full text-xs p-3 rounded-xl border border-brand-border dark:border-slate-700 bg-brand-bg/40 dark:bg-slate-800 text-brand-navy dark:text-white focus:outline-none focus:border-primary resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-brand-navy dark:text-gray-300 mb-1.5">
              Our Solution & Technical Execution
            </label>
            <textarea
              rows={2}
              value={form.solution}
              onChange={(e) => setForm({ ...form, solution: e.target.value })}
              placeholder="How did our engineers and art directors solve it?"
              className="w-full text-xs p-3 rounded-xl border border-brand-border dark:border-slate-700 bg-brand-bg/40 dark:bg-slate-800 text-brand-navy dark:text-white focus:outline-none focus:border-primary resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-brand-navy dark:text-gray-300 mb-1.5">
              Measurable Business Results
            </label>
            <textarea
              rows={2}
              value={form.results}
              onChange={(e) => setForm({ ...form, results: e.target.value })}
              placeholder="e.g. 240% increase in inbound leads, 0.7s load time"
              className="w-full text-xs p-3 rounded-xl border border-brand-border dark:border-slate-700 bg-brand-bg/40 dark:bg-slate-800 text-brand-navy dark:text-white focus:outline-none focus:border-primary resize-none"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Link
          href="/admin/portfolio"
          className="px-5 py-2.5 border border-brand-border dark:border-slate-700 text-xs font-semibold rounded-xl text-brand-navy dark:text-white"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-3 bg-primary hover:bg-primary-hover text-white text-xs font-semibold rounded-xl shadow-md disabled:opacity-50"
        >
          {loading ? 'Saving...' : (isEditing ? 'Save Changes' : 'Create Project')}
        </button>
      </div>

    </form>
  );
}
