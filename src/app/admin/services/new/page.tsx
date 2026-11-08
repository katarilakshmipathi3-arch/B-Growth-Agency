import React from 'react';
import ServiceEditorForm from '@/components/admin/ServiceEditorForm';

export default function NewServicePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-brand-navy dark:text-white">
          Add New Agency Service
        </h1>
        <p className="text-xs text-brand-muted dark:text-gray-400 mt-1">
          Publish a new high-converting offering on the public website.
        </p>
      </div>

      <ServiceEditorForm />
    </div>
  );
}
