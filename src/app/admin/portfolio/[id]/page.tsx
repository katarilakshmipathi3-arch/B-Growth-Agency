import React from 'react';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import PortfolioEditorForm from '@/components/admin/PortfolioEditorForm';

export const revalidate = 0;

export default async function EditPortfolioPage({ params }: { params: { id: string } }) {
  const item = await prisma.portfolioItem.findUnique({
    where: { id: params.id },
  });

  if (!item) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-brand-navy dark:text-white">
          Edit Project: {item.title}
        </h1>
        <p className="text-xs text-brand-muted dark:text-gray-400 mt-1">
          Update case study challenges, solutions, live URLs, and media assets.
        </p>
      </div>

      <PortfolioEditorForm initialData={item} itemId={item.id} />
    </div>
  );
}
