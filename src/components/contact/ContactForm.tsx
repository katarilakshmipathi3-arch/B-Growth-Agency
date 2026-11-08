'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceInterest: 'Custom Website Development',
    budget: '₹25,000 - ₹50,000',
    timeline: 'Within 1 Month',
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
          type: 'contact',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          serviceInterest: formData.serviceInterest,
          budget: formData.budget,
          timeline: formData.timeline,
          message: formData.message,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to submit form');
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
      <div className="text-center py-12 px-6 bg-status-success/15 border border-status-success/30 rounded-3xl space-y-4">
        <CheckCircle2 className="w-14 h-14 text-status-success mx-auto" />
        <h4 className="text-2xl font-bold text-brand-navy dark:text-white">
          Inquiry Successfully Sent!
        </h4>
        <p className="text-sm text-brand-muted dark:text-gray-300 max-w-md mx-auto leading-relaxed">
          Thank you for reaching out to B Growth Agency. Our senior team has received your message and will reply via email or WhatsApp within 24 hours.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({
              name: '',
              email: '',
              phone: '',
              serviceInterest: 'Custom Website Development',
              budget: '₹25,000 - ₹50,000',
              timeline: 'Within 1 Month',
              message: '',
            });
          }}
          className="text-xs font-semibold text-primary hover:underline pt-2"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 rounded-xl bg-status-danger/10 text-status-danger text-sm font-medium">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy dark:text-gray-300 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Ananya Roy"
            className="w-full text-sm p-3.5 rounded-xl border border-brand-border dark:border-slate-700 bg-brand-bg/40 dark:bg-slate-800 text-brand-navy dark:text-white focus:outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy dark:text-gray-300 mb-2">
            Work Email *
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="ananya@company.com"
            className="w-full text-sm p-3.5 rounded-xl border border-brand-border dark:border-slate-700 bg-brand-bg/40 dark:bg-slate-800 text-brand-navy dark:text-white focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy dark:text-gray-300 mb-2">
            Phone / WhatsApp Number
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+91 98765 43210"
            className="w-full text-sm p-3.5 rounded-xl border border-brand-border dark:border-slate-700 bg-brand-bg/40 dark:bg-slate-800 text-brand-navy dark:text-white focus:outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy dark:text-gray-300 mb-2">
            Service of Interest
          </label>
          <select
            value={formData.serviceInterest}
            onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
            className="w-full text-sm p-3.5 rounded-xl border border-brand-border dark:border-slate-700 bg-brand-bg/40 dark:bg-slate-800 text-brand-navy dark:text-white focus:outline-none focus:border-primary"
          >
            <option value="Custom Website Development">Custom Website Development</option>
            <option value="Poster & Graphic Design">Poster & Graphic Design</option>
            <option value="Cinematic Video Editing">Cinematic Video Editing</option>
            <option value="Brand Identity & Strategy">Brand Identity & Strategy</option>
            <option value="Social Media Growth">Social Media Growth</option>
            <option value="Search Engine Optimization">Search Engine Optimization</option>
            <option value="Custom Agency Retainer">Custom Agency Retainer</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy dark:text-gray-300 mb-2">
            Target Budget
          </label>
          <select
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            className="w-full text-sm p-3.5 rounded-xl border border-brand-border dark:border-slate-700 bg-brand-bg/40 dark:bg-slate-800 text-brand-navy dark:text-white focus:outline-none focus:border-primary"
          >
            <option value="Under ₹15,000">Under ₹15,000</option>
            <option value="₹15,000 - ₹35,000">₹15,000 - ₹35,000</option>
            <option value="₹35,000 - ₹75,000">₹35,000 - ₹75,000</option>
            <option value="₹75,000+">₹75,000+ (High-Volume)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy dark:text-gray-300 mb-2">
            Desired Timeline
          </label>
          <select
            value={formData.timeline}
            onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
            className="w-full text-sm p-3.5 rounded-xl border border-brand-border dark:border-slate-700 bg-brand-bg/40 dark:bg-slate-800 text-brand-navy dark:text-white focus:outline-none focus:border-primary"
          >
            <option value="Immediate / Rush (Under 1 Week)">Immediate / Rush (Under 1 Week)</option>
            <option value="Within 2-3 Weeks">Within 2-3 Weeks</option>
            <option value="Within 1 Month">Within 1 Month</option>
            <option value="Flexible / Future Planning">Flexible / Future Planning</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy dark:text-gray-300 mb-2">
          Project Brief & Objectives *
        </label>
        <textarea
          required
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Tell us about your brand, current challenges, and what deliverables you are looking for..."
          className="w-full text-sm p-3.5 rounded-xl border border-brand-border dark:border-slate-700 bg-brand-bg/40 dark:bg-slate-800 text-brand-navy dark:text-white focus:outline-none focus:border-primary resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full sm:w-auto px-9 py-4 bg-primary hover:bg-primary-hover text-white text-sm font-semibold rounded-xl shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-50"
      >
        <span>{loading ? 'Submitting Details...' : 'Send Message & Book Call'}</span>
        <Send className="w-4 h-4" />
      </button>
    </form>
  );
}
