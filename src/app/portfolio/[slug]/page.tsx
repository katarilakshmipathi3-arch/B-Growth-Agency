import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { 
  ArrowLeft, 
  ArrowRight, 
  ExternalLink, 
  Calendar, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

export const revalidate = 0;

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const item = await prisma.portfolioItem.findUnique({
    where: { slug: params.slug },
  });

  if (!item) return { title: 'Project Not Found' };

  return {
    title: `${item.title} | Case Study by B Growth Agency`,
    description: item.description,
  };
}

export default async function PortfolioDetailPage({ params }: { params: { slug: string } }) {
  const item = await prisma.portfolioItem.findUnique({
    where: { slug: params.slug },
  });

  if (!item) {
    notFound();
  }

  const allItems = await prisma.portfolioItem.findMany({
    where: { status: 'published' },
    orderBy: { order: 'asc' },
    select: { id: true, slug: true, title: true },
  });

  const currentIndex = allItems.findIndex((p) => p.slug === item.slug);
  const prevProject = currentIndex > 0 ? allItems[currentIndex - 1] : null;
  const nextProject = currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null;

  const images: string[] = item.images ? JSON.parse(item.images) : [];
  const tools: string[] = item.toolsUsed ? JSON.parse(item.toolsUsed) : [];

  const getYouTubeEmbedUrl = (url?: string | null) => {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=0&rel=0` : null;
  };

  const embedUrl = getYouTubeEmbedUrl(item.videoUrl);

  return (
    <div className="min-h-screen bg-[#EAECE8]">

      {/* ================================================================
          HERO — Royal Blue
          ================================================================ */}
      <section className="hero-blue py-24 md:py-32">
        <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 space-y-6">
          
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-200/80">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/portfolio" className="hover:text-white">Portfolio</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">{item.title}</span>
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-white/15 text-white text-xs font-bold uppercase tracking-wider">
                {item.type}
              </span>
              <span className="text-xs text-blue-200 font-semibold">
                {item.category}
              </span>
              {item.completionDate && (
                <span className="text-xs text-blue-200 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {item.completionDate}
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight uppercase">
              {item.title}
            </h1>

            <p className="text-base sm:text-lg text-blue-100 max-w-3xl leading-relaxed">
              {item.description}
            </p>
          </div>

        </div>
      </section>

      {/* ================================================================
          MEDIA & CONTENT
          ================================================================ */}
      <section className="max-w-6xl mx-auto px-6 sm:px-10 py-16 space-y-12">
        
        {/* Main Media */}
        <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-[#E0E2DA] bg-black">
          {item.type === 'Edited Video' && embedUrl ? (
            <div className="aspect-video w-full">
              <iframe
                src={embedUrl}
                title={item.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          ) : (
            <div className="relative h-[380px] sm:h-[520px] w-full">
              <Image
                src={item.thumbnail}
                alt={item.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>

        {/* Project Meta Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-6 sm:p-8 bg-white rounded-2xl border border-[#E0E2DA]">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#6B7384]">Client</span>
            <div className="text-base font-black text-[#0B1420] mt-1">{item.clientName}</div>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#6B7384]">Discipline</span>
            <div className="text-base font-black text-[#0B1420] mt-1">{item.type}</div>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#6B7384]">Timeline</span>
            <div className="text-base font-black text-[#0B1420] mt-1">{item.completionDate || '2024'}</div>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#6B7384]">Live Deployment</span>
            <div className="mt-1">
              {item.liveUrl ? (
                <a
                  href={item.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1F5FE6] hover:underline"
                >
                  <span>Visit Site</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <span className="text-sm text-[#6B7384]">Confidential Client</span>
              )}
            </div>
          </div>
        </div>

        {/* Case Study Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-white border border-[#E0E2DA] rounded-2xl space-y-3">
            <span className="text-[10px] uppercase font-bold tracking-widest text-amber-600 bg-amber-50 px-2.5 py-1 rounded">
              01 — Challenge
            </span>
            <h3 className="text-xl font-black uppercase text-[#0B1420]">The Bottleneck</h3>
            <p className="text-sm text-[#3A4152] leading-relaxed whitespace-pre-line">
              {item.challenge || 'Client approached B Growth Agency seeking a complete overhaul of their digital footprint to increase conversion rates.'}
            </p>
          </div>

          <div className="p-8 bg-white border border-[#E0E2DA] rounded-2xl space-y-3">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#1F5FE6] bg-[#EBF1FF] px-2.5 py-1 rounded">
              02 — Strategy & Solution
            </span>
            <h3 className="text-xl font-black uppercase text-[#0B1420]">Our Architecture</h3>
            <p className="text-sm text-[#3A4152] leading-relaxed whitespace-pre-line">
              {item.solution || 'Engineered custom high-performance assets combining responsive Next.js frontend with conversion-tested graphic and video copy.'}
            </p>
          </div>

          <div className="p-8 bg-white border border-[#E0E2DA] rounded-2xl space-y-3">
            <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded">
              03 — Commercial Impact
            </span>
            <h3 className="text-xl font-black uppercase text-[#0B1420]">The ROI</h3>
            <p className="text-sm text-[#3A4152] leading-relaxed whitespace-pre-line">
              {item.results || 'Delivered a 3.4× surge in organic qualified conversions with zero downtime during release week.'}
            </p>
          </div>
        </div>

        {/* Tools Used */}
        {tools.length > 0 && (
          <div className="bg-white p-8 rounded-2xl border border-[#E0E2DA] space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#1F5FE6]" />
              <h4 className="text-base font-black uppercase text-[#0B1420]">Production Tools & Stack</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {tools.map((tool, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-[#F4F5F0] text-[#0B1420] text-xs font-bold border border-[#E0E2DA]"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Gallery */}
        {images.length > 0 && (
          <div className="space-y-6 pt-4">
            <h3 className="text-2xl font-black uppercase text-[#0B1420]">Visual Asset Gallery</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {images.map((imgUrl, idx) => (
                <div key={idx} className="relative h-72 sm:h-96 rounded-2xl overflow-hidden border border-[#E0E2DA] bg-gray-100 shadow-sm">
                  <Image src={imgUrl} alt={`${item.title} gallery asset ${idx + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Next / Prev Navigation */}
        <div className="flex items-center justify-between border-t border-[#E0E2DA] pt-8">
          {prevProject ? (
            <Link
              href={`/portfolio/${prevProject.slug}`}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0B1420] hover:text-[#1F5FE6]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Prev: {prevProject.title}</span>
            </Link>
          ) : <div />}

          {nextProject && (
            <Link
              href={`/portfolio/${nextProject.slug}`}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0B1420] hover:text-[#1F5FE6]"
            >
              <span>Next: {nextProject.title}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>

      </section>

    </div>
  );
}
