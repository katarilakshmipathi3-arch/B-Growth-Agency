import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getAdminSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const portal = await prisma.clientPortal.findUnique({
      where: { id: params.id },
      include: {
        invoices: true,
        messages: {
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (!portal) return NextResponse.json({ error: 'Portal not found' }, { status: 404 });
    return NextResponse.json(portal);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getAdminSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const {
      clientName,
      clientEmail,
      company,
      projectName,
      serviceType,
      status,
      progress,
      startDate,
      deliveryDate,
      stagingUrl,
      figmaUrl,
      videoProofUrl,
      milestones,
      deliverables,
      isActive,
    } = body;

    const updated = await prisma.clientPortal.update({
      where: { id: params.id },
      data: {
        ...(clientName && { clientName }),
        ...(clientEmail && { clientEmail }),
        ...(company && { company }),
        ...(projectName && { projectName }),
        ...(serviceType && { serviceType }),
        ...(status && { status }),
        ...(progress !== undefined && { progress: Number(progress) }),
        ...(startDate !== undefined && { startDate }),
        ...(deliveryDate !== undefined && { deliveryDate }),
        ...(stagingUrl !== undefined && { stagingUrl }),
        ...(figmaUrl !== undefined && { figmaUrl }),
        ...(videoProofUrl !== undefined && { videoProofUrl }),
        ...(milestones !== undefined && {
          milestones: typeof milestones === 'string' ? milestones : JSON.stringify(milestones),
        }),
        ...(deliverables !== undefined && {
          deliverables: typeof deliverables === 'string' ? deliverables : JSON.stringify(deliverables),
        }),
        ...(isActive !== undefined && { isActive: Boolean(isActive) }),
      },
    });

    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getAdminSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await prisma.clientPortal.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
