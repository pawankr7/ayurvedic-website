'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { CATEGORIES } from '@/data/categories';
import { MANDATORY_MEDICAL_DISCLAIMER_EN, MANDATORY_MEDICAL_DISCLAIMER_HI } from '@/data/claimsCompliance';
import { ShieldCheck, Award, Heart, CheckCircle2, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

export default function Footer() {
  const { t, isHindi } = useLanguage();
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput('');
    }
  };

  return (
    <footer className="bg-[#1F4D3A] text-[#FAF6EC] border-t border-[#C8922B]/30 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. Trust & Accreditation Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-12 border-b border-[#FAF6EC]/10">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="w-10 h-10 rounded-lg bg-[#C8922B]/20 flex items-center justify-center shrink-0 text-[#C8922B]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#C8922B]">AYUSH Certified</p>
              <p className="text-[11px] text-[#FAF6EC]/70">Govt. Approved Classical Formulations</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="w-10 h-10 rounded-lg bg-[#C8922B]/20 flex items-center justify-center shrink-0 text-[#C8922B]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#C8922B]">NABL Lab Tested</p>
              <p className="text-[11px] text-[#FAF6EC]/70">Zero Toxic Heavy Metals Guaranteed</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="w-10 h-10 rounded-lg bg-[#C8922B]/20 flex items-center justify-center shrink-0 text-[#C8922B]">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#C8922B]">GMP & ISO 9001</p>
              <p className="text-[11px] text-[#FAF6EC]/70">Standardized Cleanroom Manufacturing</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="w-10 h-10 rounded-lg bg-[#C8922B]/20 flex items-center justify-center shrink-0 text-[#C8922B]">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#C8922B]">100% Vegetarian</p>
              <p className="text-[11px] text-[#FAF6EC]/70">Pure Botanical & Mineral Actives</p>
            </div>
          </div>
        </div>

        {/* 2. Main Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 py-12 border-b border-[#FAF6EC]/10">
          
          {/* Col 1 & 2: Brand Story & Newsletter */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#C8922B] flex items-center justify-center text-white font-bold text-sm">
                🌿
              </div>
              <span className="text-2xl font-bold tracking-tight font-serif-ayur text-white">
                AARU
              </span>
            </div>

            <p className="text-sm text-[#FAF6EC]/80 leading-relaxed max-w-sm">
              {isHindi
                ? "भारतीय परिवारों के लिए आधुनिक, प्रामाणिक एवं भरोसेमंद आयुर्वेद। प्रत्येक बैच की लैब जांच रिपोर्ट हम खुले रूप से आपके साथ साझा करते हैं।"
                : "Modern, trustworthy Ayurveda for everyday Indian families. We eliminate the guesswork by making independent third-party NABL lab reports publicly verifiable for every batch."}
            </p>

            <div className="pt-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#C8922B] mb-2">
                {isHindi ? "10% छूट के लिए न्यूजलेटर सब्सक्राइब करें" : "Get 10% Off Your First Order"}
              </p>
              {subscribed ? (
                <div className="p-2.5 rounded-lg bg-[#2A684F] text-xs text-[#FAF6EC] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C8922B]" />
                  <span>Use coupon code <strong>AARU10</strong> at checkout!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder={isHindi ? "अपना ईमेल पता दर्ज करें" : "Enter your email"}
                    className="flex-1 px-3 py-2 text-xs bg-white/10 rounded-lg border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-[#C8922B]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-bold rounded-lg bg-[#C8922B] hover:bg-[#DFAB48] text-[#1F4D3A] transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <span>{isHindi ? "जुड़ें" : "Join"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>

            <div className="pt-2 space-y-1.5 text-xs text-[#FAF6EC]/70">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C8922B]" />
                <span>AARU Wellness Labs, Haridwar Industrial Corridor, Uttarakhand, India</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C8922B]" />
                <span>Helpline / Vaidya Desk: +91 98765 43210</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C8922B]" />
                <span>care@aaruayurveda.com</span>
              </p>
            </div>
          </div>

          {/* Col 3: Shop by Concern */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C8922B]">
              {isHindi ? "समस्या अनुसार उपचार" : "Shop by Concern"}
            </h4>
            <ul className="space-y-2 text-xs text-[#FAF6EC]/80">
              {CATEGORIES.slice(0, 7).map((cat) => (
                <li key={cat.id}>
                  <Link href={`/shop/${cat.slug}`} className="hover:text-[#C8922B] transition-colors">
                    {isHindi ? cat.hindiName : cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/shop" className="text-[#C8922B] font-semibold hover:underline">
                  {isHindi ? "सभी 12 श्रेणियां देखें →" : "View All Categories →"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Portals & Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C8922B]">
              {isHindi ? "आयुर्वेदिक सुविधाएं" : "Trust & Tools"}
            </h4>
            <ul className="space-y-2 text-xs text-[#FAF6EC]/80">
              <li>
                <Link href="/verify-batch" className="hover:text-[#C8922B] transition-colors font-medium text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C8922B]" />
                  <span>{t.nav.verifyBatch}</span>
                </Link>
              </li>
              <li>
                <Link href="/prakriti-quiz" className="hover:text-[#C8922B] transition-colors">
                  {t.nav.prakritiQuiz}
                </Link>
              </li>
              <li>
                <Link href="/quality" className="hover:text-[#C8922B] transition-colors">
                  {t.nav.quality}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#C8922B] transition-colors">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#C8922B] transition-colors">
                  {t.nav.blog}
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="hover:text-[#C8922B] transition-colors">
                  {isHindi ? "ऑर्डर ट्रैक करें" : "Track Your Order"}
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#C8922B] transition-colors text-white/50">
                  {isHindi ? "🔒 एडमिन कंट्रोल पैनल" : "🔒 Admin Portal"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Legal & Policies */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C8922B]">
              {isHindi ? "नीतियां एवं सुरक्षा" : "Policies & Trust"}
            </h4>
            <ul className="space-y-2 text-xs text-[#FAF6EC]/80">
              <li>
                <Link href="/policies/privacy" className="hover:text-[#C8922B] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/policies/terms" className="hover:text-[#C8922B] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/policies/shipping" className="hover:text-[#C8922B] transition-colors">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link href="/policies/refund" className="hover:text-[#C8922B] transition-colors">
                  Refund & Return Policy
                </Link>
              </li>
              <li>
                <Link href="/policies/medical-disclaimer" className="hover:text-[#C8922B] transition-colors font-medium text-[#DFAB48]">
                  Statutory Medical Disclaimer
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* 3. Mandatory Medical Disclaimer Box (Strict Compliance) */}
        <div className="my-8 p-4 rounded-xl bg-black/25 border border-[#C8922B]/30 text-xs text-[#FAF6EC]/80 space-y-2">
          <div className="flex items-center gap-2 text-[#C8922B] font-bold text-xs uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Statutory Medical & Regulatory Disclaimer (वैधानिक चिकित्सा अस्वीकरण)</span>
          </div>
          <p className="leading-relaxed text-[11px]">
            <strong>English:</strong> {MANDATORY_MEDICAL_DISCLAIMER_EN}
          </p>
          <p className="leading-relaxed text-[11px] text-[#FAF6EC]/70">
            <strong>हिन्दी:</strong> {MANDATORY_MEDICAL_DISCLAIMER_HI}
          </p>
        </div>

        {/* 4. Bottom Copyright & Indian Heritage Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#FAF6EC]/60 gap-4 pt-4">
          <p>
            © 2026 AARU Wellness India Private Limited. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            <span>Crafted with devotion for classical Indian Ayurveda</span>
            <span className="text-sm">🇮🇳</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
