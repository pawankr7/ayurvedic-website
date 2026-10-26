<?php
/**
 * AARU AYURVEDA - Statutory Medical Disclaimer
 */
require_once dirname(__DIR__) . '/config/config.php';

$pageTitle = 'Statutory Medical Disclaimer | AARU Ayurveda';
$pageDescription = 'Official statutory disclaimer under the Drugs and Magic Remedies Act.';

require_once dirname(__DIR__) . '/includes/header.php';
?>

<div class="bg-[#FAF6EC] py-12 border-b border-[#E8DEC8]">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 class="text-3xl font-extrabold text-[#1F4D3A] font-serif-luxury">Statutory Medical Disclaimer</h1>
    <p class="text-xs text-[#7A6B5D] mt-1">Compliance with AYUSH Ministry regulations and Drugs and Magic Remedies (Objectionable Advertisements) Act.</p>
  </div>
</div>

<main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6 text-xs text-[#7A6B5D] leading-relaxed">
  <div class="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8DEC8] shadow-sm space-y-4">
    <h2 class="text-base font-bold text-[#1F4D3A]">1. General Health & Wellness Information</h2>
    <p>
      The products, educational articles, and statements displayed on this website have not been evaluated as a cure, diagnosis, or prevention for any specific chronic or life-threatening disease under the Drugs and Magic Remedies (Objectionable Advertisements) Act, 1954.
    </p>

    <h2 class="text-base font-bold text-[#1F4D3A]">2. Individual Prakriti Variation</h2>
    <p>
      Ayurveda recognizes that each individual possesses a unique bio-energetic constitution (Prakriti). Outcomes and timeline of efficacy can vary according to diet, metabolic fire (Agni), age, and lifestyle compliance.
    </p>

    <h2 class="text-base font-bold text-[#1F4D3A]">3. Mandatory Medical Advisory</h2>
    <p>
      Always consult a qualified Ayurvedic physician (Vaidya) or your primary healthcare provider before commencing any herbal regimen, particularly if you are pregnant, lactating, taking prescription blood thinners, or undergoing allopathic medical treatment.
    </p>
  </div>
</main>

<?php require_once dirname(__DIR__) . '/includes/footer.php'; ?>
