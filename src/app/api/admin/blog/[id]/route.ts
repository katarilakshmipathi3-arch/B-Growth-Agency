import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';
import { z } from 'zod';

const BlogSchema = z.object({
  title: z.string().min(2).optional(),
  slug: z.string().min(2).optional(),
  excerpt: z.string().min(10).optional(),
  content: z.string().min(20).optional(),
  coverImage: z.string().optional(),
  category: z.string().min(1).optional(),
  readTime: z.string().optional(),
  authorName: z.string().optional(),
  status: z.enum(['published', 'draft']).optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const body = await req.json();
    const data = BlogSchema.parse(body);
    const post = await prisma.blogPost.update({ where: { id: params.id }, data });
    return NextResponse.json(post);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error' }, { status: 400 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await prisma.blogPost.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
