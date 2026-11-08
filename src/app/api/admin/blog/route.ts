import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';
import { z } from 'zod';

const BlogSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  excerpt: z.string().min(10),
  content: z.string().min(20),
  coverImage: z.string().url().optional().or(z.literal('')),
  category: z.string().min(1),
  readTime: z.string().optional(),
  authorName: z.string().optional(),
  status: z.enum(['published', 'draft']).optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

export async function GET(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const posts = await prisma.blogPost.findMany({ orderBy: { publishedAt: 'desc' } });
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const body = await req.json();
    const data = BlogSchema.parse(body);
    const post = await prisma.blogPost.create({
      data: {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        coverImage: data.coverImage || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200',
        category: data.category,
        readTime: data.readTime || '5 min read',
        authorName: data.authorName || session.name,
        status: data.status || 'published',
        seoTitle: data.seoTitle,
        seoDescription: data.seoDescription,
      },
    });
    return NextResponse.json(post, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Invalid data' }, { status: 400 });
  }
}
