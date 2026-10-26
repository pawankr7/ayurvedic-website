'use client';

import React from 'react';

export default function RefundPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold font-serif-ayur text-[#1F4D3A]">
          Refund & Return Policy
        </h1>
        <p className="text-xs text-gray-500">7-Day Hassle-Free Policy</p>
      </div>

      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#E6DFC8] shadow-xs space-y-6 text-sm text-gray-700 leading-relaxed">
        <h3 className="text-base font-bold text-[#1F4D3A]">1. Eligibility for Returns</h3>
        <p>
          Due to strict Ayurvedic safety and sterile packaging standards, we accept returns on items within 7 days of delivery, provided the outer seal is intact, the product is unopened, and the original batch barcode is present.
        </p>

        <h3 className="text-base font-bold text-[#1F4D3A]">2. Damaged or Tampered Shipments</h3>
        <p>
          If your shipment arrives damaged, leaked, or with a broken seal, please take a clear photograph or unboxing video and WhatsApp our care desk at +91 98765 43210 within 48 hours. We will initiate an immediate free replacement.
        </p>

        <h3 className="text-base font-bold text-[#1F4D3A]">3. Refund Processing</h3>
        <p>
          Approved refunds will be credited back to your original source of payment (UPI or Bank Account) within 5 to 7 business days from the receipt of the returned item at our fulfillment hub.
        </p>
      </div>
    </div>
  );
}
