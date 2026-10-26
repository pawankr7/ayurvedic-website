'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { BLOG_POSTS } from '@/data/blogs';
import { PRODUCTS } from '@/data/products';
import { useLanguage } from '@/context/LanguageContext';
import ProductCard from '@/components/product/ProductCard';
import { ChevronRight, ArrowLeft, User, Calendar, Clock, ShieldCheck, Share2 } from 'lucide-react';

function BlogPostContent() {
  const params = useParams();
  const slug = params.slug as string;
  const { isHindi } = useLanguage();

  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) {
    notFound();
  }

  const relatedProducts = PRODUCTS.slice(0, 2);

  // Article JSON-LD Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "AARU Ayurveda",
      "logo": {
        "@type": "ImageObject",
        "url": "https://aaruayurveda.com/logo.png"
      }
    },
    "datePublished": "2024-10-18T09:00:00+05:30",
    "dateModified": "2024-10-20T12:00:00+05:30"
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-10">
      
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-xs text-gray-500">
        <Link href="/" className="hover:text-[#1F4D3A]">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <Link href="/blog" className="hover:text-[#1F4D3A]">Library</Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <span className="text-[#1F4D3A] font-bold truncate max-w-[200px]">
          {isHindi ? post.hindiTitle : post.title}
        </span>
      </nav>

      {/* Article Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-[#1F4D3A] text-white text-[10px] font-bold uppercase tracking-wider">
            {post.category}
          </span>
          <span className="text-xs text-gray-400 font-mono">{post.readTime}</span>
        </div>

        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-serif-ayur text-[#1F4D3A] leading-tight">
          {isHindi ? post.hindiTitle : post.title}
        </h1>

        <p className="text-sm sm:text-base text-gray-600 leading-relaxed italic border-l-2 border-[#C8922B] pl-4">
          {isHindi ? post.hindiExcerpt : post.excerpt}
        </p>

        {/* Doctor Author & Reviewer Strip */}
        <div className="p-4 rounded-2xl bg-[#FAF6EC] border border-[#E6DFC8] flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1F4D3A] text-white flex items-center justify-center font-bold text-sm">
              👨‍⚕️
            </div>
            <div>
              <p className="font-bold text-[#1F4D3A]">{post.author}</p>
              <p className="text-[11px] text-gray-500">Published: {post.date}</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-green-800 bg-white px-3 py-1.5 rounded-xl border border-green-200">
            <ShieldCheck className="w-4 h-4 text-green-700" />
            <span>Medically Reviewed by <strong>{post.reviewer}</strong></span>
          </div>
        </div>
      </div>

      {/* Article Body Content */}
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#E6DFC8] shadow-xs space-y-6 text-sm text-gray-700 leading-relaxed font-sans">
        
        <p>
          {isHindi ? post.hindiContent : post.content}
        </p>

        <h2 className="text-xl font-bold font-serif-ayur text-[#1F4D3A] pt-4 border-t">
          1. The Principle of Doshic Balance in Everyday Life
        </h2>
        <p>
          In classical Ayurvedic physiology, the body is governed by three primary forces (Doshas): Vata (movement & nervous function), Pitta (transformation & metabolic fire), and Kapha (structure & lubrication). When these three principles maintain their proportional equilibrium, disease cannot take root.
        </p>
        <p>
          Imbalances occur primarily through improper food combinations (Viruddha Ahara), eating against the seasonal cycle (Ritucharya violations), and sensory burnout. Restoring health requires not just a single herb, but a disciplined daily regimen (Dinacharya).
        </p>

        <h2 className="text-xl font-bold font-serif-ayur text-[#1F4D3A] pt-4 border-t">
          2. The Role of Lab Testing in Herbal Safety
        </h2>
        <p>
          Historically, herbs grew in unpolluted ancient forest soils. In modern agricultural conditions, soil contamination can lead to herbs absorbing heavy metals like Lead and Arsenic. At AARU, we mandate third-party NABL ISO/IEC 17025 laboratory testing on every single batch before it reaches customer hands.
        </p>

        {/* Tags */}
        <div className="pt-6 border-t flex flex-wrap gap-2 text-xs">
          {post.tags.map((tag, i) => (
            <span key={i} className="px-3 py-1 rounded-full bg-[#FAF6EC] border border-[#E6DFC8] text-[#1F4D3A] font-medium">
              #{tag}
            </span>
          ))}
        </div>

      </div>

      {/* Suggested Complementary Formulations */}
      <div className="space-y-4 pt-6 border-t border-[#E6DFC8]">
        <h3 className="text-xl font-bold font-serif-ayur text-[#1F4D3A]">
          Featured Formulations for this Health Topic
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>

      <div className="text-center pt-2">
        <Link
          href="/blog"
          className="text-xs font-bold text-[#1F4D3A] hover:text-[#C8922B] underline"
        >
          ← Return to Ayurveda Library
        </Link>
      </div>

    </article>
  );
}

export default function BlogPostPage() {
  return (
    <Suspense fallback={<div className="min-h-screen p-12 text-center text-xs">Loading Ayurveda guide...</div>}>
      <BlogPostContent />
    </Suspense>
  );
}
