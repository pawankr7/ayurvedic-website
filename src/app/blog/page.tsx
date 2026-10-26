'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { BLOG_POSTS, INGREDIENT_ENCYCLOPEDIA } from '@/data/blogs';
import { BookOpen, Sparkles, User, Calendar, Clock, ChevronRight, ArrowRight, ShieldCheck } from 'lucide-react';

export default function BlogIndexPage() {
  const { isHindi } = useLanguage();
  const [activeTab, setActiveTab] = useState<'articles' | 'encyclopedia'>('articles');
  const [selectedIngredient, setSelectedIngredient] = useState<typeof INGREDIENT_ENCYCLOPEDIA[0] | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1F4D3A]/10 text-[#1F4D3A] text-xs font-bold">
          <BookOpen className="w-4 h-4 text-[#C8922B]" />
          <span>Classical Knowledge Repository</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold font-serif-ayur text-[#1F4D3A]">
          {isHindi ? "आयुर्वेद ज्ञानकोश एवं जड़ी-बूटी विश्वकोश" : "The Ayurveda Library & Herb Encyclopedia"}
        </h1>
        <p className="text-xs sm:text-sm text-gray-600">
          Peer-reviewed articles by BAMS doctors, Ritucharya seasonal living guidelines, and authoritative monographs on classical Ayurvedic botanicals.
        </p>
      </div>

      {/* Tabs Switcher */}
      <div className="flex justify-center">
        <div className="bg-[#FAF6EC] p-1.5 rounded-2xl border border-[#E6DFC8] flex gap-2">
          <button
            onClick={() => setActiveTab('articles')}
            className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'articles'
                ? 'bg-[#1F4D3A] text-white shadow-xs'
                : 'text-gray-600 hover:text-[#1F4D3A]'
            }`}
          >
            Seasonal Guides & Clinical Articles ({BLOG_POSTS.length})
          </button>
          <button
            onClick={() => setActiveTab('encyclopedia')}
            className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'encyclopedia'
                ? 'bg-[#1F4D3A] text-white shadow-xs'
                : 'text-gray-600 hover:text-[#1F4D3A]'
            }`}
          >
            Herb Encyclopedia (10 Core Herbs)
          </button>
        </div>
      </div>

      {/* Tab 1: Articles */}
      {activeTab === 'articles' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in duration-200">
          {BLOG_POSTS.map((post) => (
            <div
              key={post.slug}
              className="bg-white rounded-3xl border border-[#E6DFC8] shadow-xs hover:shadow-xl hover:border-[#C8922B] transition-all flex flex-col justify-between overflow-hidden group"
            >
              <div className="h-48 bg-[#FAF6EC] border-b border-[#E6DFC8] flex items-center justify-center text-5xl group-hover:scale-105 transition-transform duration-500">
                📜
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#C8922B]">
                    <span>{post.category}</span>
                    <span className="text-gray-400 font-normal">{post.readTime}</span>
                  </div>

                  <Link href={`/blog/${post.slug}`} className="block">
                    <h3 className="text-base font-bold font-serif-ayur text-[#1F4D3A] group-hover:text-[#C8922B] transition-colors leading-snug">
                      {isHindi ? post.hindiTitle : post.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                    {isHindi ? post.hindiExcerpt : post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-gray-500 text-[11px]">
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-gray-400" />
                      <span>{post.author.split(' ')[0]} {post.author.split(' ')[1]}</span>
                    </span>
                    <span className="text-green-700 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Doctor Reviewed</span>
                    </span>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="font-bold text-[#1F4D3A] group-hover:text-[#C8922B] flex items-center gap-1 text-xs"
                  >
                    <span>Read Full Guide</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Herb Encyclopedia */}
      {activeTab === 'encyclopedia' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          <div className="bg-[#FAF6EC] p-6 rounded-3xl border border-[#E6DFC8] text-xs text-gray-600 space-y-1">
            <p className="font-bold text-[#1F4D3A] text-sm">
              Authoritative Botanical Monographs:
            </p>
            <p>
              Each herb is analyzed through ancient Dravyaguna parameters: Rasa (taste), Virya (energy potency), Vipaka (post-digestive effect), and Prabhava (unique clinical action), cross-referenced with modern pharmacological assays.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {INGREDIENT_ENCYCLOPEDIA.map((herb) => (
              <div
                key={herb.slug}
                onClick={() => setSelectedIngredient(herb)}
                className="bg-white p-6 rounded-3xl border border-[#E6DFC8] hover:border-[#C8922B] shadow-xs hover:shadow-lg transition-all cursor-pointer space-y-4 flex flex-col justify-between group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">🌱</span>
                    <span className="text-[10px] bg-[#FAF6EC] text-[#1F4D3A] font-bold px-2 py-0.5 rounded-full border border-[#E6DFC8]">
                      {herb.virya}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold font-serif-ayur text-[#1F4D3A] group-hover:text-[#C8922B] transition-colors">
                    {herb.name} ({herb.hindiName})
                  </h3>

                  <p className="text-[11px] font-mono italic text-gray-500">
                    {herb.botanicalName}
                  </p>

                  <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                    {herb.overview}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-[#1F4D3A] font-bold">
                  <span>View Dravyaguna Profile</span>
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

          {/* Modal / Detailed Drawer for Selected Herb */}
          {selectedIngredient && (
            <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl border-2 border-[#C8922B] max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-in zoom-in-95 duration-200">
                <button
                  onClick={() => setSelectedIngredient(null)}
                  className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 text-lg font-bold p-1 cursor-pointer"
                >
                  ✕
                </button>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#C8922B]">
                    Classical Monograph
                  </span>
                  <h2 className="text-2xl font-bold font-serif-ayur text-[#1F4D3A]">
                    {selectedIngredient.name} ({selectedIngredient.hindiName})
                  </h2>
                  <p className="text-xs font-mono text-gray-500 italic">
                    {selectedIngredient.botanicalName} • {selectedIngredient.sanskritName}
                  </p>
                </div>

                {/* Dravyaguna Matrix */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs bg-[#FAF6EC] p-3 rounded-2xl border border-[#E6DFC8]">
                  <div>
                    <span className="text-gray-400 block text-[9px] uppercase font-bold">Rasa (Taste):</span>
                    <strong className="text-[#1F4D3A] text-[11px]">{selectedIngredient.rasa}</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[9px] uppercase font-bold">Virya (Potency):</span>
                    <strong className="text-[#1F4D3A] text-[11px]">{selectedIngredient.virya}</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[9px] uppercase font-bold">Vipaka (Post-Digest):</span>
                    <strong className="text-[#1F4D3A] text-[11px]">{selectedIngredient.vipaka}</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[9px] uppercase font-bold">Prabhava (Special):</span>
                    <strong className="text-[#1F4D3A] text-[11px]">{selectedIngredient.prabhava}</strong>
                  </div>
                </div>

                <div className="space-y-3 text-xs text-gray-700">
                  <div>
                    <strong className="text-[#1F4D3A] block mb-1">Classical Source & Text:</strong>
                    <p className="bg-gray-50 p-2 rounded-lg font-mono text-[11px] text-gray-600">
                      {selectedIngredient.classicalSource}
                    </p>
                  </div>

                  <div>
                    <strong className="text-[#1F4D3A] block mb-1">Modern Science & Assay Backing:</strong>
                    <p className="leading-relaxed">{selectedIngredient.scienceBacking}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-2.5 rounded-xl bg-green-50 text-green-900 border border-green-200">
                      <strong>Safe Standard Dosage:</strong>
                      <p className="mt-0.5">{selectedIngredient.safeDosage}</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-200">
                      <strong>Cautions & Contraindications:</strong>
                      <p className="mt-0.5">{selectedIngredient.cautions}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex justify-between items-center border-t border-gray-100">
                  <Link
                    href={`/product/${selectedIngredient.relatedProductSlug}`}
                    onClick={() => setSelectedIngredient(null)}
                    className="px-5 py-2.5 rounded-xl font-bold text-xs gold-gradient-btn inline-flex items-center gap-1.5 shadow-sm"
                  >
                    <span>View Formulation Featuring {selectedIngredient.name} →</span>
                  </Link>

                  <button
                    onClick={() => setSelectedIngredient(null)}
                    className="text-xs text-gray-400 hover:text-gray-600"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
