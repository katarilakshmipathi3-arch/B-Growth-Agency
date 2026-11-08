'use client';

import React, { useState } from 'react';

interface Props {
  inquiryId: string;
  currentStatus: string;
}

export default function InquiryStatusSelect({ inquiryId, currentStatus }: Props) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);

  const handleChange = async (newStatus: string) => {
    setStatus(newStatus);
    setLoading(true);
    try {
      await fetch(`/api/admin/inquiries/${inquiryId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch {
      // rollback if failed
      setStatus(currentStatus);
    } finally {
      setLoading(false);
    }
  };

  const getColor = () => {
    switch (status) {
      case 'New': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300';
      case 'In Progress': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300';
      case 'Closed': return 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <select
      value={status}
      disabled={loading}
      onChange={(e) => handleChange(e.target.value)}
      className={`text-[11px] font-bold py-1 px-2.5 rounded-lg border-0 cursor-pointer focus:outline-none transition-all ${getColor()}`}
    >
      <option value="New">● New</option>
      <option value="In Progress">● In Progress</option>
      <option value="Closed">● Closed</option>
    </select>
  );
}
