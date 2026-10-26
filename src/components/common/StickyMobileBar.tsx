'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { Home, Sparkles, ShieldCheck, ShoppingBag, MessageCircle } from 'lucide-react';

export default function StickyMobileBar() {
  const pathname = usePathname();
  const { totalItemCount, openCart } = useCart();
  const { isHindi } = useLanguage();

  // Hide on admin routes
  if (pathname.startsWith('/admin') || pathname === '/checkout') {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-t border-[#E6DFC8] px-2 py-1.5 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] sticky-mobile-bar">
      <div className="flex items-center justify-around text-[10px] font-medium text-[#3B2F25]">
        
        {/* Home */}
        <Link
          href="/"
          className={`flex flex-col items-center py-1 px-2 rounded-lg transition-colors ${
            pathname === '/' ? 'text-[#1F4D3A] font-bold' : 'text-gray-500'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span>{isHindi ? "होम" : "Home"}</span>
        </Link>

        {/* Prakriti Quiz */}
        <Link
          href="/prakriti-quiz"
          className={`flex flex-col items-center py-1 px-2 rounded-lg transition-colors ${
            pathname === '/prakriti-quiz' ? 'text-[#C8922B] font-bold' : 'text-[#C8922B]'
          }`}
        >
          <Sparkles className="w-5 h-5 mb-0.5 text-[#C8922B]" />
          <span>{isHindi ? "प्रकृति टेस्ट" : "Quiz"}</span>
        </Link>

        {/* Verify Batch */}
        <Link
          href="/verify-batch"
          className={`flex flex-col items-center py-1 px-2 rounded-lg transition-colors ${
            pathname === '/verify-batch' ? 'text-[#1F4D3A] font-bold' : 'text-gray-500'
          }`}
        >
          <ShieldCheck className="w-5 h-5 mb-0.5 text-[#1F4D3A]" />
          <span>{isHindi ? "बैच जांच" : "Verify"}</span>
        </Link>

        {/* WhatsApp Consultation */}
        <a
          href="https://wa.me/919876543210?text=Namaste%20AARU%20Ayurveda,%20I%20need%20assistance"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center py-1 px-2 rounded-lg text-green-700"
        >
          <MessageCircle className="w-5 h-5 mb-0.5" />
          <span>{isHindi ? "सलाह लें" : "WhatsApp"}</span>
        </a>

        {/* Cart Drawer Trigger */}
        <button
          onClick={openCart}
          className="flex flex-col items-center py-1 px-2 rounded-lg text-[#1F4D3A] relative cursor-pointer"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 mb-0.5" />
            {totalItemCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#C8922B] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalItemCount}
              </span>
            )}
          </div>
          <span>{isHindi ? "कार्ट" : "Cart"}</span>
        </button>

      </div>
    </div>
  );
}
