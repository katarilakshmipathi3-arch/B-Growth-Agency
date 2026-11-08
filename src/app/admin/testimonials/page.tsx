import React from 'react';
import prisma from '@/lib/prisma';
import AdminTestimonialsClient from '@/components/admin/AdminTestimonialsClient';

export const revalidate = 0;

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { order: 'asc' },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-brand-navy dark:text-white">
          Client Reviews & Testimonials
        </h1>
        <p className="text-xs text-brand-muted dark:text-gray-400 mt-1">
          Add, edit, and feature verified reviews from founders and clients.
        </p>
      </div>

      <AdminTestimonialsClient initialItems={testimonials} />
    </div>
  );
}
