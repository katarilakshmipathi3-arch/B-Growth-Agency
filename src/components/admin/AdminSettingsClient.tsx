'use client';

import React, { useState } from 'react';
import { Save, CheckCircle2 } from 'lucide-react';

export default function AdminSettingsClient({ initialSettings }: { initialSettings: Record<string, string> }) {
  const [settings, setSettings] = useState(initialSettings);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (key: string, val: string) => {
    setSettings(prev => ({ ...prev, [key]: val }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        {saved && (
          <div className="flex items-center gap-1.5 text-status-success text-xs font-bold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Settings saved successfully!</span>
          </div>
        )}
        <div className="ml-auto">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-primary hover:bg-primary-hover text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-md disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save Site Settings'}</span>
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-brand-border dark:border-slate-800 shadow-soft space-y-4">
        <h3 className="font-bold text-sm text-brand-navy dark:text-white border-b border-brand-border dark:border-slate-800 pb-3">
          Brand & Identity
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-brand-navy dark:text-gray-300 mb-1">Site Title</label>
            <input
              type="text"
              value={settings.siteName || 'B Growth Agency'}
              onChange={(e) => handleChange('siteName', e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-brand-border dark:border-slate-700 bg-brand-bg/40 dark:bg-slate-800"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-brand-navy dark:text-gray-300 mb-1">Tagline</label>
            <input
              type="text"
              value={settings.tagline || 'We Build Brands That Grow'}
              onChange={(e) => handleChange('tagline', e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-brand-border dark:border-slate-700 bg-brand-bg/40 dark:bg-slate-800"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-brand-navy dark:text-gray-300 mb-1">Logo URL Path</label>
            <input
              type="text"
              value={settings.logoUrl || '/logo.png'}
              onChange={(e) => handleChange('logoUrl', e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-brand-border dark:border-slate-700 bg-brand-bg/40 dark:bg-slate-800"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-brand-navy dark:text-gray-300 mb-1">Favicon URL Path</label>
            <input
              type="text"
              value={settings.faviconUrl || '/logo.png'}
              onChange={(e) => handleChange('faviconUrl', e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-brand-border dark:border-slate-700 bg-brand-bg/40 dark:bg-slate-800"
            />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-brand-border dark:border-slate-800 shadow-soft space-y-4">
        <h3 className="font-bold text-sm text-brand-navy dark:text-white border-b border-brand-border dark:border-slate-800 pb-3">
          Contact Details & WhatsApp Chat
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-brand-navy dark:text-gray-300 mb-1">Contact Email</label>
            <input
              type="email"
              value={settings.contactEmail || 'contact@bgrowth.agency'}
              onChange={(e) => handleChange('contactEmail', e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-brand-border dark:border-slate-700 bg-brand-bg/40 dark:bg-slate-800"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-brand-navy dark:text-gray-300 mb-1">Contact Phone</label>
            <input
              type="text"
              value={settings.contactPhone || '+91 98765 43210'}
              onChange={(e) => handleChange('contactPhone', e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-brand-border dark:border-slate-700 bg-brand-bg/40 dark:bg-slate-800"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-brand-navy dark:text-gray-300 mb-1">WhatsApp Number (with country code)</label>
            <input
              type="text"
              value={settings.whatsappNumber || '+919876543210'}
              onChange={(e) => handleChange('whatsappNumber', e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-brand-border dark:border-slate-700 bg-brand-bg/40 dark:bg-slate-800"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-brand-navy dark:text-gray-300 mb-1">Studio Address</label>
          <input
            type="text"
            value={settings.address || 'Tech Innovation Hub, 4th Floor, HITEC City, Hyderabad, India'}
            onChange={(e) => handleChange('address', e.target.value)}
            className="w-full text-xs p-2.5 rounded-xl border border-brand-border dark:border-slate-700 bg-brand-bg/40 dark:bg-slate-800"
          />
        </div>
      </div>
    </form>
  );
}
