'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Tag, Plus, Edit2, Check, Trash2, Save, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  desc: string;
  badge?: string;
  features: string[];
}

interface AddOn {
  id: string;
  name: string;
  price: string;
}

export default function AdminPricingPage() {
  const [plans, setPlans] = useState<PricingPlan[]>([
    {
      id: 'starter',
      name: 'Starter Sprint',
      price: '14,999',
      period: 'per project',
      desc: 'Perfect for small businesses and founders launching their first high-performance digital presence.',
      features: [
        'Up to 5 custom pages (Next.js 14)',
        '100% Mobile-responsive architecture',
        'Interactive contact / lead capture flows',
        'Fundamental SEO & metadata indexing',
        'Google Analytics 4 setup',
        '7-day delivery turnaround',
        '30-day post-launch warranty',
      ],
    },
    {
      id: 'growth',
      name: 'Growth Engine',
      price: '34,999',
      period: 'per project',
      desc: 'The complete enterprise solution for ambitious scaling businesses requiring conversion dominance.',
      badge: 'Most Popular',
      features: [
        'Up to 15 custom pages (Next.js 14)',
        'Bespoke Figma UI/UX design system',
        'Admin CMS / Client portal module',
        'Advanced JSON-LD Schema & SEO rankings',
        'Studio Insights / Blog architecture',
        'Lighthouse 98+ performance guarantee',
        '14-day delivery turnaround',
        '60-day dedicated post-launch support',
      ],
    },
    {
      id: 'enterprise',
      name: 'Enterprise Bespoke',
      price: '74,999',
      period: 'per project',
      desc: 'Custom-engineered full-stack platforms, digital commerce engines, and dedicated sprint pods.',
      features: [
        'Unlimited scalable pages & routes',
        'Custom backend (Prisma SQLite / PostgreSQL)',
        'Payment gateways (Razorpay / Stripe / UPI)',
        'Multi-role agency manager & client portal',
        'Full API integrations & webhooks',
        'Automated client notifications',
        'Priority direct founder hotline',
        '90-day dedicated SLA warranty',
      ],
    },
    {
      id: 'film',
      name: 'Commercial Cinema 4K Shoot',
      price: '49,999',
      period: 'per ad film',
      desc: 'Feature-film grade commercial ad shoot on RED / ARRI 4K camera packages with DaVinci Resolve color grading.',
      badge: 'New Service',
      features: [
        'Creative scriptwriting & storyboard direction',
        'RED / ARRI 4K Cinema Camera packages',
        'Professional studio lighting & sound engineer',
        'High-converting TV & social cuts (16:9 & 9:16)',
        'Commercial broadcast rights & raw footage vault',
      ],
    },
  ]);

  const [addOns, setAddOns] = useState<AddOn[]>([
    { id: '1', name: 'Commercial Poster Design (Single)', price: '₹499' },
    { id: '2', name: 'Poster Campaign Bundle (10 designs)', price: '₹3,999' },
    { id: '3', name: 'Complete Visual Brand Identity Kit', price: '₹8,999' },
    { id: '4', name: 'High-Retention Video Reel Edit (60s)', price: '₹1,999' },
    { id: '5', name: 'Commercial Video Bundle (5 reels)', price: '₹8,499' },
    { id: '6', name: 'Cinema 4K Commercial Shoot (30s-60s)', price: '₹49,999' },
    { id: '7', name: 'SEO Ranking & Technical Retainer', price: '₹9,999/mo' },
    { id: '8', name: 'Social Media Growth Pack (30 creatives)', price: '₹14,999/mo' },
  ]);

  const [saved, setSaved] = useState(false);

  const handlePriceChange = (id: string, newPrice: string) => {
    setPlans(plans.map((p) => (p.id === id ? { ...p, price: newPrice } : p)));
  };

  const handleDescChange = (id: string, newDesc: string) => {
    setPlans(plans.map((p) => (p.id === id ? { ...p, desc: newDesc } : p)));
  };

  const handleAddOnChange = (id: string, newPrice: string) => {
    setAddOns(addOns.map((a) => (a.id === id ? { ...a, price: newPrice } : a)));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#1853CF] mb-1">
            <Tag className="w-4 h-4" /> Pricing & Retainer Architecture
          </div>
          <h1 className="text-3xl font-black uppercase text-[#0B1420] tracking-tight">
            Flexible Pricing Manager.
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Control your agency's sprint package rates, deliverables, and a la carte add-on pricing across the website.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/pricing"
            target="_blank"
            className="px-4 py-2.5 rounded-xl border border-blue-200 text-[#1853CF] text-xs font-bold hover:bg-blue-50"
          >
            Preview Public /pricing
          </Link>
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1853CF] hover:bg-blue-700 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md"
          >
            {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            <span>{saved ? 'Changes Saved!' : 'Save All Changes'}</span>
          </button>
        </div>
      </div>

      {/* Pricing Packages Editor */}
      <div className="space-y-4">
        <h2 className="text-sm font-black uppercase tracking-wider text-[#0B1420]">
          Core Sprint Packages
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="bg-white rounded-3xl border border-blue-100/90 p-6 shadow-xs space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="font-black text-lg uppercase text-[#0B1420]">{plan.name}</div>
                {plan.badge && (
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-[#1853CF] text-[10px] font-black uppercase">
                    {plan.badge}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Package Rate (₹)
                </label>
                <div className="flex items-center gap-2">
                  <span className="font-black text-slate-500">₹</span>
                  <input
                    type="text"
                    value={plan.price}
                    onChange={(e) => handlePriceChange(plan.id, e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-blue-100 bg-[#F8FAFF] font-black text-base text-[#1853CF] focus:outline-none focus:border-[#1853CF]"
                  />
                  <span className="text-xs text-slate-400 whitespace-nowrap">{plan.period}</span>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={plan.desc}
                  onChange={(e) => handleDescChange(plan.id, e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-blue-100 bg-[#F8FAFF] text-xs text-slate-700 font-medium focus:outline-none focus:border-[#1853CF]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Deliverables Checklist
                </label>
                <div className="space-y-1.5">
                  {plan.features.map((f, fi) => (
                    <div key={fi} className="text-xs text-slate-600 flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#1853CF] flex-shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* A La Carte Add-ons Editor */}
      <div className="space-y-4 pt-4 border-t border-slate-200">
        <h2 className="text-sm font-black uppercase tracking-wider text-[#0B1420]">
          Modular A La Carte Services
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {addOns.map((add) => (
            <div
              key={add.id}
              className="bg-white rounded-2xl border border-blue-100 p-4 shadow-xs space-y-2"
            >
              <div className="text-xs font-bold text-[#0B1420]">{add.name}</div>
              <div className="flex items-center gap-1.5 pt-1 border-t border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Rate:</span>
                <input
                  type="text"
                  value={add.price}
                  onChange={(e) => handleAddOnChange(add.id, e.target.value)}
                  className="w-full px-2 py-1 rounded-lg border border-blue-100 bg-[#F8FAFF] text-xs font-black text-[#1853CF]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

