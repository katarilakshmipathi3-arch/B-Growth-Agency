import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import ClientPortalClientView from '@/components/portal/ClientPortalClientView';

export const revalidate = 0;

export async function generateMetadata({ params }: { params: { token: string } }) {
  const portal = await prisma.clientPortal.findUnique({
    where: { token: params.token },
  });

  if (!portal) return { title: 'Project Tracking Portal | B Growth Agency' };

  return {
    title: `${portal.projectName} — Live Client Tracking Portal | B Growth Agency`,
    description: `Private tracking portal for ${portal.clientName} (${portal.company}). Monitor project milestones, deliverables, staging builds, and communicate directly with B Growth Agency.`,
  };
}

export default async function ClientPortalPage({ params }: { params: { token: string } }) {
  const portal = await prisma.clientPortal.findUnique({
    where: { token: params.token },
    include: {
      messages: {
        orderBy: { createdAt: 'asc' },
      },
      invoices: {
        orderBy: { date: 'desc' },
      },
    },
  });

  if (!portal || !portal.isActive) {
    notFound();
  }

  // Also fetch contract if any for this client email
  const contract = await prisma.contract.findFirst({
    where: { clientEmail: portal.clientEmail },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <ClientPortalClientView
      portal={portal}
      contract={contract}
    />
  );
}
