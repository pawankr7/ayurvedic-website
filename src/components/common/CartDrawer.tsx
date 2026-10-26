'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, Sparkles } from 'lucide-react';

export default function CartDrawer() {
  const {
    isCartOpen,
    closeCart,
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

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const res = applyCoupon(inputCoupon);
    setCouponMsg(res);
    if (res.success) {
      setInputCoupon('');
    }
  };

  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF6EC] shadow-2xl flex flex-col border-l border-[#E6DFC8] animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-4 sm:p-5 bg-white border-b border-[#E6DFC8] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">🌿</span>
              <h2 className="text-base font-bold font-serif-ayur text-[#1F4D3A]">
                {t.cart.title} ({items.length})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="p-3 bg-[#EEF3EA] border-b border-[#DDE5D6] text-xs">
            <div className="flex items-center justify-between font-semibold text-[#1F4D3A] mb-1.5">
              <span>
                {hasFreeShipping
                  ? (isHindi ? "🎉 पूरे भारत में मुफ्त डिलीवरी अनलॉक हो गई!" : "🎉 You unlocked FREE Express Delivery!")
                  : (isHindi ? `मुफ्त डिलीवरी के लिए ₹${freeShippingGap} और जोड़ें` : `Add ₹${freeShippingGap} more for FREE Delivery`)}
              </span>
              <span>{progressPercent}%</span>
            </div>
            <div className="w-full bg-[#DDE5D6] h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#1F4D3A] to-[#C8922B] h-full transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-white border border-[#E6DFC8] flex items-center justify-center text-2xl">
                  🍃
                </div>
                <h3 className="font-bold text-[#1F4D3A]">{t.cart.empty}</h3>
                <p className="text-xs text-gray-500 max-w-xs">{t.cart.emptySub}</p>
                <Link
                  href="/shop"
                  onClick={closeCart}
                  className="mt-2 px-5 py-2.5 rounded-full text-xs font-bold bg-[#1F4D3A] text-white hover:bg-[#143527] transition-all"
                >
                  {t.cart.startShopping}
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={`${item.product.id}-${item.isSubscription ? 'sub' : 'onetime'}`}
                  className="bg-white p-3.5 rounded-xl border border-[#E6DFC8] shadow-xs flex gap-3"
                >
                  <div className="w-16 h-16 rounded-lg bg-[#FAF6EC] border border-[#E6DFC8] flex items-center justify-center text-xl shrink-0 font-bold text-[#1F4D3A]">
                    🌿
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <Link
                        href={`/product/${item.product.slug}`}
                        onClick={closeCart}
                        className="text-xs font-bold text-[#1F4D3A] hover:underline line-clamp-1"
                      >
                        {isHindi ? item.product.hindiName : item.product.name}
                      </Link>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-0.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {item.isSubscription && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#1F4D3A] bg-[#EEF3EA] px-2 py-0.5 rounded-full mt-1">
                        <Sparkles className="w-2.5 h-2.5 text-[#C8922B]" />
                        {isHindi ? "मासिक ऑटो-डिलीवरी (15% छूट)" : "Monthly Subscription (15% OFF)"}
                      </span>
                    )}

                    <div className="flex items-center justify-between mt-2">
                      {/* Price */}
                      <div>
                        <span className="text-xs font-bold text-[#1F4D3A]">
                          ₹{item.price * item.quantity}
                        </span>
                        {item.quantity > 1 && (
                          <span className="text-[10px] text-gray-400 ml-1">
                            (₹{item.price} each)
                          </span>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center border border-[#E6DFC8] rounded-md overflow-hidden bg-[#FAF6EC]">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-1 text-xs hover:bg-[#DDE5D6] transition-colors"
                        >
                          <Minus className="w-3 h-3 text-[#1F4D3A]" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-[#1F4D3A]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-1 text-xs hover:bg-[#DDE5D6] transition-colors"
                        >
                          <Plus className="w-3 h-3 text-[#1F4D3A]" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer / Summary / Checkout */}
          {items.length > 0 && (
            <div className="p-4 bg-white border-t border-[#E6DFC8] space-y-3">
              
              {/* Coupon Box */}
              {!couponCode ? (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-gray-400" />
                    <input
                      type="text"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value)}
                      placeholder={isHindi ? "कूपन कोड (जैसे AARU10)" : "Coupon code (e.g. AARU10)"}
                      className="w-full pl-8 pr-2 py-1.5 text-xs bg-[#FAF6EC] border border-[#E6DFC8] rounded-lg uppercase"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-1.5 text-xs font-bold bg-[#1F4D3A] text-white rounded-lg hover:bg-[#143527] cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
              ) : (
                <div className="flex items-center justify-between p-2 rounded-lg bg-[#EEF3EA] text-xs font-semibold text-[#1F4D3A]">
                  <span className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-[#C8922B]" />
                    <span>Coupon <strong>{couponCode}</strong> applied (-₹{totalDiscount})</span>
                  </span>
                  <button onClick={removeCoupon} className="text-red-500 hover:underline text-[11px]">
                    Remove
                  </button>
                </div>
              )}

              {couponMsg && (
                <p className={`text-[11px] ${couponMsg.success ? 'text-green-700' : 'text-red-600'}`}>
                  {couponMsg.message}
                </p>
              )}

              {/* Price Details */}
              <div className="space-y-1.5 text-xs border-t border-gray-100 pt-2">
                <div className="flex justify-between text-gray-600">
                  <span>{t.cart.subtotal}</span>
                  <span>₹{subtotal}</span>
                </div>
                {totalDiscount > 0 && (
                  <div className="flex justify-between text-green-700 font-medium">
                    <span>{t.cart.discount}</span>
                    <span>-₹{totalDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>{t.cart.shipping}</span>
                  <span>{shipping === 0 ? <strong className="text-green-700">FREE</strong> : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#1F4D3A] border-t border-gray-100 pt-2">
                  <span>{t.cart.total}</span>
                  <span className="text-[#C8922B]">₹{total}</span>
                </div>
              </div>

              {/* Checkout Action Button */}
              <Link
                href="/checkout"
                onClick={closeCart}
                className="w-full py-3 rounded-xl font-bold text-xs sm:text-sm text-center flex items-center justify-center gap-2 gold-gradient-btn"
              >
                <span>{t.cart.proceedToCheckout} (₹{total})</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="text-center">
                <span className="text-[10px] text-gray-400 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[#1F4D3A]" />
                  <span>100% Verified Batch Guarantee • Easy COD & Instant UPI</span>
                </span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
