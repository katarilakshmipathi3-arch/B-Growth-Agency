import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import { ArrowRight, ExternalLink, Play } from 'lucide-react';
import PortfolioClientHub from '@/components/portfolio/PortfolioClientHub';

export const metadata = {
  title: 'Portfolio — Case Studies & Our Work',
  description: 'Browse B Growth Agency case studies: websites, poster designs, and video editing projects with real client results.',
};

export const revalidate = 0;

export default async function PortfolioPage() {
  const portfolio = await prisma.portfolioItem.findMany({
    where: { status: 'published' },
    orderBy: { order: 'asc' },
  });

  return (
    <div className="min-h-screen bg-[#EAECE8]">

      {/* ================================================================
          HERO
          ================================================================ */}
      <section className="hero-blue py-28 md:py-36">
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-4xl">
            <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-blue-200/70 mb-6">
              B GROWTH AGENCY · SELECTED WORK
            </div>
            <h1 className="text-[clamp(2.5rem,7vw,6rem)] font-black leading-[0.95] tracking-tight uppercase text-white mb-8">
              WORK THAT<br />
              <span className="text-blue-200">SPEAKS</span><br />
              FOR ITSELF.
            </h1>
            <p className="text-blue-100 text-xl leading-relaxed max-w-2xl mb-10">
              {portfolio.length}+ case studies across websites, graphic design, and video production. 
              Real clients, real results, real data.
            </p>
            <div className="flex flex-wrap gap-6 text-blue-200/70 text-xs font-bold tracking-widest uppercase">
              <span>{portfolio.filter(p => p.type === 'Website').length} Websites Built</span>
              <span className="text-blue-200/30">·</span>
              <span>{portfolio.filter(p => p.type === 'Poster Design').length} Posters Designed</span>
              <span className="text-blue-200/30">·</span>
              <span>{portfolio.filter(p => p.type === 'Edited Video').length} Videos Edited</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          PORTFOLIO GRID WITH FILTERS
          ================================================================ */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="mb-12">
            <div className="section-label">All Projects</div>
            <h2 className="text-4xl sm:text-5xl font-black uppercase text-[#0B1420] max-w-2xl leading-[1]">
              BROWSE THE<br />FULL ARCHIVE.
            </h2>
          </div>
          <PortfolioClientHub items={portfolio} />
        </div>
      </section>

      {/* ================================================================
          CTA
          ================================================================ */}
      <section className="hero-blue py-24">
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 text-center">
          <h2 className="text-4xl sm:text-5xl font-black uppercase text-white mb-6">
            YOUR PROJECT<br />COULD BE NEXT.
          </h2>
          <p className="text-blue-100 text-lg max-w-xl mx-auto mb-10">
            Let's create something together that belongs in this portfolio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quote" className="btn-primary shadow-lg shadow-black/25">
              Start Your Project <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="btn-outline-white">
              Discuss Your Idea
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
