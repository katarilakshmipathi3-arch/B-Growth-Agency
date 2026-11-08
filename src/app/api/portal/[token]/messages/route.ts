import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(
  req: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    const portal = await prisma.clientPortal.findUnique({
      where: { token: params.token },
    });

    if (!portal) {
      return NextResponse.json({ error: 'Portal not found' }, { status: 404 });
    }

    const body = await req.json();
    const { sender, senderName, message } = body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json({ error: 'Message cannot be empty' }, { status: 400 });
    }

    const newMsg = await prisma.clientPortalMessage.create({
      data: {
        portalId: portal.id,
        sender: sender === 'AGENCY' ? 'AGENCY' : 'CLIENT',
        senderName: senderName || (sender === 'AGENCY' ? 'Adharsh Katari' : portal.clientName),
        message: message.trim(),
      },
    });

    return NextResponse.json({ success: true, message: newMsg });
  } catch (error) {
    console.error('Portal message error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
