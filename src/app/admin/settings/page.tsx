import React from 'react';
import prisma from '@/lib/prisma';
import AdminSettingsClient from '@/components/admin/AdminSettingsClient';

export const revalidate = 0;

export default async function AdminSettingsPage() {
  const settingsList = await prisma.siteSetting.findMany();
  const settings = settingsList.reduce((acc, s) => {
    acc[s.key] = s.value;
    return acc;
  }, {} as Record<string, string>);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-brand-navy dark:text-white">
          Global Site Settings
        </h1>
        <p className="text-xs text-brand-muted dark:text-gray-400 mt-1">
          Configure business details, WhatsApp chat number, logo paths, and analytics.
        </p>
      </div>

      <AdminSettingsClient initialSettings={settings} />
    </div>
  );
}
