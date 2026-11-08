import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, MessageSquare, Clock, ArrowRight, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import ContactForm from '@/components/contact/ContactForm';
import ContactHeroTerminal from '@/components/contact/ContactHeroTerminal';

export const metadata = {
  title: 'Contact Us — Start a Project | B Growth Agency',
  description: 'Get in touch with B Growth Agency in Hyderabad. Direct founder line, transparent pricing, and fast response times.',
};

const contactDetails = [
  { icon: Mail, label: 'Official Studio Email', value: 'contact@bgrowthagency.com', href: 'mailto:contact@bgrowthagency.com' },
  { icon: Phone, label: 'Direct Agency Line', value: '+91 93922 41180', href: 'tel:+919392241180' },
  { icon: MessageSquare, label: 'Instant WhatsApp Desk', value: '+91 93922 41180', href: 'https://wa.me/919392241180?text=Hi%20Adharsh,%20I%20am%20interested%20in%20partnering%20with%20B%20Growth%20Agency.' },
  { icon: MapPin, label: 'Headquarters', value: 'HITEC City, Hyderabad, TG, India', href: 'https://maps.google.com/?q=HITEC+City+Hyderabad' },
];

const hours = [
  { day: 'Monday – Friday', time: '9:00 AM – 7:00 PM IST' },
  { day: 'Saturday', time: '10:00 AM – 4:00 PM IST' },
  { day: 'Sunday', time: 'Direct WhatsApp Line Monitored' },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ================================================================
          2-COLUMN HERO — Balanced, High-Utility, Interactive Terminal
          ================================================================ */}
      <section className="hero-blue pt-20 sm:pt-24 pb-20 sm:pb-28">
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

            {/* Left Column: Heading & Value Prop */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold tracking-widest uppercase shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-blue-200" />
                <span>B GROWTH AGENCY · DIRECT FOUNDER LINE</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.02] tracking-tight uppercase text-white">
                LET'S BUILD<br />
                <span className="text-blue-200">SOMETHING</span><br />
                GREAT.
              </h1>

              <p className="text-blue-100 text-base sm:text-lg leading-relaxed max-w-xl">
                Direct communication, itemized proposals within 24 hours, and honest strategic advisory from Founder Adharsh Katari. Zero junior account managers.
              </p>

              {/* Verified Trust Badges */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-white/15 text-white border border-white/15">
                  <Zap className="w-3.5 h-3.5 text-amber-300" /> &lt;15 Min WhatsApp Response
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-white/15 text-white border border-white/15">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" /> Guaranteed NDA & Confidentiality
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-white/15 text-white border border-white/15">
                  <Clock className="w-3.5 h-3.5 text-blue-200" /> 24-Hr Itemized Proposal
                </span>
              </div>
            </div>

            {/* Right Column: Interactive VIP Sprint Intake & WhatsApp Routing Terminal */}
            <div className="lg:col-span-5">
              <ContactHeroTerminal />
            </div>

          </div>
        </div>
      </section>

      {/* ================================================================
          CONTACT CHANNELS & FORM GRID — Crisp Pure White Section
          ================================================================ */}
      <section className="bg-white pt-16 sm:pt-20 pb-8 sm:pb-10 border-b border-blue-100/70">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">

            {/* Left: Contact Channels */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <div className="text-xs font-black tracking-[0.2em] uppercase text-[#1853CF] mb-2">
                  DIRECT CHANNELS
                </div>
                <h2 className="text-3xl font-black uppercase text-[#0B1420] tracking-tight">
                  REACH OUT DIRECTLY.
                </h2>
              </div>

              <div className="space-y-3.5">
                {contactDetails.map((item, i) => (
                  <a
                    key={i}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    className="flex items-center gap-4 p-4 rounded-2xl bg-[#F8FAFF] border border-blue-100/90 hover:border-[#1853CF] hover:bg-white hover:shadow-lg transition-all group"
                  >
                    <div className="w-11 h-11 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#1853CF] transition-colors">
                      <item.icon className="w-5 h-5 text-[#1853CF] group-hover:text-white transition-colors" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{item.label}</div>
                      <div className="text-xs sm:text-sm font-black text-[#0B1420] truncate">{item.value}</div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Working Hours */}
              <div className="bg-[#F8FAFF] border border-blue-100/90 rounded-2xl p-6 space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-[#1853CF]" />
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#0B1420]">Studio Working Hours</span>
                </div>
                <div className="space-y-2">
                  {hours.map((h, i) => (
                    <div key={i} className="flex justify-between text-xs">
                      <span className="font-semibold text-slate-600">{h.day}</span>
                      <span className="text-slate-800 font-bold">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Detailed Message Form */}
            <div className="lg:col-span-3">
              <div className="bg-[#F8FAFF] border border-blue-100/90 rounded-3xl p-8 sm:p-10 shadow-xs">
                <div className="mb-6">
                  <span className="text-xs font-black tracking-[0.2em] uppercase text-[#1853CF] block mb-1">
                    PROJECT INQUIRY FORM
                  </span>
                  <h3 className="text-2xl font-black text-[#0B1420] uppercase">Send a Detailed Message</h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">Our team will review your requirements and respond within 24 hours.</p>
                </div>
                <ContactForm />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================================================================
          HQ LOCATION & INTERACTIVE GOOGLE MAP — Clean Light Section
          ================================================================ */}
      <section className="bg-[#F8FAFF] pt-8 sm:pt-10 pb-16 sm:pb-20 border-b border-blue-100/70">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 space-y-6">
          <div className="rounded-3xl bg-white border border-blue-100/90 p-6 sm:p-8 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0 text-[#1853CF]">
                <MapPin className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#1853CF]">Studio Location</span>
                <h3 className="text-xl sm:text-2xl font-black uppercase text-[#0B1420]">HITEC City, Hyderabad</h3>
                <p className="text-xs sm:text-sm text-slate-500">Telangana, India — 500081 (Available for in-person strategic briefings)</p>
              </div>
            </div>

            <a
              href="https://maps.google.com/?q=HITEC+City+Hyderabad"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1853CF] text-white hover:bg-blue-700 text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-sm"
            >
              <span>Get Driving Directions</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Embedded Google Map */}
          <div className="rounded-3xl overflow-hidden border-2 border-blue-100/90 shadow-xl h-80 sm:h-96 relative bg-slate-100">
            <iframe
              title="B Growth Agency Studio Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.3079978648116!2d78.37877807516625!3d17.445209383452298!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93dc8c5d69df%3A0x19688beb557fa0ee!2sHITEC%20City%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

    </div>
  );
}

