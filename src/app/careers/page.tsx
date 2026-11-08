import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Sparkles, 
  GraduationCap, 
  Briefcase, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Clock, 
  Award,
  Globe,
  HeartHandshake
} from 'lucide-react';
import CareersClientView from './CareersClientView';

export const metadata: Metadata = {
  title: 'Careers & Paid Internships — B Growth Agency Fellowships',
  description: 'Join B Growth Agency: explore world-class paid engineering, cinema video editing, brand design, and growth strategy fellowships in Hyderabad with guaranteed PPO pathways.',
};

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-white">
      
      {/* ================================================================
          2-COLUMN HERO — Royal Blue with Fellowship Authority Card
          ================================================================ */}
      <section className="hero-blue pt-16 sm:pt-20 pb-20 sm:pb-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Heading & Value Prop */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5 text-blue-200" />
                <span>B GROWTH AGENCY · GLOBAL TALENT COHORTS</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.02] tracking-tight uppercase text-white">
                BUILD CATEGORY<br />
                <span className="text-blue-200">DEFINING BRANDS.</span>
              </h1>

              <p className="text-blue-100 text-base sm:text-lg leading-relaxed max-w-xl">
                We are building the premier creative engineering studio in South Asia. No bureaucratic layers, no busywork, no unpaid internships. Real client sprint ownership, modern RED/ARRI gear, high-performance Next.js 14 code, and guaranteed PPO pathways.
              </p>

              {/* Verified Trust Badges */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-white/15 text-white border border-white/15">
                  <GraduationCap className="w-3.5 h-3.5 text-emerald-300" /> 100% Paid Fellowships
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-white/15 text-white border border-white/15">
                  <Award className="w-3.5 h-3.5 text-blue-200" /> 85% PPO Conversion
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-white/15 text-white border border-white/15">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-300" /> Direct Founder Pairing
                </span>
              </div>

              <div className="pt-2 flex flex-wrap gap-4">
                <a
                  href="#openings"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-[#1853CF] hover:bg-blue-50 text-xs font-black uppercase tracking-wider rounded-xl transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
                >
                  <span>VIEW 4 FELLOWSHIP TRACKS</span>
                  <ArrowRight className="w-4 h-4 text-[#1853CF]" />
                </a>
                <Link
                  href="/team"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs font-black uppercase tracking-wider rounded-xl border border-white/20 transition-all duration-200"
                >
                  <span>MEET THE TEAM</span>
                </Link>
              </div>
            </div>

            {/* Right Column: The Fellowship Standard Authority Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-[0_24px_64px_rgba(0,0,0,0.38)] border border-white/80 transition-transform duration-300 hover:-translate-y-1 text-[#0B1420]">
                <div className="flex items-center justify-between gap-3 mb-5">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-blue-50 text-[#1853CF] border border-blue-200">
                    <Sparkles className="w-3.5 h-3.5" /> Fellowship Principles
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Spring 2025 Cohort
                  </span>
                </div>

                {/* 4 Pillars of B Growth Culture */}
                <div className="space-y-3 mb-5">
                  <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-[#1853CF] text-white flex items-center justify-center font-black text-xs flex-shrink-0 mt-0.5">
                      01
                    </div>
                    <div>
                      <div className="text-xs font-black text-[#0B1420]">Production Sprints from Week 1</div>
                      <div className="text-[11px] text-slate-500 leading-relaxed mt-0.5">
                        Your code and video edits ship directly to live users and enterprise clients globally.
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black text-xs flex-shrink-0 mt-0.5">
                      02
                    </div>
                    <div>
                      <div className="text-xs font-black text-[#0B1420]">High-Earning Competitive Stipends</div>
                      <div className="text-[11px] text-slate-500 leading-relaxed mt-0.5">
                        ₹20,000 – ₹35,000 / month guaranteed stipend for fellows, with rapid promotion cycles.
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center font-black text-xs flex-shrink-0 mt-0.5">
                      03
                    </div>
                    <div>
                      <div className="text-xs font-black text-[#0B1420]">Direct Founder Mentorship</div>
                      <div className="text-[11px] text-slate-500 leading-relaxed mt-0.5">
                        Daily standups and code/edit reviews directly with Founder Adharsh Katari.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-400">
                  <span>HITEC City, Hyderabad · Hybrid</span>
                  <span className="text-[#1853CF]">B Growth Talent Labs</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================================================================
          MAIN INTERACTIVE CAREERS CLIENT VIEW
          ================================================================ */}
      <div id="openings">
        <CareersClientView />
      </div>

      {/* ================================================================
          FLOATING CTA — Radiant Royal Blue Card
          ================================================================ */}
      <section className="bg-white py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="rounded-3xl bg-gradient-to-br from-[#1853CF] via-[#1A54CE] to-[#1242AF] p-10 sm:p-14 lg:p-16 text-white text-center shadow-2xl relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/15 text-blue-100 text-xs font-black uppercase tracking-widest border border-white/20">
                Direct Talent Hotline
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight">
                HAVE EXCEPTIONAL CRAFT?<br />WE WANT YOU.
              </h2>
              <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
                If your discipline is not listed above but you are an extraordinary engineer, 3D artist, animator, or growth strategist, pitch us directly.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#1853CF] hover:bg-blue-50 text-xs sm:text-sm font-black uppercase tracking-wider rounded-xl transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
                >
                  <span>PITCH THE FOUNDER DIRECTLY</span>
                  <ArrowRight className="w-4 h-4 text-[#1853CF]" />
                </Link>
                <Link
                  href="/gallery"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-black uppercase tracking-wider rounded-xl border border-white/20 transition-all duration-200"
                >
                  <span>EXPLORE STUDIO GALLERY</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
