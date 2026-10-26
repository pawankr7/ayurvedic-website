'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { Truck, CheckCircle2, Clock, MapPin, Package, ShieldCheck, Search } from 'lucide-react';

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const awbParam = searchParams.get('awb') || 'DEL-9912048';
  const { isHindi } = useLanguage();

  const [inputAwb, setInputAwb] = useState(awbParam);
  const [activeAwb, setActiveAwb] = useState(awbParam);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputAwb.trim()) {
      setActiveAwb(inputAwb.trim());
    }
  };

  const steps = [
    { title: "Order Placed & Verified", desc: "Received at Haridwar Ayurvedic Fulfillment Hub", time: "Oct 21, 10:14 AM", status: "completed" },
    { title: "Batch Quality Cleared", desc: "NABL Lab Certificate attached to shipment", time: "Oct 21, 02:30 PM", status: "completed" },
    { title: "Handed Over to Courier", desc: "Picked up by Delhivery Express Logistics", time: "Oct 21, 06:45 PM", status: "completed" },
    { title: "In Transit", desc: "Departed National Hub toward destination center", time: "Oct 22, 08:20 AM", status: "current" },
    { title: "Out for Delivery", desc: "Delivery executive will verify doorstep OTP", time: "Expected Tomorrow by 2:00 PM", status: "pending" }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-10">
      
      <div className="text-center space-y-3 max-w-xl mx-auto">
        <span className="text-xs uppercase tracking-widest font-bold text-[#C8922B]">
          Courier & Shipment Status
        </span>
        <h1 className="text-2xl sm:text-4xl font-bold font-serif-ayur text-[#1F4D3A]">
          Track Your Order
        </h1>
        <p className="text-xs sm:text-sm text-gray-600">
          Enter your AARU order number or AWB consignment tracking ID below.
        </p>
      </div>

      {/* AWB Search Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-[#E6DFC8] shadow-xs max-w-xl mx-auto">
        <form onSubmit={handleTrack} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              required
              value={inputAwb}
              onChange={(e) => setInputAwb(e.target.value)}
              placeholder="e.g. DEL-9912048 or AARU-782194"
              className="w-full pl-9 pr-3 py-2 text-xs bg-[#FAF6EC] border border-[#E6DFC8] rounded-xl font-mono uppercase"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2 text-xs font-bold rounded-xl gold-gradient-btn flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Truck className="w-3.5 h-3.5" />
            <span>Track</span>
          </button>
        </form>
      </div>

      {/* Live Status Timeline Box */}
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#E6DFC8] shadow-md space-y-6">
        
        {/* Header Information */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-green-700 bg-green-50 px-2.5 py-0.5 rounded-full border border-green-200">
                In Transit
              </span>
              <span className="text-xs font-mono font-bold text-gray-500">
                AWB #{activeAwb}
              </span>
            </div>
            <h3 className="text-lg font-bold font-serif-ayur text-[#1F4D3A] mt-1">
              Delhivery Surface Express
            </h3>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-xs text-gray-500 block">Expected Arrival:</span>
            <strong className="text-sm text-[#C8922B] font-bold">Tomorrow by 2:00 PM</strong>
          </div>
        </div>

        {/* Milestone Steps Timeline */}
        <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#E6DFC8]">
          {steps.map((step, idx) => (
            <div key={idx} className="relative">
              {/* Dot Icon */}
              <div
                className={`absolute -left-6 sm:-left-8 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  step.status === 'completed'
                    ? 'bg-green-700 text-white'
                    : step.status === 'current'
                    ? 'bg-[#C8922B] text-white ring-4 ring-[#C8922B]/20 animate-pulse'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {step.status === 'completed' ? '✓' : idx + 1}
              </div>

              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h4 className={`text-xs sm:text-sm font-bold ${
                    step.status === 'current' ? 'text-[#1F4D3A]' : step.status === 'completed' ? 'text-gray-800' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </h4>
                  <span className="text-[11px] text-gray-400 font-mono">{step.time}</span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs">Loading shipment tracker...</div>}>
      <TrackOrderContent />
    </Suspense>
  );
}
