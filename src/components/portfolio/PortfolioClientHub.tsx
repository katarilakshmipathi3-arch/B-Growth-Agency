'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Play, ArrowRight, ExternalLink, Globe, Layers, Video } from 'lucide-react';

interface PortfolioItem {
  id: string;
  slug: string;
  title: string;
  type: string;
  category: string;
  clientName: string;
  thumbnail: string;
  description: string;
  tags: string;
  toolsUsed: string;
  liveUrl?: string | null;
  videoUrl?: string | null;
}

const filters = [
  { label: 'All Work', value: 'All', icon: Layers },
  { label: 'Websites', value: 'Website', icon: Globe },
  { label: 'Poster Designs', value: 'Poster Design', icon: Layers },
  { label: 'Edited Videos', value: 'Edited Video', icon: Video },
];

export default function PortfolioClientHub({ items }: { items: PortfolioItem[] }) {
  const [selectedType, setSelectedType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredItems = items.filter((item) => {
    const matchesType = selectedType === 'All' || item.type === selectedType;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      item.title.toLowerCase().includes(q) ||
      item.clientName.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q);
    return matchesType && matchesSearch;
  });

  return (
    <div className="space-y-8">

      {/* Filter + Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 p-2 bg-[#F4F5F0] border border-[#E0E2DA] rounded-xl">
        
        {/* Type filters */}
        <div className="flex items-center gap-1 flex-1 overflow-x-auto">
          {filters.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setSelectedType(value)}
              className={`flex-shrink-0 px-4 py-2.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                selectedType === value
                  ? 'bg-[#1F5FE6] text-white shadow-md shadow-blue-500/20'
                  : 'text-[#6B7384] hover:text-[#0B1420] hover:bg-white'
              }`}
            >
              {label}
              {value !== 'All' && (
                <span className={`ml-1.5 text-[10px] ${selectedType === value ? 'text-blue-200' : 'text-[#C0C4CC]'}`}>
                  ({items.filter(i => i.type === value).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-6 bg-[#E0E2DA]" />

        {/* Search */}
        <div className="relative min-w-[200px]">
          <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects…"
            className="w-full text-sm pl-9 pr-4 py-2.5 rounded-lg border border-[#E0E2DA] bg-white focus:outline-none focus:border-[#1F5FE6] text-[#0B1420] placeholder:text-[#9CA3AF] transition-colors"
          />
        </div>
      </div>

      {/* Count */}
      <div className="text-xs font-semibold text-[#6B7384]">
        Showing <span className="text-[#0B1420] font-black">{filteredItems.length}</span> of {items.length} projects
      </div>

      {/* Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-24 bg-[#F4F5F0] rounded-2xl border border-[#E0E2DA]">
          <div className="text-5xl mb-4 opacity-20">∅</div>
          <p className="text-[#6B7384] text-sm font-semibold mb-3">No projects matched your search.</p>
          <button
            onClick={() => { setSelectedType('All'); setSearchQuery(''); }}
            className="text-xs font-bold text-[#1F5FE6] hover:underline"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const tools = item.toolsUsed ? JSON.parse(item.toolsUsed) : [];
            const isVideo = item.type === 'Edited Video';

            return (
              <div key={item.id} className="portfolio-card group flex flex-col">
                {/* Thumbnail */}
                <div className="relative h-56 overflow-hidden bg-gray-100">
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    className={`object-cover transition-transform duration-700 ${isVideo ? 'group-hover:scale-100' : 'group-hover:scale-105'}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                  {/* Type badge */}
                  <div className="absolute top-4 left-4 bg-[#1F5FE6] text-white text-[10px] font-bold px-3 py-1.5 rounded uppercase tracking-wider">
                    {item.type}
                  </div>

                  {/* Video play overlay */}
                  {isVideo && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 text-white ml-1" fill="white" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="text-[10px] font-black uppercase tracking-widest text-[#9CA3AF] mb-1.5">
                    {item.clientName}
                  </div>
                  <h3 className="text-base font-black text-[#0B1420] mb-2 group-hover:text-[#1F5FE6] transition-colors leading-tight">
                    <Link href={`/portfolio/${item.slug}`}>{item.title}</Link>
                  </h3>
                  <p className="text-xs text-[#6B7384] leading-relaxed line-clamp-2 mb-4 flex-1">
                    {item.description}
                  </p>

                  {/* Tools */}
                  {tools.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {tools.slice(0, 4).map((tool: string, idx: number) => (
                        <span key={idx} className="text-[10px] font-semibold bg-[#F4F5F0] text-[#6B7384] px-2 py-1 rounded border border-[#E0E2DA]">
                          {tool}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Footer CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-[#F0F1EC]">
                    <Link
                      href={`/portfolio/${item.slug}`}
                      className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-[#1F5FE6] hover:text-[#1749C0] group-hover:gap-2.5 transition-all"
                    >
                      Read Case Study <ArrowRight className="w-3 h-3" />
                    </Link>
                    {item.liveUrl && (
                      <a
                        href={item.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#9CA3AF] hover:text-[#0B1420] transition-colors flex items-center gap-1 text-[11px] font-semibold"
                      >
                        Live <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
