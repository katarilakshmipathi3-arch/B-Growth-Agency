import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | B Growth Agency',
  description: 'Privacy Policy and data protection terms for B Growth Agency clients and website visitors.',
};

export default function PrivacyPage() {
  return (
    <div className="py-16 md:py-24 bg-brand-bg dark:bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900 p-8 sm:p-12 rounded-3xl border border-brand-border dark:border-slate-800 shadow-soft space-y-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy dark:text-white">
          Privacy Policy
        </h1>
        <p className="text-xs text-brand-muted dark:text-gray-400">
          Last updated: January 2025
        </p>

        <div className="space-y-6 text-sm text-brand-navy dark:text-gray-300 leading-relaxed">
          <p>
            At B Growth Agency, we respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy outlines how we collect, store, and utilize data when you browse our website or engage our digital agency services.
          </p>

          <h3 className="text-lg font-bold text-brand-navy dark:text-white">
            1. Information We Collect
          </h3>
          <p>
            When you request a quote, submit a contact inquiry, or subscribe to our growth newsletter, we may collect your name, email address, phone number, company name, and project specifications.
          </p>

          <h3 className="text-lg font-bold text-brand-navy dark:text-white">
            2. How We Use Your Information
          </h3>
          <p>
            We use your data solely to prepare project roadmaps, respond to inquiries, send relevant industry articles (if opted in), and execute agreed contract deliverables. We never sell or lease your personal information to third parties.
          </p>

          <h3 className="text-lg font-bold text-brand-navy dark:text-white">
            3. Data Security
          </h3>
          <p>
            All data transmissions are encrypted using standard SSL protocols. Access to client project files and inquiries is strictly restricted to authorized team members with two-factor authentication.
          </p>

          <h3 className="text-lg font-bold text-brand-navy dark:text-white">
            4. Contact
          </h3>
          <p>
            For any privacy inquiries or to request data deletion, contact us at <a href="mailto:contact@bgrowth.agency" className="text-primary hover:underline">contact@bgrowth.agency</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
