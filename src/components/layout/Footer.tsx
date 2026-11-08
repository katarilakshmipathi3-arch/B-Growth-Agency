'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Send, ArrowRight, Linkedin, Twitter, Instagram, Youtube } from 'lucide-react';

const footerLinks = {
  Services: [
    { label: 'Web Development', href: '/services' },
    { label: 'Graphic Design', href: '/services' },
    { label: 'Video Editing', href: '/services' },
    { label: 'Brand Identity', href: '/services' },
    { label: 'SEO & Growth', href: '/services' },
  ],
  Company: [
    { label: 'About Studio', href: '/about' },
    { label: 'Our Work', href: '/portfolio' },
    { label: 'Pricing Plans', href: '/pricing' },
    { label: 'Blog & Insights', href: '/blog' },
    { label: 'Our Clients', href: '/clients' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Admin Portal', href: '/admin/login' },
  ],
};

const socials = [
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

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
    <footer className="bg-[#0B1420] text-white">

      {/* Top CTA Strip */}
      <div className="border-b border-white/8">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-blue-400 mb-1">
                Ready to grow?
              </div>
              <h3 className="text-2xl font-black uppercase text-white">
                Start your project today.
              </h3>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/quote"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1F5FE6] hover:bg-[#1749C0] text-white text-sm font-bold rounded-lg transition-all shadow-lg shadow-blue-500/20 hover:-translate-y-0.5"
              >
                Get a Free Quote <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/8 hover:bg-white/14 text-white text-sm font-bold rounded-lg border border-white/12 transition-all"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Body */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">

          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Logo on white bg */}
            <div className="inline-flex bg-white rounded-xl px-5 py-3">
              <div className="relative h-9 w-[160px]">
                <Image
                  src="/logo.png"
                  alt="B Growth Agency"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Full-stack creative studio delivering high-performance websites, 
              commercial poster design, and cinematic video editing for ambitious brands.
            </p>

            <div className="text-xs text-gray-600 font-semibold uppercase tracking-wider">
              HITEC City, Hyderabad · India
            </div>

            {/* Socials */}
            <div className="flex items-center gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/6 hover:bg-[#1F5FE6] border border-white/8 flex items-center justify-center transition-all group"
                >
                  <Icon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="space-y-5">
              <h4 className="text-[11px] font-black uppercase tracking-widest text-[#1F5FE6]">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div className="space-y-5">
            <h4 className="text-[11px] font-black uppercase tracking-widest text-[#1F5FE6]">
              Growth Memo
            </h4>
            <p className="text-sm text-gray-400 leading-relaxed">
              Bi-weekly studio notes on web performance, design, and growth tactics. Zero spam.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs">✓</div>
                You're subscribed!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-white/6 border border-white/10 text-white text-sm px-4 py-2.5 rounded-lg focus:outline-none focus:border-[#1F5FE6] placeholder:text-gray-600 transition-colors"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#1F5FE6] hover:bg-[#1749C0] disabled:opacity-50 text-white text-sm font-bold rounded-lg transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  {loading ? 'Subscribing…' : 'Subscribe'}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/8">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-gray-600">
            © {new Date().getFullYear()} B Growth Agency. All rights reserved. Built with Next.js.
          </div>
          <div className="flex items-center gap-6 text-xs text-gray-600">
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-gray-300 transition-colors">Terms</Link>
            <span className="text-gray-700">|</span>
            <Link href="/admin/login" className="text-[#1F5FE6] hover:text-blue-300 font-bold transition-colors">Admin</Link>
          </div>
        </div>
      </div>

    </footer>
  );
}
