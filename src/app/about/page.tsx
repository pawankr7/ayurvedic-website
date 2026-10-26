'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { DOCTORS_VAIDYAS } from '@/data/doctors';
import { ShieldCheck, Heart, Sparkles, BookOpen, CheckCircle2, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  const { isHindi } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-16">
      
      {/* Brand Origin Hero */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1F4D3A]/10 text-[#1F4D3A] text-xs font-bold">
          <Sparkles className="w-4 h-4 text-[#C8922B]" />
          <span>{isHindi ? "हमारी उत्पत्ति एवं दृष्टिकोण" : "The Genesis of AARU"}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold font-serif-ayur text-[#1F4D3A]">
          {isHindi ? "सच्चा आयुर्वेद। वैज्ञानिक प्रमाण सहित।" : "Ayurveda, Honest & Proven."}
        </h1>
        <p className="text-xs sm:text-base text-gray-700 leading-relaxed">
          {isHindi
            ? "आरु की स्थापना एक सरल उद्देश्य से हुई: भारतीय परिवारों को ऐसा आयुर्वेद देना जिस पर वे बिना किसी संदेह के भरोसा कर सकें। कोई छुपी हुई मिलावट नहीं, कोई झूठे वादे नहीं, हर एक बैच की आधिकारिक लैब जांच रिपोर्ट आपके हाथ में।"
            : "AARU was founded to dismantle the 'black box' of herbal supplements. For too long, Indian families had to accept Ayurvedic powders on blind faith. We bridge sacred classical formulations with uncompromising third-party NABL lab verification."}
        </p>
      </div>

      {/* 3 Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E6DFC8] shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#FAF6EC] flex items-center justify-center text-2xl text-[#1F4D3A]">
            🛡️
          </div>
          <h3 className="text-base font-bold font-serif-ayur text-[#1F4D3A]">
            1. Provable Trust
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Every product batch carries a scannable QR code linking to authentic laboratory test results for Lead, Mercury, Arsenic, Cadmium, and microbial count.
          </p>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E6DFC8] shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#FAF6EC] flex items-center justify-center text-2xl text-[#1F4D3A]">
            📜
          </div>
          <h3 className="text-base font-bold font-serif-ayur text-[#1F4D3A]">
            2. Classical Fidelity
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            We adhere strictly to authoritative texts like Charaka Samhita, Sushruta Samhita, and Sharangdhar Samhita, using authentic ratios and methods like Bilona and Kshirpak.
          </p>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E6DFC8] shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#FAF6EC] flex items-center justify-center text-2xl text-[#1F4D3A]">
            ⚖️
          </div>
          <h3 className="text-base font-bold font-serif-ayur text-[#1F4D3A]">
            3. Compliant Medical Ethics
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            We refuse to make deceptive claims like 'curing diabetes' or 'miracle fixes'. We provide honest, sustainable wellness regimens rooted in daily discipline.
          </p>
        </div>
      </div>

      {/* Classical Texts Section */}
      <div className="bg-[#FAF6EC] p-6 sm:p-12 rounded-3xl border border-[#E6DFC8] space-y-6">
        <div className="max-w-xl space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C8922B]">
            Scriptural Authority
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif-ayur text-[#1F4D3A]">
            Anchored in 5,000 Years of Sanskrit Treatises
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="bg-white p-4 rounded-2xl border border-[#E6DFC8] space-y-1">
            <strong className="text-[#1F4D3A] block text-sm">Charaka Samhita</strong>
            <p className="text-gray-500">Rasayana Chikitsa & Internal Medicine foundations</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-[#E6DFC8] space-y-1">
            <strong className="text-[#1F4D3A] block text-sm">Sushruta Samhita</strong>
            <p className="text-gray-500">Metabolic Agni & Botanical surgical purity</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-[#E6DFC8] space-y-1">
            <strong className="text-[#1F4D3A] block text-sm">Ashtanga Hridaya</strong>
            <p className="text-gray-500">Dinacharya, Ritucharya & Daily longevity practices</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-[#E6DFC8] space-y-1">
            <strong className="text-[#1F4D3A] block text-sm">Sharangdhar Samhita</strong>
            <p className="text-gray-500">Precision pharmaceutical decoctions, vatis & tailas</p>
          </div>
        </div>
      </div>

      {/* Vaidya Advisory Board */}
      <div className="space-y-6">
        <div className="text-center space-y-1 max-w-xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C8922B]">
            Clinical Guidance
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif-ayur text-[#1F4D3A]">
            Our Vaidya Advisory Board
          </h2>
          <p className="text-xs text-gray-500">
            Senior BAMS and MD Ayurveda physicians overseeing every single formulation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DOCTORS_VAIDYAS.map((doc) => (
            <div key={doc.id} className="bg-white p-6 rounded-3xl border border-[#E6DFC8] shadow-xs space-y-3">
              <div className="w-14 h-14 rounded-full bg-[#FAF6EC] border-2 border-[#C8922B] flex items-center justify-center text-xl font-bold text-[#1F4D3A]">
                👨‍⚕️
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#1F4D3A]">{doc.name}</h4>
                <p className="text-[11px] text-[#C8922B] font-semibold">{doc.degree}</p>
                <p className="text-[10px] text-gray-400">{doc.experienceYears}+ Years Clinical Practice</p>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed pt-1 border-t border-gray-100">
                {doc.bio}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Box */}
      <div className="text-center pt-4">
        <Link
          href="/shop"
          className="px-8 py-3.5 rounded-full font-bold text-xs sm:text-sm gold-gradient-btn inline-flex items-center gap-2 shadow-md cursor-pointer"
        >
          <span>Explore AARU Proven Formulations</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
