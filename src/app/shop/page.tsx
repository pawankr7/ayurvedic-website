'use client';

import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '@/data/products';
import { CATEGORIES } from '@/data/categories';
import { useLanguage } from '@/context/LanguageContext';
import ProductCard from '@/components/product/ProductCard';
import { Filter, SlidersHorizontal, Search, X, Check, ArrowUpDown } from 'lucide-react';

export default function ShopPage() {
  const { t, isHindi } = useLanguage();

  const [selectedConcern, setSelectedConcern] = useState<string>('all');
  const [selectedForm, setSelectedForm] = useState<string>('all');
  const [selectedLifeStage, setSelectedLifeStage] = useState<string>('all');
  const [certifiedOnly, setCertifiedOnly] = useState<boolean>(false);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('popular');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (selectedConcern !== 'all' && p.categoryId !== selectedConcern) return false;
      if (selectedForm !== 'all' && p.form !== selectedForm) return false;
      if (selectedLifeStage !== 'all' && p.lifeStage !== selectedLifeStage && p.lifeStage !== 'all') return false;
      if (certifiedOnly && !p.certified) return false;
      if (inStockOnly && !p.inStock) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const match =
          p.name.toLowerCase().includes(q) ||
          p.hindiName.includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.ingredients.some((ing) => ing.name.toLowerCase().includes(q) || ing.hindiName.includes(q));
        if (!match) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'priceLow') return a.price - b.price;
      if (sortBy === 'priceHigh') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
    });
  }, [selectedConcern, selectedForm, selectedLifeStage, certifiedOnly, inStockOnly, sortBy, searchQuery]);

  const resetFilters = () => {
    setSelectedConcern('all');
    setSelectedForm('all');
    setSelectedLifeStage('all');
    setCertifiedOnly(false);
    setInStockOnly(false);
    setSearchQuery('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Page Header */}
      <div className="bg-[#FAF6EC] p-6 sm:p-10 rounded-3xl border border-[#E6DFC8] space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#C8922B]">
          {isHindi ? "सम्पूर्ण आयुर्वेदिक सूची" : "Classical & Verified Formulations"}
        </span>
        <h1 className="text-2xl sm:text-4xl font-bold font-serif-ayur text-[#1F4D3A]">
          {isHindi ? "आरु आयुर्वेदिक उत्पाद सूची" : "AARU Ayurveda Catalog"}
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 max-w-2xl leading-relaxed">
          {isHindi
            ? "हर बैच स्वतंत्र NABL प्रयोगशाला द्वारा भारी धातुओं (लेड, पारा) व जीवाणु सुरक्षा के लिए परीक्षित। 100% आयुष प्रमाणित व शुद्ध जड़ी-बूटियों से निर्मित।"
            : "Explore 20 classical and proprietary Ayurvedic formulations. Every single product has public batch-level NABL lab reports ensuring zero toxic heavy metals and verified active herbal markers."}
        </p>
      </div>

      {/* Control Bar: Search, Mobile Filter Button, Sort */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#E6DFC8] shadow-xs">
        
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isHindi ? "जड़ी-बूटी या समस्या खोजें..." : "Search herb, form or concern..."}
            className="w-full pl-9 pr-3 py-2 text-xs bg-[#FAF6EC] border border-[#E6DFC8] rounded-xl focus:outline-none focus:border-[#1F4D3A]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden px-3.5 py-2 text-xs font-bold border border-[#1F4D3A] text-[#1F4D3A] rounded-xl flex items-center gap-1.5"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 text-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#C8922B]" />
            <span className="text-gray-500 hidden sm:inline">{t.common.sortBy}:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#FAF6EC] border border-[#E6DFC8] rounded-xl px-3 py-2 text-xs font-semibold text-[#1F4D3A] focus:outline-none"
            >
              <option value="popular">{t.common.popular}</option>
              <option value="rating">{t.common.ratingHigh}</option>
              <option value="priceLow">{t.common.priceLowHigh}</option>
              <option value="priceHigh">{t.common.priceHighLow}</option>
            </select>
          </div>
        </div>

      </div>

      {/* Main Grid: Desktop Filters Sidebar + Product Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block space-y-6 bg-white p-6 rounded-3xl border border-[#E6DFC8] shadow-xs self-start">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h3 className="text-sm font-bold text-[#1F4D3A] flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#C8922B]" />
              <span>Filter Catalog</span>
            </h3>
            <button
              onClick={resetFilters}
              className="text-[11px] text-[#C8922B] hover:underline font-semibold"
            >
              Reset All
            </button>
          </div>

          {/* Filter 1: By Health Concern */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
              {t.common.filterByConcern}
            </h4>
            <div className="space-y-1 text-xs max-h-56 overflow-y-auto pr-1">
              <button
                onClick={() => setSelectedConcern('all')}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                  selectedConcern === 'all' ? 'bg-[#EEF3EA] text-[#1F4D3A] font-bold' : 'text-gray-600 hover:bg-[#FAF6EC]'
                }`}
              >
                <span>All Concerns</span>
                {selectedConcern === 'all' && <Check className="w-3.5 h-3.5 text-[#C8922B]" />}
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedConcern(cat.slug)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between text-xs ${
                    selectedConcern === cat.slug ? 'bg-[#EEF3EA] text-[#1F4D3A] font-bold' : 'text-gray-600 hover:bg-[#FAF6EC]'
                  }`}
                >
                  <span className="truncate">{isHindi ? cat.hindiName : cat.name}</span>
                  {selectedConcern === cat.slug && <Check className="w-3.5 h-3.5 text-[#C8922B]" />}
                </button>
              ))}
            </div>
          </div>

          {/* Filter 2: By Form */}
          <div className="space-y-2 pt-2 border-t border-gray-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
              {t.common.filterByForm}
            </h4>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              {['all', 'tablet', 'capsule', 'powder', 'juice', 'oil', 'syrup'].map((form) => (
                <button
                  key={form}
                  onClick={() => setSelectedForm(form)}
                  className={`px-2 py-1.5 rounded-lg border text-center capitalize transition-colors ${
                    selectedForm === form
                      ? 'bg-[#1F4D3A] text-white border-[#1F4D3A] font-bold'
                      : 'bg-[#FAF6EC] text-gray-600 border-[#E6DFC8] hover:border-gray-400'
                  }`}
                >
                  {form}
                </button>
              ))}
            </div>
          </div>

          {/* Filter 3: Life Stage */}
          <div className="space-y-2 pt-2 border-t border-gray-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
              {t.common.filterByLifeStage}
            </h4>
            <div className="space-y-1 text-xs">
              {['all', 'women', 'men', 'kids', 'seniors'].map((stage) => (
                <button
                  key={stage}
                  onClick={() => setSelectedLifeStage(stage)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between capitalize ${
                    selectedLifeStage === stage ? 'bg-[#EEF3EA] text-[#1F4D3A] font-bold' : 'text-gray-600 hover:bg-[#FAF6EC]'
                  }`}
                >
                  <span>{stage === 'all' ? 'All Life Stages' : stage}</span>
                  {selectedLifeStage === stage && <Check className="w-3.5 h-3.5 text-[#C8922B]" />}
                </button>
              ))}
            </div>
          </div>

          {/* Filter 4: Certified Toggle & In Stock */}
          <div className="space-y-2 pt-2 border-t border-gray-100 text-xs">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={certifiedOnly}
                onChange={(e) => setCertifiedOnly(e.target.checked)}
                className="rounded text-[#1F4D3A] focus:ring-[#1F4D3A]"
              />
              <span className="font-medium text-gray-700">Govt. Certified Only</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded text-[#1F4D3A] focus:ring-[#1F4D3A]"
              />
              <span className="font-medium text-gray-700">In Stock Ready to Ship</span>
            </label>
          </div>

        </aside>

        {/* Product Cards Grid */}
        <main className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>
              Showing <strong>{filteredProducts.length}</strong> of {PRODUCTS.length} formulations
            </span>
            {(selectedConcern !== 'all' || selectedForm !== 'all' || searchQuery) && (
              <button onClick={resetFilters} className="text-[#C8922B] hover:underline font-bold">
                Clear Active Filters
              </button>
            )}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl border border-[#E6DFC8] text-center space-y-3">
              <span className="text-4xl">🍃</span>
              <h3 className="font-bold text-sm text-[#1F4D3A]">No formulations match your filter criteria</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Try selecting a different health concern or reset the filters to browse all 20 doctor-crafted remedies.
              </p>
              <button
                onClick={resetFilters}
                className="mt-2 px-5 py-2 rounded-full text-xs font-bold bg-[#1F4D3A] text-white"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>

      </div>

      {/* Mobile Filter Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden overflow-hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setIsMobileFilterOpen(false)} />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-xs bg-white p-6 shadow-2xl flex flex-col justify-between">
              <div className="space-y-6 overflow-y-auto">
                <div className="flex items-center justify-between border-b pb-3">
                  <h3 className="font-bold text-sm text-[#1F4D3A]">Filters</h3>
                  <button onClick={() => setIsMobileFilterOpen(false)}>
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                {/* Concern list */}
                <div className="space-y-1 text-xs">
                  <h4 className="font-bold text-gray-400 uppercase tracking-wider mb-2">Concern</h4>
                  <button
                    onClick={() => setSelectedConcern('all')}
                    className={`block w-full text-left py-1.5 px-2 rounded ${selectedConcern === 'all' ? 'bg-[#EEF3EA] font-bold text-[#1F4D3A]' : ''}`}
                  >
                    All Concerns
                  </button>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedConcern(cat.slug)}
                      className={`block w-full text-left py-1.5 px-2 rounded truncate ${selectedConcern === cat.slug ? 'bg-[#EEF3EA] font-bold text-[#1F4D3A]' : ''}`}
                    >
                      {isHindi ? cat.hindiName : cat.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t flex gap-2">
                <button
                  onClick={resetFilters}
                  className="w-1/2 py-2.5 text-xs font-bold border rounded-xl"
                >
                  Reset
                </button>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-1/2 py-2.5 text-xs font-bold bg-[#1F4D3A] text-white rounded-xl"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
