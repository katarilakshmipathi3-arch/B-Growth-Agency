import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const invoices = await prisma.invoice.findMany({
      include: {
        portal: {
          select: { token: true, projectName: true, company: true }
        }
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(invoices);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getAdminSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const {
      clientName,
      clientEmail,
      clientCompany,
      clientAddress = '',
      portalId,
      date,
      dueDate,
      items = [],
      taxRate = 18.0,
      discount = 0,
      status = 'PENDING',
      paymentNotes = 'UPI: bgrowth@okhdfcbank | Bank Wire: HDFC Bank, A/C: 50200084920192, IFSC: HDFC0001234',
    } = body;

    if (!clientName || !clientEmail || !clientCompany) {
      return NextResponse.json({ error: 'Client details are required' }, { status: 400 });
    }

    // Generate unique Invoice Number
    const count = await prisma.invoice.count();
    const year = new Date().getFullYear();
    const invoiceNumber = `INV-${year}-${String(count + 1).padStart(3, '0')}`;

    // Calculate subtotal
    const parsedItems = Array.isArray(items) ? items : JSON.parse(items || '[]');
    const subtotal = parsedItems.reduce((acc: number, item: any) => {
      const q = Number(item.quantity) || 1;
      const r = Number(item.rate) || 0;
      return acc + (q * r);
    }, 0);

    const discountAmount = Number(discount) || 0;
    const taxableAmount = Math.max(0, subtotal - discountAmount);
    const taxAmount = (taxableAmount * Number(taxRate)) / 100;
    const total = taxableAmount + taxAmount;

    const invoice = await prisma.invoice.create({
      data: {
        invoiceNumber,
        clientName,
        clientEmail,
        clientCompany,
        clientAddress,
        portalId: portalId || null,
        date: date || new Date().toISOString().split('T')[0],
        dueDate: dueDate || new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
        items: JSON.stringify(parsedItems),
        subtotal,
        taxRate: Number(taxRate),
        taxAmount,
        discount: discountAmount,
        total,
        status,
        paymentNotes,
      },
    });

    return NextResponse.json(invoice, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
