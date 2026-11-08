'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/portfolio' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/');

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#154BC0]/95 backdrop-blur-md shadow-lg border-b border-white/10 py-3'
          : 'bg-[#1F5FE6] border-b border-white/10 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* ── LOGO with crisp white badge for maximum visibility ── */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
            <div className="bg-white px-3.5 py-1.5 rounded-lg shadow-sm border border-white/40 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              {/* Using standard img tag to prevent Next.js hydration mismatch */}
              <img
                src="/logo.png"
                alt="B Growth Agency"
                className="h-8 w-auto object-contain"
              />
            </div>
          </Link>

          {/* ── DESKTOP NAV — PURE WHITE TEXT ── */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-200 ${
                    active
                      ? 'text-white bg-white/20 shadow-xs'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* ── RIGHT ACTIONS ── */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/admin/login"
              className="text-xs font-bold uppercase tracking-wider text-white/70 hover:text-white px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              Admin
            </Link>

            <Link
              href="/quote"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#1F5FE6] hover:bg-blue-50 text-xs font-extrabold uppercase tracking-wider rounded-lg transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              <span>Get Free Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* ── MOBILE MENU BUTTON ── */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2.5 rounded-lg text-white bg-white/10 hover:bg-white/20 transition-colors border border-white/20"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </div>

      {/* ── MOBILE DRAWER ── */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#154BC0] border-t border-white/10 px-6 py-6 space-y-3 animate-in fade-in slide-in-from-top-2">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors ${
                  active
                    ? 'text-white bg-white/20'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
            <Link
              href="/quote"
              onClick={() => setMobileOpen(false)}
              className="w-full text-center py-3 bg-white text-[#1F5FE6] text-xs font-extrabold uppercase tracking-wider rounded-lg shadow-md"
            >
              Get Free Quote →
            </Link>
            <Link
              href="/admin/login"
              onClick={() => setMobileOpen(false)}
              className="text-center text-xs font-semibold uppercase tracking-wider text-white/60 hover:text-white py-1"
            >
              Admin Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
