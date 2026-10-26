'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { PRODUCTS } from '@/data/products';
import { ShieldCheck, Star, CheckCircle2, ArrowRight, Zap, Truck, Award, AlertCircle } from 'lucide-react';

export default function GutCareLandingPage() {
  const router = useRouter();
  const { addItem } = useCart();
  const product = PRODUCTS.find((p) => p.slug === 'triphala-gut-detox') || PRODUCTS[0];

  const [quantity, setQuantity] = useState(1);

  const handleInstantBuy = () => {
    addItem(product, quantity, false);
    router.push('/checkout');
  };

  return (
    <div className="min-h-screen bg-[#FAF6EC] text-[#3B2F25] space-y-12 pb-16">
      
      {/* Top Distraction-Free Header */}
      <header className="bg-white border-b border-[#E6DFC8] py-4 px-4 sticky top-0 z-30 shadow-xs">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold font-serif-ayur text-[#1F4D3A]">AARU</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C8922B] bg-[#FAF6EC] px-2 py-0.5 rounded border border-[#C8922B]/30">
              Doctor Special
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#1F4D3A]">
            <ShieldCheck className="w-4 h-4 text-[#C8922B]" />
            <span className="hidden sm:inline">NABL Lab Tested • AYUSH Certified</span>
            <button
              onClick={handleInstantBuy}
              className="ml-2 px-4 py-1.5 rounded-full text-xs font-bold gold-gradient-btn"
            >
              Order Now
            </button>
          </div>
        </div>
      </header>

      {/* Hero Offer Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl border-2 border-[#C8922B]/30 p-6 sm:p-10 shadow-xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          <div className="md:col-span-7 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-bold border border-red-200">
              <span>🔥 Limited Offer: Extra 25% OFF Today</span>
            </span>

            <h1 className="text-2xl sm:text-4xl font-bold font-serif-ayur text-[#1F4D3A] leading-tight">
              Relieve Morning Acidity, Gas & Bloating Naturally in 5 Days.
            </h1>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Formulated with 100% wild-harvested Pratapgarh Amla and classical Haritaki in authentic 1:2:4 ratio. Zero habit-forming senna, zero chemicals. Every batch verifiable with third-party NABL lab report.
            </p>

            <ul className="space-y-2 text-xs text-gray-700 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-700 shrink-0" />
                <span>Supports natural overnight bowel movement without cramping</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-700 shrink-0" />
                <span>Soothes recurring sour burps, burning stomach & heavy bloating</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-700 shrink-0" />
                <span>100% NABL Lab tested: 0% toxic Lead, Mercury, or Arsenic</span>
              </li>
            </ul>

            {/* Price & CTA */}
            <div className="pt-2 space-y-3">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-[#1F4D3A]">₹449</span>
                <span className="text-sm text-gray-400 line-through">₹599</span>
                <span className="text-xs font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded">
                  25% Instant Savings
                </span>
              </div>

              <button
                onClick={handleInstantBuy}
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm gold-gradient-btn flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <Zap className="w-4 h-4" />
                <span>Order Now (Cash on Delivery Available)</span>
              </button>

              <div className="text-[11px] text-gray-400 flex items-center gap-3">
                <span>✓ Free Express Shipping</span>
                <span>✓ Delivery in 3 Days</span>
                <span>✓ Cash on Delivery (COD)</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-5 bg-[#FAF6EC] p-6 rounded-2xl border border-[#E6DFC8] text-center space-y-3">
            <span className="text-6xl">🌿</span>
            <h3 className="font-bold text-sm text-[#1F4D3A] font-serif-ayur">
              Triphala Gut & Colon Detox
            </h3>
            <p className="text-xs text-gray-500 font-mono">
              Current Batch #AARU-24-GT01 • Passed NABL
            </p>
            <div className="bg-white p-3 rounded-xl border border-[#E6DFC8] text-xs text-left space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-500">Lead Purity:</span>
                <strong className="text-green-700 font-mono">0.28 ppm (Limit 10)</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">E. Coli:</span>
                <strong className="text-green-700 font-mono">Absent / g (Passed)</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Active Tannins:</span>
                <strong className="text-[#C8922B] font-mono">42.8% w/w</strong>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Social Proof & Doctor Endorsement */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-white p-6 rounded-3xl border border-[#E6DFC8] grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="space-y-1">
            <div className="flex text-[#C8922B]">★★★★★</div>
            <p className="italic text-gray-700">&ldquo;Acidity was ruining my mornings. After taking 2 tablets at bedtime with lukewarm water, I feel completely light and regular.&rdquo;</p>
            <p className="font-bold text-[#1F4D3A]">— Priya Sen, Lucknow</p>
          </div>
          <div className="space-y-1">
            <div className="flex text-[#C8922B]">★★★★★</div>
            <p className="italic text-gray-700">&ldquo;The best part is they show the lab test report on the website. No heavy metals, pure wild amla. Truly authentic.&rdquo;</p>
            <p className="font-bold text-[#1F4D3A]">— Anand Sharma, Jaipur</p>
          </div>
          <div className="space-y-1">
            <div className="flex text-[#C8922B]">★★★★★</div>
            <p className="italic text-gray-700">&ldquo;Gentle on stomach, no loose motions like cheap laxative churans. Highly recommended by my Ayurvedic doctor.&rdquo;</p>
            <p className="font-bold text-[#1F4D3A]">— Sunita Rao, Hyderabad</p>
          </div>
        </div>
      </section>

      {/* Sticky Bottom Bar on Mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-[#E6DFC8] p-3 shadow-xl">
        <div className="flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] text-gray-400 block line-through">₹599</span>
            <span className="text-base font-bold text-[#1F4D3A]">₹449</span>
          </div>
          <button
            onClick={handleInstantBuy}
            className="flex-1 py-3 rounded-xl font-bold text-xs gold-gradient-btn"
          >
            Buy Now (COD Available)
          </button>
        </div>
      </div>

    </div>
  );
}
