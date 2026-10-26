'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { MANDATORY_MEDICAL_DISCLAIMER_EN, MANDATORY_MEDICAL_DISCLAIMER_HI } from '@/data/claimsCompliance';
import { ShieldCheck, AlertTriangle } from 'lucide-react';

export default function MedicalDisclaimerPage() {
  const { isHindi } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      <div className="space-y-2 text-center">
        <span className="text-xs uppercase font-bold text-[#C8922B] tracking-widest">
          Regulatory Compliance
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold font-serif-ayur text-[#1F4D3A]">
          Statutory Medical & Legal Disclaimer
        </h1>
      </div>

      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#E6DFC8] shadow-xs space-y-6 text-sm text-gray-700 leading-relaxed">
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 space-y-2">
          <div className="flex items-center gap-2 font-bold text-amber-900">
            <AlertTriangle className="w-5 h-5 text-amber-700" />
            <span>Official Mandatory Statutory Notice (Under Drugs & Magic Remedies Act)</span>
          </div>
          <p className="text-xs leading-relaxed">
            <strong>English:</strong> {MANDATORY_MEDICAL_DISCLAIMER_EN}
          </p>
          <p className="text-xs leading-relaxed text-amber-900/80">
            <strong>हिन्दी:</strong> {MANDATORY_MEDICAL_DISCLAIMER_HI}
          </p>
        </div>

        <h3 className="text-base font-bold text-[#1F4D3A]">1. Scope of Products & General Wellness</h3>
        <p>
          All products offered under the brand name AARU are intended to support general physiological balance, nutrition, and traditional Ayurvedic harmony. They are not formulated, advertised, or sold as a replacement for emergency clinical care, hospital treatment, or prescription medicine for serious chronic conditions.
        </p>

        <h3 className="text-base font-bold text-[#1F4D3A]">2. Professional Medical Consultation</h3>
        <p>
          Always seek the advice of your qualified primary physician or certified BAMS Ayurvedic practitioner with any questions you may have regarding a medical condition, prescription interactions, or dietary changes. Never disregard professional medical advice or delay seeking it because of information read on this website.
        </p>

        <h3 className="text-base font-bold text-[#1F4D3A]">3. Pregnancy & Lactation</h3>
        <p>
          If you are pregnant, planning to become pregnant, nursing, or undergoing fertility treatment, consult your obstetrician before taking any herbal formulation. Certain botanicals may naturally stimulate uterine contractions or affect lactation.
        </p>

        <h3 className="text-base font-bold text-[#1F4D3A]">4. Batch Traceability & Lab Testing</h3>
        <p>
          AARU maintains independent third-party NABL laboratory test results for each manufactured batch. While we verify botanical identity and the absence of toxic heavy metals, individual biological responses to herbs may vary depending on personal constitution (Prakriti).
        </p>
      </div>
    </div>
  );
}
