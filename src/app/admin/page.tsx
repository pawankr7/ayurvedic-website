'use client';

import React from 'react';
import Link from 'next/link';
import { PRODUCTS } from '@/data/products';
import { CLAIMS_REGISTRY } from '@/data/claimsCompliance';
import {
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Users,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  AlertTriangle,
  Clock,
  CheckCircle2
} from 'lucide-react';

export default function AdminDashboardPage() {
  const pendingClaims = CLAIMS_REGISTRY.filter((c) => c.legalReviewStatus === 'PENDING').length;
  const approvedClaims = CLAIMS_REGISTRY.filter((c) => c.legalReviewStatus === 'APPROVED').length;

  return (
    <div className="space-y-8">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif-ayur text-[#1F4D3A]">
            Executive Business & Compliance Dashboard
          </h1>
          <p className="text-xs text-gray-500">
            Real-time ecommerce analytics, batch verification audits & legal claims review.
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            href="/admin/claims"
            className="px-3.5 py-2 text-xs font-bold rounded-xl bg-amber-50 text-amber-900 border border-amber-300 flex items-center gap-1.5"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>{pendingClaims} Claims Pending Review</span>
          </Link>
        </div>
      </div>

      {/* 4 Primary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-[#E6DFC8] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-gray-500 text-xs">
            <span>Total Gross Sales (MTD)</span>
            <span className="p-1.5 rounded-lg bg-green-50 text-green-700 font-bold text-[10px] flex items-center gap-0.5">
              +18.4% <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
          <h3 className="text-2xl font-bold text-[#1F4D3A]">₹4,82,450</h3>
          <p className="text-[11px] text-gray-400">1,142 Orders this month</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E6DFC8] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-gray-500 text-xs">
            <span>Average Order Value (AOV)</span>
            <span className="p-1.5 rounded-lg bg-green-50 text-green-700 font-bold text-[10px]">
              +₹120
            </span>
          </div>
          <h3 className="text-2xl font-bold text-[#1F4D3A]">₹1,048</h3>
          <p className="text-[11px] text-gray-400">Lifted by 30/60/90-Day Regimen Kits</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E6DFC8] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-gray-500 text-xs">
            <span>Customer Repeat Rate</span>
            <span className="p-1.5 rounded-lg bg-green-50 text-green-700 font-bold text-[10px]">
              High
            </span>
          </div>
          <h3 className="text-2xl font-bold text-[#1F4D3A]">38.4%</h3>
          <p className="text-[11px] text-gray-400">Driven by 30-Day Subscriptions</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E6DFC8] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-gray-500 text-xs">
            <span>Prakriti Quiz Leads</span>
            <span className="p-1.5 rounded-lg bg-[#FAF6EC] text-[#C8922B] font-bold text-[10px]">
              18.2% Conv.
            </span>
          </div>
          <h3 className="text-2xl font-bold text-[#1F4D3A]">2,890</h3>
          <p className="text-[11px] text-gray-400">Personalized regimen consultations</p>
        </div>

      </div>

      {/* Quiz-to-Purchase Funnel & Regulatory Status */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Funnel */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-[#E6DFC8] shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-[#1F4D3A] flex items-center justify-between border-b pb-2">
            <span>Personalization Funnel (Prakriti Quiz to Order)</span>
            <span className="text-xs text-[#C8922B] font-semibold">Last 30 Days</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-gray-600">1. Quiz Started (Visitors)</span>
                <strong>4,120 (100%)</strong>
              </div>
              <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-[#1F4D3A] h-full w-full rounded-full" />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-gray-600">2. All 6 Questions Completed</span>
                <strong>3,450 (83.7%)</strong>
              </div>
              <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-[#1F4D3A] h-full w-[83.7%] rounded-full" />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-gray-600">3. Lead Info Captured (Phone/WhatsApp)</span>
                <strong>2,890 (70.1%)</strong>
              </div>
              <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-[#C8922B] h-full w-[70.1%] rounded-full" />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-gray-600">4. Recommended Regimen Purchased</span>
                <strong>750 (18.2% Total Conv.)</strong>
              </div>
              <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-green-600 h-full w-[18.2%] rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Regulatory & Claims Status Card */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-[#E6DFC8] shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-[#1F4D3A] border-b pb-2 flex items-center justify-between">
            <span>Claims Compliance Audit</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-green-700 bg-green-50 px-2 py-0.5 rounded">
              AYUSH / ASCI
            </span>
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-green-50 border border-green-200 flex items-center justify-between">
              <span className="flex items-center gap-2 text-green-900 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-green-700" />
                <span>Legally Approved Claims</span>
              </span>
              <strong className="text-green-900 font-mono text-sm">{approvedClaims}</strong>
            </div>

            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between">
              <span className="flex items-center gap-2 text-amber-900 font-semibold">
                <Clock className="w-4 h-4 text-amber-700" />
                <span>Pending Vaidya/Legal Review</span>
              </span>
              <strong className="text-amber-900 font-mono text-sm">{pendingClaims}</strong>
            </div>

            <p className="text-[11px] text-gray-500 leading-snug">
              All promotional copy undergoes automatic keyword audit against prohibited disease curing claims under the Drugs & Magic Remedies Act.
            </p>

            <Link
              href="/admin/claims"
              className="w-full py-2.5 rounded-xl text-xs font-bold bg-[#1F4D3A] text-white flex items-center justify-center gap-1.5 hover:bg-[#143527] transition-all"
            >
              <span>Manage Claims & Approvals</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>

      {/* Top Formulations Quick Table */}
      <div className="bg-white p-6 rounded-3xl border border-[#E6DFC8] shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <h3 className="text-sm font-bold text-[#1F4D3A]">
            Top 5 Revenue Generating Formulations
          </h3>
          <Link href="/admin/products" className="text-xs text-[#C8922B] hover:underline font-bold">
            Manage All Products →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#FAF6EC] text-[#1F4D3A] uppercase text-[10px] font-bold">
              <tr>
                <th className="p-2.5">Product Name</th>
                <th className="p-2.5">Category</th>
                <th className="p-2.5">Price</th>
                <th className="p-2.5">Stock Left</th>
                <th className="p-2.5">Default Batch</th>
                <th className="p-2.5">Claims Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {PRODUCTS.slice(0, 5).map((prod) => (
                <tr key={prod.id}>
                  <td className="p-2.5 font-bold text-[#1F4D3A]">{prod.name}</td>
                  <td className="p-2.5 text-gray-500">{prod.categoryName}</td>
                  <td className="p-2.5 font-mono">₹{prod.price}</td>
                  <td className="p-2.5 font-mono">{prod.stockCount} units</td>
                  <td className="p-2.5 font-mono text-[11px] text-gray-600">{prod.defaultBatch}</td>
                  <td className="p-2.5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-50 text-green-700">
                      APPROVED
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
