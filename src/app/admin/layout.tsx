'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  ShieldCheck,
  FileCheck2,
  ShoppingCart,
  Users,
  Settings,
  ArrowLeft,
  ChevronDown,
  Lock,
  Sparkles,
  HelpCircle
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [role, setRole] = useState<'Owner' | 'Manager' | 'Content' | 'Support'>('Owner');

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Products & Stock", href: "/admin/products", icon: Package },
    { label: "Batches & Lab Reports", href: "/admin/batches", icon: ShieldCheck },
    { label: "Claims & Legal Review", href: "/admin/claims", icon: FileCheck2 },
    { label: "Orders & Shipping", href: "/admin/orders", icon: ShoppingCart },
    { label: "Leads & Quiz Enquiries", href: "/admin/leads", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#3B2F25] flex flex-col md:flex-row">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#1F4D3A] text-[#FAF6EC] p-5 flex flex-col justify-between shrink-0 shadow-xl border-r border-[#143527]">
        <div className="space-y-6">
          
          {/* Logo & Back to Shop */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">🌿</span>
              <span className="font-bold font-serif-ayur text-lg text-white">AARU Admin</span>
            </div>
            <Link
              href="/"
              className="text-[10px] text-[#DFAB48] hover:underline flex items-center gap-1"
            >
              <span>Back to Store</span>
              <ArrowLeft className="w-3 h-3 rotate-180" />
            </Link>
          </div>

          {/* Role Selector Badge */}
          <div className="p-3 bg-black/20 rounded-xl border border-white/10 space-y-1">
            <span className="text-[10px] uppercase font-bold text-[#DFAB48] flex items-center justify-between">
              <span>Active Role:</span>
              <span className="text-[9px] bg-green-500/20 text-green-300 px-1.5 py-0.2 rounded font-mono">
                AUTHENTICATED
              </span>
            </span>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as any)}
              className="w-full bg-[#143527] border border-white/20 rounded-lg p-1.5 text-xs text-white font-semibold focus:outline-none"
            >
              <option value="Owner">Owner (Super Admin)</option>
              <option value="Manager">Manager (Operations & Orders)</option>
              <option value="Content">Content & Legal Auditor</option>
              <option value="Support">Support Desk & Vaidya</option>
            </select>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1.5 text-xs font-semibold">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                    isActive
                      ? 'bg-[#C8922B] text-white shadow-sm font-bold'
                      : 'text-[#FAF6EC]/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

        </div>

        {/* Footer info in sidebar */}
        <div className="pt-4 border-t border-white/10 text-[10px] text-[#FAF6EC]/60 space-y-1">
          <p className="flex items-center gap-1">
            <Lock className="w-3 h-3 text-[#DFAB48]" />
            <span>Role Permissions Active</span>
          </p>
          <p className="font-mono text-[9px]">Server: Next.js App Router API</p>
        </div>
      </aside>

      {/* Main Admin Content Body */}
      <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>

    </div>
  );
}
