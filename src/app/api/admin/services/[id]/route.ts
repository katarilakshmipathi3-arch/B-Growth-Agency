import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const service = await prisma.service.findUnique({
    where: { id: params.id },
  });
  if (!service) return NextResponse.json({ error: 'Service not found' }, { status: 404 });
  return NextResponse.json(service);
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
    if (body.features && typeof body.features !== 'string') {
      updateData.features = JSON.stringify(body.features);
    }
    if (body.deliverables && typeof body.deliverables !== 'string') {
      updateData.deliverables = JSON.stringify(body.deliverables);
    }
    if (body.pricingTiers && typeof body.pricingTiers !== 'string') {
      updateData.pricingTiers = JSON.stringify(body.pricingTiers);
    }

    const updated = await prisma.service.update({
      where: { id: params.id },
      data: updateData,
    });

    await prisma.activityLog.create({
      data: {
        userId: session.userId,
        userName: session.name,
        action: 'UPDATE',
        entityType: 'Service',
        entityId: updated.id,
        details: `Updated service: ${updated.title}`,
      },
    });

    revalidatePath('/services');
    revalidatePath(`/services/${updated.slug}`);
    revalidatePath('/');

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating service:', error);
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getAdminSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const deleted = await prisma.service.delete({
      where: { id: params.id },
    });

    await prisma.activityLog.create({
      data: {
        userId: session.userId,
        userName: session.name,
        action: 'DELETE',
        entityType: 'Service',
        entityId: params.id,
        details: `Deleted service: ${deleted.title}`,
      },
    });

    revalidatePath('/services');
    revalidatePath('/');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting service:', error);
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
  }
}
