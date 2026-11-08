# B Growth Agency — Web, Design & Video Studio

A complete, production-grade digital agency platform with a client-facing multi-page website and an enterprise Admin Content Management System (CMS) & Lead CRM.

![B Growth Agency](public/logo.png)

---

## 🚀 Live Demo & Development

- **Local URL:** `http://localhost:3000`
- **Admin Portal:** `http://localhost:3000/admin`
- **Default Super Admin:**
  - **Email:** `admin@bgrowth.agency`
  - **Password:** `ChangeMe@123` *(Prompted for secure change on first login)*

---

## 🎨 Brand & Design System

- **Primary Royal Blue:** `#1F5FE6` (hover: `#1749C0`, dark: `#1243B5`)
- **Outer Canvas:** `#EAECE8` (architectural studio canvas)
- **Graphite Dark Cards:** `#0F1117` / `#181C27`
- **Surface White:** `#FFFFFF`
- **Typography:** Plus Jakarta Sans (Headings) & Inter (Body)
- **Aesthetic:** Swiss-inspired editorial layout, architectural vertical pinstripe grid accents, full-bleed hero banners, rounded cards (12–16px), responsive mobile drawer.

---

## 🛠 Tech Stack

- **Frontend:** Next.js 14 (App Router) + TypeScript + Tailwind CSS + Lucide Icons
- **Backend:** Next.js Server Actions & API Routes
- **Database & ORM:** SQLite + Prisma ORM (production ready for PostgreSQL)
- **Authentication:** Custom JWT with `httpOnly` secure cookies & bcrypt hashing
- **Form Validation:** Zod server-side schemas

---

## 📂 Public Website Pages

1. **Home (`/`):** Full-bleed Royal Blue hero, statistics counter strip, client marquee, core capabilities matrix, featured project showcase, why choose us pillars, 6-step framework, client reviews, FAQ accordion, conversion CTA.
2. **Services (`/services`):** All active agency services with starting prices, feature lists, categories, and direct quote buttons.
3. **Service Detail (`/services/[slug]`):** Category hero, in-depth scope description, feature checklists, guaranteed deliverables, 3-tier pricing plans (Starter / Growth / Pro), and service request form.
4. **Portfolio (`/portfolio`):** Filterable portfolio archive with tabs for Websites, Poster Designs, and Edited Videos, plus keyword search.
5. **Portfolio Detail (`/portfolio/[slug]`):** Case study layout with problem/solution/results ROI, tools used, video player embed for reels/videos, live site links, and next/previous project pagination.
6. **Pricing (`/pricing`):** Fixed-price tier comparison table (Starter, Business, Enterprise) plus a la carte design and video add-on rates.
7. **About (`/about`):** Agency purpose, mission & vision, core values, company milestones timeline, and leadership team grid.
8. **Blog (`/blog` & `/blog/[slug]`):** Digital marketing and engineering articles with reading time and category badges.
9. **Clients (`/clients`):** Verified client ratings, partner brand logo grid, and testimonial quotes.
10. **Contact (`/contact`):** Form connected to admin inbox, studio location, business hours, direct phone, email, and WhatsApp links.
11. **Quote Calculator (`/quote`):** Multi-step project quote wizard with service selection, requirements, timeline, budget, and contact info.
12. **Legal:** Privacy Policy (`/privacy`), Terms of Service (`/terms`), 404 (`/not-found`), and Error boundary (`/error`).

---

## ⚙️ Admin Portal (`/admin`)

- **Secure Login:** Rate-limited authentication, forced password change on first login, session expiration.
- **KPI Dashboard:** Real-time metrics for inquiries, new leads, live services, portfolio items, subscribers, and breakdown charts.
- **Services Manager (`/admin/services`):** Full CRUD with category, pricing tiers JSON, cover image, and SEO meta tags.
- **Portfolio Manager (`/admin/portfolio`):** Full CRUD for Websites, Posters, and Videos with client name, live URLs, YouTube/Vimeo embeds, and tags.
- **Inquiries & Leads CRM (`/admin/inquiries`):** Filterable inbox of contact and quote submissions, status toggles (New / In Progress / Closed), notes, and quick email replies.
- **Newsletter Subscribers (`/admin/subscribers`):** Active subscriber list with CSV export capability.
- **Media Library (`/admin/media`):** Local file storage abstraction layer with preview, file size check, and URL copying.
- **Testimonials Manager (`/admin/testimonials`):** Client review management and featured toggles.
- **Clients/Logos Manager (`/admin/clients`):** Partner brand logo directory.
- **Team Manager (`/admin/team`):** Staff profiles, roles, and social media links.
- **FAQ Manager (`/admin/faqs`):** Accordion questions and answers categorized by topic.
- **Blog Manager (`/admin/blog`):** Article publishing and drafting.
- **Site Settings (`/admin/settings`):** Global contact details, WhatsApp number, SEO defaults, and maintenance mode toggle.
- **Users & Roles (`/admin/users`):** Admin user directory and privilege management.

---

## 💻 Getting Started Locally

### 1. Clone & Install
```bash
git clone https://github.com/katarilakshmipathi3-arch/B-Growth-Agency.git
cd B-Growth-Agency
npm install
```

### 2. Environment Setup
Create a `.env` file in the root directory:
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="bgrowth-agency-production-jwt-secret-key-32chars"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. Initialize Database & Seed
```bash
npx prisma generate
npx prisma db push
node prisma/seed.js
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚀 Deployment Guide

### Deploying to Vercel
1. Push repository to GitHub.
2. Import project in Vercel.
3. For serverless SQLite, use [Turso](https://turso.tech/) (LibSQL) or switch provider in `prisma/schema.prisma` to `postgresql` (Supabase, Neon, or Railway).
4. Set environment variables:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `NEXT_PUBLIC_APP_URL`
5. Deploy!

### Deploying to a Linux VPS (Ubuntu / Debian)
```bash
# Install Node.js 18+ and PM2
npm install -g pm2

# Build the project
npm run build

# Start with PM2
pm2 start npm --name "bgrowth-website" -- start

# Configure Nginx reverse proxy to port 3000 with Certbot SSL
```

---

## 📄 License

Proprietary © B Growth Agency. All rights reserved.
