'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { PRODUCTS } from '@/data/products';
import { ShieldCheck, CheckCircle2, Zap, Star } from 'lucide-react';

export default function JointCareLandingPage() {
  const router = useRouter();
  const { addItem } = useCart();
  const product = PRODUCTS.find((p) => p.slug === 'shallaki-guggul-joint-flex') || PRODUCTS[4];

  const handleBuy = () => {
    addItem(product, 1, false);
    router.push('/checkout');
  };

  return (
    <div className="min-h-screen bg-[#FAF6EC] text-[#3B2F25] space-y-12 pb-16">
      <header className="bg-white border-b border-[#E6DFC8] py-4 px-4 sticky top-0 z-30 shadow-xs">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold font-serif-ayur text-[#1F4D3A]">AARU</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C8922B] bg-[#FAF6EC] px-2 py-0.5 rounded border border-[#C8922B]/30">
              Joint & Knee Mobility
            </span>
          </div>
          <button
            onClick={handleBuy}
            className="px-4 py-1.5 rounded-full text-xs font-bold gold-gradient-btn cursor-pointer"
          >
            Claim 23% Off
          </button>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl border-2 border-[#C8922B]/30 p-6 sm:p-10 shadow-xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200">
              <span>🦴 Classical Shallaki (AKBA 65%) + Hadjod Formula</span>
            </span>

            <h1 className="text-2xl sm:text-4xl font-bold font-serif-ayur text-[#1F4D3A] leading-tight">
              Walk, Climb Stairs & Stand Without Stiffness or Knee Discomfort.
            </h1>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Standardized Boswellia serrata gum resin with bone-healing Hadjod and purified Yograj Guggulu. Lubricates the synovial fluid in knee and hip joints, protects delicate cartilage from wear, and pacifies painful Vata friction.
            </p>

            <ul className="space-y-2 text-xs text-gray-700 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-700 shrink-0" />
                <span>Helps reduce morning joint stiffness & cracking sounds (Crepitus)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-700 shrink-0" />
                <span>100% gentle on stomach linings unlike synthetic pain relievers</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-700 shrink-0" />
                <span>Tested Batch #AARU-24-JT05: 67.2% Boswellic acids verified</span>
              </li>
            </ul>

            <div className="pt-2 space-y-3">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-[#1F4D3A]">₹649</span>
                <span className="text-sm text-gray-400 line-through">₹849</span>
                <span className="text-xs font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded">
                  23% Savings Today
                </span>
              </div>

              <button
                onClick={handleBuy}
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm gold-gradient-btn flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <Zap className="w-4 h-4" />
                <span>Order Now (Cash on Delivery Available)</span>
              </button>
            </div>
          </div>

          <div className="md:col-span-5 bg-[#FAF6EC] p-6 rounded-2xl border border-[#E6DFC8] text-center space-y-3">
            <span className="text-6xl">🦵</span>
            <h3 className="font-bold text-sm text-[#1F4D3A] font-serif-ayur">
              Shallaki & Yograj Guggulu Joint Flex
            </h3>
            <p className="text-xs text-gray-500 font-mono">
              Batch #AARU-24-JT05 • Apex Analytical NABL
            </p>
            <div className="bg-white p-3 rounded-xl border border-[#E6DFC8] text-xs text-left space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-500">Boswellic Acids:</span>
                <strong className="text-[#C8922B] font-mono">67.2% w/w</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Lead (Pb):</span>
                <strong className="text-green-700 font-mono">0.31 ppm (Limit 10)</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Pesticides:</span>
                <strong className="text-green-700 font-mono">None Detected</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-white p-6 rounded-3xl border border-[#E6DFC8] grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="space-y-1">
            <div className="flex text-[#C8922B]">★★★★★</div>
            <p className="italic text-gray-700">&ldquo;My father is 64 and had trouble descending stairs due to knee pain. After 3 weeks of Shallaki, he takes his morning garden walks with ease.&rdquo;</p>
            <p className="font-bold text-[#1F4D3A]">— Vikram Nair, Chennai</p>
          </div>
          <div className="space-y-1">
            <div className="flex text-[#C8922B]">★★★★★</div>
            <p className="italic text-gray-700">&ldquo;No acidity issues at all. Regular allopathic painkillers used to hurt my stomach. AARU is pure, safe Ayurveda.&rdquo;</p>
            <p className="font-bold text-[#1F4D3A]">— Gurmeet Kaur, Chandigarh</p>
          </div>
          <div className="space-y-1">
            <div className="flex text-[#C8922B]">★★★★★</div>
            <p className="italic text-gray-700">&ldquo;Verified the batch number on their website. Report matches NABL laboratory accreditation. Remarkable quality.&rdquo;</p>
            <p className="font-bold text-[#1F4D3A]">— Ramesh Chandra, Bhopal</p>
          </div>
        </div>
      </section>

      {/* Sticky Mobile Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-[#E6DFC8] p-3 shadow-xl">
        <div className="flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] text-gray-400 block line-through">₹849</span>
            <span className="text-base font-bold text-[#1F4D3A]">₹649</span>
          </div>
          <button
            onClick={handleBuy}
            className="flex-1 py-3 rounded-xl font-bold text-xs gold-gradient-btn"
          >
            Buy Now (COD Available)
          </button>
        </div>
      </div>
    </div>
  );
}
