'use client';

import React, { useState } from 'react';
import { Save, CheckCircle2, Sparkles, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function PageContentEditorClient({ initialData }: { initialData: any }) {
  const [data, setData] = useState(initialData || {
    hero: {
      badge: '🚀 Top Rated Digital Growth Agency',
      headline: 'We Build Brands That Grow & Convert',
      subheadline: 'From high-performance bespoke websites to scroll-stopping graphic designs and cinematic video edits.',
      primaryCta: 'Get a Free Quote',
      secondaryCta: 'View Our Work',
      stats: [
        { label: 'Projects Delivered', value: '180+' },
        { label: 'Happy Clients', value: '95+' },
        { label: 'Client Satisfaction', value: '99.4%' },
        { label: 'Average ROI Boost', value: '3.8x' },
      ],
    },
    ctaBanner: {
      headline: 'Ready To Scale Your Digital Presence?',
      subheadline: 'Book a free 30-minute discovery consultation and get a tailored growth proposal.',
      buttonText: 'Start Your Project Today',
    },
  });

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const handleStatChange = (index: number, field: 'label' | 'value', val: string) => {
    const updatedStats = [...data.hero.stats];
    updatedStats[index][field] = val;
    setData({
      ...data,
      hero: {
        ...data.hero,
        stats: updatedStats,
      },
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSaved(false);

    try {
      const res = await fetch('/api/admin/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'home', data }),
      });

      if (!res.ok) throw new Error('Failed to save content');

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setError('Error saving content');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-4xl">
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {saved && (
            <div className="flex items-center gap-1.5 text-status-success text-xs font-bold animate-in fade-in">
              <CheckCircle2 className="w-4 h-4" />
              <span>Published Live to Public Homepage!</span>
            </div>
          )}
          {error && <span className="text-status-danger text-xs font-bold">{error}</span>}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl border border-brand-border dark:border-slate-700 text-brand-navy dark:text-white hover:border-primary"
          >
            <span>Preview Homepage</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-1.5 px-6 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-semibold rounded-xl shadow-md disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Publishing...' : 'Save Live Content'}</span>
          </button>
        </div>
      </div>

      {/* Hero Content Card */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-brand-border dark:border-slate-800 shadow-soft space-y-5">
        <h3 className="font-bold text-base text-brand-navy dark:text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          <span>Homepage Hero Section</span>
        </h3>

        <div>
          <label className="block text-xs font-bold uppercase text-brand-navy dark:text-gray-300 mb-1.5">
            Top Badge Pill Text
          </label>
          <input
            type="text"
            value={data.hero?.badge || ''}
            onChange={(e) => setData({ ...data, hero: { ...data.hero, badge: e.target.value } })}
            className="w-full text-xs p-3 rounded-xl border border-brand-border dark:border-slate-700 bg-brand-bg/40 dark:bg-slate-800 text-brand-navy dark:text-white focus:outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-brand-navy dark:text-gray-300 mb-1.5">
            Main Headline *
          </label>
          <input
            type="text"
            required
            value={data.hero?.headline || ''}
            onChange={(e) => setData({ ...data, hero: { ...data.hero, headline: e.target.value } })}
            className="w-full text-xs p-3 rounded-xl border border-brand-border dark:border-slate-700 bg-brand-bg/40 dark:bg-slate-800 text-brand-navy dark:text-white focus:outline-none focus:border-primary font-bold"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-brand-navy dark:text-gray-300 mb-1.5">
            Subheadline Paragraph
          </label>
          <textarea
            rows={3}
            value={data.hero?.subheadline || ''}
            onChange={(e) => setData({ ...data, hero: { ...data.hero, subheadline: e.target.value } })}
            className="w-full text-xs p-3 rounded-xl border border-brand-border dark:border-slate-700 bg-brand-bg/40 dark:bg-slate-800 text-brand-navy dark:text-white focus:outline-none focus:border-primary resize-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-brand-navy dark:text-gray-300 mb-1.5">
              Primary Button Text
            </label>
            <input
              type="text"
              value={data.hero?.primaryCta || ''}
              onChange={(e) => setData({ ...data, hero: { ...data.hero, primaryCta: e.target.value } })}
              className="w-full text-xs p-3 rounded-xl border border-brand-border dark:border-slate-700 bg-brand-bg/40 dark:bg-slate-800 text-brand-navy dark:text-white focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-brand-navy dark:text-gray-300 mb-1.5">
              Secondary Button Text
            </label>
            <input
              type="text"
              value={data.hero?.secondaryCta || ''}
              onChange={(e) => setData({ ...data, hero: { ...data.hero, secondaryCta: e.target.value } })}
              className="w-full text-xs p-3 rounded-xl border border-brand-border dark:border-slate-700 bg-brand-bg/40 dark:bg-slate-800 text-brand-navy dark:text-white focus:outline-none focus:border-primary"
            />
          </div>
        </div>
      </div>

      {/* Stats Counters */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-brand-border dark:border-slate-800 shadow-soft space-y-5">
        <h3 className="font-bold text-base text-brand-navy dark:text-white">
          Animated Stats Counter Strip
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {(data.hero?.stats || []).map((stat: { label: string; value: string }, idx: number) => (
            <div key={idx} className="p-4 rounded-xl bg-brand-bg dark:bg-slate-800 border border-brand-border dark:border-slate-700 space-y-2">
              <span className="text-[10px] font-bold uppercase text-brand-muted">Stat #{idx + 1}</span>
              <input
                type="text"
                value={stat.value}
                onChange={(e) => handleStatChange(idx, 'value', e.target.value)}
                placeholder="180+"
                className="w-full text-lg font-extrabold text-primary p-2 rounded-lg border border-brand-border dark:border-slate-600 bg-white dark:bg-slate-900 focus:outline-none"
              />
              <input
                type="text"
                value={stat.label}
                onChange={(e) => handleStatChange(idx, 'label', e.target.value)}
                placeholder="Projects Delivered"
                className="w-full text-xs p-2 rounded-lg border border-brand-border dark:border-slate-600 bg-white dark:bg-slate-900 focus:outline-none text-brand-navy dark:text-white"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Final CTA Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-brand-border dark:border-slate-800 shadow-soft space-y-4">
        <h3 className="font-bold text-base text-brand-navy dark:text-white">
          Homepage Bottom CTA Banner
        </h3>

        <div>
          <label className="block text-xs font-bold uppercase text-brand-navy dark:text-gray-300 mb-1.5">
            Banner Headline
          </label>
          <input
            type="text"
            value={data.ctaBanner?.headline || ''}
            onChange={(e) => setData({ ...data, ctaBanner: { ...data.ctaBanner, headline: e.target.value } })}
            className="w-full text-xs p-3 rounded-xl border border-brand-border dark:border-slate-700 bg-brand-bg/40 dark:bg-slate-800 text-brand-navy dark:text-white focus:outline-none focus:border-primary font-bold"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-brand-navy dark:text-gray-300 mb-1.5">
            Banner Subtitle
          </label>
          <input
            type="text"
            value={data.ctaBanner?.subheadline || ''}
            onChange={(e) => setData({ ...data, ctaBanner: { ...data.ctaBanner, subheadline: e.target.value } })}
            className="w-full text-xs p-3 rounded-xl border border-brand-border dark:border-slate-700 bg-brand-bg/40 dark:bg-slate-800 text-brand-navy dark:text-white focus:outline-none focus:border-primary"
          />
        </div>
      </div>

    </form>
  );
}
