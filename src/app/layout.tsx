import React, { Suspense } from "react";
import type { Metadata } from "next";
import { Playfair_Display, Inter, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import CartDrawer from "@/components/common/CartDrawer";
import StickyMobileBar from "@/components/common/StickyMobileBar";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const notoHindi = Noto_Sans_Devanagari({
  variable: "--font-hindi",
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aaruayurveda.com"),
  title: {
    default: "AARU (आरु) | Rooted in Ayurveda. Verified by Science.",
    template: "%s | AARU Ayurveda"
  },
  description: "Modern, trustworthy Ayurveda for everyday Indian families. Every batch verifiable with third-party NABL lab reports for heavy metals, microbial safety, and active potency. 100% AYUSH certified.",
  keywords: [
    "AARU Ayurveda", "Ayurvedic products online India", "Pure Shilajit Resin", "Triphala Gut Detox",
    "Shatavari PCOD Hormones", "KSM-66 Ashwagandha", "A2 Gir Cow Bilona Ghee",
    "Prakriti Quiz", "NABL Lab Tested Ayurveda", "Ayurvedic medicines online COD"
  ],
  authors: [{ name: "AARU Ayurvedic Wellness" }],
  creator: "AARU",
  publisher: "AARU",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "AARU Ayurveda - Rooted in Ayurveda. Verified by Science.",
    description: "Ayurveda you can verify. Enter any batch number to view authentic NABL lab test certificates.",
    url: "https://aaruayurveda.com",
    siteName: "AARU Ayurveda",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AARU Ayurveda | Proven Classical Formulations",
    description: "Every single batch lab-verified with NABL reports. Zero toxic heavy metals.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "AARU Ayurvedic Wellness",
    "alternateName": "आरु आयुर्वेद",
    "url": "https://aaruayurveda.com",
    "logo": "https://aaruayurveda.com/logo.png",
    "sameAs": [
      "https://instagram.com/aaruayurveda",
      "https://youtube.com/@aaruayurveda"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-9876543210",
      "contactType": "Customer Service & Vaidya Consultation",
      "areaServed": "IN",
      "availableLanguage": ["en", "hi"]
    }
  };

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${notoHindi.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FAF6EC] text-[#3B2F25] antialiased selection:bg-[#C8922B] selection:text-white pb-20 md:pb-0">
        <LanguageProvider>
          <CartProvider>
            <Suspense fallback={null}>
              <Navbar />
            </Suspense>
            <Suspense fallback={<div className="min-h-screen p-8 text-center text-xs">Loading Ayurvedic experience...</div>}>
              <main className="flex-1 w-full">
                {children}
              </main>
            </Suspense>
            <Footer />
            <CartDrawer />
            <Suspense fallback={null}>
              <StickyMobileBar />
            </Suspense>
            <FloatingWhatsApp />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
