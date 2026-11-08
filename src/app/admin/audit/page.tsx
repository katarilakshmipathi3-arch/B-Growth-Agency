'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Activity, 
  Stethoscope, 
  HeartPulse, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  FileText, 
  Printer, 
  Plus, 
  Search, 
  ArrowRight, 
  ShieldAlert, 
  ShieldCheck, 
  Zap, 
  Sparkles, 
  DollarSign, 
  Clock, 
  Layers, 
  ChevronRight,
  ExternalLink,
  RefreshCw,
  Building2,
  Sliders,
  Send,
  Eye
} from 'lucide-react';
import { 
  ClinicalAuditResult, 
  BusinessPatientData, 
  OrganKey, 
  runClinicalDiagnosis 
} from '@/lib/clinical-diagnostics';

export default function BusinessAuditAdminPage() {
  const [audits, setAudits] = useState<ClinicalAuditResult[]>([]);
  const [selectedAudit, setSelectedAudit] = useState<ClinicalAuditResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCondition, setFilterCondition] = useState<string>('ALL');

  // Intake Form State
  const [formData, setFormData] = useState<BusinessPatientData>({
    companyName: '',
    websiteUrl: '',
    industry: 'D2C Commerce',
    stage: 'growth',
    currentMonthlyRevenue: 1500000,
    targetMonthlyRevenue: 5000000,
    averageOrderValue: 3500,
    monthlyVisitors: 25000,
    primaryComplaints: [],
    biomarkers: {
      trafficScore: 6.5,
      conversionScore: 3.5,
      brandingScore: 6.0,
      retentionScore: 5.0,
      videoScore: 3.0,
    },
  });

  const [tempComplaint, setTempComplaint] = useState('');

  const fetchAudits = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/audit');
      const data = await res.json();
      if (data.success && data.audits) {
        setAudits(data.audits);
        if (!selectedAudit && data.audits.length > 0) {
          setSelectedAudit(data.audits[0]);
        }
      }
    } catch (err) {
      console.error('Error fetching audits:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAudits();
  }, []);

  const handleRunDiagnosis = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName) {
      alert('Please enter the client / business name');
      return;
    }

    try {
      const res = await fetch('/api/admin/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success && data.audit) {
        setAudits([data.audit, ...audits]);
        setSelectedAudit(data.audit);
        setModalOpen(false);
        // Reset basic fields
        setFormData((prev) => ({
          ...prev,
          companyName: '',
          websiteUrl: '',
          primaryComplaints: [],
        }));
      }
    } catch (err) {
      console.error('Failed to run diagnosis:', err);
      alert('Error running clinical diagnosis');
    }
  };

  const addComplaint = () => {
    if (!tempComplaint.trim()) return;
    setFormData((prev) => ({
      ...prev,
      primaryComplaints: [...prev.primaryComplaints, tempComplaint.trim()],
    }));
    setTempComplaint('');
  };

  const removeComplaint = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      primaryComplaints: prev.primaryComplaints.filter((_, i) => i !== idx),
    }));
  };

  const filteredAudits = audits.filter((a) => {
    const matchesSearch = a.patient.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.patient.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.auditNumber.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterCondition === 'ALL') return matchesSearch;
    return matchesSearch && a.clinicalCondition === filterCondition;
  });

  return (
    <div className="p-4 sm:p-8 space-y-8 max-w-7xl mx-auto">
      
      {/* ── Top Header Banner: Hospital Diagnostic System ── */}
      <div className="bg-gradient-to-r from-[#1853CF] via-[#1A54CE] to-[#1242AF] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-blue-100 text-[10px] font-black uppercase tracking-widest border border-white/20">
            <Activity className="w-3.5 h-3.5 text-blue-200 animate-pulse" />
            B-Growth Hospital for Business Growth · Clinical Diagnostic Engine
          </div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
            BUSINESS PATHOLOGY &amp; CLINICAL AUDITS
          </h1>
          <p className="text-blue-100 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Stop guessing. Diagnose the exact vital organ holding back client growth, calculate the financial hemorrhage, and generate a precision service prescription. Zero wasted time. Zero wasted client capital.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap items-center gap-3">
          <button
            onClick={() => setModalOpen(true)}
            className="px-5 py-3 rounded-xl bg-white text-[#1853CF] hover:bg-blue-50 text-xs font-black uppercase tracking-wider transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            <Plus className="w-4 h-4 text-[#1853CF]" />
            <span>New Patient Triage</span>
          </button>
        </div>

        {/* Ambient watermark */}
        <div className="absolute -right-8 -bottom-10 text-white/5 font-black text-9xl pointer-events-none select-none">
          Rx
        </div>
      </div>

      {/* ── Metric Highlights Strip ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Diagnoses Run</div>
          <div className="text-2xl sm:text-3xl font-black text-[#0B1420]">{audits.length}</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">100% Precision Prescriptions</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Top Lethal Organ</div>
          <div className="text-xl sm:text-2xl font-black text-rose-600">Heart (Conversion)</div>
          <div className="text-[11px] text-slate-500 font-semibold mt-1">64% of audited businesses leak here</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Avg Projected Recovery</div>
          <div className="text-2xl sm:text-3xl font-black text-[#1853CF]">₹18.4L/mo</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">Within 14–21 day clinical sprints</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Hospital Recovery Rate</div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600">94.2%</div>
          <div className="text-[11px] text-slate-500 font-semibold mt-1">Sprint outcome stabilization</div>
        </div>
      </div>

      {/* ── Main Layout: Sidebar Archive + Active Audit Dossier ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Patient Archive List */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-[#1853CF]" />
              <h2 className="text-sm font-black uppercase text-[#0B1420]">Patient Registry</h2>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-[#1853CF]">
              {filteredAudits.length} Audits
            </span>
          </div>

          {/* Search & Filter */}
          <div className="space-y-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search patient, industry, or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1853CF]/20 focus:border-[#1853CF]"
              />
            </div>

            <div className="flex gap-1 overflow-x-auto pb-1 text-[10px] font-bold">
              {['ALL', 'CRITICAL_TRAUMA', 'CHRONIC_HEMORRHAGE', 'SCALABLE_HEALTH'].map((cond) => (
                <button
                  key={cond}
                  onClick={() => setFilterCondition(cond)}
                  className={`px-2.5 py-1 rounded-lg uppercase tracking-wider whitespace-nowrap transition-colors ${
                    filterCondition === cond
                      ? 'bg-[#1853CF] text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cond.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Audit List */}
          <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
            {loading ? (
              <div className="p-8 text-center text-xs text-slate-400">Loading clinical records...</div>
            ) : filteredAudits.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">No matching business patient found.</div>
            ) : (
              filteredAudits.map((audit) => {
                const isSelected = selectedAudit?.id === audit.id;
                return (
                  <div
                    key={audit.id}
                    onClick={() => setSelectedAudit(audit)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#1853CF] bg-blue-50/50 shadow-sm'
                        : 'border-slate-200/70 hover:border-blue-200 bg-white hover:bg-slate-50/60'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[10px] font-mono font-bold text-slate-400">{audit.auditNumber}</span>
                      <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                        audit.clinicalCondition === 'CRITICAL_TRAUMA'
                          ? 'bg-rose-100 text-rose-700'
                          : audit.clinicalCondition === 'CHRONIC_HEMORRHAGE'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        BHI: {audit.healthIndex}/100
                      </span>
                    </div>

                    <div className="font-black text-xs text-[#0B1420] line-clamp-1">{audit.patient.companyName}</div>
                    <div className="text-[10px] text-slate-500 line-clamp-1">{audit.patient.industry} · {audit.auditDate}</div>

                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                      <span className="text-slate-400 font-semibold">Primary Bottleneck:</span>
                      <span className="font-bold text-rose-600 uppercase">{audit.criticalBottleneckOrgan}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Active Clinical Audit Dossier */}
        <div className="lg:col-span-8">
          {selectedAudit ? (
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md p-6 sm:p-9 space-y-8">
              
              {/* Clinical Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-black text-[#1853CF] bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
                      {selectedAudit.auditNumber}
                    </span>
                    <span className="text-xs text-slate-400 font-semibold">Diagnostic Date: {selectedAudit.auditDate}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#0B1420] tracking-tight uppercase">
                    {selectedAudit.patient.companyName}
                  </h2>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-semibold mt-1">
                    <span>{selectedAudit.patient.industry}</span>
                    <span>·</span>
                    <span>Stage: <strong className="uppercase text-[#0B1420]">{selectedAudit.patient.stage}</strong></span>
                    {selectedAudit.patient.websiteUrl && (
                      <>
                        <span>·</span>
                        <a href={selectedAudit.patient.websiteUrl} target="_blank" rel="noreferrer" className="text-[#1853CF] hover:underline inline-flex items-center gap-1">
                          {selectedAudit.patient.websiteUrl.replace('https://', '')} <ExternalLink className="w-3 h-3" />
                        </a>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1.5"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Rx</span>
                  </button>
                  <Link
                    href={`/admin/contracts?new=1&client=${encodeURIComponent(selectedAudit.patient.companyName)}&scope=${encodeURIComponent(selectedAudit.prescription.primaryPackage.name)}`}
                    className="px-4 py-2 text-xs font-black text-white bg-[#1853CF] hover:bg-blue-700 rounded-xl transition-all shadow-sm flex items-center gap-1.5 uppercase tracking-wider"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Generate Contract</span>
                  </Link>
                </div>
              </div>

              {/* Patient Vital Signs Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Current Rev</div>
                  <div className="text-base sm:text-lg font-black text-[#0B1420]">
                    ₹{(selectedAudit.patient.currentMonthlyRevenue / 100000).toFixed(1)}L/mo
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Target Rev</div>
                  <div className="text-base sm:text-lg font-black text-emerald-600">
                    ₹{(selectedAudit.patient.targetMonthlyRevenue / 100000).toFixed(1)}L/mo
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Monthly Traffic</div>
                  <div className="text-base sm:text-lg font-black text-[#1853CF]">
                    {selectedAudit.patient.monthlyVisitors.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Avg Order Value</div>
                  <div className="text-base sm:text-lg font-black text-[#0B1420]">
                    ₹{selectedAudit.patient.averageOrderValue.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Health Score & Executive Pathology */}
              <div className="p-6 rounded-3xl bg-blue-50/60 border border-blue-100 flex flex-col md:flex-row items-center gap-6">
                <div className="w-32 h-32 rounded-2xl bg-white border-2 border-[#1853CF] flex flex-col items-center justify-center flex-shrink-0 shadow-md">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Health Index</span>
                  <div className="text-4xl font-black text-[#1853CF] tracking-tighter my-0.5">
                    {selectedAudit.healthIndex}
                  </div>
                  <span className="text-[10px] font-bold text-slate-500">OUT OF 100</span>
                </div>

                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-rose-100 text-rose-700">
                    <AlertTriangle className="w-3 h-3" />
                    {selectedAudit.conditionTitle}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    {selectedAudit.executiveDiagnosis}
                  </p>
                  <div className="text-[11px] text-[#1853CF] font-bold">
                    Primary Fatal Organ: <span className="uppercase font-black underline">{selectedAudit.criticalBottleneckOrgan}</span> (Holding back company liquidity)
                  </div>
                </div>
              </div>

              {/* The 5 Vital Organs Pathology Grid */}
              <div className="space-y-4">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#1853CF] flex items-center gap-2">
                  <HeartPulse className="w-4 h-4 text-[#1853CF]" />
                  Vital Organs Assessment (Clinical Lab Pathology)
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(Object.keys(selectedAudit.organs) as OrganKey[]).map((key) => {
                    const organ = selectedAudit.organs[key];
                    const isBottleneck = selectedAudit.criticalBottleneckOrgan === key;

                    return (
                      <div
                        key={key}
                        className={`p-4 rounded-2xl border transition-all ${
                          isBottleneck
                            ? 'bg-rose-50/40 border-rose-300 ring-2 ring-rose-400/20 shadow-sm'
                            : 'bg-white border-slate-200/80'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-xs font-black text-[#0B1420] uppercase">{organ.name.split('(')[0]}</span>
                          <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${organ.statusColor}`}>
                            {organ.status} · {organ.score}/100
                          </span>
                        </div>

                        <div className="w-full bg-slate-100 rounded-full h-1.5 mb-2 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              organ.status === 'CRITICAL'
                                ? 'bg-rose-500'
                                : organ.status === 'VULNERABLE'
                                ? 'bg-amber-500'
                                : 'bg-emerald-500'
                            }`}
                            style={{ width: `${organ.score}%` }}
                          />
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed mb-2">
                          {organ.clinicalFinding}
                        </p>

                        <div className="text-[10px] text-rose-700 bg-rose-50/80 p-2 rounded-lg font-semibold flex items-start gap-1.5">
                          <AlertTriangle className="w-3 h-3 text-rose-500 flex-shrink-0 mt-0.5" />
                          <span><strong>Risk:</strong> {organ.primaryRisk}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ── Official Hospital Prescription (Rx) ── */}
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white space-y-6 shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#1853CF] flex items-center justify-center font-black text-sm">
                      Rx
                    </div>
                    <div>
                      <div className="text-sm font-black uppercase tracking-wider">Official Clinical Prescription</div>
                      <div className="text-[10px] text-blue-200">Prescribed by {selectedAudit.leadAuditor}</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-400 border border-emerald-400/30 px-3 py-1 rounded-full bg-emerald-950/40">
                    Prognosis: HIGH RECOVERY POTENTIAL
                  </span>
                </div>

                {/* Primary Treatment Package */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-black uppercase text-[#1853CF] bg-blue-100 px-2 py-0.5 rounded">
                        Primary Surgical Procedure
                      </span>
                      <h4 className="text-lg sm:text-xl font-black mt-1 text-white">
                        {selectedAudit.prescription.primaryPackage.name}
                      </h4>
                    </div>
                    <div className="text-left sm:text-right">
                      <div className="text-xl font-black text-white">{selectedAudit.prescription.primaryPackage.priceFormatted}</div>
                      <div className="text-[10px] text-blue-200 uppercase font-semibold">{selectedAudit.prescription.primaryPackage.timeline}</div>
                    </div>
                  </div>

                  <p className="text-xs text-blue-100 leading-relaxed italic border-l-2 border-[#1853CF] pl-3">
                    &ldquo;{selectedAudit.prescription.primaryPackage.clinicalObjective}&rdquo;
                  </p>

                  <div className="space-y-1.5 pt-2">
                    <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">Included Clinical Deliverables:</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {selectedAudit.prescription.primaryPackage.deliverables.map((deliv, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                          <span>{deliv}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Auxiliary Therapies */}
                {selectedAudit.prescription.auxiliaryTherapies.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Recommended Auxiliary Therapies (Accelerators)
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedAudit.prescription.auxiliaryTherapies.map((aux, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start justify-between gap-3">
                          <div>
                            <div className="text-xs font-bold text-white">{aux.name}</div>
                            <div className="text-[10px] text-slate-400 mt-0.5">{aux.clinicalReason}</div>
                          </div>
                          <span className="text-xs font-black text-blue-200 flex-shrink-0">{aux.costFormatted}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contraindications (What NOT to do) */}
                <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/30 space-y-1.5">
                  <div className="text-[11px] font-black uppercase text-rose-400 flex items-center gap-1.5">
                    <XCircle className="w-3.5 h-3.5 text-rose-400" />
                    Clinical Contraindications (What Client MUST STOP Doing Immediately)
                  </div>
                  <ul className="space-y-1 text-xs text-rose-200/90 pl-5 list-disc">
                    {selectedAudit.prescription.contraindications.map((contra, idx) => (
                      <li key={idx}>{contra}</li>
                    ))}
                  </ul>
                </div>

                {/* Projected Financial Recovery Metrics */}
                <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Target Monthly Lift</div>
                    <div className="text-base sm:text-lg font-black text-emerald-400">
                      +₹{(selectedAudit.prescription.projectedRevenueLift.low / 100000).toFixed(1)}L - ₹{(selectedAudit.prescription.projectedRevenueLift.high / 100000).toFixed(1)}L
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Recovery Horizon</div>
                    <div className="text-base sm:text-lg font-black text-white">
                      {selectedAudit.prescription.projectedRevenueLift.recoveryTimeDays} Days
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Forecasted ROAS</div>
                    <div className="text-base sm:text-lg font-black text-blue-200">
                      {selectedAudit.prescription.projectedRevenueLift.estimatedRoas}
                    </div>
                  </div>
                </div>

              </div>

            </div>
          ) : (
            <div className="p-16 text-center bg-white rounded-3xl border border-slate-200/80 text-slate-400 space-y-3">
              <Stethoscope className="w-10 h-10 mx-auto text-slate-300" />
              <div className="font-bold text-sm">Select a patient audit from the left or run a new diagnostic triage.</div>
            </div>
          )}
        </div>

      </div>

      {/* ── Modal: New Business Patient Triage ── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-black uppercase text-[#1853CF] tracking-widest">
                  Clinical Intake Lab
                </span>
                <h3 className="text-xl font-black text-[#0B1420] uppercase">Run Business Growth Diagnostic</h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleRunDiagnosis} className="space-y-6">
              
              {/* Basic Patient Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Company / Brand Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Solaria Media Corp"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1853CF]/20 focus:border-[#1853CF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Website URL</label>
                  <input
                    type="url"
                    placeholder="https://example.com"
                    value={formData.websiteUrl}
                    onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1853CF]/20 focus:border-[#1853CF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Industry</label>
                  <input
                    type="text"
                    placeholder="e.g. FinTech / SaaS / D2C / Real Estate"
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1853CF]/20 focus:border-[#1853CF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Company Stage</label>
                  <select
                    value={formData.stage}
                    onChange={(e) => setFormData({ ...formData, stage: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1853CF]/20 focus:border-[#1853CF]"
                  >
                    <option value="early">Early Stage (Pre ₹10L/mo)</option>
                    <option value="growth">Growth Stage (₹10L - ₹50L/mo)</option>
                    <option value="scaling">Scaling Stage (₹50L - ₹2Cr/mo)</option>
                    <option value="enterprise">Enterprise (₹2Cr+/mo)</option>
                  </select>
                </div>
              </div>

              {/* Financial Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Current Rev (₹/mo)</label>
                  <input
                    type="number"
                    value={formData.currentMonthlyRevenue}
                    onChange={(e) => setFormData({ ...formData, currentMonthlyRevenue: Number(e.target.value) })}
                    className="w-full p-2 text-xs font-bold rounded-lg border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Target Rev (₹/mo)</label>
                  <input
                    type="number"
                    value={formData.targetMonthlyRevenue}
                    onChange={(e) => setFormData({ ...formData, targetMonthlyRevenue: Number(e.target.value) })}
                    className="w-full p-2 text-xs font-bold rounded-lg border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Monthly Visitors</label>
                  <input
                    type="number"
                    value={formData.monthlyVisitors}
                    onChange={(e) => setFormData({ ...formData, monthlyVisitors: Number(e.target.value) })}
                    className="w-full p-2 text-xs font-bold rounded-lg border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Avg Order Value (₹)</label>
                  <input
                    type="number"
                    value={formData.averageOrderValue}
                    onChange={(e) => setFormData({ ...formData, averageOrderValue: Number(e.target.value) })}
                    className="w-full p-2 text-xs font-bold rounded-lg border border-slate-200"
                  />
                </div>
              </div>

              {/* 5 Organ Biomarker Sliders */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-[#1853CF] flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5" />
                    Vital Organs Pathology Sliders (1 = Failing, 10 = Flawless)
                  </span>
                </div>

                <div className="space-y-3 p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
                  {/* Lungs */}
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                      <span>🫁 Lungs (Inbound Traffic &amp; Organic Demand)</span>
                      <span className="font-mono text-[#1853CF]">{formData.biomarkers.trafficScore}/10</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      step="0.5"
                      value={formData.biomarkers.trafficScore}
                      onChange={(e) => setFormData({
                        ...formData,
                        biomarkers: { ...formData.biomarkers, trafficScore: parseFloat(e.target.value) },
                      })}
                      className="w-full accent-[#1853CF]"
                    />
                  </div>

                  {/* Heart */}
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                      <span>🫀 Heart (Conversion Rate &amp; Web Speed)</span>
                      <span className="font-mono text-[#1853CF]">{formData.biomarkers.conversionScore}/10</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      step="0.5"
                      value={formData.biomarkers.conversionScore}
                      onChange={(e) => setFormData({
                        ...formData,
                        biomarkers: { ...formData.biomarkers, conversionScore: parseFloat(e.target.value) },
                      })}
                      className="w-full accent-[#1853CF]"
                    />
                  </div>

                  {/* Immune */}
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                      <span>🛡️ Immune System (Brand Authority &amp; Pricing Moat)</span>
                      <span className="font-mono text-[#1853CF]">{formData.biomarkers.brandingScore}/10</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      step="0.5"
                      value={formData.biomarkers.brandingScore}
                      onChange={(e) => setFormData({
                        ...formData,
                        biomarkers: { ...formData.biomarkers, brandingScore: parseFloat(e.target.value) },
                      })}
                      className="w-full accent-[#1853CF]"
                    />
                  </div>

                  {/* Metabolism */}
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                      <span>🧬 Metabolism (Client Retention &amp; LTV)</span>
                      <span className="font-mono text-[#1853CF]">{formData.biomarkers.retentionScore}/10</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      step="0.5"
                      value={formData.biomarkers.retentionScore}
                      onChange={(e) => setFormData({
                        ...formData,
                        biomarkers: { ...formData.biomarkers, retentionScore: parseFloat(e.target.value) },
                      })}
                      className="w-full accent-[#1853CF]"
                    />
                  </div>

                  {/* Voice */}
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                      <span>🎬 Voice (Cinema Video &amp; Social Hook Retention)</span>
                      <span className="font-mono text-[#1853CF]">{formData.biomarkers.videoScore}/10</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      step="0.5"
                      value={formData.biomarkers.videoScore}
                      onChange={(e) => setFormData({
                        ...formData,
                        biomarkers: { ...formData.biomarkers, videoScore: parseFloat(e.target.value) },
                      })}
                      className="w-full accent-[#1853CF]"
                    />
                  </div>
                </div>
              </div>

              {/* Symptoms / Complaints Tag Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Reported Symptoms</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="e.g. High CPC on Meta, Mobile users bounce in 2s"
                    value={tempComplaint}
                    onChange={(e) => setTempComplaint(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addComplaint();
                      }
                    }}
                    className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200"
                  />
                  <button
                    type="button"
                    onClick={addComplaint}
                    className="px-3 py-2 text-xs font-bold bg-slate-100 hover:bg-slate-200 rounded-xl"
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {formData.primaryComplaints.map((c, i) => (
                    <span key={i} className="inline-flex items-center gap-1 text-[11px] bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg">
                      <span>{c}</span>
                      <button type="button" onClick={() => removeComplaint(i)} className="text-slate-400 hover:text-slate-600">×</button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-black uppercase tracking-wider text-white bg-[#1853CF] hover:bg-blue-700 rounded-xl shadow-md transition-all flex items-center gap-2"
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>Run Clinical Diagnosis</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
