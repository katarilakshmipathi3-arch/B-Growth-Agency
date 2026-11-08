import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import { Plus, Building2, Edit3, ExternalLink } from 'lucide-react';

export const revalidate = 0;

export default async function AdminClientsPage() {
  const clients = await prisma.clientLogo.findMany({ orderBy: { order: 'asc' } });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-[#0B1420]">Clients / Logos</h1>
          <p className="text-sm text-[#6B7384] mt-0.5">{clients.length} client logos</p>
        </div>
        <Link
          href="/admin/clients/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1F5FE6] hover:bg-[#1749C0] text-white text-sm font-bold rounded-lg transition-colors shadow-md shadow-blue-500/20"
        >
          <Plus className="w-4 h-4" /> Add Client
        </Link>
      </div>

      {clients.length === 0 ? (
        <div className="text-center py-24 bg-white border border-[#E0E2DA] rounded-xl">
          <Building2 className="w-12 h-12 text-gray-200 mx-auto mb-4" />
          <p className="text-[#6B7384] font-semibold">No client logos yet. Add your first client.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {clients.map((client) => (
            <div key={client.id} className="bg-white border border-[#E0E2DA] rounded-xl p-4 hover:border-[#1F5FE6] transition-colors group relative">
              <div className="relative h-14 w-full mb-3">
                <Image
                  src={client.logoUrl}
                  alt={client.name}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-xs font-bold text-[#0B1420] text-center truncate">{client.name}</div>
              
              {/* Actions overlay */}
              <div className="absolute inset-0 bg-white/90 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Link
                  href={`/admin/clients/${client.id}`}
                  className="p-2 bg-[#EBF1FF] text-[#1F5FE6] rounded-lg hover:bg-[#1F5FE6] hover:text-white transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                </Link>
                {client.websiteUrl && (
                  <a
                    href={client.websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 bg-[#F4F5F0] text-[#6B7384] rounded-lg hover:bg-[#0B1420] hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
