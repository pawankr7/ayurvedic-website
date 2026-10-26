'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { notFound, useParams, useRouter } from 'next/navigation';
import { PRODUCTS } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import VerifiedBatchCard from '@/components/common/VerifiedBatchCard';
import ProductCard from '@/components/product/ProductCard';
import { MANDATORY_MEDICAL_DISCLAIMER_EN, MANDATORY_MEDICAL_DISCLAIMER_HI } from '@/data/claimsCompliance';
import {
  Star,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ShoppingBag,
  Zap,
  Truck,
  RotateCcw,
  ChevronRight,
  BookOpen,
  AlertTriangle,
  Heart,
  Share2,
  Check,
  Plus,
  Minus
} from 'lucide-react';

function ProductDetailContent() {
  const params = useParams();
  const slug = params.slug as string;
  const router = useRouter();
  const { addItem } = useCart();
  const { isHindi } = useLanguage();

  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) {
    notFound();
  }

  const [quantity, setQuantity] = useState(1);
  const [purchaseType, setPurchaseType] = useState<'onetime' | 'subscription'>('onetime');
  const [selectedBatch, setSelectedBatch] = useState(product.defaultBatch);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const effectivePrice = purchaseType === 'subscription'
    ? Math.round(product.price * (1 - (product.subscriptionDiscount || 15) / 100))
    : product.price;

  const handleAddToCart = () => {
    addItem(product, quantity, purchaseType === 'subscription');
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  const handleBuyNow = () => {
    addItem(product, quantity, purchaseType === 'subscription');
    router.push('/checkout');
  };

  const relatedProducts = PRODUCTS
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 3);

  // Schema.org Product JSON-LD
  const productJsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": product.images,
    "description": product.description,
    "sku": `AARU-${product.id}`,
    "brand": {
      "@type": "Brand",
      "name": "AARU"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://aaruayurveda.com/product/${product.slug}`,
      "priceCurrency": "INR",
      "price": effectivePrice,
      "priceValidUntil": "2028-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": "AARU Ayurvedic Wellness"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.rating,
      "reviewCount": product.reviewsCount
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-xs text-gray-500">
        <Link href="/" className="hover:text-[#1F4D3A]">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <Link href="/shop" className="hover:text-[#1F4D3A]">Shop</Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <Link href={`/shop/${product.categoryId}`} className="hover:text-[#1F4D3A]">
          {product.categoryName}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <span className="text-[#1F4D3A] font-bold truncate max-w-[200px]">
          {isHindi ? product.hindiName : product.name}
        </span>
      </nav>

      {/* Main Product Showcase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Image Stage */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-[#FAF6EC] rounded-3xl border border-[#E6DFC8] p-8 sm:p-14 flex items-center justify-center relative shadow-inner">
            
            {/* Top Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5">
              <span className="px-3 py-1 rounded-full bg-[#1F4D3A] text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C8922B]" />
                <span>{product.certificateType} Certified</span>
              </span>
              {product.isBestSeller && (
                <span className="px-3 py-1 rounded-full bg-[#C8922B] text-white text-[10px] font-bold uppercase tracking-wider">
                  ★ {isHindi ? "सर्वाधिक लोकप्रिय" : "Top Choice"}
                </span>
              )}
            </div>

            {/* Veg Symbol */}
            <div className="absolute top-4 right-4 w-6 h-6 rounded-md border-2 border-green-600 flex items-center justify-center bg-white">
              <div className="w-3 h-3 rounded-full bg-green-600" />
            </div>

            {/* Visual Icon Art */}
            <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-3xl bg-white border-2 border-[#C8922B]/30 shadow-lg flex flex-col items-center justify-center text-center p-6 space-y-2">
              <span className="text-6xl sm:text-7xl">
                {product.form === 'oil' ? '🫒' : product.form === 'juice' ? '🧪' : product.form === 'powder' ? '🥣' : '🌿'}
              </span>
              <p className="text-xs font-bold uppercase tracking-widest text-[#C8922B]">
                {product.form} formulation
              </p>
              <span className="text-[10px] text-gray-400 font-mono">
                Batch #{product.defaultBatch}
              </span>
            </div>

            {/* Batch QR Micro-Callout */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-2.5 rounded-xl border border-[#E6DFC8] flex items-center justify-between text-xs">
              <span className="text-[11px] font-semibold text-[#1F4D3A] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#C8922B]" />
                <span>NABL Lab Test Report Available</span>
              </span>
              <a href="#lab-report" className="text-[#C8922B] font-bold text-[11px] hover:underline">
                View Report ↓
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Product Purchasing & Configuration */}
        <div className="lg:col-span-6 space-y-6">
          
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C8922B]">
              {product.categoryName} • {product.lifeStage.toUpperCase()}
            </span>
            <h1 className="text-2xl sm:text-4xl font-bold font-serif-ayur text-[#1F4D3A] leading-tight">
              {isHindi ? product.hindiName : product.name}
            </h1>
            <p className="text-sm text-gray-600 leading-relaxed">
              {isHindi ? product.hindiSubtitle : product.subtitle}
            </p>

            {/* Ratings & Batch Info */}
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
              <div className="flex items-center gap-1 bg-[#FAF6EC] px-2.5 py-1 rounded-lg border border-[#E6DFC8] font-bold text-[#1F4D3A]">
                <Star className="w-3.5 h-3.5 fill-[#C8922B] text-[#C8922B]" />
                <span>{product.rating}</span>
                <span className="text-gray-400 font-normal">({product.reviewsCount} reviews)</span>
              </div>
              <span className="text-gray-300">|</span>
              <span className="text-gray-500 font-mono">
                Default Batch: <strong className="text-[#1F4D3A]">{product.defaultBatch}</strong>
              </span>
              <span className="text-gray-300">|</span>
              <span className="text-green-700 font-bold">
                ✓ {isHindi ? "उपलब्ध है" : "In Stock Ready to Dispatch"}
              </span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="bg-[#FAF6EC] p-4 rounded-2xl border border-[#E6DFC8] space-y-3">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-[#1F4D3A]">
                ₹{effectivePrice}
              </span>
              {product.originalPrice > effectivePrice && (
                <>
                  <span className="text-sm text-gray-400 line-through">
                    ₹{product.originalPrice}
                  </span>
                  <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded">
                    Save ₹{product.originalPrice - effectivePrice} ({Math.round(((product.originalPrice - effectivePrice) / product.originalPrice) * 100)}% OFF)
                  </span>
                </>
              )}
            </div>

            {/* One-time vs Subscription Toggle */}
            {product.subscriptionEligible && (
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setPurchaseType('onetime')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    purchaseType === 'onetime'
                      ? 'border-[#1F4D3A] bg-white shadow-xs font-bold text-[#1F4D3A]'
                      : 'border-transparent bg-white/40 text-gray-500 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span>One-Time Purchase</span>
                    {purchaseType === 'onetime' && <Check className="w-3.5 h-3.5 text-[#1F4D3A]" />}
                  </div>
                  <span className="text-sm font-bold text-[#1F4D3A] mt-1 block">₹{product.price}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPurchaseType('subscription')}
                  className={`p-3 rounded-xl border text-left transition-all relative ${
                    purchaseType === 'subscription'
                      ? 'border-[#C8922B] bg-white shadow-xs font-bold text-[#1F4D3A]'
                      : 'border-transparent bg-white/40 text-gray-500 hover:bg-white'
                  }`}
                >
                  <span className="absolute -top-2 right-2 bg-[#C8922B] text-white text-[9px] font-bold px-2 py-0.2 rounded-full">
                    SAVE 15%
                  </span>
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#C8922B]" />
                      <span>Monthly Regimen</span>
                    </span>
                    {purchaseType === 'subscription' && <Check className="w-3.5 h-3.5 text-[#C8922B]" />}
                  </div>
                  <span className="text-sm font-bold text-[#C8922B] mt-1 block">
                    ₹{Math.round(product.price * 0.85)} <span className="text-[10px] font-normal text-gray-400">/ 30 days</span>
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* Quantity and Actions */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-gray-600">Quantity:</span>
              <div className="flex items-center border border-[#E6DFC8] rounded-xl bg-white overflow-hidden shadow-xs">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-xs hover:bg-[#FAF6EC] transition-colors"
                >
                  <Minus className="w-3.5 h-3.5 text-[#1F4D3A]" />
                </button>
                <span className="px-4 text-xs font-bold text-[#1F4D3A]">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-xs hover:bg-[#FAF6EC] transition-colors"
                >
                  <Plus className="w-3.5 h-3.5 text-[#1F4D3A]" />
                </button>
              </div>
              <span className="text-xs text-gray-500">
                Total: <strong>₹{effectivePrice * quantity}</strong>
              </span>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                className="py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm border-2 border-[#1F4D3A] text-[#1F4D3A] hover:bg-[#1F4D3A] hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{addedAnimation ? "✓ Added to Cart!" : (isHindi ? "कार्ट में जोड़ें" : "Add to Cart")}</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm gold-gradient-btn flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Zap className="w-4 h-4" />
                <span>{isHindi ? "अभी खरीदें (एक्सप्रेस)" : "Buy Now (Express Checkout)"}</span>
              </button>
            </div>
          </div>

          {/* Delivery & Pincode Check Hook */}
          <div className="bg-white p-4 rounded-2xl border border-[#E6DFC8] space-y-3 text-xs">
            <div className="flex items-center justify-between text-gray-600">
              <span className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#1F4D3A]" />
                <span>Fast Delivery in 3-5 Days across India</span>
              </span>
              <span className="text-green-700 font-bold">COD Available</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <RotateCcw className="w-4 h-4 text-[#1F4D3A]" />
              <span>Easy 7-Day Unopened Return Guarantee</span>
            </div>
          </div>

        </div>

      </div>

      {/* Verified Batch Lab Report Section */}
      <section id="lab-report" className="space-y-4 pt-6 border-t border-[#E6DFC8]">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C8922B]">
            {isHindi ? "खुली लैब रिपोर्ट" : "Provable Quality"}
          </span>
          <h2 className="text-xl sm:text-3xl font-bold font-serif-ayur text-[#1F4D3A]">
            {isHindi ? "इस उत्पाद की सत्यापित NABL लैब रिपोर्ट" : "Verified NABL Lab Test Report for this Product"}
          </h2>
          <p className="text-xs text-gray-600">
            {isHindi
              ? "हमारे प्रत्येक बैच का स्वतंत्र NABL प्रयोगशाला द्वारा परीक्षण किया जाता है। नीचे दी गई रिपोर्ट सीधे प्रयोगशाला द्वारा सत्यापित है।"
              : "Every bottle and carton comes with full traceability. Review the exact permissible vs found levels for toxic heavy metals, microbiological safety, and botanical active assays."}
          </p>
        </div>

        <VerifiedBatchCard batchNumber={selectedBatch} isOpenByDefault={true} />
      </section>

      {/* Detailed Description & Classical Benefits */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 border-t border-[#E6DFC8]">
        
        {/* Left Col: Ingredients & Why It Works */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-bold font-serif-ayur text-[#1F4D3A] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C8922B]" />
              <span>{isHindi ? "जड़ी-बूटी विवरण एवं निष्कर्षण विधि" : "Ingredient Provenance & Why It Works"}</span>
            </h3>
            <p className="text-xs text-gray-600">
              {isHindi ? product.hindiDescription : product.description}
            </p>
          </div>

          <div className="space-y-3">
            {product.ingredients.map((ing, i) => (
              <div key={i} className="bg-white p-4 rounded-2xl border border-[#E6DFC8] shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs sm:text-sm font-bold text-[#1F4D3A]">
                    {isHindi ? ing.hindiName : ing.name}
                  </h4>
                  <span className="text-[10px] font-mono italic text-gray-500">
                    {ing.botanicalName}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-600">
                  <div>
                    <span className="text-gray-400 block text-[9px] uppercase font-bold">Source Region:</span>
                    <span>{ing.sourceRegion}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[9px] uppercase font-bold">Part Used:</span>
                    <span>{ing.partUsed}</span>
                  </div>
                </div>
                <div className="text-xs text-gray-700 bg-[#FAF6EC] p-2.5 rounded-xl border border-[#E6DFC8]">
                  <strong>Why it works:</strong> {ing.whyItWorks}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Benefits, Dosage, Who Should Avoid */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Compliant Benefits */}
          <div className="bg-white p-5 rounded-2xl border border-[#E6DFC8] space-y-3 shadow-xs">
            <h4 className="text-sm font-bold font-serif-ayur text-[#1F4D3A]">
              {isHindi ? "प्रमुख लाभ (आयुर्वेदिक शास्त्रीय आधार पर)" : "Formulation Benefits (Classical Basis)"}
            </h4>
            <ul className="space-y-2 text-xs text-gray-700">
              {(isHindi ? product.hindiBenefits : product.benefits).map((b, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-700 shrink-0 mt-0.5" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Dosage & Usage */}
          <div className="bg-white p-5 rounded-2xl border border-[#E6DFC8] space-y-2 shadow-xs">
            <h4 className="text-sm font-bold font-serif-ayur text-[#1F4D3A] flex items-center gap-1.5">
              <span>🥣</span>
              <span>{isHindi ? "सेवन विधि एवं अनुशंसित मात्रा" : "Dosage & How to Take"}</span>
            </h4>
            <p className="text-xs text-gray-700 leading-relaxed">
              {isHindi ? product.hindiDosage : product.dosage}
            </p>
          </div>

          {/* Who Should Exercise Caution */}
          <div className="bg-amber-50/60 p-5 rounded-2xl border border-amber-200 space-y-2">
            <h4 className="text-xs font-bold text-amber-900 flex items-center gap-1.5 uppercase tracking-wide">
              <AlertTriangle className="w-4 h-4 text-amber-700" />
              <span>{isHindi ? "किन्हें सावधानी बरतनी चाहिए" : "Who Should Exercise Caution"}</span>
            </h4>
            <p className="text-xs text-amber-900/90 leading-relaxed">
              {isHindi ? product.hindiWhoShouldAvoid : product.whoShouldAvoid}
            </p>
          </div>

          {/* Classical Reference Citation */}
          <div className="bg-[#FAF6EC] p-4 rounded-2xl border border-[#E6DFC8] space-y-1 text-xs text-gray-600">
            <span className="font-bold text-[#1F4D3A] flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-[#C8922B]" />
              <span>Classical Reference:</span>
            </span>
            <p className="font-mono text-[11px] text-[#3B2F25]">{product.classicalReference}</p>
          </div>

        </div>

      </section>

      {/* Mandatory Regulatory Medical Disclaimer */}
      <div className="p-4 rounded-2xl bg-black/5 border border-[#C8922B]/30 text-xs text-gray-600 space-y-1.5">
        <p className="font-bold text-[#1F4D3A] text-xs">
          Statutory Medical Disclaimer (वैधानिक चिकित्सा अस्वीकरण):
        </p>
        <p className="text-[11px] leading-relaxed">
          {MANDATORY_MEDICAL_DISCLAIMER_EN}
        </p>
        <p className="text-[11px] text-gray-500 leading-relaxed">
          {MANDATORY_MEDICAL_DISCLAIMER_HI}
        </p>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6 pt-6 border-t border-[#E6DFC8]">
          <h3 className="text-xl font-bold font-serif-ayur text-[#1F4D3A]">
            {isHindi ? "संबंधित शास्त्रीय फॉर्मूलेशन" : "Complementary Regimen Recommendations"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Sticky Mobile Add to Cart & Buy Now Bar */}
      <div className="fixed bottom-12 left-0 right-0 z-30 md:hidden bg-white/95 backdrop-blur-md border-t border-[#E6DFC8] p-3 shadow-xl">
        <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
          <div>
            <span className="text-xs text-gray-400 block">Total</span>
            <span className="text-base font-bold text-[#1F4D3A]">₹{effectivePrice * quantity}</span>
          </div>
          <div className="flex gap-2 flex-1 justify-end">
            <button
              onClick={handleAddToCart}
              className="py-2.5 px-3 rounded-xl font-bold text-xs border border-[#1F4D3A] text-[#1F4D3A]"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="py-2.5 px-4 rounded-xl font-bold text-xs gold-gradient-btn"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

export default function ProductDetailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen p-12 text-center text-xs">Loading Ayurvedic formulation...</div>}>
      <ProductDetailContent />
    </Suspense>
  );
}
