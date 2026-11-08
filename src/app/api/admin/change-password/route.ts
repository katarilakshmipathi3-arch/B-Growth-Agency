import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminSession, hashPassword, verifyPassword } from '@/lib/auth';
import { z } from 'zod';

const changePasswordSchema = z.object({
  currentPassword: z.string().optional(),
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
});

export async function POST(req: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const parsed = changePasswordSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.userId },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // If not first time, verify current password
    if (!user.mustChangePassword && parsed.data.currentPassword) {
      const match = await verifyPassword(parsed.data.currentPassword, user.password);
      if (!match) {
        return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 });
      }
    }

    const hashedPassword = await hashPassword(parsed.data.newPassword);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        mustChangePassword: false,
      },
    });

    await prisma.activityLog.create({
      data: {
        userId: user.id,
        userName: user.name,
        action: 'UPDATE',
        entityType: 'User',
        entityId: user.id,
        details: 'Password was updated successfully',
      },
    });

    return NextResponse.json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    return NextResponse.json({ error: 'Failed to update password' }, { status: 500 });
  }
}
