import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  ChevronRight, 
  ArrowRight
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

export const revalidate = 0;

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug },
  });

  if (!post) return { title: 'Article Not Found' };

  return {
    title: post.seoTitle || `${post.title} | B Growth Agency Insights`,
    description: post.seoDescription || post.excerpt,
  };
}

export default async function BlogPostDetailPage({ params }: { params: { slug: string } }) {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug },
  });

  if (!post) {
    notFound();
  }

  const relatedPosts = await prisma.blogPost.findMany({
    where: { 
      slug: { not: post.slug },
      status: 'published' 
    },
    take: 3,
  });

  return (
    <article className="min-h-screen bg-[#EAECE8]">
      
      {/* ================================================================
          HERO — Royal Blue
          ================================================================ */}
      <section className="hero-blue py-24 md:py-32">
        <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-10 space-y-6">
          
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-200/80">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/blog" className="hover:text-white">Blog</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white line-clamp-1">{post.title}</span>
          </div>

          <div className="space-y-4">
            <span className="px-3 py-1 rounded-full bg-white/15 text-white text-xs font-bold uppercase tracking-wider">
              {post.category}
            </span>

            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight uppercase">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-xs text-blue-100 font-semibold pt-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center font-bold text-white text-xs">
                  {post.authorName[0]}
                </div>
                <span>{post.authorName}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================================================================
          COVER IMAGE & ARTICLE BODY
          ================================================================ */}
      <section className="max-w-4xl mx-auto px-6 sm:px-10 py-16 space-y-12">
        
        <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden shadow-xl border border-[#E0E2DA] bg-gray-100">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="bg-white p-8 sm:p-12 rounded-2xl border border-[#E0E2DA] space-y-6">
          <p className="text-lg text-[#0B1420] font-semibold leading-relaxed border-l-4 border-[#1F5FE6] pl-6 py-1 italic bg-[#F4F7FF]">
            {post.excerpt}
          </p>

          <div className="prose max-w-none text-sm sm:text-base text-[#3A4152] leading-relaxed space-y-4 whitespace-pre-line pt-4">
            {post.content}
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="space-y-6 pt-6">
            <h3 className="text-2xl font-black uppercase text-[#0B1420]">Recommended Reading</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedPosts.map((rp) => (
                <Link key={rp.id} href={`/blog/${rp.slug}`} className="group">
                  <div className="bg-white border border-[#E0E2DA] rounded-xl overflow-hidden group-hover:border-[#1F5FE6] transition-all">
                    <div className="relative h-36 bg-gray-100">
                      <Image src={rp.coverImage} alt={rp.title} fill className="object-cover" />
                    </div>
                    <div className="p-4 space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#1F5FE6]">{rp.category}</span>
                      <h4 className="text-xs font-bold text-[#0B1420] line-clamp-2 group-hover:text-[#1F5FE6] transition-colors">{rp.title}</h4>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </section>

    </article>
  );
}
