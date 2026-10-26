import { PrakritiQuizQuestion, PrakritiResult } from '@/types';

export const PRAKRITI_QUESTIONS: PrakritiQuizQuestion[] = [
  {
    id: 1,
    trait: "Body Frame & Physical Build",
    hindiTrait: "शारीरिक गठन और बनावट",
    options: [
      {
        text: "Slender, light bones, find it difficult to gain weight",
        hindiText: "दुबला-पतला शरीर, हल्की हड्डियां, वजन बढ़ाना मुश्किल",
        dosha: "vata"
      },
      {
        text: "Medium, well-proportioned, athletic frame, easy to gain or lose weight",
        hindiText: "मध्यम सुगठित शरीर, वजन आसानी से घटता-बढ़ता है",
        dosha: "pitta"
      },
      {
        text: "Broad, heavy bones, solid build, tendency to gain weight easily",
        hindiText: "चौड़ा, भारी शरीर, मजबूत हड्डियां, वजन तेजी से बढ़ता है",
        dosha: "kapha"
      }
    ]
  },
  {
    id: 2,
    trait: "Skin Texture & Sensitivity",
    hindiTrait: "त्वचा का प्रकार और संवेदनशीलता",
    options: [
      {
        text: "Dry, rough, thin, cool to the touch, prone to chapping in winters",
        hindiText: "रूखी, खुरदरी, ठंडी त्वचा, सर्दियों में फटने की प्रवृत्ति",
        dosha: "vata"
      },
      {
        text: "Warm, reddish undertone, sensitive, prone to acne, moles or flushing",
        hindiText: "गर्म, गुलाबी रंगत, संवेदनशील, मुहांसे या तिल की संभावना",
        dosha: "pitta"
      },
      {
        text: "Thick, oily, smooth, cool, soft, radiant and ages slowly",
        hindiText: "चिकनी, तैलीय, कोमल, चमकदार और धीमी गति से ढलने वाली त्वचा",
        dosha: "kapha"
      }
    ]
  },
  {
    id: 3,
    trait: "Appetite & Digestive Pattern (Agni)",
    hindiTrait: "भूख और पाचन की स्थिति (जठराग्नि)",
    options: [
      {
        text: "Irregular, variable; sometimes starving, sometimes forget to eat; prone to gas/bloating",
        hindiText: "अनियमित भूख; कभी बहुत तेज तो कभी भूख न लगना; गैस व अफारे की शिकायत",
        dosha: "vata"
      },
      {
        text: "Intense, sharp; get irritable if meals are delayed; prone to acidity or loose bowels",
        hindiText: "तीव्र भूख; समय पर खाना न मिलने पर चिड़चिड़ापन; एसिडिटी की समस्या",
        dosha: "pitta"
      },
      {
        text: "Steady, slow, can easily skip meals without discomfort; digestion takes longer",
        hindiText: "धीमी व स्थिर भूख; भोजन न मिलने पर भी परेशानी नहीं; खाना पचने में समय लगता है",
        dosha: "kapha"
      }
    ]
  },
  {
    id: 4,
    trait: "Sleep Pattern & Dreams",
    hindiTrait: "नींद की प्रकृति और स्वप्न",
    options: [
      {
        text: "Light, interrupted, 5-6 hours, restless thoughts, wake up easily",
        hindiText: "हल्की व टूटती नींद, 5-6 घंटे, मन में विचार, हल्की आवाज पर भी जाग जाना",
        dosha: "vata"
      },
      {
        text: "Moderate 6-7 hours, wake up alert, occasional vivid or fiery dreams",
        hindiText: "मध्यम 6-7 घंटे, जागने पर ऊर्जावान, रंगीन या स्पष्ट सपने",
        dosha: "pitta"
      },
      {
        text: "Deep, heavy, 8+ hours, find it hard to wake up early morning",
        hindiText: "गहरी, भारी नींद, 8 घंटे से ज्यादा, सुबह उठने में आलस्य",
        dosha: "kapha"
      }
    ]
  },
  {
    id: 5,
    trait: "Weather & Temperature Preference",
    hindiTrait: "मौसम और तापमान की पसंद",
    options: [
      {
        text: "Dislike cold and windy weather, love warm sunlight and hot baths",
        hindiText: "ठंड और हवादार मौसम नापसंद, धूप और गर्म पानी से नहाना प्रिय",
        dosha: "vata"
      },
      {
        text: "Dislike heat and intense sun, crave cold drinks and cool rooms",
        hindiText: "गर्मी और तेज धूप बर्दाश्त नहीं, ठंडी चीजें और एसी पसंद",
        dosha: "pitta"
      },
      {
        text: "Dislike damp, cold, humid rain; thrive in dry and warm weather",
        hindiText: "गीला, ठंडा व सीलन भरा मौसम नापसंद; सूखा व गर्म मौसम भाता है",
        dosha: "kapha"
      }
    ]
  },
  {
    id: 6,
    trait: "Stress Response & Mental State",
    hindiTrait: "तनाव में व्यवहार और मानसिक स्थिति",
    options: [
      {
        text: "Anxious, worry quickly, overthink, mind jumps from one thought to another",
        hindiText: "चिंतित होना, जल्दी घबराना, ज्यादा सोचना, विचारों में चंचलता",
        dosha: "vata"
      },
      {
        text: "Impulsive, irritated, frustrated, critical or competitive under pressure",
        hindiText: "गुस्सा आना, चिड़चिड़ापन, लक्ष्य के प्रति अत्यधिक आक्रामक होना",
        dosha: "pitta"
      },
      {
        text: "Calm, avoid conflict, withdraw, can become stubborn or complacent",
        hindiText: "शांत रहना, झगड़े से बचना, सुस्त या आलसी हो जाना",
        dosha: "kapha"
      }
    ]
  }
];

export const PRIMARY_CONCERNS = [
  { id: "gut", label: "Gut, Acidity & Digestion", hindiLabel: "पाचन, गैस व एसिडिटी", slug: "triphala-gut-detox" },
  { id: "sleep", label: "Sleep & Stress Relief", hindiLabel: "अनिद्रा व मानसिक तनाव", slug: "brahmi-ashwagandha-calm-sleep" },
  { id: "vitality", label: "Stamina & Physical Energy", hindiLabel: "स्टैमिना व शारीरिक कमजोरी", slug: "shilajit-gold-stamina-resin" },
  { id: "women", label: "Hormones & Menstrual Care", hindiLabel: "हार्मोनल संतुलन व पीरियड्स", slug: "shatavari-pcod-hormone-balance" },
  { id: "joints", label: "Joint Mobility & Back Stiffness", hindiLabel: "जोड़ों का दर्द व घुटने की जकड़न", slug: "shallaki-guggul-joint-flex" },
  { id: "rasayana", label: "Daily Immunity & Overall Vitality", hindiLabel: "रोग प्रतिरोधक क्षमता व ओजस", slug: "swarna-prash-amla-chyawanprash" }
];

export function calculatePrakriti(answers: Record<number, 'vata' | 'pitta' | 'kapha'>, selectedConcern?: string): PrakritiResult {
  const scores = { vata: 0, pitta: 0, kapha: 0 };
  Object.values(answers).forEach((dosha) => {
    if (dosha in scores) {
      scores[dosha]++;
    }
  });

  const total = (scores.vata + scores.pitta + scores.kapha) || 1;
  const vataPct = Math.round((scores.vata / total) * 100);
  const pittaPct = Math.round((scores.pitta / total) * 100);
  const kaphaPct = Math.round((scores.kapha / total) * 100);

  let primary: PrakritiResult['primaryDosha'] = 'Vata';
  if (scores.vata > scores.pitta && scores.vata > scores.kapha) primary = 'Vata';
  else if (scores.pitta > scores.vata && scores.pitta > scores.kapha) primary = 'Pitta';
  else if (scores.kapha > scores.vata && scores.kapha > scores.pitta) primary = 'Kapha';
  else if (scores.vata === scores.pitta && scores.vata > scores.kapha) primary = 'Vata-Pitta';
  else if (scores.pitta === scores.kapha && scores.pitta > scores.vata) primary = 'Pitta-Kapha';
  else primary = 'Tridoshic';

  const descriptions: Record<string, { en: string; hi: string }> = {
    Vata: {
      en: "Your dominant biological constitution is Vata (Governed by Air & Space). You are creative, quick, and energetic. When out of balance, you may experience dry skin, nervous exhaustion, bloating, or irregular sleep.",
      hi: "आपकी प्रमुख प्रकृति वात (वायु व आकाश) है। आप स्वभाव से रचनात्मक, ऊर्जावान और फुर्तीले हैं। असंतुलित होने पर सूखापन, गैस, बेचैनी या नींद की कमी हो सकती है।"
    },
    Pitta: {
      en: "Your dominant biological constitution is Pitta (Governed by Fire & Water). You possess sharp intellect, strong digestion, and natural drive. When imbalanced, you may experience acidity, heat sensations, or impatience.",
      hi: "आपकी प्रमुख प्रकृति पित्त (अग्नि व जल) है। आप तीक्ष्ण बुद्धि और सशक्त पाचन वाले हैं। असंतुलित होने पर एसिडिटी, त्वचा में जलन और चिड़चिड़ापन महसूस हो सकता है।"
    },
    Kapha: {
      en: "Your dominant biological constitution is Kapha (Governed by Earth & Water). You possess great endurance, calm disposition, and strong bones. When imbalanced, you may experience sluggish metabolism, weight gain, or lethargy.",
      hi: "आपकी प्रमुख प्रकृति कफ (पृथ्वी व जल) है। आप शांत, धैर्यवान और मजबूत शरीर वाले हैं। असंतुलित होने पर धीमा पाचन, भारीपन और सुस्ती की संभावना रहती है।"
    },
    "Vata-Pitta": {
      en: "You have a dual Vata-Pitta constitution. You have dynamic energy paired with sharp intellect. Prioritize grounding habits and cooling, nourishing foods.",
      hi: "आप वात-पित्त द्वंद प्रकृति के हैं। आप में ऊर्जा और तीक्ष्णता का संतुलन है। ठंडे और पौष्टिक आहार पर ध्यान दें।"
    },
    "Pitta-Kapha": {
      en: "You have a Pitta-Kapha constitution blending robust physical strength with strong mental clarity. Balance fire and water with moderate spices and regular movement.",
      hi: "आप पित्त-कफ प्रकृति के हैं। बल और स्थिरता का उत्तम समन्वय है। नियमित व्यायाम और सुपाच्य आहार अपनाएं।"
    },
    Tridoshic: {
      en: "You have a rare, harmonized Tridoshic constitution where Vata, Pitta, and Kapha exist in near-equal proportion. Maintain this natural balance with seasonal Ritucharya practices.",
      hi: "आपकी प्रकृति त्रिदोषज (वात-पित्त-कफ का सुंदर संतुलन) है। मौसमी आहार और नियमित दिनचर्या से इस संतुलन को बनाए रखें।"
    }
  };

  const dietMap: Record<string, { en: string[]; hi: string[] }> = {
    Vata: {
      en: [
        "Favor warm, freshly cooked, moist foods with healthy fats like pure A2 Cow Ghee",
        "Eat cooked whole grains (oats, rice, wheat) and sweet root vegetables",
        "Minimize raw salads, dry cold snacks, carbonated drinks, and cold water",
        "Sip warm herbal teas infused with dry ginger, cinnamon, and cardamom"
      ],
      hi: [
        "गरम, ताजा बना, घी युक्त स्निग्ध और सुपाच्य भोजन ग्रहण करें",
        "पके हुए साबुत अनाज (चावल, गेहूं, दलिया) और शकरकंद का सेवन करें",
        "कच्चा सलाद, ठंडी चीजें, कोल्ड ड्रिंक और सूखे स्नैक्स से बचें",
        "सोंठ, दालचीनी और इलायची की गुनगुनी हर्बल चाय पिएं"
      ]
    },
    Pitta: {
      en: [
        "Favor naturally cooling, sweet, bitter, and astringent foods",
        "Enjoy sweet ripe fruits (pomegranate, sweet apples, melons, grapes)",
        "Limit deep-fried, excessively spicy, sour pickles, and fermented foods",
        "Drink coriander-fennel infused water to soothe internal heat"
      ],
      hi: [
        "शीतल, मधुर, तिक्त (कड़वे) और कसैले रसों का सेवन बढ़ाएं",
        "मीठे मौसमी फल (अनार, सेब, खरबूजा, मुनक्का) का आनंद लें",
        "अत्यधिक मिर्च-मसाले, खट्टे अचार और तले-भुने भोजन से परहेज करें",
        "धनिया और सौंफ का पानी दिनभर घूंट-घूंट पिएं"
      ]
    },
    Kapha: {
      en: [
        "Favor light, warm, dry, pungent, and bitter foods with digestive spices",
        "Include legumes, millet, barley, warm vegetable broths, and leafy greens",
        "Limit heavy dairy, refined sugars, deep-fried sweets, and cold dairy desserts",
        "Begin the morning with warm water, half a teaspoon raw honey, and lemon"
      ],
      hi: [
        "हल्का, गर्म, थोड़ा तीखा और कड़वे रस युक्त भोजन करें",
        "जौ, बाजरा, मूंग की दाल और हरी पत्तेदार सब्जियों को प्राथमिकता दें",
        "मिठाई, मैदा, अत्यधिक मक्खन और ठंडी आइसक्रीम से बचें",
        "सुबह गुनगुने पानी में आधा चम्मच शहद और नींबू मिलाकर पिएं"
      ]
    }
  };

  const routineMap: Record<string, { en: string[]; hi: string[] }> = {
    Vata: {
      en: [
        "Maintain a steady daily rhythm (sleep by 10:30 PM, rise by 6:30 AM)",
        "Daily 10-minute warm sesame oil self-massage (Abhyanga) before bath",
        "Practice calming Nadi Shodhana (Alternate Nostril) pranayama",
        "Avoid multi-tasking and overstimulating screen time at night"
      ],
      hi: [
        "नियमित दिनचर्या का पालन करें (रात 10:30 तक सोएं, सुबह 6:30 तक उठें)",
        "स्नान से पूर्व तिल के गुनगुने तेल से 10 मिनट शरीर की मालिश (अभ्यंग) करें",
        "नाड़ी शोधन प्राणायाम और शांत ध्यान का अभ्यास करें",
        "रात में सोने से पहले मोबाइल स्क्रीन और तेज आवाज से दूर रहें"
      ]
    },
    Pitta: {
      en: [
        "Practice cooling Sheetali and Sheetkari breathing exercises",
        "Gentle evening walks under the moonlight (Chandrakala)",
        "Apply cooling coconut or Brahmi oil to the soles of your feet at bedtime",
        "Avoid exercising under harsh midday sun"
      ],
      hi: [
        "शीतली और शीतकारी प्राणायाम से शरीर की गर्मी शांत करें",
        "शाम को खुली हवा में टहलें और शांत वातावरण में समय बिताएं",
        "रात को सोते समय तलवों पर नारियल या ब्राह्मी तेल की मालिश करें",
        "कड़कती धूप और दोपहर के समय भारी कसरत करने से बचें"
      ]
    },
    Kapha: {
      en: [
        "Wake up before sunrise (by 6:00 AM) to break through morning inertia",
        "Perform vigorous Surya Namaskars and brisk aerobic movement daily",
        "Dry body brushing (Garshana) with raw silk gloves to stimulate lymphatic flow",
        "Avoid daytime sleeping (Divaswapna) entirely"
      ],
      hi: [
        "सूर्योदय से पूर्व (सुबह 6:00 बजे से पहले) बिस्तर छोड़ दें",
        "दैनिक 12 सूर्य नमस्कार और तेज गति से चलने का नियम बनाएं",
        "दिन में सोने की आदत (दिवास्वप्न) से पूरी तरह बचें",
        "उबटन या सूखे चूर्ण से मालिश करके त्वचा का रक्त संचार तेज करें"
      ]
    }
  };

  const baseDoshaKey = (primary === 'Vata-Pitta' || primary === 'Tridoshic') ? 'Vata' : (primary === 'Pitta-Kapha' ? 'Pitta' : primary);

  // Recommended products based on Dosha and selected Concern
  const recommendedSlugs = new Set<string>();
  if (selectedConcern) {
    const match = PRIMARY_CONCERNS.find(c => c.id === selectedConcern);
    if (match) recommendedSlugs.add(match.slug);
  }

  if (baseDoshaKey === 'Vata') {
    recommendedSlugs.add('brahmi-ashwagandha-calm-sleep');
    recommendedSlugs.add('triphala-gut-detox');
    recommendedSlugs.add('gir-cow-a2-bilona-ghee');
  } else if (baseDoshaKey === 'Pitta') {
    recommendedSlugs.add('pure-kashmiri-kumkumadi-tailam');
    recommendedSlugs.add('shatavari-pcod-hormone-balance');
    recommendedSlugs.add('triphala-gut-detox');
  } else {
    recommendedSlugs.add('medohar-guggulu-metabolism');
    recommendedSlugs.add('neem-giloy-krishna-tulsi-drops');
    recommendedSlugs.add('shilajit-gold-stamina-resin');
  }

  return {
    primaryDosha: primary,
    scores,
    description: (descriptions[primary] || descriptions.Vata).en,
    hindiDescription: (descriptions[primary] || descriptions.Vata).hi,
    dietRecommendations: (dietMap[baseDoshaKey] || dietMap.Vata).en,
    hindiDietRecommendations: (dietMap[baseDoshaKey] || dietMap.Vata).hi,
    dailyRoutine: (routineMap[baseDoshaKey] || routineMap.Vata).en,
    hindiDailyRoutine: (routineMap[baseDoshaKey] || routineMap.Vata).hi,
    recommendedProductSlugs: Array.from(recommendedSlugs).slice(0, 4)
  };
}
