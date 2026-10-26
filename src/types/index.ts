export type Language = 'en' | 'hi';

export interface Category {
  id: string;
  slug: string;
  name: string;
  hindiName: string;
  description: string;
  hindiDescription: string;
  iconName: string;
  badge?: string;
  seoTitle: string;
  seoDescription: string;
  faqs: { question: string; answer: string; hindiQuestion: string; hindiAnswer: string }[];
}

export interface Ingredient {
  name: string;
  botanicalName: string;
  hindiName: string;
  partUsed: string;
  sourceRegion: string;
  extractionMethod: string;
  whyItWorks: string;
  classicalReference?: string;
}

export interface LabReport {
  batchNumber: string;
  productName: string;
  mfgDate: string;
  expiryDate: string;
  testingLab: string;
  nablAccreditationNo: string;
  reportDate: string;
  status: 'PASSED' | 'FAILED' | 'UNDER_TEST';
  heavyMetals: {
    lead: { value: string; limit: string; status: 'PASSED' | 'FAILED' };
    arsenic: { value: string; limit: string; status: 'PASSED' | 'FAILED' };
    mercury: { value: string; limit: string; status: 'PASSED' | 'FAILED' };
    cadmium: { value: string; limit: string; status: 'PASSED' | 'FAILED' };
  };
  microbial: {
    totalPlateCount: { value: string; limit: string; status: 'PASSED' };
    yeastAndMould: { value: string; limit: string; status: 'PASSED' };
    eColi: { value: string; limit: string; status: 'PASSED' };
    salmonella: { value: string; limit: string; status: 'PASSED' };
  };
  pesticideResidues: {
    status: 'NOT DETECTED' | 'WITHIN LIMITS';
    testedCompoundsCount: number;
  };
  assay: {
    markerCompound: string;
    foundPercentage: string;
    standardLimit: string;
    status: 'PASSED';
  };
  certifiedAyushDocUrl?: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  size: string;
  price: number;
  originalPrice: number;
  sku: string;
  inStock: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  hindiName: string;
  subtitle: string;
  hindiSubtitle: string;
  categoryId: string;
  categoryName: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  stockCount: number;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  certified: boolean;
  certificateType: 'AYUSH' | 'GMP' | 'ISO' | 'FSSAI' | 'Traditional formulation';
  certificateNumber?: string;
  issuingBody?: string;
  form: 'tablet' | 'capsule' | 'powder' | 'juice' | 'oil' | 'syrup' | 'tea';
  lifeStage: 'all' | 'women' | 'men' | 'kids' | 'seniors';
  vegetarian: boolean;
  subscriptionEligible: boolean;
  subscriptionDiscount: number; // e.g. 15 for 15%
  defaultBatch: string;
  availableBatches: string[];
  images: string[];
  description: string;
  hindiDescription: string;
  benefits: string[];
  hindiBenefits: string[];
  dosage: string;
  hindiDosage: string;
  whoShouldAvoid: string;
  hindiWhoShouldAvoid: string;
  classicalReference: string;
  regimenDays?: number; // 30, 60, 90
  ingredients: Ingredient[];
  claimsReviewStatus: 'APPROVED' | 'PENDING' | 'REJECTED';
}

export interface CartItem {
  product: Product;
  variantId?: string;
  variantName?: string;
  price: number;
  quantity: number;
  isSubscription?: boolean;
  subscriptionIntervalDays?: number; // 15, 30, 45, 60
}

export interface PrakritiQuizQuestion {
  id: number;
  trait: string;
  hindiTrait: string;
  options: {
    text: string;
    hindiText: string;
    dosha: 'vata' | 'pitta' | 'kapha';
  }[];
}

export interface PrakritiResult {
  primaryDosha: 'Vata' | 'Pitta' | 'Kapha' | 'Vata-Pitta' | 'Pitta-Kapha' | 'Vata-Kapha' | 'Tridoshic';
  scores: { vata: number; pitta: number; kapha: number };
  description: string;
  hindiDescription: string;
  dietRecommendations: string[];
  hindiDietRecommendations: string[];
  dailyRoutine: string[];
  hindiDailyRoutine: string[];
  recommendedProductSlugs: string[];
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  items: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    batchNumber: string;
  }[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  paymentMethod: 'COD' | 'UPI' | 'CARD' | 'NETBANKING';
  paymentStatus: 'PAID' | 'PENDING' | 'COD_CONFIRMED';
  orderStatus: 'PLACED' | 'DISPATCHED' | 'IN_TRANSIT' | 'DELIVERED';
  awbNumber?: string;
  courier?: string;
  createdAt: string;
}
