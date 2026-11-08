import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';
import { z } from 'zod';

const TeamSchema = z.object({
  name: z.string().min(2).optional(),
  role: z.string().min(2).optional(),
  avatar: z.string().optional(),
  bio: z.string().optional(),
  socials: z.string().optional(),
  order: z.number().optional(),
});

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const body = await req.json();
    const data = TeamSchema.parse(body);
    const member = await prisma.teamMember.update({ where: { id: params.id }, data });
    return NextResponse.json(member);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error' }, { status: 400 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await prisma.teamMember.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
