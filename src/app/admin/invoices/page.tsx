'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Receipt, Plus, Search, ExternalLink, Copy, Check, 
  Trash2, Printer, CheckCircle2, Clock, IndianRupee, FileText
} from 'lucide-react';

interface InvoiceItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  clientCompany: string;
  clientAddress?: string;
  date: string;
  dueDate: string;
  items: string;
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  discount: number;
  total: number;
  status: string;
  createdAt: string;
}

export default function AdminInvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // New Invoice Form
  const [invoiceNumber, setInvoiceNumber] = useState(`INV-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientCompany, setClientCompany] = useState('');
  const [clientAddress, setClientAddress] = useState('HITEC City, Hyderabad');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState(new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0]);
  
  const [items, setItems] = useState<InvoiceItem[]>([
    { description: 'Next.js 14 Custom Web Application Architecture', quantity: 1, rate: 35000, amount: 35000 },
  ]);
  const [taxRate, setTaxRate] = useState(18);
  const [discount, setDiscount] = useState(0);

  const calculateSubtotal = () => items.reduce((acc, it) => acc + (it.quantity * it.rate), 0);
  const subtotal = calculateSubtotal();
  const taxAmount = (subtotal - discount) * (taxRate / 100);
  const total = (subtotal - discount) + taxAmount;

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/invoices');
      if (res.ok) {
        const data = await res.json();
        setInvoices(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleAddItem = () => {
    setItems([...items, { description: '', quantity: 1, rate: 0, amount: 0 }]);
  };

  const handleItemChange = (index: number, field: keyof InvoiceItem, value: any) => {
    const updated = [...items];
    (updated[index] as any)[field] = value;
    if (field === 'quantity' || field === 'rate') {
      updated[index].amount = updated[index].quantity * updated[index].rate;
    }
    setItems(updated);
  };

  const handleRemoveItem = (index: number) => {
    if (items.length <= 1) return;
    setItems(items.filter((_, i) => i !== index));
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientCompany || items.length === 0) return;

    try {
      const res = await fetch('/api/admin/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          invoiceNumber,
          clientName,
          clientEmail,
          clientCompany,
          clientAddress,
          date,
          dueDate,
          items: JSON.stringify(items),
          subtotal,
          taxRate,
          taxAmount,
          discount,
          total,
          status: 'PENDING',
        }),
      });

      if (res.ok) {
        setModalOpen(false);
        setInvoiceNumber(`INV-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`);
        setClientName('');
        setClientEmail('');
        setClientCompany('');
        fetchInvoices();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusToggle = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'PAID' ? 'PENDING' : 'PAID';
    try {
      const res = await fetch(`/api/admin/invoices/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      });
      if (res.ok) {
        setInvoices((prev) =>
          prev.map((inv) => (inv.id === id ? { ...inv, status: nextStatus } : inv))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this invoice?')) return;
    try {
      const res = await fetch(`/api/admin/invoices/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setInvoices((prev) => prev.filter((inv) => inv.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const copyLink = (id: string) => {
    const url = `${window.location.origin}/invoice/${id}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const filtered = invoices.filter(
    (inv) =>
      inv.clientName?.toLowerCase().includes(search.toLowerCase()) ||
      inv.clientCompany?.toLowerCase().includes(search.toLowerCase()) ||
      inv.invoiceNumber?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#1853CF] mb-1">
            <Receipt className="w-4 h-4" /> Agency Financial Suite
          </div>
          <h1 className="text-3xl font-black uppercase text-[#0B1420] tracking-tight">
            Invoices & Billing.
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Generate printable GST invoices, share digital payment links with clients, and monitor receivables.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-3 bg-[#1853CF] hover:bg-blue-700 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span>Generate Invoice</span>
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-blue-100/80 shadow-xs flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400 ml-2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by invoice #, client name, or company..."
          className="w-full text-xs sm:text-sm font-semibold text-[#0B1420] bg-transparent focus:outline-none"
        />
      </div>

      {/* Invoices List */}
      {loading ? (
        <div className="text-center py-20 text-slate-400 font-bold text-sm">
          Loading agency invoices...
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-3xl border border-blue-100 p-12 text-center space-y-4">
          <Receipt className="w-12 h-12 text-[#1853CF] mx-auto opacity-40" />
          <h3 className="text-lg font-black uppercase text-[#0B1420]">No Invoices Generated Yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Create itemized GST invoices with digital payment links and automatic tax calculations.
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1853CF] text-white text-xs font-black uppercase rounded-xl"
          >
            Create First Invoice
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-blue-100/90 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8FAFF] text-slate-500 uppercase tracking-wider font-bold border-b border-blue-100">
                <tr>
                  <th className="py-4 px-6">Invoice #</th>
                  <th className="py-4 px-6">Client & Company</th>
                  <th className="py-4 px-6">Issue / Due Date</th>
                  <th className="py-4 px-6">Total Amount</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((inv) => (
                  <tr key={inv.id} className="hover:bg-blue-50/40 transition-colors">
                    <td className="py-4 px-6 font-mono font-bold text-[#1853CF]">
                      {inv.invoiceNumber}
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-bold text-[#0B1420]">{inv.clientName}</div>
                      <div className="text-[10px] text-slate-400 font-semibold">{inv.clientCompany}</div>
                    </td>
                    <td className="py-4 px-6 text-slate-600">
                      <div>{inv.date}</div>
                      <div className="text-[10px] text-slate-400">Due: {inv.dueDate}</div>
                    </td>
                    <td className="py-4 px-6 font-black text-[#0B1420] text-sm">
                      ₹{Math.round(inv.total).toLocaleString()}
                    </td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => handleStatusToggle(inv.id, inv.status)}
                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider transition-all ${
                          inv.status === 'PAID'
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                        }`}
                        title="Click to toggle Paid/Pending"
                      >
                        {inv.status}
                      </button>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => copyLink(inv.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-[#1853CF] hover:bg-blue-50 transition-colors"
                          title="Copy Digital Link"
                        >
                          {copiedId === inv.id ? (
                            <Check className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                        <Link
                          href={`/invoice/${inv.id}`}
                          target="_blank"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-[#1853CF] hover:bg-blue-50 transition-colors"
                          title="View / Print PDF"
                        >
                          <Printer className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(inv.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete Invoice"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create Invoice Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl border border-blue-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black uppercase text-[#0B1420]">Generate Tax Invoice</h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Invoice #</label>
                  <input
                    type="text"
                    required
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl border border-blue-100 bg-[#F8FAFF] text-xs font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Company / Brand *</label>
                  <input
                    type="text"
                    required
                    value={clientCompany}
                    onChange={(e) => setClientCompany(e.target.value)}
                    placeholder="e.g. Apex Wealth"
                    className="w-full px-4 py-2 rounded-xl border border-blue-100 bg-[#F8FAFF] text-xs font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Client Full Name *</label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-4 py-2 rounded-xl border border-blue-100 bg-[#F8FAFF] text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Client Email</label>
                  <input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="billing@apexwealth.com"
                    className="w-full px-4 py-2 rounded-xl border border-blue-100 bg-[#F8FAFF] text-xs font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Invoice Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl border border-blue-100 bg-[#F8FAFF] text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Due Date</label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl border border-blue-100 bg-[#F8FAFF] text-xs font-semibold"
                  />
                </div>
              </div>

              {/* Line Items Section */}
              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black uppercase text-slate-700">Deliverables / Line Items</span>
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="text-xs font-bold text-[#1853CF] hover:underline inline-flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Add Item
                  </button>
                </div>

                {items.map((item, idx) => (
                  <div key={idx} className="grid grid-cols-12 gap-2 items-center">
                    <input
                      type="text"
                      placeholder="Service / deliverable description"
                      value={item.description}
                      onChange={(e) => handleItemChange(idx, 'description', e.target.value)}
                      className="col-span-6 px-3 py-2 rounded-xl border border-blue-100 bg-[#F8FAFF] text-xs font-semibold"
                      required
                    />
                    <input
                      type="number"
                      min="1"
                      placeholder="Qty"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(idx, 'quantity', Number(e.target.value))}
                      className="col-span-2 px-3 py-2 rounded-xl border border-blue-100 bg-[#F8FAFF] text-xs text-center font-bold"
                      required
                    />
                    <input
                      type="number"
                      min="0"
                      placeholder="Rate"
                      value={item.rate}
                      onChange={(e) => handleItemChange(idx, 'rate', Number(e.target.value))}
                      className="col-span-3 px-3 py-2 rounded-xl border border-blue-100 bg-[#F8FAFF] text-xs text-right font-bold"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(idx)}
                      className="col-span-1 text-slate-400 hover:text-rose-600 font-bold text-center"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              {/* Financial Totals */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-600">Subtotal:</span>
                  <span className="font-bold">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">GST Tax ({taxRate}%):</span>
                  <span className="font-bold">₹{Math.round(taxAmount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-200 text-sm font-black text-[#0B1420]">
                  <span>Total Payable:</span>
                  <span className="text-[#1853CF]">₹{Math.round(total).toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#1853CF] hover:bg-blue-700 text-white text-xs font-black uppercase tracking-wider transition-all shadow-md"
                >
                  Generate Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

