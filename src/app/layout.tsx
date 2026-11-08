import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/common/WhatsAppButton';
import CookieBanner from '@/components/common/CookieBanner';
import BackToTop from '@/components/common/BackToTop';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: {
    default: 'B Growth Agency | We Build Brands That Grow',
    template: '%s | B Growth Agency',
  },
  description: 'Premier digital growth agency delivering custom Next.js websites, high-converting poster & graphic designs, and cinematic video editing.',
  keywords: ['Website Development', 'Poster Design', 'Graphic Design', 'Video Editing', 'Reels Editing', 'Branding', 'SEO Agency', 'B Growth'],
  authors: [{ name: 'B Growth Agency Team' }],
  creator: 'B Growth Agency',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'http://localhost:3000',
    title: 'B Growth Agency | We Build Brands That Grow',
    description: 'Transforming businesses with high-performance websites, scroll-stopping posters, and retention-focused video editing.',
    siteName: 'B Growth Agency',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'B Growth Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'B Growth Agency | We Build Brands That Grow',
    description: 'Premier digital agency for website development, graphic design and video editing.',
    images: ['/logo.png'],
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakartaSans.variable}`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-[#EAECE8] text-[#0B1420] antialiased selection:bg-[#1F5FE6] selection:text-white" suppressHydrationWarning>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <CookieBanner />
        <BackToTop />
      </body>
    </html>
  );
}
