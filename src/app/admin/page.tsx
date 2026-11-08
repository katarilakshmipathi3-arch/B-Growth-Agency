import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { 
  Briefcase, 
  Layers, 
  Inbox, 
  Users, 
  BookOpen, 
  TrendingUp, 
  ArrowRight, 
  Plus, 
  Clock, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { formatDate } from '@/lib/utils';
import AdminDashboardCharts from '@/components/admin/AdminDashboardCharts';
import InquiryStatusSelect from '@/components/admin/InquiryStatusSelect';

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const [
    servicesCount,
    portfolioCount,
    inquiriesCount,
    newInquiriesCount,
    blogsCount,
    subscribersCount,
    recentInquiries,
    portfolioItems
  ] = await Promise.all([
    prisma.service.count(),
    prisma.portfolioItem.count(),
    prisma.inquiry.count(),
    prisma.inquiry.count({ where: { status: 'New' } }),
    prisma.blogPost.count(),
    prisma.newsletterSubscriber.count(),
    prisma.inquiry.findMany({
      orderBy: { createdAt: 'desc' },
      take: 6,
    }),
    prisma.portfolioItem.findMany({
      select: { type: true },
    }),
  ]);

  // Aggregate works by type
  const worksByType = {
    Websites: portfolioItems.filter(p => p.type === 'Website').length,
    Posters: portfolioItems.filter(p => p.type === 'Poster Design').length,
    Videos: portfolioItems.filter(p => p.type === 'Edited Video').length,
  };

  return (
    <div className="space-y-8">
      
      {/* Top Banner & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-navy dark:text-white">
            Agency Control Center
          </h1>
          <p className="text-xs text-brand-muted dark:text-gray-400 mt-1">
            Real-time overview of incoming client inquiries, portfolio assets, and services.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <Link
            href="/admin/services/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Service</span>
          </Link>

          <Link
            href="/admin/portfolio/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white dark:bg-slate-800 border border-brand-border dark:border-slate-700 hover:border-primary text-brand-navy dark:text-white text-xs font-semibold rounded-xl transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Project</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: 'Total Inquiries', count: inquiriesCount, icon: Inbox, color: 'text-primary', bg: 'bg-primary-tint dark:bg-primary/20' },
          { label: 'New Unread Leads', count: newInquiriesCount, icon: AlertCircle, color: 'text-status-warning', bg: 'bg-amber-100 dark:bg-amber-900/30' },
          { label: 'Live Services', count: servicesCount, icon: Layers, color: 'text-status-success', bg: 'bg-green-100 dark:bg-green-900/30' },
          { label: 'Portfolio Works', count: portfolioCount, icon: Briefcase, color: 'text-primary', bg: 'bg-primary-tint dark:bg-primary/20' },
          { label: 'Published Blogs', count: blogsCount, icon: BookOpen, color: 'text-purple-600', bg: 'bg-purple-100 dark:bg-purple-900/30' },
          { label: 'Subscribers', count: subscribersCount, icon: Users, color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/30' },
        ].map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-brand-border dark:border-slate-800 shadow-soft space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase text-brand-muted dark:text-gray-400 truncate">
                  {kpi.label}
                </span>
                <div className={`p-1.5 rounded-lg ${kpi.bg} ${kpi.color}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="text-2xl font-extrabold text-brand-navy dark:text-white font-heading">
                {kpi.count}
              </div>
            </div>
          );
        })}
      </div>

      {/* Visual Analytics Strip & Breakdown */}
      <AdminDashboardCharts 
        worksByType={worksByType} 
        totalInquiries={inquiriesCount} 
        newInquiries={newInquiriesCount} 
      />

      {/* Recent Inquiries Lead Inbox */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-brand-border dark:border-slate-800 shadow-soft overflow-hidden">
        <div className="p-5 border-b border-brand-border dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm text-brand-navy dark:text-white">
              Recent Inquiries & Project Requests
            </h3>
            <p className="text-xs text-brand-muted dark:text-gray-400">
              Direct submissions from the Contact form and Multi-Step Quote wizard.
            </p>
          </div>
          <Link
            href="/admin/inquiries"
            className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
          >
            <span>View all inbox ({inquiriesCount})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-brand-bg/50 dark:bg-slate-800/50 border-b border-brand-border dark:border-slate-800 text-brand-muted uppercase font-bold text-[10px]">
                <th className="p-3.5">Client</th>
                <th className="p-3.5">Type</th>
                <th className="p-3.5">Service Interest</th>
                <th className="p-3.5">Budget</th>
                <th className="p-3.5">Submitted</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/60 dark:divide-slate-800">
              {recentInquiries.map((inq) => (
                <tr key={inq.id} className="hover:bg-brand-bg/40 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="p-3.5">
                    <div className="font-bold text-brand-navy dark:text-white">
                      {inq.name}
                    </div>
                    <div className="text-[11px] text-brand-muted">
                      {inq.email} {inq.phone ? `• ${inq.phone}` : ''}
                    </div>
                  </td>
                  <td className="p-3.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      inq.type === 'quote' 
                        ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' 
                        : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                    }`}>
                      {inq.type}
                    </span>
                  </td>
                  <td className="p-3.5 font-medium text-brand-navy dark:text-gray-200">
                    {inq.serviceInterest || 'General Inquiry'}
                  </td>
                  <td className="p-3.5 text-brand-muted dark:text-gray-400 font-semibold">
                    {inq.budget || 'N/A'}
                  </td>
                  <td className="p-3.5 text-brand-muted">
                    {formatDate(inq.createdAt)}
                  </td>
                  <td className="p-3.5">
                    <InquiryStatusSelect inquiryId={inq.id} currentStatus={inq.status} />
                  </td>
                  <td className="p-3.5 text-right">
                    <Link
                      href={`/admin/inquiries?id=${inq.id}`}
                      className="text-xs font-semibold text-primary hover:underline"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
