# SWADESH — Discover India. Wear Culture.

> **India's Premier Cultural Fashion, Handloom & Artisan Marketplace**  
> Celebrating 28 States, 28 Cultures, and Infinite Stories.

[![Next.js](https://img.shields.io/badge/Next.js-16.4.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/Zustand-State_Management-orange?style=for-the-badge)](https://zustand-demo.pmnd.rs/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-Animations-purple?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)
[![GI Certified](https://img.shields.io/badge/GI_Tag-Certified_Artisans-6E171B?style=for-the-badge)](https://ipindia.gov.in/)

---

## Table of Contents

- [1. About SWADESH](#1-about-swadesh)
- [2. Design System & Aesthetics](#2-design-system--aesthetics)
- [3. Complete Feature Overview](#3-complete-feature-overview)
- [4. All 22 Application Routes](#4-all-22-application-routes)
- [5. Interactive Demo Guide & Coupon Codes](#5-interactive-demo-guide--coupon-codes)
- [6. Technology Stack](#6-technology-stack)
- [7. Project Directory Structure](#7-project-directory-structure)
- [8. Installation & Getting Started](#8-installation--getting-started)
- [9. Production Build & Validation](#9-production-build--validation)
- [10. Roadmap & Backend Integration](#10-roadmap--backend-integration)

---

## 1. About SWADESH

India is home to over 7 million handloom weavers and craftspeople—custodians of an unbroken 5,000-year textile civilization. **SWADESH** was created from the ground up to connect these generational master artisans, cooperative societies, and GI-certified weaver clusters directly with conscious global patrons.

### The 4 Pillars of SWADESH

1. **GI Tag Integrity:** We verify all regional weaves against official Geographical Indication origins to defend against industrial powerloom replicas.
2. **Direct-to-Loom Fair Value:** Eliminating commercial middlemen ensures over 80% of retail purchase value flows directly to artisan families and cooperative welfare funds.
3. **Silk Mark & Lab Purity:** Certified pure Mulberry Katan, 12-micron Changthangi cashmere, organic unbleached linen, and tested silver-dipped zari.
4. **The 28 States Living Map:** Comprehensive documentation of traditional attire, regional weaves, and artisan oral histories across all 28 states of the Indian republic.

---

## 2. Design System & Aesthetics

SWADESH avoids generic templates, harsh gradients, or dark-dominated interfaces in favor of a regal, heritage-inspired Indian aesthetic:

| Color Token | Hex Code | Visual Application |
| :--- | :--- | :--- |
| **Warm Ivory** | `#FFF9F0` | Primary app background, clean breathing space |
| **Soft Cream** | `#F5EBDD` / `#FAF4EB` | Subtle card backdrops, form inputs, secondary panels |
| **Deep Maroon** | `#6E171B` / `#4F0E11` | Primary brand accent, regal titles, hero CTAs |
| **Muted Gold** | `#C7A46A` / `#E0C496` | Ornamental borders, rating stars, taglines, accents |
| **Terracotta** | `#C45538` | Warm regional callouts, notifications, wishlist accents |
| **Aged Charcoal** | `#282522` | Legible typography, footer ground, contrast elements |

### Typography

- **Headings & Accents:** `Cormorant Garamond` (Google Fonts variable) — majestic serif reminiscent of classical Indian court inscriptions.
- **Body & Controls:** `Inter` (Google Fonts variable) — modern, accessible, high-legibility geometric sans-serif.

---

## 3. Complete Feature Overview

### 🏛️ Discovery & Storytelling
- **Dynamic Homepage:** Hero banner with cultural imagery, category pills, bestseller showcases, 28 states craft explorer, artisan profiles, textile lore articles, and newsletter.
- **Catalogue & Multi-Filter Search:** Filter by price range, Indian region, state, category, and in-stock status. Sort by price (low/high), popularity, patron ratings, or newest additions.
- **Product Detail Showcase:** High-resolution multi-angle image gallery with thumbnail navigation, size & color selectors, real-time stock counters, artisan guild provenance card, specifications, customer reviews, and review submission.
- **28 States Encyclopedia:** Searchable directory of all 28 Indian states with capital, famous crafts, traditional attire (Men & Women), and products originating from each state.
- **The Cultural Chronicle:** Magazine-style long-form reading experience exploring the anatomy of Banarasi Katan, Kashmiri Pashmina, Kutch Ajrakh, and gossamer Chanderi weaves.

### 🛍️ Cart, Checkout & Orders
- **Persistent Shopping Bag:** Powered by Zustand and `localStorage` with hydration safety.
- **Complimentary Shipping Tier:** Real-time progress bar calculating proximity to the ₹2,500 free shipping threshold.
- **Promo Coupon Engine:** Instant discount calculation with pre-configured promotional codes.
- **Multi-Step Checkout:**
  - *Step 1:* Address form validated via Zod schema (full recipient name, 10-digit mobile number, street address, 6-digit PIN code).
  - *Step 2:* Delivery selection (Direct Loom Standard vs Express Courier).
  - *Step 3:* Simulated payment method (UPI, Cards, Net Banking, COD).
- **Order Lifecycle Stepper:** Post-checkout confirmation screen featuring generated order numbers, tracking numbers (AWB), and visual fulfillment stages (*Order Placed → Confirmed → Packed → Shipped → Delivered*).
- **Personal Wishlist:** Instant bookmarking and quick "Move to Bag" transitions.

### 🧑‍💼 Portals & Dashboards
- **Customer Account:** Saved delivery address book (add, edit, delete, set default), order history with tracking detail modals, and profile settings.
- **Artisan Guild Seller Dashboard:** Overview metrics, 6-month sales revenue SVG bar chart, product management table with an "Add Loom Product" modal, and dispatch status updater (*Packed / Shipped*).
- **Platform Governance Admin Portal:** Platform-wide GMV metrics, active artisan statistics, master catalogue moderation, and cooperative guild approvals.
- **1-Click Demo Role Switcher:** Toggle between **Buyer (Patron)**, **Seller (Artisan Guild)**, and **Admin** from the announcement bar or login page.

---

## 4. All 22 Application Routes

| Route | Page Name | Purpose |
| :--- | :--- | :--- |
| `/` | [Homepage](file:///c:/Users/Hardware/OneDrive/Desktop/Swadesh/src/app/page.tsx) | Brand showcase, 28-states craft explorer, trending heirlooms, and chronicles |
| `/products` | [Product Discovery](file:///c:/Users/Hardware/OneDrive/Desktop/Swadesh/src/app/products/page.tsx) | Filterable, searchable, and sortable handloom catalogue |
| `/products/[slug]` | [Product Detail](file:///c:/Users/Hardware/OneDrive/Desktop/Swadesh/src/app/products/%5Bslug%5D/page.tsx) | Deep-dive product page with gallery, sizing, artisan info, and reviews |
| `/states` | [28 States Directory](file:///c:/Users/Hardware/OneDrive/Desktop/Swadesh/src/app/states/page.tsx) | All 28 Indian states with region filters and craft search |
| `/states/[slug]` | [State Showcase](file:///c:/Users/Hardware/OneDrive/Desktop/Swadesh/src/app/states/%5Bslug%5D/page.tsx) | State traditional attire, GI crafts, textiles, and local products |
| `/stories` | [Artisan Stories](file:///c:/Users/Hardware/OneDrive/Desktop/Swadesh/src/app/stories/page.tsx) | Cultural magazine index with category filtering |
| `/stories/[slug]` | [Story Reader](file:///c:/Users/Hardware/OneDrive/Desktop/Swadesh/src/app/stories/%5Bslug%5D/page.tsx) | Long-form editorial article view with featured products |
| `/cart` | [Shopping Bag](file:///c:/Users/Hardware/OneDrive/Desktop/Swadesh/src/app/cart/page.tsx) | Dedicated cart table, coupon input, shipping tier, and price breakdown |
| `/checkout` | [Checkout Flow](file:///c:/Users/Hardware/OneDrive/Desktop/Swadesh/src/app/checkout/page.tsx) | Multi-step address validation, delivery selection, and payment simulation |
| `/checkout/success` | [Order Confirmation](file:///c:/Users/Hardware/OneDrive/Desktop/Swadesh/src/app/checkout/success/page.tsx) | Invoice summary, airway bill number, and visual tracking stepper |
| `/wishlist` | [Wishlist](file:///c:/Users/Hardware/OneDrive/Desktop/Swadesh/src/app/wishlist/page.tsx) | Saved artisan favorites with one-click add to bag |
| `/account` | [Patron Account](file:///c:/Users/Hardware/OneDrive/Desktop/Swadesh/src/app/account/page.tsx) | Orders tracking modal, address book management, profile updates |
| `/auth/login` | [Sign In](file:///c:/Users/Hardware/OneDrive/Desktop/Swadesh/src/app/auth/login/page.tsx) | Patron login with 1-click Demo Role Switcher |
| `/auth/register` | [Registration](file:///c:/Users/Hardware/OneDrive/Desktop/Swadesh/src/app/auth/register/page.tsx) | New customer account creation |
| `/seller` | [Seller Dashboard](file:///c:/Users/Hardware/OneDrive/Desktop/Swadesh/src/app/seller/page.tsx) | Artisan collective portal: revenue chart, inventory table, order dispatch |
| `/admin` | [Admin Portal](file:///c:/Users/Hardware/OneDrive/Desktop/Swadesh/src/app/admin/page.tsx) | Platform governance: national GMV, catalog moderation, guild verification |
| `/about` | [About SWADESH](file:///c:/Users/Hardware/OneDrive/Desktop/Swadesh/src/app/about/page.tsx) | Brand mission, 4 pillars, and the 7-Million Artisan Pledge |
| `/contact` | [Contact & Concierge](file:///c:/Users/Hardware/OneDrive/Desktop/Swadesh/src/app/contact/page.tsx) | Studio addresses in Varanasi & New Delhi, patron concierge inquiries |
| `/faq` | [Patron FAQs](file:///c:/Users/Hardware/OneDrive/Desktop/Swadesh/src/app/faq/page.tsx) | Collapsible FAQ covering Silk Mark, GI tags, shipping, and fair wages |
| `/shipping-returns` | [Shipping & Returns](file:///c:/Users/Hardware/OneDrive/Desktop/Swadesh/src/app/shipping-returns/page.tsx) | Muslin packaging details, 7-day heritage exchanges, and timelines |
| `/privacy` | [Privacy Policy](file:///c:/Users/Hardware/OneDrive/Desktop/Swadesh/src/app/privacy/page.tsx) | Data protection and patron confidentiality charter |
| `/terms` | [Terms of Service](file:///c:/Users/Hardware/OneDrive/Desktop/Swadesh/src/app/terms/page.tsx) | Platform legal terms, GI protection, and Artisan Code of Ethics |
| `/_not-found` | [Custom 404](file:///c:/Users/Hardware/OneDrive/Desktop/Swadesh/src/app/not-found.tsx) | Themed error page guiding patrons back to home or the catalogue |

---

## 5. Interactive Demo Guide & Coupon Codes

### Sample Promo Coupon Codes
Test these in the Cart Drawer or Cart Page:
- `SWADESH10` — **10% discount** on any order.
- `UTSAV500` — **₹500 flat discount** on orders above ₹3,000.
- `CULTURE20` — **20% discount** on heritage orders above ₹8,000.

### 1-Click Demo Profiles
Switch between user perspectives at any time via the top **Announcement Bar** or [`/auth/login`](file:///c:/Users/Hardware/OneDrive/Desktop/Swadesh/src/app/auth/login/page.tsx):
- **Patron (Buyer):** `ananya.sharma@example.com` (Pre-loaded with sample orders, addresses, and wishlist).
- **Master Artisan Guild (Seller):** `irfan.bunkar@swadesh.crafts` (Varanasi Bunkar Weavers Co-operative).
- **Platform Administrator:** `admin@swadesh.gov.in` (Platform GMV, moderation, and approvals).

> **Note on Simulated Payments:** All checkout transactions, orders, and payment methods (UPI, Card, Net Banking, COD) operate in an interactive frontend simulation mode. No real bank charges or credit card deductions take place.

---

## 6. Technology Stack

- **Core Framework:** Next.js 16 (App Router with Turbopack)
- **Language:** TypeScript 5.0 (Strict type safety)
- **Styling:** Tailwind CSS v4 with PostCSS (`@tailwindcss/postcss`)
- **State Management:** Zustand 5.0 with `persist` middleware
- **Animations:** Framer Motion 14.3
- **Form Validation:** Zod 3.24
- **Iconography:** Lucide React

---

## 7. Project Directory Structure

```
Swadesh/
├── postcss.config.mjs               # PostCSS integration for Tailwind v4
├── next.config.ts                   # Next.js configuration & Unsplash remote patterns
├── tsconfig.json                    # Path aliases (@/* -> ./src/*)
├── package.json                     # Scripts & dependencies
├── README.md                        # Project documentation
└── src/
    ├── app/                         # Pages & layouts (App Router)
    │   ├── globals.css              # Tailwind v4 theme, palette & typography
    │   ├── layout.tsx               # Root layout, fonts, header, footer, drawer
    │   ├── page.tsx                 # Homepage
    │   ├── not-found.tsx            # Custom 404
    │   ├── products/                # Catalogue & [slug] product detail
    │   ├── states/                  # 28 States directory & [slug] state detail
    │   ├── stories/                 # Cultural magazine & [slug] article reader
    │   ├── cart/                    # Cart page
    │   ├── checkout/                # Checkout & success confirmation
    │   ├── wishlist/                # Saved favorites
    │   ├── account/                 # Customer account & order tracking
    │   ├── auth/                    # Login & Register
    │   ├── seller/                  # Seller Dashboard
    │   ├── admin/                   # Admin Portal
    │   ├── about/                   # Brand story
    │   ├── contact/                 # Contact & Concierge
    │   ├── faq/                     # FAQ
    │   ├── shipping-returns/        # Shipping policy
    │   ├── privacy/                 # Privacy charter
    │   └── terms/                   # Terms of service
    ├── components/
    │   ├── ui/                      # Button, Badge, Input, Select, Modal, RatingStars, Tabs
    │   ├── layout/                  # AnnouncementBar, Header, Footer
    │   ├── products/                # ProductCard, ProductFilters, ProductGallery, ProductReviews
    │   ├── states/                  # StateCard
    │   ├── artisan/                 # ArtisanCard
    │   ├── cart/                    # CartDrawer
    │   ├── checkout/                # AddressForm, DeliveryMethodSelector, PaymentSelector
    │   └── dashboard/               # StatCard, SalesChart, OrderTable, ProductManageTable
    ├── data/                        # Static datasets (states, products, categories, artisans, stories, mock orders, sellers)
    ├── store/                       # Zustand stores (cartStore, wishlistStore, authStore)
    ├── types/                       # TypeScript interfaces
    └── lib/                         # Formatting utilities (formatINR, formatDate, cn)
```

---

## 8. Installation & Getting Started

### Prerequisites
- **Node.js:** v18.0.0 or higher (Tested on v23.6.1)
- **Package Manager:** `npm` (v10+ or v11+)

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open your browser and navigate to:
```
http://localhost:3000
```

---

## 9. Production Build & Validation

The application compiles cleanly with zero TypeScript errors and zero bundle warnings:

```bash
# 1. Typecheck
npx tsc --noEmit

# 2. Production Build
npm run build
```

**Build Output:**
```
▲ Next.js 16.4.2 (Turbopack)
✓ Compiled successfully
✓ Finished TypeScript (0 errors)
✓ Generating static pages using 3 workers (22/22)

Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /about
├ ○ /account
├ ○ /admin
├ ○ /auth/login
├ ○ /auth/register
├ ○ /cart
├ ○ /checkout
├ ○ /checkout/success
├ ○ /contact
├ ○ /faq
├ ○ /privacy
├ ○ /products
├ ƒ /products/[slug]
├ ○ /seller
├ ○ /shipping-returns
├ ○ /states
├ ƒ /states/[slug]
├ ○ /stories
├ ƒ /stories/[slug]
├ ○ /terms
└ ○ /wishlist
```

---

## 10. Roadmap & Backend Integration

The frontend code is structured with clean abstractions ready for seamless backend pairing:

| Layer | Frontend Hook / Module | Recommended Backend Integration |
| :--- | :--- | :--- |
| **Payments** | [`PaymentSelector.tsx`](file:///c:/Users/Hardware/OneDrive/Desktop/Swadesh/src/components/checkout/PaymentSelector.tsx) | Razorpay / Cashfree Standard Checkout SDK |
| **Authentication** | [`authStore.ts`](file:///c:/Users/Hardware/OneDrive/Desktop/Swadesh/src/store/authStore.ts) | NextAuth.js / Supabase Auth / Clerk |
| **Database** | [`products.ts`](file:///c:/Users/Hardware/OneDrive/Desktop/Swadesh/src/data/products.ts), [`mockOrders.ts`](file:///c:/Users/Hardware/OneDrive/Desktop/Swadesh/src/data/mockOrders.ts) | PostgreSQL via Prisma / Drizzle ORM |
| **Logistics** | [`OrderTable.tsx`](file:///c:/Users/Hardware/OneDrive/Desktop/Swadesh/src/components/dashboard/OrderTable.tsx) | Shiprocket / Delhivery Courier API webhook |
| **Media Hosting** | [`next.config.ts`](file:///c:/Users/Hardware/OneDrive/Desktop/Swadesh/next.config.ts) | AWS S3 / Cloudinary for high-res artisan imagery |

---

*Dhanyavaad. Crafted with reverence for India's living handloom heritage.*
