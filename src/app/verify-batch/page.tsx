'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { getBatchLabReport } from '@/data/batches';
import { useLanguage } from '@/context/LanguageContext';
import VerifiedBatchCard from '@/components/common/VerifiedBatchCard';
import { ShieldCheck, Search, QrCode, FileText, CheckCircle2, Award, AlertCircle } from 'lucide-react';

function VerifyBatchContent() {
  const searchParams = useSearchParams();
  const initialBatch = searchParams.get('batch') || 'AARU-24-GT01';
  const { t, isHindi } = useLanguage();

  const [inputCode, setInputCode] = useState(initialBatch);
  const [activeBatch, setActiveBatch] = useState(initialBatch);
  const [hasSearched, setHasSearched] = useState(true);

  const sampleBatches = [
    { code: "AARU-24-GT01", name: "Triphala Gut Detox" },
    { code: "AARU-24-SH02", name: "Himalayan Shilajit Resin" },
    { code: "AARU-24-SW03", name: "Shatavari Hormone Balance" },
    { code: "AARU-24-AS04", name: "KSM-66 Ashwagandha Sleep" },
    { code: "AARU-24-JT05", name: "Shallaki Joint Flex" },
    { code: "AARU-24-GH06", name: "Gir Cow A2 Bilona Ghee" }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode.trim()) {
      setActiveBatch(inputCode.trim().toUpperCase());
      setHasSearched(true);
    }
  };

  const handleSelectSample = (code: string) => {
    setInputCode(code);
    setActiveBatch(code);
    setHasSearched(true);
  };

  const report = getBatchLabReport(activeBatch);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-12">
      
      {/* Header Banner */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1F4D3A]/10 text-[#1F4D3A] text-xs font-bold">
          <ShieldCheck className="w-4 h-4 text-[#C8922B]" />
          <span>{isHindi ? "100% खुली पारदर्शिता" : "Open Scientific Transparency"}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold font-serif-ayur text-[#1F4D3A]">
          {t.batchVerification.title}
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
          {t.batchVerification.subtitle}
        </p>
      </div>

      {/* Search Input Box */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E6DFC8] shadow-md space-y-4 max-w-2xl mx-auto">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
            <input
              type="text"
              required
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder={t.batchVerification.placeholder}
              className="w-full pl-10 pr-3 py-3 text-xs sm:text-sm bg-[#FAF6EC] border border-[#E6DFC8] rounded-xl focus:outline-none focus:border-[#1F4D3A] font-mono uppercase"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 rounded-xl font-bold text-xs sm:text-sm gold-gradient-btn flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{t.batchVerification.button}</span>
          </button>
        </form>

        {/* Sample Batches Quick Pills */}
        <div className="pt-2">
          <p className="text-[11px] font-semibold text-gray-400 mb-2">
            {t.batchVerification.demoBatchesText}
          </p>
          <div className="flex flex-wrap gap-2">
            {sampleBatches.map((sample) => (
              <button
                key={sample.code}
                type="button"
                onClick={() => handleSelectSample(sample.code)}
                className={`text-[11px] px-2.5 py-1 rounded-lg border font-mono transition-all cursor-pointer ${
                  activeBatch === sample.code
                    ? 'bg-[#1F4D3A] text-white border-[#1F4D3A] font-bold'
                    : 'bg-[#FAF6EC] text-gray-700 border-[#E6DFC8] hover:border-[#1F4D3A]'
                }`}
              >
                {sample.code} <span className="font-sans text-[10px] text-gray-400">({sample.name.split(' ')[0]})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Result Stage */}
      {hasSearched && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="flex items-center justify-between border-b border-gray-200 pb-3">
            <h2 className="text-base sm:text-xl font-bold font-serif-ayur text-[#1F4D3A] flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-700" />
              <span>{t.batchVerification.reportFound}</span>
            </h2>
            <span className="text-xs font-mono font-bold text-[#C8922B]">
              #{activeBatch}
            </span>
          </div>

          <VerifiedBatchCard batchNumber={activeBatch} isOpenByDefault={true} />
        </div>
      )}

      {/* Information Cards on How We Test */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-[#E6DFC8]">
        <div className="bg-[#FAF6EC] p-5 rounded-2xl border border-[#E6DFC8] space-y-2">
          <Award className="w-6 h-6 text-[#C8922B]" />
          <h4 className="text-xs sm:text-sm font-bold text-[#1F4D3A]">
            ICP-MS Heavy Metal Testing
          </h4>
          <p className="text-[11px] text-gray-600 leading-relaxed">
            Every lot is screened on Inductively Coupled Plasma Mass Spectrometry for Lead, Mercury, Arsenic, and Cadmium to parts-per-billion precision.
          </p>
        </div>

        <div className="bg-[#FAF6EC] p-5 rounded-2xl border border-[#E6DFC8] space-y-2">
          <ShieldCheck className="w-6 h-6 text-[#C8922B]" />
          <h4 className="text-xs sm:text-sm font-bold text-[#1F4D3A]">
            Microbial Sterile Filtration
          </h4>
          <p className="text-[11px] text-gray-600 leading-relaxed">
            Culture plates confirm 0% Salmonella, E. Coli, or aflatoxin moulds before any product is sealed into amber glass bottles.
          </p>
        </div>

        <div className="bg-[#FAF6EC] p-5 rounded-2xl border border-[#E6DFC8] space-y-2">
          <FileText className="w-6 h-6 text-[#C8922B]" />
          <h4 className="text-xs sm:text-sm font-bold text-[#1F4D3A]">
            HPLC Active Bio-Assays
          </h4>
          <p className="text-[11px] text-gray-600 leading-relaxed">
            High Performance Liquid Chromatography ensures herbs carry verified active therapeutic markers (e.g., Withanolides &gt; 5%, Fulvic Acid &gt; 60%).
          </p>
        </div>
      </div>

    </div>
  );
}

export default function VerifyBatchPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs">Loading batch verification...</div>}>
      <VerifyBatchContent />
    </Suspense>
  );
}
