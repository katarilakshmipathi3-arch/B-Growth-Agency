import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Sparkles, 
  TrendingUp, 
  Users, 
  Film, 
  Star, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Clock, 
  Camera, 
  Award,
  Play
} from 'lucide-react';
import GalleryClientView from './GalleryClientView';

export const metadata: Metadata = {
  title: 'Showcase Gallery — Team, Live Shoots, Real Traction & Video Reviews | B Growth Agency',
  description: 'Explore the B Growth Agency production gallery: behind-the-scenes team sprints, cinema 4K commercial sets, verified client revenue dashboards, and founder video reviews.',
};

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-white">
      
      {/* ================================================================
          2-COLUMN HERO — Royal Blue with Studio Operations Terminal
          ================================================================ */}
      <section className="hero-blue pt-16 sm:pt-20 pb-20 sm:pb-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Heading & Value Prop */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5 text-blue-200" />
                <span>STUDIO ARCHIVE · VERIFIABLE PROOF OF CRAFT</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.02] tracking-tight uppercase text-white">
                TEAMS, SETS &amp;<br />
                <span className="text-blue-200">REAL TRACTION.</span>
              </h1>

              <p className="text-blue-100 text-base sm:text-lg leading-relaxed max-w-xl">
                We believe in radical transparency. Take a behind-the-scenes look into our Hyderabad studio engineering sprints, 4K RED commercial film sets, verified client revenue dashboards, and founder video testimonials.
              </p>

              {/* Verified Trust Badges */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-white/15 text-white border border-white/15">
                  <Camera className="w-3.5 h-3.5 text-emerald-300" /> 100% In-House Sets
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-white/15 text-white border border-white/15">
                  <TrendingUp className="w-3.5 h-3.5 text-blue-200" /> Audited Client ROAS
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-white/15 text-white border border-white/15">
                  <Award className="w-3.5 h-3.5 text-amber-300" /> Zero Stock Footage
                </span>
              </div>

              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  href="/quote"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-[#1853CF] hover:bg-blue-50 text-xs font-black uppercase tracking-wider rounded-xl transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
                >
                  <span>COMMISSION A PRODUCTION</span>
                  <ArrowRight className="w-4 h-4 text-[#1853CF]" />
                </Link>
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs font-black uppercase tracking-wider rounded-xl border border-white/20 transition-all duration-200"
                >
                  <span>VIEW CASE STUDIES</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Studio Production Metrics Radar */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-[0_24px_64px_rgba(0,0,0,0.38)] border border-white/80 transition-transform duration-300 hover:-translate-y-1 text-[#0B1420]">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-blue-50 text-[#1853CF] border border-blue-200">
                    <Film className="w-3.5 h-3.5" /> Production Rig Active
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live Sets in Hyderabad
                  </span>
                </div>

                {/* Operations Highlights */}
                <div className="space-y-3 mb-5">
                  <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-bold text-slate-500 uppercase">Camera Package</div>
                      <div className="text-sm font-black text-[#0B1420]">RED V-Raptor 8K &amp; ARRI Alexa Mini</div>
                    </div>
                    <span className="text-xs font-black text-[#1853CF] bg-white px-2.5 py-1 rounded-lg border border-blue-200">
                      Active
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-bold text-slate-500 uppercase">Engineering Stack</div>
                      <div className="text-sm font-black text-[#0B1420]">Next.js 14 App Router &amp; TypeScript</div>
                    </div>
                    <span className="text-xs font-black text-emerald-600 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                      99 Speed
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-bold text-slate-500 uppercase">Attributed Client Gross</div>
                      <div className="text-sm font-black text-[#0B1420]">₹10Cr+ Verified Pipeline</div>
                    </div>
                    <span className="text-xs font-black text-[#1853CF] bg-white px-2.5 py-1 rounded-lg border border-blue-200">
                      Audited
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-400">
                  <span>HITEC City, Hyderabad, IN</span>
                  <span className="text-[#1853CF]">B Growth Media Labs</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================================================================
          MAIN INTERACTIVE GALLERY CLIENT VIEW — Tabbed Filter & Lightbox
          ================================================================ */}
      <GalleryClientView />

      {/* ================================================================
          FLOATING CTA — Radiant Royal Blue Card
          ================================================================ */}
      <section className="bg-white py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="rounded-3xl bg-gradient-to-br from-[#1853CF] via-[#1A54CE] to-[#1242AF] p-10 sm:p-14 lg:p-16 text-white text-center shadow-2xl relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/15 text-blue-100 text-xs font-black uppercase tracking-widest border border-white/20">
                Launch Your Brand Sprint
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight">
                READY FOR WORLD-CLASS<br />PRODUCTION POWER?
              </h2>
              <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
                Whether you need a full-stack Next.js commerce platform, a cinema commercial shoot in Hyderabad, or high-retention video reels, let&apos;s build it right.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/quote"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#1853CF] hover:bg-blue-50 text-xs sm:text-sm font-black uppercase tracking-wider rounded-xl transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
                >
                  <span>GET ITEMIZED ESTIMATE</span>
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
