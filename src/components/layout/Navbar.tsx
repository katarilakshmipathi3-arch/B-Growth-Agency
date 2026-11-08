'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight } from 'lucide-react';

const navLinks = [
  { label: 'HOME', href: '/' },
  { label: 'SERVICES', href: '/services' },
  { label: 'WORK', href: '/portfolio' },
  { label: 'PRICING', href: '/pricing' },
  { label: 'ABOUT', href: '/about' },
  { label: 'TEAM', href: '/team' },
  { label: 'BLOG', href: '/blog' },
  { label: 'CONTACT', href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // If inside the Admin Portal, do NOT render public website navbar
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/');

  return (
    <header className="sticky top-0 z-50 w-full bg-[#1F5FE6] py-4 sm:py-5 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.35)] transition-all">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex items-center justify-between">

          {/* ── LOGO: White rounded badge exactly as in reference ── */}
          <Link href="/" className="flex-shrink-0 group">
            <div className="bg-white px-4 py-2.5 rounded-xl shadow-md flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
              <img
                src="/logo.png"
                alt="B Growth Agency"
                className="h-7 sm:h-8 w-auto object-contain"
              />
            </div>
          </Link>

          {/* ── DESKTOP NAV: Centered navigation links exactly as in reference ── */}
          <nav className="hidden lg:flex items-center gap-2 xl:gap-3">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 text-xs font-black tracking-wider rounded-lg transition-all duration-200 ${
                    active
                      ? 'bg-white/20 text-white shadow-xs'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* ── RIGHT ACTIONS: Admin link + White Pill Button ── */}
          <div className="hidden lg:flex items-center gap-6">
            <Link
              href="/admin/login"
              className="text-xs font-black tracking-wider text-white hover:text-blue-200 uppercase transition-colors"
            >
              ADMIN
            </Link>

            <Link
              href="/quote"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-[#1F5FE6] hover:bg-blue-50 text-xs font-black uppercase tracking-wider rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              <span>GET FREE QUOTE</span>
              <ArrowRight className="w-4 h-4 text-[#1F5FE6]" />
            </Link>
          </div>

          {/* ── MOBILE MENU BUTTON ── */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-white bg-white/10 hover:bg-white/20 transition-colors border border-white/20"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </div>

      {/* ── MOBILE MENU DRAWER ── */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#154BC0] border-t border-white/10 px-6 py-6 mt-4 space-y-2">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-2.5 text-xs font-black tracking-wider rounded-lg uppercase ${
                  active
                    ? 'bg-white/20 text-white'
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
              className="w-full text-center py-3 bg-white text-[#1F5FE6] text-xs font-black uppercase tracking-wider rounded-xl shadow-md"
            >
              GET FREE QUOTE →
            </Link>
            <Link
              href="/admin/login"
              onClick={() => setMobileOpen(false)}
              className="text-center text-xs font-bold uppercase tracking-wider text-white/70 hover:text-white py-1"
            >
              ADMIN PORTAL
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
