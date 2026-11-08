import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { 
  ArrowRight, Check, Star, Code2, Palette, Video, Globe, 
  Layers, Megaphone, Smartphone, ShoppingCart, Film, Sparkles,
  ShieldCheck, Clock, Zap, CheckCircle2
} from 'lucide-react';

export const metadata = {
  title: 'Services & Capabilities — Full-Stack Web, Design, Cinema Ads | B Growth Agency',
  description: 'Enterprise Next.js development, graphic design, cinematic video editing, and commercial film shooting in Hyderabad.',
};

export const revalidate = 0;

function getIcon(name: string) {
  switch (name) {
    case 'Code':
    case 'Code2':
      return <Code2 className="w-5 h-5 text-[#1853CF]" />;
    case 'Palette':
      return <Palette className="w-5 h-5 text-[#1853CF]" />;
    case 'Video':
      return <Video className="w-5 h-5 text-[#1853CF]" />;
    case 'Globe':
      return <Globe className="w-5 h-5 text-[#1853CF]" />;
    case 'Layers':
      return <Layers className="w-5 h-5 text-[#1853CF]" />;
    case 'Megaphone':
      return <Megaphone className="w-5 h-5 text-[#1853CF]" />;
    case 'Smartphone':
      return <Smartphone className="w-5 h-5 text-[#1853CF]" />;
    case 'ShoppingCart':
      return <ShoppingCart className="w-5 h-5 text-[#1853CF]" />;
    case 'Film':
      return <Film className="w-5 h-5 text-[#1853CF]" />;
    default:
      return <Code2 className="w-5 h-5 text-[#1853CF]" />;
  }
}

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
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
                <span>B GROWTH AGENCY · STUDIO CAPABILITIES</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.02] tracking-tight uppercase text-white">
                SERVICES<br />
                <span className="text-blue-200">BUILT TO</span><br />
                DOMINATE.
              </h1>

              <p className="text-blue-100 text-base sm:text-lg leading-relaxed max-w-xl">
                From high-performance Next.js 14 web applications to commercial brand identity and cinema-grade advertising film production — every capability engineered for compounding ROI.
              </p>

              {/* Service Commitments */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-white/15 text-white border border-white/15">
                  <Clock className="w-3.5 h-3.5 text-blue-200" /> 7–14 Day Delivery Sprints
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-white/15 text-white border border-white/15">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" /> 100% Code Ownership
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-white/15 text-white border border-white/15">
                  <Zap className="w-3.5 h-3.5 text-amber-300" /> Live Tracking Portal
                </span>
              </div>

              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  href="/quote"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-[#1853CF] hover:bg-blue-50 text-xs font-black uppercase tracking-wider rounded-xl transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
                >
                  <span>GET FREE PROPOSAL</span>
                  <ArrowRight className="w-4 h-4 text-[#1853CF]" />
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs font-black uppercase tracking-wider rounded-xl border border-white/20 transition-all duration-200"
                >
                  <span>VIEW PRICING TIERS</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Live Studio Capabilities & SLA Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.35)] border border-white/80 transition-transform duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between gap-3 mb-5">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Sprints Open This Month
                  </span>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    SLA Guarantee
                  </span>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-[#1853CF]">Sprint Velocity</div>
                      <div className="text-base font-black text-[#0B1420]">7–14 Days Standard</div>
                    </div>
                    <span className="px-2.5 py-1 bg-white rounded-lg text-xs font-black text-[#1853CF] border border-blue-200">
                      Guaranteed
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Active Sprint Capacity</div>
                      <div className="text-base font-black text-[#0B1420]">3 Enterprise Slots Open</div>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-black">
                      Available Now
                    </span>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  <div className="text-xs font-black uppercase tracking-wider text-[#0B1420]">
                    Verified Studio Stack & Gear
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {['Next.js 14 App Router', 'TypeScript', 'Tailwind CSS', 'Cinema 4K ARRI / RED', 'DaVinci Resolve', 'Figma Pro'].map((tech) => (
                      <span key={tech} className="text-[10px] font-bold px-2.5 py-1 bg-blue-50 text-[#1853CF] rounded-md border border-blue-100">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-xs font-bold text-slate-500">
                    Direct Founder Lead
                  </div>
                  <Link
                    href="/quote"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1853CF] hover:bg-blue-700 text-white text-xs font-black uppercase rounded-xl transition-all shadow-sm"
                  >
                    Lock Sprint Slot <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================================================================
          SERVICE CATEGORIES OVERVIEW — Soft Ice Mist Background (#F8FAFF)
          ================================================================ */}
      <section className="bg-[#F8FAFF] py-16 sm:py-20 border-b border-blue-100/80">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Code2, title: 'Web Development', desc: 'Next.js 14, React, TypeScript. SEO-optimised, performance-first websites.', from: '₹14,999' },
              { icon: Palette, title: 'Graphic Design', desc: 'Commercial posters, brand identity, social media campaign graphics.', from: '₹499' },
              { icon: Video, title: 'Video Editing', desc: 'Cinematic reels, ad cuts, YouTube edits with custom color grading.', from: '₹1,999' },
              { icon: Film, title: 'Commercial Film Shoot', desc: 'Cinema 4K commercial ads, corporate brand films, multi-camera sets.', from: '₹49,999' },
            ].map((cat, i) => (
              <div key={i} className="bg-white border border-blue-100/80 rounded-2xl p-7 hover:border-[#1853CF] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-5 group-hover:bg-[#1853CF] transition-colors">
                    <cat.icon className="w-6 h-6 text-[#1853CF] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-black text-[#0B1420] uppercase mb-2">{cat.title}</h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">{cat.desc}</p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Starting</span>
                  <span className="text-[#1853CF] font-black text-sm">{cat.from}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          ALL SERVICES GRID — Crisp White Background (#FFFFFF)
          ================================================================ */}
      <section className="bg-white py-20 sm:py-24 border-b border-blue-100/70">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
            <div>
              <div className="text-xs font-black tracking-[0.2em] uppercase text-[#1853CF] mb-2">
                ALL CAPABILITIES ({services.length})
              </div>
              <h2 className="text-3xl sm:text-4xl font-black uppercase text-[#0B1420] tracking-tight">
                CHOOSE YOUR ENGAGEMENT.
              </h2>
            </div>
            <p className="text-slate-500 text-xs sm:text-sm font-semibold max-w-sm">
              Custom-scoped retainers or fixed-price sprints. Transparent deliverables with zero hidden costs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const features = service.features ? JSON.parse(service.features) : [];
              const pricing = service.pricingTiers ? JSON.parse(service.pricingTiers) : [];
              const starterPrice = pricing[0]?.price || service.startingPrice;

              return (
                <div 
                  key={service.id} 
                  className="bg-white border border-blue-100/90 rounded-2xl overflow-hidden hover:border-[#1853CF] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col group"
                >
                  {/* Cover Image */}
                  <div className="relative h-56 overflow-hidden bg-slate-100">
                    <img
                      src={service.coverImage}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    
                    <div className="absolute top-3.5 left-3.5 bg-[#1853CF] text-white text-[10px] font-bold px-3 py-1 rounded-md uppercase tracking-wider shadow-sm">
                      {service.category}
                    </div>
                    
                    {service.isFeatured && (
                      <div className="absolute top-3.5 right-3.5 bg-amber-400 text-black text-[10px] font-black px-2.5 py-1 rounded uppercase flex items-center gap-1 shadow-sm">
                        <Star className="w-2.5 h-2.5" fill="black" /> Popular
                      </div>
                    )}
                    
                    <div className="absolute bottom-3.5 left-4 text-white">
                      <div className="text-[10px] text-white/70 uppercase tracking-wider">Starting at</div>
                      <div className="text-2xl font-black tracking-tight">₹{starterPrice.toLocaleString()}</div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2.5 bg-blue-50 border border-blue-100 rounded-xl text-[#1853CF]">
                        {getIcon(service.icon)}
                      </div>
                      <h3 className="text-lg font-black text-[#0B1420] group-hover:text-[#1853CF] transition-colors leading-tight">
                        <Link href={`/services/${service.slug}`}>{service.title}</Link>
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5 flex-1 line-clamp-3">
                      {service.shortDescription}
                    </p>

                    {/* Features checklist */}
                    <div className="space-y-2 mb-6 border-t border-slate-100 pt-4">
                      {features.slice(0, 4).map((f: string, i: number) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                          <Check className="w-3.5 h-3.5 text-[#1853CF] flex-shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTAs */}
                    <div className="flex gap-2.5 mt-auto pt-2">
                      <Link
                        href={`/services/${service.slug}`}
                        className="flex-1 text-center py-2.5 border border-blue-200 text-[#1853CF] text-xs font-black uppercase tracking-wider rounded-xl hover:bg-blue-50 transition-all"
                      >
                        Details
                      </Link>
                      <Link
                        href={`/quote?service=${encodeURIComponent(service.title)}`}
                        className="flex-1 text-center py-2.5 bg-[#1853CF] text-white text-xs font-black uppercase tracking-wider rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
                      >
                        Get Quote
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================
          CUSTOM RETAINER CTA — Radiant Royal Blue Card Floating on White
          ================================================================ */}
      <section className="bg-white py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="rounded-3xl bg-gradient-to-br from-[#1853CF] via-[#1A54CE] to-[#1242AF] p-10 sm:p-14 lg:p-16 text-white text-center shadow-2xl relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/15 text-blue-100 text-xs font-black uppercase tracking-widest border border-white/20">
                Custom Agency Retainer
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight">
                LET'S BUILD A DEDICATED SPRINT POD.
              </h2>
              <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
                Combine full-stack Next.js engineers, daily commercial designers, and cinematic video editors into one seamless monthly retainer with zero overhead.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#1853CF] hover:bg-blue-50 text-xs sm:text-sm font-black uppercase tracking-wider rounded-xl transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
                >
                  <span>SCHEDULE STRATEGY CALL</span>
                  <ArrowRight className="w-4 h-4 text-[#1853CF]" />
                </Link>
                <Link
                  href="/quote"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-black uppercase tracking-wider rounded-xl border border-white/20 transition-all duration-200"
                >
                  <span>REQUEST CUSTOM QUOTE</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

