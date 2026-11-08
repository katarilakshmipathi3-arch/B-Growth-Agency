'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Printer, 
  Copy, 
  Check, 
  ArrowLeft, 
  ShieldCheck, 
  Building2, 
  FileText,
  CreditCard,
  QrCode
} from 'lucide-react';

export default function DigitalInvoicePage() {
  const params = useParams();
  const id = params?.id as string;

  const [invoice, setInvoice] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadInvoice() {
      try {
        const res = await fetch(`/api/invoice/${id}`);
        if (!res.ok) {
          throw new Error('Invoice not found or invalid link');
        }
        const data = await res.json();
        setInvoice(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    if (id) loadInvoice();
  }, [id]);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFF] flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#1F5FE6] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm font-bold text-slate-600">Loading Official Invoice...</p>
        </div>
      </div>
    );
  }

  if (error || !invoice) {
    return (
      <div className="min-h-screen bg-[#F8FAFF] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-3xl border border-rose-100 shadow-xl p-8 text-center">
          <h2 className="text-xl font-bold text-slate-900 mb-2">Invoice Not Found</h2>
          <p className="text-xs text-slate-500 mb-6">{error || 'Unable to locate this invoice.'}</p>
          <Link href="/" className="btn-primary text-xs py-2 px-5 inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  let items: any[] = [];
  try {
    items = typeof invoice.items === 'string' ? JSON.parse(invoice.items) : invoice.items;
  } catch {}

  const isPaid = invoice.status === 'PAID';

  return (
    <div className="min-h-screen bg-[#F0F4FA] py-8 sm:py-12 px-4 sm:px-6">
      <style jsx global>{`
        @media print {
          body { background: white !important; -webkit-print-color-adjust: exact; }
          .no-print { display: none !important; }
          .print-shadow-none { box-shadow: none !important; border: 1px solid #e2e8f0 !important; }
        }
      `}</style>

      {/* Floating Action Bar */}
      <div className="max-w-4xl mx-auto mb-6 flex flex-wrap items-center justify-between gap-4 no-print">
        <div className="flex items-center gap-3">
          {invoice.portal?.token ? (
            <Link 
              href={`/portal/${invoice.portal.token}`}
              className="px-4 py-2 bg-white text-slate-700 text-xs font-bold rounded-xl border border-slate-200 hover:bg-slate-50 transition shadow-xs flex items-center gap-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Project Portal
            </Link>
          ) : (
            <Link 
              href="/"
              className="px-4 py-2 bg-white text-slate-700 text-xs font-bold rounded-xl border border-slate-200 hover:bg-slate-50 transition shadow-xs flex items-center gap-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Agency Home
            </Link>
          )}
          <span className="text-xs font-semibold text-slate-500">
            Invoice: <span className="font-mono text-slate-800 font-bold">{invoice.invoiceNumber}</span>
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleCopyLink}
            className="px-4 py-2 bg-white text-slate-700 text-xs font-bold rounded-xl border border-slate-200 hover:bg-slate-50 transition shadow-xs flex items-center gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Link Copied!' : 'Share Digital Link'}
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-[#1F5FE6] text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition shadow-md shadow-blue-500/20 flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" /> Print / Save PDF
          </button>
        </div>
      </div>

      {/* Official Invoice Sheet */}
      <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden print-shadow-none">
        
        {/* Top Header Banner */}
        <div className="bg-[#1F5FE6] text-white p-8 sm:p-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <img src="/nav-logo.png" alt="B Growth Agency" className="h-10 w-auto object-contain mb-3" />
              <p className="text-xs text-blue-100 font-medium">B Growth Agency · Growth, Web & Creative Studio</p>
              <p className="text-[11px] text-blue-200/80">Hyderabad, Telangana · contact@bgrowth.agency</p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-blue-200/80 block mb-1">OFFICIAL INVOICE</span>
              <h1 className="text-2xl sm:text-3xl font-black font-mono tracking-tight">{invoice.invoiceNumber}</h1>
              <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white shadow-sm">
                {isPaid ? (
                  <span className="text-emerald-700 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 stroke-[3]" /> PAID IN FULL
                  </span>
                ) : (
                  <span className="text-[#1F5FE6] flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> PAYMENT PENDING
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Invoice Meta Grid */}
        <div className="p-8 sm:p-12 border-b border-slate-100 bg-slate-50/50">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400 block mb-1.5">BILLED TO</span>
              <h3 className="text-base font-bold text-slate-900">{invoice.clientName}</h3>
              <p className="text-xs font-semibold text-slate-700">{invoice.clientCompany}</p>
              <p className="text-xs text-slate-500 mt-1">{invoice.clientEmail}</p>
              {invoice.clientAddress && (
                <p className="text-xs text-slate-500 whitespace-pre-line mt-1">{invoice.clientAddress}</p>
              )}
            </div>

            <div>
              <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400 block mb-1.5">DATES</span>
              <div className="space-y-1.5 text-xs">
                <div>
                  <span className="text-slate-500">Invoice Date: </span>
                  <span className="font-semibold text-slate-800">{invoice.date}</span>
                </div>
                <div>
                  <span className="text-slate-500">Payment Due: </span>
                  <span className="font-semibold text-slate-800">{invoice.dueDate}</span>
                </div>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400 block mb-1.5">TOTAL PAYABLE</span>
              <div className="text-2xl sm:text-3xl font-black text-[#1F5FE6] font-mono">
                ₹{Number(invoice.total).toLocaleString('en-IN')}
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Inclusive of all applicable taxes (GST 18%)</p>
            </div>
          </div>
        </div>

        {/* Line Items Table */}
        <div className="p-8 sm:p-12">
          <h4 className="text-xs font-bold tracking-wider uppercase text-slate-400 mb-4">ITEMIZED DELIVERABLES</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-2">Description</th>
                  <th className="py-3 px-2 text-center w-20">Qty</th>
                  <th className="py-3 px-2 text-right w-32">Rate (₹)</th>
                  <th className="py-3 px-2 text-right w-36">Amount (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {items.length > 0 ? (
                  items.map((item: any, idx: number) => {
                    const q = Number(item.quantity) || 1;
                    const r = Number(item.rate) || 0;
                    const lineTotal = q * r;
                    return (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="py-3.5 px-2 font-medium text-slate-900">{item.description}</td>
                        <td className="py-3.5 px-2 text-center font-mono">{q}</td>
                        <td className="py-3.5 px-2 text-right font-mono">₹{r.toLocaleString('en-IN')}</td>
                        <td className="py-3.5 px-2 text-right font-mono font-bold text-slate-900">₹{lineTotal.toLocaleString('en-IN')}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={4} className="py-4 text-center text-slate-400">Standard Service Deliverable</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Totals Summary */}
          <div className="mt-8 border-t border-slate-200 pt-6 flex flex-col items-end">
            <div className="w-full sm:w-72 space-y-2 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal:</span>
                <span className="font-mono text-slate-800 font-semibold">₹{Number(invoice.subtotal).toLocaleString('en-IN')}</span>
              </div>
              {invoice.discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Discount:</span>
                  <span className="font-mono">-₹{Number(invoice.discount).toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-500">
                <span>GST (18%):</span>
                <span className="font-mono text-slate-800 font-semibold">₹{Number(invoice.taxAmount).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-sm sm:text-base font-black text-slate-900 border-t border-slate-200 pt-2">
                <span>Total Due:</span>
                <span className="font-mono text-[#1F5FE6]">₹{Number(invoice.total).toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Payment Instructions Box */}
          <div className="mt-10 p-6 bg-blue-50/60 rounded-2xl border border-blue-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-[#1F5FE6] flex items-center gap-1.5 mb-2">
                <CreditCard className="w-4 h-4" /> Remittance Instructions
              </h5>
              <p className="text-xs text-slate-600 leading-relaxed font-mono whitespace-pre-line">
                {invoice.paymentNotes || 'UPI: bgrowth@okhdfcbank\nBank Wire: HDFC Bank, A/C: 50200084920192, IFSC: HDFC0001234'}
              </p>
            </div>
            
            <div className="text-right flex-shrink-0">
              <div className="px-4 py-2 bg-white rounded-xl border border-blue-200 shadow-xs text-center">
                <p className="text-[10px] uppercase font-bold text-slate-400">Verified Account</p>
                <p className="text-xs font-bold text-emerald-600">B Growth Agency Private Ltd</p>
              </div>
            </div>
          </div>

          {/* Bottom signoff note */}
          <div className="mt-10 text-center text-[11px] text-slate-400 border-t border-slate-100 pt-6">
            <p>Thank you for partnering with B Growth Agency. For inquiries regarding this invoice, contact accounts@bgrowth.agency or Adharsh Katari (+91 98765 43210).</p>
          </div>

        </div>

      </div>
    </div>
  );
}
