import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import { Plus, Edit3, Trash2, ExternalLink, Sparkles, Check, Eye } from 'lucide-react';
import AdminServiceDeleteButton from '@/components/admin/AdminServiceDeleteButton';

export const revalidate = 0;

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: { order: 'asc' },
  });

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-brand-navy dark:text-white">
            Services Manager
          </h1>
          <p className="text-xs text-brand-muted dark:text-gray-400 mt-1">
            Create, edit, pricing tiers, and manage visibility of all agency offerings.
          </p>
        </div>

        <Link
          href="/admin/services/new"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-primary hover:bg-primary-hover text-white text-xs font-semibold rounded-xl shadow-xs transition-colors w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </Link>
      </div>

      {/* Services Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-brand-border dark:border-slate-800 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-brand-bg/50 dark:bg-slate-800/50 border-b border-brand-border dark:border-slate-800 text-brand-muted uppercase font-bold text-[10px]">
                <th className="p-3.5">Service</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Starting Rate</th>
                <th className="p-3.5">Featured</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/60 dark:divide-slate-800">
              {services.map((service) => (
                <tr key={service.id} className="hover:bg-brand-bg/40 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="p-3.5">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-10 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                        <Image src={service.coverImage} alt={service.title} fill className="object-cover" />
                      </div>
                      <div>
                        <div className="font-bold text-brand-navy dark:text-white">
                          {service.title}
                        </div>
                        <div className="text-[11px] text-brand-muted">
                          /{service.slug}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="p-3.5 font-medium text-brand-navy dark:text-gray-300">
                    {service.category}
                  </td>

                  <td className="p-3.5 font-extrabold text-primary">
                    ₹{service.startingPrice.toLocaleString()}
                  </td>

                  <td className="p-3.5">
                    {service.isFeatured ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                        ★ Featured
                      </span>
                    ) : (
                      <span className="text-[11px] text-brand-muted">-</span>
                    )}
                  </td>

                  <td className="p-3.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      service.status === 'published'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                        : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                    }`}>
                      {service.status}
                    </span>
                  </td>

                  <td className="p-3.5 text-right space-x-2">
                    <Link
                      href={`/services/${service.slug}`}
                      target="_blank"
                      className="p-1.5 rounded-lg text-brand-muted hover:text-brand-navy hover:bg-brand-bg inline-block"
                      title="View Live"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </Link>

                    <Link
                      href={`/admin/services/${service.id}`}
                      className="p-1.5 rounded-lg text-primary hover:bg-primary-tint/40 inline-block"
                      title="Edit Service"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </Link>

                    <AdminServiceDeleteButton serviceId={service.id} serviceTitle={service.title} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
