import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, CheckCircle2, Award, ShieldCheck, Mail, MessageSquare, Zap, Clock } from 'lucide-react';

export const metadata = {
  title: 'Our Team — Leadership & Creative Engineering | B Growth Agency',
  description: 'Meet the senior leadership, engineers, designers, and video editors behind B Growth Agency led by Adharsh Katari.',
};

const teamMembers = [
  {
    name: 'Adharsh Katari',
    role: 'Founder & Principal Lead',
    discipline: 'Strategy & Engineering Direction',
    avatar: '/founder.jpg',
    bio: 'Founder of B Growth Agency in Hyderabad. Directing full-stack Next.js web systems, commercial cinema ad productions, and high-conversion brand scaling campaigns for market-defining founders.',
    isFounder: true,
    skills: ['Full-Stack Next.js 14', 'Brand Positioning', 'Cinema Ad Direction', 'Growth Architecture'],
    highlight: 'Leads every enterprise sprint personally',
  },
  {
    name: 'Rohan Mehta',
    role: 'Lead Full-Stack Architect',
    discipline: 'Next.js & Cloud Systems',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    bio: '7+ years building enterprise web applications, headless commerce systems, and ultra-fast Next.js architectures with sub-second page loads and Lighthouse 98+ scores.',
    skills: ['Next.js 14', 'TypeScript', 'Prisma / SQL', 'Cloud Deployments'],
    highlight: 'Lighthouse 98+ Specialist',
  },
  {
    name: 'Sneha Reddy',
    role: 'Senior UI/UX & Design Director',
    discipline: 'Design Systems & Brand Identity',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
    bio: 'Award-winning digital designer specializing in conversion-driven user interfaces, Swiss architectural typography, and multi-platform visual identity guidelines.',
    skills: ['Figma Mastery', 'Design Systems', 'Commercial Posters', 'Micro-Interactions'],
    highlight: 'Design System Architect',
  },
  {
    name: 'Vikram Malhotra',
    role: 'Lead Video Post-Production & Colorist',
    discipline: 'Commercial Video & Motion',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
    bio: 'Cinematic video editor with deep expertise in retention curves, DaVinci Resolve color grading, sound design, and viral short-form advertising cuts.',
    skills: ['DaVinci Resolve', 'Sound Design', 'Commercial Reels', 'Color Grading'],
    highlight: 'Cinema 4K Post-Lead',
  },
  {
    name: 'Ananya Sharma',
    role: 'Growth Marketing & SEO Specialist',
    discipline: 'Search & Conversion Science',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
    bio: 'Data-driven growth strategist managing technical on-page SEO, conversion rate optimization (CRO), and organic customer acquisition funnels.',
    skills: ['Technical SEO', 'Schema Markup', 'CRO Audits', 'Analytics Strategy'],
    highlight: 'Search Ranking Specialist',
  },
  {
    name: 'David Chen',
    role: 'Motion Graphics & 3D Animator',
    discipline: 'Visual Effects & Animation',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80',
    bio: 'Creating thumb-stopping 3D product visualizations, kinetic typography, and motion identities that elevate brand perception across digital channels.',
    skills: ['After Effects', 'Blender 3D', 'Kinetic Type', 'Lottie Animation'],
    highlight: '3D & Kinetic Motion',
  },
  {
    name: 'Priya Nair',
    role: 'Client Solutions & Operations Director',
    discipline: 'Project Delivery & Milestones',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
    bio: 'Ensuring seamless agency sprints, daily client transparent updates, milestone delivery guarantees, and high-touch relationship management.',
    skills: ['Agile Sprints', 'Client Portals', 'Quality Assurance', 'Timeline Delivery'],
    highlight: 'Milestone Delivery Lead',
  },
];

export default function TeamPage() {
  const founder = teamMembers.find((m) => m.isFounder)!;
  const coreTeam = teamMembers.filter((m) => !m.isFounder);

  return (
    <div className="min-h-screen bg-white">
      
      {/* ================================================================
          2-COLUMN HERO — Balanced, High-Impact, Executive Presence
          ================================================================ */}
      <section className="hero-blue pt-20 sm:pt-24 pb-20 sm:pb-28">
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

            {/* Left Column: Heading & Value Prop */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold tracking-widest uppercase shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-blue-200" />
                <span>B GROWTH AGENCY · STUDIO ARCHITECTS</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.02] tracking-tight uppercase text-white">
                MEET THE MINDS<br />
                <span className="text-blue-200">BEHIND THE WORK.</span>
              </h1>

              <p className="text-blue-100 text-base sm:text-lg leading-relaxed max-w-xl">
                Senior full-stack engineers, award-winning visual designers, and cinema ad directors working directly as your dedicated creative powerhouse. No outsourced intermediaries.
              </p>

              {/* Verified Trust Badges */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-white/15 text-white border border-white/15">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" /> 100% Senior Specialists
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-white/15 text-white border border-white/15">
                  <Clock className="w-3.5 h-3.5 text-blue-200" /> Daily Sprint Transparency
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-white/15 text-white border border-white/15">
                  <Zap className="w-3.5 h-3.5 text-amber-300" /> Direct Slack / Portal Access
                </span>
              </div>

              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  href="/quote"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-[#1853CF] hover:bg-blue-50 text-xs font-black uppercase tracking-wider rounded-xl transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
                >
                  <span>REQUEST SPRINT TEAM</span>
                  <ArrowRight className="w-4 h-4 text-[#1853CF]" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs font-black uppercase tracking-wider rounded-xl border border-white/20 transition-all duration-200"
                >
                  <span>MEET FOUNDER</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Founder Authority Card — Standardized Golden Proportion */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.35)] border border-white/80 transition-transform duration-300 hover:-translate-y-1 text-[#0B1420]">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-blue-50 text-[#1853CF] border border-blue-200">
                    <Award className="w-3.5 h-3.5" /> Studio Principal & Founder
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Active Sprints
                  </span>
                </div>

                <div className="relative h-48 sm:h-52 rounded-2xl overflow-hidden mb-4 bg-[#103EAE]">
                  <Image
                    src={founder.avatar}
                    alt={founder.name}
                    fill
                    className="object-cover object-[50%_15%]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-3.5 left-4 right-4 text-white">
                    <h3 className="text-xl font-black uppercase leading-tight">{founder.name}</h3>
                    <p className="text-xs text-blue-200 font-semibold">{founder.discipline}</p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                  {founder.bio}
                </p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {founder.skills?.slice(0, 3).map((s, idx) => (
                    <span key={idx} className="text-[10px] font-bold bg-blue-50 text-[#1853CF] px-2.5 py-1 rounded-md border border-blue-100">
                      ✓ {s}
                    </span>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-500">Based in Hyderabad, IN</span>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1853CF] hover:bg-blue-700 text-white text-xs font-black uppercase rounded-xl transition-all shadow-sm"
                  >
                    Direct Connect <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================================================================
          CORE CREATIVE & ENGINEERING SPECIALISTS — Clean Modern Cards
          ================================================================ */}
      <section className="py-20 sm:py-24 bg-[#F8FAFF] border-b border-blue-100/70">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 space-y-12">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-black uppercase tracking-[0.2em] text-[#1853CF] mb-2">
                DEPARTMENT LEADS
              </div>
              <h2 className="text-3xl sm:text-4xl font-black uppercase text-[#0B1420] tracking-tight">
                THE CORE SPECIALISTS.
              </h2>
            </div>
            <p className="text-slate-500 text-xs sm:text-sm font-semibold max-w-sm">
              Every client project is led by senior craftspeople with verifiable production track records.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreTeam.map((member, idx) => (
              <div
                key={idx}
                className="bg-white border border-blue-100/80 rounded-2xl overflow-hidden hover:border-[#1853CF] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-60 w-full overflow-hidden bg-slate-900">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    
                    <span className="absolute top-3.5 right-3.5 bg-white/90 backdrop-blur-md text-[#1853CF] text-[10px] font-black uppercase px-2.5 py-1 rounded-md shadow-xs">
                      {member.highlight}
                    </span>

                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="text-[10px] font-black uppercase tracking-widest text-blue-200 block mb-0.5">
                        {member.discipline}
                      </span>
                      <h3 className="text-lg sm:text-xl font-black text-white uppercase leading-tight">
                        {member.name}
                      </h3>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="text-xs font-black uppercase tracking-wider text-[#1853CF]">
                      {member.role}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {member.bio}
                    </p>

                    <div className="pt-3 border-t border-slate-100 space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Focus Areas</span>
                      <div className="flex flex-wrap gap-1.5">
                        {member.skills?.map((s, si) => (
                          <span key={si} className="text-[10px] font-semibold bg-blue-50/70 border border-blue-100 text-[#0B1420] px-2.5 py-1 rounded">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href={`/quote?specialist=${encodeURIComponent(member.name)}`}
                    className="w-full py-3 bg-blue-50 group-hover:bg-[#1853CF] group-hover:text-white border border-blue-200 group-hover:border-[#1853CF] text-[#1853CF] text-xs font-black uppercase tracking-wider rounded-xl text-center block transition-all shadow-xs"
                  >
                    Request on My Sprint →
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================================================================
          COLLABORATION CTA — Radiant Royal Blue Card
          ================================================================ */}
      <section className="bg-white py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="rounded-3xl bg-gradient-to-br from-[#1853CF] via-[#1A54CE] to-[#1242AF] p-10 sm:p-14 lg:p-16 text-white text-center shadow-2xl relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/15 text-blue-100 text-xs font-black uppercase tracking-widest border border-white/20">
                Direct Senior Engineering
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight">
                READY TO BUILD WITH OUR SENIOR TEAM?
              </h2>
              <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
                Direct founder communication, transparent client portal tracking, daily sprint commits, and milestone delivery guarantees from day one.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/quote"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#1853CF] hover:bg-blue-50 text-xs sm:text-sm font-black uppercase tracking-wider rounded-xl transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
                >
                  <span>CALCULATE PROJECT SCOPE</span>
                  <ArrowRight className="w-4 h-4 text-[#1853CF]" />
                </Link>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-black uppercase tracking-wider rounded-xl border border-white/20 transition-all duration-200"
                >
                  <span>TALK TO FOUNDER</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

