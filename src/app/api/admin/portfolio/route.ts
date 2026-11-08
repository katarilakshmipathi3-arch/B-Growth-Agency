import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const portfolioSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  type: z.enum(['Website', 'Poster Design', 'Edited Video']),
  category: z.string(),
  clientName: z.string(),
  thumbnail: z.string(),
  images: z.array(z.string()).optional(),
  videoUrl: z.string().optional().nullable(),
  liveUrl: z.string().optional().nullable(),
  description: z.string(),
  challenge: z.string().optional().nullable(),
  solution: z.string().optional().nullable(),
  results: z.string().optional().nullable(),
  toolsUsed: z.array(z.string()).optional(),
  completionDate: z.string().optional().nullable(),
  isFeatured: z.boolean().default(false),
  tags: z.array(z.string()).optional(),
  status: z.enum(['published', 'draft']).default('published'),
  order: z.number().default(0),
});

export async function GET() {
  const items = await prisma.portfolioItem.findMany({
    orderBy: { order: 'asc' },
  });
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  try {
    const session = await getAdminSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const parsed = portfolioSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
    }

    const data = parsed.data;

    // Check unique slug
    const existing = await prisma.portfolioItem.findUnique({
      where: { slug: data.slug },
    });
    if (existing) {
      return NextResponse.json({ error: 'Project with this slug already exists' }, { status: 400 });
    }

    const item = await prisma.portfolioItem.create({
      data: {
        title: data.title,
        slug: data.slug,
        type: data.type,
        category: data.category,
        clientName: data.clientName,
        thumbnail: data.thumbnail,
        images: JSON.stringify(data.images || []),
        videoUrl: data.videoUrl || null,
        liveUrl: data.liveUrl || null,
        description: data.description,
        challenge: data.challenge || null,
        solution: data.solution || null,
        results: data.results || null,
        toolsUsed: JSON.stringify(data.toolsUsed || []),
        completionDate: data.completionDate || null,
        isFeatured: data.isFeatured,
        tags: JSON.stringify(data.tags || []),
        status: data.status,
        order: data.order,
      },
    });

    await prisma.activityLog.create({
      data: {
        userId: session.userId,
        userName: session.name,
        action: 'CREATE',
        entityType: 'Portfolio',
        entityId: item.id,
        details: `Created project: ${item.title}`,
      },
    });

    revalidatePath('/portfolio');
    revalidatePath('/');

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error('Error creating portfolio item:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}
