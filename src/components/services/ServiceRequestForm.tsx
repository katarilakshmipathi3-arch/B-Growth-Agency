'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export default function ServiceRequestForm({ serviceTitle }: { serviceTitle: string }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    budget: '₹25,000 - ₹50,000',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'quote',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          serviceInterest: serviceTitle,
          budget: formData.budget,
          message: formData.message || `Interested in ${serviceTitle}`,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to submit inquiry');
      }

      setSubmitted(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="p-6 bg-status-success/15 border border-status-success/30 rounded-2xl text-center space-y-3">
        <CheckCircle2 className="w-10 h-10 text-status-success mx-auto" />
        <h5 className="font-bold text-sm text-brand-navy dark:text-white">
          Request Received!
        </h5>
        <p className="text-xs text-brand-muted dark:text-gray-300 leading-relaxed">
          Thanks for reaching out about <span className="font-semibold text-primary">{serviceTitle}</span>. Our team will review your requirements and reach out within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3.5">
      {error && (
        <div className="p-2.5 rounded-xl bg-status-danger/10 text-status-danger text-xs">
          {error}
        </div>
      )}

      <div>
        <label className="block text-xs font-semibold text-brand-navy dark:text-gray-300 mb-1">
          Your Full Name *
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g. Rahul Sharma"
          className="w-full text-xs p-2.5 rounded-xl border border-brand-border dark:border-slate-700 bg-brand-bg/50 dark:bg-slate-800 focus:outline-none focus:border-primary"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-brand-navy dark:text-gray-300 mb-1">
          Work Email *
        </label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="rahul@company.com"
          className="w-full text-xs p-2.5 rounded-xl border border-brand-border dark:border-slate-700 bg-brand-bg/50 dark:bg-slate-800 focus:outline-none focus:border-primary"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-brand-navy dark:text-gray-300 mb-1">
          Phone / WhatsApp
        </label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="+91 98765 43210"
          className="w-full text-xs p-2.5 rounded-xl border border-brand-border dark:border-slate-700 bg-brand-bg/50 dark:bg-slate-800 focus:outline-none focus:border-primary"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-brand-navy dark:text-gray-300 mb-1">
          Target Budget
        </label>
        <select
          value={formData.budget}
          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
          className="w-full text-xs p-2.5 rounded-xl border border-brand-border dark:border-slate-700 bg-brand-bg/50 dark:bg-slate-800 focus:outline-none focus:border-primary"
        >
          <option value="Under ₹15,000">Under ₹15,000</option>
          <option value="₹15,000 - ₹35,000">₹15,000 - ₹35,000</option>
          <option value="₹35,000 - ₹75,000">₹35,000 - ₹75,000</option>
          <option value="₹75,000+">₹75,000+ (Enterprise)</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-brand-navy dark:text-gray-300 mb-1">
          Project Notes or Goals
        </label>
        <textarea
          rows={3}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Briefly describe what you want to achieve..."
          className="w-full text-xs p-2.5 rounded-xl border border-brand-border dark:border-slate-700 bg-brand-bg/50 dark:bg-slate-800 focus:outline-none focus:border-primary resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-primary hover:bg-primary-hover text-white text-xs font-semibold rounded-xl transition-colors shadow-md flex items-center justify-center gap-1.5 disabled:opacity-50"
      >
        <span>{loading ? 'Submitting...' : 'Request Proposal'}</span>
        <Send className="w-3.5 h-3.5" />
      </button>
    </form>
  );
}
