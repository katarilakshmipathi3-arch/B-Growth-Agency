import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';

const inquirySchema = z.object({
  type: z.enum(['contact', 'quote']).default('contact'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional().nullable(),
  serviceInterest: z.string().optional().nullable(),
  budget: z.string().optional().nullable(),
  timeline: z.string().optional().nullable(),
  message: z.string().min(5, 'Message must be at least 5 characters'),
  details: z.any().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = inquirySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ 
        error: parsed.error.errors.map(e => e.message).join(', ') 
      }, { status: 400 });
    }

    const data = parsed.data;

    const inquiry = await prisma.inquiry.create({
      data: {
        type: data.type,
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        serviceInterest: data.serviceInterest || null,
        budget: data.budget || null,
        timeline: data.timeline || null,
        message: data.message,
        details: data.details ? JSON.stringify(data.details) : null,
        status: 'New',
      },
    });

    return NextResponse.json({ success: true, inquiry }, { status: 201 });
  } catch (error) {
    console.error('Inquiry submission error:', error);
    return NextResponse.json({ error: 'Failed to submit inquiry' }, { status: 500 });
  }
}
