import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { ArrowRight, Check, Star, Zap, ShieldCheck, Clock, Sparkles } from 'lucide-react';
import PricingRoiCalculator from '@/components/pricing/PricingRoiCalculator';

export const metadata = {
  title: 'Pricing — Transparent, Fixed-Price Packages | B Growth Agency',
  description: 'B Growth Agency pricing plans for website development, graphic design, and video editing. No hidden fees.',
};

export const revalidate = 0;

const plans = [
  {
    name: 'Starter Sprint',
    price: '14,999',
    period: 'per project',
    desc: 'Perfect for small businesses and founders launching their first high-performance digital presence.',
    color: 'border-blue-100 hover:border-[#1853CF]',
    cta: 'bg-blue-50 text-[#1853CF] hover:bg-[#1853CF] hover:text-white',
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
    name: 'Growth Engine',
    price: '34,999',
    period: 'per project',
    desc: 'The complete enterprise solution for ambitious scaling businesses requiring conversion dominance.',
    color: 'border-[#1853CF] shadow-xl ring-2 ring-[#1853CF]/20',
    badge: 'Most Popular',
    cta: 'bg-[#1853CF] text-white hover:bg-blue-700 shadow-md',
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
    name: 'Enterprise Bespoke',
    price: '74,999',
    period: 'per project',
    desc: 'Custom-engineered full-stack platforms, digital commerce engines, and dedicated sprint pods.',
    color: 'border-blue-200 hover:border-[#1853CF]',
    cta: 'bg-[#1853CF] text-white hover:bg-blue-700 shadow-md',
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
];

const addOns = [
  { name: 'Commercial Poster Design (Single)', price: '₹499' },
  { name: 'Poster Campaign Bundle (10 designs)', price: '₹3,999' },
  { name: 'Complete Visual Brand Identity Kit', price: '₹8,999' },
  { name: 'High-Retention Video Reel Edit (60s)', price: '₹1,999' },
  { name: 'Commercial Video Bundle (5 reels)', price: '₹8,499' },
  { name: 'Cinema 4K Commercial Shoot (30s-60s)', price: '₹49,999' },
  { name: 'SEO Ranking & Technical Retainer', price: '₹9,999/mo' },
  { name: 'Social Media Growth Pack (30 creatives)', price: '₹14,999/mo' },
];

export default async function PricingPage() {
  const faqs = await prisma.fAQ.findMany({ 
    where: { category: 'Pricing' }, 
    orderBy: { order: 'asc' } 
  });

  return (
    <div className="min-h-screen bg-white">

      {/* ================================================================
          2-COLUMN HERO — Balanced, Rich, Responsive, No Empty Right Void
          ================================================================ */}
      <section className="hero-blue pt-20 sm:pt-24 pb-20 sm:pb-28">
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

            {/* Left Column: Heading & Value Prop */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold tracking-widest uppercase shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-blue-200" />
                <span>B GROWTH AGENCY · TRANSPARENT INVESTMENT</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.02] tracking-tight uppercase text-white">
                FIXED PRICES.<br />
                <span className="text-blue-200">ZERO SURPRISES.</span>
              </h1>

              <p className="text-blue-100 text-base sm:text-lg leading-relaxed max-w-xl">
                Every sprint engagement is priced transparently upfront. No retainers you don't need, no scope creep, and zero hidden agency overhead.
              </p>

              {/* Guarantees */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-white/15 text-white border border-white/15">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" /> Milestone-Based Payments
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-white/15 text-white border border-white/15">
                  <Clock className="w-3.5 h-3.5 text-blue-200" /> 7–14 Day Delivery Guarantees
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-white/15 text-white border border-white/15">
                  <Zap className="w-3.5 h-3.5 text-amber-300" /> 100% Code & Asset Ownership
                </span>
              </div>

              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  href="/quote"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-[#1853CF] hover:bg-blue-50 text-xs font-black uppercase tracking-wider rounded-xl transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
                >
                  <span>CALCULATE CUSTOM ESTIMATE</span>
                  <ArrowRight className="w-4 h-4 text-[#1853CF]" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs font-black uppercase tracking-wider rounded-xl border border-white/20 transition-all duration-200"
                >
                  <span>TALK TO ADHARSH</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Live Agency ROI & Budget Calculator (Unique Interactive Component) */}
            <div className="lg:col-span-5">
              <PricingRoiCalculator />
            </div>

          </div>
        </div>
      </section>

      {/* ================================================================
          PRICING TIERS — Crisp Pure White Section (#FFFFFF)
          ================================================================ */}
      <section className="bg-white py-20 sm:py-24 border-b border-blue-100/70">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="mb-14 text-center">
            <div className="text-xs font-black tracking-[0.2em] uppercase text-[#1853CF] mb-2">
              FIXED-SCOPE SPRINT PACKAGES
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-[#0B1420] tracking-tight">
              CHOOSE YOUR WEB PACKAGE.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`bg-white rounded-2xl border-2 p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${plan.color}`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <h3 className="text-xl font-black uppercase text-[#0B1420]">{plan.name}</h3>
                    {plan.badge && (
                      <span className="px-3 py-1 rounded-full bg-blue-100 text-[#1853CF] text-[10px] font-black uppercase tracking-wider">
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {plan.desc}
                  </p>

                  <div className="mb-6 pb-6 border-b border-slate-100">
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-black text-slate-500">₹</span>
                      <span className="text-4xl font-black text-[#0B1420] tracking-tight">{plan.price}</span>
                    </div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{plan.period}</span>
                  </div>

                  <div className="space-y-3 mb-8">
                    <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">Included Deliverables</div>
                    {plan.features.map((f, fi) => (
                      <div key={fi} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <Check className="w-4 h-4 text-[#1853CF] flex-shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href={`/quote?package=${encodeURIComponent(plan.name)}`}
                  className={`w-full py-3.5 rounded-xl text-center text-xs font-black uppercase tracking-wider transition-all block ${plan.cta}`}
                >
                  Select Package →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          ADD-ON CAPABILITIES — Soft Ice Mist Background (#F8FAFF)
          ================================================================ */}
      <section className="bg-[#F8FAFF] py-20 sm:py-24 border-b border-blue-100/70">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="mb-12 text-center">
            <div className="text-xs font-black tracking-[0.2em] uppercase text-[#1853CF] mb-2">
              MODULAR CAPABILITIES
            </div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-[#0B1420] tracking-tight">
              A LA CARTE SPRINT ADD-ONS.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {addOns.map((item, i) => (
              <div key={i} className="p-5 rounded-2xl bg-white border border-blue-100 hover:border-[#1853CF] transition-all shadow-xs flex flex-col justify-between">
                <div className="text-xs font-bold text-[#0B1420] mb-3">{item.name}</div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Fixed Rate</span>
                  <span className="text-sm font-black text-[#1853CF]">{item.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          CTA — Floating Radiant Royal Blue Card Floating on White
          ================================================================ */}
      <section className="bg-white py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="rounded-3xl bg-gradient-to-br from-[#1853CF] via-[#1A54CE] to-[#1242AF] p-10 sm:p-14 lg:p-16 text-white text-center shadow-2xl relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/15 text-blue-100 text-xs font-black uppercase tracking-widest border border-white/20">
                Custom Scope Consultation
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight">
                NEED A CUSTOM SPRINT ARCHITECTURE?
              </h2>
              <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
                If your project spans multi-platform apps, cinema advertising film sets, or dedicated engineering retainers, let's architect a custom scope.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/quote"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#1853CF] hover:bg-blue-50 text-xs sm:text-sm font-black uppercase tracking-wider rounded-xl transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
                >
                  <span>REQUEST ITEMIZED ESTIMATE</span>
                  <ArrowRight className="w-4 h-4 text-[#1853CF]" />
                </Link>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-black uppercase tracking-wider rounded-xl border border-white/20 transition-all duration-200"
                >
                  <span>TALK WITH FOUNDER</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

