import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function GET() {
  const items = await prisma.testimonial.findMany({
    orderBy: { order: 'asc' },
  });
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  try {
    const session = await getAdminSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const item = await prisma.testimonial.create({
      data: {
        clientName: body.clientName,
        clientRole: body.clientRole,
        company: body.company,
        avatar: body.avatar || null,
        content: body.content,
        rating: Number(body.rating) || 5,
        isFeatured: body.isFeatured !== undefined ? body.isFeatured : true,
      },
    });

    revalidatePath('/clients');
    revalidatePath('/');
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getAdminSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    await prisma.testimonial.delete({ where: { id } });
    revalidatePath('/clients');
    revalidatePath('/');
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
