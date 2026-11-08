import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Home, Sparkles } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4 bg-brand-bg dark:bg-slate-950">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="text-8xl font-black text-primary/20 font-heading">
          404
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-brand-navy dark:text-white">
            Page Not Found
          </h1>
          <p className="text-sm text-brand-muted dark:text-gray-400">
            The digital growth asset or page you are searching for might have been moved or archived.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-white text-xs font-semibold rounded-xl shadow-md transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
          <Link
            href="/services"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-slate-900 border border-brand-border dark:border-slate-800 text-brand-navy dark:text-white text-xs font-semibold rounded-xl hover:border-primary transition-colors"
          >
            <span>Explore Services</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
