import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';
import { z } from 'zod';

const ClientSchema = z.object({
  name: z.string().min(2),
  logoUrl: z.string(),
  websiteUrl: z.string().optional(),
  order: z.number().optional(),
});

export async function GET(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const clients = await prisma.clientLogo.findMany({ orderBy: { order: 'asc' } });
  return NextResponse.json(clients);
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const body = await req.json();
    const data = ClientSchema.parse(body);
    const client = await prisma.clientLogo.create({
      data: {
        name: data.name,
        logoUrl: data.logoUrl,
        websiteUrl: data.websiteUrl,
        order: data.order ?? 0,
      },
    });
    return NextResponse.json(client, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Invalid data' }, { status: 400 });
  }
}
