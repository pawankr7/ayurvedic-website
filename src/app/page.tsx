'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { CATEGORIES } from '@/data/categories';
import { PRODUCTS } from '@/data/products';
import { DOCTORS_VAIDYAS } from '@/data/doctors';
import { BLOG_POSTS } from '@/data/blogs';
import ProductCard from '@/components/product/ProductCard';
import VerifiedBatchCard from '@/components/common/VerifiedBatchCard';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Award,
  ArrowRight,
  Search,
  Star,
  Users,
  Flame,
  Clock,
  Layers,
  Heart,
  HelpCircle,
  FileCheck2,
  ChevronRight,
  ChevronDown,
  Shield
} from 'lucide-react';

export default function HomePage() {
  const { t, isHindi } = useLanguage();
  const [homeBatchInput, setHomeBatchInput] = useState('AARU-24-GT01');
  const [searchedBatch, setSearchedBatch] = useState('AARU-24-GT01');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const homeFaqItems = [
    {
      q: "How does AARU verify the purity and safety of every Ayurvedic batch?",
      hiQ: "आरु के उत्पादों की शुद्धता और सुरक्षा की पुष्टि कैसे होती है?",
      a: "Every manufacturing batch is sent to independent NABL-accredited ISO/IEC 17025 laboratories for comprehensive testing of heavy metals (Lead, Mercury, Arsenic, Cadmium), microbial safety (E. coli, Salmonella), pesticide residues, and active botanical assays. Results are openly accessible on our /verify-batch portal.",
      hiA: "हर बैच को स्वतंत्र NABL मान्यता प्राप्त प्रयोगशाला में भेजा जाता है जहाँ लेड, पारा, आर्सेनिक, ई-कोलाई और कीटनाशकों की गहन जांच होती है। यह रिपोर्ट आप बैच नंबर डालकर सीधे देख सकते हैं।"
    },
    {
      q: "Are AARU formulations certified by AYUSH and GMP compliant?",
      hiQ: "क्या आरु की औषधियां आयुष मंत्रालय और GMP प्रमाणित हैं?",
      a: "Yes. All formulations are manufactured under strict AYUSH regulatory licenses in GMP-certified cleanroom facilities conforming to classical Samhita methodologies.",
      hiA: "हाँ, हमारी सभी औषधियां शास्त्रीय आयुर्वेदिक संहिता सम्मत हैं और आयुष मंत्रालय के मानकों एवं GMP प्रमाणित कारखाने में तैयार होती हैं।"
    },
    {
      q: "Do I need to discontinue conventional physician medications while taking Ayurveda?",
      hiQ: "क्या मुझे अपनी बीमारी के लिए एलोपैथिक दवाएं बंद करनी होंगी?",
      a: "No. Ayurvedic formulations support your body's innate vitality and balance. We strictly advise continuing your prescribed physician regimen and keeping a 45-minute interval between intakes after consulting your doctor.",
      hiA: "नहीं। आयुर्वेदिक रसायन शरीर के प्राकृतिक पोषण के लिए होते हैं। किसी भी पुरानी बीमारी में अपने मुख्य चिकित्सक की सलाह से 45 मिनट के अंतर पर सेवन करें।"
    },
    {
      q: "What are the shipping timelines and is Cash on Delivery (COD) available?",
      hiQ: "कैश ऑन डिलीवरी (COD) और डिलीवरी समय क्या है?",
      a: "We service 19,000+ pincodes across India with fast Cash on Delivery (COD) and free shipping on orders above ₹599. Typical transit time is 2-3 business days for metro areas and 3-5 days for other regions.",
      hiA: "हम पूरे भारत में 19,000+ पिनकोड पर कैश ऑन डिलीवरी प्रदान करते हैं। ₹599 से अधिक के ऑर्डर पर मुफ्त एक्सप्रेस डिलीवरी उपलब्ध है।"
    }
  ];

  const homeFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": homeFaqItems.map((item) => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  };

  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 6);
  const regimenKits = PRODUCTS.filter((p) => p.categoryId === 'kits-combos').slice(0, 3);

  const handleBatchSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (homeBatchInput.trim()) {
      setSearchedBatch(homeBatchInput.trim().toUpperCase());
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF6EC] via-[#F3EBD8]/50 to-[#FAF6EC] pt-8 sm:pt-16 pb-12 border-b border-[#E6DFC8]">
        {/* Subtle decorative background circles */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#C8922B]/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-[#1F4D3A]/10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Trust Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#C8922B]/40 shadow-xs text-xs font-semibold text-[#1F4D3A]">
                <ShieldCheck className="w-4 h-4 text-[#C8922B]" />
                <span>{t.hero.eyebrow}</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-serif-ayur text-[#1F4D3A] tracking-tight leading-[1.15]">
                {isHindi ? (
                  <>
                    आयुर्वेद, <span className="text-[#C8922B] italic">अब प्रमाण</span> के साथ।
                  </>
                ) : (
                  <>
                    Authentic Ayurveda, <br className="hidden sm:inline" />
                    <span className="text-[#C8922B] italic">Openly Proven</span> by Science.
                  </>
                )}
              </h1>

              {/* Subheading */}
              <p className="text-sm sm:text-base text-gray-700 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                {t.hero.subheading}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
                <Link
                  href="/prakriti-quiz"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full font-bold text-xs sm:text-sm gold-gradient-btn flex items-center justify-center gap-2 shadow-gold cursor-pointer transition-transform hover:-translate-y-0.5"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{t.hero.ctaFindRegimen}</span>
                </Link>

                <Link
                  href="/shop"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full font-bold text-xs sm:text-sm border-2 border-[#1F4D3A] text-[#1F4D3A] hover:bg-[#1F4D3A] hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>{t.hero.ctaShopBestsellers}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Quick Remedy Finder Pill Strip */}
              <div className="pt-3 space-y-2 text-left">
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider text-center lg:text-left">
                  {isHindi ? "त्वरित उपचार खोजें:" : "Popular Ayurvedic Health Goals:"}
                </p>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                  <Link
                    href="/shop/digestive-gut-health"
                    className="px-3 py-1.5 rounded-full bg-white hover:bg-[#FAF6EC] border border-[#E6DFC8] hover:border-[#C8922B] text-xs font-semibold text-[#1F4D3A] transition-colors shadow-xs flex items-center gap-1.5"
                  >
                    <span>🌿</span>
                    <span>{isHindi ? "गैस व कब्ज" : "Acidity & Bloating"}</span>
                  </Link>
                  <Link
                    href="/shop/joint-bone-mobility"
                    className="px-3 py-1.5 rounded-full bg-white hover:bg-[#FAF6EC] border border-[#E6DFC8] hover:border-[#C8922B] text-xs font-semibold text-[#1F4D3A] transition-colors shadow-xs flex items-center gap-1.5"
                  >
                    <span>🦵</span>
                    <span>{isHindi ? "जोड़ों का दर्द" : "Joint Ease"}</span>
                  </Link>
                  <Link
                    href="/shop/sleep-mind-wellness"
                    className="px-3 py-1.5 rounded-full bg-white hover:bg-[#FAF6EC] border border-[#E6DFC8] hover:border-[#C8922B] text-xs font-semibold text-[#1F4D3A] transition-colors shadow-xs flex items-center gap-1.5"
                  >
                    <span>🧘</span>
                    <span>{isHindi ? "गहरी नींद व तनाव" : "Deep Sleep & Stress"}</span>
                  </Link>
                  <Link
                    href="/shop/womens-wellness"
                    className="px-3 py-1.5 rounded-full bg-white hover:bg-[#FAF6EC] border border-[#E6DFC8] hover:border-[#C8922B] text-xs font-semibold text-[#1F4D3A] transition-colors shadow-xs flex items-center gap-1.5"
                  >
                    <span>🌺</span>
                    <span>{isHindi ? "महिला स्वास्थ्य" : "Women's Balance"}</span>
                  </Link>
                  <Link
                    href="/shop/mens-vitality"
                    className="px-3 py-1.5 rounded-full bg-white hover:bg-[#FAF6EC] border border-[#E6DFC8] hover:border-[#C8922B] text-xs font-semibold text-[#1F4D3A] transition-colors shadow-xs flex items-center gap-1.5"
                  >
                    <span>⚡</span>
                    <span>{isHindi ? "शिलाजीत व ऊर्जा" : "Pure Shilajit"}</span>
                  </Link>
                </div>
              </div>

              {/* Guarantees */}
              <div className="pt-2 text-xs text-gray-500 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-green-700" />
                  <span>Free Express Shipping on ₹599+</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C8922B]" />
                  <span>Extra 5% Off with Instant UPI</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1F4D3A]" />
                  <span>Cash on Delivery (COD)</span>
                </span>
              </div>
            </div>

            {/* Right Column: Hero Visual Showcase */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md bg-white p-6 rounded-3xl border-2 border-[#C8922B]/30 shadow-2xl space-y-5">
                
                {/* Header of Card */}
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#1F4D3A]">
                      Live Batch Verification
                    </span>
                  </div>
                  <span className="text-[10px] bg-[#FAF6EC] text-[#C8922B] font-mono px-2 py-0.5 rounded border border-[#C8922B]/30 font-bold">
                    NABL ISO/IEC 17025
                  </span>
                </div>

                {/* Hero Feature Box */}
                <div className="bg-[#FAF6EC] p-4 rounded-2xl border border-[#E6DFC8] space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-[#1F4D3A]">
                        Triphala Gut & Colon Detox
                      </h4>
                      <p className="text-[11px] text-gray-500">Batch #{homeBatchInput}</p>
                    </div>
                    <span className="text-2xl">🌿</span>
                  </div>

                  {/* Micro Lab Results */}
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="bg-white p-2 rounded-lg border border-[#E6DFC8]">
                      <span className="text-gray-500 block text-[9px] uppercase font-semibold">Lead (Pb)</span>
                      <strong className="text-green-700 font-mono">0.28 ppm (Limit 10)</strong>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-[#E6DFC8]">
                      <span className="text-gray-500 block text-[9px] uppercase font-semibold">Microbial E. Coli</span>
                      <strong className="text-green-700 font-mono">Absent / g (PASSED)</strong>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-[#E6DFC8]">
                      <span className="text-gray-500 block text-[9px] uppercase font-semibold">Pesticides</span>
                      <strong className="text-green-700 font-mono">None Detected</strong>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-[#E6DFC8]">
                      <span className="text-gray-500 block text-[9px] uppercase font-semibold">Tannin Assay</span>
                      <strong className="text-[#C8922B] font-mono">42.8% w/w</strong>
                    </div>
                  </div>
                </div>

                {/* Mini Batch Input on Hero */}
                <form onSubmit={handleBatchSearch} className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      value={homeBatchInput}
                      onChange={(e) => setHomeBatchInput(e.target.value)}
                      placeholder="Try AARU-24-SH02 or AARU-24-GT01"
                      className="w-full pl-8 pr-2 py-2 text-xs bg-[#FAF6EC] border border-[#E6DFC8] rounded-xl font-mono uppercase"
                    />
                  </div>
                  <Link
                    href={`/verify-batch?batch=${homeBatchInput}`}
                    className="px-4 py-2 text-xs font-bold rounded-xl gold-gradient-btn flex items-center justify-center shrink-0 cursor-pointer"
                  >
                    Verify
                  </Link>
                </form>

                <p className="text-[10px] text-center text-gray-400">
                  Try batch codes: <strong>AARU-24-SH02</strong> (Shilajit) or <strong>AARU-24-SW03</strong> (Shatavari)
                </p>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. TRUST STRIP (Certifications & Standards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-[#E6DFC8] p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#EEF3EA] text-[#1F4D3A] flex items-center justify-center shrink-0">
                <Award className="w-5 h-5 text-[#C8922B]" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#1F4D3A]">{t.trustStrip.ayush}</h4>
                <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">{t.trustStrip.ayushDesc}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#EEF3EA] text-[#1F4D3A] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-[#C8922B]" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#1F4D3A]">{t.trustStrip.lab}</h4>
                <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">{t.trustStrip.labDesc}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#EEF3EA] text-[#1F4D3A] flex items-center justify-center shrink-0">
                <FileCheck2 className="w-5 h-5 text-[#C8922B]" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#1F4D3A]">{t.trustStrip.nabl}</h4>
                <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">{t.trustStrip.nablDesc}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#EEF3EA] text-[#1F4D3A] flex items-center justify-center shrink-0">
                <Users className="w-5 h-5 text-[#C8922B]" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#1F4D3A]">{t.trustStrip.doctor}</h4>
                <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">{t.trustStrip.doctorDesc}</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. KNOW YOUR PRAKRITI QUIZ CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#1F4D3A] to-[#143527] rounded-3xl p-6 sm:p-12 text-[#FAF6EC] shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-80 h-80 bg-[#C8922B]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
            <div className="md:col-span-8 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C8922B]/20 text-[#DFAB48] border border-[#C8922B]/40 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-[#C8922B]" />
                <span>{isHindi ? "2 मिनट का व्यक्तिगत टेस्ट" : "2-Minute Diagnostic Assessment"}</span>
              </span>

              <h2 className="text-2xl sm:text-4xl font-bold font-serif-ayur text-white">
                {isHindi ? "जानिए अपनी आयुर्वेदिक प्रकृति (वात, पित्त या कफ)" : "Know Your Prakriti: Vata, Pitta, or Kapha?"}
              </h2>

              <p className="text-xs sm:text-sm text-[#FAF6EC]/80 max-w-2xl leading-relaxed">
                {isHindi
                  ? "आयुर्वेद के अनुसार प्रत्येक व्यक्ति का शरीर भिन्न होता है। अपने दोष का सही विश्लेषण करें और पाएं व्यक्तिगत आहार निर्देश (पथ्य) और प्राकृतिक जड़ी-बूटियों का सटीक सुझाव।"
                  : "Every individual is born with a unique biological constitution. Discover your Dosha balance and receive an instant personalized diet chart, daily routine (Dinacharya), and targeted herbal regimen."}
              </p>

              <div className="flex flex-wrap gap-4 pt-2 text-xs font-medium text-[#DFAB48]">
                <span>✓ 6 Simple Body Questions</span>
                <span>✓ Free Dinacharya Chart</span>
                <span>✓ WhatsApp Doctor Follow-Up</span>
              </div>
            </div>

            <div className="md:col-span-4 flex justify-center md:justify-end">
              <Link
                href="/prakriti-quiz"
                className="px-8 py-4 rounded-full font-bold text-xs sm:text-sm gold-gradient-btn shadow-lg hover:scale-105 transition-all text-center flex items-center gap-2 cursor-pointer"
              >
                <span>{isHindi ? "प्रकृति टेस्ट अभी शुरू करें" : "Take the 2-Min Quiz"}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SHOP BY CONCERN (12 Concern Categories) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C8922B]">
            {isHindi ? "प्राकृतिक चिकित्सा समाधान" : "Targeted Regimens"}
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold font-serif-ayur text-[#1F4D3A]">
            {t.sections.shopByConcern}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            {t.sections.shopByConcernSub}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={`/shop/${category.slug}`}
              className="group bg-white p-5 rounded-2xl border border-[#E6DFC8] hover:border-[#C8922B] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[#FAF6EC] border border-[#E6DFC8] group-hover:bg-[#1F4D3A] transition-colors flex items-center justify-center text-xl text-[#1F4D3A] group-hover:text-white">
                    🌿
                  </div>
                  {category.badge && (
                    <span className="text-[10px] font-bold text-[#C8922B] bg-[#FAF6EC] px-2 py-0.5 rounded-full border border-[#C8922B]/30">
                      {category.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-bold font-serif-ayur text-[#3B2F25] group-hover:text-[#1F4D3A] transition-colors">
                  {isHindi ? category.hindiName : category.name}
                </h3>

                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                  {isHindi ? category.hindiDescription : category.description}
                </p>
              </div>

              <div className="pt-4 mt-2 border-t border-gray-50 flex items-center justify-between text-xs font-bold text-[#1F4D3A] group-hover:text-[#C8922B]">
                <span>{isHindi ? "उत्पाद देखें" : "Explore Range"}</span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. BEST SELLERS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C8922B]">
              {isHindi ? "सर्वाधिक विश्वसनीय" : "Customer Favorites"}
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-serif-ayur text-[#1F4D3A]">
              {t.sections.bestSellers}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              {t.sections.bestSellersSub}
            </p>
          </div>

          <Link
            href="/shop"
            className="text-xs sm:text-sm font-bold text-[#1F4D3A] hover:text-[#C8922B] flex items-center gap-1 transition-colors"
          >
            <span>{isHindi ? "सभी 20 फॉर्मूलेशन देखें →" : "View Full Catalog (20) →"}</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. HOW WE VERIFY EVERY BATCH (Interactive Feature) */}
      <section className="bg-gradient-to-b from-white via-[#FAF6EC] to-white py-16 border-y border-[#E6DFC8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1F4D3A]/10 text-[#1F4D3A] text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-[#C8922B]" />
              <span>{t.batchVerification.badge}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold font-serif-ayur text-[#1F4D3A]">
              {t.sections.verifyBatchTitle}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              {t.sections.verifyBatchSub}
            </p>
          </div>

          {/* Verification Portal Demo */}
          <div className="max-w-3xl mx-auto">
            <VerifiedBatchCard batchNumber={searchedBatch} isOpenByDefault={true} />
          </div>

          <div className="text-center pt-2">
            <Link
              href="/verify-batch"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#1F4D3A] hover:text-[#C8922B] underline"
            >
              <span>{isHindi ? "बैच वेरिफिकेशन पोर्टल खोलें →" : "Go to Dedicated Batch Verification Page →"}</span>
            </Link>
          </div>

        </div>
      </section>

      {/* 7. REGIMEN KITS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C8922B]">
            {isHindi ? "सम्पूर्ण स्वास्थ्य कोर्स" : "Complete Holistic Protocols"}
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold font-serif-ayur text-[#1F4D3A]">
            {t.sections.regimens}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            {t.sections.regimensSub}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {regimenKits.map((kit) => (
            <ProductCard key={kit.id} product={kit} />
          ))}
        </div>
      </section>

      {/* 8. INGREDIENT & PROVENANCE STORYTELLING */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF6EC] rounded-3xl border border-[#E6DFC8] p-8 sm:p-12 space-y-8">
          
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C8922B]">
              {isHindi ? "जड़ी-बूटियों की प्रामाणिकता" : "Traceable Provenance"}
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-serif-ayur text-[#1F4D3A]">
              {t.sections.ingredientStory}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              {t.sections.ingredientStorySub}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white p-5 rounded-2xl border border-[#E6DFC8] space-y-2.5">
              <span className="text-2xl">🏔️</span>
              <h4 className="font-bold text-sm text-[#1F4D3A]">Ladakh Himalayas (18,000+ ft)</h4>
              <p className="text-xs text-gray-500 font-medium">Pure Grade-A Shilajit</p>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                Sun-purified (Surya-Tapi) mineral resin with 68%+ Fulvic Acid and zero chemical processing.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E6DFC8] space-y-2.5">
              <span className="text-2xl">🌿</span>
              <h4 className="font-bold text-sm text-[#1F4D3A]">Pratapgarh & Amarkantak</h4>
              <p className="text-xs text-gray-500 font-medium">Wild Forest Amalaki (Amla)</p>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                Harvested from deep biosphere reserves, delivering heat-stable bio-available Vitamin C.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E6DFC8] space-y-2.5">
              <span className="text-2xl">🐄</span>
              <h4 className="font-bold text-sm text-[#1F4D3A]">Gir Sanctuary, Gujarat</h4>
              <p className="text-xs text-gray-500 font-medium">Indigenous Gir Cow A2 Milk</p>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                Hand-churned wooden Bilona method from whole cultured curd. 100% pure A2 beta-casein.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E6DFC8] space-y-2.5">
              <span className="text-2xl">🌱</span>
              <h4 className="font-bold text-sm text-[#1F4D3A]">Western Ghats & Kerala</h4>
              <p className="text-xs text-gray-500 font-medium">Bhringraj & Classical Herbs</p>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                72-hour Kshirpak slow-simmered decoctions in brass vats following ancient Sahasrayogam texts.
              </p>
            </div>

          </div>

          <div className="text-center pt-2">
            <Link
              href="/quality"
              className="text-xs font-bold text-[#1F4D3A] hover:text-[#C8922B] underline"
            >
              {isHindi ? "हमारा सोर्सिंग मैप और गुणवत्ता प्रमाणपत्र देखें →" : "Explore Our Complete Sourcing Map & Certificates →"}
            </Link>
          </div>

        </div>
      </section>

      {/* 9. VAIDYA ADVISORY BOARD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C8922B]">
            {isHindi ? "वैद्यकीय मार्गदर्शन" : "Medical Integrity"}
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold font-serif-ayur text-[#1F4D3A]">
            {t.sections.vaidyaPanel}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            {t.sections.vaidyaPanelSub}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DOCTORS_VAIDYAS.map((doc) => (
            <div key={doc.id} className="bg-white p-6 rounded-2xl border border-[#E6DFC8] shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-[#FAF6EC] border-2 border-[#C8922B] flex items-center justify-center text-xl font-bold text-[#1F4D3A]">
                  👨‍⚕️
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1F4D3A]">
                    {isHindi ? doc.hindiName : doc.name}
                  </h4>
                  <p className="text-[11px] text-[#C8922B] font-semibold">{doc.degree}</p>
                  <p className="text-[10px] text-gray-400">{doc.experienceYears}+ Years Clinical Practice</p>
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <span className="text-[10px] uppercase font-bold text-gray-500 block">Focus Area:</span>
                <p className="font-semibold text-gray-800">
                  {isHindi ? doc.hindiSpecialization : doc.specialization}
                </p>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed">
                {isHindi ? doc.hindiBio : doc.bio}
              </p>

              <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400 font-mono">
                <span>{doc.registrationNumber}</span>
                <span className="text-green-700 font-sans font-bold">Verified Vaidya</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. REVIEWS & TRUST */}
      <section className="bg-gradient-to-b from-[#FAF6EC] to-white py-16 border-t border-[#E6DFC8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C8922B]">
              ★ 4.93 / 5.0 Rating (4,200+ Reviews)
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-serif-ayur text-[#1F4D3A]">
              {t.sections.reviewsTitle}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              {t.sections.reviewsSub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-white p-6 rounded-2xl border border-[#E6DFC8] shadow-xs space-y-3">
              <div className="flex items-center gap-1 text-[#C8922B]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-gray-700 italic leading-relaxed">
                &ldquo;Checking the batch report before giving Triphala to my mother gave me absolute peace of mind. Her acidity and morning digestion improved in just 5 days.&rdquo;
              </p>
              <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                <div>
                  <strong className="text-[#1F4D3A] block">Rajesh Varma</strong>
                  <span className="text-gray-400 text-[10px]">Indore, MP • Verified Buyer</span>
                </div>
                <span className="text-[10px] bg-green-50 text-green-700 font-bold px-2 py-0.5 rounded">
                  ✓ Batch AARU-24-GT01
                </span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E6DFC8] shadow-xs space-y-3">
              <div className="flex items-center gap-1 text-[#C8922B]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-gray-700 italic leading-relaxed">
                &ldquo;The KSM-66 Ashwagandha actually works without that groggy hangover chemical sleeping pills give. I wake up sharp and calm. Truly pure herbs.&rdquo;
              </p>
              <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                <div>
                  <strong className="text-[#1F4D3A] block">Pooja Deshmukh</strong>
                  <span className="text-gray-400 text-[10px]">Pune, Maharashtra • Verified Buyer</span>
                </div>
                <span className="text-[10px] bg-green-50 text-green-700 font-bold px-2 py-0.5 rounded">
                  ✓ Batch AARU-24-AS04
                </span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E6DFC8] shadow-xs space-y-3">
              <div className="flex items-center gap-1 text-[#C8922B]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-gray-700 italic leading-relaxed">
                &ldquo;I have tried Shilajit from multiple famous brands, but AARU is on another level. Golden aroma, dissolves completely in warm milk, and verified 68% fulvic acid.&rdquo;
              </p>
              <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                <div>
                  <strong className="text-[#1F4D3A] block">Harinder Singh</strong>
                  <span className="text-gray-400 text-[10px]">Ludhiana, Punjab • Verified Buyer</span>
                </div>
                <span className="text-[10px] bg-green-50 text-green-700 font-bold px-2 py-0.5 rounded">
                  ✓ Batch AARU-24-SH02
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 11. AYURVEDA LIBRARY & BLOG HIGHLIGHTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C8922B]">
              {isHindi ? "आयुर्वेदिक ज्ञानकोश" : "Classical Wisdom"}
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-serif-ayur text-[#1F4D3A]">
              {isHindi ? "आयुर्वेद लाइब्रेरी एवं ऋतुचर्या मार्गदर्शिका" : "The Ayurveda Library & Seasonal Guides"}
            </h2>
          </div>

          <Link
            href="/blog"
            className="text-xs sm:text-sm font-bold text-[#1F4D3A] hover:text-[#C8922B] flex items-center gap-1 transition-colors"
          >
            <span>{isHindi ? "सभी लेख पढ़ें →" : "Browse All Articles →"}</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-2xl border border-[#E6DFC8] hover:border-[#C8922B] overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="h-44 bg-[#FAF6EC] flex items-center justify-center text-4xl border-b border-[#E6DFC8] group-hover:scale-105 transition-transform duration-500">
                📜
              </div>
              <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C8922B]">
                    {post.category}
                  </span>
                  <h3 className="text-sm font-bold font-serif-ayur text-[#1F4D3A] group-hover:text-[#C8922B] transition-colors line-clamp-2 mt-1">
                    {isHindi ? post.hindiTitle : post.title}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                    {isHindi ? post.hindiExcerpt : post.excerpt}
                  </p>
                </div>
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
                  <span>{post.readTime}</span>
                  <span className="text-[#1F4D3A] font-bold group-hover:underline">Read Article →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 12. FAQ ACCORDION PREVIEW (SEO Structured Data) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqSchema) }}
        />

        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs text-[#C8922B] font-bold uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>Ayurvedic Trust & Queries</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif-ayur text-[#1F4D3A]">
            {t.sections.faqTitle}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            {t.sections.faqSub}
          </p>
        </div>

        <div className="space-y-3">
          {homeFaqItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-[#E6DFC8] overflow-hidden shadow-xs transition-colors"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full p-4 sm:p-5 text-left font-bold text-xs sm:text-sm text-[#1F4D3A] flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAF6EC]/30"
              >
                <span>{isHindi ? item.hiQ : item.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#C8922B] transition-transform duration-200 shrink-0 ${
                    openFaq === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openFaq === index && (
                <div className="px-4 sm:px-5 pb-5 text-xs text-gray-600 leading-relaxed border-t border-gray-100 pt-3 animate-in fade-in duration-200">
                  {isHindi ? item.hiA : item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
