export interface BlogPost {
  slug: string;
  title: string;
  hindiTitle: string;
  excerpt: string;
  hindiExcerpt: string;
  category: string;
  author: string;
  reviewer: string;
  readTime: string;
  date: string;
  coverImage: string;
  content: string;
  hindiContent: string;
  tags: string[];
}

export interface IngredientWiki {
  slug: string;
  name: string;
  hindiName: string;
  botanicalName: string;
  sanskritName: string;
  classicalSource: string;
  rasa: string; // Taste
  virya: string; // Potency
  vipaka: string; // Post-digestive effect
  prabhava: string; // Special action
  overview: string;
  hindiOverview: string;
  scienceBacking: string;
  hindiScienceBacking: string;
  safeDosage: string;
  cautions: string;
  relatedProductSlug: string;
}

export const INGREDIENT_ENCYCLOPEDIA: IngredientWiki[] = [
  {
    slug: "ashwagandha",
    name: "Ashwagandha",
    hindiName: "अश्वगंधा",
    botanicalName: "Withania somnifera",
    sanskritName: "अश्वगन्धा (Smell of a horse - imparts stallion strength)",
    classicalSource: "Charaka Samhita Sutrasthana 4 & Chikitsasthana 1",
    rasa: "Tikta (Bitter), Kashaya (Astringent), Madhura (Sweet)",
    virya: "Ushna (Heating)",
    vipaka: "Madhura (Sweet)",
    prabhava: "Balya & Medhya (Supreme strengthener & cognitive adaptogen)",
    overview: "One of the most revered Rasayanas in Ayurveda. Calms aggravated Vata in the nervous system, supports the adrenal glands, and enhances deep restorative sleep.",
    hindiOverview: "शारीरिक बल, ऊर्जा और मानसिक शांति प्रदान करने वाला सर्वश्रेष्ठ रसायन। यह कोर्टिसोल को कम कर गहरी नींद में सहायता करता है।",
    scienceBacking: "Clinical trials on standardized root extracts demonstrate up to 27.9% reduction in serum cortisol and significant improvement in sleep architecture.",
    hindiScienceBacking: "क्लिनिकल परीक्षणों में पाया गया है कि इसके मानकीकृत सत्व से तनाव हार्मोन कोर्टिसोल में 27% से अधिक की कमी आती है।",
    safeDosage: "300mg to 600mg of standardized root extract (min 5% withanolides) with warm milk.",
    cautions: "Avoid during acute pregnancy unless monitored by an Ayurvedic obstetrician.",
    relatedProductSlug: "brahmi-ashwagandha-calm-sleep"
  },
  {
    slug: "triphala",
    name: "Triphala",
    hindiName: "त्रिफला",
    botanicalName: "Amalaki + Haritaki + Bibhitaki",
    sanskritName: "त्रिफला (Three sacred fruits)",
    classicalSource: "Sushruta Samhita Sutrasthana 38",
    rasa: "Pancharasa (All five tastes except salty)",
    virya: "Anushna (Neutral / balanced)",
    vipaka: "Madhura (Sweet)",
    prabhava: "Chakshushya & Deepana (Eye tonic & gentle digestive detox)",
    overview: "A perfectly balanced formulation where Haritaki pacifies Vata, Amalaki cools Pitta, and Bibhitaki cleanses Kapha. Promotes gentle peristalsis and mucosal nourishment.",
    hindiOverview: "हरड़, बहेड़ा और आंवले का दिव्य संगम। यह तीनों दोषों को संतुलित कर आंतों को बिना किसी मरोड़ के साफ करता है।",
    scienceBacking: "Rich in chebulic acid and gallic acid, acts as a prebiotic favoring beneficial Lactobacillus and Bifidobacterium gut colonies.",
    hindiScienceBacking: "गैलिक एसिड और टैनिन से भरपूर, यह आंतों के स्वस्थ बैक्टीरिया (माइक्रोबायोम) को पोषण प्रदान करता है।",
    safeDosage: "1 to 2 tablets (500mg - 1000mg) at bedtime with warm water.",
    cautions: "Not recommended in active dysentery or dehydration.",
    relatedProductSlug: "triphala-gut-detox"
  },
  {
    slug: "shilajit",
    name: "Shilajit",
    hindiName: "शिलाजीत",
    botanicalName: "Asphaltum punjabianum",
    sanskritName: "शिलाजतु (Rock invincible / Conqueror of mountains)",
    classicalSource: "Charaka Samhita Chikitsasthana Chapter 1-3",
    rasa: "Tikta (Bitter), Katu (Pungent), Kashaya (Astringent)",
    virya: "Ushna (Heating)",
    vipaka: "Katu (Pungent)",
    prabhava: "Sarvarogahara & Yogavahi (Transports minerals across cell walls)",
    overview: "Formed over centuries by the slow decomposition of medicinal plants locked within Himalayan rocks at 18,000+ ft. Rich in fulvic acid and ionic minerals.",
    hindiOverview: "हिमालय की चट्टानों से प्राप्त प्राकृतिक राल। इसमें 80+ मिनरल्स और फुल्विक एसिड पाए जाते हैं जो शारीरिक ओजस बढ़ाते हैं।",
    scienceBacking: "Scientific analysis verifies fulvic acid accelerates ATP generation inside mitochondria and scavenges free radicals.",
    hindiScienceBacking: "वैज्ञानिक शोधों में साबित हुआ है कि फुल्विक एसिड कोशिकाओं के माइटोकॉन्ड्रिया में ऊर्जा (ATP) निर्माण को तेज करता है।",
    safeDosage: "300mg to 500mg (pea sized) once daily dissolved in warm water or milk.",
    cautions: "Never consume raw, unpurified pitch. Only use lab-tested, NABL-certified heavy-metal-free purified Shilajit.",
    relatedProductSlug: "shilajit-gold-stamina-resin"
  },
  {
    slug: "shatavari",
    name: "Shatavari",
    hindiName: "शतावरी",
    botanicalName: "Asparagus racemosus",
    sanskritName: "शतावरी (She who possesses a hundred husbands - boundless vitality)",
    classicalSource: "Bhavaprakasha Nighantu Guduchyadi Varga",
    rasa: "Madhura (Sweet), Tikta (Bitter)",
    virya: "Sheeta (Cooling)",
    vipaka: "Madhura (Sweet)",
    prabhava: "Stanyajanana & Shukra Vardhana (Female reproductive tonic)",
    overview: "The quintessential female Rasayana. Deeply soothes dry heat, nourishes endometrial and mucosal tissue, and balances hormones.",
    hindiOverview: "महिलाओं के लिए अमृततुल्य औषधि। यह हार्मोनल असंतुलन, पीसीओडी और अनियमित माहवारी में शीतलता और पोषण देती है।",
    scienceBacking: "Shatavarin steroidal saponins bind gently to estrogen receptors, modulating hormone surges and providing uterine antioxidant support.",
    hindiScienceBacking: "शतावरिन सैपोनिन्स प्राकृतिक रूप से एस्ट्रोजन हार्मोन को संतुलित कर गर्भाशय को स्वस्थ रखते हैं।",
    safeDosage: "500mg standardized capsule twice daily with milk.",
    cautions: "Those with known asparagus allergies should avoid.",
    relatedProductSlug: "shatavari-pcod-hormone-balance"
  },
  {
    slug: "giloy",
    name: "Giloy (Guduchi)",
    hindiName: "गिलोय (गुडूची)",
    botanicalName: "Tinospora cordifolia",
    sanskritName: "अमृता (Nectar of Immortality)",
    classicalSource: "Charaka Samhita Sutrasthana 25",
    rasa: "Tikta (Bitter), Kashaya (Astringent)",
    virya: "Ushna (Mildly warming yet Pitta-pacifying)",
    vipaka: "Madhura (Sweet)",
    prabhava: "Tridoshashamaka & Jvarahara (Supreme febrifuge & immunomodulator)",
    overview: "Known as heavenly nectar because it revitalizes damaged tissues, stimulates white blood cell count, and cleanses the blood of accumulated toxins.",
    hindiOverview: "अमृता नाम से प्रसिद्ध गिलोय शरीर की रोग प्रतिरोधक शक्ति बढ़ाती है और पुराने से पुराने बुखार व संक्रमण को दूर करती है।",
    scienceBacking: "Cordifolioside A and tinocordiside significantly activate macrophages and splenic lymphocytes against pathogenic challenges.",
    hindiScienceBacking: "वैज्ञानिक अध्ययनों से सिद्ध है कि इसके घटक श्वेत रक्त कोशिकाओं की संख्या और कार्यक्षमता को बढ़ाते हैं।",
    safeDosage: "5ml to 10ml liquid extract or 500mg extract twice daily.",
    cautions: "Safe for long-term use in recommended therapeutic doses.",
    relatedProductSlug: "neem-giloy-krishna-tulsi-drops"
  },
  {
    slug: "tulsi",
    name: "Tulsi (Holy Basil)",
    hindiName: "तुलसी",
    botanicalName: "Ocimum sanctum",
    sanskritName: "सुरसा / तुलसी (The Incomparable One)",
    classicalSource: "Dhanvantari Nighantu",
    rasa: "Katu (Pungent), Tikta (Bitter)",
    virya: "Ushna (Warming)",
    vipaka: "Katu (Pungent)",
    prabhava: "Kaphaghna & Swasahara (Relieves lung congestion & bronchial spasms)",
    overview: "Sacred herb venerated in Indian households. Purifies inhaled prana, eases coughs, and lowers physical stress response.",
    hindiOverview: "हर घर में पूजनीय तुलसी फेफड़ों को मजबूत करने, सर्दी-खांसी मिटाने और मौसमी बदलावों से रक्षा करने के लिए सर्वोत्तम है।",
    scienceBacking: "Eugenol and ursolic acid in Tulsi show broad-spectrum antimicrobial and bronchodilator activity.",
    hindiScienceBacking: "तुलसी में मौजूद यूजीनॉल श्वास नलिकाओं को खोलता है और बैक्टीरिया से लड़ता है।",
    safeDosage: "5 to 10 drops of concentrated multi-tulsi oil in warm water.",
    cautions: "Consult physician if taking heavy anticoagulants.",
    relatedProductSlug: "neem-giloy-krishna-tulsi-drops"
  },
  {
    slug: "neem",
    name: "Neem",
    hindiName: "नीम",
    botanicalName: "Azadirachta indica",
    sanskritName: "अरिष्ट (Reliever of all sicknesses)",
    classicalSource: "Charaka Samhita Sutrasthana 27",
    rasa: "Tikta (Bitter), Kashaya (Astringent)",
    virya: "Sheeta (Cooling)",
    vipaka: "Katu (Pungent)",
    prabhava: "Krimighna & Kusthaghna (Destroys microbes & purifies dermal tissue)",
    overview: "Nature's premier systemic antiseptic and blood cleanser. Pacifies aggravated Pitta heat manifesting as pimples, boils, and skin redness.",
    hindiOverview: "प्राकृतिक रक्त शोधक जो त्वचा के रोगों, कील-मुंहासों और एलर्जी को अंदर से साफ करता है।",
    scienceBacking: "Nimbin and azadirachtin disrupt bacterial cell walls and reduce inflammatory cytokines.",
    hindiScienceBacking: "नीम के सक्रिय तत्व हानिकारक कीटाणुओं को नष्ट करते हैं और सूजन कम करते हैं।",
    safeDosage: "250mg to 500mg standardized extract after meals.",
    cautions: "Avoid long continuous intake exceeding 90 days without break.",
    relatedProductSlug: "neem-giloy-krishna-tulsi-drops"
  },
  {
    slug: "amla",
    name: "Amalaki (Amla)",
    hindiName: "आंवला",
    botanicalName: "Phyllanthus emblica",
    sanskritName: "धात्री (The Mother / Sustainer)",
    classicalSource: "Charaka Samhita Chikitsasthana 1-1",
    rasa: "Pancharasa (All five tastes except salty, predominantly sour)",
    virya: "Sheeta (Cooling)",
    vipaka: "Madhura (Sweet post-digestive cooling)",
    prabhava: "Vayasthapana (Arrests chronological biological aging)",
    overview: "Highest known natural concentration of heat-stable Vitamin C bound with bio-protective tannins. Nourishes skin, hair roots, eyes, and immune vitality.",
    hindiOverview: "प्रकृति का सबसे शक्तिशाली एंटीऑक्सीडेंट। यह आंखों की रोशनी, बालों की मजबूती और त्वचा की चमक बनाए रखता है।",
    scienceBacking: "Emblicanin A & B tannins shield Vitamin C from oxidative degradation, ensuring 95%+ bio-availability to human cells.",
    hindiScienceBacking: "एंब्लिकैनिन टैनिन विटामिन सी को नष्ट होने से बचाते हैं और शरीर में इसका पूरा अवशोषण सुनिश्चित करते हैं।",
    safeDosage: "1 to 2 tablespoons fresh juice or 1 teaspoon dry powder.",
    cautions: "Safe for all ages.",
    relatedProductSlug: "swarna-prash-amla-chyawanprash"
  },
  {
    slug: "brahmi",
    name: "Brahmi (Bacopa)",
    hindiName: "ब्राह्मी",
    botanicalName: "Bacopa monnieri",
    sanskritName: "ब्राह्मी (Bestowing the wisdom of Brahma)",
    classicalSource: "Charaka Samhita Sutrasthana 1",
    rasa: "Tikta (Bitter), Kashaya (Astringent)",
    virya: "Sheeta (Cooling)",
    vipaka: "Madhura (Sweet)",
    prabhava: "Medhya (Cognitive enhancer & mind calmative)",
    overview: "The primary Medhya Rasayana herb. Stimulates dendrite proliferation in nerve cells, quietens hyperactive mental chatter, and sharpens memory recall.",
    hindiOverview: "मस्तिष्क के न्यूरॉन्स को पुनर्जीवित करने वाली दिव्य बूटी। यह याददाश्त तेज करती है और मानसिक तनाव मिटाती है।",
    scienceBacking: "Bacosides A & B promote protein synthesis and nerve cell repair in the hippocampus.",
    hindiScienceBacking: "बैकोसाइड्स दिमाग के हिप्पोकैम्पस क्षेत्र में नई तंत्रिका कोशिकाओं के विकास में मदद करते हैं।",
    safeDosage: "300mg to 500mg standardized extract with milk or ghee.",
    cautions: "Do not consume on an empty stomach to prevent mild nausea.",
    relatedProductSlug: "brahmi-ashwagandha-calm-sleep"
  },
  {
    slug: "gudmar",
    name: "Gudmar",
    hindiName: "गुड़मार",
    botanicalName: "Gymnema sylvestre",
    sanskritName: "मधुनाशिनी (Destroyer of Sugar)",
    classicalSource: "Sushruta Samhita Chikitsasthana 11",
    rasa: "Kashaya (Astringent), Tikta (Bitter)",
    virya: "Ushna (Heating)",
    vipaka: "Katu (Pungent)",
    prabhava: "Pramehahara (Restores metabolic balance in sugar metabolism)",
    overview: "Chewing raw Gudmar leaves temporarily anesthetizes the sweet taste buds on the tongue, completely eliminating cravings for refined sugar.",
    hindiOverview: "चीनी की लत छुड़ाने और शरीर में इंसुलिन की कार्यक्षमता को बढ़ाने वाला प्राचीन आयुर्वेदिक फॉर्मूला।",
    scienceBacking: "Gymnemic acids fill receptor sites in the outer absorptive layer of the intestine, reducing glucose uptake into the bloodstream.",
    hindiScienceBacking: "जिमनेमिक एसिड आंतों में चीनी के अवशोषण को धीमा कर रक्त में शुगर स्पाइक को रोकता है।",
    safeDosage: "500mg standardized extract 30 minutes before heavy carbohydrate meals.",
    cautions: "Diabetic individuals using insulin should coordinate closely with their physician.",
    relatedProductSlug: "karela-jamun-sugar-support"
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "understanding-your-prakriti-ayurveda-guide",
    title: "Understanding Your Prakriti: The Classical Guide to Vata, Pitta, and Kapha",
    hindiTitle: "अपनी प्रकृति को समझें: वात, पित्त और कफ का शास्त्रीय रहस्य",
    excerpt: "Learn how ancient Vaidyas diagnosed individual biological types and how customizing your diet to your Dosha transforms energy and longevity.",
    hindiExcerpt: "जानिए आपकी जन्मजात शारीरिक प्रकृति क्या है और अपने दोष के अनुसार भोजन चुनकर कैसे सदैव निरोगी रहें।",
    category: "Ayurvedic Foundations",
    author: "Dr. Acharya Vidyadhar Sharma",
    reviewer: "Dr. Ananya R. Joshi",
    readTime: "6 min read",
    date: "October 18, 2024",
    coverImage: "/blog/prakriti-guide.jpg",
    content: "Ayurveda recognizes that no two human bodies are identical. What acts as medicine for an airy, dry Vata person may cause acidity in a fiery Pitta individual...",
    hindiContent: "आयुर्वेद का मूल सिद्धांत है कि हर मनुष्य की प्रकृति अनूठी होती है। जो भोजन वात प्रकृति के लिए अमृत है, वही पित्त प्रकृति के लिए एसिडिटी का कारण बन सकता है...",
    tags: ["Prakriti", "Dosha", "Dinacharya", "Gut Health"]
  },
  {
    slug: "ritucharya-seasonal-health-transitions",
    title: "Ritucharya: How to Shift Your Diet & Routine Across Indian Seasons",
    hindiTitle: "ऋतुचर्या: मौसम के बदलाव में बीमारियों से बचने के आयुर्वेदिक नियम",
    excerpt: "Why seasonal transitions (Ritusandhi) trigger 80% of infections, and the specific herbs to take during monsoon (Varsha) and winter (Hemanta).",
    hindiExcerpt: "मौसम बदलते ही खांसी-जुकाम और बुखार क्यों घेर लेते हैं? जानिए ऋतुसंधि में शरीर को सुरक्षित रखने के सरल उपाय।",
    category: "Ritucharya & Lifestyle",
    author: "Dr. B. K. Ramanathan",
    reviewer: "Dr. Acharya Vidyadhar Sharma",
    readTime: "8 min read",
    date: "October 10, 2024",
    coverImage: "/blog/ritucharya.jpg",
    content: "During Ritusandhi (the 14-day bridge between two seasons), the environmental elements change faster than the human digestive fire can adapt...",
    hindiContent: "जब एक मौसम समाप्त होकर दूसरा शुरू होता है (ऋतुसंधि), तब हमारी जठराग्नि कमजोर पड़ जाती है...",
    tags: ["Ritucharya", "Immunity", "Amla", "Giloy"]
  },
  {
    slug: "why-heavy-metals-occur-in-herbs-and-how-aaru-tests-every-batch",
    title: "The Science of Ayurvedic Purity: Why We Test Every Batch for Heavy Metals",
    hindiTitle: "आयुर्वेदिक शुद्धता का विज्ञान: हम हर बैच की हेवी मेटल जांच क्यों करते हैं?",
    excerpt: "An open, transparent look at soil absorption of lead and mercury, why unregulated local powders fail tests, and how AARU verifies 100% safety with NABL labs.",
    hindiExcerpt: "बाजार में मिलने वाले चूर्ण और भस्मों में लेड व पारे की मिलावट से कैसे बचें? जानिए आरु के लैब परीक्षण की पूरी प्रक्रिया।",
    category: "Quality & Science",
    author: "Quality Team at AARU Labs",
    reviewer: "Dr. Acharya Vidyadhar Sharma",
    readTime: "5 min read",
    date: "October 02, 2024",
    coverImage: "/blog/lab-testing.jpg",
    content: "Medicinal plants draw nutrients through their root systems. If cultivated near industrial runoff or untreated irrigation waters, herbs absorb lead, cadmium, and arsenic...",
    hindiContent: "औषधीय पौधे मिट्टी से पोषण लेते हैं। यदि उन्हें प्रदूषित जल या रसायनों वाले खेतों में उगाया जाए, तो वे हानिकारक तत्वों को सोख लेते हैं...",
    tags: ["Lab Testing", "NABL", "Safety", "Batch Verification"]
  }
];
