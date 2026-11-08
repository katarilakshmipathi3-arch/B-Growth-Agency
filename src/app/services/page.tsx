import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import { ArrowRight, Check, Code2, Palette, Video, Share2, TrendingUp, Layout, ShoppingBag, Sparkles, Star } from 'lucide-react';

export const metadata = {
  title: 'Services — Web Development, Design & Video Editing',
  description: 'Full suite of premium digital services: custom Next.js websites, commercial poster design, and cinematic video editing.',
};

export const revalidate = 0;

function getIcon(iconName: string) {
  const cls = 'w-7 h-7';
  switch (iconName) {
    case 'Code2': return <Code2 className={cls} />;
    case 'Palette': return <Palette className={cls} />;
    case 'Video': return <Video className={cls} />;
    case 'Share2': return <Share2 className={cls} />;
    case 'TrendingUp': return <TrendingUp className={cls} />;
    case 'Layout': return <Layout className={cls} />;
    case 'ShoppingBag': return <ShoppingBag className={cls} />;
    default: return <Sparkles className={cls} />;
  }
}

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    where: { status: 'published' },
    orderBy: { order: 'asc' },
  });

  return (
    <div className="min-h-screen bg-[#EAECE8]">

      {/* ================================================================
          HERO — Full-bleed Royal Blue
          ================================================================ */}
      <section className="hero-blue py-28 md:py-36">
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-4xl">
            <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-blue-200/70 mb-6">
              B GROWTH AGENCY · OUR CAPABILITIES
            </div>
            <h1 className="text-[clamp(2.5rem,7vw,6rem)] font-black leading-[0.95] tracking-tight uppercase text-white mb-8">
              SERVICES<br />
              <span className="text-blue-200">BUILT TO</span><br />
              DOMINATE.
            </h1>
            <p className="text-blue-100 text-xl leading-relaxed max-w-2xl mb-10">
              From high-performance Next.js web applications to commercial poster campaigns 
              and viral video editing — every service engineered for measurable ROI.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/quote" className="btn-primary shadow-lg shadow-black/20">
                Get Free Proposal <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/pricing" className="btn-outline-white">
                Compare Pricing Plans
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SERVICE CATEGORIES OVERVIEW
          ================================================================ */}
      <section className="bg-[#0F1117] py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Code2, title: 'Web Development', desc: 'Next.js, React, TypeScript. SEO-optimised, performance-first websites.', from: '₹14,999' },
              { icon: Palette, title: 'Graphic Design', desc: 'Commercial posters, brand identity, social media graphics.', from: '₹499' },
              { icon: Video, title: 'Video Editing', desc: 'Cinematic reels, ad cuts, YouTube edits with color grading.', from: '₹1,999' },
            ].map((cat, i) => (
              <div key={i} className="bg-[#181C27] border border-white/5 rounded-xl p-8 hover:border-[#1F5FE6] transition-colors group">
                <div className="w-14 h-14 rounded-xl bg-[#1F5FE6] flex items-center justify-center mb-6">
                  <cat.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-black text-white uppercase mb-2">{cat.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{cat.desc}</p>
                <div className="text-[#1F5FE6] font-black text-sm">Starting {cat.from}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          ALL SERVICES GRID
          ================================================================ */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

          <div className="mb-16">
            <div className="section-label">All Services ({services.length})</div>
            <h2 className="text-4xl sm:text-5xl font-black uppercase text-[#0B1420] max-w-2xl leading-[1]">
              CHOOSE YOUR<br />ENGAGEMENT.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const features = service.features ? JSON.parse(service.features) : [];
              const pricing = service.pricingTiers ? JSON.parse(service.pricingTiers) : [];
              const starterPrice = pricing[0]?.price || service.startingPrice;

              return (
                <div key={service.id} className="service-card group flex flex-col">

                  {/* Image */}
                  <div className="relative h-56 overflow-hidden bg-gray-100">
                    <Image
                      src={service.coverImage}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    <div className="absolute top-4 left-4 bg-[#1F5FE6] text-white text-[10px] font-bold px-3 py-1.5 rounded uppercase tracking-wider">
                      {service.category}
                    </div>
                    
                    {service.isFeatured && (
                      <div className="absolute top-4 right-4 bg-amber-400 text-black text-[10px] font-black px-2.5 py-1 rounded uppercase flex items-center gap-1">
                        <Star className="w-2.5 h-2.5" fill="black" /> Popular
                      </div>
                    )}
                    
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="text-[10px] text-white/60 uppercase tracking-wider mb-0.5">Starting at</div>
                      <div className="text-2xl font-black">₹{starterPrice.toLocaleString()}</div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2.5 bg-[#EBF1FF] rounded-lg text-[#1F5FE6]">
                        {getIcon(service.icon)}
                      </div>
                      <h3 className="text-lg font-black text-[#0B1420] group-hover:text-[#1F5FE6] transition-colors leading-tight">
                        <Link href={`/services/${service.slug}`}>{service.title}</Link>
                      </h3>
                    </div>

                    <p className="text-sm text-[#6B7384] leading-relaxed mb-5 flex-1">
                      {service.shortDescription}
                    </p>

                    {/* Features */}
                    <div className="space-y-2.5 mb-6 border-t border-[#F0F1EC] pt-5">
                      {features.slice(0, 4).map((f: string, i: number) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs text-[#3A4152]">
                          <Check className="w-4 h-4 text-[#1F5FE6] flex-shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex gap-3 mt-auto">
                      <Link
                        href={`/services/${service.slug}`}
                        className="flex-1 text-center py-3 border border-[#1F5FE6] text-[#1F5FE6] text-xs font-bold uppercase tracking-wide rounded-lg hover:bg-[#1F5FE6] hover:text-white transition-all"
                      >
                        View Details
                      </Link>
                      <Link
                        href={`/quote?service=${encodeURIComponent(service.title)}`}
                        className="flex-1 text-center py-3 bg-[#1F5FE6] text-white text-xs font-bold uppercase tracking-wide rounded-lg hover:bg-[#1749C0] transition-colors"
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
          CTA BANNER — Full-bleed Blue
          ================================================================ */}
      <section className="hero-blue py-24">
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 text-center">
          <div className="section-label text-blue-300/60 mb-4">Need something custom?</div>
          <h2 className="text-4xl sm:text-5xl font-black uppercase text-white mb-6">
            LET'S BUILD A<br />CUSTOM RETAINER.
          </h2>
          <p className="text-blue-100 text-lg max-w-xl mx-auto mb-10">
            Monthly packages combining web engineering, daily graphic design, and video editing for fast-growing brands.
          </p>
          <Link href="/contact" className="btn-primary shadow-lg shadow-black/25">
            Schedule Strategy Call <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}
