import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { Plus, HelpCircle, Edit3, Trash2 } from 'lucide-react';

export const revalidate = 0;

export default async function AdminFaqsPage() {
  const faqs = await prisma.fAQ.findMany({ orderBy: { order: 'asc' } });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-[#0B1420]">FAQ Manager</h1>
          <p className="text-sm text-[#6B7384] mt-0.5">{faqs.length} questions configured</p>
        </div>
        <Link
          href="/admin/faqs/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1853CF] hover:bg-[#1749C0] text-white text-sm font-bold rounded-lg transition-colors shadow-md shadow-blue-500/20"
        >
          <Plus className="w-4 h-4" /> Add FAQ
        </Link>
      </div>

      {faqs.length === 0 ? (
        <div className="text-center py-24 bg-white border border-[#E0E2DA] rounded-xl">
          <HelpCircle className="w-12 h-12 text-gray-200 mx-auto mb-4" />
          <p className="text-[#6B7384] font-semibold">No FAQs yet. Add your first question.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={faq.id} className="bg-white border border-[#E0E2DA] rounded-xl p-5 hover:border-[#1853CF] transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <span className="text-2xl font-black text-[#1853CF]/20 flex-shrink-0 leading-none mt-0.5">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 bg-[#EBF1FF] text-[#1853CF] text-[10px] font-bold rounded uppercase tracking-wider">
                        {faq.category}
                      </span>
                    </div>
                    <h3 className="font-black text-sm text-[#0B1420] mb-1.5">{faq.question}</h3>
                    <p className="text-xs text-[#6B7384] leading-relaxed line-clamp-2">{faq.answer}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Link
                    href={`/admin/faqs/${faq.id}`}
                    className="p-2 text-[#6B7384] hover:text-[#1853CF] hover:bg-[#EBF1FF] rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit3 className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

