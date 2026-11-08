import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { ArrowRight, Check, Star, Zap } from 'lucide-react';

export const metadata = {
  title: 'Pricing — Transparent, Fixed-Price Packages',
  description: 'B Growth Agency pricing plans for website development, graphic design, and video editing. No hidden fees.',
};

export const revalidate = 0;

const plans = [
  {
    name: 'Starter',
    price: '14,999',
    period: 'per project',
    desc: 'Perfect for small businesses and personal brands launching their first professional web presence.',
    color: 'border-[#E0E2DA]',
    cta: 'bg-[#F4F5F0] text-[#0B1420] hover:bg-[#E0E2DA]',
    features: [
      'Up to 5 pages (Next.js)',
      'Mobile-responsive design',
      'Contact form integration',
      'Basic SEO setup',
      'Google Analytics integration',
      '1 round of revisions',
      '30-day post-launch support',
    ],
  },
  {
    name: 'Business',
    price: '34,999',
    period: 'per project',
    desc: 'The complete solution for growing businesses needing a powerful, conversion-optimised website.',
    color: 'border-[#1F5FE6] ring-2 ring-[#1F5FE6]/20',
    badge: 'Most Popular',
    cta: 'bg-[#1F5FE6] text-white hover:bg-[#1749C0]',
    features: [
      'Up to 15 pages (Next.js)',
      'Custom UI design system',
      'CMS / Admin panel',
      'Advanced SEO & Schema markup',
      'Blog module',
      'Performance optimisation (95+ Lighthouse)',
      '2 rounds of revisions',
      '60-day post-launch support',
    ],
  },
  {
    name: 'Enterprise',
    price: '74,999',
    period: 'per project',
    desc: 'Fully bespoke web applications with custom backend, complex integrations, and dedicated support.',
    color: 'border-[#0F1117] bg-[#0F1117]',
    dark: true,
    cta: 'bg-white text-[#0F1117] hover:bg-gray-100',
    features: [
      'Unlimited pages',
      'Custom backend (Prisma/PostgreSQL)',
      'API integrations',
      'Multi-role admin portal',
      'E-commerce module',
      'Automated email flows',
      'Unlimited revisions',
      '90-day dedicated support',
    ],
  },
];

const addOns = [
  { name: 'Poster Design (single)', price: '₹499' },
  { name: 'Poster Bundle (10 designs)', price: '₹3,999' },
  { name: 'Poster + Brand Kit', price: '₹8,999' },
  { name: 'Video Reel Edit (60s)', price: '₹1,999' },
  { name: 'Video Bundle (5 reels)', price: '₹8,499' },
  { name: 'Brand Identity System', price: '₹12,999' },
  { name: 'SEO Monthly Retainer', price: '₹9,999/mo' },
  { name: 'Social Media Pack (30 posts)', price: '₹14,999/mo' },
];

export default async function PricingPage() {
  const faqs = await prisma.fAQ.findMany({ where: { category: 'Pricing' }, orderBy: { order: 'asc' } });

  return (
    <div className="min-h-screen bg-[#EAECE8]">

      {/* ================================================================
          HERO
          ================================================================ */}
      <section className="hero-blue py-28 md:py-36">
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 text-center">
          <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-blue-200/70 mb-6">
            B GROWTH AGENCY · TRANSPARENT PRICING
          </div>
          <h1 className="text-[clamp(2.5rem,7vw,6rem)] font-black leading-[0.95] tracking-tight uppercase text-white mb-8 max-w-4xl mx-auto">
            FIXED PRICES.<br />
            <span className="text-blue-200">ZERO SURPRISES.</span>
          </h1>
          <p className="text-blue-100 text-xl leading-relaxed max-w-2xl mx-auto">
            Every engagement is priced transparently upfront. No retainers you don't need, 
            no scope creep, no hidden agency overhead.
          </p>
        </div>
      </section>

      {/* ================================================================
          PRICING CARDS
          ================================================================ */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="mb-14 text-center">
            <div className="section-label text-center">Website Development Plans</div>
            <h2 className="text-4xl sm:text-5xl font-black uppercase text-[#0B1420]">
              CHOOSE YOUR<br />WEB PACKAGE.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div key={plan.name} className={`relative border rounded-2xl p-8 flex flex-col ${plan.color} ${plan.dark ? 'text-white' : ''}`}>
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#1F5FE6] text-white text-[11px] font-black px-5 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                    <Star className="w-3 h-3" fill="white" /> {plan.badge}
                  </div>
                )}
                <div className="mb-6">
                  <div className={`text-[11px] font-bold uppercase tracking-widest mb-2 ${plan.dark ? 'text-gray-400' : 'text-[#6B7384]'}`}>
                    {plan.name}
                  </div>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className={`text-4xl font-black ${plan.dark ? 'text-white' : 'text-[#0B1420]'}`}>₹{plan.price}</span>
                  </div>
                  <div className={`text-xs ${plan.dark ? 'text-gray-500' : 'text-[#6B7384]'}`}>{plan.period}</div>
                </div>

                <p className={`text-sm leading-relaxed mb-7 ${plan.dark ? 'text-gray-300' : 'text-[#6B7384]'}`}>{plan.desc}</p>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm">
                      <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.dark ? 'text-blue-400' : 'text-[#1F5FE6]'}`} />
                      <span className={plan.dark ? 'text-gray-200' : 'text-[#3A4152]'}>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/quote?plan=${encodeURIComponent(plan.name)}`}
                  className={`w-full text-center py-3.5 font-bold text-sm uppercase tracking-wide rounded-xl transition-all ${plan.cta}`}
                >
                  Get Started →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          ADD-ONS
          ================================================================ */}
      <section className="bg-[#EAECE8] py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="mb-14">
            <div className="section-label">Design & Video Add-Ons</div>
            <h2 className="text-4xl sm:text-5xl font-black uppercase text-[#0B1420] max-w-2xl leading-[1]">
              CREATIVE SERVICES<br />A LA CARTE.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {addOns.map((addon, i) => (
              <div key={i} className="bg-white border border-[#E0E2DA] rounded-xl p-6 hover:border-[#1F5FE6] transition-colors flex items-center justify-between gap-4">
                <div className="text-sm font-bold text-[#0B1420]">{addon.name}</div>
                <div className="text-[#1F5FE6] font-black text-sm flex-shrink-0">{addon.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          CUSTOM QUOTE CTA
          ================================================================ */}
      <section className="hero-blue py-24">
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-5 py-2 rounded-full mb-6">
            <Zap className="w-4 h-4 text-blue-200" />
            <span className="text-blue-100 text-xs font-bold uppercase tracking-widest">Need a Custom Package?</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black uppercase text-white mb-6">
            LET US BUILD<br />THE PERFECT PLAN.
          </h2>
          <p className="text-blue-100 text-lg max-w-xl mx-auto mb-10">
            Monthly retainers, custom scope, or multi-service bundles — 
            we'll create a package that fits your exact growth goals and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quote" className="btn-primary shadow-lg shadow-black/25">
              Calculate My Quote <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="btn-outline-white">
              Talk to Us First
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
