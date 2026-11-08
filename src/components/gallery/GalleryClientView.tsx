'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Play, 
  TrendingUp, 
  Users, 
  Film, 
  Star, 
  Search, 
  X, 
  ExternalLink, 
  Sparkles, 
  Camera, 
  Award,
  CheckCircle2
} from 'lucide-react';

interface GalleryMedia {
  id: string;
  category: 'team' | 'events' | 'traction' | 'reviews' | 'bts';
  title: string;
  subtitle: string;
  location?: string;
  metric?: string;
  metricLabel?: string;
  image: string;
  client?: string;
  role?: string;
  quote?: string;
  videoDuration?: string;
  tags: string[];
}

const ALL_GALLERY_ITEMS: GalleryMedia[] = [
  {
    id: 'g1',
    category: 'traction',
    title: '₹2.4Cr E-Commerce Revenue In 90 Days',
    subtitle: 'Pulse Organics D2C Commerce Engine',
    location: 'Hyderabad Studio',
    metric: '+340%',
    metricLabel: 'ROAS Lift',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&q=80',
    tags: ['Next.js 14', 'Custom Checkout', 'High ROAS'],
  },
  {
    id: 'g2',
    category: 'team',
    title: 'Senior Engineering War Room',
    subtitle: 'Next.js 14 Server Components & Edge Optimization',
    location: 'HITEC City Studio · Hyderabad',
    metric: '100%',
    metricLabel: 'Senior Craft',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&q=80',
    tags: ['Architecture', 'Design System', 'No Outsourcing'],
  },
  {
    id: 'g3',
    category: 'events',
    title: 'Commercial 4K Cinema Brand Film Shoot',
    subtitle: 'ARRI & RED Raw Lighting Setup for FinTech Commercial',
    location: 'Film Studio Floor · Hyderabad',
    metric: '4K Cinema',
    metricLabel: 'Raw Package',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1000&q=80',
    tags: ['Cinema Ads', 'Lighting Rig', 'Color Grading'],
  },
  {
    id: 'g4',
    category: 'reviews',
    title: '"Engineered our entire $1.2M pipeline"',
    subtitle: 'Video Review · Apex Wealth Global',
    client: 'Vikram Malhotra',
    role: 'Managing Partner, Apex Wealth',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1000&q=80',
    quote: 'B Growth Agency delivered our Next.js portal in 12 days flat. Conversion jumped from 1.4% to 4.8% in week two.',
    metric: '5.0 ★',
    metricLabel: 'Verified Review',
    videoDuration: '1:45',
    tags: ['Video Review', 'Enterprise FinTech', 'Next.js'],
  },
  {
    id: 'g5',
    category: 'bts',
    title: 'DaVinci Resolve Color Suite Grading',
    subtitle: 'HDR Cinema Pipeline for Commercial Advertisements',
    location: 'Post-Production Suite · Hyderabad',
    metric: '10-Bit Color',
    metricLabel: 'Cinema Grade',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1000&q=80',
    tags: ['DaVinci Resolve', 'Color Grading', 'Sound Design'],
  },
  {
    id: 'g6',
    category: 'traction',
    title: 'Lighthouse 99 Core Web Vitals Moat',
    subtitle: 'Sub-second LCP on Zenith AI Platform',
    location: 'Production Deployment',
    metric: '0.6s',
    metricLabel: 'Global LCP',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&q=80',
    tags: ['Speed Moat', 'Core Web Vitals', 'Edge Cache'],
  },
  {
    id: 'g7',
    category: 'team',
    title: 'Typography & Visual Design Lab',
    subtitle: 'Design Tokens, Golden Ratios & Vector Identity',
    location: 'Design Studio · Hyderabad',
    metric: '45+',
    metricLabel: 'Brand Kits',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1000&q=80',
    tags: ['Figma Pro', 'Visual Identity', 'Typography'],
  },
  {
    id: 'g8',
    category: 'events',
    title: 'Solaria Music & Culture Festival Stage',
    subtitle: 'Multi-Cam Live Capture & Aftermovie Direction',
    location: 'Live Arena Shoot',
    metric: '42K+',
    metricLabel: 'Live Crowd',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1000&q=80',
    tags: ['Festival Shoot', 'Aftermovie', 'Dynamic Cut'],
  },
  {
    id: 'g9',
    category: 'reviews',
    title: '"Single best agency partner in Hyderabad"',
    subtitle: 'Video Review · FitVerse Athletics',
    client: 'Rohit Verma',
    role: 'Founder & CEO, FitVerse',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1000&q=80',
    quote: 'Their commercial ad films doubled our pre-orders. When other agencies gave us excuses, B Growth delivered production-ready reels in 72 hours.',
    metric: '5.0 ★',
    metricLabel: 'Verified Review',
    videoDuration: '2:10',
    tags: ['Video Review', 'High-Retention Reels', 'D2C'],
  },
  {
    id: 'g10',
    category: 'bts',
    title: 'Anamorphic Lens Testing & Calibration',
    subtitle: 'Atlas Orion Anamorphic Glass on RED Camera Rig',
    location: 'Camera Department · Hyderabad',
    metric: '2.0x Squeeze',
    metricLabel: 'Anamorphic',
    image: 'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?w=1000&q=80',
    tags: ['Atlas Orion', 'Anamorphic', 'Optics'],
  },
  {
    id: 'g11',
    category: 'traction',
    title: '₹82L Direct Inbound Pipeline Generated',
    subtitle: 'B2B Industrial Platform Sprint',
    location: 'Live Analytics Dashboard',
    metric: '320%',
    metricLabel: 'Pipeline Lift',
    image: 'https://images.unsplash.com/photo-1542744094-3a3172722053?w=1000&q=80',
    tags: ['B2B Pipeline', 'Lead Architecture', 'SEO Authority'],
  },
  {
    id: 'g12',
    category: 'reviews',
    title: '"The speed and visual craft is on a different level"',
    subtitle: 'Video Review · Lumina Studios',
    client: 'Ananya Deshmukh',
    role: 'Creative Director, Lumina Studios',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1000&q=80',
    quote: 'They cut through all the generic agency fluff and engineered a category-defining brand identity that instantly positioned us at the top of our industry.',
    metric: '5.0 ★',
    metricLabel: 'Verified Review',
    videoDuration: '1:30',
    tags: ['Video Review', 'Cinema & VFX', 'Branding'],
  },
];

const CATEGORIES = [
  { id: 'all', label: 'All Media' },
  { id: 'team', label: 'Team & Studio', icon: Users },
  { id: 'events', label: 'Cinema Sets & Events', icon: Film },
  { id: 'traction', label: 'Real Traction & ROI', icon: TrendingUp },
  { id: 'reviews', label: 'Video Reviews', icon: Star },
  { id: 'bts', label: 'BTS & Equipment', icon: Camera },
] as const;

export default function GalleryClientView() {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeItem, setActiveItem] = useState<GalleryMedia | null>(null);

  const filteredItems = ALL_GALLERY_ITEMS.filter((item) => {
    const matchesCategory = activeTab === 'all' || item.category === activeTab;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="bg-[#F8FAFF] py-20 sm:py-24 border-b border-blue-100/80">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Controls Bar: Filter Pills + Search Input */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-12">
          
          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
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

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search shoots, team, reels..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1853CF]/20 focus:border-[#1853CF] shadow-xs"
            />
          </div>

        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 hover:border-[#1853CF] shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              {/* Image Container with Badges */}
              <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

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
                  {item.location && (
                    <div className="text-[10px] text-blue-200/80 font-bold uppercase tracking-wider mb-0.5">
                      📍 {item.location}
                    </div>
                  )}
                  <div className="text-xs font-bold text-blue-100 uppercase tracking-wider line-clamp-1">
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
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Lightbox Preview */}
        {activeItem && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
            onClick={() => setActiveItem(null)}
          >
            <div
              className="bg-white rounded-3xl overflow-hidden max-w-3xl w-full shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative h-80 sm:h-96 w-full bg-slate-900">
                <Image
                  src={activeItem.image}
                  alt={activeItem.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded bg-[#1853CF] text-white inline-block mb-2">
                    {activeItem.category.toUpperCase()}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black">{activeItem.title}</h3>
                  <p className="text-xs sm:text-sm text-blue-200 font-semibold">{activeItem.subtitle}</p>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-4">
                {activeItem.quote && (
                  <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100">
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

                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span className="text-xs font-bold text-slate-400">
                    📍 {activeItem.location || 'B Growth Agency Studio, Hyderabad'} · Verified Media Archive
                  </span>
                  <button
                    onClick={() => setActiveItem(null)}
                    className="px-5 py-2.5 rounded-xl bg-[#1853CF] text-white text-xs font-black uppercase tracking-wider hover:bg-blue-700 transition-colors"
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
