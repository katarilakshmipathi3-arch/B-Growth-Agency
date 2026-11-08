import { NextRequest, NextResponse } from 'next/server';
import { runClinicalDiagnosis, BusinessPatientData, ClinicalAuditResult } from '@/lib/clinical-diagnostics';
import fs from 'fs';
import path from 'path';

const AUDIT_STORAGE_FILE = path.join(process.cwd(), 'prisma', 'clinical_audits.json');

function readAudits(): ClinicalAuditResult[] {
  try {
    if (!fs.existsSync(AUDIT_STORAGE_FILE)) {
      return [];
    }
    const data = fs.readFileSync(AUDIT_STORAGE_FILE, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function saveAudits(audits: ClinicalAuditResult[]) {
  try {
    fs.writeFileSync(AUDIT_STORAGE_FILE, JSON.stringify(audits, null, 2), 'utf8');
  } catch (err) {
    console.error('Failed to persist clinical audits:', err);
  }
}

// Pre-populate with 2 demo client diagnoses if empty so the admin has rich data immediately
function getInitialAudits(): ClinicalAuditResult[] {
  const existing = readAudits();
  if (existing.length > 0) return existing;

  const demo1 = runClinicalDiagnosis({
    companyName: 'Apex Wealth Partners',
    websiteUrl: 'https://apexwealth.example.com',
    industry: 'FinTech & Wealth Management',
    stage: 'scaling',
    currentMonthlyRevenue: 2800000,
    targetMonthlyRevenue: 7500000,
    averageOrderValue: 450000,
    monthlyVisitors: 14200,
    primaryComplaints: [
      'High paid ad spend with rising CAC',
      'Low mobile visitor conversion (<0.9%)',
      'No interactive wealth projection tools',
    ],
    biomarkers: {
      trafficScore: 7.2,
      conversionScore: 3.1, // Red
      brandingScore: 7.8,
      retentionScore: 6.5,
      videoScore: 4.0,
    },
  });

  const demo2 = runClinicalDiagnosis({
    companyName: 'FitVerse Athletics',
    websiteUrl: 'https://fitverse.example.com',
    industry: 'D2C Activewear & Athletics',
    stage: 'growth',
    currentMonthlyRevenue: 850000,
    targetMonthlyRevenue: 3000000,
    averageOrderValue: 2400,
    monthlyVisitors: 32000,
    primaryComplaints: [
      'Ad fatigue on Instagram & Meta',
      'Social audience scrolling past static poster ads',
      'Competitors releasing viral cinema reels',
    ],
    biomarkers: {
      trafficScore: 6.0,
      conversionScore: 5.5,
      brandingScore: 5.8,
      retentionScore: 4.8,
      videoScore: 2.5, // Red
    },
  });

  saveAudits([demo1, demo2]);
  return [demo1, demo2];
}

export async function GET() {
  const audits = getInitialAudits();
  return NextResponse.json({ success: true, audits });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const patientData: BusinessPatientData = body;

    if (!patientData.companyName) {
      return NextResponse.json({ success: false, error: 'Company name is required' }, { status: 400 });
    }

    const result = runClinicalDiagnosis(patientData);
    const audits = getInitialAudits();
    audits.unshift(result);
    saveAudits(audits);

    return NextResponse.json({ success: true, audit: result });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
