import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { signatureName, consentChecked } = body;

    if (!signatureName || !consentChecked) {
      return NextResponse.json({ error: 'Full legal name and consent confirmation are required to execute this contract.' }, { status: 400 });
    }

    // Look up contract by ID or contractNumber
    const contract = await prisma.contract.findFirst({
      where: {
        OR: [
          { id: params.id },
          { contractNumber: params.id }
        ]
      }
    });

    if (!contract) {
      return NextResponse.json({ error: 'Contract not found' }, { status: 404 });
    }

    const updated = await prisma.contract.update({
      where: { id: contract.id },
      data: {
        status: 'SIGNED',
        signedAt: new Date(),
        signatureName: signatureName.trim(),
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Agreement legally signed and executed successfully.',
      contract: updated,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Signing failed' }, { status: 500 });
  }
}
