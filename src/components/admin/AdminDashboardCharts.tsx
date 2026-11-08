'use client';

import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

interface Props {
  worksByType: {
    Websites: number;
    Posters: number;
    Videos: number;
  };
  totalInquiries: number;
  newInquiries: number;
}

const COLORS = ['#1F5FE6', '#16A34A', '#F59E0B'];

export default function AdminDashboardCharts({ worksByType, totalInquiries, newInquiries }: Props) {
  const portfolioDistribution = [
    { name: 'Websites', count: worksByType.Websites },
    { name: 'Poster Designs', count: worksByType.Posters },
    { name: 'Edited Videos', count: worksByType.Videos },
  ];

  // Dummy monthly inquiry velocity chart
  const inquiryVelocity = [
    { month: 'Jun', leads: 8 },
    { month: 'Jul', leads: 14 },
    { month: 'Aug', leads: 22 },
    { month: 'Sep', leads: 31 },
    { month: 'Oct', leads: 45 },
    { month: 'Nov', leads: 58 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Monthly Inquiries Velocity Chart */}
      <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-brand-border dark:border-slate-800 shadow-soft space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-brand-navy dark:text-white">
              Lead Velocity & Monthly Inquiries
            </h3>
            <p className="text-xs text-brand-muted dark:text-gray-400">
              Inbound client consultation and quote submissions
            </p>
          </div>
          <span className="text-xs font-bold text-status-success bg-status-success/15 px-2.5 py-1 rounded-full">
            +38% vs prev quarter
          </span>
        </div>

        <div className="h-64 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={inquiryVelocity}>
              <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0B1B3A', 
                  borderRadius: '12px', 
                  color: '#fff', 
                  border: 'none', 
                  fontSize: '12px' 
                }} 
              />
              <Bar dataKey="leads" fill="#1F5FE6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Portfolio Distribution Pie */}
      <div className="lg:col-span-1 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-brand-border dark:border-slate-800 shadow-soft space-y-4 flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-bold text-brand-navy dark:text-white">
            Portfolio by Category
          </h3>
          <p className="text-xs text-brand-muted dark:text-gray-400">
            Active showcased deliverables
          </p>
        </div>

        <div className="h-44 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={portfolioDistribution}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={65}
                paddingAngle={4}
                dataKey="count"
              >
                {portfolioDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-1.5 pt-2 border-t border-brand-border dark:border-slate-800 text-xs">
          {portfolioDistribution.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx] }} />
                <span className="text-brand-muted dark:text-gray-300">{item.name}</span>
              </div>
              <span className="font-bold text-brand-navy dark:text-white">{item.count}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
