import React from 'react';
import prisma from '@/lib/prisma';
import { UserCheck, Shield, Clock } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export const revalidate = 0;

export default async function AdminUsersPage() {
  const [users, logs] = await Promise.all([
    prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    }),
    prisma.activityLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 15,
    }),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-brand-navy dark:text-white">
          Users, Roles & Audit Activity
        </h1>
        <p className="text-xs text-brand-muted dark:text-gray-400 mt-1">
          Review authorized team members and system audit logs.
        </p>
      </div>

      {/* Users table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-brand-border dark:border-slate-800 shadow-soft overflow-hidden">
        <div className="p-4 border-b border-brand-border dark:border-slate-800">
          <h3 className="font-bold text-xs uppercase tracking-wider text-brand-navy dark:text-white">
            Authorized Admin Users
          </h3>
        </div>
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-brand-bg/50 dark:bg-slate-800/50 border-b border-brand-border dark:border-slate-800 text-brand-muted uppercase text-[10px] font-bold">
              <th className="p-3.5">Name</th>
              <th className="p-3.5">Email</th>
              <th className="p-3.5">Role</th>
              <th className="p-3.5">Account Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-border/60 dark:divide-slate-800">
            {users.map((u) => (
              <tr key={u.id}>
                <td className="p-3.5 font-bold text-brand-navy dark:text-white">
                  {u.name}
                </td>
                <td className="p-3.5 text-brand-muted">
                  {u.email}
                </td>
                <td className="p-3.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary-tint dark:bg-primary/20 text-primary">
                    {u.role}
                  </span>
                </td>
                <td className="p-3.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700">
                    Active
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Audit Logs */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-brand-border dark:border-slate-800 shadow-soft overflow-hidden">
        <div className="p-4 border-b border-brand-border dark:border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-xs uppercase tracking-wider text-brand-navy dark:text-white">
            Recent System Activity Logs
          </h3>
          <span className="text-[11px] text-brand-muted">Last 15 actions</span>
        </div>
        <div className="divide-y divide-brand-border/60 dark:divide-slate-800 text-xs">
          {logs.map((log) => (
            <div key={log.id} className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-brand-bg dark:bg-slate-800 text-brand-navy dark:text-gray-300">
                  {log.action}
                </span>
                <span className="font-semibold text-brand-navy dark:text-white">
                  {log.details || `${log.action} on ${log.entityType}`}
                </span>
                <span className="text-[11px] text-brand-muted">
                  by {log.userName}
                </span>
              </div>
              <span className="text-brand-muted text-[11px]">
                {formatDate(log.createdAt)}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
