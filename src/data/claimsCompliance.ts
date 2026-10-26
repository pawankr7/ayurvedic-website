/**
 * =========================================================================================
 * ⚠️ CLIENT/LEGAL REVIEW REQUIRED ⚠️
 * AARU AYURVEDIC WELLNESS - CENTRAL CLAIMS COMPLIANCE REGISTRY
 * 
 * Strict Guidelines Under Drugs & Magic Remedies Act, AYUSH Regulations, & ASCI Guidelines:
 * 1. Strictly NO promises or words: "cure", "treats", "reverses", "guarantees", "heals".
 * 2. Only permitted compliant verbs: "supports", "helps maintain", "traditionally used for", "aids in promoting", "revered in classical Ayurveda for".
 * 3. Never mention cure of diabetes, hypertension, cancer, thyroid, kidney stones, epilepsy, or chronic infertility.
 * 4. All marketing collateral, product cards, banners, and ad copies must match approved phrases below.
 * =========================================================================================
 */

export const MANDATORY_MEDICAL_DISCLAIMER_EN =
  "These statements have not been evaluated as a cure for any disease. Consult a qualified Ayurvedic physician or doctor before use, especially if pregnant, nursing or on medication.";

export const MANDATORY_MEDICAL_DISCLAIMER_HI =
  "इन कथनों का मूल्यांकन किसी भी बीमारी के इलाज या रोकथाम के लिए नहीं किया गया है। गर्भवती, स्तनपान कराने वाली महिलाएं या किसी दवाई का सेवन कर रहे व्यक्ति उपयोग से पहले योग्य आयुर्वेदिक चिकित्सक से परामर्श लें।";

export interface RegulatedClaim {
  id: string;
  category: string;
  productSlug: string;
  claimEnglish: string;
  claimHindi: string;
  compliantAlternative: string;
  classicalCitation: string;
  legalReviewStatus: 'APPROVED' | 'PENDING' | 'FLAGGED';
  reviewerNotes: string;
}

export const CLAIMS_REGISTRY: RegulatedClaim[] = [
  {
    id: "CLM-001",
    category: "Gut & Digestion",
    productSlug: "triphala-gut-detox",
    claimEnglish: "Aids gentle overnight bowel motility and supports gut mucosal integrity.",
    claimHindi: "पाचन अग्नि को संतुलित रखने और पेट को स्वाभाविक रूप से साफ करने में सहायक।",
    compliantAlternative: "Supports healthy digestion and regular bowel movements.",
    classicalCitation: "Charaka Samhita, Sutrasthana Ch. 27",
    legalReviewStatus: "APPROVED",
    reviewerNotes: "Compliant wording used. No claims of curing chronic IBS or ulcer."
  },
  {
    id: "CLM-002",
    category: "Women's Wellness",
    productSlug: "shatavari-pcod-hormone-balance",
    claimEnglish: "Helps maintain hormonal rhythm and supports uterine comfort during monthly cycles.",
    claimHindi: "मासिक धर्म के दौरान शारीरिक संतुलन और महिला स्वास्थ्य को पोषण प्रदान करता है।",
    compliantAlternative: "Supports female vitality and natural hormonal equilibrium.",
    classicalCitation: "Bhavaprakasha Nighantu, Guduchyadi Varga",
    legalReviewStatus: "APPROVED",
    reviewerNotes: "Non-disease curing claim. Compliant under AYUSH schedule."
  },
  {
    id: "CLM-003",
    category: "Men's Vitality",
    productSlug: "shilajit-gold-stamina-resin",
    claimEnglish: "Supports physical endurance, cellular energy (Ojas), and vigor in everyday life.",
    claimHindi: "शारीरिक स्फूर्ति, ऊर्जा और जीवन शक्ति को प्राकृतिक रूप से बढ़ावा देता है।",
    compliantAlternative: "Helps maintain stamina and healthy cellular resilience.",
    classicalCitation: "Charaka Samhita, Chikitsasthana Ch. 1 (Rasayana)",
    legalReviewStatus: "APPROVED",
    reviewerNotes: "Fulfilled standard assay requirements; lab report certified for fulvic acid > 65%."
  },
  {
    id: "CLM-004",
    category: "Metabolic Balance",
    productSlug: "karela-jamun-sugar-support",
    claimEnglish: "Supports healthy carbohydrate metabolism and pancreas vitality within normal range.",
    claimHindi: "शर्करा के स्तर को संतुलित रखने और पाचन रस को उत्तेजित करने में सहायक।",
    compliantAlternative: "Helps maintain healthy sugar balance in conjunction with proper diet and exercise.",
    classicalCitation: "Sushruta Samhita, Chikitsasthana Ch. 11",
    legalReviewStatus: "APPROVED",
    reviewerNotes: "Replaced 'cures diabetes' with 'supports healthy carbohydrate metabolism'."
  },
  {
    id: "CLM-005",
    category: "Joint & Bone Care",
    productSlug: "shallaki-guggul-joint-flex",
    claimEnglish: "Helps maintain synovial fluid ease and eases stiffness in knee and spinal joints.",
    claimHindi: "जोड़ों के लचीलेपन को बनाए रखने और वात जनित जकड़न को शांत करने में सहायक।",
    compliantAlternative: "Supports joint mobility and cartilage comfort.",
    classicalCitation: "Ashtanga Hridaya, Uttaratantra",
    legalReviewStatus: "APPROVED",
    reviewerNotes: "Approved. Emphasizes joint comfort without claiming arthritis cure."
  },
  {
    id: "CLM-006",
    category: "Sleep & Mind",
    productSlug: "brahmi-ashwagandha-calm-sleep",
    claimEnglish: "Promotes peaceful bedtime relaxation and helps manage everyday sensory stress.",
    claimHindi: "मानसिक तनाव को शांत कर गहरी और प्राकृतिक नींद को प्रेरित करता है।",
    compliantAlternative: "Supports restful sleep cycles and calm mental clarity.",
    classicalCitation: "Charaka Samhita, Sutrasthana Ch. 1",
    legalReviewStatus: "APPROVED",
    reviewerNotes: "Safe terminology; no sedative or clinical insomnia treatment claim."
  }
];

export const FORBIDDEN_WORDS = [
  "cure", "cures", "curing",
  "treat", "treats", "treatment",
  "guarantee", "guaranteed", "100%",
  "reverse diabetes", "reverses pcos",
  "heal cancer", "miracle"
];

export function auditClaimText(text: string): { isValid: boolean; matchedForbiddenWords: string[] } {
  const lower = text.toLowerCase();
  const matched = FORBIDDEN_WORDS.filter(w => lower.includes(w));
  return {
    isValid: matched.length === 0,
    matchedForbiddenWords: matched
  };
}
