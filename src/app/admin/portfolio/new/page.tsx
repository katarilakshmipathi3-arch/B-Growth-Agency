import React from 'react';
import PortfolioEditorForm from '@/components/admin/PortfolioEditorForm';

export default function NewPortfolioPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-brand-navy dark:text-white">
          Add New Portfolio Case Study
        </h1>
        <p className="text-xs text-brand-muted dark:text-gray-400 mt-1">
          Add a completed Website, Poster Design, or Edited Video.
        </p>
      </div>

      <PortfolioEditorForm />
    </div>
  );
}
