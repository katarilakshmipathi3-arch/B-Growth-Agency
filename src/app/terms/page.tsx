import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service | B Growth Agency',
  description: 'Terms of Service and client engagement agreements for B Growth Agency.',
};

export default function TermsPage() {
  return (
    <div className="py-16 md:py-24 bg-brand-bg dark:bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900 p-8 sm:p-12 rounded-3xl border border-brand-border dark:border-slate-800 shadow-soft space-y-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy dark:text-white">
          Terms of Service
        </h1>
        <p className="text-xs text-brand-muted dark:text-gray-400">
          Last updated: January 2025
        </p>

        <div className="space-y-6 text-sm text-brand-navy dark:text-gray-300 leading-relaxed">
          <p>
            Welcome to B Growth Agency. By accessing this website or contracting our design, engineering, or video editing services, you agree to comply with and be bound by the following terms.
          </p>

          <h3 className="text-lg font-bold text-brand-navy dark:text-white">
            1. Intellectual Property & Ownership
          </h3>
          <p>
            Upon full settlement of agreed project fees, all final design files (PSDs, AI, Figma files), website source code, and rendered video assets become the exclusive intellectual property of the client.
          </p>

          <h3 className="text-lg font-bold text-brand-navy dark:text-white">
            2. Payment Milestones
          </h3>
          <p>
            Project engagements operate under a milestone framework (typically 50% deposit prior to kickoff, and 50% upon final acceptance before production server migration).
          </p>

          <h3 className="text-lg font-bold text-brand-navy dark:text-white">
            3. Revision Scope
          </h3>
          <p>
            All standard packages include structured revision rounds as specified in your statement of work. Additional revisions requested beyond the agreed scope will be itemized at our standard hourly or milestone rates.
          </p>
        </div>
      </div>
    </div>
  );
}
