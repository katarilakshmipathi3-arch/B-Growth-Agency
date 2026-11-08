import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const invoice = await prisma.invoice.findFirst({
      where: {
        OR: [
          { id: id },
          { invoiceNumber: id }
        ]
      },
      include: {
        portal: {
          select: { token: true, projectName: true, company: true }
        }
      }
    });

    if (!invoice) {
      return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
    }

    return NextResponse.json(invoice);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
