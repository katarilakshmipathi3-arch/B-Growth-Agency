import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import { ArrowRight, ArrowDown, Check, ExternalLink, Star, Play, Zap, Globe, Layers, Video } from 'lucide-react';
import HomeFeaturedWork from '@/components/home/HomeFeaturedWork';
import HomeFaqAccordion from '@/components/home/HomeFaqAccordion';

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
    { n: '01', title: 'Discovery', desc: 'Deep audit of your brand position, competitors, conversion funnel, and core audience.' },
    { n: '02', title: 'Strategy', desc: 'Wireframes, creative direction deck, technical stack blueprint and project timeline.' },
    { n: '03', title: 'Design', desc: 'Pixel-perfect UI design system, poster visuals, and motion storyboards with 2 revisions.' },
    { n: '04', title: 'Build & Edit', desc: 'Next.js 14 clean code, SEO schema, cinematic color-graded video post-production.' },
    { n: '05', title: 'Launch & QA', desc: 'Cross-browser QA, Lighthouse speed audit, SSL deployment, and staging handoff.' },
    { n: '06', title: 'Grow', desc: 'CRO analysis, ongoing creative assets, and admin portal training for your team.' },
  ];

  return (
    <div className="min-h-screen bg-[#EAECE8]">

      {/* ================================================================
          HERO — Full-bleed Royal Blue, covering all the way to the top edge
          ================================================================ */}
      <section className="hero-blue min-h-screen flex flex-col pt-24 sm:pt-28">
        <div className="relative z-10 flex-1 flex flex-col max-w-7xl mx-auto w-full px-6 sm:px-10 lg:px-16">
          
          {/* Top micro-label */}
          <div className="pt-4 pb-0">
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-blue-200/80">
              B GROWTH AGENCY · DESIGN & ENGINEERING STUDIO · HYDERABAD
            </span>
          </div>

          {/* Main Headline — takes up most of the vertical space */}
          <div className="flex-1 flex flex-col justify-center py-16">
            <h1 className="text-[clamp(2.8rem,8vw,7.5rem)] font-black leading-[0.95] tracking-tight uppercase text-white max-w-5xl">
              WE BUILD<br />
              <span className="text-blue-200">BRANDS</span><br />
              THAT GROW.
            </h1>

            <div className="mt-10 max-w-2xl">
              <p className="text-blue-100 text-lg sm:text-xl leading-relaxed font-normal">
                Premium Next.js websites, scroll-stopping commercial poster designs, 
                and cinematic video editing — engineered to convert audiences into revenue.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-4 items-center">
              <Link href="/quote" className="btn-primary shadow-lg shadow-black/20">
                Get Free Proposal
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/portfolio" className="btn-outline-white">
                View Our Work
              </Link>
            </div>

            {/* Trust signals */}
            <div className="mt-14 flex flex-wrap items-center gap-6 text-blue-200/70 text-xs font-semibold tracking-wider uppercase">
              <span>✓ Fixed-Price Packages</span>
              <span className="text-blue-200/30">|</span>
              <span>✓ 2–4 Week Delivery</span>
              <span className="text-blue-200/30">|</span>
              <span>✓ 100% Satisfaction Guarantee</span>
            </div>
          </div>

          {/* Services strip at bottom of hero */}
          <div className="pb-10">
            <div className="border-t border-white/15 pt-6 grid grid-cols-3 gap-4">
              {[
                { icon: Globe, label: 'Web Development', sub: 'Next.js · React · TypeScript' },
                { icon: Layers, label: 'Poster & Graphic Design', sub: 'Branding · Print · Social' },
                { icon: Video, label: 'Video Editing', sub: 'Reels · Ads · Cinematic' },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                    <s.icon className="w-4 h-4 text-blue-200" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-xs sm:text-sm">{s.label}</div>
                    <div className="text-blue-300/70 text-[10px] sm:text-xs">{s.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Scroll indicator */}
        <div className="relative z-10 flex justify-center pb-8">
          <a href="#stats" className="flex flex-col items-center gap-2 text-blue-200/60 hover:text-blue-200 transition-colors">
            <span className="text-[10px] font-bold tracking-widest uppercase">Scroll</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </a>
        </div>
      </section>

      {/* ================================================================
          STATS STRIP
          ================================================================ */}
      <section id="stats" className="bg-[#0F1117] py-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.num} className="text-center space-y-1">
                <div className="text-4xl sm:text-5xl font-black text-white">{s.num}</div>
                <div className="text-[11px] font-semibold tracking-widest uppercase text-gray-400">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          CLIENT LOGOS MARQUEE
          ================================================================ */}
      <section className="bg-white py-10 border-b border-[#E0E2DA]">
        <div className="max-w-7xl mx-auto px-6 mb-5">
          <p className="text-center text-[11px] font-bold tracking-widest uppercase text-gray-400">
            Trusted by growing brands
          </p>
        </div>
        <div className="overflow-hidden relative">
          <div className="marquee-track">
            {[...Array(16)].map((_, i) => (
              <div key={i} className="mx-10 flex-shrink-0 h-9 w-32 relative opacity-30 hover:opacity-60 transition-opacity grayscale">
                <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-500">CLIENT {(i % 8) + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          SERVICES — full section with dark header card
          ================================================================ */}
      <section id="services" className="py-24 bg-[#EAECE8]">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const pricing = service.pricingTiers ? JSON.parse(service.pricingTiers) : [];
              const starterPrice = pricing[0]?.price || service.startingPrice;
              const features = service.features ? JSON.parse(service.features) : [];

              return (
                <div key={service.id} className="service-card group flex flex-col">
                  
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden bg-gray-100">
                    <Image
                      src={service.coverImage}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    
                    {/* Category badge */}
                    <div className="absolute top-4 left-4 bg-[#1F5FE6] text-white text-[10px] font-bold px-3 py-1.5 rounded uppercase tracking-wider">
                      {service.category}
                    </div>
                    
                    {/* Price badge */}
                    <div className="absolute bottom-4 right-4 bg-white text-[#1F5FE6] text-[11px] font-black px-3 py-1.5 rounded shadow-lg">
                      FROM ₹{starterPrice.toLocaleString()}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-black text-[#0B1420] mb-2 group-hover:text-[#1F5FE6] transition-colors leading-tight">
                      <Link href={`/services/${service.slug}`}>{service.title}</Link>
                    </h3>
                    <p className="text-sm text-[#6B7384] leading-relaxed mb-5 flex-1">
                      {service.shortDescription}
                    </p>

                    {/* Features */}
                    <div className="space-y-2 mb-6 border-t border-[#F0F1EC] pt-4">
                      {features.slice(0, 3).map((f: string, i: number) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-[#3A4152]">
                          <Check className="w-3.5 h-3.5 text-[#1F5FE6] flex-shrink-0" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA row */}
                    <div className="flex gap-3 mt-auto">
                      <Link
                        href={`/services/${service.slug}`}
                        className="flex-1 text-center py-2.5 border border-[#1F5FE6] text-[#1F5FE6] text-xs font-bold uppercase tracking-wide rounded-lg hover:bg-[#1F5FE6] hover:text-white transition-all"
                      >
                        View Details
                      </Link>
                      <Link
                        href={`/quote?service=${encodeURIComponent(service.title)}`}
                        className="flex-1 text-center py-2.5 bg-[#1F5FE6] text-white text-xs font-bold uppercase tracking-wide rounded-lg hover:bg-[#1749C0] transition-colors"
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
          PORTFOLIO — dark background section
          ================================================================ */}
      <section className="bg-[#0F1117] py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

          <div className="mb-14">
            <div className="section-label text-gray-500">03 — Selected Work</div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase text-white max-w-2xl leading-[1]">
                WORK THAT<br />DELIVERS RESULTS.
              </h2>
              <Link href="/portfolio" className="btn-primary flex-shrink-0 shadow-none border border-white/20">
                View All Case Studies
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolio.map((item) => (
              <div key={item.id} className="portfolio-card group bg-[#181C27] border-white/5 hover:border-[#1F5FE6]">
                
                <div className="relative h-52 overflow-hidden bg-gray-900">
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  
                  {/* Type badge */}
                  <div className="absolute top-4 left-4 bg-[#1F5FE6] text-white text-[10px] font-bold px-3 py-1 rounded uppercase tracking-wider">
                    {item.type}
                  </div>

                  {/* Play button for videos */}
                  {item.type === 'Edited Video' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-colors">
                        <Play className="w-5 h-5 text-white ml-1" fill="white" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">
                    {item.clientName}
                  </div>
                  <h3 className="text-base font-black text-white mb-2 group-hover:text-[#1F5FE6] transition-colors leading-tight">
                    <Link href={`/portfolio/${item.slug}`}>{item.title}</Link>
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 mb-4">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <Link
                      href={`/portfolio/${item.slug}`}
                      className="text-[11px] font-bold uppercase tracking-wider text-[#1F5FE6] hover:text-blue-300 flex items-center gap-1"
                    >
                      Read Case Study <ArrowRight className="w-3 h-3" />
                    </Link>
                    {item.liveUrl && (
                      <a href={item.liveUrl} target="_blank" rel="noreferrer"
                        className="text-gray-500 hover:text-white transition-colors">
                        <ExternalLink className="w-3.5 h-3.5" />
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
          WHY CHOOSE US — white section
          ================================================================ */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <div className="section-label text-center mx-auto">04 — Why B Growth</div>
            <h2 className="text-4xl sm:text-5xl font-black uppercase text-[#0B1420]">
              THE STANDARD<br />WE HOLD OURSELVES TO.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((w, i) => (
              <div key={i} className="p-8 bg-[#F4F5F0] border border-[#E0E2DA] rounded-xl hover:border-[#1F5FE6] transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-[#1F5FE6] flex items-center justify-center mb-5">
                  <w.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-base font-black text-[#0B1420] mb-2 uppercase">{w.title}</h3>
                <p className="text-sm text-[#6B7384] leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          PROCESS — Canvas background
          ================================================================ */}
      <section className="bg-[#EAECE8] py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="mb-16">
            <div className="section-label">05 — Our Method</div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <h2 className="text-4xl sm:text-5xl font-black uppercase text-[#0B1420] max-w-2xl leading-[1]">
                FROM DISCOVERY<br />TO PRODUCTION.
              </h2>
              <p className="text-[#6B7384] text-sm max-w-sm leading-relaxed">
                Our 6-step studio workflow eliminates guesswork and delivers predictable, premium output every engagement.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {process.map((step, i) => (
              <div key={i} className="bg-white border border-[#E0E2DA] rounded-xl p-7 hover:border-[#1F5FE6] hover:shadow-lg transition-all">
                <div className="text-5xl font-black text-[#1F5FE6]/15 mb-4 leading-none">{step.n}</div>
                <h3 className="text-base font-black uppercase text-[#0B1420] mb-2">{step.title}</h3>
                <p className="text-sm text-[#6B7384] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          TESTIMONIALS — dark section
          ================================================================ */}
      {testimonials.length > 0 && (
        <section className="bg-[#0F1117] py-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
            <div className="mb-14 text-center">
              <div className="section-label text-gray-500 text-center">06 — Client Feedback</div>
              <h2 className="text-4xl sm:text-5xl font-black uppercase text-white">
                WHAT OUR CLIENTS SAY.
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <div key={t.id} className="bg-[#181C27] border border-white/5 rounded-xl p-7 flex flex-col justify-between">
                  <div>
                    <div className="flex gap-0.5 mb-5">
                      {[...Array(5)].map((_, si) => (
                        <Star key={si} className="w-4 h-4 text-amber-400" fill="#f59e0b" />
                      ))}
                    </div>
                    <p className="text-gray-200 text-sm leading-relaxed">
                      &ldquo;{t.content}&rdquo;
                    </p>
                  </div>
                  <div className="mt-6 pt-5 border-t border-white/10 flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-700 flex-shrink-0">
                      <Image
                        src={t.avatar || `https://images.unsplash.com/photo-150700321116${i}-0a1dd7228f2d?w=200`}
                        alt={t.clientName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-xs font-black text-white uppercase">{t.clientName}</div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-wider">{t.clientRole}, {t.company}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================================================================
          FAQ — white section
          ================================================================ */}
      <section className="bg-white py-24">
        <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="mb-14 text-center">
            <div className="section-label text-center">07 — Common Questions</div>
            <h2 className="text-4xl sm:text-5xl font-black uppercase text-[#0B1420]">
              FREQUENTLY<br />ASKED QUESTIONS.
            </h2>
          </div>
          <HomeFaqAccordion faqs={faqs} />
          <div className="mt-10 text-center">
            <Link href="/contact" className="btn-blue">
              Ask a Different Question
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================================
          FINAL CTA — Full-bleed Royal Blue
          ================================================================ */}
      <section className="hero-blue py-28">
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 text-center">
          <div className="section-label text-blue-300/60 text-center">08 — Start Your Project</div>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-white mt-4 mb-6 leading-[0.95]">
            READY TO<br />BUILD SOMETHING<br />EXCEPTIONAL?
          </h2>
          <p className="text-blue-100 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Get a detailed, itemized proposal within 24 hours. Fixed pricing, zero hidden fees, guaranteed delivery timelines.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quote" className="btn-primary shadow-xl shadow-black/30">
              Calculate My Project Quote
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="btn-outline-white">
              Schedule a Call
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
