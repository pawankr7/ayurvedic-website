'use client';

import React from 'react';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold font-serif-ayur text-[#1F4D3A]">
          Terms of Service
        </h1>
        <p className="text-xs text-gray-500">Last updated: October 2024</p>
      </div>

      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#E6DFC8] shadow-xs space-y-6 text-sm text-gray-700 leading-relaxed">
        <h3 className="text-base font-bold text-[#1F4D3A]">1. Agreement to Terms</h3>
        <p>
          By accessing or placing an order through AARU Ayurveda (aaruayurveda.com), you agree to be bound by these Terms of Service and all applicable laws and regulations of India.
        </p>

        <h3 className="text-base font-bold text-[#1F4D3A]">2. Product Usage & Dosages</h3>
        <p>
          Customers must adhere strictly to the recommended dosages specified on product packaging. If adverse reactions occur, discontinue use immediately and consult a registered medical doctor.
        </p>

        <h3 className="text-base font-bold text-[#1F4D3A]">3. Pricing & Taxes</h3>
        <p>
          All product prices listed in Indian Rupees (INR) include applicable Goods and Services Tax (GST). We reserve the right to revise pricing or discount promotions without prior notice.
        </p>

        <h3 className="text-base font-bold text-[#1F4D3A]">4. Governing Jurisdiction</h3>
        <p>
          These terms are governed in accordance with the laws of the State of Uttarakhand and Republic of India. Any legal disputes are subject to the exclusive jurisdiction of courts in Haridwar, Uttarakhand.
        </p>
      </div>
    </div>
  );
}
