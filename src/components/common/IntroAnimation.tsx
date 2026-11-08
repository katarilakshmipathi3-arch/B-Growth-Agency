'use client';

import React, { useEffect, useState } from 'react';

/**
 * IntroAnimation — SSR-safe, logo-first brand curtain
 *
 * HOW IT WORKS (no flash):
 *  - The overlay renders immediately in HTML (SSR), covering everything before paint.
 *  - An inline <script> in layout.tsx already set data-intro-done="1" on <html>
 *    if the user has seen the intro, so CSS hides it via [data-intro-done] #bg-intro-overlay.
 *  - For first-time visitors: overlay stays visible, then animates away.
 *
 * Timeline (first-time):
 *   0ms   — overlay covers full screen (already in SSR HTML)
 *   200ms — logo fades + scales in
 *   700ms — tagline fades in
 *   900ms — scan line sweeps across
 *   3400ms — top panel slides UP, bottom panel slides DOWN
 *   4100ms — unmount, set sessionStorage
 */

export default function IntroAnimation() {
  // Start as "showing" — overlay is visible from SSR. useEffect will hide if already seen.
  const [visible, setVisible] = useState(true);
  const [logoIn, setLogoIn] = useState(false);
  const [tagIn, setTagIn] = useState(false);
  const [scanIn, setScanIn] = useState(false);
  const [split, setSplit] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    // If already seen, hide immediately (the CSS already hid it, this just cleans up)
    if (typeof window !== 'undefined' && sessionStorage.getItem('bg_intro_v4')) {
      setGone(true);
      return;
    }

    // First-time visitor — run the animation sequence
    const t0 = setTimeout(() => setLogoIn(true), 200);
    const t1 = setTimeout(() => setTagIn(true), 700);
    const t2 = setTimeout(() => setScanIn(true), 900);   // scan line AFTER logo is in
    const t3 = setTimeout(() => setSplit(true), 3400);    // split panels away
    const t4 = setTimeout(() => {
      setGone(true);
      sessionStorage.setItem('bg_intro_v4', '1');
    }, 4150);

    return () => { [t0, t1, t2, t3, t4].forEach(clearTimeout); };
  }, []);

  if (gone) return null;

  return (
    <div
      id="bg-intro-overlay"
      aria-hidden="true"
      className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden select-none"
    >
      {/* ── TOP PANEL ── slides UP on split */}
      <div
        className="absolute inset-x-0 top-0 h-1/2 bg-[#1853CF]"
        style={{
          transform: split ? 'translateY(-100%)' : 'translateY(0)',
          transition: split ? 'transform 0.82s cubic-bezier(0.76,0,0.24,1)' : 'none',
        }}
      >
        {/* Subtle grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.06) 1px,transparent 1px)',
            backgroundSize: '44px 44px',
          }}
        />
        {/* Radial glow behind centre */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 100% 200% at 50% 100%, rgba(255,255,255,0.07) 0%, transparent 65%)',
          }}
        />
        {/* Corner labels */}
        <span className="absolute top-6 left-7 text-white/20 text-[9px] font-bold tracking-[0.3em] uppercase hidden sm:block">
          B GROWTH AGENCY
        </span>
        <span className="absolute top-6 right-7 text-white/20 text-[9px] font-bold tracking-[0.3em] uppercase hidden sm:block">
          HYDERABAD · IN
        </span>
      </div>

      {/* ── BOTTOM PANEL ── slides DOWN on split */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-[#1853CF]"
        style={{
          transform: split ? 'translateY(100%)' : 'translateY(0)',
          transition: split ? 'transform 0.82s cubic-bezier(0.76,0,0.24,1)' : 'none',
        }}
      >
        {/* Subtle grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.06) 1px,transparent 1px)',
            backgroundSize: '44px 44px',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 100% 200% at 50% 0%, rgba(255,255,255,0.07) 0%, transparent 65%)',
          }}
        />
        {/* Corner labels */}
        <span className="absolute bottom-6 left-7 text-white/20 text-[9px] font-bold tracking-[0.3em] uppercase hidden sm:block">
          EST. 2021
        </span>
        <span className="absolute bottom-6 right-7 text-white/20 text-[9px] font-bold tracking-[0.3em] uppercase hidden sm:block">
          CREATIVE ENGINEERING
        </span>
      </div>

      {/* ── HORIZONTAL SCAN LINE — only appears AFTER logo is visible ── */}
      {scanIn && (
        <div
          className="absolute inset-x-0 z-10"
          style={{
            top: '50%',
            transform: 'translateY(-50%)',
            opacity: split ? 0 : 1,
            transition: 'opacity 0.2s ease',
          }}
        >
          <div
            className="h-px bg-white/30"
            style={{
              width: scanIn ? '100%' : '0%',
              transition: 'width 0.55s cubic-bezier(0.4,0,0.2,1)',
            }}
          />
        </div>
      )}

      {/* ── CENTRE CONTENT ── fades out when split starts */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center z-20"
        style={{
          opacity: split ? 0 : 1,
          transition: split ? 'opacity 0.25s ease' : 'none',
        }}
      >
        {/* Top rule — grows when logo appears */}
        <div
          className="h-px bg-white/30 rounded-full mb-9"
          style={{
            width: logoIn ? '72px' : '0px',
            transition: 'width 0.5s ease 0.15s',
          }}
        />

        {/* ── ACTUAL LOGO (nav-logo.png — white horizontal lockup) ── */}
        <div
          style={{
            opacity: logoIn ? 1 : 0,
            transform: logoIn ? 'scale(1) translateY(0)' : 'scale(0.88) translateY(14px)',
            transition: 'opacity 0.55s ease, transform 0.65s cubic-bezier(0.34,1.4,0.64,1)',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/nav-logo.png"
            alt="B Growth Agency"
            width={220}
            height={48}
            className="w-44 sm:w-56 h-auto object-contain"
          />
        </div>

        {/* Tagline */}
        <div
          className="mt-7 text-center px-8"
          style={{
            opacity: tagIn ? 1 : 0,
            transform: tagIn ? 'translateY(0)' : 'translateY(6px)',
            transition: 'opacity 0.45s ease, transform 0.5s ease',
          }}
        >
          <p className="text-white/45 text-[9px] sm:text-[10px] font-bold tracking-[0.28em] uppercase">
            ENGINEERING YOUR MARKET DOMINANCE
          </p>
        </div>

        {/* Bottom rule */}
        <div
          className="h-px bg-white/30 rounded-full mt-9"
          style={{
            width: logoIn ? '72px' : '0px',
            transition: 'width 0.5s ease 0.2s',
          }}
        />

        {/* Progress bar — fills over 3.2s, matching the dwell time */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="w-32 h-[2px] bg-white/15 rounded-full overflow-hidden">
            <div
              className="h-full bg-white/55 rounded-full"
              style={{
                width: logoIn ? '100%' : '0%',
                transition: logoIn ? 'width 3.0s cubic-bezier(0.4,0,0.2,1) 0.1s' : 'none',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
