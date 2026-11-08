import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const serviceSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  category: z.string(),
  coverImage: z.string(),
  shortDescription: z.string(),
  fullDescription: z.string(),
  startingPrice: z.number().default(0),
  icon: z.string().default('Sparkles'),
  isFeatured: z.boolean().default(false),
  features: z.array(z.string()).optional(),
  deliverables: z.array(z.string()).optional(),
  pricingTiers: z.any().optional(),
  status: z.enum(['published', 'draft']).default('published'),
  order: z.number().default(0),
  seoTitle: z.string().optional().nullable(),
  seoDescription: z.string().optional().nullable(),
});

export async function GET() {
  const services = await prisma.service.findMany({
    orderBy: { order: 'asc' },
  });
  return NextResponse.json(services);
}

export async function POST(req: Request) {
  try {
    const session = await getAdminSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const parsed = serviceSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
    }

    const data = parsed.data;

    // Check slug uniqueness
    const existing = await prisma.service.findUnique({
      where: { slug: data.slug },
    });
    if (existing) {
      return NextResponse.json({ error: 'A service with this slug already exists.' }, { status: 400 });
    }

    const service = await prisma.service.create({
      data: {
        title: data.title,
        slug: data.slug,
        category: data.category,
        coverImage: data.coverImage,
        shortDescription: data.shortDescription,
        fullDescription: data.fullDescription,
        startingPrice: data.startingPrice,
        icon: data.icon,
        isFeatured: data.isFeatured,
        features: JSON.stringify(data.features || []),
        deliverables: JSON.stringify(data.deliverables || []),
        pricingTiers: JSON.stringify(data.pricingTiers || []),
        status: data.status,
        order: data.order,
        seoTitle: data.seoTitle || null,
        seoDescription: data.seoDescription || null,
      },
    });

    await prisma.activityLog.create({
      data: {
        userId: session.userId,
        userName: session.name,
        action: 'CREATE',
        entityType: 'Service',
        entityId: service.id,
        details: `Created service: ${service.title}`,
      },
    });

    revalidatePath('/services');
    revalidatePath('/');

    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
  }
}
