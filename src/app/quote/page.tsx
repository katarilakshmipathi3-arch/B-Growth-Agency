import React from 'react';
import QuoteWizard from '@/components/quote/QuoteWizard';
import { Sparkles, CheckCircle } from 'lucide-react';

export const metadata = {
  title: 'Get an Instant Project Quote | B Growth Agency',
  description: 'Interactive multi-step quote calculator for website development, poster design, and video editing. Receive an itemized proposal.',
};

export default function QuotePage() {
  return (
    <div className="min-h-screen bg-white">
      
      {/* ================================================================
          HERO — Royal Blue
          ================================================================ */}
      <section className="hero-blue py-24 md:py-32">
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 text-center">
          <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-blue-200/70 mb-4">
            B GROWTH AGENCY · INSTANT QUOTE ESTIMATOR
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase text-white mb-6 leading-tight">
            CALCULATE YOUR<br />
            <span className="text-blue-200">PROJECT SCOPE.</span>
          </h1>
          <p className="text-blue-100 text-lg max-w-xl mx-auto leading-relaxed">
            Answer a few quick questions to receive a tailored milestone breakdown and formal proposal within 24 hours.
          </p>
        </div>
      </section>

      {/* ================================================================
          WIZARD SECTION
          ================================================================ */}
      <section className="py-16 -mt-10 relative z-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="bg-white rounded-2xl shadow-xl border border-[#E0E2DA] p-6 sm:p-10">
            <QuoteWizard />
          </div>

          {/* Confidence Guarantees */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              'No obligation proposal & consultation',
              'Clear fixed-fee milestone pricing',
              'Full source code & asset ownership',
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white border border-[#E0E2DA]">
                <CheckCircle className="w-5 h-5 text-[#1853CF] flex-shrink-0" />
                <span className="text-xs font-bold text-[#0B1420]">
                  {text}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}

