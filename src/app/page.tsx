import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import { ArrowRight, ArrowDown, Check, ExternalLink, Star, Play, Zap, Globe, Layers, Video } from 'lucide-react';
import HomeFeaturedWork from '@/components/home/HomeFeaturedWork';
import HomeFaqAccordion from '@/components/home/HomeFaqAccordion';
import HomeShowcaseGallery from '@/components/home/HomeShowcaseGallery';

export const revalidate = 0;

export const metadata = {
  title: 'B Growth Agency — Premium Web, Design & Video Studio',
  description: 'B Growth Agency builds high-performance Next.js websites, commercial poster designs, and cinematic video editing for brands that want to dominate their market.',
};

export default async function HomePage() {
  const [services, portfolio, testimonials, faqs] = await Promise.all([
    prisma.service.findMany({ where: { status: 'published' }, orderBy: { order: 'asc' }, take: 6 }),
    prisma.portfolioItem.findMany({ where: { status: 'published' }, orderBy: { order: 'asc' }, take: 6 }),
    prisma.testimonial.findMany({ where: { isFeatured: true }, orderBy: { order: 'asc' }, take: 3 }),
    prisma.fAQ.findMany({ orderBy: { order: 'asc' }, take: 6 }),
  ]);

  const stats = [
    { num: '150+', label: 'Projects Delivered' },
    { num: '98%', label: 'Client Satisfaction' },
    { num: '12+', label: 'Industries Served' },
    { num: '4yr', label: 'Studio Experience' },
  ];

  const whyUs = [
    { icon: Zap, title: 'Speed to Market', desc: 'Most projects delivered in 2–4 weeks, not months. Agile sprints with daily updates.' },
    { icon: Globe, title: 'Global Standards', desc: 'Next.js, Lighthouse 95+, WCAG AA — built to international engineering benchmarks.' },
    { icon: Layers, title: 'Full-Stack Creative', desc: 'Design, code, and motion all under one roof. No handoff chaos, pure execution.' },
    { icon: Star, title: 'Fixed-Price Clarity', desc: 'No hidden retainer fees. Clear milestones, deliverables agreed before work begins.' },
  ];

  const process = [
    { n: '01', title: 'Diagnose (The Hospital Audit)', desc: 'Deep anatomical business audit. We pinpoint exactly where your conversion funnel or brand leaks before prescribing any solution.' },
    { n: '02', title: 'Prescribe (Growth Architecture)', desc: 'Custom Next.js technical blueprint, cinema ad script, or design system — engineered for compounding ROI with zero fluff.' },
    { n: '03', title: 'Prototype (Figma UI & Motion)', desc: 'Pixel-perfect UI design systems, commercial poster visuals, and camera storyboards approved before code or film rolls.' },
    { n: '04', title: 'Engineer & Shoot (Next.js & 4K Film)', desc: 'Next.js 14 App Router, TypeScript, RED/ARRI 4K camera production, and DaVinci Resolve color grading in our studio.' },
    { n: '05', title: 'Validate (Lighthouse 98+ & CRO)', desc: 'Sub-second speed optimization, JSON-LD Schema, WCAG accessibility, and behavioral conversion rate testing.' },
    { n: '06', title: 'Scale & Operate (Live Client Portal)', desc: 'Transparent client portal tracking, daily sprint updates, and compounding growth systems that build an unfair market moat.' },
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* ================================================================
          HERO — Full-bleed Royal Blue, covering all the way to the top edge
          ================================================================ */}
      <section className="hero-blue pt-8 sm:pt-12 pb-16 sm:pb-20">
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-10 lg:px-16">
          
          {/* Top micro-label */}
          <div className="pt-2 pb-6">
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-blue-200/80">
              B GROWTH AGENCY · DESIGN & ENGINEERING STUDIO · HYDERABAD
            </span>
          </div>

          {/* 2-Column Perfectly Aligned Grid: Top-aligned so Founder Circle matches Headline top level */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start py-6 sm:py-8">
            
            {/* Left Column — Brand Statement & Actions */}
            <div className="space-y-6 sm:space-y-7 flex flex-col justify-start">
              <h1 className="text-3xl sm:text-5xl lg:text-[3.8rem] xl:text-[4.4rem] font-black leading-[1.03] tracking-tight uppercase text-white">
                WE BUILD<br />
                <span className="text-blue-200">BRANDS</span><br />
                THAT GROW.
              </h1>

              <p className="text-blue-100 text-base sm:text-lg lg:text-xl leading-relaxed font-normal max-w-lg">
                High-performance Next.js websites, scroll-stopping commercial posters, 
                and retention-edited video post-production — engineered to convert audiences into revenue.
              </p>

              <div className="flex flex-wrap gap-4 items-center pt-1">
                <Link href="/quote" className="btn-primary shadow-xl shadow-black/25">
                  Get Free Proposal
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/portfolio" className="btn-outline-white">
                  View Our Work
                </Link>
              </div>

              {/* Trust signals */}
              <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6 text-blue-200 text-xs font-bold tracking-wider uppercase">
                <span className="inline-flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400" /> Fixed-Price Packages</span>
                <span className="text-blue-300/40">|</span>
                <span className="inline-flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400" /> 2–4 Week Delivery</span>
                <span className="text-blue-300/40">|</span>
                <span className="inline-flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400" /> 100% Satisfaction</span>
              </div>
            </div>

            {/* Right Column — High-Growth Business Partners & Happy Founders Studio Showcase */}
            <div className="flex flex-col items-center justify-start lg:pt-1">
              <div className="relative group w-full max-w-md lg:max-w-none">
                {/* Outer halo glow ring */}
                <div className="absolute -inset-4 rounded-3xl bg-white/20 blur-3xl opacity-80 group-hover:opacity-100 transition-opacity" />
                
                {/* High-res Image of Ambitious Business Founders & Team (Group of 5 in Blue/White Palette) */}
                <div className="relative w-full h-80 sm:h-96 lg:h-[430px] rounded-3xl overflow-hidden border-4 border-white shadow-[0_25px_60px_rgba(0,0,0,0.4)] bg-slate-900">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80"
                    alt="High Growth Business Team & Founders Scaling with B Growth Agency"
                    className="w-full h-full object-cover object-[50%_25%] group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

                  {/* Top floating trust pill */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-[#0B1420] px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider shadow-lg flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Dedicated Client Growth Pod · 4.9/5 Rating</span>
                  </div>

                  {/* Bottom inner badge */}
                  <div className="absolute bottom-16 sm:bottom-18 left-4 right-4 text-white">
                    <div className="text-[10px] uppercase font-bold tracking-widest text-blue-200">Engineering & Creative Pod</div>
                    <div className="text-base sm:text-lg font-black uppercase leading-tight">Scale Ambitious Brands With Us</div>
                  </div>
                </div>

                {/* Floating Impact Metrics Card */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[92%] bg-white text-[#0B1420] p-4 sm:p-5 rounded-2xl shadow-[0_20px_45px_rgba(0,0,0,0.3)] border-2 border-white flex items-center justify-around z-20">
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-black text-[#1853CF] tracking-tight">+340%</div>
                    <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">Pipeline Uplift</div>
                  </div>
                  <div className="h-8 w-px bg-slate-200" />
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-black text-[#0B1420] tracking-tight">₹10Cr+</div>
                    <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">Attributed Rev</div>
                  </div>
                  <div className="h-8 w-px bg-slate-200" />
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-black text-emerald-600 tracking-tight">100%</div>
                    <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">On-Time Sprints</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ================================================================
          STATS STRIP — Floating Rounded Card Bridging Hero & Page
          ================================================================ */}
      <section id="stats" className="relative z-20 -mt-8 sm:-mt-12 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl p-7 sm:p-10 shadow-[0_20px_60px_-15px_rgba(24,83,207,0.18)] border border-slate-200/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            {stats.map((s) => (
              <div key={s.num} className="text-center space-y-1.5 pt-4 md:pt-0">
                <div className="text-4xl sm:text-5xl font-black text-[#1853CF] tracking-tight">{s.num}</div>
                <div className="text-[11px] font-bold tracking-widest uppercase text-slate-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          CLIENT LOGOS MARQUEE — Infinite Smooth Scroll with Real Brand Logos & Larger Cards
          ================================================================ */}
      <section className="bg-[#F8FAFF] pt-20 pb-16 border-b border-blue-100/80 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 mb-8 text-center">
          <span className="text-xs font-black tracking-[0.2em] uppercase text-[#1853CF] bg-blue-100/70 border border-blue-200/60 px-5 py-2 rounded-full inline-flex items-center gap-2 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#1853CF] animate-pulse" />
            TRUSTED BY HIGH-GROWTH BRANDS & CREATORS
          </span>
        </div>

        {/* Gradient edge masks for graceful fade */}
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-r from-[#F8FAFF] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-l from-[#F8FAFF] to-transparent z-10 pointer-events-none" />

        {/* Continuous Smooth Infinite Marquee */}
        <div className="flex animate-marquee gap-6 sm:gap-8 items-stretch">
          {[
            {
              name: 'APEX WEALTH',
              tag: 'FINTECH LEADER',
              svg: (
                <svg className="w-6 h-6 text-[#1853CF] group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 2 22 22 22" />
                  <line x1="12" y1="9" x2="12" y2="15" />
                </svg>
              ),
            },
            {
              name: 'ZENITH AI',
              tag: 'ENTERPRISE TECH',
              svg: (
                <svg className="w-6 h-6 text-[#1853CF] group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              ),
            },
            {
              name: 'SOLARIA FESTIVAL',
              tag: 'GLOBAL MEDIA',
              svg: (
                <svg className="w-6 h-6 text-[#1853CF] group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                </svg>
              ),
            },
            {
              name: 'PULSE ORGANICS',
              tag: 'D2C COMMERCE',
              svg: (
                <svg className="w-6 h-6 text-[#1853CF] group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              ),
            },
            {
              name: 'LUMINA STUDIOS',
              tag: 'CINEMA & VFX',
              svg: (
                <svg className="w-6 h-6 text-[#1853CF] group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <path d="m9 8 6 4-6 4Z" />
                </svg>
              ),
            },
            {
              name: 'FITVERSE',
              tag: 'HEALTH & ATHLETICS',
              svg: (
                <svg className="w-6 h-6 text-[#1853CF] group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m13 2-2 2.5V8l3 3 5-5-2.5-2H13Z" />
                  <path d="m11 22 2-2.5V16l-3-3-5 5 2.5 2H11Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              ),
            },
            {
              name: 'HYPERDRIVE',
              tag: 'AUTO & PERFORMANCE',
              svg: (
                <svg className="w-6 h-6 text-[#1853CF] group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              ),
            },
            {
              name: 'URBAN KICKZ',
              tag: 'STREETWEAR RETAIL',
              svg: (
                <svg className="w-6 h-6 text-[#1853CF] group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                  <line x1="4" y1="22" x2="4" y2="15" />
                </svg>
              ),
            },
            {
              name: 'VANGUARD CLOUD',
              tag: 'INFRASTRUCTURE',
              svg: (
                <svg className="w-6 h-6 text-[#1853CF] group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
                </svg>
              ),
            },
            // Duplicate array for seamless infinite looping
            {
              name: 'APEX WEALTH',
              tag: 'FINTECH LEADER',
              svg: (
                <svg className="w-6 h-6 text-[#1853CF] group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 2 22 22 22" />
                  <line x1="12" y1="9" x2="12" y2="15" />
                </svg>
              ),
            },
            {
              name: 'ZENITH AI',
              tag: 'ENTERPRISE TECH',
              svg: (
                <svg className="w-6 h-6 text-[#1853CF] group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              ),
            },
            {
              name: 'SOLARIA FESTIVAL',
              tag: 'GLOBAL MEDIA',
              svg: (
                <svg className="w-6 h-6 text-[#1853CF] group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                </svg>
              ),
            },
            {
              name: 'PULSE ORGANICS',
              tag: 'D2C COMMERCE',
              svg: (
                <svg className="w-6 h-6 text-[#1853CF] group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              ),
            },
            {
              name: 'LUMINA STUDIOS',
              tag: 'CINEMA & VFX',
              svg: (
                <svg className="w-6 h-6 text-[#1853CF] group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <path d="m9 8 6 4-6 4Z" />
                </svg>
              ),
            },
            {
              name: 'FITVERSE',
              tag: 'HEALTH & ATHLETICS',
              svg: (
                <svg className="w-6 h-6 text-[#1853CF] group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m13 2-2 2.5V8l3 3 5-5-2.5-2H13Z" />
                  <path d="m11 22 2-2.5V16l-3-3-5 5 2.5 2H11Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              ),
            },
            {
              name: 'HYPERDRIVE',
              tag: 'AUTO & PERFORMANCE',
              svg: (
                <svg className="w-6 h-6 text-[#1853CF] group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              ),
            },
            {
              name: 'URBAN KICKZ',
              tag: 'STREETWEAR RETAIL',
              svg: (
                <svg className="w-6 h-6 text-[#1853CF] group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                  <line x1="4" y1="22" x2="4" y2="15" />
                </svg>
              ),
            },
            {
              name: 'VANGUARD CLOUD',
              tag: 'INFRASTRUCTURE',
              svg: (
                <svg className="w-6 h-6 text-[#1853CF] group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
                </svg>
              ),
            },
          ].map((b, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-48 sm:w-52 h-48 sm:h-52 p-5 rounded-3xl bg-white border-2 border-slate-200/80 hover:border-[#1853CF] shadow-xs hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center justify-between text-center group cursor-pointer"
            >
              {/* Top accent bar */}
              <div className="w-full h-1 rounded-full bg-slate-100 group-hover:bg-[#1853CF] transition-colors duration-300" />
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-blue-50/80 border border-blue-100 flex items-center justify-center flex-shrink-0 group-hover:bg-[#1853CF] transition-colors duration-200 shadow-sm mt-1">
                {b.svg}
              </div>
              {/* Text block */}
              <div className="flex flex-col items-center gap-1 w-full">
                <div className="text-sm font-black text-[#0B1420] group-hover:text-[#1853CF] tracking-tight transition-colors leading-tight line-clamp-2">
                  {b.name}
                </div>
                <div className="text-[10px] font-bold text-slate-400 tracking-widest uppercase line-clamp-1">
                  {b.tag}
                </div>
              </div>
              {/* Bottom dot indicator */}
              <div className="w-2 h-2 rounded-full bg-blue-100 group-hover:bg-[#1853CF] transition-colors duration-300" />
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================
          SERVICES — Pure White & Royal Blue World-Class Studio Showcase
          ================================================================ */}
      <section id="services" className="py-24 bg-[#F8FAFF]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

          {/* Section Header */}
          <div className="mb-16">
            <div className="section-label">02 — Our Capabilities</div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase text-[#0B1420] max-w-2xl leading-[1]">
                SERVICES BUILT<br />TO DOMINATE.
              </h2>
              <Link href="/services" className="btn-blue flex-shrink-0">
                All Service Tiers
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const pricing = service.pricingTiers ? JSON.parse(service.pricingTiers) : [];
              const starterPrice = pricing[0]?.price || service.startingPrice;
              const features = service.features ? JSON.parse(service.features) : [];

              return (
                <div key={service.id} className="bg-white border border-blue-100 rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(31,95,230,0.06)] hover:border-[#1853CF] hover:shadow-[0_20px_45px_rgba(31,95,230,0.12)] transition-all duration-300 group flex flex-col">
                  
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden bg-blue-50">
                    <img
                      src={service.coverImage}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {/* Category badge */}
                    <div className="absolute top-4 left-4 bg-[#1853CF] text-white text-[10px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider shadow-sm">
                      {service.category}
                    </div>
                    
                    {/* Price badge */}
                    <div className="absolute bottom-4 right-4 bg-white text-[#1853CF] text-[11px] font-black px-3.5 py-1.5 rounded-lg shadow-lg">
                      FROM ₹{starterPrice.toLocaleString()}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-7 flex flex-col flex-1">
                    <h3 className="text-xl font-black text-[#0B1420] mb-2.5 group-hover:text-[#1853CF] transition-colors leading-tight">
                      <Link href={`/services/${service.slug}`}>{service.title}</Link>
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-6 flex-1">
                      {service.shortDescription}
                    </p>

                    {/* Features */}
                    <div className="space-y-2.5 mb-6 border-t border-blue-50 pt-4">
                      {features.slice(0, 3).map((f: string, i: number) => (
                        <div key={i} className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                          <Check className="w-3.5 h-3.5 text-[#1853CF] flex-shrink-0" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA row */}
                    <div className="flex gap-3 mt-auto">
                      <Link
                        href={`/services/${service.slug}`}
                        className="flex-1 text-center py-2.5 border border-[#1853CF] text-[#1853CF] text-xs font-bold uppercase tracking-wide rounded-xl hover:bg-[#1853CF] hover:text-white transition-all"
                      >
                        View Details
                      </Link>
                      <Link
                        href={`/quote?service=${encodeURIComponent(service.title)}`}
                        className="flex-1 text-center py-2.5 bg-[#1853CF] text-white text-xs font-bold uppercase tracking-wide rounded-xl hover:bg-[#1749C0] transition-colors shadow-sm"
                      >
                        Get Quote
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================
          PORTFOLIO — Pure White Luxury International Showcase
          ================================================================ */}
      <section className="bg-white py-24 border-t border-blue-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

          <div className="mb-14">
            <div className="section-label">03 — Selected Work</div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase text-[#0B1420] max-w-2xl leading-[1]">
                WORK THAT<br />DELIVERS RESULTS.
              </h2>
              <Link href="/portfolio" className="btn-blue flex-shrink-0">
                View All Case Studies
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolio.map((item) => (
              <div key={item.id} className="bg-[#F8FAFF] border border-blue-100 rounded-2xl overflow-hidden hover:border-[#1853CF] hover:shadow-xl transition-all duration-300 group">
                
                <div className="relative h-56 overflow-hidden bg-slate-100">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Type badge */}
                  <div className="absolute top-4 left-4 bg-[#1853CF] text-white text-[10px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider shadow-sm">
                    {item.type}
                  </div>

                  {/* Play button for videos */}
                  {item.type === 'Edited Video' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center group-hover:bg-[#1853CF] transition-colors">
                        <Play className="w-5 h-5 text-white ml-1" fill="white" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#1853CF] mb-1.5">
                    {item.clientName}
                  </div>
                  <h3 className="text-lg font-black text-[#0B1420] mb-2 group-hover:text-[#1853CF] transition-colors leading-tight">
                    <Link href={`/portfolio/${item.slug}`}>{item.title}</Link>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-5">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-blue-100/60">
                    <Link
                      href={`/portfolio/${item.slug}`}
                      className="text-[11px] font-bold uppercase tracking-wider text-[#1853CF] hover:text-blue-800 flex items-center gap-1.5"
                    >
                      Read Case Study <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    {item.liveUrl && (
                      <a href={item.liveUrl} target="_blank" rel="noreferrer"
                        className="text-slate-400 hover:text-[#1853CF] transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          GALLERY & SHOWCASE — Real Traction, Studio Teams, Film Sets, Video Reviews
          ================================================================ */}
      <HomeShowcaseGallery />

      {/* ================================================================
          WHY CHOOSE US — Soft Ice-Blue with Pure White Luxury Cards
          ================================================================ */}
      <section className="bg-white py-24 border-t border-blue-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <div className="section-label text-center mx-auto">05 — Why B Growth</div>
            <h2 className="text-4xl sm:text-5xl font-black uppercase text-[#0B1420]">
              THE STANDARD<br />WE HOLD OURSELVES TO.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((w, i) => (
              <div key={i} className="p-8 bg-white border border-blue-100 rounded-2xl hover:border-[#1853CF] hover:shadow-xl transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-[#1853CF] flex items-center justify-center mb-6 shadow-md shadow-blue-500/20 group-hover:scale-110 transition-transform">
                  <w.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-base font-black text-[#0B1420] mb-2 uppercase">{w.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          PROCESS — Pure White Canvas with High-Contrast Numbered Badges
          Incorporating the Hospital Diagnostic Model from Founder Deck
          ================================================================ */}
      <section className="bg-white py-20 sm:py-24 border-t border-blue-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="mb-14">
            <div className="text-xs font-black tracking-[0.2em] uppercase text-[#1853CF] mb-2">
              05 — THE PROVEN METHODOLOGY
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <h2 className="text-3xl sm:text-5xl font-black uppercase text-[#0B1420] max-w-2xl tracking-tight leading-[1]">
                FROM DIAGNOSIS<br />TO PRODUCTION.
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm max-w-sm leading-relaxed">
                Our 6-step hospital diagnostic model eliminates agency guesswork and guarantees measurable business transformation.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {process.map((step, i) => (
              <div
                key={i}
                className="bg-[#F8FAFF] border border-blue-100 rounded-3xl p-7 hover:border-[#1853CF] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* High-Contrast Standout Number Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="w-12 h-12 rounded-2xl bg-[#1853CF] text-white flex items-center justify-center font-black text-lg shadow-md shadow-blue-600/25 group-hover:scale-105 transition-transform">
                      {step.n}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#1853CF] bg-blue-100/70 px-2.5 py-1 rounded-md">
                      Phase {step.n}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black uppercase text-[#0B1420] group-hover:text-[#1853CF] transition-colors mb-2 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-4 mt-5 border-t border-blue-100/70 flex items-center justify-between text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                  <span>Guaranteed SLA</span>
                  <span className="text-[#1853CF] font-black inline-flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Verified Milestone</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          TESTIMONIALS — Soft Ice Blue Background with Elevated Crisp White Cards
          ================================================================ */}
      {testimonials.length > 0 && (
        <section className="bg-[#F8FAFF] py-20 sm:py-24 border-y border-blue-100/70">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
            <div className="mb-14 text-center">
              <div className="text-xs font-black tracking-[0.2em] uppercase text-[#1853CF] mb-2">06 — CLIENT FEEDBACK</div>
              <h2 className="text-3xl sm:text-5xl font-black uppercase text-[#0B1420] tracking-tight">
                WHAT OUR CLIENTS SAY.
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((t, i) => (
                <div key={t.id} className="bg-white text-[#0B1420] border border-blue-100/90 rounded-2xl p-8 shadow-xs hover:shadow-xl hover:border-[#1853CF] transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="flex gap-1 mb-5">
                      {[...Array(5)].map((_, si) => (
                        <Star key={si} className="w-4 h-4 text-amber-400" fill="#f59e0b" />
                      ))}
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed font-medium">
                      &ldquo;{t.content}&rdquo;
                    </p>
                  </div>
                  <div className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-3.5">
                    <div className="relative w-11 h-11 rounded-full overflow-hidden bg-blue-100 flex-shrink-0 border-2 border-[#1853CF]">
                      <img
                        src={t.avatar || `https://images.unsplash.com/photo-150700321116${i}-0a1dd7228f2d?w=200`}
                        alt={t.clientName}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <div className="text-xs font-black text-[#0B1420] uppercase">{t.clientName}</div>
                      <div className="text-[10px] text-[#1853CF] font-bold uppercase tracking-wider">{t.clientRole}, {t.company}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================================================================
          FAQ — Crisp Pure White Section
          ================================================================ */}
      <section className="bg-white py-20 sm:py-24">
        <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="mb-14 text-center">
            <div className="text-xs font-black tracking-[0.2em] uppercase text-[#1853CF] mb-2">07 — COMMON QUESTIONS</div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-[#0B1420] tracking-tight">
              FREQUENTLY<br />ASKED QUESTIONS.
            </h2>
          </div>
          <HomeFaqAccordion faqs={faqs} />
          <div className="mt-10 text-center">
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-[#1853CF] text-white hover:bg-blue-700 text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md">
              <span>Ask a Different Question</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================================
          FINAL CTA — Floating Radiant Royal Blue Card inside Soft Ice Mist
          Seamless continuous transition into the compact light footer
          ================================================================ */}
      <section className="bg-[#F8FAFF] py-20 sm:py-24 border-t border-blue-100/70">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="rounded-3xl bg-gradient-to-br from-[#1853CF] via-[#1A54CE] to-[#1242AF] p-10 sm:p-14 lg:p-16 text-white text-center shadow-2xl relative overflow-hidden">
            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/15 text-blue-100 text-xs font-black uppercase tracking-widest border border-white/20">
                08 — Start Your High-Impact Project
              </span>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight leading-[1]">
                READY TO BUILD<br />SOMETHING EXCEPTIONAL?
              </h2>
              <p className="text-blue-100 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                Get an itemized sprint proposal within 24 hours. Fixed transparent pricing, zero hidden fees, and guaranteed milestone deliveries.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/quote"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#1853CF] hover:bg-blue-50 text-xs sm:text-sm font-black uppercase tracking-wider rounded-xl transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
                >
                  <span>CALCULATE PROJECT QUOTE</span>
                  <ArrowRight className="w-4 h-4 text-[#1853CF]" />
                </Link>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-black uppercase tracking-wider rounded-xl border border-white/20 transition-all duration-200"
                >
                  <span>SCHEDULE STRATEGY CALL</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

