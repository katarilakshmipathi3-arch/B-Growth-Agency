'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight } from 'lucide-react';

const navLinks = [
  { label: 'HOME', href: '/' },
  { label: 'SERVICES', href: '/services' },
  { label: 'WORK', href: '/portfolio' },
  { label: 'GALLERY', href: '/gallery' },
  { label: 'PRICING', href: '/pricing' },
  { label: 'CAREERS', href: '/careers' },
  { label: 'ABOUT', href: '/about' },
  { label: 'TEAM', href: '/team' },
  { label: 'CONTACT', href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // If inside Admin Portal, Client Portal, or standalone Invoice/Contract views, do NOT render public website navbar
  if (
    pathname?.startsWith('/admin') ||
    pathname?.startsWith('/portal') ||
    pathname?.startsWith('/invoice') ||
    pathname?.startsWith('/contract')
  ) {
    return null;
  }

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/');

  return (
    <header className="sticky top-0 z-50 w-full bg-[#1853CF] border-b border-white/10 py-4 sm:py-5 shadow-[0_8px_32px_rgba(24,83,207,0.45),0_2px_8px_rgba(0,0,0,0.25)]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex items-center justify-between">

          {/* ── LOGO: Horizontal lockup merged directly into blue background ── */}
          <Link href="/" className="flex-shrink-0 flex items-center group mr-3 lg:mr-4 xl:mr-8">
            <img
              src="/nav-logo.png"
              alt="B Growth Agency"
              className="h-7 sm:h-8 xl:h-9 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
            />
          </Link>

          {/* ── DESKTOP NAV: Perfectly balanced links fitting any desktop width ── */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1.5">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-2.5 xl:px-3 py-1.5 text-[11px] xl:text-xs font-black tracking-wider rounded-lg transition-all duration-200 whitespace-nowrap ${
                    active
                      ? 'bg-white/25 text-white shadow-xs font-black'
                      : 'text-white/85 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* ── RIGHT ACTIONS: Neumorphic Tactile Get Free Quote Button ── */}
          <div className="hidden lg:flex items-center flex-shrink-0 ml-2 xl:ml-4">
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#1853CF] hover:text-[#1242AF] text-[11px] xl:text-xs font-black uppercase tracking-wider rounded-2xl transition-all duration-200 shadow-[3px_3px_10px_rgba(10,38,100,0.4),-2px_-2px_6px_rgba(255,255,255,0.45),inset_1px_1px_2px_rgba(255,255,255,0.9),inset_-1px_-1px_2px_rgba(24,83,207,0.15)] hover:shadow-[1px_1px_4px_rgba(10,38,100,0.5),-1px_-1px_3px_rgba(255,255,255,0.6),inset_2px_2px_4px_rgba(24,83,207,0.2)] active:scale-95 whitespace-nowrap"
            >
              <span>GET FREE QUOTE</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#1853CF]" />
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
              className="w-full text-center py-3 bg-white text-[#1853CF] text-xs font-black uppercase tracking-wider rounded-xl shadow-md"
            >
              GET FREE QUOTE →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

