import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getAdminSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const contract = await prisma.contract.findUnique({
      where: { id: params.id },
    });

    if (!contract) return NextResponse.json({ error: 'Contract not found' }, { status: 404 });
    return NextResponse.json(contract);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getAdminSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { status, totalValue, paymentSchedule, terms, serviceScope } = body;

    const updated = await prisma.contract.update({
      where: { id: params.id },
      data: {
        ...(status && { status }),
        ...(totalValue !== undefined && { totalValue: Number(totalValue) }),
        ...(paymentSchedule && { paymentSchedule }),
        ...(terms && { terms }),
        ...(serviceScope && { serviceScope }),
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

    await prisma.contract.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
