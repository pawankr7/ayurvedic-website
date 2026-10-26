<?php
/**
 * AARU AYURVEDA - Prakriti Quiz Calculator & Lead Capture API
 */

header('Content-Type: application/json; charset=utf-8');
require_once dirname(__DIR__) . '/config/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

$fullName = clean($_POST['name'] ?? '');
$phone = clean($_POST['phone'] ?? '');
$email = clean($_POST['email'] ?? '');
$concern = clean($_POST['concern'] ?? 'gut');
$answers = $_POST['answers'] ?? []; // array of dosha values: 'vata', 'pitta', 'kapha'

if (empty($fullName) || empty($phone)) {
    echo json_encode(['success' => false, 'error' => 'Name and WhatsApp number are required to generate your Ayurvedic profile']);
    exit;
}

$scores = ['vata' => 0, 'pitta' => 0, 'kapha' => 0];
if (is_array($answers)) {
    foreach ($answers as $ans) {
        $a = strtolower(trim($ans));
        if (isset($scores[$a])) {
            $scores[$a]++;
        }
    }
}

// Calculate dominant dosha
$maxScore = -1;
$dominant = 'Vata';
foreach ($scores as $d => $sc) {
    if ($sc > $maxScore) {
        $maxScore = $sc;
        $dominant = ucfirst($d);
    }
}

// Map concern to product slug
$concernMap = [
    'gut' => 'triphala-gut-detox',
    'sleep' => 'brahmi-ashwagandha-calm-sleep',
    'vitality' => 'shilajit-gold-stamina-resin',
    'women' => 'shatavari-pcod-hormone-balance',
    'joints' => 'shallaki-guggul-joint-flex',
    'rasayana' => 'swarna-prash-amla-chyawanprash'
];

$recSlugs = [];
if (isset($concernMap[$concern])) {
    $recSlugs[] = $concernMap[$concern];
}

if ($dominant === 'Vata') {
    $recSlugs[] = 'brahmi-ashwagandha-calm-sleep';
    $recSlugs[] = 'triphala-gut-detox';
} elseif ($dominant === 'Pitta') {
    $recSlugs[] = 'pure-kashmiri-kumkumadi-tailam';
    $recSlugs[] = 'shatavari-pcod-hormone-balance';
} else {
    $recSlugs[] = 'medohar-guggulu-metabolism';
    $recSlugs[] = 'neem-giloy-krishna-tulsi-drops';
}
$recSlugs = array_values(array_unique($recSlugs));

// Fetch recommended products from MySQL
$db = getDB();
$placeholders = implode(',', array_fill(0, count($recSlugs), '?'));
$stmt = $db->prepare("SELECT id, slug, name_en, name_hi, price, original_price, rating, default_batch, images_json FROM products WHERE slug IN ($placeholders) LIMIT 4");
$stmt->execute($recSlugs);
$recommendedProducts = $stmt->fetchAll();

// Insert lead into MySQL
try {
    $stmtLead = $db->prepare("INSERT INTO quiz_leads (full_name, phone, email, selected_concern, vata_score, pitta_score, kapha_score, primary_dosha, answers_json, recommended_products_json)
        VALUES (:full_name, :phone, :email, :selected_concern, :vata_score, :pitta_score, :kapha_score, :primary_dosha, :answers_json, :recommended_products_json)");
    $stmtLead->execute([
        ':full_name' => $fullName,
        ':phone' => $phone,
        ':email' => $email,
        ':selected_concern' => $concern,
        ':vata_score' => $scores['vata'],
        ':pitta_score' => $scores['pitta'],
        ':kapha_score' => $scores['kapha'],
        ':primary_dosha' => $dominant,
        ':answers_json' => json_encode($answers, JSON_UNESCAPED_UNICODE),
        ':recommended_products_json' => json_encode($recSlugs, JSON_UNESCAPED_UNICODE)
    ]);
} catch (Exception $e) {
    // Continue even if logging fails
}

// Descriptions
$descriptions = [
    'Vata' => [
        'en' => "Your constitution reflects the Air & Ether elements. You are naturally creative, quick-thinking, and dynamic, but when out of balance, you may experience gas, dryness, sleep restlessness, and anxiety. Warm, grounding nourishment restores your inner harmony.",
        'hi' => "आपकी प्रकृति में वायु और आकाश तत्व की प्रधानता है। आप स्वाभाविक रूप से उत्साही और त्वरित सोच वाले हैं। असंतुलन होने पर गैस, त्वचा का सूखापन, अनिद्रा और बेचैनी हो सकती है। गर्म, स्निग्ध और पौष्टिक आहार आपको संतुलन प्रदान करता है।"
    ],
    'Pitta' => [
        'en' => "Your constitution is governed by Fire & Water elements. You have sharp intelligence, strong digestion, and natural leadership. Under stress, excess internal heat can cause acidity, skin flare-ups, and irritability. Cooling, soothing herbs bring tranquility.",
        'hi' => "आपकी प्रकृति में अग्नि और जल तत्व प्रमुख हैं। आपका पाचन तीव्र, बुद्धि कुशाग्र और व्यक्तित्व प्रभावशाली है। गर्मी या तनाव से एसिडिटी, जलन और चिड़चिड़ापन बढ़ सकता है। शीतल और मधुर जड़ी-बूटियां आपको शांत रखती हैं।"
    ],
    'Kapha' => [
        'en' => "Your constitution is rooted in Earth & Water elements. You possess great endurance, calm emotional stability, and radiant vitality. When stagnant, you may feel heavy, sluggish, or experience slow metabolism. Warm, stimulating spices awaken your Agni.",
        'hi' => "आपकी प्रकृति पृथ्वी और जल तत्व से परिपूर्ण है। आप शांत, धैर्यवान और मजबूत रोग प्रतिरोधक क्षमता वाले हैं। सुस्ती या भारीपन आने पर चयापचय (मेटाबॉलिज्म) धीमा हो सकता है। तीखे और गर्म पाचक तत्व आपकी अग्नि को प्रदीप्त करते हैं।"
    ]
];

// Diet & Lifestyle
$dietTips = [
    'Vata' => [
        'en' => ["Enjoy warm, freshly cooked foods with A2 Bilona Ghee", "Sip ginger-cinnamon warm water", "Avoid iced cold drinks and dry raw salads"],
        'hi' => ["गरम, ताजा बना, घी युक्त सुपाच्य भोजन ग्रहण करें", "सोंठ और दालचीनी की गुनगुनी चाय पिएं", "कच्चा ठंडा सलाद और कोल्ड ड्रिंक से परहेज करें"]
    ],
    'Pitta' => [
        'en' => ["Favor sweet, bitter and cooling foods like melons and pomegranate", "Drink coriander-fennel infused water", "Limit deep fried and excessively pungent spicy dishes"],
        'hi' => ["शीतल, मधुर और तिक्त फल (अनार, खरबूजा) खाएं", "धनिया-सौंफ का ठंडा पानी घूंट-घूंट पिएं", "अत्यधिक मिर्च-मसालेदार और खट्टे अचार से बचें"]
    ],
    'Kapha' => [
        'en' => ["Favor light, dry and warm grains like millets, barley, and moong dal", "Start morning with warm water, half tsp raw honey and lemon", "Avoid heavy dairy and daytime sleep"],
        'hi' => ["जौ, बाजरा, मूंग की दाल और गर्म सब्जियों को प्राथमिकता दें", "सुबह गुनगुने पानी में शहद और नींबू मिलाकर पिएं", "मिठाई, भारी दूध-दही और दिन में सोने से बचें"]
    ]
];

echo json_encode([
    'success' => true,
    'dominant' => $dominant,
    'scores' => $scores,
    'description' => $descriptions[$dominant][CURRENT_LANG] ?? $descriptions[$dominant]['en'],
    'diet' => $dietTips[$dominant][CURRENT_LANG] ?? $dietTips[$dominant]['en'],
    'products' => $recommendedProducts
]);
