import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const files = await prisma.mediaFile.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(files);
}

export async function DELETE(req: Request) {
  try {
    const session = await getAdminSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Media ID required' }, { status: 400 });
    }

    const media = await prisma.mediaFile.findUnique({
      where: { id },
    });

    if (!media) {
      return NextResponse.json({ error: 'Media not found' }, { status: 404 });
    }

    // Try deleting physical file from disk
    try {
      const diskPath = path.join(process.cwd(), 'public', media.url.replace(/^\//, ''));
      if (fs.existsSync(diskPath)) {
        fs.unlinkSync(diskPath);
      }
    } catch (e) {
      console.warn('Could not delete physical file:', e);
    }

    await prisma.mediaFile.delete({
      where: { id },
    });

    await prisma.activityLog.create({
      data: {
        userId: session.userId,
        userName: session.name,
        action: 'DELETE',
        entityType: 'MediaFile',
        entityId: id,
        details: `Deleted file: ${media.originalName}`,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting media:', error);
    return NextResponse.json({ error: 'Failed to delete file' }, { status: 500 });
  }
}
