'use client';

import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold font-serif-ayur text-[#1F4D3A]">
          Privacy Policy
        </h1>
        <p className="text-xs text-gray-500">Effective Date: October 2024</p>
      </div>

      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#E6DFC8] shadow-xs space-y-6 text-sm text-gray-700 leading-relaxed">
        <h3 className="text-base font-bold text-[#1F4D3A]">1. Information We Collect</h3>
        <p>
          We collect personal details such as your name, delivery address, mobile number for delivery OTP, email address, and voluntary health responses submitted through the &apos;Know Your Prakriti&apos; quiz.
        </p>

        <h3 className="text-base font-bold text-[#1F4D3A]">2. Use of Your Health & Dosha Data</h3>
        <p>
          Your health concerns and Dosha test answers are utilized solely to generate tailored nutritional and regimen recommendations. We never sell, lease, or distribute your private medical information to third-party advertisers.
        </p>

        <h3 className="text-base font-bold text-[#1F4D3A]">3. Payment Security</h3>
        <p>
          All online transactions (UPI, Credit/Debit cards, Netbanking) are processed via PCI-DSS certified bank gateways (Razorpay). AARU does not store your card CVV or netbanking passwords on any internal server.
        </p>

        <h3 className="text-base font-bold text-[#1F4D3A]">4. WhatsApp & Communication Consent</h3>
        <p>
          By providing your phone number during checkout or quiz completion, you consent to receive transactional notifications regarding order dispatch, delivery verification OTP, and doctor follow-up advice. You may opt out anytime by replying STOP.
        </p>
      </div>
    </div>
  );
}
