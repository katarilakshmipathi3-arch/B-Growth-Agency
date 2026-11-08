import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { 
  ArrowRight, 
  Check, 
  Sparkles, 
  ChevronRight,
  PackageCheck
} from 'lucide-react';
import ServiceRequestForm from '@/components/services/ServiceRequestForm';

export const revalidate = 0;

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const service = await prisma.service.findUnique({
    where: { slug: params.slug },
  });

  if (!service) return { title: 'Service Not Found' };

  return {
    title: service.seoTitle || `${service.title} | B Growth Agency`,
    description: service.seoDescription || service.shortDescription,
  };
}

export default async function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = await prisma.service.findUnique({
    where: { slug: params.slug },
  });

  if (!service) {
    notFound();
  }

  const relatedProjects = await prisma.portfolioItem.findMany({
    where: { category: service.category, status: 'published' },
    take: 3,
  });

  const faqs = await prisma.fAQ.findMany({
    take: 4,
  });

  const features: string[] = service.features ? JSON.parse(service.features) : [];
  const deliverables: string[] = service.deliverables ? JSON.parse(service.deliverables) : [];
  const pricingTiers = service.pricingTiers ? JSON.parse(service.pricingTiers) : [];

  return (
    <div className="min-h-screen bg-[#EAECE8]">
      
      {/* ================================================================
          HERO BANNER — Royal Blue
          ================================================================ */}
      <section className="hero-blue py-24 md:py-32">
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-200/80 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/services" className="hover:text-white">Services</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">{service.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 text-white text-xs font-bold uppercase tracking-wider">
                <span>{service.category}</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight uppercase">
                {service.title}
              </h1>
              <p className="text-base sm:text-lg text-blue-100 leading-relaxed">
                {service.shortDescription}
              </p>
              
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href="#pricing"
                  className="btn-primary shadow-lg shadow-black/20"
                >
                  <span>View Packages & Pricing</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#request-form"
                  className="btn-outline-white"
                >
                  Request Custom Quote
                </a>
              </div>

              <div className="pt-4 flex items-center gap-6 text-xs text-blue-100">
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-blue-200" />
                  <span>Dedicated Project Manager</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-blue-200" />
                  <span>Structured Revision Rounds</span>
                </div>
              </div>
            </div>

            <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-slate-900">
              <Image
                src={service.coverImage}
                alt={service.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

        </div>
      </section>

      {/* ================================================================
          DETAILED OVERVIEW & DELIVERABLES
          ================================================================ */}
      <section className="py-20 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-2xl border border-[#E0E2DA] space-y-4">
              <h2 className="text-2xl font-black uppercase text-[#0B1420]">
                Detailed Overview
              </h2>
              <p className="text-[#3A4152] text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {service.fullDescription}
              </p>
            </div>

            {/* What is Included (Features) */}
            <div className="bg-white p-8 rounded-2xl border border-[#E0E2DA] space-y-6">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-[#EBF1FF] text-[#1F5FE6]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-black uppercase text-[#0B1420]">
                  What&apos;s Included In Every Engagement
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((feature: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F4F5F0] border border-[#E0E2DA]">
                    <Check className="w-4 h-4 text-[#1F5FE6] flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-semibold text-[#0B1420]">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Deliverables */}
            {deliverables.length > 0 && (
              <div className="bg-white p-8 rounded-2xl border border-[#E0E2DA] space-y-6">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-emerald-100 text-emerald-600">
                    <PackageCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-black uppercase text-[#0B1420]">
                    Guaranteed Project Deliverables
                  </h3>
                </div>

                <div className="space-y-3">
                  {deliverables.map((del: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-3 text-sm text-[#0B1420] font-medium">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pricing Tiers Table */}
            {pricingTiers.length > 0 && (
              <div id="pricing" className="space-y-6 pt-6">
                <h3 className="text-2xl font-black uppercase text-[#0B1420]">
                  Service Packages & Pricing
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {pricingTiers.map((tier: any, idx: number) => (
                    <div
                      key={idx}
                      className={`bg-white rounded-2xl p-6 border flex flex-col justify-between ${
                        tier.isPopular ? 'border-[#1F5FE6] ring-2 ring-[#1F5FE6]/20' : 'border-[#E0E2DA]'
                      }`}
                    >
                      <div>
                        {tier.isPopular && (
                          <div className="text-[10px] font-black uppercase text-[#1F5FE6] bg-[#EBF1FF] px-2.5 py-1 rounded w-fit mb-3">
                            Most Popular
                          </div>
                        )}
                        <h4 className="font-black text-lg text-[#0B1420] uppercase">{tier.name}</h4>
                        <div className="text-3xl font-black text-[#1F5FE6] mt-2 mb-4">
                          ₹{Number(tier.price).toLocaleString()}
                        </div>
                        <ul className="space-y-2 text-xs text-[#3A4152] mb-6">
                          {(tier.features || []).map((f: string, i: number) => (
                            <li key={i} className="flex items-start gap-2">
                              <Check className="w-3.5 h-3.5 text-[#1F5FE6] flex-shrink-0 mt-0.5" />
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Link
                        href={`/quote?service=${encodeURIComponent(service.title)}&plan=${encodeURIComponent(tier.name)}`}
                        className={`w-full text-center py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider ${
                          tier.isPopular
                            ? 'bg-[#1F5FE6] text-white hover:bg-[#1749C0]'
                            : 'bg-[#F4F5F0] text-[#0B1420] hover:bg-[#E0E2DA]'
                        }`}
                      >
                        Choose Plan
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Form */}
          <div className="space-y-8" id="request-form">
            <div className="bg-white p-7 rounded-2xl border border-[#E0E2DA]">
              <h3 className="text-xl font-black uppercase text-[#0B1420] mb-2">
                Request This Service
              </h3>
              <p className="text-xs text-[#6B7384] mb-6">
                Receive an itemized quote and implementation timeline within 24 hours.
              </p>
              <ServiceRequestForm serviceName={service.title} />
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
