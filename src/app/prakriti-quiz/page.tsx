'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PRAKRITI_QUESTIONS, PRIMARY_CONCERNS, calculatePrakriti } from '@/data/quizQuestions';
import { PRODUCTS } from '@/data/products';
import { PrakritiResult } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import ProductCard from '@/components/product/ProductCard';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Share2,
  MessageCircle,
  RotateCcw,
  User,
  Phone,
  Mail,
  ShieldCheck,
  Wind,
  Flame,
  Droplets,
  HelpCircle,
  ChevronDown
} from 'lucide-react';

export default function PrakritiQuizPage() {
  const { t, isHindi } = useLanguage();

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, 'vata' | 'pitta' | 'kapha'>>({});
  const [selectedConcern, setSelectedConcern] = useState<string>('gut');
  const [leadName, setLeadName] = useState<string>('');
  const [leadPhone, setLeadPhone] = useState<string>('');
  const [leadEmail, setLeadEmail] = useState<string>('');
  const [result, setResult] = useState<PrakritiResult | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const totalQuestions = PRAKRITI_QUESTIONS.length;

  const handleSelectOption = (questionId: number, dosha: 'vata' | 'pitta' | 'kapha') => {
    setAnswers((prev) => ({ ...prev, [questionId]: dosha }));
    if (currentStep < totalQuestions - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(totalQuestions); // Move to concern step
    }
  };

  const handleFinishQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    const calculated = calculatePrakriti(answers, selectedConcern);
    setResult(calculated);

    // Save lead in localStorage for admin panel viewing
    try {
      const existingLeads = JSON.parse(localStorage.getItem('aaru_leads') || '[]');
      existingLeads.push({
        id: `LEAD-${Date.now()}`,
        name: leadName || 'Ayurvedic Seeker',
        phone: leadPhone || 'Not provided',
        email: leadEmail || 'Not provided',
        dosha: calculated.primaryDosha,
        concern: selectedConcern,
        date: new Date().toISOString()
      });
      localStorage.setItem('aaru_leads', JSON.stringify(existingLeads));
    } catch {
      // ignore
    }

    setCurrentStep(totalQuestions + 2); // Show result
  };

  const restartQuiz = () => {
    setAnswers({});
    setCurrentStep(0);
    setResult(null);
  };

  // Matched recommended products
  const recommendedProducts = result
    ? PRODUCTS.filter((p) => result.recommendedProductSlugs.includes(p.slug))
    : [];

  // Quiz & FAQ Structured Data for Google Rich Snippets
  const quizSchema = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    "name": "AARU 2-Minute Ayurvedic Prakriti & Dosha Assessment",
    "description": "Discover your unique Vata, Pitta, and Kapha constitution and receive a personalized diet (Pathya) and classical herbal regimen.",
    "educationalUse": "Assessment",
    "typicalAgeRange": "18+",
    "provider": {
      "@type": "Organization",
      "name": "AARU Ayurvedic Wellness",
      "url": "https://aaruayurveda.com"
    }
  };

  const faqItems = [
    {
      q: "What is Prakriti in Ayurvedic Medicine?",
      hiQ: "आयुर्वेद में प्रकृति क्या है?",
      a: "Prakriti is your unique biological constitution determined at conception according to classical Samhitas. It is defined by the unique equilibrium of the three biological humors (Tridosha): Vata (movement & nervous system), Pitta (transformation & digestion), and Kapha (structure & lubrication).",
      hiA: "प्रकृति गर्भाधान के समय निर्धारित आपका अद्वितीय शारीरिक और मानसिक संविधान है। यह वात, पित्त और कफ के संतुलन से बनती है।"
    },
    {
      q: "How accurate is this 2-minute online Prakriti test?",
      hiQ: "यह 2 मिनट का ऑनलाइन प्रकृति परीक्षण कितना सटीक है?",
      a: "The AARU Prakriti algorithm is calibrated strictly according to the diagnostic parameters of Charaka Samhita (Viman Sthana Chapter 8). It evaluates your physical structure, metabolic rhythm, digestion speed, and environmental tolerances.",
      hiA: "आरु का यह परीक्षण चरक संहिता के श्लोकों और शास्त्रीय लक्षणों पर आधारित है।"
    },
    {
      q: "Can my Prakriti change over my lifetime?",
      hiQ: "क्या मेरी प्रकृति जीवनभर में बदल सकती है?",
      a: "No, your original Prakriti (Janma Prakriti) remains constant throughout your life. However, modern lifestyle, seasonal variations, and stress can cause an imbalance (Vikriti), which our classical regimens are formulated to correct.",
      hiA: "जन्म प्रकृति कभी नहीं बदलती, लेकिन गलत खानपान और तनाव से दोषों में विकृति (असंतुलन) आ जाती है, जिसे संतुलित किया जा सकता है।"
    },
    {
      q: "Are the herbal recommendations customized for my dosha?",
      hiQ: "क्या सुझाई गई औषधियां मेरे दोष के अनुसार हैं?",
      a: "Yes. Every formulation suggested after your test is matched with your specific primary dosha and dominant health concern, complete with recommended dietary guidelines (Pathya) and daily routine (Dinacharya).",
      hiA: "हाँ, आपके परिणाम के आधार पर विशेष शास्त्रीय औषधियां, पथ्य-अपथ्य आहार और दिनचर्या सुझाई जाती है।"
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map((item) => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  };

  // Calculate percentage breakdown for result
  const totalScore = result ? (result.scores.vata + result.scores.pitta + result.scores.kapha) || 1 : 1;
  const vataPct = result ? Math.round((result.scores.vata / totalScore) * 100) : 33;
  const pittaPct = result ? Math.round((result.scores.pitta / totalScore) * 100) : 34;
  const kaphaPct = result ? Math.max(0, 100 - vataPct - pittaPct) : 33;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-12">
      
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(quizSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* 1. Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#C8922B]/20 text-[#1F4D3A] text-xs font-bold border border-[#C8922B]/40 shadow-xs animate-pulse-subtle">
          <Sparkles className="w-4 h-4 text-[#C8922B]" />
          <span>{t.prakriti.badge}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold font-serif-ayur text-[#1F4D3A] tracking-tight">
          {t.prakriti.title}
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
          {t.prakriti.subtitle}
        </p>

        {/* 3 Elemental Doshas Intro Strip */}
        <div className="grid grid-cols-3 gap-3 pt-4 max-w-lg mx-auto">
          <div className="p-3 rounded-2xl bg-white border border-[#E6DFC8] text-center shadow-xs">
            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 mx-auto flex items-center justify-center mb-1">
              <Wind className="w-4 h-4" />
            </div>
            <p className="text-xs font-bold text-[#1F4D3A]">Vata (वात)</p>
            <p className="text-[10px] text-gray-500">Air & Space</p>
          </div>
          <div className="p-3 rounded-2xl bg-white border border-[#E6DFC8] text-center shadow-xs">
            <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 mx-auto flex items-center justify-center mb-1">
              <Flame className="w-4 h-4" />
            </div>
            <p className="text-xs font-bold text-[#1F4D3A]">Pitta (पित्त)</p>
            <p className="text-[10px] text-gray-500">Fire & Water</p>
          </div>
          <div className="p-3 rounded-2xl bg-white border border-[#E6DFC8] text-center shadow-xs">
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center mb-1">
              <Droplets className="w-4 h-4" />
            </div>
            <p className="text-xs font-bold text-[#1F4D3A]">Kapha (कफ)</p>
            <p className="text-[10px] text-gray-500">Earth & Water</p>
          </div>
        </div>
      </div>

      {/* Progress Bar (when answering questions) */}
      {currentStep < totalQuestions && (
        <div className="space-y-2 max-w-xl mx-auto">
          <div className="flex justify-between text-xs font-semibold text-[#1F4D3A]">
            <span>
              {isHindi ? `प्रश्न ${currentStep + 1} / ${totalQuestions}` : `Question ${currentStep + 1} of ${totalQuestions}`}
            </span>
            <span className="text-[#C8922B] font-mono">{Math.round(((currentStep + 1) / totalQuestions) * 100)}% Completed</span>
          </div>
          <div className="w-full bg-[#E6DFC8] h-2.5 rounded-full overflow-hidden p-0.5 border border-[#E6DFC8]">
            <div
              className="bg-gradient-to-r from-[#1F4D3A] via-[#2A684F] to-[#C8922B] h-full transition-all duration-300 rounded-full"
              style={{ width: `${((currentStep + 1) / totalQuestions) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* 2. Questions Step */}
      {currentStep < totalQuestions && (
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#E6DFC8] shadow-ayur space-y-6 max-w-2xl mx-auto animate-in fade-in duration-200">
          <div className="space-y-1 border-b border-gray-100 pb-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C8922B]">
              Trait Assessment #{currentStep + 1}
            </span>
            <h2 className="text-lg sm:text-2xl font-bold font-serif-ayur text-[#1F4D3A]">
              {isHindi
                ? PRAKRITI_QUESTIONS[currentStep].hindiTrait
                : PRAKRITI_QUESTIONS[currentStep].trait}
            </h2>
          </div>

          <div className="space-y-3">
            {PRAKRITI_QUESTIONS[currentStep].options.map((opt, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSelectOption(PRAKRITI_QUESTIONS[currentStep].id, opt.dosha)}
                className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm transition-all duration-200 flex items-start gap-3.5 cursor-pointer ${
                  answers[PRAKRITI_QUESTIONS[currentStep].id] === opt.dosha
                    ? 'border-[#C8922B] bg-[#FAF6EC] text-[#1F4D3A] font-semibold shadow-gold ring-1 ring-[#C8922B]'
                    : 'border-[#E6DFC8] bg-white hover:bg-[#FAF6EC]/50 hover:border-[#C8922B] shadow-xs'
                }`}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                  answers[PRAKRITI_QUESTIONS[currentStep].id] === opt.dosha
                    ? 'border-[#C8922B] bg-[#C8922B]'
                    : 'border-gray-300'
                }`}>
                  {answers[PRAKRITI_QUESTIONS[currentStep].id] === opt.dosha && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="leading-snug">
                    {isHindi ? opt.hindiText : opt.text}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {currentStep > 0 && (
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="text-xs font-semibold text-gray-500 hover:text-[#1F4D3A] flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{isHindi ? "पिछला प्रश्न" : "Previous Question"}</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* 3. Concern Selector Step */}
      {currentStep === totalQuestions && (
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#E6DFC8] shadow-ayur space-y-6 max-w-2xl mx-auto animate-in fade-in duration-200">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C8922B]">
              Step 2 of 3
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-serif-ayur text-[#1F4D3A]">
              {t.prakriti.selectConcernTitle}
            </h2>
            <p className="text-xs text-gray-500">
              Select the area you want our Ayurvedic physicians to prioritize in your regimen.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PRIMARY_CONCERNS.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedConcern(c.id)}
                className={`p-4 rounded-2xl border text-left text-xs transition-all cursor-pointer ${
                  selectedConcern === c.id
                    ? 'border-[#1F4D3A] bg-[#EEF3EA] text-[#1F4D3A] font-bold shadow-xs ring-1 ring-[#1F4D3A]'
                    : 'border-[#E6DFC8] bg-[#FAF6EC]/60 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-base">🌿</span>
                  {selectedConcern === c.id && <CheckCircle2 className="w-4 h-4 text-[#C8922B]" />}
                </div>
                <span>{isHindi ? c.hindiLabel : c.label}</span>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setCurrentStep(totalQuestions + 1)}
            className="w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm gold-gradient-btn flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <span>{isHindi ? "आगे बढ़ें (रिपोर्ट देखें)" : "Continue to My Diagnostic Report"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 4. Lead Capture Form */}
      {currentStep === totalQuestions + 1 && (
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#E6DFC8] shadow-ayur space-y-6 max-w-xl mx-auto animate-in fade-in duration-200">
          <div className="text-center space-y-2">
            <span className="text-4xl">📜</span>
            <h2 className="text-xl sm:text-2xl font-bold font-serif-ayur text-[#1F4D3A]">
              {t.prakriti.leadTitle}
            </h2>
            <p className="text-xs text-gray-500 leading-relaxed">
              Receive your personalized dosha chart, printed diet guide, and complimentary WhatsApp follow-up with our certified Vaidya team.
            </p>
          </div>

          <form onSubmit={handleFinishQuiz} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-gray-700 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#C8922B]" />
                <span>{t.prakriti.leadName} *</span>
              </label>
              <input
                type="text"
                required
                value={leadName}
                onChange={(e) => setLeadName(e.target.value)}
                placeholder="e.g. Anjali Sharma"
                className="w-full px-3.5 py-2.5 bg-[#FAF6EC] border border-[#E6DFC8] rounded-xl text-xs focus:outline-none focus:border-[#C8922B]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-gray-700 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#C8922B]" />
                <span>{t.prakriti.leadPhone} *</span>
              </label>
              <input
                type="tel"
                required
                value={leadPhone}
                onChange={(e) => setLeadPhone(e.target.value)}
                placeholder="10-digit mobile number for WhatsApp delivery"
                className="w-full px-3.5 py-2.5 bg-[#FAF6EC] border border-[#E6DFC8] rounded-xl text-xs focus:outline-none focus:border-[#C8922B]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-gray-700 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#C8922B]" />
                <span>{t.prakriti.leadEmail}</span>
              </label>
              <input
                type="email"
                value={leadEmail}
                onChange={(e) => setLeadEmail(e.target.value)}
                placeholder="name@example.com (optional)"
                className="w-full px-3.5 py-2.5 bg-[#FAF6EC] border border-[#E6DFC8] rounded-xl text-xs focus:outline-none focus:border-[#C8922B]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm gold-gradient-btn flex items-center justify-center gap-2 cursor-pointer shadow-md mt-4"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t.prakriti.seeResultsBtn}</span>
            </button>

            <p className="text-[10px] text-center text-gray-400">
              🔒 100% Privacy Protected. No spam, ever. Verified Ayurvedic counselors only.
            </p>
          </form>
        </div>
      )}

      {/* 5. Complete Results & Regimen Report */}
      {result && currentStep >= totalQuestions + 2 && (
        <div className="space-y-10 animate-in fade-in duration-300">
          
          {/* Main Prakriti Certificate Box */}
          <div className="bg-gradient-to-r from-[#1F4D3A] via-[#1A4232] to-[#143527] rounded-3xl p-6 sm:p-12 text-[#FAF6EC] shadow-2xl relative overflow-hidden space-y-8 border border-[#C8922B]/30">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-white/10 pb-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#DFAB48] font-bold">
                  Official Ayurvedic Diagnostic Report
                </span>
                <h2 className="text-3xl sm:text-5xl font-bold font-serif-ayur text-white mt-1">
                  {result.primaryDosha} Prakriti
                </h2>
              </div>

              {/* Visual Tri-Dosha Elemental Balance Meter */}
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 space-y-3 min-w-[240px]">
                <p className="text-[10px] uppercase font-bold text-[#DFAB48] flex items-center justify-between">
                  <span>Tridosha Equilibrium</span>
                  <span className="font-mono text-white/80">100%</span>
                </p>
                <div className="space-y-2 text-xs">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-blue-300">Vata (Air & Space):</span>
                      <strong className="font-mono">{vataPct}%</strong>
                    </div>
                    <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-blue-400 h-full rounded-full" style={{ width: `${vataPct}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-amber-300">Pitta (Fire & Water):</span>
                      <strong className="font-mono">{pittaPct}%</strong>
                    </div>
                    <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-amber-400 h-full rounded-full" style={{ width: `${pittaPct}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-emerald-300">Kapha (Earth & Water):</span>
                      <strong className="font-mono">{kaphaPct}%</strong>
                    </div>
                    <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${kaphaPct}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#FAF6EC]/90 leading-relaxed max-w-3xl">
              {isHindi ? result.hindiDescription : result.description}
            </p>

            {/* WhatsApp Consultation Action Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
              <a
                href={`https://wa.me/919876543210?text=Namaste%20Dr.%20Sharma,%20I%20completed%20the%20AARU%20Prakriti%20Quiz.%20My%20result%20is%20${result.primaryDosha}%20and%20my%20primary%20concern%20is%20${selectedConcern}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full font-bold text-xs bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center gap-2 shadow-lg cursor-pointer transition-transform hover:-translate-y-0.5"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Discuss My Report with a Vaidya (WhatsApp)</span>
              </a>

              <button
                onClick={restartQuiz}
                className="text-xs text-[#DFAB48] hover:text-white flex items-center gap-1 underline cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Quiz</span>
              </button>
            </div>
          </div>

          {/* Diet & Routine Recommendations (Pathya & Dinacharya) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Diet Guidelines */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E6DFC8] shadow-ayur space-y-4">
              <h3 className="text-base font-bold font-serif-ayur text-[#1F4D3A] flex items-center gap-2">
                <span>🥗</span>
                <span>{t.prakriti.dietRecommendations}</span>
              </h3>
              <ul className="space-y-3 text-xs text-gray-700">
                {(isHindi ? result.hindiDietRecommendations : result.dietRecommendations).map((diet, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-green-700 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{diet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Daily Routine Guidelines */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E6DFC8] shadow-ayur space-y-4">
              <h3 className="text-base font-bold font-serif-ayur text-[#1F4D3A] flex items-center gap-2">
                <span>☀️</span>
                <span>{t.prakriti.dailyRoutine}</span>
              </h3>
              <ul className="space-y-3 text-xs text-gray-700">
                {(isHindi ? result.hindiDailyRoutine : result.dailyRoutine).map((routine, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C8922B] shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{routine}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Targeted Product Recommendations */}
          <section className="space-y-6 pt-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C8922B]">
                Personalized Ayurvedic Regimen
              </span>
              <h3 className="text-xl sm:text-3xl font-bold font-serif-ayur text-[#1F4D3A]">
                {t.prakriti.recommendedProducts}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </section>

        </div>
      )}

      {/* 6. SEO-Rich Accordion FAQ Section */}
      <section className="pt-10 border-t border-[#E6DFC8] space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs text-[#C8922B] font-bold uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>Prakriti & Dosha Science</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif-ayur text-[#1F4D3A]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3 max-w-2xl mx-auto">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-[#E6DFC8] overflow-hidden shadow-xs transition-colors"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full p-4 text-left font-bold text-xs sm:text-sm text-[#1F4D3A] flex items-center justify-between gap-4 cursor-pointer"
              >
                <span>{isHindi ? item.hiQ : item.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#C8922B] transition-transform duration-200 shrink-0 ${
                    openFaq === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openFaq === index && (
                <div className="px-4 pb-4 text-xs text-gray-600 leading-relaxed border-t border-gray-100 pt-3 animate-in fade-in duration-200">
                  {isHindi ? item.hiA : item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
