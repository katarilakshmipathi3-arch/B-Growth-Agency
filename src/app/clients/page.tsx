import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import { ArrowRight, Star } from 'lucide-react';

export const metadata = {
  title: 'Our Clients — Trusted by Growing Brands',
  description: 'Brands and businesses that trust B Growth Agency for their web development, design, and video editing.',
};

export const revalidate = 0;

export default async function ClientsPage() {
  const [testimonials, clientLogos] = await Promise.all([
    prisma.testimonial.findMany({ orderBy: { order: 'asc' } }),
    prisma.clientLogo.findMany({ orderBy: { order: 'asc' } }),
  ]);

  return (
    <div className="min-h-screen bg-white">

      {/* ================================================================
          HERO
          ================================================================ */}
      <section className="hero-blue py-28 md:py-36">
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 text-center">
          <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-blue-200/70 mb-6">
            B GROWTH AGENCY · CLIENT RECORD
          </div>
          <h1 className="text-[clamp(2.5rem,7vw,6rem)] font-black leading-[0.95] tracking-tight uppercase text-white mb-8 max-w-3xl mx-auto">
            TRUSTED BY<br />
            <span className="text-blue-200">BRANDS THAT</span><br />
            DEMAND MORE.
          </h1>
          <p className="text-blue-100 text-xl leading-relaxed max-w-2xl mx-auto">
            {testimonials.length} verified client reviews. {clientLogos.length} brands and counting. 
            Here's what our partners say about working with us.
          </p>
        </div>
      </section>

      {/* ================================================================
          CLIENT LOGOS GRID
          ================================================================ */}
      {clientLogos.length > 0 && (
        <section className="bg-white py-20 border-b border-blue-100">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
            <div className="text-center mb-12">
              <div className="section-label text-center">Partner Brands</div>
              <h2 className="text-3xl font-black uppercase text-[#0B1420]">OUR CLIENTS.</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {clientLogos.map((client) => (
                <div key={client.id} className="flex items-center justify-center p-5 bg-[#F8FAFF] border border-blue-100 rounded-2xl hover:border-[#1853CF] transition-all">
                  <div className="h-10 w-full flex items-center justify-center">
                    <img
                      src={client.logoUrl}
                      alt={client.name}
                      className="h-8 max-w-full object-contain"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================================================================
          TESTIMONIALS — Crisp White on Soft Ice Blue
          ================================================================ */}
      <section className="bg-[#F8FAFF] py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="mb-14 text-center">
            <div className="section-label text-center">Verified Reviews</div>
            <h2 className="text-4xl sm:text-5xl font-black uppercase text-[#0B1420]">
              WHAT CLIENTS SAY.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={t.id} className="bg-white border border-blue-100 rounded-2xl p-8 shadow-sm hover:border-[#1853CF] hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 mb-5">
                    {[...Array(t.rating)].map((_, si) => (
                      <Star key={si} className="w-4 h-4 text-amber-400" fill="#f59e0b" />
                    ))}
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed font-medium">
                    &ldquo;{t.content}&rdquo;
                  </p>
                </div>
                <div className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-3.5">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden bg-blue-100 flex-shrink-0 border border-[#1853CF]">
                    <img
                      src={t.avatar || `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&fit=facearea`}
                      alt={t.clientName}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-black text-[#0B1420] uppercase">{t.clientName}</div>
                    <div className="text-[11px] text-[#1853CF] font-bold uppercase tracking-wider">{t.clientRole}, {t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="hero-blue py-24">
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 text-center">
          <h2 className="text-4xl sm:text-5xl font-black uppercase text-white mb-6">
            JOIN OUR<br />CLIENT ROSTER.
          </h2>
          <p className="text-blue-100 text-lg max-w-xl mx-auto mb-10">
            Become our next success story. Get a proposal in 24 hours.
          </p>
          <Link href="/quote" className="btn-primary shadow-lg shadow-black/25">
            Start Your Project <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}

