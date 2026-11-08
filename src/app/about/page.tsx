import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import { ArrowRight, Check, Target, Eye, Shield, Zap, Sparkles, Award, HeartHandshake, Users } from 'lucide-react';

export const metadata = {
  title: 'About B Growth Agency — Our Story, Vision & Standards',
  description: 'Learn about B Growth Agency, founded by Adharsh Katari. Delivering world-class web development, design, and video production.',
};

export const revalidate = 0;

const values = [
  {
    icon: Sparkles,
    title: 'Zero Mediocrity',
    desc: 'We never deliver template work. Every line of code, poster composition, and video cut is custom-crafted to dominate its market.',
  },
  {
    icon: Zap,
    title: 'Speed with Precision',
    desc: 'Slow execution kills brand momentum. We run in rapid 7-to-14 day sprints without compromising an ounce of craft.',
  },
  {
    icon: Shield,
    title: 'Extreme Ownership',
    desc: 'From kickoff to launch and beyond, we treat your business as our own. No excuses, transparent tracking, guaranteed outcomes.',
  },
  {
    icon: HeartHandshake,
    title: 'Measurable ROI',
    desc: 'Beauty that does not convert is just art. We design and build specifically to generate pipeline, inquiries, and revenue.',
  },
];

export default async function AboutPage() {
  const team = await prisma.teamMember.findMany({
    orderBy: { order: 'asc' },
  });

  return (
    <div className="min-h-screen bg-white">

      {/* ================================================================
          HERO — 2-Column Full-bleed Royal Blue with Founder Card
          ================================================================ */}
      <section className="hero-blue py-20 sm:py-28 md:py-32">
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Bold Headline & Story */}
            <div className="lg:col-span-7">
              <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-blue-200/80 mb-5">
                B GROWTH AGENCY · OUR STORY
              </div>
              <h1 className="text-[clamp(2.5rem,6vw,5.2rem)] font-black leading-[0.95] tracking-tight uppercase text-white mb-6">
                WE REPLACE<br />
                <span className="text-blue-200">GENERIC</span><br />
                WITH GREAT.
              </h1>
              <p className="text-blue-100 text-lg sm:text-xl leading-relaxed max-w-xl mb-8">
                Founded on the conviction that ambitious brands deserve world-class engineering 
                and culture-defining creative design — never templates, never agencies-in-a-box.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link href="/portfolio" className="btn-primary shadow-lg shadow-black/20">
                  Explore Our Work <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/team" className="btn-outline-white">
                  Meet the Team
                </Link>
              </div>
            </div>

            {/* Right Column: Brand Identity Card -- Abstract premium, no photo */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-[0_24px_64px_rgba(0,0,0,0.38)] border border-white/80 transition-transform duration-300 hover:-translate-y-1 text-[#0B1420] overflow-hidden relative">
                {/* Badge row */}
                <div className="flex items-center justify-between gap-3 mb-5">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-blue-50 text-[#1853CF] border border-blue-200">
                    <Sparkles className="w-3.5 h-3.5" /> Our Philosophy
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Active · Hyderabad
                  </span>
                </div>
                {/* Abstract brand visual */}
                <div className="relative h-44 sm:h-48 rounded-2xl overflow-hidden mb-5 bg-gradient-to-br from-[#1853CF] via-[#1240A6] to-[#0B2D7A] flex items-center justify-center">
                  <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '28px 28px'}} />
                  <div className="relative z-10 text-center">
                    <div className="text-[52px] sm:text-[60px] font-black text-white leading-none tracking-tighter mb-1">B·G</div>
                    <div className="text-[11px] font-bold tracking-[0.35em] uppercase text-blue-200/80">AGENCY</div>
                    <div className="mt-3 flex items-center justify-center gap-2">
                      <div className="w-8 h-0.5 bg-blue-300/50 rounded-full" />
                      <div className="text-[9px] text-blue-300/70 font-bold tracking-widest uppercase">Est. 2021 · Hyderabad</div>
                      <div className="w-8 h-0.5 bg-blue-300/50 rounded-full" />
                    </div>
                  </div>
                  <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/5 border border-white/10" />
                  <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/5 border border-white/10" />
                </div>
                {/* Founder quote */}
                <p className="text-xs text-slate-600 leading-relaxed mb-5 italic border-l-2 border-[#1853CF] pl-3">
                  &ldquo;We don&apos;t build websites or cut clips. We engineer the digital moat that lets our clients command higher prices and own their category.&rdquo;
                </p>
                {/* Stats grid */}
                <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-blue-50/70 border border-blue-100 mb-4 text-center">
                  <div>
                    <div className="text-base font-black text-[#1853CF]">45+</div>
                    <div className="text-[9px] uppercase font-bold text-slate-500">Brands</div>
                  </div>
                  <div className="border-x border-blue-100">
                    <div className="text-base font-black text-emerald-600">100%</div>
                    <div className="text-[9px] uppercase font-bold text-slate-500">On-Time</div>
                  </div>
                  <div>
                    <div className="text-base font-black text-amber-500">12+</div>
                    <div className="text-[9px] uppercase font-bold text-slate-500">Services</div>
                  </div>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-400">Hyderabad, India</span>
                  <Link
                    href="/team"
                    className="inline-flex items-center gap-1 text-xs font-black text-[#1853CF] hover:underline"
                  >
                    View Studio Team <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================================================================
          MISSION & VISION — Clean White & Ice Blue
          ================================================================ */}
      <section className="bg-white py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Target,
                label: 'Our Mission',
                title: 'Build digital products that pay for themselves.',
                desc: 'To empower entrepreneurs, creators, and enterprises with websites, designs, and video content that convert cold visitors into lifelong paying clients — generating compounding growth.',
              },
              {
                icon: Eye,
                label: 'Our Vision',
                title: 'The studio brands partner with, forever.',
                desc: 'To become the premier creative engineering partner for ambitious founders building category-defining brands globally with absolute reliability.',
              },
            ].map((item, i) => (
              <div key={i} className="bg-[#F8FAFF] border border-blue-100/80 rounded-2xl p-8 sm:p-10 shadow-xs hover:border-[#1853CF] transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#1853CF] flex items-center justify-center mb-6 shadow-md shadow-blue-500/20">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-[11px] font-bold uppercase tracking-widest text-[#1853CF] mb-2">{item.label}</div>
                <h3 className="text-xl sm:text-2xl font-black text-[#0B1420] mb-3 leading-tight">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          CORE VALUES — Soft Ice Blue Canvas (NO dark box)
          ================================================================ */}
      <section className="bg-[#F8FAFF] border-y border-blue-100/80 py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="mb-14 max-w-2xl">
            <div className="text-xs font-bold uppercase tracking-widest text-[#1853CF] mb-2">Our Operating Values</div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-[#0B1420] leading-tight">
              THE PRINCIPLES WE LIVE AND SHIP BY.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={i} className="bg-white border border-slate-200/80 rounded-2xl p-7 hover:border-[#1853CF] hover:shadow-lg transition-all shadow-xs">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1853CF] flex items-center justify-center mb-5">
                  <v.icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-black uppercase text-[#0B1420] mb-2">{v.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          TEAM SHOWCASE
          ================================================================ */}
      {team.length > 0 && (
        <section className="bg-white py-20 sm:py-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-[#1853CF] mb-2">The Studio Collective</div>
                <h2 className="text-3xl sm:text-4xl font-black uppercase text-[#0B1420]">
                  MEET THE LEADERSHIP.
                </h2>
              </div>
              <Link href="/team" className="btn-secondary text-xs inline-flex items-center gap-1.5">
                View All Team Members <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member) => (
                <div key={member.id} className="bg-[#F8FAFF] rounded-2xl border border-blue-100/80 p-5 overflow-hidden shadow-xs">
                  <div className="relative h-60 w-full rounded-xl overflow-hidden mb-4 bg-slate-100">
                    <Image
                      src={member.avatar || '/founder.jpg'}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-bold text-base text-[#0B1420]">{member.name}</h3>
                  <p className="text-xs font-bold text-[#1853CF] mb-2">{member.role}</p>
                  <p className="text-xs text-slate-600 line-clamp-2">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================================================================
          BOTTOM CTA STRIP
          ================================================================ */}
      <section className="bg-[#1853CF] text-white py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase mb-4">
            READY TO BUILD SOMETHING EXTRAORDINARY?
          </h2>
          <p className="text-blue-100 text-sm sm:text-base max-w-xl mx-auto mb-8">
            Tell us about your brand vision. We respond within 15 minutes with a comprehensive action plan.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/quote" className="btn-primary bg-white text-[#1853CF] hover:bg-blue-50 shadow-lg">
              Get Started Now <ArrowRight className="w-4 h-4" />
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

