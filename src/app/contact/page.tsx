import React from 'react';
import Link from 'next/link';
import { ArrowRight, Mail, Phone, MapPin, MessageCircle, Clock } from 'lucide-react';
import ContactForm from '@/components/contact/ContactForm';

export const metadata = {
  title: 'Contact Us — Get in Touch with B Growth Agency',
  description: 'Reach out for a project proposal, strategy call, or general inquiry. We respond within 24 hours.',
};

const contactDetails = [
  { icon: Mail, label: 'Email', value: 'hello@bgrowth.agency', href: 'mailto:hello@bgrowth.agency' },
  { icon: Phone, label: 'Phone', value: '+91 98765 43210', href: 'tel:+919876543210' },
  { icon: MessageCircle, label: 'WhatsApp', value: 'Chat on WhatsApp', href: 'https://wa.me/919876543210' },
  { icon: MapPin, label: 'Studio', value: 'HITEC City, Hyderabad, India', href: '#' },
];

const hours = [
  { day: 'Monday – Friday', time: '9:00 AM – 7:00 PM IST' },
  { day: 'Saturday', time: '10:00 AM – 4:00 PM IST' },
  { day: 'Sunday', time: 'Closed (email monitored)' },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#EAECE8]">

      {/* ================================================================
          HERO
          ================================================================ */}
      <section className="hero-blue py-28 md:py-36">
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-4xl">
            <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-blue-200/70 mb-6">
              B GROWTH AGENCY · LET'S CONNECT
            </div>
            <h1 className="text-[clamp(2.5rem,7vw,6rem)] font-black leading-[0.95] tracking-tight uppercase text-white mb-8">
              LET'S BUILD<br />
              <span className="text-blue-200">SOMETHING</span><br />
              GREAT.
            </h1>
            <p className="text-blue-100 text-xl leading-relaxed max-w-2xl">
              Send us a message, get a detailed proposal within 24 hours. 
              No obligation, no fluff — just honest advice about what will work for your brand.
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================
          CONTACT GRID
          ================================================================ */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

            {/* Left — Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <div className="section-label">Get in Touch</div>
                <h2 className="text-3xl font-black uppercase text-[#0B1420] leading-tight">
                  DIRECT<br />LINES.
                </h2>
              </div>

              <div className="space-y-4">
                {contactDetails.map((item, i) => (
                  <a
                    key={i}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    className="flex items-center gap-4 p-5 bg-[#F4F5F0] border border-[#E0E2DA] rounded-xl hover:border-[#1F5FE6] hover:bg-[#EBF1FF] transition-all group"
                  >
                    <div className="w-11 h-11 bg-[#1F5FE6] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-widest text-[#6B7384]">{item.label}</div>
                      <div className="text-sm font-bold text-[#0B1420]">{item.value}</div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Business Hours */}
              <div className="bg-[#F4F5F0] border border-[#E0E2DA] rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-4 h-4 text-[#1F5FE6]" />
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#6B7384]">Business Hours</span>
                </div>
                <div className="space-y-3">
                  {hours.map((h, i) => (
                    <div key={i} className="flex justify-between text-xs">
                      <span className="font-semibold text-[#3A4152]">{h.day}</span>
                      <span className="text-[#6B7384]">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Quote Link */}
              <div className="bg-[#1F5FE6] rounded-xl p-7 text-white">
                <h3 className="text-lg font-black uppercase mb-2">Need a Quote Fast?</h3>
                <p className="text-blue-100 text-sm mb-5 leading-relaxed">
                  Use our multi-step quote wizard for an instant ballpark estimate.
                </p>
                <Link href="/quote" className="inline-flex items-center gap-2 bg-white text-[#1F5FE6] font-bold text-xs uppercase tracking-wide px-5 py-2.5 rounded-lg hover:bg-blue-50 transition-colors">
                  Open Quote Wizard <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right — Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-[#F4F5F0] border border-[#E0E2DA] rounded-2xl p-8 sm:p-10">
                <div className="mb-7">
                  <h3 className="text-2xl font-black text-[#0B1420] uppercase">Send a Message</h3>
                  <p className="text-sm text-[#6B7384] mt-1">We respond to every inquiry within 24 hours.</p>
                </div>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="bg-[#EAECE8] py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="bg-[#0F1117] rounded-2xl h-64 flex items-center justify-center border border-white/5">
            <div className="text-center">
              <MapPin className="w-10 h-10 text-[#1F5FE6] mx-auto mb-3" />
              <div className="text-white font-black text-sm uppercase">HITEC City, Hyderabad</div>
              <div className="text-gray-500 text-xs mt-1">Telangana, India — 500081</div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
