'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { MessageCircle, X, Send } from 'lucide-react';

export default function WhatsAppButton() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const phoneNumber = '919876543210';

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const encoded = encodeURIComponent(
      message || 'Hi B Growth Agency, I want to discuss a project with your team!'
    );
    window.open(`https://wa.me/${phoneNumber}?text=${encoded}`, '_blank');
    setIsOpen(false);
    setMessage('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {isOpen && (
        <div className="mb-3 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-brand-border dark:border-slate-800 overflow-hidden animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-[#25D366] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold text-white">
                B
              </div>
              <div>
                <h4 className="font-semibold text-sm">B Growth Agency</h4>
                <p className="text-xs text-green-100 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-200 animate-pulse" />
                  Typically replies within 15 mins
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 bg-brand-bg/50 dark:bg-slate-950/50 space-y-3">
            <div className="bg-white dark:bg-slate-800 p-3 rounded-xl shadow-xs text-xs text-brand-navy dark:text-gray-200 leading-relaxed border border-brand-border dark:border-slate-700">
              👋 Hey there! Looking for high-impact website development, poster design, or video editing? Let’s chat directly on WhatsApp!
            </div>

            <form onSubmit={handleSend} className="space-y-2">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your project message here..."
                rows={2}
                className="w-full text-xs p-2.5 rounded-xl border border-brand-border dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:border-[#25D366] resize-none"
              />
              <button
                type="submit"
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium text-xs py-2 rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <span>Start WhatsApp Chat</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group"
        aria-label="Chat on WhatsApp"
      >
        {isOpen ? (
          <X className="w-7 h-7" />
        ) : (
          <MessageCircle className="w-7 h-7 fill-white text-[#25D366] transition-transform group-hover:scale-110" />
        )}
      </button>
    </div>
  );
}
