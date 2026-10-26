'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, Sparkles, ShoppingBag } from 'lucide-react';

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    subtotal,
    totalDiscount,
    shipping,
    total,
    freeShippingThreshold,
    freeShippingGap,
    hasFreeShipping,
    couponCode,
    applyCoupon,
    removeCoupon
  } = useCart();
  const { t, isHindi } = useLanguage();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ success: boolean; message: string } | null>(null);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const res = applyCoupon(inputCoupon);
    setCouponMsg(res);
    if (res.success) setInputCoupon('');
  };

  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-20 h-20 rounded-full bg-white border border-[#E6DFC8] flex items-center justify-center text-4xl mx-auto shadow-sm">
          🍃
        </div>
        <h1 className="text-2xl font-bold font-serif-ayur text-[#1F4D3A]">{t.cart.empty}</h1>
        <p className="text-xs sm:text-sm text-gray-500 max-w-sm mx-auto">{t.cart.emptySub}</p>
        <Link
          href="/shop"
          className="inline-block mt-3 px-6 py-3 rounded-full text-xs font-bold bg-[#1F4D3A] text-white hover:bg-[#143527] transition-all shadow-md"
        >
          {t.cart.startShopping}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      <div className="space-y-1">
        <span className="text-xs font-bold uppercase tracking-widest text-[#C8922B]">
          Review Your Order
        </span>
        <h1 className="text-2xl sm:text-4xl font-bold font-serif-ayur text-[#1F4D3A]">
          {t.cart.title} ({items.length})
        </h1>
      </div>

      {/* Free Shipping Meter */}
      <div className="p-4 bg-[#EEF3EA] rounded-2xl border border-[#DDE5D6] text-xs">
        <div className="flex items-center justify-between font-semibold text-[#1F4D3A] mb-1.5">
          <span>
            {hasFreeShipping
              ? (isHindi ? "🎉 बधाई! आपको पूरे भारत में मुफ्त डिलीवरी मिल गई है!" : "🎉 You have unlocked FREE Express Delivery Across India!")
              : (isHindi ? `मुफ्त डिलीवरी के लिए ₹${freeShippingGap} और जोड़ें!` : `Add ₹${freeShippingGap} more to unlock FREE Delivery!`)}
          </span>
          <span>{progressPercent}%</span>
        </div>
        <div className="w-full bg-[#DDE5D6] h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-[#1F4D3A] to-[#C8922B] h-full transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Items */}
        <div className="lg:col-span-8 space-y-4">
          {items.map((item) => (
            <div
              key={`${item.product.id}-${item.isSubscription ? 'sub' : 'one'}`}
              className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E6DFC8] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-[#FAF6EC] border border-[#E6DFC8] flex items-center justify-center text-2xl font-bold shrink-0">
                  🌿
                </div>
                <div>
                  <Link
                    href={`/product/${item.product.slug}`}
                    className="text-sm font-bold text-[#1F4D3A] hover:underline"
                  >
                    {isHindi ? item.product.hindiName : item.product.name}
                  </Link>
                  <p className="text-xs text-gray-500 font-mono mt-0.5">
                    Batch #{item.product.defaultBatch} • {item.product.categoryName}
                  </p>
                  {item.isSubscription && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#1F4D3A] bg-[#EEF3EA] px-2 py-0.5 rounded-full mt-1">
                      <Sparkles className="w-2.5 h-2.5 text-[#C8922B]" />
                      <span>{isHindi ? "मासिक ऑटो-डिलीवरी (15% छूट)" : "Monthly Subscription (15% OFF)"}</span>
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0">
                <div className="flex items-center border border-[#E6DFC8] rounded-lg bg-[#FAF6EC]">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="px-2.5 py-1 text-xs hover:bg-[#DDE5D6]"
                  >
                    <Minus className="w-3.5 h-3.5 text-[#1F4D3A]" />
                  </button>
                  <span className="px-3 text-xs font-bold text-[#1F4D3A]">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="px-2.5 py-1 text-xs hover:bg-[#DDE5D6]"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#1F4D3A]" />
                  </button>
                </div>

                <div className="text-right">
                  <span className="text-sm font-bold text-[#1F4D3A]">₹{item.price * item.quantity}</span>
                </div>

                <button
                  onClick={() => removeItem(item.product.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center pt-2">
            <Link
              href="/shop"
              className="text-xs font-bold text-[#1F4D3A] hover:underline flex items-center gap-1"
            >
              <span>← Continue Shopping</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-[#E6DFC8] shadow-md space-y-4">
            <h3 className="text-base font-bold font-serif-ayur text-[#1F4D3A] border-b pb-3">
              Order Summary
            </h3>

            {/* Coupon Code Input */}
            {!couponCode ? (
              <form onSubmit={handleApply} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value)}
                    placeholder="Coupon (e.g. AARU10)"
                    className="w-full pl-8 pr-2 py-2 text-xs bg-[#FAF6EC] border border-[#E6DFC8] rounded-xl uppercase font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold bg-[#1F4D3A] text-white rounded-xl hover:bg-[#143527] cursor-pointer"
                >
                  Apply
                </button>
              </form>
            ) : (
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#EEF3EA] text-xs font-semibold text-[#1F4D3A]">
                <span className="flex items-center gap-1.5">
                  <Tag className="w-4 h-4 text-[#C8922B]" />
                  <span>Coupon <strong>{couponCode}</strong> applied</span>
                </span>
                <button onClick={removeCoupon} className="text-red-500 hover:underline text-[11px]">
                  Remove
                </button>
              </div>
            )}

            {couponMsg && (
              <p className={`text-[11px] ${couponMsg.success ? 'text-green-700 font-medium' : 'text-red-600'}`}>
                {couponMsg.message}
              </p>
            )}

            {/* Breakdown */}
            <div className="space-y-2 text-xs border-t pt-3">
              <div className="flex justify-between text-gray-600">
                <span>{t.cart.subtotal}</span>
                <span>₹{subtotal}</span>
              </div>
              {totalDiscount > 0 && (
                <div className="flex justify-between text-green-700 font-semibold">
                  <span>{t.cart.discount}</span>
                  <span>-₹{totalDiscount}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600">
                <span>{t.cart.shipping}</span>
                <span>{shipping === 0 ? <strong className="text-green-700">FREE</strong> : `₹${shipping}`}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#1F4D3A] border-t pt-3">
                <span>{t.cart.total}</span>
                <span className="text-[#C8922B]">₹{total}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm text-center flex items-center justify-center gap-2 gold-gradient-btn shadow-md"
            >
              <span>{t.cart.proceedToCheckout}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="text-center pt-2">
              <span className="text-[10px] text-gray-400 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1F4D3A]" />
                <span>NABL Lab Verified Quality • 256-Bit SSL Checkout</span>
              </span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
