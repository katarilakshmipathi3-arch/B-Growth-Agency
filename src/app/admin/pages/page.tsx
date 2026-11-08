import React from 'react';
import prisma from '@/lib/prisma';
import PageContentEditorClient from '@/components/admin/PageContentEditorClient';

export const revalidate = 0;

export default async function AdminPagesEditorPage() {
  const homeRecord = await prisma.pageContent.findUnique({
    where: { key: 'home' },
  });

  const homeData = homeRecord?.data ? JSON.parse(homeRecord.data) : null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-brand-navy dark:text-white">
          Visual Pages & Content Editor
        </h1>
        <p className="text-xs text-brand-muted dark:text-gray-400 mt-1">
          Edit headlines, subtext, stats counters, framework steps, and CTA banners live without code.
        </p>
      </div>

      <PageContentEditorClient initialData={homeData} />
    </div>
  );
}
