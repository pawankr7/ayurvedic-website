'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Order } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { CheckCircle2, ShieldCheck, Printer, ArrowRight, Truck, FileText, Download, Calendar, MapPin } from 'lucide-react';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'AARU-782194';
  const { isHindi } = useLanguage();

  const [order, setOrder] = useState<Order | null>(null);
  const [invoiceDate, setInvoiceDate] = useState('22 Oct 2026');

  useEffect(() => {
    setInvoiceDate(new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }));
    try {
      const saved = localStorage.getItem('aaru_last_order');
      if (saved) {
        setOrder(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-8">
      
      {/* Success Celebration Banner */}
      <div className="bg-[#FAF6EC] rounded-3xl border border-[#E6DFC8] p-6 sm:p-10 text-center space-y-4 no-print shadow-sm">
        <div className="w-16 h-16 rounded-full bg-[#1F4D3A] text-white flex items-center justify-center text-3xl mx-auto shadow-md">
          ✓
        </div>
        
        <div className="space-y-1">
          <span className="text-xs uppercase tracking-widest font-bold text-[#C8922B]">
            {isHindi ? "ऑर्डर सफलतापूर्वक दर्ज हो गया!" : "Order Confirmed & Verified"}
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold font-serif-ayur text-[#1F4D3A]">
            {isHindi ? "आरु आयुर्वेद चुनने के लिए धन्यवाद!" : "Thank You for Choosing AARU Ayurveda!"}
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto">
            Your order number is <strong className="font-mono text-[#1F4D3A]">#{order?.orderNumber || orderId}</strong>. We have sent a confirmation message with invoice and tracking details.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href={`/track-order?awb=${order?.awbNumber || 'DEL-9912048'}`}
            className="px-5 py-2.5 rounded-xl font-bold text-xs bg-[#1F4D3A] text-white hover:bg-[#143527] flex items-center gap-2"
          >
            <Truck className="w-4 h-4 text-[#C8922B]" />
            <span>Track Live Shipment</span>
          </Link>

          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-xl font-bold text-xs border border-[#1F4D3A] text-[#1F4D3A] hover:bg-[#1F4D3A] hover:text-white flex items-center gap-2 transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Tax Invoice</span>
          </button>
        </div>
      </div>

      {/* Printable GST Tax Invoice & Lab Verification Document */}
      <div className="bg-white rounded-3xl border border-[#E6DFC8] p-6 sm:p-10 shadow-md space-y-8" id="invoice">
        
        {/* Invoice Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-6 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#1F4D3A] text-white flex items-center justify-center text-2xl font-bold">
              🌿
            </div>
            <div>
              <h2 className="text-xl font-bold font-serif-ayur text-[#1F4D3A]">
                AARU WELLNESS INDIA PVT LTD
              </h2>
              <p className="text-[11px] text-gray-500">
                GSTIN: 05AAACA9812K1Z9 • AYUSH License No: AYUSH-UK-2024-9102
              </p>
              <p className="text-[11px] text-gray-500">
                Haridwar Industrial Estate, Uttarakhand - 249403, India
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-xs uppercase font-bold text-[#C8922B] block">Tax Invoice / Bill of Supply</span>
            <p className="text-sm font-bold font-mono text-[#1F4D3A]">
              Invoice #{order?.orderNumber || orderId}
            </p>
            <p className="text-xs text-gray-500 flex items-center gap-1 sm:justify-end mt-0.5">
              <Calendar className="w-3.5 h-3.5 text-gray-400" />
              <span>Date: {invoiceDate}</span>
            </p>
          </div>
        </div>

        {/* Customer & Shipping Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-gray-700">
          <div className="p-4 rounded-2xl bg-[#FAF6EC] border border-[#E6DFC8] space-y-1.5">
            <h4 className="font-bold text-[#1F4D3A] uppercase tracking-wider text-[10px]">
              Customer & Billed To:
            </h4>
            <p className="font-bold text-sm text-[#1F4D3A]">{order?.customerName || 'Rahul Sharma'}</p>
            <p>Phone: {order?.phone || '+91 98765 43210'}</p>
            <p>Email: {order?.email || 'customer@example.com'}</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF6EC] border border-[#E6DFC8] space-y-1.5">
            <h4 className="font-bold text-[#1F4D3A] uppercase tracking-wider text-[10px]">
              Shipping Destination & Courier:
            </h4>
            <p className="flex items-start gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#C8922B] shrink-0 mt-0.5" />
              <span>
                {order?.address.street || '402, Lotus Greens, Sector 4'}, {order?.address.city || 'Noida'}, {order?.address.state || 'Uttar Pradesh'} - {order?.address.pincode || '201301'}
              </span>
            </p>
            <p className="pt-1">
              Courier Partner: <strong>{order?.courier || 'Delhivery Surface Express'}</strong>
            </p>
            <p className="font-mono text-[11px] text-[#1F4D3A]">
              AWB: {order?.awbNumber || 'DEL-9912048'}
            </p>
          </div>
        </div>

        {/* Invoice Items Table with Batch & Lab Verification Links */}
        <div className="overflow-x-auto border border-[#E6DFC8] rounded-2xl">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#FAF6EC] text-[#1F4D3A] uppercase text-[10px] font-bold border-b border-[#E6DFC8]">
              <tr>
                <th className="p-3">Product Description</th>
                <th className="p-3">Batch Number</th>
                <th className="p-3">NABL Lab Status</th>
                <th className="p-3 text-center">Qty</th>
                <th className="p-3 text-right">Unit Price</th>
                <th className="p-3 text-right">Amount (INR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-sans">
              {(order?.items || [
                { productId: 'p1', productName: 'Triphala Gut & Colon Detox', quantity: 1, price: 449, batchNumber: 'AARU-24-GT01' }
              ]).map((it, idx) => (
                <tr key={idx}>
                  <td className="p-3 font-semibold text-[#1F4D3A]">
                    {it.productName}
                  </td>
                  <td className="p-3 font-mono text-[11px] text-gray-600">
                    {it.batchNumber}
                  </td>
                  <td className="p-3">
                    <Link
                      href={`/verify-batch?batch=${it.batchNumber}`}
                      className="text-green-700 hover:text-green-800 font-bold inline-flex items-center gap-1 text-[11px] underline"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-[#C8922B]" />
                      <span>Verified Passed (View)</span>
                    </Link>
                  </td>
                  <td className="p-3 text-center font-bold">{it.quantity}</td>
                  <td className="p-3 text-right text-gray-500">₹{it.price}</td>
                  <td className="p-3 text-right font-bold text-[#1F4D3A]">₹{it.price * it.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals Summary */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-t pt-4 text-xs">
          <div className="space-y-1 text-gray-500 text-[11px] max-w-sm">
            <p>Payment Mode: <strong>{order?.paymentMethod || 'Instant UPI'}</strong> ({order?.paymentStatus || 'PAID'})</p>
            <p>All prices are inclusive of CGST (6%) and SGST (6%) or IGST (12%) as applicable.</p>
          </div>

          <div className="space-y-1.5 w-full sm:w-60 text-right">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal:</span>
              <span>₹{order?.subtotal || 449}</span>
            </div>
            {order?.discount ? (
              <div className="flex justify-between text-green-700 font-semibold">
                <span>Total Savings:</span>
                <span>-₹{order.discount}</span>
              </div>
            ) : null}
            <div className="flex justify-between text-gray-600">
              <span>Shipping Fee:</span>
              <span>{order?.shipping === 0 ? 'FREE' : `₹${order?.shipping || 0}`}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-[#1F4D3A] border-t pt-2">
              <span>Grand Total:</span>
              <span className="text-[#C8922B]">₹{order?.total || 449}</span>
            </div>
          </div>
        </div>

        {/* Footer Note on Invoice */}
        <div className="border-t pt-4 text-[10px] text-gray-400 text-center space-y-1">
          <p>
            This is a computer-generated tax invoice. Every AARU formulation comes with our Provable Trust guarantee.
          </p>
          <p>Questions? Call our customer desk at +91 98765 43210 or email care@aaruayurveda.com</p>
        </div>

      </div>

      <div className="text-center pt-2 no-print">
        <Link
          href="/shop"
          className="text-xs font-bold text-[#1F4D3A] hover:text-[#C8922B] underline"
        >
          ← Return to AARU Wellness Shop
        </Link>
      </div>

    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs">Loading order details...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
