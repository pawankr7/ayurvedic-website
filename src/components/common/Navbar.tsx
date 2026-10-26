'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { CATEGORIES } from '@/data/categories';
import { PRODUCTS } from '@/data/products';
import {
  Search,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Menu,
  X,
  ChevronDown,
  Globe,
  PhoneCall,
  CheckCircle2,
  Clock
} from 'lucide-react';

export default function Navbar() {
  const { t, language, toggleLanguage, isHindi } = useLanguage();
  const { totalItemCount, openCart } = useCart();
  const pathname = usePathname();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isConcernDropdownOpen, setIsConcernDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<typeof PRODUCTS>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsConcernDropdownOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  // Live search filter
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const q = searchQuery.toLowerCase().trim();
    const filtered = PRODUCTS.filter((p) => {
      return (
        p.name.toLowerCase().includes(q) ||
        p.hindiName.includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.ingredients.some((ing) => ing.name.toLowerCase().includes(q) || ing.hindiName.includes(q))
      );
    }).slice(0, 5);
    setSearchResults(filtered);
  }, [searchQuery]);

  // Close search popup on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full shadow-sm bg-[#FAF6EC]/95 backdrop-blur-md border-b border-[#E6DFC8]">
      {/* 1. Announcement Bar */}
      <div className="bg-[#1F4D3A] text-[#FAF6EC] text-xs py-2 px-4 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-[#C8922B] text-white">
              VERIFIED BATCH
            </span>
            <span className="hidden sm:inline">
              {isHindi
                ? "सभी उत्पादों की NABL लैब रिपोर्ट उपलब्ध • ₹599+ पर पूरे भारत में मुफ्त डिलीवरी"
                : "Every batch lab-tested with NABL reports • Free Express Shipping on ₹599+"}
            </span>
            <span className="sm:hidden">
              {isHindi ? "₹599+ पर मुफ्त डिलीवरी • 100% लैब टेस्टेड" : "Free Delivery ₹599+ • NABL Tested"}
            </span>
          </div>

          <div className="flex items-center space-x-4 text-[11px] font-medium shrink-0">
            <Link
              href="/verify-batch"
              className="hover:text-[#C8922B] transition-colors flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#C8922B]" />
              <span className="hidden md:inline">{t.nav.verifyBatch}</span>
            </Link>
            <span className="text-[#3B2F25]/30">|</span>
            <a
              href="https://wa.me/919876543210?text=Namaste,%20I%20want%20to%20order%20AARU%20Ayurveda%20products"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#DFAB48] hover:underline flex items-center gap-1"
            >
              <PhoneCall className="w-3 h-3" />
              <span>{isHindi ? "व्हाट्सएप ऑर्डर" : "WhatsApp Order"}</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Left: Mobile hamburger & Brand Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[#1F4D3A] hover:bg-[#DDE5D6]/50 rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle Navigation"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              {/* Botanical Leaf Motif Logo */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1F4D3A] to-[#2A684F] flex items-center justify-center text-[#FAF6EC] shadow-md border border-[#C8922B]/40 group-hover:scale-105 transition-transform shrink-0">
                <svg className="w-6 h-6 text-[#C8922B]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold tracking-tight font-serif-ayur text-[#1F4D3A] leading-none">
                  AARU
                </span>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-[#C8922B] mt-0.5 whitespace-nowrap">
                  {isHindi ? "आयुर्वेद • प्रमाण सहित" : "Ayurveda, Proven"}
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Desktop Navigation Links (Single Line, Perfectly Aligned) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2.5 text-xs xl:text-[13px] font-semibold text-[#3B2F25] shrink-0">
            <Link
              href="/"
              className={`whitespace-nowrap px-2.5 py-1.5 rounded-lg transition-colors ${
                pathname === '/' ? 'text-[#1F4D3A] font-bold bg-[#1F4D3A]/5' : 'hover:text-[#1F4D3A]'
              }`}
            >
              {t.nav.home}
            </Link>

            {/* Concern Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsConcernDropdownOpen(true)}
              onMouseLeave={() => setIsConcernDropdownOpen(false)}
            >
              <button
                className={`whitespace-nowrap px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition-colors cursor-pointer ${
                  pathname.startsWith('/shop') ? 'text-[#1F4D3A] font-bold bg-[#1F4D3A]/5' : 'hover:text-[#1F4D3A]'
                }`}
              >
                <span>{t.nav.byConcern}</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#C8922B]" />
              </button>

              {isConcernDropdownOpen && (
                <div className="absolute top-full left-0 w-80 bg-white rounded-xl shadow-xl border border-[#E6DFC8] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-2 border-b border-[#FAF6EC] bg-[#FAF6EC]">
                    <p className="text-xs font-semibold text-[#1F4D3A] uppercase tracking-wider">
                      {isHindi ? "समस्या अनुसार आयुर्वेदिक श्रेणियां" : "Shop by Health Concern"}
                    </p>
                  </div>
                  <div className="max-h-96 overflow-y-auto py-1">
                    {CATEGORIES.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/shop/${cat.slug}`}
                        className="flex items-center justify-between px-4 py-2 text-xs hover:bg-[#DDE5D6]/30 text-[#3B2F25] hover:text-[#1F4D3A] transition-colors"
                      >
                        <span className="font-medium">
                          {isHindi ? cat.hindiName : cat.name}
                        </span>
                        {cat.badge && (
                          <span className="text-[10px] bg-[#FAF6EC] text-[#C8922B] border border-[#C8922B]/30 px-1.5 py-0.5 rounded font-medium">
                            {cat.badge}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                  <div className="px-4 py-2.5 border-t border-[#FAF6EC] bg-[#FAF6EC]/60">
                    <Link
                      href="/shop"
                      className="text-xs font-bold text-[#1F4D3A] hover:text-[#C8922B] flex items-center justify-between"
                    >
                      <span>{isHindi ? "सभी 20 उत्पाद देखें →" : "Browse All Formulations →"}</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Highlighted Prakriti Quiz Pill */}
            <Link
              href="/prakriti-quiz"
              className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs border ${
                pathname === '/prakriti-quiz'
                  ? 'bg-[#C8922B] text-white border-[#C8922B] shadow-gold'
                  : 'bg-[#C8922B]/10 text-[#C8922B] border-[#C8922B]/30 hover:bg-[#C8922B]/20'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.nav.prakritiQuiz}</span>
            </Link>

            {/* Verify Batch */}
            <Link
              href="/verify-batch"
              className={`whitespace-nowrap px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                pathname === '/verify-batch' ? 'text-[#1F4D3A] font-bold bg-[#1F4D3A]/5' : 'hover:text-[#1F4D3A]'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#1F4D3A]" />
              <span>{t.nav.verifyBatch}</span>
            </Link>

            <Link
              href="/quality"
              className={`whitespace-nowrap px-2.5 py-1.5 rounded-lg transition-colors ${
                pathname === '/quality' ? 'text-[#1F4D3A] font-bold bg-[#1F4D3A]/5' : 'hover:text-[#1F4D3A]'
              }`}
            >
              {t.nav.quality}
            </Link>

            <Link
              href="/blog"
              className={`whitespace-nowrap px-2.5 py-1.5 rounded-lg transition-colors ${
                pathname.startsWith('/blog') ? 'text-[#1F4D3A] font-bold bg-[#1F4D3A]/5' : 'hover:text-[#1F4D3A]'
              }`}
            >
              {t.nav.blog}
            </Link>

            <Link
              href="/about"
              className={`whitespace-nowrap px-2.5 py-1.5 rounded-lg transition-colors ${
                pathname === '/about' ? 'text-[#1F4D3A] font-bold bg-[#1F4D3A]/5' : 'hover:text-[#1F4D3A]'
              }`}
            >
              {t.nav.about}
            </Link>
          </nav>

          {/* Right: Search, Language Toggle & Cart */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 pr-1">
            {/* Live Search Input & Modal */}
            <div className="relative" ref={searchRef}>
              <div className="relative hidden xl:block">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchOpen(true);
                  }}
                  onFocus={() => setIsSearchOpen(true)}
                  placeholder={isHindi ? "खोजें..." : "Search..."}
                  className="w-32 xl:w-44 focus:w-56 pl-8 pr-3 py-1.5 text-xs bg-white border border-[#E6DFC8] rounded-full focus:outline-none focus:ring-2 focus:ring-[#1F4D3A]/20 focus:border-[#C8922B] transition-all text-[#3B2F25] placeholder:text-[#3B2F25]/40"
                />
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-[#3B2F25]/50" />
              </div>

              {/* Mobile/Tablet Search Button */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="xl:hidden p-2 text-[#1F4D3A] hover:bg-[#DDE5D6]/50 rounded-full transition-colors cursor-pointer"
                aria-label="Search"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Search Results Dropdown */}
              {isSearchOpen && searchQuery.trim() && (
                <div className="absolute top-full right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-[#E6DFC8] py-2 z-50">
                  <div className="px-3 py-1.5 border-b border-gray-100 flex items-center justify-between text-xs text-[#3B2F25]/70">
                    <span>
                      {searchResults.length} {isHindi ? "परिणाम मिले" : "products found"}
                    </span>
                    <button
                      onClick={() => setIsSearchOpen(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {searchResults.length === 0 ? (
                    <div className="p-4 text-center text-xs text-gray-500">
                      {isHindi ? "कोई उत्पाद नहीं मिला। कृपया दूसरा शब्द खोजें।" : "No matching formulations found."}
                    </div>
                  ) : (
                    searchResults.map((prod) => (
                      <Link
                        key={prod.id}
                        href={`/product/${prod.slug}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 hover:bg-[#FAF6EC] transition-colors border-b border-gray-50 last:border-none"
                      >
                        <div className="w-10 h-10 rounded-md bg-[#FAF6EC] border border-[#E6DFC8] flex items-center justify-center shrink-0 text-[#1F4D3A] font-bold text-xs">
                          🌿
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-[#1F4D3A] truncate">
                            {isHindi ? prod.hindiName : prod.name}
                          </p>
                          <p className="text-[11px] text-gray-500 truncate">
                            {prod.categoryName} • ₹{prod.price}
                          </p>
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Language Switcher Button (Bilingual Toggle) */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-[#C8922B]/50 bg-white hover:bg-[#FAF6EC] text-xs font-semibold text-[#1F4D3A] shadow-xs transition-all cursor-pointer whitespace-nowrap"
              title="Toggle Hindi / English"
            >
              <Globe className="w-3.5 h-3.5 text-[#C8922B]" />
              <span>{language === 'en' ? 'हिन्दी' : 'EN'}</span>
            </button>

            {/* Cart Trigger */}
            <button
              onClick={openCart}
              className="relative p-2 text-[#1F4D3A] hover:bg-[#DDE5D6]/50 rounded-full transition-colors cursor-pointer mr-1"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
              {totalItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C8922B] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse shadow-sm">
                  {totalItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-[#E6DFC8] px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-4 duration-200 shadow-xl">
          {/* Mobile Search input */}
          <div className="relative pb-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isHindi ? "जड़ी-बूटी या उत्पाद खोजें..." : "Search herb, concern or product..."}
              className="w-full pl-9 pr-3 py-2 text-sm bg-[#FAF6EC] border border-[#E6DFC8] rounded-lg"
            />
            <Search className="w-4 h-4 absolute left-3 top-3 text-[#3B2F25]/50" />
          </div>

          <div className="space-y-1 font-medium text-sm text-[#3B2F25]">
            <Link
              href="/"
              className="block px-3 py-2 rounded-lg hover:bg-[#FAF6EC]"
            >
              {t.nav.home}
            </Link>
            <Link
              href="/shop"
              className="block px-3 py-2 rounded-lg hover:bg-[#FAF6EC]"
            >
              {t.nav.shop}
            </Link>
            <Link
              href="/prakriti-quiz"
              className="block px-3 py-2 rounded-lg text-[#C8922B] font-semibold bg-[#FAF6EC]"
            >
              ✨ {t.nav.prakritiQuiz}
            </Link>
            <Link
              href="/verify-batch"
              className="block px-3 py-2 rounded-lg hover:bg-[#FAF6EC]"
            >
              🛡️ {t.nav.verifyBatch}
            </Link>
            <Link
              href="/quality"
              className="block px-3 py-2 rounded-lg hover:bg-[#FAF6EC]"
            >
              {t.nav.quality}
            </Link>
            <Link
              href="/blog"
              className="block px-3 py-2 rounded-lg hover:bg-[#FAF6EC]"
            >
              {t.nav.blog}
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 rounded-lg hover:bg-[#FAF6EC]"
            >
              {t.nav.about}
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 rounded-lg hover:bg-[#FAF6EC]"
            >
              {t.nav.contact}
            </Link>
            <Link
              href="/admin"
              className="block px-3 py-2 rounded-lg text-xs text-gray-500 hover:text-[#1F4D3A]"
            >
              🔒 {t.nav.admin}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
