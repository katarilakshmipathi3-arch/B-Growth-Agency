'use client';

import React, { useState } from 'react';
import { 
  Briefcase, 
  GraduationCap, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Code, 
  Video, 
  Palette, 
  TrendingUp, 
  Search, 
  X,
  Send,
  Building2,
  Calendar,
  Layers,
  Award,
  Globe,
  Zap,
  ShieldCheck,
  HeartHandshake
} from 'lucide-react';

export interface GlobalOpportunity {
  id: string;
  type: 'Full-Time' | 'Internship';
  programTitle: string;
  department: 'Engineering' | 'Cinema & Video' | 'Brand & 3D Design' | 'Growth & Solutions';
  track: string;
  duration: string;
  location: string;
  stipendOrSalary: string;
  cohort: string;
  ppoRate: string;
  isFlagship?: boolean;
  overview: string;
  responsibilities: string[];
  learningOutcomes: string[];
  eligibility: string[];
  globalPerks: string[];
}

const GLOBAL_OPPORTUNITIES: GlobalOpportunity[] = [
  // ── 4 WORLD-CLASS GLOBAL INTERNSHIP TRACKS ──
  {
    id: 'intern-eng',
    type: 'Internship',
    programTitle: 'Next.js 14 & Cloud Edge Engineering Fellow',
    department: 'Engineering',
    track: 'Full-Stack Software Architecture Fellowship',
    duration: '3 to 6 Months (Flexible with Academic Calendar)',
    location: 'Hyderabad Studio (HITEC City) · Hybrid / Remote Available',
    stipendOrSalary: '₹25,000 – ₹35,000 / month Stipend + Guaranteed PPO Evaluation',
    cohort: 'Spring / Summer 2025 Cohort',
    ppoRate: '85% PPO Conversion to Full-Time Associate Architect (₹9L - ₹15L CTC)',
    isFlagship: true,
    overview: 'An intense, high-craft engineering fellowship. You will NOT build toy apps or fetch coffee. You will ship production Next.js 14 code, build edge-rendered micro-frontends, integrate payment gateways, and optimize for 99+ Core Web Vitals alongside our senior leads.',
    responsibilities: [
      'Write production-grade Next.js 14 (App Router), TypeScript, and Tailwind CSS code deployed globally.',
      'Architect relational data schemas with Prisma ORM (SQLite / PostgreSQL) and high-speed API routes.',
      'Profile client web applications to achieve sub-second LCP and flawless Lighthouse scores.',
      'Build internal client portal tooling and interactive billing calculators.',
    ],
    learningOutcomes: [
      'Mastery of modern edge computing, React Server Components (RSC), and cache invalidation.',
      'Production Git workflows, PR reviews, and automated CI/CD deployment pipelines.',
      'Direct 1-on-1 code reviews with our Principal Engineering Lead.',
    ],
    eligibility: [
      'Pre-final or final-year engineering students (B.Tech / M.Tech / MCA) or exceptional self-taught builders.',
      'Proficiency in JavaScript, React, HTML/CSS, and foundational understanding of REST/API design.',
      'Active GitHub profile or live project URLs demonstrating curiosity and craft.',
    ],
    globalPerks: [
      'High-performance Apple Silicon development machine provided.',
      'Direct client launch credits on live platforms.',
      'Fast-track PPO offer before your campus graduation.',
    ],
  },
  {
    id: 'intern-cinema',
    type: 'Internship',
    programTitle: 'Cinema 4K Commercial Direction & Colorist Fellow',
    department: 'Cinema & Video',
    track: 'Commercial Ad Film Production & Post-Production Fellowship',
    duration: '3 to 6 Months',
    location: 'Hyderabad Production Floor (HITEC City)',
    stipendOrSalary: '₹22,000 – ₹30,000 / month Stipend + Guaranteed PPO Evaluation',
    cohort: 'Spring / Summer 2025 Cohort',
    ppoRate: '80% PPO Conversion to Commercial Video Editor (₹7L - ₹12L CTC)',
    isFlagship: true,
    overview: 'Join an active commercial film production unit. You will handle RED V-Raptor and ARRI camera packages, rig cinema lighting on set, execute 10-bit DaVinci Resolve color grading, and engineer retention-first commercial cuts for global brands.',
    responsibilities: [
      'Assist on commercial brand shoot floors: lighting setup, camera rigging, audio sync, and gimbal operation.',
      'Cut high-impact 60s Instagram Reels, YouTube Shorts, and brand documentaries on DaVinci Resolve Studio.',
      'Execute professional color grading using node trees, HDR color wheels, and film emulation curves.',
      'Engineer audio design with kinetic sound effects and spatial mixing.',
    ],
    learningOutcomes: [
      'Mastery of cinema digital imaging technician (DIT) pipelines and RAW color workflows.',
      'Psychology of hook rates, retention pacing, and viral social algorithms.',
      'IMDb-credited or commercial portfolio pieces for category-leading brands.',
    ],
    eligibility: [
      'Film, media, mass communication students, or passionate self-taught filmmakers/editors.',
      'Working knowledge of DaVinci Resolve, Adobe Premiere Pro, or After Effects.',
      'A showreel or link to 2+ edited video projects showing rhythm, pacing, and visual style.',
    ],
    globalPerks: [
      'Full access to studio camera packages and studio floor for approved weekend personal creative projects.',
      'On-set catered production meals and gear insurance coverage.',
      'High-end color-calibrated post-production editing workstation.',
    ],
  },
  {
    id: 'intern-brand',
    type: 'Internship',
    programTitle: 'Brand Identity Systems & 3D Visual Fellow',
    department: 'Brand & 3D Design',
    track: 'Enterprise Visual Design & Moat Engineering Fellowship',
    duration: '3 to 6 Months',
    location: 'Hyderabad Studio · Hybrid / Remote Available',
    stipendOrSalary: '₹20,000 – ₹30,000 / month Stipend + Guaranteed PPO Evaluation',
    cohort: 'Spring / Summer 2025 Cohort',
    ppoRate: '85% PPO Conversion to Brand Designer (₹6L - ₹11L CTC)',
    overview: 'Learn how international design studios like Pentagram and Collins craft visual moats that allow brands to command 4x prices. You will design brand identity guidelines, geometric logos, Figma UI design tokens, commercial posters, and 3D mockups.',
    responsibilities: [
      'Design comprehensive brand identity systems: vector logos, typography scales, and color psychology palettes.',
      'Create high-converting commercial advertising posters, social brand packs, and presentation decks.',
      'Build scalable Figma component libraries with auto-layout and design token hierarchies.',
      'Collaborate with developers to ensure 100% pixel-perfect design implementation.',
    ],
    learningOutcomes: [
      'Deep training in typography theory, grid systems, and mathematical golden ratios.',
      'Client presentation craft: learning how to pitch and defend design rationale to founders.',
      'Published visual identity case studies for high-growth startups globally.',
    ],
    eligibility: [
      'Design students (NID, NIFT, IIT Design, or similar institutions) or self-taught visual designers.',
      'Proficiency in Figma, Adobe Illustrator, and Photoshop. Blender / 3D skills are a huge plus.',
      'Portfolio link (Behance, Dribbble, personal website, or PDF) demonstrating typography and layout.',
    ],
    globalPerks: [
      'Figma Pro and Adobe Creative Cloud enterprise licenses.',
      'Studio book stipend for typography and design monographs.',
      'Pre-Placement Offer (PPO) for full-time Visual Brand Designer.',
    ],
  },
  {
    id: 'intern-growth',
    type: 'Internship',
    programTitle: 'Growth Strategy & Business Diagnostics Fellow',
    department: 'Growth & Solutions',
    track: 'Clinical Business Auditing & Growth Consulting Fellowship',
    duration: '3 to 6 Months',
    location: 'Hyderabad Studio · Hybrid',
    stipendOrSalary: '₹22,000 – ₹32,000 / month Stipend + Guaranteed PPO Evaluation',
    cohort: 'Spring / Summer 2025 Cohort',
    ppoRate: '80% PPO Conversion to Growth Partner (₹8L - ₹14L CTC)',
    overview: 'Work directly alongside Founder & Strategic Lead Adharsh Katari. You will evaluate businesses using our Hospital Diagnostic Model, diagnose bottlenecks in client funnels, draft clinical prescription reports, and optimize client onboarding pipelines.',
    responsibilities: [
      'Analyze prospective client businesses across our 5 vital organs (traffic, conversion, brand, retention, video).',
      'Conduct Conversion Rate Optimization (CRO) audits and user friction teardowns on live websites.',
      'Draft itemized clinical audit proposals and coordinate digital client onboarding in client portals.',
      'Track sprint performance data, client ROI attribution, and case study documentation.',
    ],
    learningOutcomes: [
      'Executive-level understanding of startup unit economics, CAC/LTV, and conversion funnels.',
      'Direct client communication and strategic consulting exposure rarely given to interns.',
      'McKinsey/Bain caliber analytical frameworks applied to modern digital growth agencies.',
    ],
    eligibility: [
      'Business, management, economics, or engineering students with sharp analytical and writing skills.',
      'Curiosity about startup growth, SaaS models, e-commerce, and high-ticket service sales.',
      'Excellent verbal and written communication skills in English.',
    ],
    globalPerks: [
      'Direct daily shadowing with agency leadership and startup founders.',
      'Executive performance bonuses on closed client recovery sprints.',
      'PPO fast-track to Client Partner / Growth Strategist.',
    ],
  },

  // ── 2 FULL-TIME PILLARS ──
  {
    id: 'fulltime-arch',
    type: 'Full-Time',
    programTitle: 'Senior Full-Stack Next.js 14 Principal Architect',
    department: 'Engineering',
    track: 'Full-Time Engineering Leadership',
    duration: 'Full-Time Permanent Role',
    location: 'Hyderabad (HITEC City) · Hybrid Options',
    stipendOrSalary: '₹10,00,000 – ₹18,00,000 / year + Sprint Performance Profit Share',
    cohort: 'Immediate Joining',
    ppoRate: 'Senior Leadership Track',
    overview: 'Lead the digital engineering division of B Growth Agency. Own architecture, mentor engineering fellows, and deliver custom Next.js 14 platforms for global clients.',
    responsibilities: [
      'Architect full-stack Next.js applications using App Router, edge middleware, and Prisma SQLite/PostgreSQL.',
      'Guarantee 98+ Lighthouse performance and sub-second TTFB across all deployed client sites.',
      'Interface directly with client CTOs and founders during kickoff and delivery sprints.',
    ],
    learningOutcomes: [
      'Complete autonomy over technology stack and engineering culture.',
      'Equity/profit-sharing on high-margin agency retainers.',
    ],
    eligibility: [
      '2+ years of production experience in Next.js, React, TypeScript, and modern edge infrastructure.',
      'Verifiable production web applications and strong architectural thinking.',
    ],
    globalPerks: [
      'Top-tier hardware (MacBook Pro M3 Max) + 4K displays.',
      'Flexible hybrid schedule with studio space in HITEC City.',
    ],
  },
  {
    id: 'fulltime-cinema',
    type: 'Full-Time',
    programTitle: 'Senior Commercial Film Director & Lead Editor',
    department: 'Cinema & Video',
    track: 'Full-Time Video Leadership',
    duration: 'Full-Time Permanent Role',
    location: 'Hyderabad Production Studio Floor',
    stipendOrSalary: '₹8,00,000 – ₹14,00,000 / year + Production Bonuses',
    cohort: 'Immediate Joining',
    ppoRate: 'Department Lead Track',
    overview: 'Direct commercial shoots, guide on-set camera crews, and lead the post-production studio in creating cinema-grade video ads and viral brand reels.',
    responsibilities: [
      'Direct commercial shoots on-set with 4K RED / ARRI camera systems and studio lighting packages.',
      'Lead a team of video editing fellows and supervise DaVinci Resolve color grading pipelines.',
      'Pioneer viral retention hooks and dynamic sound design across all client commercial assets.',
    ],
    learningOutcomes: [
      'Executive creative direction credit on national and global brand commercial campaigns.',
    ],
    eligibility: [
      '2+ years directing, shooting, or senior editing commercial ad films or high-retention video reels.',
      'Mastery of DaVinci Resolve Studio and cinematic lighting techniques.',
    ],
    globalPerks: [
      'Executive director suite with 10-bit reference monitoring.',
      'Campaign performance bonuses based on client ad ROAS and reach.',
    ],
  },
];

export default function CareersClientView() {
  const [filterType, setFilterType] = useState<string>('Internship'); // Default to Internships
  const [filterDept, setFilterDept] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Application Modal State
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [applyingFor, setApplyingFor] = useState<GlobalOpportunity | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: 'Hyderabad',
    collegeOrCompany: '',
    portfolioUrl: '',
    resumeUrl: '',
    coverNote: '',
  });

  const filtered = GLOBAL_OPPORTUNITIES.filter((opp) => {
    const matchesType = filterType === 'ALL' || opp.type === filterType;
    const matchesDept = filterDept === 'ALL' || opp.department === filterDept;
    const matchesSearch = opp.programTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.track.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesDept && matchesSearch;
  });

  const handleOpenApply = (opp: GlobalOpportunity) => {
    setApplyingFor(opp);
    setSubmitted(false);
    setApplyModalOpen(true);
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.phone || !applyingFor) {
      alert('Please fill in all required fields');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/careers/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          roleId: applyingFor.id,
          roleTitle: applyingFor.programTitle,
          applicantType: applyingFor.type,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        alert(data.error || 'Failed to submit application');
      }
    } catch (err) {
      console.error('Submission error:', err);
      alert('Network error submitting application');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-20 sm:py-24 bg-[#F8FAFF] border-b border-blue-100/80">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="text-xs font-black uppercase tracking-[0.2em] text-[#1853CF] inline-flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#1853CF]" />
            GLOBAL TALENT FELLOWSHIP · HYDERABAD &amp; HYBRID
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase text-[#0B1420] tracking-tight">
            NO BUSYWORK. REAL CRAFT.
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            At B Growth Agency, we operate like an elite digital laboratory. Our fellows work directly with senior leads on production Next.js platforms, cinema camera sets, and high-ticket branding sprints with competitive stipends and direct Pre-Placement Offers (PPO).
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-xs mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Type Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'Internship', label: 'Paid Internships (4 Tracks)', icon: GraduationCap },
              { id: 'Full-Time', label: 'Full-Time Roles', icon: Briefcase },
              { id: 'ALL', label: 'All Openings', icon: Layers },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setFilterType(t.id)}
                className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 ${
                  filterType === t.id
                    ? 'bg-[#1853CF] text-white shadow-md shadow-[#1853CF]/20 scale-105'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {t.icon && <t.icon className="w-3.5 h-3.5" />}
                <span>{t.label}</span>
              </button>
            ))}
          </div>

          {/* Department Filter & Search */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <select
              value={filterDept}
              onChange={(e) => setFilterDept(e.target.value)}
              className="px-3 py-2 text-xs font-bold rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1853CF]/20 focus:border-[#1853CF] w-full sm:w-auto"
            >
              <option value="ALL">All Disciplines</option>
              <option value="Engineering">Engineering &amp; Code</option>
              <option value="Cinema & Video">Cinema &amp; Video</option>
              <option value="Brand & 3D Design">Brand &amp; 3D Design</option>
              <option value="Growth & Solutions">Growth &amp; Strategy</option>
            </select>

            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search tracks, roles, skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1853CF]/20 focus:border-[#1853CF]"
              />
            </div>
          </div>

        </div>

        {/* Opportunities List */}
        <div className="space-y-6">
          {filtered.map((opp) => (
            <div
              key={opp.id}
              className={`bg-white rounded-3xl p-6 sm:p-9 border transition-all duration-300 space-y-6 ${
                opp.isFlagship
                  ? 'border-[#1853CF]/80 shadow-md ring-1 ring-[#1853CF]/20'
                  : 'border-slate-200/80 shadow-xs hover:border-[#1853CF] hover:shadow-xl'
              }`}
            >
              {/* Header Row */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${
                      opp.type === 'Internship'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-blue-50 text-[#1853CF] border border-blue-200'
                    }`}>
                      {opp.type === 'Internship' ? 'Paid Global Internship' : 'Full-Time Position'}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase px-3 py-1 rounded-full bg-slate-100">
                      {opp.department}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase px-3 py-1 rounded-full bg-slate-100">
                      {opp.cohort}
                    </span>
                    {opp.isFlagship && (
                      <span className="text-[10px] font-black uppercase text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full flex items-center gap-1">
                        ★ Flagship Fellowship Track
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-[#0B1420] tracking-tight uppercase">
                    {opp.programTitle}
                  </h3>
                  <div className="text-xs font-bold text-[#1853CF] uppercase tracking-wider">
                    {opp.track} · {opp.duration}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
                    {opp.overview}
                  </p>
                </div>

                {/* Compensation & Apply CTA */}
                <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3 flex-shrink-0 pt-2 lg:pt-0">
                  <div className="text-left lg:text-right">
                    <div className="text-base sm:text-lg font-black text-[#0B1420]">
                      {opp.stipendOrSalary}
                    </div>
                    <div className="text-[11px] text-emerald-600 font-bold mt-0.5">
                      ✓ {opp.ppoRate}
                    </div>
                    <div className="text-[11px] text-slate-400 font-medium mt-0.5">
                      📍 {opp.location}
                    </div>
                  </div>

                  <button
                    onClick={() => handleOpenApply(opp)}
                    className="px-7 py-3.5 rounded-xl bg-[#1853CF] hover:bg-blue-700 text-white text-xs font-black uppercase tracking-wider transition-all shadow-md hover:shadow-xl flex items-center gap-2"
                  >
                    <span>Apply for {opp.type}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 3-Column Fellowship Pillars */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-100 text-xs">
                <div>
                  <h4 className="font-black text-[#0B1420] uppercase mb-2.5 tracking-wider text-[11px] flex items-center gap-1.5">
                    <Code className="w-3.5 h-3.5 text-[#1853CF]" />
                    What You Will Build (Real Sprints)
                  </h4>
                  <ul className="space-y-1.5 text-slate-600">
                    {opp.responsibilities.map((r, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#1853CF] flex-shrink-0 mt-0.5" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-black text-[#0B1420] uppercase mb-2.5 tracking-wider text-[11px] flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-emerald-600" />
                    What You Will Master (Learning Outcomes)
                  </h4>
                  <ul className="space-y-1.5 text-slate-600">
                    {opp.learningOutcomes.map((l, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">›</span>
                        <span>{l}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-black text-[#0B1420] uppercase mb-2.5 tracking-wider text-[11px] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    Fellowship Perks &amp; Equipment
                  </h4>
                  <ul className="space-y-1.5 text-slate-600">
                    {opp.globalPerks.map((p, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-amber-500 font-bold">★</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* ── Modal: Instant Fellowship Application ── */}
      {applyModalOpen && applyingFor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl my-8">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-black uppercase text-[#1853CF] tracking-widest">
                  Direct Fellowship Application · {applyingFor.type}
                </span>
                <h3 className="text-lg sm:text-xl font-black text-[#0B1420] uppercase">
                  {applyingFor.programTitle}
                </h3>
                <div className="text-xs text-slate-500 font-semibold">{applyingFor.stipendOrSalary}</div>
              </div>
              <button
                onClick={() => setApplyModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-xs font-bold"
              >
                ✕
              </button>
            </div>

            {submitted ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-black text-[#0B1420] uppercase">Application Submitted Successfully!</h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                  Thank you for applying to the B Growth Fellowship. Our leadership team personally reviews your portfolio and code/video links within 48 hours. If shortlisted, we will invite you to a 30-minute virtual technical conversation.
                </p>
                <button
                  onClick={() => setApplyModalOpen(false)}
                  className="px-6 py-2.5 rounded-xl bg-[#1853CF] text-white text-xs font-black uppercase tracking-wider"
                >
                  Return to Opportunities
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitApplication} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Legal Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1853CF]/20 focus:border-[#1853CF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="rahul@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1853CF]/20 focus:border-[#1853CF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1853CF]/20 focus:border-[#1853CF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Current City / Location</label>
                    <input
                      type="text"
                      placeholder="Hyderabad / Bangalore / Other"
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1853CF]/20 focus:border-[#1853CF]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    College / University / Current Company
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. IIT Hyderabad / BITS Pilani / Self-Taught"
                    value={form.collegeOrCompany}
                    onChange={(e) => setForm({ ...form, collegeOrCompany: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1853CF]/20 focus:border-[#1853CF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Portfolio / GitHub / Showreel / Behance Link *
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://github.com/... or https://behance.net/... or showreel link"
                    value={form.portfolioUrl}
                    onChange={(e) => setForm({ ...form, portfolioUrl: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1853CF]/20 focus:border-[#1853CF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Resume Link (Google Drive / LinkedIn / Cloud) *
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://drive.google.com/... or LinkedIn Profile"
                    value={form.resumeUrl}
                    onChange={(e) => setForm({ ...form, resumeUrl: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1853CF]/20 focus:border-[#1853CF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Why are you drawn to B Growth Agency? (Short statement of craft)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Tell us about the project you are most proud of, or why you want to build category-defining brands with us..."
                    value={form.coverNote}
                    onChange={(e) => setForm({ ...form, coverNote: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1853CF]/20 focus:border-[#1853CF]"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setApplyModalOpen(false)}
                    className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2.5 text-xs font-black uppercase tracking-wider text-white bg-[#1853CF] hover:bg-blue-700 rounded-xl shadow-md transition-all flex items-center gap-2"
                  >
                    {submitting ? 'Submitting Application...' : 'Submit Fellowship Application'}
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
