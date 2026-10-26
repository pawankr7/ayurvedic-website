# AARU (आरु) - Rooted in Ayurveda. Verified by Science.

A premium, fully custom-coded Ayurvedic ecommerce platform built with Next.js (App Router), TypeScript, and Tailwind CSS. Every layout, component, and style has been hand-coded without templates or third-party theme kits.

---

## 🌿 Brand Identity & Taglines

- **Brand Name**: AARU (आरु)
- **Primary Tagline**: *"Rooted in Ayurveda. Verified by Science."*
- **Alternative Taglines**:
  1. *"Ayurveda, Proven."* (Modern, punchy, direct)
  2. *"आयुर्वेद, अब प्रमाण के साथ।"* (Hindi-first emotional resonance)
- **Positioning**: Modern, trustworthy Ayurveda for everyday Indian families. Premium design, honest pricing, and radical transparency where every batch is verifiable via independent NABL lab reports.
- **Color Palette & Design Tokens**:
  - Deep Forest Green: `#1F4D3A` (Primary brand color)
  - Saffron-Gold: `#C8922B` (Accent and primary CTAs)
  - Warm Cream: `#FAF6EC` (Background canvas)
  - Earthy Brown: `#3B2F25` (Headings and body text)
  - Soft Sage: `#DDE5D6` (Subtle surfaces and badge backgrounds)

---

## 🚀 Key Features

1. **Provable Trust (Batch Verification Portal)**:
   - Dedicated `/verify-batch` portal and inline product page verification.
   - Enter batch numbers (e.g., `AARU-24-GT01`, `AARU-24-SH02`) to view third-party NABL ISO/IEC 17025 test parameters for Lead, Mercury, Arsenic, Cadmium, microbial count, and active botanical assays.
2. **Personalization (2-Minute Prakriti Quiz)**:
   - Interactive 6-question Dosha assessment (Vata / Pitta / Kapha) with primary concern mapping.
   - Lead capture form (Name, WhatsApp, Email).
   - Instant personalized diet guidelines (Pathya), daily routine (Dinacharya), and targeted product regimens.
3. **12 Concern-Based Categories**:
   - Gut & Digestion Care, Women's Wellness, Men's Vitality, Metabolic Balance, Joint & Bone Care, Sleep & Mind, Immunity, Kids' Wellness, Hair & Skin, Daily Rasayana, Classical Medicines, and Regimen Kits.
4. **20 Detailed Sample Formulations**:
   - Complete botanical ingredient provenance (source region, part used, extraction method, why it works).
   - Compliant claims wording without illegal disease curing claims.
5. **Full Bilingual Support (Hindi + English)**:
   - Instant toggle with reactive store state.
6. **Tier 2/3 Friendly Commerce**:
   - Pincode serviceability validator.
   - Cash on Delivery (COD) and Instant UPI with 5% extra discount.
   - 30-Day Regimen Subscription options (Save 15%).
   - Free shipping progress bar (unlocked at ₹599).
7. **Custom Admin Control Panel (`/admin`)**:
   - Role-based views: Owner, Manager, Content, Support.
   - Executive Dashboard with sales KPIs, AOV, and Prakriti Quiz-to-purchase conversion funnel.
   - Product stock management, batch CoA audits, order fulfillment, and leads manager.
   - **Claims Review & Compliance Auditor**: Live copy screen against prohibited disease curing words.
8. **3 Dedicated High-Conversion Ad Landing Pages**:
   - `/lp/gut-care`
   - `/lp/womens-wellness`
   - `/lp/joint-care`

---

## 🛠️ Quickstart & Local Development

### 1. Installation
```bash
npm install
```

### 2. Environment Variables
Copy `.env.example` to `.env.local` and configure your credentials:
```bash
cp .env.example .env.local
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 📋 Client Must Provide Checklist

Before final commercial launch, the client or legal counsel must furnish:
1. **High-Resolution Brand Assets**: Official vector logo (SVG), favicon, packaging renders.
2. **Licences & Certificates**:
   - Official AYUSH Manufacturing / Loan License copies.
   - FSSAI License Number for edible items (A2 Ghee, juices, teas).
   - ISO and GMP certificates for production facilities.
3. **NABL Lab Reports**:
   - Official signed Certificates of Analysis (PDFs) for every production batch.
4. **Payment Gateway Credentials**:
   - Razorpay Key ID and Key Secret (KYC verified).
5. **Logistics & Courier API Keys**:
   - Delhivery or Shiprocket B2C API credentials.
6. **Legal Sign-Off**:
   - Formal sign-off on all placeholder marketing claims in `src/data/claimsCompliance.ts`.

---

## 🔒 Claims & Regulatory Compliance

- Every page and footer features the mandatory statutory disclaimer:
  > *"These statements have not been evaluated as a cure for any disease. Consult a qualified Ayurvedic physician or doctor before use, especially if pregnant, nursing or on medication."*
- Prohibited curing terms (`cure`, `reverses diabetes`, `guaranteed fix`) are banned and auditable via `/admin/claims`.
