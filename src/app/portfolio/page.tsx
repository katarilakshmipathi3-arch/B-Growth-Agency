import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { ArrowRight, Sparkles, TrendingUp, Zap, ShieldCheck, CheckCircle2, Award } from 'lucide-react';
import PortfolioClientHub from '@/components/portfolio/PortfolioClientHub';

export const metadata = {
  title: 'Portfolio & Case Studies — Real Client Results | B Growth Agency',
  description: 'Browse B Growth Agency case studies: Next.js websites, commercial poster designs, and cinema video editing projects with verified ROI.',
};

export const revalidate = 0;

export default async function PortfolioPage() {
  const portfolio = await prisma.portfolioItem.findMany({
    where: { status: 'published' },
    orderBy: { order: 'asc' },
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
                <span>B GROWTH AGENCY · PROVEN PERFORMANCE ARCHIVE</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.02] tracking-tight uppercase text-white">
                WORK THAT<br />
                <span className="text-blue-200">SPEAKS</span><br />
                FOR ITSELF.
              </h1>

              <p className="text-blue-100 text-base sm:text-lg leading-relaxed max-w-xl">
                Explore production systems engineered for ambitious brands. From sub-second Next.js web applications to commercial brand campaigns and cinema ad edits.
              </p>

              {/* Verified Performance Badges */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-white/15 text-white border border-white/15">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" /> {portfolio.length}+ Production Case Studies
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-white/15 text-white border border-white/15">
                  <Zap className="w-3.5 h-3.5 text-amber-300" /> 98+ Google Lighthouse Avg
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-white/15 text-white border border-white/15">
                  <TrendingUp className="w-3.5 h-3.5 text-blue-200" /> ₹10Cr+ Client Pipeline
                </span>
              </div>

              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  href="/quote"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-[#1853CF] hover:bg-blue-50 text-xs font-black uppercase tracking-wider rounded-xl transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
                >
                  <span>COMMISSION A CASE STUDY</span>
                  <ArrowRight className="w-4 h-4 text-[#1853CF]" />
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs font-black uppercase tracking-wider rounded-xl border border-white/20 transition-all duration-200"
                >
                  <span>COMPARE SPRINT TIERS</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Live Performance Radar & Case Study Spotlight Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.35)] border border-white/80 transition-transform duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between gap-3 mb-5">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Verified Production Metric
                  </span>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Fintech Spotlight
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 text-white mb-5 relative overflow-hidden">
                  <div className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-1">
                    Featured Engagement
                  </div>
                  <h3 className="text-xl font-black uppercase mb-1">APEX WEALTH PLATFORM</h3>
                  <p className="text-xs text-slate-300">Next.js 14 Web Architecture · Full Brand Identity System</p>
                  
                  <div className="mt-4 grid grid-cols-2 gap-3 pt-3 border-t border-white/15">
                    <div>
                      <div className="text-2xl font-black text-emerald-400 tracking-tight">+340%</div>
                      <div className="text-[10px] uppercase font-bold text-slate-400">Conversion Uplift</div>
                    </div>
                    <div>
                      <div className="text-2xl font-black text-blue-400 tracking-tight">0.42s</div>
                      <div className="text-[10px] uppercase font-bold text-slate-400">First Contentful Paint</div>
                    </div>
                  </div>
                </div>

                {/* Performance Pill Matrix */}
                <div className="space-y-2 mb-5">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50/70 border border-blue-100 text-xs font-bold text-[#0B1420]">
                    <span className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-[#1853CF]" /> Google Lighthouse Score
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500 text-white font-black text-[10px]">
                      99 / 100
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-[#0B1420]">
                    <span className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-[#1853CF]" /> Attributed Client Pipeline
                    </span>
                    <span className="text-[#1853CF] font-black text-xs">
                      ₹1.8 Cr+
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-[11px] font-bold text-slate-500">
                    Live Verified Client Sprint
                  </div>
                  <Link
                    href="/quote"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1853CF] hover:bg-blue-700 text-white text-xs font-black uppercase rounded-xl transition-all shadow-sm"
                  >
                    Build Similar <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================================================================
          PORTFOLIO ARCHIVE WITH FILTERS — Crisp Pure White Section
          ================================================================ */}
      <section className="bg-white py-20 sm:py-24 border-b border-blue-100/70">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <div className="text-xs font-black tracking-[0.2em] uppercase text-[#1853CF] mb-2">
                ALL PRODUCTION CASE STUDIES
              </div>
              <h2 className="text-3xl sm:text-4xl font-black uppercase text-[#0B1420] tracking-tight">
                BROWSE THE FULL ARCHIVE.
              </h2>
            </div>
            <p className="text-slate-500 text-xs sm:text-sm font-semibold max-w-sm">
              Filter by engineering discipline, view live deliverables, and inspect verified client impact.
            </p>
          </div>

          <PortfolioClientHub items={portfolio} />
        </div>
      </section>

      {/* ================================================================
          CTA — Floating Radiant Royal Blue Card inside Soft Ice Mist
          Seamless continuous transition into the compact light footer
          ================================================================ */}
      <section className="bg-[#F8FAFF] py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="rounded-3xl bg-gradient-to-br from-[#1853CF] via-[#1A54CE] to-[#1242AF] p-10 sm:p-14 lg:p-16 text-white text-center shadow-2xl relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/15 text-blue-100 text-xs font-black uppercase tracking-widest border border-white/20">
                Your Brand in Our Archive
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight">
                YOUR PROJECT COULD BE NEXT.
              </h2>
              <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
                Let's architect a bespoke digital presence or advertising campaign that outperforms your competitors and scales your revenue.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/quote"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#1853CF] hover:bg-blue-50 text-xs sm:text-sm font-black uppercase tracking-wider rounded-xl transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
                >
                  <span>START YOUR PROJECT</span>
                  <ArrowRight className="w-4 h-4 text-[#1853CF]" />
                </Link>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-black uppercase tracking-wider rounded-xl border border-white/20 transition-all duration-200"
                >
                  <span>DISCUSS YOUR IDEA</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

