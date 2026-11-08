import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Linkedin, Twitter, Github, Award, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Our Team — Leadership & Creative Engineering | B Growth Agency',
  description: 'Meet the senior leadership, engineers, designers, and video editors behind B Growth Agency.',
};

const teamMembers = [
  {
    name: 'Adharsh Katari',
    role: 'Founder & Principal Lead',
    discipline: 'Strategy & Engineering Direction',
    avatar: '/founder.jpg',
    bio: 'Founder of B Growth Agency. Dedicated to engineering high-performance digital products, viral visual campaigns, and scalable Next.js systems that drive compounding revenue for ambitious brands.',
    isFounder: true,
    socials: { linkedin: '#', twitter: '#' },
    skills: ['Full-Stack Architecture', 'Brand Positioning', 'Creative Direction'],
  },
  {
    name: 'Rohan Mehta',
    role: 'Lead Full-Stack Architect',
    discipline: 'Next.js & Cloud Systems',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    bio: '7+ years building enterprise web applications, headless commerce systems, and ultra-fast Next.js architectures with sub-second page loads and Lighthouse 98+ scores.',
    socials: { linkedin: '#', github: '#' },
    skills: ['Next.js 14', 'TypeScript', 'Prisma / SQL', 'Cloud Deployments'],
  },
  {
    name: 'Sneha Reddy',
    role: 'Senior UI/UX & Design Director',
    discipline: 'Design Systems & Brand Identity',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
    bio: 'Award-winning digital designer specializing in conversion-driven user interfaces, Swiss architectural typography, and multi-platform visual identity guidelines.',
    socials: { linkedin: '#' },
    skills: ['Figma Mastery', 'Design Systems', 'Commercial Posters', 'Micro-Interactions'],
  },
  {
    name: 'Vikram Malhotra',
    role: 'Lead Video Post-Production & Colorist',
    discipline: 'Commercial Video & Motion',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
    bio: 'Cinematic video editor with deep expertise in retention curves, DaVinci Resolve color grading, sound design, and viral short-form advertising cuts.',
    socials: { linkedin: '#' },
    skills: ['DaVinci Resolve', 'Sound Design', 'Short-Form Reels', 'Color Grading'],
  },
  {
    name: 'Ananya Sharma',
    role: 'Growth Marketing & SEO Specialist',
    discipline: 'Search & Conversion Science',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
    bio: 'Data-driven growth strategist managing technical on-page SEO, conversion rate optimization (CRO), and organic customer acquisition funnels.',
    socials: { linkedin: '#' },
    skills: ['Technical SEO', 'Schema Markup', 'CRO Audits', 'Analytics Strategy'],
  },
  {
    name: 'David Chen',
    role: 'Motion Graphics & 3D Animator',
    discipline: 'Visual Effects & Animation',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80',
    bio: 'Creating thumb-stopping 3D product visualizations, kinetic typography, and motion identities that elevate brand perception across digital channels.',
    socials: { linkedin: '#' },
    skills: ['After Effects', 'Blender 3D', 'Kinetic Type', 'Lottie Animation'],
  },
  {
    name: 'Priya Nair',
    role: 'Client Solutions & Operations Director',
    discipline: 'Project Delivery & Milestones',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
    bio: 'Ensuring seamless agency sprints, daily client transparent updates, milestone delivery guarantees, and high-touch relationship management.',
    socials: { linkedin: '#' },
    skills: ['Agile Sprints', 'Client Strategy', 'Quality Assurance', 'Timeline Delivery'],
  },
];

export default function TeamPage() {
  const founder = teamMembers.find((m) => m.isFounder)!;
  const coreTeam = teamMembers.filter((m) => !m.isFounder);

  return (
    <div className="min-h-screen bg-[#EAECE8]">
      
      {/* ================================================================
          HERO — Royal Blue
          ================================================================ */}
      <section className="hero-blue py-24 md:py-32">
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 text-center">
          <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-blue-200/70 mb-4">
            B GROWTH AGENCY · THE MINDS BEHIND THE WORK
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase text-white mb-6 leading-tight">
            MEET THE<br />
            <span className="text-blue-200">STUDIO ARCHITECTS.</span>
          </h1>
          <p className="text-blue-100 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Senior full-stack engineers, award-winning visual designers, and cinematic video editors working as your dedicated creative powerhouse.
          </p>
        </div>
      </section>

      {/* ================================================================
          FOUNDER SPOTLIGHT SECTION
          ================================================================ */}
      <section className="py-20 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="bg-white rounded-3xl border border-[#E0E2DA] p-8 sm:p-14 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Founder Circular Portrait */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="relative">
                <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-[#1F5FE6] shadow-2xl bg-[#103EAE]">
                  <img
                    src={founder.avatar}
                    alt={founder.name}
                    className="w-full h-full object-cover object-[50%_15%]"
                  />
                </div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#0B1420] text-white px-5 py-2 rounded-full text-xs font-black uppercase tracking-wider shadow-lg whitespace-nowrap flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Studio Principal</span>
                </div>
              </div>
            </div>

            {/* Founder Details */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF1FF] text-[#1F5FE6] text-xs font-black uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Executive Leadership</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black uppercase text-[#0B1420]">
                {founder.name}
              </h2>
              
              <div className="text-sm sm:text-base font-bold uppercase tracking-widest text-[#1F5FE6]">
                {founder.role} · {founder.discipline}
              </div>

              <p className="text-[#3A4152] text-base sm:text-lg leading-relaxed">
                {founder.bio}
              </p>

              <div className="space-y-3 pt-2">
                <div className="text-xs font-black uppercase tracking-wider text-[#0B1420]">Core Competencies</div>
                <div className="flex flex-wrap gap-2">
                  {founder.skills?.map((skill, i) => (
                    <span key={i} className="px-3.5 py-1.5 rounded-lg bg-[#F4F5F0] border border-[#E0E2DA] text-xs font-bold text-[#0B1420]">
                      ✓ {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex items-center gap-4">
                <Link
                  href="/quote"
                  className="btn-blue shadow-lg shadow-blue-500/25"
                >
                  <span>Work Directly with Adharsh</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="px-6 py-3.5 rounded-lg border-2 border-[#E0E2DA] hover:border-[#1F5FE6] text-[#0B1420] text-xs font-black uppercase tracking-wider transition-colors"
                >
                  Schedule Intro Call
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================================================================
          CORE SENIOR TEAM GRID
          ================================================================ */}
      <section className="py-16 bg-white border-t border-[#E0E2DA]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 space-y-14">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#1F5FE6] bg-[#EBF1FF] px-4 py-1.5 rounded-full inline-block">
              SENIOR SPECIALISTS
            </span>
            <h3 className="text-3xl sm:text-5xl font-black uppercase text-[#0B1420]">
              THE CORE CREATIVE DEPARTMENT.
            </h3>
            <p className="text-sm sm:text-base text-[#6B7384] leading-relaxed">
              Every project is led by senior craftspeople — no juniors, no outsourced uncertainty.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreTeam.map((member, idx) => (
              <div
                key={idx}
                className="bg-[#F4F5F0] border border-[#E0E2DA] rounded-2xl overflow-hidden hover:border-[#1F5FE6] hover:bg-white transition-all shadow-xs hover:shadow-xl group flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-64 w-full overflow-hidden bg-slate-900">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="text-[10px] font-black uppercase tracking-widest text-blue-200 block mb-1">
                        {member.discipline}
                      </span>
                      <h4 className="text-xl font-black text-white uppercase leading-tight">
                        {member.name}
                      </h4>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="text-xs font-black uppercase tracking-wider text-[#1F5FE6]">
                      {member.role}
                    </div>

                    <p className="text-xs sm:text-sm text-[#3A4152] leading-relaxed">
                      {member.bio}
                    </p>

                    <div className="pt-2 border-t border-[#E0E2DA] space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7384] block">Focus Areas</span>
                      <div className="flex flex-wrap gap-1.5">
                        {member.skills?.map((s, si) => (
                          <span key={si} className="text-[10px] font-semibold bg-white border border-[#E0E2DA] text-[#0B1420] px-2.5 py-1 rounded">
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
                    className="w-full py-2.5 bg-white group-hover:bg-[#1F5FE6] group-hover:text-white border border-[#E0E2DA] group-hover:border-[#1F5FE6] text-[#0B1420] text-xs font-black uppercase tracking-wider rounded-lg text-center block transition-colors"
                  >
                    Request on Project →
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================================================================
          COLLABORATION CTA
          ================================================================ */}
      <section className="hero-blue py-24">
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 text-center space-y-6">
          <div className="text-xs font-black uppercase tracking-widest text-blue-200">
            START YOUR ENGAGEMENT
          </div>
          <h2 className="text-4xl sm:text-6xl font-black uppercase text-white leading-tight">
            READY TO BUILD WITH<br />OUR SENIOR TEAM?
          </h2>
          <p className="text-blue-100 text-lg max-w-xl mx-auto leading-relaxed">
            Direct communication, daily sprint milestones, and senior-level execution from day one.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link href="/quote" className="btn-primary shadow-xl shadow-black/25">
              Calculate Project Scope <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="btn-outline-white">
              Talk to Our Team
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
