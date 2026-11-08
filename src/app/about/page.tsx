import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import { ArrowRight, Target, Eye, Award, Heart, Rocket, Linkedin, Twitter, Github, Dribbble } from 'lucide-react';

export const metadata = {
  title: 'About Us — The B Growth Agency Story',
  description: 'B Growth Agency: our mission, values, and the senior creative team behind your brand growth.',
};

export const revalidate = 0;

const values = [
  { icon: Target, title: 'Results First', desc: 'Every pixel, every line of code serves a measurable business outcome. We don\'t ship anything we can\'t defend with data.' },
  { icon: Award, title: 'Premium Craft', desc: 'World-class execution at every touchpoint — from code architecture to color theory. No compromises, no shortcuts.' },
  { icon: Heart, title: 'Client Partnership', desc: 'You\'re not a ticket in a queue. You\'re a partner. We communicate daily, ship transparently, and celebrate your wins.' },
  { icon: Rocket, title: 'Speed to Market', desc: 'Agile, sprint-based execution. Most projects from signed brief to live in under 4 weeks.' },
];

const milestones = [
  { year: '2021', title: 'Studio Founded', desc: 'B Growth Agency launched with a focus on Next.js web development for Indian startups.' },
  { year: '2022', title: 'Design Division Added', desc: 'Expanded into commercial poster and graphic design. First 50 clients onboarded.' },
  { year: '2023', title: 'Video Production Launch', desc: 'Added cinematic video editing and social reel production. Revenue 3× in 12 months.' },
  { year: '2024', title: 'Full-Stack Studio', desc: 'Now a complete digital studio. 150+ projects, 12+ industries, 98% satisfaction rate.' },
];

export default async function AboutPage() {
  const teamMembers = await prisma.teamMember.findMany({ orderBy: { order: 'asc' } });

  return (
    <div className="min-h-screen bg-[#EAECE8]">

      {/* ================================================================
          HERO — Full-bleed Royal Blue
          ================================================================ */}
      <section className="hero-blue py-28 md:py-36">
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-4xl">
            <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-blue-200/70 mb-6">
              B GROWTH AGENCY · OUR STORY
            </div>
            <h1 className="text-[clamp(2.5rem,7vw,6rem)] font-black leading-[0.95] tracking-tight uppercase text-white mb-8">
              WE REPLACE<br />
              <span className="text-blue-200">GENERIC</span><br />
              WITH GREAT.
            </h1>
            <p className="text-blue-100 text-xl leading-relaxed max-w-2xl">
              Founded on the conviction that ambitious brands deserve world-class software engineering 
              and culture-defining creative design — not templates, not agencies-in-a-box.
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================
          MISSION & VISION
          ================================================================ */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Target,
                label: 'Our Mission',
                title: 'Build digital products that pay for themselves.',
                desc: 'To empower entrepreneurs, creators, and enterprises with websites, designs, and videos that convert visitors into lifelong advocates — generating compounding revenue growth.',
              },
              {
                icon: Eye,
                label: 'Our Vision',
                title: 'The studio brands come back to, forever.',
                desc: 'To become the go-to creative engineering partner for ambitious founders building category-defining brands across Southeast Asia and beyond.',
              },
            ].map((item, i) => (
              <div key={i} className="bg-[#F4F5F0] border border-[#E0E2DA] rounded-xl p-10">
                <div className="w-14 h-14 rounded-xl bg-[#1F5FE6] flex items-center justify-center mb-6">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-[11px] font-bold uppercase tracking-widest text-[#1F5FE6] mb-3">{item.label}</div>
                <h3 className="text-2xl font-black text-[#0B1420] mb-4 leading-tight">{item.title}</h3>
                <p className="text-[#6B7384] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          CORE VALUES
          ================================================================ */}
      <section className="bg-[#0F1117] py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="mb-14">
            <div className="section-label text-gray-500">Our Values</div>
            <h2 className="text-4xl sm:text-5xl font-black uppercase text-white max-w-2xl leading-[1]">
              THE PRINCIPLES<br />WE LIVE BY.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={i} className="bg-[#181C27] border border-white/5 rounded-xl p-7 hover:border-[#1F5FE6] transition-colors">
                <div className="w-12 h-12 rounded-xl bg-[#1F5FE6] flex items-center justify-center mb-5">
                  <v.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-base font-black uppercase text-white mb-3">{v.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          TIMELINE / MILESTONES
          ================================================================ */}
      <section className="bg-[#EAECE8] py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="mb-14">
            <div className="section-label">Our Journey</div>
            <h2 className="text-4xl sm:text-5xl font-black uppercase text-[#0B1420] max-w-2xl leading-[1]">
              HOW WE GOT HERE.
            </h2>
          </div>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-[#1F5FE6]/20 hidden md:block" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div key={i} className="relative md:pl-20 flex gap-6 md:block">
                  {/* Year dot */}
                  <div className="hidden md:flex absolute left-0 w-12 h-12 rounded-full bg-[#1F5FE6] items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/20">
                    <span className="text-[10px] font-black text-white">{m.year}</span>
                  </div>
                  <div className="md:hidden w-20 flex-shrink-0">
                    <div className="text-2xl font-black text-[#1F5FE6]">{m.year}</div>
                  </div>
                  <div className="bg-white border border-[#E0E2DA] rounded-xl p-7 flex-1">
                    <h3 className="text-lg font-black text-[#0B1420] mb-2">{m.title}</h3>
                    <p className="text-sm text-[#6B7384] leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          TEAM GRID
          ================================================================ */}
      {teamMembers.length > 0 && (
        <section className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
            <div className="mb-14 text-center">
              <div className="section-label text-center">The People</div>
              <h2 className="text-4xl sm:text-5xl font-black uppercase text-[#0B1420]">
                MEET THE STUDIO.
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member) => {
                let socials: Record<string, string> = {};
                try { socials = JSON.parse(member.socials); } catch {}
                return (
                  <div key={member.id} className="group text-center">
                    <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-5">
                      <Image src={member.avatar} alt={member.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-5">
                        <div className="flex gap-3">
                          {socials.linkedin && <a href={socials.linkedin} target="_blank" rel="noreferrer" className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-[#1F5FE6]"><Linkedin className="w-3.5 h-3.5" /></a>}
                          {socials.twitter && <a href={socials.twitter} target="_blank" rel="noreferrer" className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-[#1F5FE6]"><Twitter className="w-3.5 h-3.5" /></a>}
                        </div>
                      </div>
                    </div>
                    <h3 className="text-base font-black text-[#0B1420]">{member.name}</h3>
                    <div className="text-xs font-semibold text-[#1F5FE6] uppercase tracking-wider mt-1">{member.role}</div>
                    <p className="text-xs text-[#6B7384] leading-relaxed mt-2 line-clamp-3">{member.bio}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ================================================================
          CTA
          ================================================================ */}
      <section className="hero-blue py-24">
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 text-center">
          <h2 className="text-4xl sm:text-5xl font-black uppercase text-white mb-6">
            READY TO WORK<br />WITH THE BEST?
          </h2>
          <p className="text-blue-100 text-lg max-w-xl mx-auto mb-10">
            Get a detailed project proposal within 24 hours. No obligation, just clarity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quote" className="btn-primary shadow-lg shadow-black/25">
              Start Your Project <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="btn-outline-white">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
