import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';
import { z } from 'zod';

const TeamSchema = z.object({
  name: z.string().min(2),
  role: z.string().min(2),
  avatar: z.string().optional(),
  bio: z.string().min(10),
  socials: z.string().optional(),
  order: z.number().optional(),
});

export async function GET(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const team = await prisma.teamMember.findMany({ orderBy: { order: 'asc' } });
  return NextResponse.json(team);
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const body = await req.json();
    const data = TeamSchema.parse(body);
    const member = await prisma.teamMember.create({
      data: {
        name: data.name,
        role: data.role,
        avatar: data.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
        bio: data.bio,
        socials: data.socials || '{}',
        order: data.order ?? 0,
      },
    });
    return NextResponse.json(member, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Invalid data' }, { status: 400 });
  }
}
