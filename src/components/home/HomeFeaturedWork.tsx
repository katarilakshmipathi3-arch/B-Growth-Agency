'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ExternalLink, Play, Sparkles } from 'lucide-react';

interface PortfolioItem {
  id: string;
  slug: string;
  title: string;
  type: string;
  clientName: string;
  thumbnail: string;
  description: string;
  tags: string;
  liveUrl?: string | null;
  videoUrl?: string | null;
}

export default function HomeFeaturedWork({ initialItems }: { initialItems: PortfolioItem[] }) {
  const [filter, setFilter] = useState<string>('All');

  const filteredItems = filter === 'All' 
    ? initialItems 
    : initialItems.filter(item => {
        if (filter === 'Websites') return item.type === 'Website';
        if (filter === 'Posters') return item.type === 'Poster Design';
        if (filter === 'Videos') return item.type === 'Edited Video';
        return true;
      });

  return (
    <section className="py-24 bg-[#09152E] border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Selected Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
              Featured Case Studies & Creative Work
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 bg-[#0E2454] p-1.5 rounded-xl border border-white/10 overflow-x-auto no-scrollbar">
            {['All', 'Websites', 'Posters', 'Videos'].map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  filter === category
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.slice(0, 6).map((item) => {
            const parsedTags = item.tags ? JSON.parse(item.tags) : [];

            return (
              <div
                key={item.id}
                className="agency-card overflow-hidden group flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-60 w-full overflow-hidden bg-slate-900">
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#0B1B3A]/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 border border-white/20">
                      {item.type === 'Edited Video' && <Play className="w-3 h-3 fill-white" />}
                      <span>{item.type}</span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between text-xs text-blue-300 font-medium">
                      <span>{item.clientName}</span>
                      <div className="flex gap-1.5 flex-wrap">
                        {parsedTags.slice(0, 2).map((tag: string, idx: number) => (
                          <span key={idx} className="bg-white/10 text-white px-2 py-0.5 rounded text-[11px] font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      <Link href={`/portfolio/${item.slug}`}>
                        {item.title}
                      </Link>
                    </h3>

                    <p className="text-xs text-blue-100 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <Link
                    href={`/portfolio/${item.slug}`}
                    className="font-bold text-cyan-300 hover:text-white flex items-center gap-1"
                  >
                    <span>View Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  {item.liveUrl && (
                    <a
                      href={item.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-300 hover:text-white flex items-center gap-1"
                    >
                      <span>Live Site</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-primary font-bold text-xs uppercase tracking-wider hover:bg-blue-50 transition-all shadow-lg"
          >
            <span>Explore All 12+ Case Studies</span>
            <ArrowRight className="w-4 h-4 text-primary" />
          </Link>
        </div>

      </div>
    </section>
  );
}
