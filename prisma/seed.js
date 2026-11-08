const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed for B Growth Agency...');

  // 1. Create Default Admin
  const hashedPassword = await bcrypt.hash('ChangeMe@123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@bgrowth.agency' },
    update: {
      password: hashedPassword,
      mustChangePassword: true,
      role: 'SUPER_ADMIN',
    },
    create: {
      name: 'Super Admin',
      email: 'admin@bgrowth.agency',
      password: hashedPassword,
      role: 'SUPER_ADMIN',
      mustChangePassword: true,
    },
  });
  console.log('✅ Admin user created/verified:', admin.email);

  // 2. Site Settings
  const settings = [
    { key: 'siteName', value: 'B Growth Agency' },
    { key: 'tagline', value: 'We Build Brands That Grow' },
    { key: 'description', value: 'High-impact website development, scroll-stopping poster & graphic design, and cinematic video editing designed to scale your business.' },
    { key: 'logoUrl', value: '/logo.png' },
    { key: 'faviconUrl', value: '/logo.png' },
    { key: 'contactEmail', value: 'contact@bgrowth.agency' },
    { key: 'contactPhone', value: '+91 98765 43210' },
    { key: 'whatsappNumber', value: '+919876543210' },
    { key: 'address', value: 'Tech Innovation Hub, 4th Floor, HITEC City, Hyderabad, India' },
    { key: 'businessHours', value: 'Monday - Saturday: 9:00 AM - 7:00 PM IST' },
    { key: 'facebookUrl', value: 'https://facebook.com/bgrowthagency' },
    { key: 'instagramUrl', value: 'https://instagram.com/bgrowthagency' },
    { key: 'linkedinUrl', value: 'https://linkedin.com/company/bgrowthagency' },
    { key: 'twitterUrl', value: 'https://twitter.com/bgrowthagency' },
    { key: 'youtubeUrl', value: 'https://youtube.com/@bgrowthagency' },
    { key: 'maintenanceMode', value: 'false' },
    { key: 'analyticsId', value: 'G-BGROWTH2025' },
    { key: 'footerCopyright', value: '© 2025 B Growth Agency. All rights reserved. Driving digital growth with excellence.' },
  ];

  for (const s of settings) {
    await prisma.siteSetting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: s,
    });
  }
  console.log('✅ Site settings configured');

  // 3. Homepage Content
  const homeData = {
    hero: {
      badge: '🚀 Top Rated Digital Growth Agency',
      headline: 'We Build Brands That Grow & Convert',
      subheadline: 'From high-performance bespoke websites to scroll-stopping graphic designs and cinematic video edits, we transform ambition into market leadership.',
      primaryCta: 'Get a Free Quote',
      secondaryCta: 'View Our Work',
      stats: [
        { label: 'Projects Delivered', value: '180+' },
        { label: 'Happy Clients', value: '95+' },
        { label: 'Client Satisfaction', value: '99.4%' },
        { label: 'Average ROI Boost', value: '3.8x' },
      ],
    },
    whyUs: {
      badge: 'Why Choose B Growth',
      title: 'Built For Speed, Aesthetics & Measurable Growth',
      description: 'We don’t just deliver deliverables; we partner with you to engineer brand authority, seamless user journeys, and tangible business revenue.',
      points: [
        { title: 'Full-Stack Excellence', desc: 'Modern web tech stacks (Next.js, TypeScript, Tailwind) ensuring sub-second load times and rock-solid reliability.' },
        { title: 'Conversion-Centric Design', desc: 'Graphic designs and visual identities tailored specifically to stop scrolling, engage audiences, and spark action.' },
        { title: 'Cinematic Storytelling', desc: 'High-retention video editing and motion graphics that captivate audiences across YouTube, Instagram, and web.' },
        { title: 'Transparent Collaboration', desc: 'Dedicated project managers, transparent milestone roadmaps, and no hidden fees ever.' },
      ],
    },
    process: {
      badge: 'How We Work',
      title: 'Our 6-Step Proven Growth Framework',
      steps: [
        { step: '01', title: 'Discover', desc: 'Deep dive into your brand goals, target audience demographics, competitive landscape, and KPIs.' },
        { step: '02', title: 'Strategy', desc: 'Formulating the master blueprint, information architecture, wireframes, and creative vision.' },
        { step: '03', title: 'Design', desc: 'Crafting pixel-perfect prototypes, striking graphic posters, visual identity tokens, and style tiles.' },
        { step: '04', title: 'Develop', desc: 'Engineering clean, accessible, SEO-optimized web code and high-fidelity video production.' },
        { step: '05', title: 'Launch', desc: 'Rigorous multi-device QA testing, Lighthouse performance auditing, and seamless production launch.' },
        { step: '06', title: 'Grow', desc: 'Continuous performance monitoring, conversion rate optimization, and proactive creative scaling.' },
      ],
    },
    statsSection: {
      stat1: { number: '180+', label: 'Projects Completed' },
      stat2: { number: '98%', label: 'Client Retention Rate' },
      stat3: { number: '6+', label: 'Years Of Excellence' },
      stat4: { number: '15+', label: 'Design Awards & Mentions' },
    },
    ctaBanner: {
      headline: 'Ready To Scale Your Digital Presence?',
      subheadline: 'Book a free 30-minute discovery consultation and get a tailored growth proposal within 24 hours.',
      buttonText: 'Start Your Project Today',
    },
  };

  await prisma.pageContent.upsert({
    where: { key: 'home' },
    update: { data: JSON.stringify(homeData) },
    create: { key: 'home', data: JSON.stringify(homeData) },
  });
  console.log('✅ Page content initialized');

  // 4. Services (8-10 services with realistic details & pricing tiers)
  const servicesData = [
    {
      slug: 'custom-website-development',
      title: 'Custom Website Development',
      category: 'Web Development',
      coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
      gallery: JSON.stringify([
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
        'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80',
      ]),
      shortDescription: 'Modern, blazing-fast, mobile-responsive web applications built with Next.js, React, and Tailwind CSS.',
      fullDescription: 'We build enterprise-grade websites engineered for conversions, blazing performance, and seamless user experiences. Whether you need a high-converting corporate presence, a dynamic SaaS web application, or an e-commerce platform, our engineering standard ensures sub-second page loads, impeccable SEO architecture, and effortless admin management.',
      features: JSON.stringify([
        'Custom Next.js & React App Architecture',
        'Mobile-First & Pixel-Perfect Responsive Design',
        'Search Engine Optimization (Technical & On-Page)',
        'Content Management System (CMS) Integration',
        'Speed Optimization with 95+ Lighthouse Score',
        'Security Hardened & SSL Configured',
      ]),
      deliverables: JSON.stringify([
        'Full responsive website with clean source code',
        'Interactive Admin Dashboard for content updates',
        'Custom domain setup, DNS and SSL configuration',
        '30 days post-launch technical warranty and training',
      ]),
      pricingTiers: JSON.stringify([
        {
          name: 'Starter Website',
          price: 14999,
          currency: '₹',
          features: ['Up to 5 Pages', 'Mobile Responsive', 'Contact Form & WhatsApp Integration', 'Basic SEO Setup', '1 Month Support'],
          isPopular: false,
        },
        {
          name: 'Business Growth',
          price: 34999,
          currency: '₹',
          features: ['Up to 12 Pages', 'Full Custom CMS / Admin Portal', 'Blog & Case Studies System', 'Advanced Animations & Speed Boost', '3 Months Dedicated Support'],
          isPopular: true,
        },
        {
          name: 'Enterprise Bespoke',
          price: 74999,
          currency: '₹',
          features: ['Unlimited Pages / Custom Modules', 'API Integrations & E-Commerce / Portals', 'Automated Workflows & CRM Sync', 'Dedicated Lead Architect', '6 Months Priority Support'],
          isPopular: false,
        },
      ]),
      startingPrice: 14999,
      icon: 'Code2',
      isFeatured: true,
      order: 1,
      status: 'published',
      seoTitle: 'Custom Website Development Services | B Growth Agency',
      seoDescription: 'High-performance Next.js and React website development that drives traffic and elevates your brand.',
      isDemo: true,
    },
    {
      slug: 'poster-and-graphic-design',
      title: 'Poster & Graphic Design',
      category: 'Poster & Graphic Design',
      coverImage: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1200&q=80',
      gallery: JSON.stringify([
        'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80',
        'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&q=80',
        'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80',
      ]),
      shortDescription: 'Scroll-stopping marketing posters, social media banners, event flyers, and commercial print collateral.',
      fullDescription: 'Great design is clear communication that sparks emotion. Our graphic design team crafts unforgettable visual graphics—from promotional event posters and billboard banners to viral Instagram carousels and corporate brochures. We blend typography, composition, and brand psychology to ensure your visual assets command attention in any feed or physical billboard.',
      features: JSON.stringify([
        'High-Resolution Print-Ready Artwork (300 DPI CMYK)',
        'Social Media Optimized Formats (1:1, 9:16, 16:9)',
        'Bespoke Typography & Color Theory Hierarchy',
        'Editable Master Files (PSD, AI, or Figma)',
        'Fast Turnaround within 24-48 Hours',
        'Unlimited Revisions during draft review',
      ]),
      deliverables: JSON.stringify([
        'Final artwork in PNG, JPG, PDF-print formats',
        'Fully organized source files (PSD / AI / Figma)',
        'Variants for Instagram, Facebook, and LinkedIn',
      ]),
      pricingTiers: JSON.stringify([
        {
          name: 'Single Poster',
          price: 499,
          currency: '₹',
          features: ['1 Custom Poster Design', 'High Res Web & Print File', '2 Revision Rounds', '48h Delivery'],
          isPopular: false,
        },
        {
          name: 'Brand Campaign Pack',
          price: 3999,
          currency: '₹',
          features: ['10 Multi-format Creative Designs', 'Social Media Ads & Story Resizes', 'Source Files Included', 'Priority 24h Turnaround'],
          isPopular: true,
        },
        {
          name: 'Monthly Creative Retainer',
          price: 9999,
          currency: '₹',
          features: ['30 Custom Graphics / Month', 'Brochures, Posters & Banners', 'Dedicated Lead Designer', 'Unlimited Revisions'],
          isPopular: false,
        },
      ]),
      startingPrice: 499,
      icon: 'Palette',
      isFeatured: true,
      order: 2,
      status: 'published',
      seoTitle: 'Professional Poster & Graphic Design | B Growth Agency',
      seoDescription: 'Elevate your brand with eye-catching marketing posters, print collateral, and social media designs.',
      isDemo: true,
    },
    {
      slug: 'cinematic-video-editing',
      title: 'Cinematic Video Editing & Motion Graphics',
      category: 'Video Editing',
      coverImage: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&q=80',
      gallery: JSON.stringify([
        'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80',
        'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&q=80',
      ]),
      shortDescription: 'High-retention video editing, Reels, YouTube long-form, corporate explainers, and motion graphics.',
      fullDescription: 'In an attention-economy world, retention is everything. We turn raw footage into high-converting video masterpieces. Our post-production workflow includes pacing cuts, dynamic sound design, kinetic typography, color grading, sound effects, and 4K mastering. Whether creating viral TikToks and YouTube Shorts or cinematic brand commercials, we ensure viewers stay hooked from the first second.',
      features: JSON.stringify([
        'Fast-Paced Hook Editing & Narrative Flow',
        'Kinetic Subtitles & Animated Overlays',
        'Hollywood-Grade Color Grading & Lut Application',
        'Pro Sound Design & Licensed Music Track Sync',
        'Motion Graphics & Logo Introductions',
        'Export Optimized for 4K YouTube & 1080p Vertical Reels',
      ]),
      deliverables: JSON.stringify([
        'Full HD / 4K rendered video files',
        'Vertical (9:16) and Landscape (16:9) cuts',
        'Thumbnail design included for YouTube / Reels',
      ]),
      pricingTiers: JSON.stringify([
        {
          name: 'Single Reel / Short',
          price: 1999,
          currency: '₹',
          features: ['Up to 60 Seconds', 'Dynamic Captions & Sound Effects', 'Engaging B-Roll & Transitions', '48h Turnaround'],
          isPopular: false,
        },
        {
          name: 'Content Creator Pack',
          price: 7999,
          currency: '₹',
          features: ['5 Short-form Reels + 1 Long-form Video', 'Hook Optimization', 'Custom Motion Graphics', 'Thumbnails Included'],
          isPopular: true,
        },
        {
          name: 'Commercial Brand Film',
          price: 18999,
          currency: '₹',
          features: ['Full Commercial / Brand Explainer', 'Script Consulting & Storyboard', 'Advanced VFX & 3D Logo Motion', 'Full Licensing Included'],
          isPopular: false,
        },
      ]),
      startingPrice: 1999,
      icon: 'Video',
      isFeatured: true,
      order: 3,
      status: 'published',
      seoTitle: 'Cinematic Video Editing & Post Production | B Growth Agency',
      seoDescription: 'Turn raw clips into viral reels, polished YouTube episodes, and captivating brand videos.',
      isDemo: true,
    },
    {
      slug: 'brand-identity-and-strategy',
      title: 'Brand Identity & Strategy',
      category: 'Branding',
      coverImage: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=1200&q=80',
      gallery: JSON.stringify([
        'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=800&q=80',
      ]),
      shortDescription: 'Memorable logos, color schemes, typography guides, and cohesive brand guidelines that stand out.',
      fullDescription: 'A strong brand is more than just a logo; it is the entire emotional signature your business leaves on your customers. We engineer complete brand identity systems that communicate your values, differentiate you from rivals, and instill immediate trust.',
      features: JSON.stringify([
        'Primary & Secondary Logo Variations',
        'Curated Typography & Color Palette Architecture',
        'Comprehensive 30+ Page Brand Guidelines PDF',
        'Stationery Design (Business cards, Letterheads, Envelopes)',
        'Social Media Kit & Favicon Suite',
      ]),
      deliverables: JSON.stringify([
        'Vector assets (SVG, EPS, AI, PDF)',
        'Brand Stylebook guidelines',
        'Social media banner templates',
      ]),
      pricingTiers: JSON.stringify([
        {
          name: 'Core Identity',
          price: 12999,
          currency: '₹',
          features: ['Logo Suite (3 concepts)', 'Color & Font Selection', 'High Res Formats', 'Basic Brand Sheet'],
          isPopular: false,
        },
        {
          name: 'Full Brand System',
          price: 24999,
          currency: '₹',
          features: ['Complete Brand Guidelines', 'Full Stationery Kit', 'Social Media Templates', 'Packaging Guidelines'],
          isPopular: true,
        },
      ]),
      startingPrice: 12999,
      icon: 'Sparkles',
      isFeatured: true,
      order: 4,
      status: 'published',
      seoTitle: 'Brand Identity & Logo Design | B Growth Agency',
      seoDescription: 'Transform your business with world-class branding, logos, and style systems.',
      isDemo: true,
    },
    {
      slug: 'social-media-growth-marketing',
      title: 'Social Media Growth & Management',
      category: 'Social Media',
      coverImage: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&q=80',
      gallery: JSON.stringify([
        'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
      ]),
      shortDescription: 'End-to-end social media handling, content calendar, caption copywriting, and community growth.',
      fullDescription: 'Grow a loyal, paying following across Instagram, LinkedIn, and Facebook. We handle creative ideation, graphic design, caption copywriting, hashtag strategy, scheduling, and community engagement.',
      features: JSON.stringify([
        'Monthly Content Calendar & Theme Planning',
        'High-Converting Graphic Carousel & Reel Posts',
        'Copywriting with Engaging Calls to Action',
        'Hashtag Research & Audience Targeting',
        'Monthly Performance & Analytics Reports',
      ]),
      deliverables: JSON.stringify([
        'Scheduled posts across channels',
        'Monthly ROI and follower insights report',
      ]),
      pricingTiers: JSON.stringify([
        {
          name: 'Starter Social',
          price: 9999,
          currency: '₹',
          features: ['12 Posts per Month', 'Copywriting & Hashtags', 'Monthly Analytics', 'Instagram & FB'],
          isPopular: false,
        },
        {
          name: 'Aggressive Growth',
          price: 21999,
          currency: '₹',
          features: ['24 Posts + 8 Reels / Month', 'Community Management', 'Ad Campaign Management', 'LinkedIn, IG, FB & X'],
          isPopular: true,
        },
      ]),
      startingPrice: 9999,
      icon: 'Share2',
      isFeatured: false,
      order: 5,
      status: 'published',
      seoTitle: 'Social Media Marketing & Management | B Growth Agency',
      seoDescription: 'Accelerate your digital footprint with expert social media strategy and management.',
      isDemo: true,
    },
    {
      slug: 'search-engine-optimization',
      title: 'Search Engine Optimization (SEO)',
      category: 'SEO',
      coverImage: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=1200&q=80',
      gallery: JSON.stringify([
        'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=800&q=80',
      ]),
      shortDescription: 'Rank #1 on Google with technical SEO audits, high-intent keyword targeting, and backlink authority.',
      fullDescription: 'Organic search remains the highest-converting digital channel. Our white-hat SEO strategy drives long-term compound growth by fixing technical site errors, optimizing schema markup, producing content that ranks, and building domain authority.',
      features: JSON.stringify([
        'Comprehensive Technical SEO & Speed Audit',
        'Competitor Keyword Gap Analysis',
        'On-Page Schema & Metadata Optimization',
        'High-Quality Content Strategy & Articles',
        'Google Search Console & GA4 Setup',
      ]),
      deliverables: JSON.stringify([
        'Monthly ranking reports',
        'Implemented code enhancements and content briefs',
      ]),
      pricingTiers: JSON.stringify([
        {
          name: 'Local SEO Audit & Fix',
          price: 7999,
          currency: '₹',
          features: ['Google Business Profile Setup', 'On-Page Fixes for 10 Pages', 'Local Citations', '30-Day Audit'],
          isPopular: false,
        },
        {
          name: 'National Ranking Plan',
          price: 19999,
          currency: '₹',
          features: ['Complete Technical & Content SEO', '4 SEO Blog Posts Included', 'Backlink Building Campaign', 'Weekly Keyword Tracking'],
          isPopular: true,
        },
      ]),
      startingPrice: 7999,
      icon: 'TrendingUp',
      isFeatured: false,
      order: 6,
      status: 'published',
      seoTitle: 'SEO & Organic Growth Services | B Growth Agency',
      seoDescription: 'Dominate Google search results and capture high-intent commercial leads with proven SEO.',
      isDemo: true,
    },
    {
      slug: 'ui-ux-design-systems',
      title: 'UI/UX & Product Design',
      category: 'Web Development',
      coverImage: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1200&q=80',
      gallery: JSON.stringify([
        'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&q=80',
      ]),
      shortDescription: 'Intuitive user experiences, wireframes, and modern design systems in Figma built for effortless conversion.',
      fullDescription: 'We design intuitive digital products that users love. From SaaS dashboards and mobile applications to high-conversion checkout flows, we conduct user research, interactive wireframing, and design system creation.',
      features: JSON.stringify([
        'User Journey Mapping & Wireframes',
        'Interactive Figma Clickable Prototypes',
        'Component-Driven Design Systems',
        'Developer Handoff with Design Tokens',
      ]),
      deliverables: JSON.stringify([
        'Figma master files with components & auto-layout',
        'Design specification documentation',
      ]),
      pricingTiers: JSON.stringify([
        {
          name: 'App Wireframing',
          price: 15999,
          currency: '₹',
          features: ['Up to 8 Key Screens', 'UX Wireframes', 'Clickable Prototype'],
          isPopular: false,
        },
        {
          name: 'Full Product Design System',
          price: 44999,
          currency: '₹',
          features: ['Complete App Design (25+ Screens)', 'Design System with Tokens', 'Developer Handoff', 'User Testing'],
          isPopular: true,
        },
      ]),
      startingPrice: 15999,
      icon: 'Layout',
      isFeatured: false,
      order: 7,
      status: 'published',
      seoTitle: 'UI/UX Design & Product Prototyping | B Growth Agency',
      seoDescription: 'Modern Figma prototypes and user interfaces engineered for delightful user experiences.',
      isDemo: true,
    },
    {
      slug: 'ecommerce-store-solutions',
      title: 'E-Commerce Store Setup & Scaling',
      category: 'Web Development',
      coverImage: 'https://images.unsplash.com/photo-1556742049-0a67e55722ee?w=1200&q=80',
      gallery: JSON.stringify([
        'https://images.unsplash.com/photo-1556742049-0a67e55722ee?w=800&q=80',
      ]),
      shortDescription: 'High-converting online stores with secure checkout, inventory management, and automated shipping.',
      fullDescription: 'Sell more online with custom storefronts designed for speed and higher average order value (AOV). We integrate seamless payment gateways (Razorpay, Stripe), automated inventory tracking, and abandon cart recovery.',
      features: JSON.stringify([
        'Custom E-Commerce Architecture',
        'Multi-Currency & Payment Gateway Integration',
        'Abandoned Cart Automated Recovery',
        'Product Catalog Management & Filtering',
      ]),
      deliverables: JSON.stringify([
        'Fully configured e-commerce platform',
        'Payment gateway approval & integration',
      ]),
      pricingTiers: JSON.stringify([
        {
          name: 'Boutique Store',
          price: 24999,
          currency: '₹',
          features: ['Up to 50 Products', 'Payment Gateway Integration', 'Mobile Optimized', '1 Month Support'],
          isPopular: false,
        },
        {
          name: 'High-Volume Enterprise',
          price: 49999,
          currency: '₹',
          features: ['Unlimited Products', 'Advanced Upsells & Cross-sells', 'ERP / Inventory Sync', '3 Months Dedicated Support'],
          isPopular: true,
        },
      ]),
      startingPrice: 24999,
      icon: 'ShoppingBag',
      isFeatured: false,
      order: 8,
      status: 'published',
      seoTitle: 'E-Commerce Store Development | B Growth Agency',
      seoDescription: 'High-converting online shopping platforms built for scale, speed, and sales.',
      isDemo: true,
    },
  ];

  for (const s of servicesData) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: s,
      create: s,
    });
  }
  console.log(`✅ ${servicesData.length} Services created/updated`);

  // 5. Portfolio Items (12+ items across Websites, Poster Design, Edited Video)
  const portfolioData = [
    // WEBSITES
    {
      slug: 'apex-fintech-dashboard-and-portal',
      title: 'Apex Financial Technologies Platform',
      type: 'Website',
      category: 'Web Development',
      clientName: 'Apex Wealth Partners',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&q=80',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
      ]),
      videoUrl: null,
      liveUrl: 'https://apexwealth-demo.example.com',
      description: 'A complete corporate rebrand and web platform overhaul for an institutional wealth asset management firm with $400M+ AUM.',
      challenge: 'Their existing website was built on an outdated CMS with 8-second page loads, poor mobile responsiveness, and zero lead capture integration.',
      solution: 'Re-engineered the platform using Next.js 14 App Router, TypeScript, and Tailwind CSS. Implemented interactive portfolio calculators and automated Calendly sync.',
      results: 'Page load speed decreased to 0.7s, organic search inquiries increased by 240%, and quarterly qualified inbound consultations surged by 65%.',
      toolsUsed: JSON.stringify(['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Prisma', 'Chart.js']),
      completionDate: 'October 2025',
      isFeatured: true,
      tags: JSON.stringify(['FinTech', 'Next.js', 'High Conversion', 'Modern UI']),
      order: 1,
      status: 'published',
      isDemo: true,
    },
    {
      slug: 'lumina-luxury-interiors-showcase',
      title: 'Lumina Architectural & Interior Studios',
      type: 'Website',
      category: 'Web Development',
      clientName: 'Lumina Design Lab',
      thumbnail: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1000&q=80',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80',
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80',
      ]),
      videoUrl: null,
      liveUrl: 'https://lumina-interiors.example.com',
      description: 'An editorial visual portfolio website designed for an award-winning luxury interior architecture practice.',
      challenge: 'Showcasing ultra-high-resolution architectural photography without degrading mobile loading speed.',
      solution: 'Built an adaptive image pipeline with blurred placeholders and smooth parallax transitions.',
      results: 'Won a CSS Design Award and secured 14 high-value interior contract inquiries within the first 60 days.',
      toolsUsed: JSON.stringify(['React', 'Next.js', 'Framer Motion', 'Tailwind CSS']),
      completionDate: 'September 2025',
      isFeatured: true,
      tags: JSON.stringify(['Luxury', 'Portfolio', 'Architecture', 'Animations']),
      order: 2,
      status: 'published',
      isDemo: true,
    },
    {
      slug: 'zenith-ai-saas-marketing-landing',
      title: 'Zenith AI Enterprise Copilot',
      type: 'Website',
      category: 'Web Development',
      clientName: 'Zenith Intelligence Inc',
      thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1000&q=80',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80',
      ]),
      videoUrl: null,
      liveUrl: 'https://zenithai.example.com',
      description: 'High-conversion SaaS marketing website and interactive feature documentation for an AI developer platform.',
      challenge: 'Explain complex machine learning pipelines simply while capturing enterprise waitlist signups.',
      solution: 'Created interactive feature simulators, dark-mode toggle, and a frictionless multi-step waitlist form.',
      results: 'Over 12,000 developers joined the waitlist within 3 weeks of public launch.',
      toolsUsed: JSON.stringify(['Next.js', 'Tailwind CSS', 'Lucide React', 'Zod']),
      completionDate: 'August 2025',
      isFeatured: false,
      tags: JSON.stringify(['SaaS', 'AI', 'Landing Page', 'B2B']),
      order: 3,
      status: 'published',
      isDemo: true,
    },
    {
      slug: 'pulse-health-organic-nutrition-store',
      title: 'Pulse Organic Nutrition E-Commerce',
      type: 'Website',
      category: 'Web Development',
      clientName: 'Pulse Superfoods Ltd',
      thumbnail: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&q=80',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&q=80',
      ]),
      videoUrl: null,
      liveUrl: 'https://pulse-organic.example.com',
      description: 'A direct-to-consumer e-commerce storefront with subscription delivery and instant Razorpay checkout.',
      challenge: 'High cart abandonment rate on their prior platform due to slow checkout and unintuitive navigation.',
      solution: 'Custom 2-step frictionless checkout with instant UPI, debit, and credit card processing.',
      results: 'Conversion rate jumped from 1.8% to 4.3%, boosting monthly revenue by ₹1.2M.',
      toolsUsed: JSON.stringify(['Next.js', 'Prisma', 'Razorpay API', 'Tailwind']),
      completionDate: 'July 2025',
      isFeatured: false,
      tags: JSON.stringify(['E-Commerce', 'D2C', 'Payments', 'Health']),
      order: 4,
      status: 'published',
      isDemo: true,
    },

    // POSTER DESIGN
    {
      slug: 'solaria-music-festival-branding-poster',
      title: 'Solaria Electro-Acoustic Festival Poster',
      type: 'Poster Design',
      category: 'Poster & Graphic Design',
      clientName: 'Solaria Music Festival',
      thumbnail: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1000&q=80',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80',
        'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&q=80',
      ]),
      videoUrl: null,
      liveUrl: null,
      description: 'Visual identity and poster campaign for a 3-day open-air music and arts festival in Goa.',
      challenge: 'Design a poster that stood out on physical street billboards while also driving viral shares on Instagram.',
      solution: 'Crafted custom psychedelic typography fused with retro-futuristic gradient accents and clear lineup hierarchy.',
      results: 'Festival tickets sold out in under 48 hours; posters were physically collected as commemorative merchandise.',
      toolsUsed: JSON.stringify(['Adobe Photoshop', 'Adobe Illustrator', 'Typography Master', 'Figma']),
      completionDate: 'November 2025',
      isFeatured: true,
      tags: JSON.stringify(['Event Poster', 'Typography', 'Music Festival', 'Print & Digital']),
      order: 5,
      status: 'published',
      isDemo: true,
    },
    {
      slug: 'urban-kickz-sneaker-launch-key-visual',
      title: 'Urban Kickz Limited Edition Sneaker Drop',
      type: 'Poster Design',
      category: 'Poster & Graphic Design',
      clientName: 'Urban Kickz Apparel',
      thumbnail: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=1000&q=80',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=1200&q=80',
      ]),
      videoUrl: null,
      liveUrl: null,
      description: 'A striking streetwear advertising poster set for the exclusive launch of the "Velocity 9" street sneaker.',
      challenge: 'Create visual adrenaline echoing speed, urban grit, and prestige.',
      solution: 'Combined 3D product rendering, neon cyber-typography, and high-contrast motion blurs.',
      results: '3,000 limited pairs sold out within 14 minutes of drop announcement.',
      toolsUsed: JSON.stringify(['Illustrator', 'Photoshop', 'Blender 3D']),
      completionDate: 'October 2025',
      isFeatured: true,
      tags: JSON.stringify(['Streetwear', 'Fashion', 'Product Poster', '3D Graphics']),
      order: 6,
      status: 'published',
      isDemo: true,
    },
    {
      slug: 'tech-summit-hyderabad-conference-posters',
      title: 'Global Tech Nexus 2025 Conference Series',
      type: 'Poster Design',
      category: 'Poster & Graphic Design',
      clientName: 'Tech Nexus India',
      thumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1000&q=80',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80',
      ]),
      videoUrl: null,
      liveUrl: null,
      description: 'Full collateral and poster package for a premier 2-day tech innovation summit featuring 50+ keynote speakers.',
      challenge: 'Organize dense schedule, keynote profiles, and sponsor brand marks cleanly without visual clutter.',
      solution: 'Employed an architectural Swiss grid system with electric blue accents and bold sans-serif display headers.',
      results: 'Over 4,500 corporate attendees navigated event halls seamlessly through our signage and promotional posters.',
      toolsUsed: JSON.stringify(['InDesign', 'Illustrator', 'Figma']),
      completionDate: 'September 2025',
      isFeatured: false,
      tags: JSON.stringify(['Corporate', 'Conference', 'Grid System', 'Collateral']),
      order: 7,
      status: 'published',
      isDemo: true,
    },
    {
      slug: 'roast-and-brew-artisanal-coffee-posters',
      title: 'Roast & Brew Artisan Coffeehouse Series',
      type: 'Poster Design',
      category: 'Poster & Graphic Design',
      clientName: 'Roast & Brew Specialty Coffee',
      thumbnail: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1000&q=80',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&q=80',
      ]),
      videoUrl: null,
      liveUrl: null,
      description: 'A warm, tactile print poster collection celebrating artisanal single-origin coffee bean origins.',
      challenge: 'Convey organic authenticity and craft heritage rather than generic commercial aesthetics.',
      solution: 'Used custom linocut style vector illustrations, earth-toned palettes, and textured paper backgrounds.',
      results: 'Retail bean pack purchases surged by 42% after poster installation in 6 cafe locations.',
      toolsUsed: JSON.stringify(['Procreate', 'Photoshop', 'Illustrator']),
      completionDate: 'July 2025',
      isFeatured: false,
      tags: JSON.stringify(['Artisanal', 'Illustration', 'Food & Beverage', 'Packaging']),
      order: 8,
      status: 'published',
      isDemo: true,
    },

    // VIDEO EDITING
    {
      slug: 'hyperdrive-ev-launch-commercial',
      title: 'HyperDrive Next-Gen EV Cinematic Commercial',
      type: 'Edited Video',
      category: 'Video Editing',
      clientName: 'HyperDrive Motors',
      thumbnail: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=1000&q=80',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=1200&q=80',
      ]),
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Clean embeddable dummy video
      liveUrl: 'https://hyperdrive.example.com/reveal',
      description: 'A 90-second adrenaline-fueled launch commercial showcasing an electric sports vehicle on coastal highways.',
      challenge: 'Transform raw multi-cam drone and gimbal footage into a heart-thumping commercial with flawless sound sync.',
      solution: 'Crafted dynamic speed ramping, custom engine sub-bass audio mastering, and sleek kinetic graphic HUD overlays.',
      results: 'Accumulated over 2.4 Million views across YouTube and Instagram in the first week.',
      toolsUsed: JSON.stringify(['Adobe Premiere Pro', 'After Effects', 'DaVinci Resolve', 'iZotope RX']),
      completionDate: 'November 2025',
      isFeatured: true,
      tags: JSON.stringify(['Commercial', 'Color Grading', 'Sound Design', 'Motion Graphics']),
      order: 9,
      status: 'published',
      isDemo: true,
    },
    {
      slug: 'fitverse-app-high-retention-reels-pack',
      title: 'FitVerse Fitness App Viral Reels Series',
      type: 'Edited Video',
      category: 'Video Editing',
      clientName: 'FitVerse Technologies',
      thumbnail: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1000&q=80',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&q=80',
      ]),
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      liveUrl: 'https://fitverse.example.com',
      description: 'A pack of 15 high-retention short-form Instagram Reels and TikToks engineered for maximum watch time.',
      challenge: 'Overcome high drop-off rates in the first 3 seconds of social fitness content.',
      solution: 'Engineered high-velocity visual hooks, animated sound effects, dynamic emojis, and punchy captions.',
      results: 'Average watch duration increased by 84%, generating 48,000 organic app downloads.',
      toolsUsed: JSON.stringify(['Premiere Pro', 'CapCut Pro', 'After Effects']),
      completionDate: 'October 2025',
      isFeatured: true,
      tags: JSON.stringify(['Reels', 'TikTok', 'Viral Hooks', 'High Retention']),
      order: 10,
      status: 'published',
      isDemo: true,
    },
    {
      slug: 'founder-stories-documentary-series',
      title: 'Venture Voices: Tech Founder Mini-Doc',
      type: 'Edited Video',
      category: 'Video Editing',
      clientName: 'Elevate Ventures',
      thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1000&q=80',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&q=80',
      ]),
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      liveUrl: 'https://elevateventures.example.com/stories',
      description: 'A 12-minute documentary-style interview profiling visionary startup founders and their journey to Series A.',
      challenge: 'Condense 6 hours of raw interview and b-roll footage into an emotionally compelling narrative arc.',
      solution: 'Wove acoustic orchestral scoring, subtle DaVinci film-look color grade, and archival photo animation.',
      results: 'Featured on TechCrunch and won Best Corporate Documentary at the Digital Media Summit.',
      toolsUsed: JSON.stringify(['DaVinci Resolve Studio', 'Premiere Pro', 'Logic Pro']),
      completionDate: 'September 2025',
      isFeatured: false,
      tags: JSON.stringify(['Documentary', 'Storytelling', 'Color Grading', 'Interview']),
      order: 11,
      status: 'published',
      isDemo: true,
    },
    {
      slug: 'aeroflow-3d-product-explainer-animation',
      title: 'AeroFlow Ergonomic Chair 3D Explainer',
      type: 'Edited Video',
      category: 'Video Editing',
      clientName: 'AeroFlow Ergonomics',
      thumbnail: 'https://images.unsplash.com/photo-1580481077195-c3a82105e3b5?w=1000&q=80',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1580481077195-c3a82105e3b5?w=1200&q=80',
      ]),
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      liveUrl: 'https://aeroflow.example.com',
      description: 'A 3D product animation and video edit showcasing the lumbar mechanics and internal materials of an ergonomic task chair.',
      challenge: 'Explain internal mechanical engineering without boring consumer viewers.',
      solution: 'Used transparent x-ray exploded animations, rhythmic sound foley, and elegant typography labels.',
      results: 'Kickstarter campaign achieved 420% of its funding goal within 5 days.',
      toolsUsed: JSON.stringify(['After Effects', 'Cinema 4D', 'Premiere Pro']),
      completionDate: 'August 2025',
      isFeatured: false,
      tags: JSON.stringify(['Product Explainer', '3D Motion', 'Kickstarter', 'VFX']),
      order: 12,
      status: 'published',
      isDemo: true,
    },
  ];

  for (const p of portfolioData) {
    await prisma.portfolioItem.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
  }
  console.log(`✅ ${portfolioData.length} Portfolio items created/updated`);

  // 6. Testimonials (6 items)
  const testimonials = [
    {
      clientName: 'Rajesh Varma',
      clientRole: 'Managing Director',
      company: 'Apex Wealth Partners',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
      content: 'B Growth Agency delivered beyond our wildest expectations. Our new Next.js platform is blazing fast, and the credibility boost has directly helped us sign institutional accounts. Their attention to detail is world-class.',
      rating: 5,
      isFeatured: true,
      order: 1,
      isDemo: true,
    },
    {
      clientName: 'Priya Sundaram',
      clientRole: 'Head of Marketing',
      company: 'FitVerse Technologies',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
      content: 'Their video editing team is unmatched in retention engineering. The Reels they produced for our fitness app went viral repeatedly, bringing in tens of thousands of organic downloads with zero ad spend.',
      rating: 5,
      isFeatured: true,
      order: 2,
      isDemo: true,
    },
    {
      clientName: 'Alexander Hayes',
      clientRole: 'Creative Director',
      company: 'Solaria Festival Collective',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
      content: 'The poster designs created by B Growth turned heads everywhere. The typography, the color treatment, and the print quality were extraordinary. We sold out in 48 hours!',
      rating: 5,
      isFeatured: true,
      order: 3,
      isDemo: true,
    },
    {
      clientName: 'Ananya Deshmukh',
      clientRole: 'Founder & CEO',
      company: 'Pulse Superfoods',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80',
      content: 'From branding to our e-commerce storefront, B Growth has been our digital powerhouse. Our checkout conversion rate literally doubled after the redesign.',
      rating: 5,
      isFeatured: true,
      order: 4,
      isDemo: true,
    },
    {
      clientName: 'Vikram Sethi',
      clientRole: 'VP Product',
      company: 'Zenith Intelligence',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80',
      content: 'Professional, communicative, and exceptionally skilled. The B Growth team feels like an internal senior engineering and design department rather than an external agency.',
      rating: 5,
      isFeatured: true,
      order: 5,
      isDemo: true,
    },
    {
      clientName: 'Elena Rostova',
      clientRole: 'Principal Architect',
      company: 'Lumina Design Lab',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80',
      content: 'Our architectural portfolio needed to feel like an art gallery. B Growth built a digital masterpiece that honors our work with subtlety and speed. Remarkable team.',
      rating: 5,
      isFeatured: true,
      order: 6,
      isDemo: true,
    },
  ];

  await prisma.testimonial.deleteMany({ where: { isDemo: true } });
  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t });
  }
  console.log(`✅ ${testimonials.length} Testimonials created`);

  // 7. Client Logos (8 items)
  const clientLogos = [
    { name: 'Apex Wealth', logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&q=80', websiteUrl: 'https://example.com', order: 1, isDemo: true },
    { name: 'FitVerse', logoUrl: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=300&q=80', websiteUrl: 'https://example.com', order: 2, isDemo: true },
    { name: 'Solaria', logoUrl: 'https://images.unsplash.com/photo-1516876437184-593fda40c7ce?w=300&q=80', websiteUrl: 'https://example.com', order: 3, isDemo: true },
    { name: 'Pulse Organics', logoUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=300&q=80', websiteUrl: 'https://example.com', order: 4, isDemo: true },
    { name: 'Zenith AI', logoUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=300&q=80', websiteUrl: 'https://example.com', order: 5, isDemo: true },
    { name: 'Lumina Studios', logoUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=300&q=80', websiteUrl: 'https://example.com', order: 6, isDemo: true },
    { name: 'HyperDrive Motors', logoUrl: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=300&q=80', websiteUrl: 'https://example.com', order: 7, isDemo: true },
    { name: 'Urban Kickz', logoUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80', websiteUrl: 'https://example.com', order: 8, isDemo: true },
  ];

  await prisma.clientLogo.deleteMany({ where: { isDemo: true } });
  for (const c of clientLogos) {
    await prisma.clientLogo.create({ data: c });
  }
  console.log(`✅ ${clientLogos.length} Client logos created`);

  // 8. Team Members (4-6 items)
  const teamMembers = [
    {
      name: 'Rohan Sharma',
      role: 'Founder & Head of Strategy',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
      bio: 'Visionary digital strategist with 8+ years scaling high-growth brands through modern engineering and high-converting creative direction.',
      socials: JSON.stringify({ linkedin: 'https://linkedin.com', twitter: 'https://twitter.com' }),
      order: 1,
      isDemo: true,
    },
    {
      name: 'Sneha Reddy',
      role: 'Lead UI/UX & Web Architect',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
      bio: 'Ex-startup founding engineer specializing in Next.js, accessible design systems, and silky 60fps micro-interactions.',
      socials: JSON.stringify({ linkedin: 'https://linkedin.com', github: 'https://github.com' }),
      order: 2,
      isDemo: true,
    },
    {
      name: 'Karthik Menon',
      role: 'Senior Art Director & Graphic Lead',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
      bio: 'Master of visual hierarchy, typography, and poster storytelling with over 200+ commercial print and digital brand campaigns.',
      socials: JSON.stringify({ dribbble: 'https://dribbble.com', instagram: 'https://instagram.com' }),
      order: 3,
      isDemo: true,
    },
    {
      name: 'Aarav Patel',
      role: 'Head of Video & Motion Post-Production',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
      bio: 'Cinematic video editor and colorist obsessed with auditory design, retention pacing, and viral short-form storytelling.',
      socials: JSON.stringify({ youtube: 'https://youtube.com', instagram: 'https://instagram.com' }),
      order: 4,
      isDemo: true,
    },
  ];

  await prisma.teamMember.deleteMany({ where: { isDemo: true } });
  for (const tm of teamMembers) {
    await prisma.teamMember.create({ data: tm });
  }
  console.log(`✅ ${teamMembers.length} Team members created`);

  // 9. Blog Posts (6 items)
  const blogPosts = [
    {
      slug: 'why-nextjs-is-the-best-framework-for-business-growth',
      title: 'Why Next.js 14 is the Ultimate Engine for Modern Brand Websites',
      coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&q=80',
      excerpt: 'Discover how server components, edge rendering, and sub-second loading turn casual visitors into high-ticket paying customers.',
      content: 'In the digital arena, speed is currency. For every second your website takes to load, you lose up to 7% of your potential conversions. In this comprehensive deep-dive, we explore how Next.js Server Components, automatic font optimization, and image pipelines enable modern brands to outrank legacy WordPress websites on Google while delivering an unforgettable consumer experience.',
      category: 'Web Development',
      readTime: '6 min read',
      authorName: 'Sneha Reddy',
      authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&q=80',
      status: 'published',
      publishedAt: new Date(),
      seoTitle: 'Why Next.js is Best for Business Websites | B Growth Insights',
      seoDescription: 'Learn why leading enterprises and fast-growing startups are migrating to Next.js for unmatched speed and SEO.',
      isDemo: true,
    },
    {
      slug: 'the-anatomy-of-a-scroll-stopping-marketing-poster',
      title: 'The Anatomy of a Scroll-Stopping Marketing Poster in 2025',
      coverImage: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1000&q=80',
      excerpt: 'Master the 3-second visual rule, focal typography, and psychological color harmony to captivate crowded feeds.',
      content: 'With average human attention spans hovering around 3 seconds on social media, your graphic assets have a fraction of a second to hook a potential client. We break down the golden triangle of visual weight, negative whitespace breathing room, and typographic hierarchy that transforms ordinary flyers into iconic cultural artifacts.',
      category: 'Graphic Design',
      readTime: '4 min read',
      authorName: 'Karthik Menon',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
      status: 'published',
      publishedAt: new Date(Date.now() - 86400000 * 3),
      seoTitle: 'How to Design High-Converting Posters | B Growth Agency',
      seoDescription: 'Design secrets behind viral posters and advertisements that command attention and drive ticket sales.',
      isDemo: true,
    },
    {
      slug: 'retention-editing-the-secret-to-viral-reels-and-youtube-growth',
      title: 'Retention Editing: The Secret Behind Viral Reels and High YouTube Watch Times',
      coverImage: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1000&q=80',
      excerpt: 'Pacing, SFX micro-cues, dynamic captions, and visual resets: How we keep viewers glued until the final frame.',
      content: 'Algorithms do not care about camera megapixels—they care about retention percentage. If your viewer watches 80% or more of your video, Instagram and YouTube will push it to hundreds of thousands of new users. Here is our proprietary post-production playbook on dynamic hooks, pattern interrupts, sound layering, and kinetic subtitles.',
      category: 'Video Editing',
      readTime: '5 min read',
      authorName: 'Aarav Patel',
      authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
      status: 'published',
      publishedAt: new Date(Date.now() - 86400000 * 7),
      seoTitle: 'Retention Video Editing Strategies for Brands | B Growth Agency',
      seoDescription: 'How professional video editors engineer viral watch times and explosive social follower growth.',
      isDemo: true,
    },
    {
      slug: 'how-to-build-a-memorable-brand-identity-from-scratch',
      title: 'Building an Unforgettable Brand Identity: A Step-by-Step Blueprint',
      coverImage: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=1000&q=80',
      excerpt: 'Why having just a logo is not enough. How to establish brand tone, archetype, and visual cohesion.',
      content: 'True brand authority is created at the intersection of clarity and consistency. Discover how to create comprehensive brand guidelines that empower your team to maintain flawless visual identity across print, web, packaging, and digital advertisements.',
      category: 'Branding',
      readTime: '7 min read',
      authorName: 'Rohan Sharma',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80',
      status: 'published',
      publishedAt: new Date(Date.now() - 86400000 * 12),
      seoTitle: 'Brand Identity Blueprint for Growing Businesses | B Growth',
      seoDescription: 'A practical guide to crafting brand identities that build authority and long-term customer loyalty.',
      isDemo: true,
    },
    {
      slug: 'technical-seo-checklist-for-2025',
      title: 'The Ultimate Technical SEO Checklist for High-Growth Websites',
      coverImage: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=1000&q=80',
      excerpt: 'Core Web Vitals, Structured Schema, Crawl Budgets, and Canonicalization explained simply.',
      content: 'Google updates its ranking algorithms hundreds of times a year. However, technical excellence remains unchanging: clean semantic HTML, structured JSON-LD schemas, blazing Core Web Vitals, and mobile usability will always secure your competitive edge.',
      category: 'SEO',
      readTime: '8 min read',
      authorName: 'Sneha Reddy',
      authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&q=80',
      status: 'published',
      publishedAt: new Date(Date.now() - 86400000 * 18),
      seoTitle: 'Technical SEO Checklist 2025 | B Growth Insights',
      seoDescription: 'Audit and rank your business website with our battle-tested technical SEO checklist.',
      isDemo: true,
    },
    {
      slug: 'social-media-algorithms-decoded',
      title: 'Decoded: How Algorithm Changes in 2025 Favor High-Quality Creative Content',
      coverImage: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1000&q=80',
      excerpt: 'Why quantity without visual excellence is dead, and how to create compound social momentum.',
      content: 'Mass automated posting is being de-ranked across every major platform. Discover why high-effort, custom-crafted visual assets and thoughtful video narratives are capturing 10x more organic reach in current feeds.',
      category: 'Social Media',
      readTime: '5 min read',
      authorName: 'Rohan Sharma',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80',
      status: 'published',
      publishedAt: new Date(Date.now() - 86400000 * 25),
      seoTitle: 'Social Media Algorithms Decoded | B Growth Agency',
      seoDescription: 'Navigate current social media algorithms with high-converting creative content.',
      isDemo: true,
    },
  ];

  for (const b of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: b.slug },
      update: b,
      create: b,
    });
  }
  console.log(`✅ ${blogPosts.length} Blog posts created`);

  // 10. FAQs (8 items)
  const faqs = [
    {
      question: 'What is your typical turnaround time for a custom website?',
      answer: 'A standard 5-to-10 page custom Next.js website typically takes 2 to 4 weeks from discovery to final deployment. More complex custom web portals or e-commerce platforms take 4 to 8 weeks with structured milestone check-ins.',
      category: 'Websites',
      order: 1,
      isDemo: true,
    },
    {
      question: 'How fast can I get a poster or graphic design delivered?',
      answer: 'Individual poster designs and social media graphics are typically delivered within 24 to 48 hours. Express same-day turnaround is also available for urgent event campaigns.',
      category: 'Graphic Design',
      order: 2,
      isDemo: true,
    },
    {
      question: 'What footage do I need to provide for video editing?',
      answer: 'You can simply upload your raw footage (via Google Drive, Dropbox, or WeTransfer) along with any brief notes or scripts. We take care of organizing, cutting, color grading, sound design, and captioning.',
      category: 'Video Editing',
      order: 3,
      isDemo: true,
    },
    {
      question: 'Will I be able to update website content myself without coding?',
      answer: 'Yes! Every website we build includes access to an intuitive, secure Admin Portal where you can edit text, upload images, add portfolio projects, publish blogs, and view leads with zero coding needed.',
      category: 'Websites',
      order: 4,
      isDemo: true,
    },
    {
      question: 'Do you offer revision rounds?',
      answer: 'Absolutely. We include 2 to 3 structured revision rounds on all website and video milestones, and unlimited minor adjustments on graphic design drafts until you are 100% thrilled with the result.',
      category: 'General',
      order: 5,
      isDemo: true,
    },
    {
      question: 'What are your payment terms and options?',
      answer: 'For project-based work, we typically work on a 50% deposit and 50% upon final approval prior to launch. We accept UPI, bank transfers, credit cards, Razorpay, and international wire transfers.',
      category: 'General',
      order: 6,
      isDemo: true,
    },
    {
      question: 'Can you help redesign an existing website that is underperforming?',
      answer: 'Yes, website redesigns and performance overhauls are one of our specialties. We will audit your current site, preserve your existing SEO rankings, and completely re-engineer the UI/UX for speed and conversions.',
      category: 'Websites',
      order: 7,
      isDemo: true,
    },
    {
      question: 'How do we get started on a project together?',
      answer: 'You can submit an inquiry through our Contact page or use the "Get a Quote" multi-step planner. We will get back to you within 24 hours with an actionable roadmap and schedule a discovery call.',
      category: 'General',
      order: 8,
      isDemo: true,
    },
  ];

  await prisma.fAQ.deleteMany({ where: { isDemo: true } });
  for (const f of faqs) {
    await prisma.fAQ.create({ data: f });
  }
  console.log(`✅ ${faqs.length} FAQs created`);

  // 11. Sample Inquiries
  const sampleInquiries = [
    {
      type: 'quote',
      name: 'Vikram Malhotra',
      email: 'vikram@malhotratech.com',
      phone: '+91 99887 76655',
      serviceInterest: 'Custom Website Development',
      budget: '₹50,000 - ₹1,00,000',
      timeline: 'Within 1 Month',
      message: 'Looking to build a high-performance Next.js corporate website for our renewable energy company. Need case studies and career portal.',
      details: JSON.stringify({ pages: '8-12', cmsRequired: true, integrations: ['HubSpot', 'Razorpay'] }),
      status: 'New',
      notes: 'High intent prospect, scheduled follow-up for tomorrow morning.',
    },
    {
      type: 'contact',
      name: 'Deepika Rao',
      email: 'deepika@creativecafes.in',
      phone: '+91 91234 56789',
      serviceInterest: 'Poster & Graphic Design',
      budget: '₹10,000 - ₹25,000',
      timeline: 'Immediate',
      message: 'Need a set of 12 premium posters and Instagram carousel templates for our new artisanal cafe chain opening in Bangalore.',
      status: 'In Progress',
      notes: 'Sample moodboard sent to client on WhatsApp.',
    },
    {
      type: 'quote',
      name: 'Ramesh Chenoy',
      email: 'ramesh@zenmotion.tv',
      phone: '+91 98111 22334',
      serviceInterest: 'Cinematic Video Editing',
      budget: '₹25,000 - ₹50,000',
      timeline: '2-3 Weeks',
      message: 'We have 20 raw interview clips and b-roll that need to be edited into 4 long-form YouTube episodes and 15 viral YouTube Shorts.',
      status: 'Closed',
      notes: 'Contract signed and project completed successfully!',
    },
  ];

  await prisma.inquiry.deleteMany({});
  for (const inq of sampleInquiries) {
    await prisma.inquiry.create({ data: inq });
  }
  console.log(`✅ ${sampleInquiries.length} Sample inquiries initialized`);

  // 12. Newsletter Subscribers
  const subscribers = [
    { email: 'growth.enthusiast@example.com', status: 'active' },
    { email: 'agency.partner@sampledomain.com', status: 'active' },
    { email: 'founder@techstartup.io', status: 'active' },
  ];
  await prisma.newsletterSubscriber.deleteMany({});
  for (const sub of subscribers) {
    await prisma.newsletterSubscriber.create({ data: sub });
  }
  console.log(`✅ ${subscribers.length} Newsletter subscribers initialized`);

  console.log('🎉 Database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
