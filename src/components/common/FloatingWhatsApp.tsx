'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { MessageCircle, X } from 'lucide-react';

export default function FloatingWhatsApp() {
  const { isHindi } = useLanguage();
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-30 flex flex-col items-end">
      {/* Tooltip callout */}
      {showTooltip && (
        <div className="mb-2 p-3 bg-white text-[#3B2F25] text-xs rounded-xl shadow-xl border border-[#E6DFC8] max-w-xs animate-in fade-in slide-in-from-bottom-2 duration-300 relative">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute -top-1.5 -right-1.5 bg-[#FAF6EC] border border-[#E6DFC8] text-gray-400 hover:text-gray-700 rounded-full p-0.5"
          >
            <X className="w-3 h-3" />
          </button>
          <p className="font-semibold text-[#1F4D3A] flex items-center gap-1 mb-1">
            <span>🌿</span>
            <span>{isHindi ? "आयुर्वेदिक वैद्य परामर्श" : "Talk to a Vaidya"}</span>
          </p>
          <p className="text-[11px] text-gray-600 leading-snug">
            {isHindi
              ? "दवा के चुनाव या अपनी प्रकृति से संबंधित प्रश्नों के लिए व्हाट्सएप पर निःशुल्क सलाह लें।"
              : "Need help selecting the right herbal formulation? Chat with our certified Ayurvedic counselors."}
          </p>
        </div>
      )}

      {/* Floating Button */}
      <a
        href="https://wa.me/919876543210?text=Namaste%20AARU%20Ayurveda,%20I%20would%20like%20to%20consult%20regarding%20my%20health%20routine."
        target="_blank"
        rel="noopener noreferrer"
        className="w-13 h-13 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 group cursor-pointer border-2 border-white"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-current" />
      </a>
    </div>
  );
}
