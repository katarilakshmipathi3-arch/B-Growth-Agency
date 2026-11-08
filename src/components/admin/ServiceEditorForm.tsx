'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft, Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

interface PricingTier {
  name: string;
  price: number;
  currency: string;
  features: string[];
  isPopular?: boolean;
}

interface ServiceFormState {
  title: string;
  slug: string;
  category: string;
  coverImage: string;
  shortDescription: string;
  fullDescription: string;
  startingPrice: number;
  icon: string;
  isFeatured: boolean;
  order: number;
  status: 'published' | 'draft';
  features: string[];
  deliverables: string[];
  pricingTiers: PricingTier[];
  seoTitle: string;
  seoDescription: string;
}

export default function ServiceEditorForm({ 
  initialData, 
  serviceId 
}: { 
  initialData?: any; 
  serviceId?: string; 
}) {
  const router = useRouter();
  const isEditing = Boolean(serviceId);

  const [form, setForm] = useState<ServiceFormState>({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    category: initialData?.category || 'Web Development',
    coverImage: initialData?.coverImage || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
    shortDescription: initialData?.shortDescription || '',
    fullDescription: initialData?.fullDescription || '',
    startingPrice: initialData?.startingPrice || 14999,
    icon: initialData?.icon || 'Code2',
    isFeatured: initialData?.isFeatured || false,
    order: initialData?.order || 0,
    status: initialData?.status || 'published',
    features: initialData?.features ? (typeof initialData.features === 'string' ? JSON.parse(initialData.features) : initialData.features) : [''],
    deliverables: initialData?.deliverables ? (typeof initialData.deliverables === 'string' ? JSON.parse(initialData.deliverables) : initialData.deliverables) : [''],
    pricingTiers: initialData?.pricingTiers ? (typeof initialData.pricingTiers === 'string' ? JSON.parse(initialData.pricingTiers) : initialData.pricingTiers) : [
      { name: 'Starter', price: 14999, currency: '₹', features: ['Core Deliverable', '1 Month Support'] }
    ],
    seoTitle: initialData?.seoTitle || '',
    seoDescription: initialData?.seoDescription || '',
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

  const addFeature = () => {
    setForm(prev => ({ ...prev, features: [...prev.features, ''] }));
  };

  const updateFeature = (idx: number, val: string) => {
    const list = [...form.features];
    list[idx] = val;
    setForm(prev => ({ ...prev, features: list }));
  };

  const removeFeature = (idx: number) => {
    setForm(prev => ({ ...prev, features: prev.features.filter((_, i) => i !== idx) }));
  };

  const addDeliverable = () => {
    setForm(prev => ({ ...prev, deliverables: [...prev.deliverables, ''] }));
  };

  const updateDeliverable = (idx: number, val: string) => {
    const list = [...form.deliverables];
    list[idx] = val;
    setForm(prev => ({ ...prev, deliverables: list }));
  };

  const removeDeliverable = (idx: number) => {
    setForm(prev => ({ ...prev, deliverables: prev.deliverables.filter((_, i) => i !== idx) }));
  };

  const addPricingTier = () => {
    setForm(prev => ({
      ...prev,
      pricingTiers: [
        ...prev.pricingTiers,
        { name: 'Custom Tier', price: 29999, currency: '₹', features: ['Feature 1', 'Feature 2'] }
      ]
    }));
  };

  const removePricingTier = (idx: number) => {
    setForm(prev => ({
      ...prev,
      pricingTiers: prev.pricingTiers.filter((_, i) => i !== idx)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const url = isEditing ? `/api/admin/services/${serviceId}` : '/api/admin/services';
      const method = isEditing ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          features: form.features.filter(Boolean),
          deliverables: form.deliverables.filter(Boolean),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save service');
      }

      router.push('/admin/services');
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to save service');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      
      {/* Top action header */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/services"
          className="flex items-center gap-1.5 text-xs font-semibold text-brand-muted hover:text-brand-navy"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Services</span>
        </Link>

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 bg-primary hover:bg-primary-hover text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-md disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{loading ? 'Saving...' : (isEditing ? 'Update Service' : 'Publish Service')}</span>
        </button>
      </div>

      {error && (
        <div className="p-3 bg-status-danger/10 border border-status-danger/20 rounded-xl text-status-danger text-xs">
          {error}
        </div>
      )}

      {/* Main Details Card */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-brand-border dark:border-slate-800 shadow-soft space-y-6">
        <h3 className="font-bold text-base text-brand-navy dark:text-white">
          General Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-brand-navy dark:text-gray-300 mb-1.5">
              Service Title *
            </label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g. Custom Next.js Web Development"
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
              placeholder="custom-website-development"
              className="w-full text-xs p-3 rounded-xl border border-brand-border dark:border-slate-700 bg-brand-bg/40 dark:bg-slate-800 text-brand-navy dark:text-white focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-brand-navy dark:text-gray-300 mb-1.5">
              Category
            </label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full text-xs p-3 rounded-xl border border-brand-border dark:border-slate-700 bg-brand-bg/40 dark:bg-slate-800 text-brand-navy dark:text-white focus:outline-none focus:border-primary"
            >
              <option value="Web Development">Web Development</option>
              <option value="Poster & Graphic Design">Poster & Graphic Design</option>
              <option value="Video Editing">Video Editing</option>
              <option value="Branding">Branding</option>
              <option value="Social Media">Social Media</option>
              <option value="SEO">SEO</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-brand-navy dark:text-gray-300 mb-1.5">
              Starting Price (₹)
            </label>
            <input
              type="number"
              value={form.startingPrice}
              onChange={(e) => setForm({ ...form, startingPrice: Number(e.target.value) })}
              className="w-full text-xs p-3 rounded-xl border border-brand-border dark:border-slate-700 bg-brand-bg/40 dark:bg-slate-800 text-brand-navy dark:text-white focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-brand-navy dark:text-gray-300 mb-1.5">
              Status
            </label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value as any })}
              className="w-full text-xs p-3 rounded-xl border border-brand-border dark:border-slate-700 bg-brand-bg/40 dark:bg-slate-800 text-brand-navy dark:text-white focus:outline-none focus:border-primary"
            >
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-brand-navy dark:text-gray-300 mb-1.5">
            Cover Image URL
          </label>
          <input
            type="text"
            required
            value={form.coverImage}
            onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
            placeholder="https://images.unsplash.com/... or /uploads/..."
            className="w-full text-xs p-3 rounded-xl border border-brand-border dark:border-slate-700 bg-brand-bg/40 dark:bg-slate-800 text-brand-navy dark:text-white focus:outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-brand-navy dark:text-gray-300 mb-1.5">
            Short Description (Card Summary) *
          </label>
          <textarea
            required
            rows={2}
            value={form.shortDescription}
            onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
            placeholder="High-level 1-2 sentence overview for cards and meta tags"
            className="w-full text-xs p-3 rounded-xl border border-brand-border dark:border-slate-700 bg-brand-bg/40 dark:bg-slate-800 text-brand-navy dark:text-white focus:outline-none focus:border-primary resize-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-brand-navy dark:text-gray-300 mb-1.5">
            Full Description *
          </label>
          <textarea
            required
            rows={5}
            value={form.fullDescription}
            onChange={(e) => setForm({ ...form, fullDescription: e.target.value })}
            placeholder="Detailed description of process, methodology, and value proposition"
            className="w-full text-xs p-3 rounded-xl border border-brand-border dark:border-slate-700 bg-brand-bg/40 dark:bg-slate-800 text-brand-navy dark:text-white focus:outline-none focus:border-primary"
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
            Feature this service on Homepage
          </label>
        </div>
      </div>

      {/* Features & Deliverables */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Features */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-brand-border dark:border-slate-800 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm text-brand-navy dark:text-white">
              Features Included
            </h4>
            <button
              type="button"
              onClick={addFeature}
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add Feature
            </button>
          </div>

          <div className="space-y-2">
            {form.features.map((feat, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={feat}
                  onChange={(e) => updateFeature(idx, e.target.value)}
                  placeholder={`Feature #${idx + 1}`}
                  className="flex-1 text-xs p-2.5 rounded-xl border border-brand-border dark:border-slate-700 bg-brand-bg/40 dark:bg-slate-800 text-brand-navy dark:text-white focus:outline-none focus:border-primary"
                />
                <button
                  type="button"
                  onClick={() => removeFeature(idx)}
                  className="p-2 text-status-danger hover:bg-status-danger/10 rounded-lg"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Deliverables */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-brand-border dark:border-slate-800 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm text-brand-navy dark:text-white">
              Guaranteed Deliverables
            </h4>
            <button
              type="button"
              onClick={addDeliverable}
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add Deliverable
            </button>
          </div>

          <div className="space-y-2">
            {form.deliverables.map((del, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={del}
                  onChange={(e) => updateDeliverable(idx, e.target.value)}
                  placeholder={`Deliverable #${idx + 1}`}
                  className="flex-1 text-xs p-2.5 rounded-xl border border-brand-border dark:border-slate-700 bg-brand-bg/40 dark:bg-slate-800 text-brand-navy dark:text-white focus:outline-none focus:border-primary"
                />
                <button
                  type="button"
                  onClick={() => removeDeliverable(idx)}
                  className="p-2 text-status-danger hover:bg-status-danger/10 rounded-lg"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* SEO Card */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-brand-border dark:border-slate-800 shadow-soft space-y-4">
        <h4 className="font-bold text-sm text-brand-navy dark:text-white">
          SEO & Search Engine Optimization
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-brand-navy dark:text-gray-300 mb-1.5">
              Meta Title
            </label>
            <input
              type="text"
              value={form.seoTitle}
              onChange={(e) => setForm({ ...form, seoTitle: e.target.value })}
              placeholder="e.g. Best Next.js Web Development Agency"
              className="w-full text-xs p-3 rounded-xl border border-brand-border dark:border-slate-700 bg-brand-bg/40 dark:bg-slate-800 text-brand-navy dark:text-white focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-brand-navy dark:text-gray-300 mb-1.5">
              Meta Description
            </label>
            <input
              type="text"
              value={form.seoDescription}
              onChange={(e) => setForm({ ...form, seoDescription: e.target.value })}
              placeholder="e.g. Elevate conversions with custom Next.js websites..."
              className="w-full text-xs p-3 rounded-xl border border-brand-border dark:border-slate-700 bg-brand-bg/40 dark:bg-slate-800 text-brand-navy dark:text-white focus:outline-none focus:border-primary"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Link
          href="/admin/services"
          className="px-5 py-2.5 border border-brand-border dark:border-slate-700 text-xs font-semibold rounded-xl text-brand-navy dark:text-white"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-3 bg-primary hover:bg-primary-hover text-white text-xs font-semibold rounded-xl shadow-md disabled:opacity-50"
        >
          {loading ? 'Saving...' : (isEditing ? 'Save Changes' : 'Create Service')}
        </button>
      </div>

    </form>
  );
}
