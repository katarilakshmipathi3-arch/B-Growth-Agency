import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import { Plus, Users, Edit3, Linkedin, Twitter } from 'lucide-react';

export const revalidate = 0;

export default async function AdminTeamPage() {
  const members = await prisma.teamMember.findMany({ orderBy: { order: 'asc' } });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-[#0B1420]">Team Members</h1>
          <p className="text-sm text-[#6B7384] mt-0.5">{members.length} team members</p>
        </div>
        <Link
          href="/admin/team/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1853CF] hover:bg-[#1749C0] text-white text-sm font-bold rounded-lg transition-colors shadow-md shadow-blue-500/20"
        >
          <Plus className="w-4 h-4" /> Add Member
        </Link>
      </div>

      {members.length === 0 ? (
        <div className="text-center py-24 bg-white border border-[#E0E2DA] rounded-xl">
          <Users className="w-12 h-12 text-gray-200 mx-auto mb-4" />
          <p className="text-[#6B7384] font-semibold">No team members yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {members.map((member) => {
            let socials: Record<string, string> = {};
            try { socials = JSON.parse(member.socials); } catch {}
            return (
              <div key={member.id} className="bg-white border border-[#E0E2DA] rounded-xl overflow-hidden hover:border-[#1853CF] transition-colors group">
                <div className="relative h-40 bg-gray-100">
                  <Image src={member.avatar} alt={member.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                    <div>
                      <div className="text-xs font-black text-white">{member.name}</div>
                      <div className="text-[10px] text-blue-200">{member.role}</div>
                    </div>
                    <Link
                      href={`/admin/team/${member.id}`}
                      className="p-1.5 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-[#1853CF] transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs text-[#6B7384] leading-relaxed line-clamp-2">{member.bio}</p>
                  <div className="mt-3 flex gap-2">
                    {socials.linkedin && (
                      <a href={socials.linkedin} target="_blank" rel="noreferrer"
                        className="p-1.5 bg-[#F4F5F0] rounded text-[#6B7384] hover:text-[#1853CF]">
                        <Linkedin className="w-3 h-3" />
                      </a>
                    )}
                    {socials.twitter && (
                      <a href={socials.twitter} target="_blank" rel="noreferrer"
                        className="p-1.5 bg-[#F4F5F0] rounded text-[#6B7384] hover:text-[#1853CF]">
                        <Twitter className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

