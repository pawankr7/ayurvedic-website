'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { Star, ShieldCheck, Check, Sparkles, ShoppingBag, Zap } from 'lucide-react';

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { isHindi } = useLanguage();
  const router = useRouter();

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1, false);
    router.push('/checkout');
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1, false);
  };

  return (
    <div className="group bg-white rounded-2xl border border-[#E6DFC8] hover:border-[#C8922B]/60 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden relative">
      
      {/* Badges Overlay */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex flex-col gap-1">
          {product.certified ? (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#1F4D3A] text-white shadow-xs">
              <ShieldCheck className="w-3 h-3 text-[#C8922B]" />
              <span>{product.certificateType} Certified</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#3B2F25] text-white shadow-xs">
              <span>Classical Formula</span>
            </span>
          )}

          {product.isBestSeller && (
            <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#C8922B] text-white shadow-xs">
              ★ {isHindi ? "बेस्टसेलर" : "Bestseller"}
            </span>
          )}
        </div>

        {/* 100% Veg Symbol */}
        <div className="w-5 h-5 rounded-sm border border-green-600 flex items-center justify-center p-0.5 bg-white/90 shadow-xs" title="100% Vegetarian Ayurvedic Formulation">
          <div className="w-2.5 h-2.5 rounded-full bg-green-600" />
        </div>
      </div>

      {/* Product Image Stage */}
      <Link href={`/product/${product.slug}`} className="block relative bg-[#FAF6EC] pt-12 pb-6 px-4 overflow-hidden border-b border-[#FAF6EC]">
        <div className="w-full h-44 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
          {/* Aesthetic Herbal Illustration / Representation */}
          <div className="w-28 h-28 rounded-2xl bg-gradient-to-tr from-[#1F4D3A]/10 to-[#C8922B]/20 border border-[#C8922B]/30 flex flex-col items-center justify-center shadow-inner text-[#1F4D3A]">
            <span className="text-4xl mb-1">
              {product.form === 'oil' ? '🫒' : product.form === 'juice' ? '🧪' : product.form === 'powder' ? '🥣' : '🌿'}
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#C8922B]">
              {product.form}
            </span>
          </div>
        </div>

        {/* Batch Code Micro-Tag */}
        <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[10px] text-gray-500 font-mono">
          <span className="flex items-center gap-1 text-[#1F4D3A] font-semibold">
            <Check className="w-3 h-3 text-[#C8922B]" />
            <span>Batch {product.defaultBatch}</span>
          </span>
          <span className="text-[#C8922B] hover:underline font-sans font-medium">
            {isHindi ? "लैब रिपोर्ट देखें" : "NABL Verified"}
          </span>
        </div>
      </Link>

      {/* Product Body Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Category & Life stage */}
          <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1">
            <span className="font-medium text-[#1F4D3A] uppercase tracking-wider text-[10px]">
              {product.categoryName}
            </span>
            {product.rating && (
              <div className="flex items-center gap-1 bg-[#FAF6EC] px-1.5 py-0.5 rounded text-[11px] font-bold text-[#1F4D3A] border border-[#E6DFC8]">
                <Star className="w-3 h-3 fill-[#C8922B] text-[#C8922B]" />
                <span>{product.rating}</span>
                <span className="text-gray-400 font-normal">({product.reviewsCount})</span>
              </div>
            )}
          </div>

          {/* Product Title */}
          <Link href={`/product/${product.slug}`} className="block group-hover:text-[#1F4D3A] transition-colors">
            <h3 className="text-sm sm:text-base font-bold font-serif-ayur text-[#3B2F25] line-clamp-1 leading-snug">
              {isHindi ? product.hindiName : product.name}
            </h3>
          </Link>

          {/* Subtitle / Key Herbs */}
          <p className="text-xs text-gray-600 line-clamp-2 mt-1 leading-relaxed">
            {isHindi ? product.hindiSubtitle : product.subtitle}
          </p>

          {/* Primary Herb Chips */}
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {product.ingredients.slice(0, 2).map((ing, i) => (
              <span
                key={i}
                className="text-[10px] bg-[#EEF3EA] text-[#1F4D3A] font-medium px-2 py-0.5 rounded-full border border-[#DDE5D6]"
              >
                {isHindi ? ing.hindiName : ing.name.split('(')[0]}
              </span>
            ))}
          </div>
        </div>

        {/* Pricing & Subscription Perks */}
        <div className="pt-2 border-t border-[#FAF6EC] space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-[#1F4D3A]">
              ₹{product.price}
            </span>
            {product.originalPrice > product.price && (
              <>
                <span className="text-xs text-gray-400 line-through">
                  ₹{product.originalPrice}
                </span>
                <span className="text-[10px] font-bold text-green-700 bg-green-50 px-1.5 py-0.5 rounded">
                  {product.discountPercentage}% OFF
                </span>
              </>
            )}
          </div>

          {/* Regimen / Subscription Hook */}
          {product.subscriptionEligible && (
            <div className="flex items-center gap-1 text-[10px] text-[#C8922B] font-semibold bg-[#FAF6EC] p-1.5 rounded-lg border border-[#C8922B]/20">
              <Sparkles className="w-3 h-3 shrink-0" />
              <span>
                {isHindi
                  ? "मासिक सब्सक्रिप्शन पर अतिरिक्त 15% की छूट"
                  : "Subscribe & Save 15% (₹" + Math.round(product.price * 0.85) + " / mo)"}
              </span>
            </div>
          )}

          {/* Buttons: Add to Cart + Buy Now */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={handleAddToCart}
              className="py-2 px-2 rounded-xl text-xs font-bold border border-[#1F4D3A] text-[#1F4D3A] hover:bg-[#1F4D3A] hover:text-white transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{isHindi ? "कार्ट में जोड़ें" : "Add to Cart"}</span>
            </button>
            <button
              onClick={handleBuyNow}
              className="py-2 px-2 rounded-xl text-xs font-bold gold-gradient-btn flex items-center justify-center gap-1 cursor-pointer shadow-xs"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>{isHindi ? "अभी खरीदें" : "Buy Now"}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
