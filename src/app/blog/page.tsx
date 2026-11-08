import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import { ArrowRight, BookOpen, Clock, TrendingUp, Sparkles, User, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Blog & Insights — Digital Marketing Tips from B Growth Agency',
  description: 'Marketing insights, web development tips, design strategies, and growth tactics from the B Growth Agency studio team.',
};

export const revalidate = 0;

export default async function BlogPage() {
  let posts: any[] = [];
  try {
    posts = await prisma.blogPost.findMany({
      where: { status: 'published' },
      orderBy: { publishedAt: 'desc' },
    });
  } catch (err) {
    console.error('BlogPage database query error:', err);
  }

  const featured = posts[0];
  const rest = posts.slice(1);
  const categories = Array.from(new Set(posts.map(p => p.category)));

  return (
    <div className="min-h-screen bg-white">

      {/* ================================================================
          2-COLUMN HERO — Balanced, Rich, Responsive, No Empty Right Void
          ================================================================ */}
      <section className="hero-blue pt-20 sm:pt-24 pb-20 sm:pb-28">
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

            {/* Left Column: Heading, Value Prop & Live Category Pills */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold tracking-widest uppercase shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-blue-200" />
                <span>B GROWTH AGENCY · STUDIO KNOWLEDGE HUB</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.02] tracking-tight uppercase text-white">
                GROW YOUR<br />
                <span className="text-blue-200">KNOWLEDGE.</span>
              </h1>

              <p className="text-blue-100 text-base sm:text-lg leading-relaxed max-w-xl">
                Actionable marketing playbooks, full-stack web architectures, conversion design breakdowns, and hyper-growth case studies straight from our Hyderabad studio.
              </p>

              {/* Quick Stat Badges */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-white/15 text-white border border-white/15">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" /> {posts.length} Verified Playbooks
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-white/15 text-white border border-white/15">
                  <Clock className="w-3.5 h-3.5 text-blue-200" /> 5-Min Practical Reads
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-white/15 text-white border border-white/15">
                  <User className="w-3.5 h-3.5 text-amber-300" /> Direct Founder Insights
                </span>
              </div>

              {/* Category Pills Bar */}
              <div className="pt-2 flex flex-wrap gap-2">
                <span className="text-xs font-bold text-blue-200/80 uppercase tracking-wider self-center mr-1">
                  Topics:
                </span>
                {categories.map((cat) => (
                  <span
                    key={cat}
                    className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-md border border-white/15 transition-colors cursor-pointer"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column: Featured Studio Spotlight Card with Human Anchor */}
            <div className="lg:col-span-5">
              {featured ? (
                <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.35)] border border-white/80 transition-transform duration-300 hover:-translate-y-1">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-rose-50 text-rose-600 border border-rose-200">
                      <TrendingUp className="w-3.5 h-3.5" /> Trending Breakdown
                    </span>
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      {featured.category}
                    </span>
                  </div>

                  <Link href={`/blog/${featured.slug}`} className="group block">
                    <div className="relative h-48 sm:h-52 rounded-2xl overflow-hidden mb-5 bg-slate-100">
                      <Image
                        src={featured.coverImage}
                        alt={featured.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <span className="absolute bottom-3 left-3 bg-[#1853CF] text-white text-[10px] font-black uppercase px-2.5 py-1 rounded">
                        Must Read
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-black text-[#0B1420] group-hover:text-[#1853CF] transition-colors leading-snug line-clamp-2 mb-2.5">
                      {featured.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 mb-5 leading-relaxed">
                      {featured.excerpt}
                    </p>
                  </Link>

                  {/* Author Line: Adharsh Katari Presence */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#1853CF]">
                        <Image
                          src="/founder.jpg"
                          alt="Adharsh Katari"
                          fill
                          className="object-cover object-top"
                        />
                      </div>
                      <div>
                        <div className="text-xs font-black text-[#0B1420]">Adharsh Katari</div>
                        <div className="text-[10px] font-semibold text-slate-500">{featured.readTime}</div>
                      </div>
                    </div>
                    <Link
                      href={`/blog/${featured.slug}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#1853CF] hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm"
                    >
                      Read Now <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 text-white text-center">
                  <BookOpen className="w-12 h-12 mx-auto mb-3 text-blue-200" />
                  <p className="font-bold">Fresh playbooks being prepared in the studio.</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ================================================================
          ALL ARTICLES GRID — Clean Soft Ice Blue Background (#F8FAFF)
          Replacing old muddy #EAECE8 for continuous color harmony
          ================================================================ */}
      <section className="bg-[#F8FAFF] py-20 sm:py-24 border-b border-blue-100/70">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <div className="text-xs font-black tracking-[0.2em] uppercase text-[#1853CF] mb-2">
                CURATED KNOWLEDGE BASE
              </div>
              <h2 className="text-3xl sm:text-4xl font-black uppercase text-[#0B1420] tracking-tight">
                ALL STUDIO ARTICLES.
              </h2>
            </div>
            <p className="text-slate-500 text-xs sm:text-sm font-semibold max-w-sm">
              Explore battle-tested techniques across SEO, custom Next.js development, cinema ad shoots, and brand scaling.
            </p>
          </div>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {posts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group block h-full">
                  <div className="bg-white border border-blue-100/80 rounded-2xl overflow-hidden hover:border-[#1853CF] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                    <div className="relative h-52 overflow-hidden bg-slate-100">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-3.5 left-3.5 bg-[#1853CF] text-white text-[10px] font-bold px-3 py-1 rounded-md uppercase tracking-wider shadow-sm">
                        {post.category}
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-3 text-[11px] text-slate-500 mb-3">
                        <span className="flex items-center gap-1 font-semibold">
                          <Clock className="w-3 h-3 text-[#1853CF]" />{post.readTime}
                        </span>
                        <span>·</span>
                        <span className="font-semibold">{post.authorName}</span>
                      </div>
                      <h3 className="text-base sm:text-lg font-black text-[#0B1420] group-hover:text-[#1853CF] transition-colors leading-snug mb-2.5 flex-1">
                        {post.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 mb-5">
                        {post.excerpt}
                      </p>
                      <div className="inline-flex items-center gap-1.5 text-[#1853CF] font-bold text-xs uppercase tracking-wide mt-auto pt-3 border-t border-slate-100">
                        Read Breakdown <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-slate-500 bg-white rounded-2xl border border-blue-100">
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-[#1853CF]/40" />
              <p className="font-bold">More articles coming soon.</p>
            </div>
          )}
        </div>
      </section>

      {/* ================================================================
          CTA SECTION — Elegant Royal Blue Card Floating on Pure White
          Smooth transition into the light footer
          ================================================================ */}
      <section className="bg-white py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="rounded-3xl bg-gradient-to-br from-[#1853CF] via-[#1A54CE] to-[#1242AF] p-10 sm:p-14 lg:p-16 text-white text-center shadow-2xl relative overflow-hidden">
            {/* Background glowing rings */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400/20 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/15 text-blue-100 text-xs font-black uppercase tracking-widest border border-white/20">
                Turn Knowledge Into Real Revenue
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight">
                READY TO PUT THESE TACTICS TO WORK?
              </h2>
              <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
                Book a 1-on-1 growth architecture call with Founder Adharsh Katari. We'll audit your brand and outline a measurable 90-day scaling plan.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/quote"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#1853CF] hover:bg-blue-50 text-xs sm:text-sm font-black uppercase tracking-wider rounded-xl transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
                >
                  <span>GET FREE PROPOSAL</span>
                  <ArrowRight className="w-4 h-4 text-[#1853CF]" />
                </Link>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-black uppercase tracking-wider rounded-xl border border-white/20 transition-all duration-200"
                >
                  <span>CONTACT FOUNDER</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

