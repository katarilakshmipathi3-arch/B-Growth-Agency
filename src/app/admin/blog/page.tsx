import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { Plus, BookOpen, Edit3, Trash2, Eye, EyeOff } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export const revalidate = 0;

export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({ orderBy: { publishedAt: 'desc' } });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-[#0B1420]">Blog Articles</h1>
          <p className="text-sm text-[#6B7384] mt-0.5">{posts.length} articles total</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1F5FE6] hover:bg-[#1749C0] text-white text-sm font-bold rounded-lg transition-colors shadow-md shadow-blue-500/20"
        >
          <Plus className="w-4 h-4" /> New Article
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-24 bg-white border border-[#E0E2DA] rounded-xl">
          <BookOpen className="w-12 h-12 text-gray-200 mx-auto mb-4" />
          <p className="text-[#6B7384] font-semibold">No articles yet. Create your first blog post.</p>
          <Link href="/admin/blog/new" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#1F5FE6] hover:underline">
            <Plus className="w-4 h-4" /> Create Article
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-[#E0E2DA] rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F4F5F0] border-b border-[#E0E2DA] text-[#6B7384] text-xs font-bold uppercase tracking-wider">
                <th className="text-left px-5 py-3.5">Title</th>
                <th className="text-left px-5 py-3.5 hidden md:table-cell">Category</th>
                <th className="text-left px-5 py-3.5 hidden lg:table-cell">Author</th>
                <th className="text-left px-5 py-3.5 hidden md:table-cell">Published</th>
                <th className="text-left px-5 py-3.5">Status</th>
                <th className="text-right px-5 py-3.5">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F1EC]">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-[#FAFBFF] transition-colors">
                  <td className="px-5 py-4">
                    <div className="font-bold text-[#0B1420] line-clamp-1">{post.title}</div>
                    <div className="text-xs text-[#6B7384] mt-0.5">{post.readTime}</div>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className="px-2.5 py-1 bg-[#EBF1FF] text-[#1F5FE6] text-xs font-bold rounded">{post.category}</span>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell text-[#6B7384] text-xs">{post.authorName}</td>
                  <td className="px-5 py-4 hidden md:table-cell text-[#6B7384] text-xs">{formatDate(post.publishedAt)}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-bold ${
                      post.status === 'published'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {post.status === 'published' ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      {post.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="p-2 text-[#6B7384] hover:text-[#0B1420] hover:bg-[#F4F5F0] rounded-lg transition-colors"
                        title="View post"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/admin/blog/${post.id}`}
                        className="p-2 text-[#6B7384] hover:text-[#1F5FE6] hover:bg-[#EBF1FF] rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit3 className="w-4 h-4" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
