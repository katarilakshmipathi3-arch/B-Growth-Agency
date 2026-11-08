'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Send, ArrowRight, Linkedin, Twitter, Instagram, Youtube, ShieldCheck, Mail, MapPin } from 'lucide-react';

const footerLinks = {
  Services: [
    { label: 'Web Development', href: '/services' },
    { label: 'Graphic Design', href: '/services' },
    { label: 'Video Editing', href: '/services' },
    { label: 'Advertising & Ad Films', href: '/services' },
    { label: 'Brand Strategy', href: '/services' },
  ],
  Studio: [
    { label: 'About Agency', href: '/about' },
    { label: 'Showcase Gallery', href: '/gallery' },
    { label: 'Portfolio Works', href: '/portfolio' },
    { label: 'Pricing Plans', href: '/pricing' },
    { label: 'Careers & Internships', href: '/careers' },
    { label: 'Team & Founder', href: '/team' },
    { label: 'Case Studies', href: '/blog' },
  ],
  ClientAccess: [
    { label: 'Client Tracking Portal', href: '/portal' },
    { label: 'Get a Free Quote', href: '/quote' },
    { label: 'Contact Studio', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
};

const socials = [
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
];

export default function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  // If inside Admin Portal, Client Portal, or standalone Invoice/Contract views, do NOT render public website footer
  if (
    pathname?.startsWith('/admin') ||
    pathname?.startsWith('/portal') ||
    pathname?.startsWith('/invoice') ||
    pathname?.startsWith('/contract')
  ) {
    return null;
  }

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || loading) return;
    setLoading(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) { setSubscribed(true); setEmail(''); }
    } catch {}
    setLoading(false);
  };

  return (
    <footer className="bg-[#F8FAFF] border-t border-blue-100 text-[#0B1420]">
      {/* Main Footer Container — Compact & Clean */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-12 lg:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">

          {/* Column 1 & 2: Brand & Newsletter */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center">
              <div className="bg-[#1853CF] px-3.5 py-1.5 rounded-xl shadow-xs hover:bg-blue-700 transition-colors">
                <img
                  src="/nav-logo.png"
                  alt="B Growth Agency"
                  className="h-7 w-auto object-contain"
                />
              </div>
            </Link>

            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-sm">
              Premier digital agency delivering high-converting Next.js web applications, 
              commercial graphic design, and cinematic advertising production for growing brands.
            </p>

            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#1853CF]" />
              <span>HITEC City, Hyderabad · Telangana, India</span>
            </div>

            {/* Newsletter */}
            <div className="pt-2">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
                Subscribe to Growth Insights
              </p>
              {subscribed ? (
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> You are subscribed to B Growth updates!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    required
                    className="flex-1 px-3.5 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:border-[#1853CF] focus:ring-2 focus:ring-blue-100 text-slate-900"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-[#1853CF] hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1 shadow-xs"
                  >
                    {loading ? '...' : <ArrowRight className="w-3.5 h-3.5" />}
                  </button>
                </form>
              )}
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-1">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-white hover:bg-[#1853CF] border border-slate-200 hover:border-[#1853CF] flex items-center justify-center transition-all group shadow-2xs"
                >
                  <Icon className="w-3.5 h-3.5 text-slate-600 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="space-y-3">
              <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-900">
                {title === 'ClientAccess' ? 'Client Access' : title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs text-slate-600 hover:text-[#1853CF] font-medium transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Bottom Bar — Ultra Compact */}
        <div className="mt-10 pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} B Growth Agency. All rights reserved. Founded by Adharsh Katari.</p>
          <div className="flex items-center gap-6">
            <Link href="/portal" className="text-[#1853CF] hover:underline font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Client Portal
            </Link>
            <Link href="/privacy" className="hover:text-slate-900">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-900">Terms</Link>
            <Link href="/admin" className="text-slate-400 hover:text-slate-600 text-[11px]">Admin</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

