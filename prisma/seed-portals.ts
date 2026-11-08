import prisma from '../src/lib/prisma';

async function main() {
  console.log('Seeding Client Portal, Invoice, and Contract demo data...');

  // 1. Client Portal
  const portal = await prisma.clientPortal.upsert({
    where: { token: 'apex-wealth' },
    update: {},
    create: {
      token: 'apex-wealth',
      clientName: 'Alexander Vance',
      clientEmail: 'alex@apexwealth.co',
      company: 'Apex Wealth Capital',
      projectName: 'Next.js 14 Institutional Web Platform',
      serviceType: 'Web Development & Full Brand Identity',
      status: 'Development',
      progress: 75,
      startDate: 'Oct 15, 2024',
      deliveryDate: 'Nov 28, 2024',
      stagingUrl: 'https://apex-staging.bgrowth.agency',
      figmaUrl: 'https://figma.com/@bgrowth/apex-system',
      videoProofUrl: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
      agencyContactName: 'Adharsh Katari',
      agencyContactRole: 'Founder · Lead Architect',
      agencyContactPhone: '+91 98765 43210',
      agencyContactEmail: 'adharsh@bgrowth.agency',
      milestones: JSON.stringify([
        { id: 'm1', title: 'Phase 1: Discovery & Architecture', desc: 'Sitemap, tech stack, and DB schema signoff', status: 'completed', date: 'Oct 20, 2024' },
        { id: 'm2', title: 'Phase 2: UI Design System & Prototype', desc: 'Figma high-fidelity components and interactive prototypes', status: 'completed', date: 'Nov 02, 2024' },
        { id: 'm3', title: 'Phase 3: Frontend & Next.js Engine', desc: 'Server components, animation polish, and API integrations', status: 'in_progress', date: 'Nov 18, 2024' },
        { id: 'm4', title: 'Phase 4: QA, Lighthouse 98+ & Production Deploy', desc: 'Security headers, cross-browser QA, custom domain SSL setup', status: 'upcoming', date: 'Nov 28, 2024' },
      ]),
      deliverables: JSON.stringify([
        { id: 'd1', name: 'Design Tokens & Figma Master File', type: 'Design', status: 'Approved', fileUrl: 'https://figma.com' },
        { id: 'd2', name: 'Staging Application Preview (V1)', type: 'Web App', status: 'In Review', fileUrl: 'https://apex-staging.bgrowth.agency' },
        { id: 'd3', name: 'Commercial Brand Video (4K Edit)', type: 'Video', status: 'Approved', fileUrl: '#' },
      ]),
    },
  });

  // 2. Portal Message
  await prisma.clientPortalMessage.createMany({
    data: [
      {
        portalId: portal.id,
        sender: 'AGENCY',
        senderName: 'Adharsh Katari (Founder)',
        message: 'Welcome to your private B Growth tracking portal! We have completed Phase 2 UI design and the Next.js development sprint is currently at 75%. Let us know your feedback on the staging build.',
      },
      {
        portalId: portal.id,
        sender: 'CLIENT',
        senderName: 'Alexander Vance',
        message: 'The typography and dark navy/royal blue contrast on the dashboard is incredible! Excited for the live launch.',
      },
    ],
  });

  // 3. Invoices
  await prisma.invoice.upsert({
    where: { invoiceNumber: 'INV-2024-001' },
    update: {},
    create: {
      invoiceNumber: 'INV-2024-001',
      portalId: portal.id,
      clientName: 'Alexander Vance',
      clientEmail: 'alex@apexwealth.co',
      clientCompany: 'Apex Wealth Capital',
      clientAddress: 'One Marina Blvd, Financial District',
      date: '2024-10-15',
      dueDate: '2024-10-22',
      items: JSON.stringify([
        { description: 'Phase 1: Project Kickoff & UI Architecture Design', quantity: 1, rate: 35000, amount: 35000 },
        { description: 'Figma Brand System & Commercial Poster Pack', quantity: 1, rate: 10000, amount: 10000 },
      ]),
      subtotal: 45000,
      taxRate: 18,
      taxAmount: 8100,
      discount: 0,
      total: 53100,
      status: 'PAID',
      paymentNotes: 'Paid via Bank Wire / NEFT. Reference: TXN-98421048',
    },
  });

  await prisma.invoice.upsert({
    where: { invoiceNumber: 'INV-2024-002' },
    update: {},
    create: {
      invoiceNumber: 'INV-2024-002',
      portalId: portal.id,
      clientName: 'Alexander Vance',
      clientEmail: 'alex@apexwealth.co',
      clientCompany: 'Apex Wealth Capital',
      clientAddress: 'One Marina Blvd, Financial District',
      date: '2024-11-10',
      dueDate: '2024-11-20',
      items: JSON.stringify([
        { description: 'Phase 2: Next.js 14 Custom Frontend Engineering & Backend CMS', quantity: 1, rate: 45000, amount: 45000 },
        { description: '4K Commercial Launch Video (Retention Edited + Color Graded)', quantity: 1, rate: 8500, amount: 8500 },
      ]),
      subtotal: 53500,
      taxRate: 18,
      taxAmount: 9630,
      discount: 0,
      total: 63130,
      status: 'PENDING',
      paymentNotes: 'Payable via Bank Wire / UPI (bgrowth@icici). Due upon Phase 3 completion.',
    },
  });

  // 4. Contract
  await prisma.contract.upsert({
    where: { contractNumber: 'CTR-2024-001' },
    update: {},
    create: {
      contractNumber: 'CTR-2024-001',
      title: 'Digital Engineering & Brand Production Master Agreement',
      clientName: 'Alexander Vance',
      clientEmail: 'alex@apexwealth.co',
      clientCompany: 'Apex Wealth Capital',
      serviceScope: 'Complete design and engineering of Apex Wealth digital experience: custom Next.js 14 SSR web app, 15 responsive layouts, SEO schema, commercial brand video (60s 4K), and admin CMS.',
      totalValue: 116230,
      paymentSchedule: '50% deposit upon kickoff (Paid), 50% milestone balance prior to DNS launch.',
      deliverables: JSON.stringify([
        'Production Next.js 14 Codebase repository transfer',
        'Figma Design System with 100% intellectual property assignment',
        'Master 4K Video exports with raw Premiere/DaVinci files',
        '90-Day post-deployment priority engineering warranty',
      ]),
      terms: 'All intellectual property, proprietary assets, code, and source designs generated during this contract transfer 100% unconditionally to the Client upon receipt of final settlement. B Growth Agency warrants 99.8% uptime engineering standards and 60 days of bug fixing.',
      status: 'SIGNED',
      signedAt: new Date(),
      signatureName: 'Alexander Vance (Apex Wealth)',
    },
  });

  console.log('Seeded successfully!');
}

main().catch(console.error);
