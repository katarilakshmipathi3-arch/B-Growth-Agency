import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const portals = await prisma.clientPortal.findMany({
      include: {
        invoices: true,
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(portals);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
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
      company,
      token,
      projectName,
      serviceType,
      status = 'In Progress',
      progress = 20,
      startDate,
      deliveryDate,
      stagingUrl,
      figmaUrl,
      videoProofUrl,
      milestones = '[]',
      deliverables = '[]',
      expiresInDays = 60,
    } = body;

    if (!clientName || !clientEmail || !company || !projectName || !serviceType) {
      return NextResponse.json({ error: 'Missing required client fields' }, { status: 400 });
    }

    // Generate or clean token
    let cleanToken = (token || `${company}-${projectName}`)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9_-]/g, '-')
      .replace(/-+/g, '-');

    if (!cleanToken) cleanToken = `client-${Date.now()}`;

    // Check token collision
    const existing = await prisma.clientPortal.findUnique({
      where: { token: cleanToken },
    });
    if (existing) {
      cleanToken = `${cleanToken}-${Math.floor(100 + Math.random() * 900)}`;
    }

    // Set expiry
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + Number(expiresInDays || 60));

    // Default milestones if none provided
    const defaultMilestones = milestones !== '[]' && milestones ? milestones : JSON.stringify([
      { id: 'm1', title: 'Strategy & Brand Discovery', desc: 'Kickoff brief, target audience audit, and architecture alignment', status: 'completed', date: startDate || 'Day 1' },
      { id: 'm2', title: 'Creative Wireframing & Design', desc: 'Full high-fidelity Figma components and user experience layouts', status: 'in_progress', date: 'Sprint 1' },
      { id: 'm3', title: 'Core Production & Development', desc: 'Full custom implementation with animation and responsive polish', status: 'upcoming', date: 'Sprint 2' },
      { id: 'm4', title: 'QA Testing & Final Delivery', desc: 'Final revisions, cross-browser stress testing, and production deployment', status: 'upcoming', date: deliveryDate || 'Final Sprint' }
    ]);

    const portal = await prisma.clientPortal.create({
      data: {
        clientName,
        clientEmail,
        company,
        token: cleanToken,
        projectName,
        serviceType,
        status,
        progress: Number(progress) || 20,
        startDate,
        deliveryDate,
        stagingUrl,
        figmaUrl,
        videoProofUrl,
        milestones: typeof defaultMilestones === 'string' ? defaultMilestones : JSON.stringify(defaultMilestones),
        deliverables: typeof deliverables === 'string' ? deliverables : JSON.stringify(deliverables),
        expiresAt,
        isActive: true,
      },
    });

    return NextResponse.json(portal, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to create portal' }, { status: 500 });
  }
}
