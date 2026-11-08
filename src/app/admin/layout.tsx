import React from 'react';
import { getAdminSession } from '@/lib/auth';
import AdminShell from '@/components/admin/AdminShell';

export const metadata = {
  title: 'Admin Dashboard | B Growth Agency',
  description: 'Enterprise Content Management & Lead CRM for B Growth Agency.',
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  // If no session (e.g. login page), render without the shell
  if (!session) {
    return <>{children}</>;
  }

  return (
    <AdminShell user={session}>
      {children}
    </AdminShell>
  );
}
