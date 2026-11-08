'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calculator, ArrowRight, TrendingUp, Sparkles } from 'lucide-react';

export default function PricingRoiCalculator() {
  const [budget, setBudget] = useState(35000);
  const [inquiries, setInquiries] = useState(40);

  // Approximate metrics calculation
  const estimatedRevenue = Math.round(inquiries * 25000 * 0.15); // 15% conversion at 25k avg ticket
  const roiMultiplier = ((estimatedRevenue / budget)).toFixed(1);
  const paybackDays = Math.max(7, Math.round(30 / Math.max(1, parseFloat(roiMultiplier))));

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.35)] border border-white/80 transition-transform duration-300 hover:-translate-y-1 text-[#0B1420]">
      <div className="flex items-center justify-between gap-3 mb-5">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-blue-50 text-[#1853CF] border border-blue-200">
          <Calculator className="w-3.5 h-3.5" /> Live Agency ROI Estimator
        </span>
        <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Real-time
        </span>
      </div>

      <div className="space-y-4 mb-5">
        <div>
          <div className="flex justify-between text-xs font-bold mb-1.5">
            <span className="text-slate-600">Monthly Project / Sprint Budget</span>
            <span className="text-[#1853CF] font-black">₹{budget.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min="15000"
            max="150000"
            step="5000"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="w-full accent-[#1853CF] cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs font-bold mb-1.5">
            <span className="text-slate-600">Expected Monthly Leads / Inquiries</span>
            <span className="text-[#1853CF] font-black">{inquiries} Leads</span>
          </div>
          <input
            type="range"
            min="10"
            max="200"
            step="5"
            value={inquiries}
            onChange={(e) => setInquiries(Number(e.target.value))}
            className="w-full accent-[#1853CF] cursor-pointer"
          />
        </div>
      </div>

      {/* Dynamic Results Display */}
      <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-blue-50/80 border border-blue-100 mb-5">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Projected Value</div>
          <div className="text-xl sm:text-2xl font-black text-[#1853CF]">
            ₹{estimatedRevenue.toLocaleString()}
          </div>
        </div>
        <div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Est. Payback Time</div>
          <div className="text-xl sm:text-2xl font-black text-emerald-600">
            ~{paybackDays} Days
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <div className="text-[11px] font-bold text-slate-500">
          Estimated {roiMultiplier}x Capital Efficiency
        </div>
        <Link
          href={`/quote?budget=${budget}`}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1853CF] hover:bg-blue-700 text-white text-xs font-black uppercase rounded-xl transition-all shadow-sm"
        >
          Lock Budget <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

