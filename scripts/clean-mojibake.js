const fs = require('fs');
const path = require('path');

const MOJIBAKE_MAP = [
  // Indian Rupee symbol: UTF-8 E2 82 B9 -> Win1252 â ‚ ¹ (\u00e2\u201a\u00b9)
  [/\u00e2\u201a\u00b9/g, '₹'],
  [/\u00e2\u201a/g, '₹'],

  // Em dash: UTF-8 E2 80 94 -> Win1252 â € ” (\u00e2\u20ac\u201d) or â € — (\u00e2\u20ac\u2014)
  [/\u00e2\u20ac\u201d/g, '—'],
  [/\u00e2\u20ac\u2014/g, '—'],

  // En dash: UTF-8 E2 80 93 -> Win1252 â € “ (\u00e2\u20ac\u201c) or â € – (\u00e2\u20ac\u2013)
  [/\u00e2\u20ac\u201c/g, '–'],
  [/\u00e2\u20ac\u2013/g, '–'],

  // Box drawing: â”€ -> ─
  [/\u00e2\u201d\u20ac/g, '─'],

  // Right arrow: UTF-8 E2 86 92 -> â†’ (\u00e2\u2020\u2019)
  [/\u00e2\u2020\u2019/g, '→'],
  [/\u00e2\u2020\u0090/g, '←'],

  // Checkmark: UTF-8 E2 9C 93 -> âœ“ (\u00e2\u0153\u201c)
  [/\u00e2\u0153\u201c/g, '✓'],
  [/\u00e2\u0153"/g, '✓'],
  // Cross: UTF-8 E2 9C 95 -> âœ• (\u00e2\u0153\u2022)
  [/\u00e2\u0153\u2022/g, '✕'],

  // Ellipsis: UTF-8 E2 80 A6 -> â€¦ (\u00e2\u20ac\u00a6)
  [/\u00e2\u20ac\u00a6/g, '…'],

  // Empty set: âˆ… (\u00e2\u02c6\u2026) -> ∅
  [/\u00e2\u02c6\u2026/g, '∅'],

  // Smart Quotes
  [/\u00e2\u20ac\u0153/g, '"'],
  [/\u00e2\u20ac\u009d/g, '"'],
  [/\u00e2\u20ac\u02dc/g, "'"],
  [/\u00e2\u20ac\u2122/g, "'"],

  // Bullet: â€¢ (\u00e2\u20ac\u00a2)
  [/\u00e2\u20ac\u00a2/g, '•'],

  // Middle dot: Â· (\u00c2\u00b7)
  [/\u00c2\u00b7/g, '·'],
  // Copyright Â©
  [/\u00c2\u00a9/g, '©'],
  // Registered Â®
  [/\u00c2\u00ae/g, '®'],
  // Degree Â°
  [/\u00c2\u00b0/g, '°'],
  // Non-breaking space artifact: Â 
  [/\u00c2\u00a0/g, ' '],
  // Orphan Â
  [/\u00c2/g, ''],
];

function cleanString(str) {
  if (!str || typeof str !== 'string') return str;
  let out = str;
  for (const [regex, replacement] of MOJIBAKE_MAP) {
    out = out.replace(regex, replacement);
  }
  return out;
}

function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.next') {
        walkDir(full);
      }
    } else if (/\.(tsx|ts|css|html|json)$/.test(entry.name)) {
      const original = fs.readFileSync(full, 'utf8');
      const cleaned = cleanString(original);
      if (cleaned !== original) {
        fs.writeFileSync(full, cleaned, 'utf8');
        console.log(`Cleaned file: ${full}`);
      }
    }
  }
}

// 1. Clean src directory
walkDir(path.join(__dirname, '..', 'src'));

// 2. Clean prisma database
async function cleanDb() {
  try {
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    // Clean services
    const services = await prisma.service.findMany();
    for (const s of services) {
      const newTitle = cleanString(s.title);
      const newShort = cleanString(s.shortDesc);
      const newFull = cleanString(s.fullDescription || '');
      const newFeatures = cleanString(s.features);
      if (newTitle !== s.title || newShort !== s.shortDesc || newFull !== s.fullDescription || newFeatures !== s.features) {
        await prisma.service.update({
          where: { id: s.id },
          data: {
            title: newTitle,
            shortDesc: newShort,
            fullDescription: newFull,
            features: newFeatures,
          },
        });
        console.log(`Cleaned DB Service: ${s.title}`);
      }
    }

    // Clean contracts
    const contracts = await prisma.contract.findMany();
    for (const c of contracts) {
      const newTitle = cleanString(c.title);
      const newScope = cleanString(c.serviceScope || '');
      const newDeliverables = cleanString(c.deliverables || '');
      const newTerms = cleanString(c.terms || '');
      if (newTitle !== c.title || newScope !== c.serviceScope || newDeliverables !== c.deliverables || newTerms !== c.terms) {
        await prisma.contract.update({
          where: { id: c.id },
          data: {
            title: newTitle,
            serviceScope: newScope,
            deliverables: newDeliverables,
            terms: newTerms,
          },
        });
        console.log(`Cleaned DB Contract: ${c.title}`);
      }
    }

    // Clean invoices
    const invoices = await prisma.invoice.findMany();
    for (const inv of invoices) {
      const newClient = cleanString(inv.clientName);
      const newItems = cleanString(inv.items || '');
      if (newClient !== inv.clientName || newItems !== inv.items) {
        await prisma.invoice.update({
          where: { id: inv.id },
          data: { clientName: newClient, items: newItems },
        });
        console.log(`Cleaned DB Invoice: ${inv.id}`);
      }
    }

    await prisma.$disconnect();
    console.log('Database records cleaned.');
  } catch (err) {
    console.log('DB cleaning error:', err);
  }
}

cleanDb().then(() => {
  console.log('Mojibake cleanup completed successfully.');
});
