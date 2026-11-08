/**
 * B-Growth Clinical Business Diagnostic & Hospital Audit System (v2.0 Enterprise)
 *
 * Diagnostic Methodology:
 * Treats a business as a biological organism with 5 Vital Organs:
 *  1. LUNGS        -> Organic Lead Flow & Market Demand
 *  2. HEART        -> Conversion Architecture & Digital Experience (Next.js Speed & UX)
 *  3. IMMUNE SYSTEM-> Brand Authority, Perception & Pricing Power (Moat)
 *  4. METABOLISM   -> Retention, Repeat Sales & Unit Economics (LTV)
 *  5. VOICE        -> Cinema Video, Content Retention & Emotional Resonance
 */

export type OrganKey = 'lungs' | 'heart' | 'immune' | 'metabolism' | 'voice';

export interface OrganBiomarkers {
  trafficScore: number;       // 1 - 10
  conversionScore: number;    // 1 - 10
  brandingScore: number;      // 1 - 10
  retentionScore: number;     // 1 - 10
  videoScore: number;         // 1 - 10
}

export interface BusinessPatientData {
  companyName: string;
  websiteUrl: string;
  industry: string;
  stage: 'early' | 'growth' | 'scaling' | 'enterprise';
  currentMonthlyRevenue: number; // in INR
  targetMonthlyRevenue: number;  // in INR
  averageOrderValue: number;     // in INR
  monthlyVisitors: number;
  primaryComplaints: string[];   // Symptoms reported by founder
  biomarkers: OrganBiomarkers;
}

export interface OrganDiagnosis {
  key: OrganKey;
  name: string;
  anatomicalFunction: string;
  score: number; // 0 - 100
  status: 'CRITICAL' | 'VULNERABLE' | 'HEALTHY';
  statusColor: string;
  clinicalFinding: string;
  primaryRisk: string;
}

export interface Prescription {
  primaryPackage: {
    name: string;
    slug: string;
    priceFormatted: string;
    timeline: string;
    clinicalObjective: string;
    deliverables: string[];
  };
  auxiliaryTherapies: {
    name: string;
    costFormatted: string;
    clinicalReason: string;
  }[];
  contraindications: string[]; // What the business MUST STOP doing immediately
  projectedRevenueLift: {
    low: number;  // Monthly lift in INR
    high: number; // Monthly lift in INR
    recoveryTimeDays: number;
    estimatedRoas: string;
  };
}

export interface ClinicalAuditResult {
  id: string;
  auditNumber: string;
  auditDate: string;
  leadAuditor: string;
  patient: BusinessPatientData;
  healthIndex: number; // 0 - 100
  clinicalCondition: 'CRITICAL_TRAUMA' | 'CHRONIC_HEMORRHAGE' | 'MODERATE_DYSFUNCTION' | 'SCALABLE_HEALTH';
  conditionTitle: string;
  executiveDiagnosis: string;
  organs: Record<OrganKey, OrganDiagnosis>;
  criticalBottleneckOrgan: OrganKey;
  prescription: Prescription;
}

/**
 * Diagnostic Calculation Engine
 */
export function runClinicalDiagnosis(patient: BusinessPatientData): ClinicalAuditResult {
  const { biomarkers, currentMonthlyRevenue, targetMonthlyRevenue, monthlyVisitors } = patient;

  // Organ 1: Lungs (Lead Flow & Demand)
  const lungsScore = Math.min(100, Math.round(biomarkers.trafficScore * 10));
  // Organ 2: Heart (Conversion & Speed)
  const heartScore = Math.min(100, Math.round(biomarkers.conversionScore * 10));
  // Organ 3: Immune System (Brand Authority & Pricing Moat)
  const immuneScore = Math.min(100, Math.round(biomarkers.brandingScore * 10));
  // Organ 4: Metabolism (Retention & LTV)
  const metabolismScore = Math.min(100, Math.round(biomarkers.retentionScore * 10));
  // Organ 5: Voice (Cinema Video & Resonance)
  const voiceScore = Math.min(100, Math.round(biomarkers.videoScore * 10));

  const getStatus = (score: number): 'CRITICAL' | 'VULNERABLE' | 'HEALTHY' => {
    if (score < 45) return 'CRITICAL';
    if (score < 72) return 'VULNERABLE';
    return 'HEALTHY';
  };

  const getStatusColor = (status: 'CRITICAL' | 'VULNERABLE' | 'HEALTHY') => {
    switch (status) {
      case 'CRITICAL': return 'text-rose-600 bg-rose-50 border-rose-200';
      case 'VULNERABLE': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'HEALTHY': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    }
  };

  const organs: Record<OrganKey, OrganDiagnosis> = {
    lungs: {
      key: 'lungs',
      name: 'Lungs & Oxygenation (Organic Demand & Inbound Traffic)',
      anatomicalFunction: 'Extracts oxygen (qualified buyers) from the market ecosystem to sustain business metabolism.',
      score: lungsScore,
      status: getStatus(lungsScore),
      statusColor: getStatusColor(getStatus(lungsScore)),
      clinicalFinding: lungsScore < 45 
        ? 'Severe oxygen starvation. Company is overly reliant on volatile manual outreach or single ad channel with rising CAC.'
        : lungsScore < 72
        ? 'Restricted airflow. Traffic volume is adequate but buyer intent is lukewarm, causing unpredictable monthly pipeline.'
        : 'Deep healthy respiration. Consistent inbound qualified demand actively feeding sales channels.',
      primaryRisk: 'Sudden platform algorithmic change or ad spend pause could trigger immediate liquidity crisis.',
    },
    heart: {
      key: 'heart',
      name: 'Heart & Circulation (Conversion Architecture & Digital Experience)',
      anatomicalFunction: 'Pumps warm visitor attention through high-converting funnel pathways into settled revenue.',
      score: heartScore,
      status: getStatus(heartScore),
      statusColor: getStatusColor(getStatus(heartScore)),
      clinicalFinding: heartScore < 45
        ? 'Cardiac arrest in conversion funnel. Sub-1% visitor conversion, sluggish mobile LCP (>3.8s), causing 80%+ traffic leak.'
        : heartScore < 72
        ? 'Arrhythmic conversion. Good desktop layout but mobile experience drops off 45% of potential checkouts or leads.'
        : 'High-output vascular performance. Sub-second Next.js edge responses, frictionless interactive forms converting at 3.8%+',
      primaryRisk: 'Every marketing rupee spent is 70% wasted because the website funnel cannot hold blood/capital.',
    },
    immune: {
      key: 'immune',
      name: 'Immune System (Brand Authority & Pricing Moat)',
      anatomicalFunction: 'Protects gross margins against commodity pricing pressure and copycat competitors.',
      score: immuneScore,
      status: getStatus(immuneScore),
      statusColor: getStatusColor(getStatus(immuneScore)),
      clinicalFinding: immuneScore < 45
        ? 'Immuno-deficient positioning. Visual assets look like generic Canva templates. Client suffers extreme pricing resistance.'
        : immuneScore < 72
        ? 'Moderate brand resilience. Credibility exists locally but fails to command high-ticket enterprise retainers.'
        : 'Impermeable brand moat. Premium typography, bespoke design tokens, and undeniable aesthetic supremacy.',
      primaryRisk: 'Competitors with superior visual identity will continue undercutting or stealing high-tier clients.',
    },
    metabolism: {
      key: 'metabolism',
      name: 'Digestive Metabolism (Retention, Client Portal & LTV)',
      anatomicalFunction: 'Digests closed deals into compounded recurring cashflow and organic referral loops.',
      score: metabolismScore,
      status: getStatus(metabolismScore),
      statusColor: getStatusColor(getStatus(metabolismScore)),
      clinicalFinding: metabolismScore < 45
        ? 'Malabsorption syndrome. Clients churn within 60 days due to opaque onboarding, no digital portal, and erratic updates.'
        : metabolismScore < 72
        ? 'Functional but leaking. Repeat referral loop is accidental rather than engineered into an automated client ecosystem.'
        : 'Hyper-efficient compounding. Structured client portal, automated milestone receipts, and zero client confusion.',
      primaryRisk: 'Company stays on a grueling acquisition treadmill, working twice as hard just to replace lost revenue.',
    },
    voice: {
      key: 'voice',
      name: 'Vocal Chords & Nervous System (Cinema Video & Emotional Resonance)',
      anatomicalFunction: 'Broadcasts category authority through high-retention video storytelling that stops scrolls.',
      score: voiceScore,
      status: getStatus(voiceScore),
      statusColor: getStatusColor(getStatus(voiceScore)),
      clinicalFinding: voiceScore < 45
        ? 'Vocal mutism. Zero commercial video assets. Competitors with dynamic video reels capture 90% of user attention.'
        : voiceScore < 72
        ? 'Muffled acoustic output. Has videos, but amateur editing, weak 3-second hooks, and lack of color grading limit shareability.'
        : 'Resonant category frequency. Broadcast-grade 4K cinema visuals, retention-engineered hooks, and authoritative founder films.',
      primaryRisk: 'Social and digital audiences ignore static banners, driving ad fatigue and soaring cost-per-click.',
    },
  };

  // Find lowest organ score
  const organScores = [
    { key: 'heart' as OrganKey, score: heartScore },
    { key: 'lungs' as OrganKey, score: lungsScore },
    { key: 'immune' as OrganKey, score: immuneScore },
    { key: 'voice' as OrganKey, score: voiceScore },
    { key: 'metabolism' as OrganKey, score: metabolismScore },
  ];
  organScores.sort((a, b) => a.score - b.score);
  const criticalBottleneckOrgan = organScores[0].key;

  // Weighted Health Index
  // Heart (30%), Immune (25%), Lungs (20%), Voice (15%), Metabolism (10%)
  const healthIndex = Math.round(
    heartScore * 0.30 +
    immuneScore * 0.25 +
    lungsScore * 0.20 +
    voiceScore * 0.15 +
    metabolismScore * 0.10
  );

  let clinicalCondition: ClinicalAuditResult['clinicalCondition'];
  let conditionTitle = '';
  let executiveDiagnosis = '';

  if (healthIndex < 42) {
    clinicalCondition = 'CRITICAL_TRAUMA';
    conditionTitle = 'Critical Hemorrhage: Multiple Organ Breakdown';
    executiveDiagnosis = `${patient.companyName} is in severe conversion and perception failure. Traffic is either starved or pouring into a leaky, unoptimized digital presence with zero pricing power. Urgent surgical intervention required.`;
  } else if (healthIndex < 65) {
    clinicalCondition = 'CHRONIC_HEMORRHAGE';
    conditionTitle = `Chronic Bottleneck: ${organs[criticalBottleneckOrgan].name.split('(')[0].trim()} Malfunction`;
    executiveDiagnosis = `${patient.companyName} has viable core offerings, but the growth engine is choked specifically by its ${criticalBottleneckOrgan.toUpperCase()}. Solving this single organ will release massive trapped revenue.`;
  } else if (healthIndex < 82) {
    clinicalCondition = 'MODERATE_DYSFUNCTION';
    conditionTitle = 'Sub-Optimal Capacity: Expansion Blocked by Authority Gap';
    executiveDiagnosis = `${patient.companyName} is stable but under-pricing its value. Elevating visual craft, cinema video assets, and digital client experience will unlock high-ticket client tiers.`;
  } else {
    clinicalCondition = 'SCALABLE_HEALTH';
    conditionTitle = 'Prime Athletic Health: Scalable Market Dominator';
    executiveDiagnosis = `${patient.companyName} has solid vitals. Ready for aggressive multi-channel scaling, bespoke custom retainers, and enterprise expansion.`;
  }

  // Generate Precision Prescription (Rx)
  const gapRevenue = Math.max(100000, targetMonthlyRevenue - currentMonthlyRevenue);
  const projectedLowLift = Math.round(gapRevenue * 0.35);
  const projectedHighLift = Math.round(gapRevenue * 0.85);

  let prescription: Prescription;

  switch (criticalBottleneckOrgan) {
    case 'heart':
      prescription = {
        primaryPackage: {
          name: 'Growth Engine Sprint (Next.js 14 Custom Architecture)',
          slug: 'web-development',
          priceFormatted: '₹34,999',
          timeline: '14-Day Delivery',
          clinicalObjective: 'Resuscitate conversion heart rate: Replace slow template site with sub-second Next.js 14 stack, bespoke CRO layout, and interactive lead capture.',
          deliverables: [
            'Next.js 14 App Router Architecture (Lighthouse 98+ Guarantee)',
            'Bespoke Figma UI/UX Conversion Design System',
            'Interactive High-Intent Lead Capture Flows',
            'Integrated Analytics & Real-Time Conversion Tracking',
          ],
        },
        auxiliaryTherapies: [
          {
            name: 'Complete Visual Brand Identity Kit',
            costFormatted: '₹8,999',
            clinicalReason: 'Eliminate cheap perception so visitors feel confident booking high-ticket services.',
          },
          {
            name: 'Commercial Video Bundle (5 High-Retention Reels)',
            costFormatted: '₹8,499',
            clinicalReason: 'Embed dynamic founder video proofs directly into hero conversion paths.',
          },
        ],
        contraindications: [
          'CEASE all performance ad budget increases immediately until conversion rate crosses 2.5%.',
          'DO NOT purchase cheap off-the-shelf WordPress/Wix plugins that degrade Core Web Vitals.',
        ],
        projectedRevenueLift: {
          low: projectedLowLift,
          high: projectedHighLift,
          recoveryTimeDays: 14,
          estimatedRoas: '4.8x - 8.2x',
        },
      };
      break;

    case 'immune':
      prescription = {
        primaryPackage: {
          name: 'Enterprise Visual Brand Identity & Moat System',
          slug: 'graphic-poster-design',
          priceFormatted: '₹18,999',
          timeline: '10-Day Delivery',
          clinicalObjective: 'Cure commoditization disease: Reposition company aesthetic to command 2x - 4x pricing without client pushback.',
          deliverables: [
            'Bespoke Vector Brand Mark & Typography Hierarchy',
            'Design Tokens & Color Psychology Architecture',
            '10x Commercial Ad & Social Proof Posters',
            'Comprehensive Brand Book & Moat Positioning Guidelines',
          ],
        },
        auxiliaryTherapies: [
          {
            name: 'Starter Sprint Web Architecture Upgrade',
            costFormatted: '₹14,999',
            clinicalReason: 'Ensure new premium visual identity is rendered with razor-sharp responsive perfection.',
          },
        ],
        contraindications: [
          'DO NOT offer unprompted discounts or compromise project scope.',
          'STOP using mismatched Canva templates and stock icons.',
        ],
        projectedRevenueLift: {
          low: Math.round(gapRevenue * 0.30),
          high: Math.round(gapRevenue * 0.70),
          recoveryTimeDays: 10,
          estimatedRoas: '3.5x - 6.0x',
        },
      };
      break;

    case 'voice':
      prescription = {
        primaryPackage: {
          name: 'Cinema 4K Commercial Shoot & High-Retention Reel Pod',
          slug: 'advertising-and-business-film-production',
          priceFormatted: '₹49,999',
          timeline: '12-Day Delivery',
          clinicalObjective: 'Break through ad fatigue and organic silence with RED / ARRI 4K cinema commercial production and retention-engineered cuts.',
          deliverables: [
            'Full Commercial Film Direction & On-Set Lighting Crew',
            'RED / ARRI 4K Raw Production with DaVinci Color Grading',
            '5x High-Retention 60s Reels with Kinetic Captions',
            'Sound Design & Audio Mastering for Social Algorithms',
          ],
        },
        auxiliaryTherapies: [
          {
            name: 'Poster Campaign Bundle (10 Social Ads)',
            costFormatted: '₹3,999',
            clinicalReason: 'Pair video ads with static retargeting creatives across Instagram & LinkedIn.',
          },
        ],
        contraindications: [
          'DO NOT post low-resolution smartphone talking head videos with muffled audio.',
          'AVOID generic agency stock footage that degrades brand authenticity.',
        ],
        projectedRevenueLift: {
          low: Math.round(gapRevenue * 0.40),
          high: Math.round(gapRevenue * 0.80),
          recoveryTimeDays: 14,
          estimatedRoas: '5.2x - 9.0x',
        },
      };
      break;

    case 'lungs':
      prescription = {
        primaryPackage: {
          name: 'SEO Technical Authority & Rapid Demand Funnel',
          slug: 'web-development',
          priceFormatted: '₹24,999',
          timeline: '14-Day Delivery',
          clinicalObjective: 'Open up the bronchial airways of organic Google and social search to pump high-intent commercial buyers directly into the business.',
          deliverables: [
            'Deep Semantic JSON-LD Schema Architecture',
            'High-Intent Commercial Keyword Landing Page Pods',
            'Sub-second Edge Server Routing for Instant Indexing',
            'Technical SEO Core Web Vitals Maximization (Score: 99)',
          ],
        },
        auxiliaryTherapies: [
          {
            name: 'Social Media Growth Pack (30 Creatives)',
            costFormatted: '₹14,999',
            clinicalReason: 'Fuel top-of-funnel social awareness with daily branded touchpoints.',
          },
        ],
        contraindications: [
          'DO NOT buy low-quality PBN backlinks or AI-spun blog filler.',
          'DO NOT pause conversion optimization while waiting for traffic.',
        ],
        projectedRevenueLift: {
          low: Math.round(gapRevenue * 0.35),
          high: Math.round(gapRevenue * 0.75),
          recoveryTimeDays: 21,
          estimatedRoas: '4.0x - 7.5x',
        },
      };
      break;

    default: // metabolism
      prescription = {
        primaryPackage: {
          name: 'Enterprise Bespoke Client Portal & Retainer Engine',
          slug: 'web-development',
          priceFormatted: '₹74,999',
          timeline: '21-Day Delivery',
          clinicalObjective: 'Stop client churn: Build dedicated branded client portals, real-time milestone trackers, and automated recurring billing pipelines.',
          deliverables: [
            'Custom Branded Client Portal Module with Secure PIN Access',
            'Real-Time Project Milestone & File Proofing Workspaces',
            'Automated GST Invoicing & Payment Gateway Integration',
            'VIP Founder Hotline & SLA Maintenance Architecture',
          ],
        },
        auxiliaryTherapies: [
          {
            name: 'Complete Visual Brand Identity Kit',
            costFormatted: '₹8,999',
            clinicalReason: 'Make the portal feel like an elite Silicon Valley software product.',
          },
        ],
        contraindications: [
          'STOP sending client progress updates over fragmented WhatsApp chats without logged milestones.',
          'NEVER deliver final assets before invoice settlement is verified in the system.',
        ],
        projectedRevenueLift: {
          low: Math.round(gapRevenue * 0.45),
          high: Math.round(gapRevenue * 0.90),
          recoveryTimeDays: 21,
          estimatedRoas: '6.0x - 11.0x',
        },
      };
      break;
  }

  const auditId = 'audit_' + Math.random().toString(36).substring(2, 9);
  const auditNumber = 'BGA-MED-' + Math.floor(1000 + Math.random() * 9000);
  const auditDate = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return {
    id: auditId,
    auditNumber,
    auditDate,
    leadAuditor: 'Adharsh Katari (Clinical Principal Lead)',
    patient,
    healthIndex,
    clinicalCondition,
    conditionTitle,
    executiveDiagnosis,
    organs,
    criticalBottleneckOrgan,
    prescription,
  };
}
