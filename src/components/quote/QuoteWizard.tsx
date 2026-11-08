'use client';

import React, { useState } from 'react';
import { 
  Code2, 
  Palette, 
  Video, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Send, 
  CheckCircle2 
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuoteData {
  service: string;
  scope: string[];
  budget: string;
  timeline: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
}

export default function QuoteWizard() {
  const [step, setStep] = useState<number>(1);
  const [data, setData] = useState<QuoteData>({
    service: 'Custom Website Development',
    scope: ['Mobile-First Next.js Responsive', 'CMS Admin Access'],
    budget: '₹25,000 - ₹50,000',
    timeline: 'Within 3-4 Weeks',
    name: '',
    email: '',
    phone: '',
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const services = [
    { id: 'Custom Website Development', icon: Code2, title: 'Web Development', desc: 'Bespoke Next.js apps, corporate portals & e-commerce' },
    { id: 'Poster & Graphic Design', icon: Palette, title: 'Poster & Graphic Design', desc: 'Commercial flyers, billboard posters, social banners' },
    { id: 'Cinematic Video Editing', icon: Video, title: 'Video Editing & Motion', desc: 'Viral Reels, YouTube long-form, corporate explainers' },
    { id: 'Full Digital Growth Retainer', icon: Sparkles, title: 'All-In-One Retainer', desc: 'Combined web engineering, daily graphics & video' },
  ];

  const toggleScope = (item: string) => {
    setData((prev) => {
      const exists = prev.scope.includes(item);
      return {
        ...prev,
        scope: exists ? prev.scope.filter((s) => s !== item) : [...prev.scope, item],
      };
    });
  };

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
          name: data.name,
          email: data.email,
          phone: data.phone,
          serviceInterest: data.serviceInterest || data.service,
          budget: data.budget,
          timeline: data.timeline,
          message: data.notes || `Multi-step quote request for ${data.service}`,
          details: {
            service: data.service,
            selectedScope: data.scope,
            budget: data.budget,
            timeline: data.timeline,
          },
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to submit quote');
      }

      setSubmitted(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Something went wrong submitting your quote request.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-16 px-6 space-y-6">
        <CheckCircle2 className="w-16 h-16 text-status-success mx-auto animate-bounce" />
        <div className="space-y-2">
          <h3 className="text-3xl font-extrabold text-brand-navy dark:text-white">
            Quote Blueprint Generated!
          </h3>
          <p className="text-sm text-brand-muted dark:text-gray-300 max-w-lg mx-auto leading-relaxed">
            Thank you, <span className="font-semibold text-primary">{data.name}</span>. Our lead digital architect has received your specifications for <span className="font-semibold">{data.service}</span>.
          </p>
        </div>

        <div className="p-6 bg-brand-bg dark:bg-slate-800 rounded-2xl max-w-md mx-auto text-left text-xs space-y-2 border border-brand-border dark:border-slate-700">
          <div className="flex justify-between">
            <span className="text-brand-muted">Target Service:</span>
            <span className="font-bold text-brand-navy dark:text-white">{data.service}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-brand-muted">Budget Window:</span>
            <span className="font-bold text-primary">{data.budget}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-brand-muted">Target Timeline:</span>
            <span className="font-bold text-brand-navy dark:text-white">{data.timeline}</span>
          </div>
        </div>

        <p className="text-xs text-brand-muted">
          We will contact you via <span className="font-semibold text-brand-navy dark:text-gray-200">{data.email}</span> within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      
      {/* Step Indicators */}
      <div className="flex items-center justify-between border-b border-brand-border dark:border-slate-800 pb-6">
        {[
          { stepNum: 1, label: 'Service' },
          { stepNum: 2, label: 'Scope' },
          { stepNum: 3, label: 'Timeline & Budget' },
          { stepNum: 4, label: 'Contact Details' },
        ].map((item) => (
          <div key={item.stepNum} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                step === item.stepNum
                  ? 'bg-primary text-white ring-4 ring-primary/20'
                  : step > item.stepNum
                  ? 'bg-status-success text-white'
                  : 'bg-brand-bg dark:bg-slate-800 text-brand-muted'
              }`}
            >
              {step > item.stepNum ? <Check className="w-4 h-4" /> : item.stepNum}
            </div>
            <span className="hidden sm:inline text-xs font-semibold text-brand-navy dark:text-gray-300">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {error && (
        <div className="p-3 bg-status-danger/10 text-status-danger text-xs rounded-xl">
          {error}
        </div>
      )}

      {/* STEP 1: Select Service */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-brand-navy dark:text-white">
              What primary solution does your brand need?
            </h3>
            <p className="text-xs text-brand-muted dark:text-gray-400">
              Select the core discipline for this engagement.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map((s) => {
              const Icon = s.icon;
              const isSelected = data.service === s.id;

              return (
                <div
                  key={s.id}
                  onClick={() => setData({ ...data, service: s.id })}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-primary bg-primary-tint/30 dark:bg-primary/10 shadow-sm ring-2 ring-primary/20'
                      : 'border-brand-border dark:border-slate-800 hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-primary text-white' : 'bg-primary-tint dark:bg-slate-800 text-primary'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-brand-navy dark:text-white">
                        {s.title}
                      </h4>
                      <p className="text-xs text-brand-muted dark:text-gray-400 mt-1 leading-relaxed">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={() => setStep(2)}
              className="px-6 py-3 bg-primary hover:bg-primary-hover text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-md"
            >
              <span>Next: Project Scope</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Scope & Features */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-brand-navy dark:text-white">
              Which capabilities should be included?
            </h3>
            <p className="text-xs text-brand-muted dark:text-gray-400">
              Select all that apply to your requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              'Mobile-First Next.js Responsive',
              'Self-Serve CMS Admin Access',
              'Payment Gateway Integration (UPI, Stripe, Cards)',
              'SEO Technical Audit & Schema Markup',
              'High-Resolution Print Posters (300 DPI CMYK)',
              'Social Media Multi-Format Ad Variants',
              'Viral Reels / TikTok Video Editing (9:16)',
              'DaVinci Resolve Color Grading & Sound FX',
              'Custom Logo & Full Brand Identity Guidelines',
              'Dedicated Monthly Creative Retainer Support',
            ].map((feature) => {
              const checked = data.scope.includes(feature);
              return (
                <div
                  key={feature}
                  onClick={() => toggleScope(feature)}
                  className={`p-3.5 rounded-xl border cursor-pointer flex items-center justify-between text-xs font-semibold transition-all ${
                    checked
                      ? 'border-primary bg-primary-tint/20 text-brand-navy dark:text-white'
                      : 'border-brand-border dark:border-slate-800 text-brand-muted hover:border-brand-navy/30'
                  }`}
                >
                  <span>{feature}</span>
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                      checked
                        ? 'bg-primary border-primary text-white'
                        : 'border-brand-border dark:border-slate-700 bg-white dark:bg-slate-800'
                    }`}
                  >
                    {checked && <Check className="w-3.5 h-3.5" />}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setStep(1)}
              className="px-5 py-2.5 border border-brand-border dark:border-slate-700 text-xs font-semibold rounded-xl text-brand-navy dark:text-white flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={() => setStep(3)}
              className="px-6 py-3 bg-primary hover:bg-primary-hover text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-md"
            >
              <span>Next: Timeline & Budget</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Timeline & Budget */}
      {step === 3 && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-brand-navy dark:text-white">
              What is your ideal budget & target completion date?
            </h3>
            <p className="text-xs text-brand-muted dark:text-gray-400">
              Helps us match you with the appropriate lead architect and designer.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-brand-navy dark:text-gray-300 mb-2">
                Estimated Project Budget
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {['Under ₹15,000', '₹15k - ₹35k', '₹35k - ₹75k', '₹75,000+'].map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setData({ ...data, budget: b })}
                    className={`p-3 rounded-xl border text-xs font-semibold transition-all ${
                      data.budget === b
                        ? 'border-primary bg-primary text-white shadow-sm'
                        : 'border-brand-border dark:border-slate-800 text-brand-navy dark:text-gray-300 hover:border-primary'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <label className="block text-xs font-bold uppercase text-brand-navy dark:text-gray-300 mb-2">
                Launch Target Timeline
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {['Rush (< 1 Week)', '2-3 Weeks', 'Within 1 Month', 'Flexible'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setData({ ...data, timeline: t })}
                    className={`p-3 rounded-xl border text-xs font-semibold transition-all ${
                      data.timeline === t
                        ? 'border-primary bg-primary text-white shadow-sm'
                        : 'border-brand-border dark:border-slate-800 text-brand-navy dark:text-gray-300 hover:border-primary'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setStep(2)}
              className="px-5 py-2.5 border border-brand-border dark:border-slate-700 text-xs font-semibold rounded-xl text-brand-navy dark:text-white flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={() => setStep(4)}
              className="px-6 py-3 bg-primary hover:bg-primary-hover text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-md"
            >
              <span>Next: Contact Info</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Contact & Finalize */}
      {step === 4 && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-brand-navy dark:text-white">
              Where should we send your itemized proposal?
            </h3>
            <p className="text-xs text-brand-muted dark:text-gray-400">
              We respect your privacy and will never send spam.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-brand-navy dark:text-gray-300 mb-1.5">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                placeholder="Rohan Sharma"
                className="w-full text-xs p-3 rounded-xl border border-brand-border dark:border-slate-700 bg-brand-bg/40 dark:bg-slate-800 text-brand-navy dark:text-white focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-brand-navy dark:text-gray-300 mb-1.5">
                Work Email *
              </label>
              <input
                type="email"
                required
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                placeholder="rohan@company.com"
                className="w-full text-xs p-3 rounded-xl border border-brand-border dark:border-slate-700 bg-brand-bg/40 dark:bg-slate-800 text-brand-navy dark:text-white focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-brand-navy dark:text-gray-300 mb-1.5">
              Phone / WhatsApp Number
            </label>
            <input
              type="tel"
              value={data.phone}
              onChange={(e) => setData({ ...data, phone: e.target.value })}
              placeholder="+91 98765 43210"
              className="w-full text-xs p-3 rounded-xl border border-brand-border dark:border-slate-700 bg-brand-bg/40 dark:bg-slate-800 text-brand-navy dark:text-white focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-brand-navy dark:text-gray-300 mb-1.5">
              Additional Project Notes or Existing Website Link
            </label>
            <textarea
              rows={3}
              value={data.notes}
              onChange={(e) => setData({ ...data, notes: e.target.value })}
              placeholder="Tell us any specific references or requirements..."
              className="w-full text-xs p-3 rounded-xl border border-brand-border dark:border-slate-700 bg-brand-bg/40 dark:bg-slate-800 text-brand-navy dark:text-white focus:outline-none focus:border-primary resize-none"
            />
          </div>

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => setStep(3)}
              className="px-5 py-2.5 border border-brand-border dark:border-slate-700 text-xs font-semibold rounded-xl text-brand-navy dark:text-white flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3.5 bg-primary hover:bg-primary-hover text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-lg disabled:opacity-50"
            >
              <span>{loading ? 'Generating Proposal...' : 'Submit & Receive Proposal'}</span>
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      )}

    </div>
  );
}
