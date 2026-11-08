'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShieldCheck, X } from 'lucide-react';

export default function CookieBanner() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('bgrowth_cookie_consent');
    if (!consent && !window.location.pathname.startsWith('/admin')) {
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('bgrowth_cookie_consent', 'accepted');
    setShow(false);
  };

  const declineCookies = () => {
    localStorage.setItem('bgrowth_cookie_consent', 'declined');
    setShow(false);
  };

  if (pathname?.startsWith('/admin') || !show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-50 bg-white dark:bg-slate-900 border border-brand-border dark:border-slate-800 rounded-2xl shadow-2xl p-4 sm:p-5 animate-in fade-in slide-in-from-bottom-5">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-primary-tint dark:bg-primary/20 text-primary rounded-xl flex-shrink-0 mt-0.5">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h5 className="font-semibold text-sm text-brand-navy dark:text-gray-100">
            We value your digital privacy
          </h5>
          <p className="text-xs text-brand-muted dark:text-gray-400 leading-relaxed">
            We use cookies to analyze web traffic and deliver an optimal browsing experience on B Growth Agency. Read our{' '}
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>.
          </p>
          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={acceptCookies}
              className="text-xs font-semibold px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors"
            >
              Accept All
            </button>
            <button
              onClick={declineCookies}
              className="text-xs font-medium px-3 py-2 text-brand-muted hover:text-brand-navy dark:text-gray-400 dark:hover:text-white rounded-lg transition-colors"
            >
              Essential Only
            </button>
          </div>
        </div>
        <button
          onClick={() => setShow(false)}
          className="text-brand-muted hover:text-brand-navy p-1"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
