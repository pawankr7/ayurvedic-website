'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { ShieldCheck, CheckCircle2, Lock, ArrowLeft, Truck, Zap, CreditCard, Banknote, Tag, AlertCircle } from 'lucide-react';

export default function CheckoutPage() {
  const { items, subtotal, totalDiscount, shipping, total, clearCart, couponCode } = useCart();
  const { t, isHindi } = useLanguage();
  const router = useRouter();

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('Uttar Pradesh');
  const [pincode, setPincode] = useState('');
  
  // Pincode validation state
  const [pincodeStatus, setPincodeStatus] = useState<{ checked: boolean; serviceable: boolean; message: string } | null>(null);

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'CARD' | 'COD'>('UPI');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate UPI 5% discount if chosen
  const upiDiscount = paymentMethod === 'UPI' ? Math.round((total * 5) / 100) : 0;
  const finalPayable = Math.max(0, total - upiDiscount);

  // Pincode check logic
  const handleCheckPincode = () => {
    if (pincode.trim().length === 6 && /^\d+$/.test(pincode)) {
      setPincodeStatus({
        checked: true,
        serviceable: true,
        message: '✓ Express Delivery Available! Estimated delivery in 3 to 4 business days via Delhivery/Shiprocket.'
      });
    } else {
      setPincodeStatus({
        checked: true,
        serviceable: false,
        message: '⚠️ Please enter a valid 6-digit Indian pincode.'
      });
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setIsSubmitting(true);

    const orderNumber = `AARU-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
      id: `ord_${Date.now()}`,
      orderNumber,
      customerName: fullName,
      phone,
      email,
      address: {
        street,
        city,
        state: stateName,
        pincode
      },
      items: items.map((i) => ({
        productId: i.product.id,
        productName: i.product.name,
        quantity: i.quantity,
        price: i.price,
        batchNumber: i.product.defaultBatch
      })),
      subtotal,
      discount: totalDiscount + upiDiscount,
      shipping,
      total: finalPayable,
      paymentMethod,
      paymentStatus: paymentMethod === 'COD' ? 'COD_CONFIRMED' : 'PAID',
      orderStatus: 'PLACED',
      awbNumber: `DEL-${Math.floor(100000000 + Math.random() * 900000000)}`,
      courier: 'Delhivery Surface Express',
      createdAt: new Date().toISOString()
    };

    // Store in localStorage for Order Tracking & Admin fulfillment
    try {
      const orders = JSON.parse(localStorage.getItem('aaru_orders') || '[]');
      orders.unshift(newOrder);
      localStorage.setItem('aaru_orders', JSON.stringify(orders));
      localStorage.setItem('aaru_last_order', JSON.stringify(newOrder));
    } catch {
      // ignore
    }

    setTimeout(() => {
      clearCart();
      router.push(`/order-success?orderId=${newOrder.orderNumber}`);
    }, 1200);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold font-serif-ayur text-[#1F4D3A]">Your cart is empty</h2>
        <p className="text-xs text-gray-500">Please add products before checking out.</p>
        <Link href="/shop" className="inline-block px-5 py-2.5 rounded-full text-xs font-bold gold-gradient-btn">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Checkout Header */}
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-3">
          <Link href="/cart" className="text-gray-400 hover:text-gray-700">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl sm:text-3xl font-bold font-serif-ayur text-[#1F4D3A]">
              {t.checkout.title}
            </h1>
            <p className="text-xs text-gray-500">
              {items.length} items • Total ₹{finalPayable}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-green-700 font-semibold bg-green-50 px-3 py-1 rounded-full border border-green-200">
          <Lock className="w-3.5 h-3.5" />
          <span>256-Bit SSL Encrypted</span>
        </div>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Delivery & Payment Details */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Section 1: Customer Contact Info */}
          <div className="bg-white p-6 rounded-3xl border border-[#E6DFC8] shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-[#1F4D3A] flex items-center gap-2 border-b pb-2">
              <span className="w-5 h-5 rounded-full bg-[#1F4D3A] text-white flex items-center justify-center text-[10px]">1</span>
              <span>{t.checkout.contactInfo}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-gray-700">{t.checkout.fullName} *</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-3.5 py-2.5 bg-[#FAF6EC] border border-[#E6DFC8] rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700">{t.checkout.phone} *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="10-digit mobile number"
                  className="w-full px-3.5 py-2.5 bg-[#FAF6EC] border border-[#E6DFC8] rounded-xl"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="font-bold text-gray-700">{t.checkout.email} *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="For tax invoice PDF & dispatch tracking"
                  className="w-full px-3.5 py-2.5 bg-[#FAF6EC] border border-[#E6DFC8] rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Shipping Address & Pincode Serviceability */}
          <div className="bg-white p-6 rounded-3xl border border-[#E6DFC8] shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-[#1F4D3A] flex items-center gap-2 border-b pb-2">
              <span className="w-5 h-5 rounded-full bg-[#1F4D3A] text-white flex items-center justify-center text-[10px]">2</span>
              <span>{t.checkout.shippingAddress}</span>
            </h3>

            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-gray-700">{t.checkout.address} *</label>
                <input
                  type="text"
                  required
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder="House/Flat No., Road, Landmark"
                  className="w-full px-3.5 py-2.5 bg-[#FAF6EC] border border-[#E6DFC8] rounded-xl"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-gray-700">{t.checkout.pincode} *</label>
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="6 digits"
                      className="w-full px-3 py-2 bg-[#FAF6EC] border border-[#E6DFC8] rounded-xl font-mono text-xs"
                    />
                    <button
                      type="button"
                      onClick={handleCheckPincode}
                      className="px-2.5 py-2 text-[11px] font-bold bg-[#1F4D3A] text-white rounded-xl hover:bg-[#143527] shrink-0"
                    >
                      Check
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-gray-700">{t.checkout.city} *</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City / Town"
                    className="w-full px-3 py-2 bg-[#FAF6EC] border border-[#E6DFC8] rounded-xl"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-gray-700">{t.checkout.state} *</label>
                  <input
                    type="text"
                    required
                    value={stateName}
                    onChange={(e) => setStateName(e.target.value)}
                    placeholder="State"
                    className="w-full px-3 py-2 bg-[#FAF6EC] border border-[#E6DFC8] rounded-xl"
                  />
                </div>
              </div>

              {pincodeStatus && (
                <div className={`p-2.5 rounded-xl text-[11px] ${
                  pincodeStatus.serviceable ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  {pincodeStatus.message}
                </div>
              )}
            </div>
          </div>

          {/* Section 3: Payment Method Selection */}
          <div className="bg-white p-6 rounded-3xl border border-[#E6DFC8] shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-[#1F4D3A] flex items-center gap-2 border-b pb-2">
              <span className="w-5 h-5 rounded-full bg-[#1F4D3A] text-white flex items-center justify-center text-[10px]">3</span>
              <span>{t.checkout.paymentMethod}</span>
            </h3>

            <div className="space-y-3 text-xs">
              
              {/* Option 1: UPI */}
              <label className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                paymentMethod === 'UPI' ? 'border-[#1F4D3A] bg-[#EEF3EA] shadow-xs' : 'border-[#E6DFC8] bg-[#FAF6EC]/50 hover:bg-[#FAF6EC]'
              }`}>
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    value="UPI"
                    checked={paymentMethod === 'UPI'}
                    onChange={() => setPaymentMethod('UPI')}
                    className="text-[#1F4D3A] focus:ring-[#1F4D3A]"
                  />
                  <div>
                    <span className="font-bold text-[#1F4D3A] block">
                      Instant UPI (Google Pay, PhonePe, Paytm, QR)
                    </span>
                    <span className="text-[11px] text-green-700 font-semibold">
                      Extra 5% Instant Discount (Save ₹{Math.round((total * 5) / 100)})
                    </span>
                  </div>
                </div>
                <Zap className="w-5 h-5 text-[#C8922B]" />
              </label>

              {/* Option 2: Cards / Netbanking */}
              <label className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                paymentMethod === 'CARD' ? 'border-[#1F4D3A] bg-[#EEF3EA] shadow-xs' : 'border-[#E6DFC8] bg-[#FAF6EC]/50 hover:bg-[#FAF6EC]'
              }`}>
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    value="CARD"
                    checked={paymentMethod === 'CARD'}
                    onChange={() => setPaymentMethod('CARD')}
                    className="text-[#1F4D3A] focus:ring-[#1F4D3A]"
                  />
                  <div>
                    <span className="font-bold text-[#1F4D3A] block">
                      Credit / Debit Card & Netbanking (Razorpay)
                    </span>
                    <span className="text-[11px] text-gray-500">
                      Visa, Mastercard, RuPay, Corporate Netbanking
                    </span>
                  </div>
                </div>
                <CreditCard className="w-5 h-5 text-[#1F4D3A]" />
              </label>

              {/* Option 3: COD */}
              <label className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                paymentMethod === 'COD' ? 'border-[#1F4D3A] bg-[#EEF3EA] shadow-xs' : 'border-[#E6DFC8] bg-[#FAF6EC]/50 hover:bg-[#FAF6EC]'
              }`}>
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    value="COD"
                    checked={paymentMethod === 'COD'}
                    onChange={() => setPaymentMethod('COD')}
                    className="text-[#1F4D3A] focus:ring-[#1F4D3A]"
                  />
                  <div>
                    <span className="font-bold text-[#1F4D3A] block">
                      Cash on Delivery (COD)
                    </span>
                    <span className="text-[11px] text-gray-500">
                      Pay cash or scan courier QR at doorstep
                    </span>
                  </div>
                </div>
                <Banknote className="w-5 h-5 text-[#1F4D3A]" />
              </label>

            </div>
          </div>

        </div>

        {/* Right Column: Order Summary & Place Button */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-[#E6DFC8] shadow-md space-y-4 sticky top-24">
            <h3 className="text-base font-bold font-serif-ayur text-[#1F4D3A] border-b pb-3">
              {t.checkout.orderSummary}
            </h3>

            {/* Items review */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.product.id} className="flex items-center justify-between text-xs py-1 border-b border-gray-50">
                  <div className="flex-1 min-w-0 pr-2">
                    <p className="font-bold text-[#1F4D3A] truncate">
                      {isHindi ? item.product.hindiName : item.product.name}
                    </p>
                    <p className="text-[10px] text-gray-400">
                      Qty: {item.quantity} • Batch {item.product.defaultBatch}
                    </p>
                  </div>
                  <span className="font-bold text-[#1F4D3A] shrink-0">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="space-y-2 text-xs border-t pt-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span>₹{subtotal}</span>
              </div>
              {totalDiscount > 0 && (
                <div className="flex justify-between text-green-700 font-semibold">
                  <span>Coupon Discount ({couponCode}):</span>
                  <span>-₹{totalDiscount}</span>
                </div>
              )}
              {upiDiscount > 0 && (
                <div className="flex justify-between text-green-700 font-semibold">
                  <span>UPI 5% Extra Discount:</span>
                  <span>-₹{upiDiscount}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600">
                <span>Shipping:</span>
                <span>{shipping === 0 ? <strong className="text-green-700">FREE</strong> : `₹${shipping}`}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-[#1F4D3A] border-t pt-3">
                <span>Total Payable:</span>
                <span className="text-[#C8922B]">₹{finalPayable}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl font-bold text-xs sm:text-sm text-center gold-gradient-btn flex items-center justify-center gap-2 shadow-lg cursor-pointer disabled:opacity-50"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>
                {isSubmitting
                  ? "Securing Your Order..."
                  : paymentMethod === 'COD'
                  ? t.checkout.placeOrderCod
                  : `Pay ₹${finalPayable} & Place Order`}
              </span>
            </button>

            <div className="text-center pt-2 space-y-1">
              <p className="text-[10px] text-gray-400 flex items-center justify-center gap-1">
                <Lock className="w-3 h-3 text-[#1F4D3A]" />
                <span>{t.checkout.securityBadge}</span>
              </p>
              <p className="text-[10px] text-gray-400">
                A link to your verified batch lab reports will be included on your invoice.
              </p>
            </div>
          </div>
        </div>

      </form>

    </div>
  );
}
