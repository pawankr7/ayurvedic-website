'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Home, Sparkles } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl border border-[#E6DFC8] shadow-md text-center space-y-5">
        <div className="w-16 h-16 rounded-full bg-[#FAF6EC] border border-[#C8922B]/40 flex items-center justify-center text-3xl mx-auto shadow-inner">
          🌿
        </div>

        <div className="space-y-1">
          <span className="text-xs uppercase font-bold text-[#C8922B] tracking-widest">
            404 • Page Not Found
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif-ayur text-[#1F4D3A]">
            Lost on the Ayurvedic Path?
          </h1>
          <p className="text-xs text-gray-500 leading-relaxed">
            The page or batch code you are searching for might have been relocated or updated in our classical archives.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            href="/"
            className="flex-1 py-3 px-4 rounded-xl text-xs font-bold gold-gradient-btn flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>

          <Link
            href="/shop"
            className="flex-1 py-3 px-4 rounded-xl text-xs font-bold border border-[#1F4D3A] text-[#1F4D3A] hover:bg-[#FAF6EC] flex items-center justify-center gap-1.5"
          >
            <span>Browse Catalog</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
