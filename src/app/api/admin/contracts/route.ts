import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const contracts = await prisma.contract.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(contracts);
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
      title,
      clientName,
      clientEmail,
      clientCompany,
      serviceScope,
      totalValue = 0,
      paymentSchedule = '50% upfront deposit before kickoff, 50% upon final signoff and delivery.',
      deliverables = '[]',
      terms,
      status = 'SENT',
    } = body;

    if (!title || !clientName || !clientEmail || !clientCompany || !serviceScope) {
      return NextResponse.json({ error: 'Title, client details, and scope are required' }, { status: 400 });
    }

    const count = await prisma.contract.count();
    const year = new Date().getFullYear();
    const contractNumber = `CTR-${year}-${String(count + 1).padStart(3, '0')}`;

    const defaultTerms = terms || `1. SERVICES & EXECUTION: B Growth Agency ("Agency") agrees to provide the specified services to ${clientCompany} ("Client") in accordance with industry best standards.
2. TIMELINE & DELIVERABLES: Delivery milestones will be tracked via the dedicated Client Tracking Portal. Delays caused by pending Client assets will extend delivery dates accordingly.
3. PAYMENT TERMS: Payments are non-refundable once sprint kickoff begins. Late payments past 7 business days incur a 2% monthly interest.
4. REVISIONS: Includes up to two (2) comprehensive revision rounds within 14 days of deliverable submission.
5. INTELLECTUAL PROPERTY: Upon 100% receipt of all agreed fees, all final design, code, and video assets become the exclusive property of Client. Agency retains rights to showcase work in its public portfolio.
6. CONFIDENTIALITY: Both parties agree to protect and maintain absolute confidentiality of all proprietary business data.`;

    const contract = await prisma.contract.create({
      data: {
        contractNumber,
        title,
        clientName,
        clientEmail,
        clientCompany,
        serviceScope,
        totalValue: Number(totalValue) || 0,
        paymentSchedule,
        deliverables: typeof deliverables === 'string' ? deliverables : JSON.stringify(deliverables),
        terms: defaultTerms,
        status,
      },
    });

    return NextResponse.json(contract, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
