import React from 'react';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import DigitalContractClientView from '@/components/contract/DigitalContractClientView';

export const revalidate = 0;

export async function generateMetadata({ params }: { params: { id: string } }) {
  const contract = await prisma.contract.findUnique({
    where: { id: params.id },
  });

  if (!contract) return { title: 'Project Agreement | B Growth Agency' };

  return {
    title: `${contract.title} — Digital Agreement | B Growth Agency`,
    description: `Official digital services agreement for ${contract.clientName} (${contract.clientCompany}). Review scope deliverables and sign online.`,
  };
}

export default async function ContractPage({ params }: { params: { id: string } }) {
  const contract = await prisma.contract.findUnique({
    where: { id: params.id },
  });

  if (!contract) {
    notFound();
  }

  return <DigitalContractClientView contract={contract} />;
}
