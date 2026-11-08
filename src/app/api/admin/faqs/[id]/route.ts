import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';
import { z } from 'zod';

const FAQSchema = z.object({
  question: z.string().min(5).optional(),
  answer: z.string().min(10).optional(),
  category: z.string().optional(),
  order: z.number().optional(),
});

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const body = await req.json();
    const data = FAQSchema.parse(body);
    const faq = await prisma.fAQ.update({ where: { id: params.id }, data });
    return NextResponse.json(faq);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error' }, { status: 400 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await prisma.fAQ.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
