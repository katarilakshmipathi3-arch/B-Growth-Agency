'use client';

import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Briefcase, 
  Search, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  XCircle,
  Building2,
  Filter,
  Eye,
  FileText
} from 'lucide-react';
import { JobApplication } from '@/app/api/careers/apply/route';

export default function AdminCareersPage() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('ALL');
  const [selectedApp, setSelectedApp] = useState<JobApplication | null>(null);

  const fetchApps = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/careers/apply');
      const data = await res.json();
      if (data.success && data.applications) {
        setApplications(data.applications);
        if (!selectedApp && data.applications.length > 0) {
          setSelectedApp(data.applications[0]);
        }
      }
    } catch (err) {
      console.error('Failed to fetch applications:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApps();
  }, []);

  const filtered = applications.filter((app) => {
    const matchesSearch = app.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.roleTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.city.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterType === 'ALL') return matchesSearch;
    return matchesSearch && app.applicantType === filterType;
  });

  return (
    <div className="p-4 sm:p-8 space-y-8 max-w-7xl mx-auto">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#1853CF] via-[#1A54CE] to-[#1242AF] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-blue-100 text-[10px] font-black uppercase tracking-widest border border-white/20">
            <GraduationCap className="w-3.5 h-3.5 text-blue-200" />
            Global Talent Pipeline · Careers &amp; Fellowships
          </div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
            CANDIDATE APPLICATIONS &amp; FELLOWS
          </h1>
          <p className="text-blue-100 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Review applicant portfolios, showreels, GitHub repos, and candidate notes for full-time engineering and 4 flagship global paid internship tracks.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 text-center">
            <div className="text-2xl font-black text-white">{applications.length}</div>
            <div className="text-[10px] text-blue-200 uppercase font-bold">Applications Logged</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Application List + Detailed Candidate Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Applications List */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4">
          
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-sm font-black uppercase text-[#0B1420]">Candidates Queue</h2>
            <div className="flex gap-1 text-[10px] font-bold">
              {['ALL', 'Internship', 'Full-Time'].map((t) => (
                <button
                  key={t}
                  onClick={() => setFilterType(t)}
                  className={`px-2.5 py-1 rounded-lg uppercase tracking-wider transition-colors ${
                    filterType === t
                      ? 'bg-[#1853CF] text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search candidate name, role, city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1853CF]/20 focus:border-[#1853CF]"
            />
          </div>

          {/* Candidate List */}
          <div className="space-y-2.5 max-h-[580px] overflow-y-auto pr-1">
            {loading ? (
              <div className="p-8 text-center text-xs text-slate-400">Loading candidate queue...</div>
            ) : filtered.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">No applications match your search.</div>
            ) : (
              filtered.map((app) => {
                const isSelected = selectedApp?.id === app.id;
                return (
                  <div
                    key={app.id}
                    onClick={() => setSelectedApp(app)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#1853CF] bg-blue-50/50 shadow-sm'
                        : 'border-slate-200/70 hover:border-blue-200 bg-white hover:bg-slate-50/60'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-black text-xs text-[#0B1420]">{app.fullName}</span>
                      <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                        app.applicantType === 'Internship'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-blue-100 text-[#1853CF]'
                      }`}>
                        {app.applicantType}
                      </span>
                    </div>

                    <div className="text-[11px] font-bold text-[#1853CF] line-clamp-1">{app.roleTitle}</div>
                    <div className="text-[10px] text-slate-400 mt-1 flex items-center justify-between">
                      <span>📍 {app.city}</span>
                      <span>{new Date(app.appliedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

        </div>

        {/* Right Column: Candidate Dossier */}
        <div className="lg:col-span-7">
          {selectedApp ? (
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md p-6 sm:p-8 space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono font-black text-[#1853CF] bg-blue-50 px-2 py-0.5 rounded">
                      {selectedApp.id}
                    </span>
                    <span className="text-xs text-slate-400 font-semibold">
                      Applied: {new Date(selectedApp.appliedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  <h2 className="text-2xl font-black text-[#0B1420] uppercase tracking-tight">
                    {selectedApp.fullName}
                  </h2>
                  <div className="text-xs font-bold text-[#1853CF] uppercase tracking-wider mt-0.5">
                    {selectedApp.roleTitle} · <span className="text-emerald-600 font-black">{selectedApp.applicantType}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/${selectedApp.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${selectedApp.fullName}, this is Adharsh from B Growth Agency regarding your ${selectedApp.roleTitle} application.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 text-xs font-black text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all shadow-sm flex items-center gap-1.5"
                  >
                    <span>WhatsApp Candidate</span>
                  </a>
                  <a
                    href={`mailto:${selectedApp.email}?subject=${encodeURIComponent(`B Growth Agency Application — ${selectedApp.roleTitle}`)}`}
                    className="px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email</span>
                  </a>
                </div>
              </div>

              {/* Contact & Bio Info */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Email</div>
                  <div className="text-xs font-black text-[#0B1420] truncate">{selectedApp.email}</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Phone</div>
                  <div className="text-xs font-black text-[#0B1420]">{selectedApp.phone}</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Location</div>
                  <div className="text-xs font-black text-[#0B1420]">{selectedApp.city}</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Institution / Exp</div>
                  <div className="text-xs font-black text-[#0B1420] truncate">{selectedApp.collegeOrCompany || 'N/A'}</div>
                </div>
              </div>

              {/* Portfolio & Resume Links */}
              <div className="space-y-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">Craft &amp; Proof of Work Links</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href={selectedApp.portfolioUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 hover:bg-blue-100/70 transition-all flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-xs font-black text-[#1853CF] uppercase">Portfolio / GitHub / Showreel</div>
                      <div className="text-[11px] text-slate-500 truncate max-w-xs">{selectedApp.portfolioUrl}</div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-[#1853CF] group-hover:translate-x-0.5 transition-transform" />
                  </a>

                  <a
                    href={selectedApp.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-all flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-xs font-black text-slate-800 uppercase">Resume / LinkedIn Profile</div>
                      <div className="text-[11px] text-slate-500 truncate max-w-xs">{selectedApp.resumeUrl}</div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-600 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </div>

              {/* Cover Note / Why B Growth */}
              {selectedApp.coverNote && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">Statement of Craft / Why B Growth:</div>
                  <p className="text-xs text-slate-700 leading-relaxed italic">
                    &ldquo;{selectedApp.coverNote}&rdquo;
                  </p>
                </div>
              )}

              {/* Quick Actions */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="font-bold text-slate-400">
                  Status: <strong className="text-emerald-600 uppercase">{selectedApp.status}</strong>
                </span>

                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/${selectedApp.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${selectedApp.fullName}, this is Adharsh Katari from B Growth Agency. We were impressed by your portfolio and would like to schedule a 30-min conversation for the ${selectedApp.roleTitle} role.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-[#1853CF] text-white text-xs font-black uppercase tracking-wider hover:bg-blue-700 transition-all shadow-sm flex items-center gap-1.5"
                  >
                    <span>Schedule 30-min Interview</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </div>
          ) : (
            <div className="p-16 text-center bg-white rounded-3xl border border-slate-200/80 text-slate-400 space-y-3">
              <GraduationCap className="w-10 h-10 mx-auto text-slate-300" />
              <div className="font-bold text-sm">Select an applicant from the left to view details and portfolio.</div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
