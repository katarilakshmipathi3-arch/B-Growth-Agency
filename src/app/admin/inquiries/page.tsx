import React from 'react';
import prisma from '@/lib/prisma';
import InquiriesInboxClient from '@/components/admin/InquiriesInboxClient';

export const revalidate = 0;

export default async function AdminInquiriesPage() {
  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-brand-navy dark:text-white">
          Client Inquiries & Leads CRM
        </h1>
        <p className="text-xs text-brand-muted dark:text-gray-400 mt-1">
          Review, filter, track status, add internal notes, and export incoming leads.
        </p>
      </div>

      <InquiriesInboxClient initialInquiries={inquiries} />
    </div>
  );
}
