import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get('key') || 'home';

  const content = await prisma.pageContent.findUnique({
    where: { key },
  });

  if (!content) {
    return NextResponse.json({ error: 'Page content not found' }, { status: 404 });
  }

  return NextResponse.json(JSON.parse(content.data));
}

export async function POST(req: Request) {
  try {
    const session = await getAdminSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { key, data } = body;

    const updated = await prisma.pageContent.upsert({
      where: { key: key || 'home' },
      update: { data: JSON.stringify(data) },
      create: { key: key || 'home', data: JSON.stringify(data) },
    });

    await prisma.activityLog.create({
      data: {
        userId: session.userId,
        userName: session.name,
        action: 'UPDATE',
        entityType: 'PageContent',
        entityId: updated.id,
        details: `Updated ${key || 'home'} page content live`,
      },
    });

    revalidatePath('/');
    revalidatePath('/about');

    return NextResponse.json({ success: true, updated });
  } catch (error) {
    console.error('Error saving page content:', error);
    return NextResponse.json({ error: 'Failed to save page content' }, { status: 500 });
  }
}
