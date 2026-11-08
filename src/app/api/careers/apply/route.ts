import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const APPLICATIONS_FILE = path.join(process.cwd(), 'prisma', 'job_applications.json');

export interface JobApplication {
  id: string;
  roleId: string;
  roleTitle: string;
  applicantType: 'Full-Time' | 'Internship';
  fullName: string;
  email: string;
  phone: string;
  city: string;
  collegeOrCompany?: string;
  portfolioUrl: string;
  resumeUrl: string;
  coverNote: string;
  status: 'NEW' | 'REVIEWING' | 'INTERVIEW_SCHEDULED' | 'ACCEPTED' | 'REJECTED';
  appliedAt: string;
}

function readApplications(): JobApplication[] {
  try {
    if (!fs.existsSync(APPLICATIONS_FILE)) {
      return [];
    }
    const data = fs.readFileSync(APPLICATIONS_FILE, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function saveApplications(apps: JobApplication[]) {
  try {
    fs.writeFileSync(APPLICATIONS_FILE, JSON.stringify(apps, null, 2), 'utf8');
  } catch (err) {
    console.error('Failed to write job applications:', err);
  }
}

export async function GET() {
  const apps = readApplications();
  return NextResponse.json({ success: true, applications: apps });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, phone, roleTitle, portfolioUrl, resumeUrl } = body;

    if (!fullName || !email || !phone || !roleTitle) {
      return NextResponse.json({ success: false, error: 'Required fields missing' }, { status: 400 });
    }

    const newApp: JobApplication = {
      id: 'app_' + Math.random().toString(36).substring(2, 9),
      roleId: body.roleId || 'general',
      roleTitle,
      applicantType: body.applicantType || 'Full-Time',
      fullName,
      email,
      phone,
      city: body.city || 'Hyderabad',
      collegeOrCompany: body.collegeOrCompany || '',
      portfolioUrl: portfolioUrl || '',
      resumeUrl: resumeUrl || '',
      coverNote: body.coverNote || '',
      status: 'NEW',
      appliedAt: new Date().toISOString(),
    };

    const existing = readApplications();
    existing.unshift(newApp);
    saveApplications(existing);

    return NextResponse.json({ success: true, application: newApp });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
