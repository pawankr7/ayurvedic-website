'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Order } from '@/types';
import { ShoppingCart, Truck, CheckCircle2, Clock, Search, ExternalLink } from 'lucide-react';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('aaru_orders');
      if (saved) {
        setOrders(JSON.parse(saved));
      } else {
        // Fallback demo orders
        setOrders([
          {
            id: 'ord_1',
            orderNumber: 'AARU-992144',
            customerName: 'Priya Sharma',
            phone: '+91 98112 33445',
            email: 'priya.s@example.com',
            address: { street: 'B-12, Vasant Vihar', city: 'New Delhi', state: 'Delhi', pincode: '110057' },
            items: [{ productId: 'prod-001', productName: 'Triphala Gut Detox', quantity: 2, price: 449, batchNumber: 'AARU-24-GT01' }],
            subtotal: 898,
            discount: 89,
            shipping: 0,
            total: 809,
            paymentMethod: 'UPI',
            paymentStatus: 'PAID',
            orderStatus: 'DISPATCHED',
            awbNumber: 'DEL-9912048',
            courier: 'Delhivery Surface Express',
            createdAt: '2024-10-21T11:30:00.000Z'
          },
          {
            id: 'ord_2',
            orderNumber: 'AARU-882319',
            customerName: 'Col. Rajesh Verma',
            phone: '+91 94191 22334',
            email: 'rajesh.verma@example.com',
            address: { street: 'Flat 402, Army Enclave', city: 'Chandigarh', state: 'Punjab', pincode: '160017' },
            items: [{ productId: 'prod-002', productName: 'Himalayan Shilajit Resin', quantity: 1, price: 999, batchNumber: 'AARU-24-SH02' }],
            subtotal: 999,
            discount: 50,
            shipping: 0,
            total: 949,
            paymentMethod: 'COD',
            paymentStatus: 'COD_CONFIRMED',
            orderStatus: 'PLACED',
            awbNumber: 'DEL-9912049',
            courier: 'Delhivery Surface Express',
            createdAt: '2024-10-22T08:15:00.000Z'
          }
        ]);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleUpdateOrderStatus = (orderNumber: string, newStatus: Order['orderStatus']) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.orderNumber === orderNumber ? { ...ord, orderStatus: newStatus } : ord))
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif-ayur text-[#1F4D3A]">
            Order Fulfillment & Shipping
          </h1>
          <p className="text-xs text-gray-500">
            Delhivery & Shiprocket live synchronization, label printing, and status tracking.
          </p>
        </div>
        <span className="text-xs font-bold font-mono text-[#1F4D3A] bg-white px-3 py-1.5 rounded-xl border border-[#E6DFC8]">
          Total Active Orders: {orders.length}
        </span>
      </div>

      <div className="space-y-4">
        {orders.map((ord) => (
          <div key={ord.orderNumber} className="bg-white p-5 rounded-3xl border border-[#E6DFC8] shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-3 gap-2">
              <div>
                <span className="font-mono font-bold text-sm text-[#1F4D3A] mr-2">
                  #{ord.orderNumber}
                </span>
                <strong className="text-xs text-gray-800">{ord.customerName}</strong>
                <span className="text-xs text-gray-400 ml-2">({ord.phone})</span>
              </div>

              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  ord.paymentMethod === 'COD' ? 'bg-amber-50 text-amber-800 border border-amber-200' : 'bg-green-50 text-green-800 border border-green-200'
                }`}>
                  {ord.paymentMethod} ({ord.paymentStatus})
                </span>

                <select
                  value={ord.orderStatus}
                  onChange={(e) => handleUpdateOrderStatus(ord.orderNumber, e.target.value as any)}
                  className="bg-[#FAF6EC] border border-[#E6DFC8] rounded-lg px-2 py-1 text-xs font-bold text-[#1F4D3A]"
                >
                  <option value="PLACED">PLACED</option>
                  <option value="DISPATCHED">DISPATCHED</option>
                  <option value="IN_TRANSIT">IN TRANSIT</option>
                  <option value="DELIVERED">DELIVERED</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-gray-600">
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 block">Delivery Address:</span>
                <p className="truncate">{ord.address.street}, {ord.address.city}, {ord.address.pincode}</p>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 block">Items Purchased:</span>
                <p className="font-semibold text-[#1F4D3A]">
                  {ord.items.map((i) => `${i.productName} (x${i.quantity})`).join(', ')}
                </p>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 block">Courier & AWB:</span>
                <Link
                  href={`/track-order?awb=${ord.awbNumber || 'DEL-9912048'}`}
                  className="font-mono text-[11px] text-[#C8922B] hover:underline flex items-center gap-1 font-bold"
                >
                  <span>{ord.awbNumber || 'DEL-9912048'}</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#1F4D3A]">
              <span>Grand Total: ₹{ord.total}</span>
              <Link
                href={`/order-success?orderId=${ord.orderNumber}`}
                className="text-[11px] text-[#C8922B] hover:underline font-semibold"
              >
                View Print Invoice →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
