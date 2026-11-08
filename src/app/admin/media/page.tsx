import React from 'react';
import prisma from '@/lib/prisma';
import MediaLibraryClient from '@/components/admin/MediaLibraryClient';

export const revalidate = 0;

export default async function AdminMediaPage() {
  const mediaFiles = await prisma.mediaFile.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-brand-navy dark:text-white">
          Media Library & Assets
        </h1>
        <p className="text-xs text-brand-muted dark:text-gray-400 mt-1">
          Upload, preview, copy URLs, and manage all images and brand collateral.
        </p>
      </div>

      <MediaLibraryClient initialFiles={mediaFiles} />
    </div>
  );
}
