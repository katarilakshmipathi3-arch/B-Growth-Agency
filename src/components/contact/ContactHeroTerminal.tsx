'use client';

import React, { useState } from 'react';
import { MessageSquare, ArrowRight, Zap, ShieldCheck } from 'lucide-react';

export default function ContactHeroTerminal() {
  const [service, setService] = useState('Web Development');
  const [timeline, setTimeline] = useState('Within 14 Days');

  const getWhatsAppUrl = () => {
    const text = encodeURIComponent(
      `Hi Adharsh, I am interested in partnering with B Growth Agency.\nService: ${service}\nTimeline: ${timeline}`
    );
    return `https://wa.me/919392241180?text=${text}`;
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.35)] border border-white/80 transition-transform duration-300 hover:-translate-y-1 text-[#0B1420]">
      <div className="flex items-center justify-between gap-3 mb-5">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Adharsh Katari Active on Desk
        </span>
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
          &lt;15 Min Response
        </span>
      </div>

      <div className="space-y-4 mb-5">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            1. Select Primary Service Discipline
          </label>
          <div className="grid grid-cols-2 gap-2">
            {['Web Development', 'Cinema 4K Film', 'Poster & Design', 'Full Growth Pod'].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setService(s)}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all text-left ${
                  service === s
                    ? 'bg-[#1853CF] text-white shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/80'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            2. Target Launch Timeline
          </label>
          <div className="grid grid-cols-3 gap-2">
            {['Urgent (<14d)', 'This Month', 'Flexible'].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTimeline(t)}
                className={`py-2 px-2.5 rounded-xl text-[11px] font-bold transition-all text-center ${
                  timeline === t
                    ? 'bg-[#1853CF] text-white shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/80'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-3.5 rounded-2xl bg-blue-50/80 border border-blue-100 mb-5 flex items-center justify-between">
        <div className="text-xs text-slate-600 font-medium">
          Route directly to Founder's phone via encrypted WhatsApp
        </div>
        <Zap className="w-4 h-4 text-[#1853CF] flex-shrink-0" />
      </div>

      <div className="pt-2">
        <a
          href={getWhatsAppUrl()}
          target="_blank"
          rel="noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Launch WhatsApp Direct Line</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1" />
        </a>
      </div>
    </div>
  );
}

