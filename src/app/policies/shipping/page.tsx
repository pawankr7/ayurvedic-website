'use client';

import React from 'react';

export default function ShippingPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold font-serif-ayur text-[#1F4D3A]">
          Shipping & Delivery Policy
        </h1>
        <p className="text-xs text-gray-500">Serviceable across 19,000+ Indian Pincodes</p>
      </div>

      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#E6DFC8] shadow-xs space-y-6 text-sm text-gray-700 leading-relaxed">
        <h3 className="text-base font-bold text-[#1F4D3A]">1. Free Shipping Threshold</h3>
        <p>
          We offer FREE standard delivery on all domestic orders of ₹599 and above. For orders below ₹599, a nominal flat shipping fee of ₹60 is applied to cover courier logistics.
        </p>

        <h3 className="text-base font-bold text-[#1F4D3A]">2. Delivery Timelines</h3>
        <ul className="list-disc pl-5 space-y-1 text-xs">
          <li><strong>Metro Cities (Delhi NCR, Mumbai, Bengaluru, Chennai, Kolkata, Hyderabad):</strong> 2 to 3 business days.</li>
          <li><strong>Tier 2 and Tier 3 Cities:</strong> 3 to 5 business days.</li>
          <li><strong>North-East, J&K, and Remote Island Regions:</strong> 5 to 7 business days.</li>
        </ul>

        <h3 className="text-base font-bold text-[#1F4D3A]">3. Cash on Delivery (COD) Guidelines</h3>
        <p>
          Cash on Delivery is available across 98% of serviceable pincodes. To prevent non-delivery and shipping losses, orders exceeding ₹3,000 may require phone OTP verification prior to dispatch.
        </p>

        <h3 className="text-base font-bold text-[#1F4D3A]">4. Real-Time Tracking</h3>
        <p>
          Once your package is dispatched from our Haridwar hub, an Air Waybill (AWB) number and live tracking link will be sent via SMS and WhatsApp. You can also track your shipment at any time via /track-order.
        </p>
      </div>
    </div>
  );
}
