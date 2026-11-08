import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const item = await prisma.portfolioItem.findUnique({
    where: { id: params.id },
  });
  if (!item) return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  return NextResponse.json(item);
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getAdminSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();

    const updateData: any = { ...body };
    if (body.images && typeof body.images !== 'string') {
      updateData.images = JSON.stringify(body.images);
    }
    if (body.toolsUsed && typeof body.toolsUsed !== 'string') {
      updateData.toolsUsed = JSON.stringify(body.toolsUsed);
    }
    if (body.tags && typeof body.tags !== 'string') {
      updateData.tags = JSON.stringify(body.tags);
    }

    const updated = await prisma.portfolioItem.update({
      where: { id: params.id },
      data: updateData,
    });

    await prisma.activityLog.create({
      data: {
        userId: session.userId,
        userName: session.name,
        action: 'UPDATE',
        entityType: 'Portfolio',
        entityId: updated.id,
        details: `Updated project: ${updated.title}`,
      },
    });

    revalidatePath('/portfolio');
    revalidatePath(`/portfolio/${updated.slug}`);
    revalidatePath('/');

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getAdminSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const deleted = await prisma.portfolioItem.delete({
      where: { id: params.id },
    });

    await prisma.activityLog.create({
      data: {
        userId: session.userId,
        userName: session.name,
        action: 'DELETE',
        entityType: 'Portfolio',
        entityId: params.id,
        details: `Deleted project: ${deleted.title}`,
      },
    });

    revalidatePath('/portfolio');
    revalidatePath('/');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
