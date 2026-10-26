'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { CATEGORIES } from '@/data/categories';
import { PRODUCTS } from '@/data/products';
import { useLanguage } from '@/context/LanguageContext';
import ProductCard from '@/components/product/ProductCard';
import { ChevronRight, ArrowLeft, ShieldCheck, HelpCircle } from 'lucide-react';

function CategoryContent() {
  const params = useParams();
  const categorySlug = params.category as string;
  const { isHindi } = useLanguage();

  const category = CATEGORIES.find((c) => c.slug === categorySlug);
  if (!category) {
    notFound();
  }

  const categoryProducts = PRODUCTS.filter((p) => p.categoryId === category.id);

  // FAQ Schema JSON-LD
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": category.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-xs text-gray-500">
        <Link href="/" className="hover:text-[#1F4D3A]">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <Link href="/shop" className="hover:text-[#1F4D3A]">Shop</Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <span className="text-[#1F4D3A] font-bold">
          {isHindi ? category.hindiName : category.name}
        </span>
      </nav>

      {/* Category Pillar Hero Banner */}
      <div className="bg-[#FAF6EC] p-6 sm:p-12 rounded-3xl border border-[#E6DFC8] space-y-4 relative overflow-hidden">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-[#1F4D3A] text-white text-[10px] font-bold uppercase tracking-wider">
            Ayurvedic Concern
          </span>
          {category.badge && (
            <span className="px-3 py-1 rounded-full bg-[#C8922B] text-white text-[10px] font-bold uppercase tracking-wider">
              {category.badge}
            </span>
          )}
        </div>

        <h1 className="text-2xl sm:text-5xl font-bold font-serif-ayur text-[#1F4D3A]">
          {isHindi ? category.hindiName : category.name}
        </h1>

        <p className="text-xs sm:text-base text-gray-700 max-w-3xl leading-relaxed">
          {isHindi ? category.hindiDescription : category.description}
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-[#1F4D3A] font-semibold">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#C8922B]" />
            <span>NABL Lab-Tested Batches</span>
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#C8922B]" />
            <span>AYUSH Classical Compliance</span>
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#C8922B]" />
            <span>Zero Preservative Actives</span>
          </span>
        </div>
      </div>

      {/* Products Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-gray-200 pb-3">
          <h2 className="text-lg font-bold font-serif-ayur text-[#1F4D3A]">
            {isHindi ? "अनुशंसित आयुर्वेदिक उत्पाद" : "Doctor-Crafted Formulations"} ({categoryProducts.length})
          </h2>
          <Link href="/shop" className="text-xs font-semibold text-[#C8922B] hover:underline flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{isHindi ? "सभी श्रेणियां देखें" : "View All Categories"}</span>
          </Link>
        </div>

        {categoryProducts.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-[#E6DFC8] text-center space-y-2">
            <p className="text-sm font-bold text-[#1F4D3A]">
              New batches currently under NABL testing for this category.
            </p>
            <Link href="/shop" className="text-xs text-[#C8922B] font-bold hover:underline">
              Explore Available Categories →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Category FAQs (SEO Pillar Content) */}
      {category.faqs && category.faqs.length > 0 && (
        <section className="bg-white p-6 sm:p-10 rounded-3xl border border-[#E6DFC8] shadow-xs space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#C8922B]">
              Scientific & Classical Guidance
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-serif-ayur text-[#1F4D3A] flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#C8922B]" />
              <span>{isHindi ? "अक्सर पूछे जाने वाले प्रश्न" : "Frequently Asked Questions"}</span>
            </h3>
          </div>

          <div className="space-y-4">
            {category.faqs.map((faq, index) => (
              <div key={index} className="bg-[#FAF6EC] p-4 rounded-2xl border border-[#E6DFC8] space-y-2">
                <h4 className="text-xs sm:text-sm font-bold text-[#1F4D3A]">
                  {isHindi ? faq.hindiQuestion : faq.question}
                </h4>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {isHindi ? faq.hindiAnswer : faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}

export default function CategoryPage() {
  return (
    <Suspense fallback={<div className="min-h-screen p-12 text-center text-xs">Loading Category catalog...</div>}>
      <CategoryContent />
    </Suspense>
  );
}
