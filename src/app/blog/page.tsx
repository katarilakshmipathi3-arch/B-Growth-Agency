import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import { ArrowRight, BookOpen, Clock, ArrowUpRight } from 'lucide-react';

export const metadata = {
  title: 'Blog & Insights — Digital Marketing Tips from B Growth Agency',
  description: 'Marketing insights, web development tips, design strategies, and growth tactics from the B Growth Agency studio team.',
};

export const revalidate = 0;

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { status: 'published' },
    orderBy: { publishedAt: 'desc' },
  });

  const featured = posts[0];
  const rest = posts.slice(1);

  const categories = [...new Set(posts.map(p => p.category))];

  return (
    <div className="min-h-screen bg-[#EAECE8]">

      {/* ================================================================
          HERO
          ================================================================ */}
      <section className="hero-blue py-28 md:py-36">
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-4xl">
            <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-blue-200/70 mb-6">
              B GROWTH AGENCY · STUDIO INSIGHTS
            </div>
            <h1 className="text-[clamp(2.5rem,7vw,6rem)] font-black leading-[0.95] tracking-tight uppercase text-white mb-8">
              GROW YOUR<br />
              <span className="text-blue-200">KNOWLEDGE.</span>
            </h1>
            <p className="text-blue-100 text-xl leading-relaxed max-w-2xl">
              Actionable marketing tactics, web performance guides, design breakdowns, 
              and growth frameworks from our studio team. {posts.length} articles published.
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================
          FEATURED POST
          ================================================================ */}
      {featured && (
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
            <div className="section-label mb-4">Featured Article</div>
            <Link href={`/blog/${featured.slug}`} className="group block">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-[#E0E2DA] hover:border-[#1F5FE6] transition-all hover:shadow-xl">
                <div className="relative h-72 lg:h-auto min-h-[300px] bg-gray-100">
                  <Image
                    src={featured.coverImage}
                    alt={featured.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-5 left-5 bg-[#1F5FE6] text-white text-[10px] font-bold px-3 py-1.5 rounded uppercase tracking-wider">
                    {featured.category}
                  </div>
                </div>
                <div className="p-10 flex flex-col justify-center bg-white">
                  <div className="flex items-center gap-4 text-[11px] text-[#6B7384] mb-4">
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{featured.readTime}</span>
                    <span>·</span>
                    <span>By {featured.authorName}</span>
                  </div>
                  <h2 className="text-3xl font-black text-[#0B1420] mb-4 leading-tight group-hover:text-[#1F5FE6] transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-[#6B7384] text-sm leading-relaxed mb-6">{featured.excerpt}</p>
                  <div className="inline-flex items-center gap-2 text-[#1F5FE6] font-bold text-sm uppercase tracking-wide">
                    Read Article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ================================================================
          ARTICLES GRID
          ================================================================ */}
      <section className="bg-[#EAECE8] py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="mb-12">
            <div className="section-label">All Articles</div>
            <h2 className="text-4xl sm:text-5xl font-black uppercase text-[#0B1420] max-w-2xl leading-[1]">
              THE FULL<br />LIBRARY.
            </h2>
          </div>

          {rest.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                  <div className="bg-white border border-[#E0E2DA] rounded-xl overflow-hidden hover:border-[#1F5FE6] hover:shadow-xl transition-all h-full flex flex-col">
                    <div className="relative h-48 overflow-hidden bg-gray-100">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4 bg-[#1F5FE6] text-white text-[10px] font-bold px-3 py-1 rounded uppercase tracking-wider">
                        {post.category}
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-3 text-[11px] text-[#6B7384] mb-3">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                        <span>·</span>
                        <span>{post.authorName}</span>
                      </div>
                      <h3 className="text-base font-black text-[#0B1420] group-hover:text-[#1F5FE6] transition-colors leading-tight mb-2 flex-1">
                        {post.title}
                      </h3>
                      <p className="text-xs text-[#6B7384] leading-relaxed line-clamp-3 mb-4">{post.excerpt}</p>
                      <div className="inline-flex items-center gap-1.5 text-[#1F5FE6] font-bold text-xs uppercase tracking-wide mt-auto">
                        Read More <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-[#6B7384]">
              <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="font-semibold">More articles coming soon.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="hero-blue py-24">
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 text-center">
          <h2 className="text-4xl sm:text-5xl font-black uppercase text-white mb-6">
            READY TO PUT<br />THESE TACTICS TO WORK?
          </h2>
          <p className="text-blue-100 text-lg max-w-xl mx-auto mb-10">
            Let's apply these strategies to your brand. Get a free audit and proposal.
          </p>
          <Link href="/quote" className="btn-primary shadow-lg shadow-black/25">
            Get a Free Proposal <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}
