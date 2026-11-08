import React from 'react';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import ServiceEditorForm from '@/components/admin/ServiceEditorForm';

export const revalidate = 0;

export default async function EditServicePage({ params }: { params: { id: string } }) {
  const service = await prisma.service.findUnique({
    where: { id: params.id },
  });

  if (!service) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-brand-navy dark:text-white">
          Edit Service: {service.title}
        </h1>
        <p className="text-xs text-brand-muted dark:text-gray-400 mt-1">
          Update pricing, features, deliverables, and SEO tags.
        </p>
      </div>

      <ServiceEditorForm initialData={service} serviceId={service.id} />
    </div>
  );
}
