import React from 'react';
import prisma from '@/lib/prisma';
import SubscribersClient from '@/components/admin/SubscribersClient';

export const revalidate = 0;

export default async function AdminSubscribersPage() {
  const subscribers = await prisma.newsletterSubscriber.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-brand-navy dark:text-white">
          Newsletter Subscribers
        </h1>
        <p className="text-xs text-brand-muted dark:text-gray-400 mt-1">
          Export email lists to Mailchimp, Brevo, or SendGrid.
        </p>
      </div>

      <SubscribersClient initialSubscribers={subscribers} />
    </div>
  );
}
