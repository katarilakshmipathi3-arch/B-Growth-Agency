'use client';

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export default function HomeFaqAccordion({ faqs }: { faqs: FAQ[] }) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  return (
    <div className="space-y-3">
      {faqs.map((faq, idx) => {
        const isOpen = openId === faq.id;
        return (
          <div
            key={faq.id}
            className={`border rounded-xl overflow-hidden transition-all duration-300 ${
              isOpen
                ? 'border-[#1853CF] shadow-md shadow-blue-100'
                : 'border-[#E0E2DA] hover:border-[#C7D7F8]'
            }`}
          >
            <button
              onClick={() => setOpenId(isOpen ? null : faq.id)}
              className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 bg-white hover:bg-[#FAFBFF] transition-colors"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-4">
                <span className={`text-[12px] font-black flex-shrink-0 tabular-nums ${
                  isOpen ? 'text-[#1853CF]' : 'text-[#C7D7F8]'
                }`}>
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span className="font-bold text-sm sm:text-base text-[#0B1420]">
                  {faq.question}
                </span>
              </div>
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                isOpen
                  ? 'bg-[#1853CF] text-white'
                  : 'bg-[#F4F5F0] text-[#6B7384]'
              }`}>
                {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
              </div>
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                isOpen ? 'max-h-96' : 'max-h-0'
              }`}
            >
              <div className="px-6 pb-6 pt-0 bg-white border-t border-[#F0F1EC]">
                <div className="pl-9 pt-4">
                  <p className="text-sm text-[#6B7384] leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

