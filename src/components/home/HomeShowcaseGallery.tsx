'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Play, TrendingUp, Users, Film, Star, Award, CheckCircle2, X, ExternalLink, Sparkles } from 'lucide-react';

interface GalleryItem {
  id: string;
  category: 'traction' | 'team' | 'events' | 'reviews';
  title: string;
  subtitle: string;
  metric?: string;
  metricLabel?: string;
  image: string;
  aspect?: string;
  quote?: string;
  client?: string;
  role?: string;
  tags: string[];
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: '1',
    category: 'traction',
    title: '₹2.4Cr Revenue Attributed in 90 Days',
    subtitle: 'Pulse Organics D2C Commerce Engine',
    metric: '+340%',
    metricLabel: 'ROAS Growth',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&q=80',
    tags: ['Next.js 14', 'Custom Checkout', 'High ROAS'],
  },
  {
    id: '2',
    category: 'team',
    title: 'Deep Engineering Sprint Review',
    subtitle: 'B Growth Studio Architecture Hub · Hyderabad',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&q=80',
    metric: '100%',
    metricLabel: 'In-House Squad',
    tags: ['Full-Stack', 'Design System', 'No Outsourcing'],
  },
  {
    id: '3',
    category: 'events',
    title: 'Cinema 4K Commercial Brand Shoot',
    subtitle: 'Lumina Studios Cinematic Commercial Production',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1000&q=80',
    metric: '4K RED',
    metricLabel: 'Cinema Gear',
    tags: ['Cinema Ads', 'Lighting Rig', 'Colour Grading'],
  },
  {
    id: '4',
    category: 'reviews',
    title: '"They engineered our entire $1.2M pipeline"',
    subtitle: 'Video Review · Apex Wealth Global',
    client: 'Vikram Malhotra',
    role: 'Managing Partner, Apex Wealth',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1000&q=80',
    quote: 'B Growth Agency delivered our Next.js portal in 12 days flat. Conversion jumped from 1.4% to 4.8% in week two.',
    metric: '5.0 ★',
    metricLabel: 'Verified Review',
    tags: ['Video Review', 'Enterprise FinTech', 'Next.js'],
  },
  {
    id: '5',
    category: 'traction',
    title: 'Lighthouse 99 Performance Moat',
    subtitle: 'Sub-second LCP on Zenith AI Platform',
    metric: '0.6s',
    metricLabel: 'Global LCP',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&q=80',
    tags: ['Speed Moat', 'Core Web Vitals', 'Edge Cache'],
  },
  {
    id: '6',
    category: 'team',
    title: 'Brand Identity & Visual Design Lab',
    subtitle: 'Typography, Vector Ratios & Design Tokens',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1000&q=80',
    metric: '45+',
    metricLabel: 'Brand Kits Done',
    tags: ['Figma Pro', 'Visual Identity', 'Typography'],
  },
  {
    id: '7',
    category: 'events',
    title: 'Solaria Music & Culture Festival',
    subtitle: 'Multi-Cam Live Capture & Aftermovie Direction',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1000&q=80',
    metric: '42K+',
    metricLabel: 'Live Audience',
    tags: ['Festival Shoot', 'Aftermovie', 'Dynamic Cut'],
  },
  {
    id: '8',
    category: 'reviews',
    title: '"Single best agency partner in Hyderabad"',
    subtitle: 'Video Review · FitVerse Athletics',
    client: 'Rohit Verma',
    role: 'Founder & CEO, FitVerse',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1000&q=80',
    quote: 'Their commercial ad films doubled our pre-orders. When other agencies gave us excuses, B Growth delivered production-ready reels in 72 hours.',
    metric: '5.0 ★',
    metricLabel: 'Verified Review',
    tags: ['Video Review', 'High-Retention Reels', 'D2C'],
  },
];

const CATEGORIES: { id: string; label: string; icon?: React.ElementType }[] = [
  { id: 'all', label: 'All Showcase', icon: Sparkles },
  { id: 'traction', label: 'Real Traction & ROI', icon: TrendingUp },
  { id: 'team', label: 'Team & Studio', icon: Users },
  { id: 'events', label: 'Shoots & Events', icon: Film },
  { id: 'reviews', label: 'Video Reviews', icon: Star },
];

export default function HomeShowcaseGallery() {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const filteredItems = activeTab === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeTab);

  return (
    <section id="gallery" className="bg-[#F8FAFF] py-24 border-b border-blue-100/80 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-black tracking-[0.2em] uppercase text-[#1853CF] mb-2 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#1853CF]" />
              04 — VERIFIABLE TRACTION & STUDIO ARCHIVE
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-[#0B1420] tracking-tight">
              REAL WORK. REAL SETS.<br />
              <span className="text-[#1853CF]">MEASURABLE PROOF.</span>
            </h2>
          </div>
          <p className="text-slate-600 text-sm max-w-md leading-relaxed">
            From active film sets and sprint war rooms in Hyderabad to verified client ROI and high-converting commercial productions.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2.5 mb-10 pb-2 border-b border-slate-200/60">
          {CATEGORIES.map((cat) => {
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#1853CF] text-white shadow-md shadow-[#1853CF]/20 scale-105'
                    : 'bg-white text-slate-600 hover:text-[#1853CF] hover:bg-blue-50/70 border border-slate-200/80'
                }`}
              >
                {cat.icon && <cat.icon className="w-3.5 h-3.5" />}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 hover:border-[#1853CF] shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              {/* Image Container with Badges */}
              <div className="relative h-52 w-full overflow-hidden bg-slate-900">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Top Badge */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md bg-[#1853CF] text-white shadow-sm">
                    {item.category.toUpperCase()}
                  </span>
                  {item.metric && (
                    <span className="text-[11px] font-black tracking-tight px-2.5 py-1 rounded-md bg-white text-[#0B1420] shadow-sm">
                      {item.metric}
                    </span>
                  )}
                </div>

                {/* Play Button for Video Reviews */}
                {item.category === 'reviews' && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-12 h-12 rounded-full bg-white/90 text-[#1853CF] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>
                )}

                {/* Bottom title inside image */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="text-xs font-bold text-blue-200 uppercase tracking-wider line-clamp-1">
                    {item.subtitle}
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-black text-[#0B1420] group-hover:text-[#1853CF] tracking-tight transition-colors line-clamp-2 mb-2">
                    {item.title}
                  </h3>

                  {item.quote && (
                    <p className="text-xs text-slate-600 italic line-clamp-2 mb-3">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  )}
                </div>

                <div>
                  {item.client && (
                    <div className="pt-2 border-t border-slate-100 mb-3">
                      <div className="text-xs font-bold text-[#0B1420]">{item.client}</div>
                      <div className="text-[10px] font-semibold text-slate-500">{item.role}</div>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {item.tags.map((tag) => (
                      <span key={tag} className="text-[9px] font-bold px-2 py-0.5 rounded bg-blue-50 text-[#1853CF] border border-blue-100">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Lightbox */}
        {activeItem && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setActiveItem(null)}
          >
            <div
              className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative h-72 sm:h-80 w-full bg-slate-900">
                <Image
                  src={activeItem.image}
                  alt={activeItem.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute bottom-5 left-6 right-6 text-white">
                  <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded bg-[#1853CF] text-white inline-block mb-2">
                    {activeItem.category.toUpperCase()}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black">{activeItem.title}</h3>
                  <p className="text-xs text-blue-200 font-semibold">{activeItem.subtitle}</p>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-4">
                {activeItem.quote && (
                  <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100">
                    <p className="text-sm text-slate-800 italic leading-relaxed">
                      &ldquo;{activeItem.quote}&rdquo;
                    </p>
                    {activeItem.client && (
                      <div className="mt-3 text-xs font-black text-[#1853CF]">
                        — {activeItem.client}, <span className="font-semibold text-slate-600">{activeItem.role}</span>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex flex-wrap gap-2 pt-2">
                  {activeItem.tags.map((tag) => (
                    <span key={tag} className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400">B Growth Agency · Verified Production Archive</span>
                  <button
                    onClick={() => setActiveItem(null)}
                    className="px-5 py-2 rounded-xl bg-[#1853CF] text-white text-xs font-black uppercase tracking-wider hover:bg-blue-700 transition-colors"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
