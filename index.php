<?php
/**
 * AARU AYURVEDA - Homepage
 * Rooted in Ayurveda. Verified by Science.
 */
require_once __DIR__ . '/config/config.php';
$db = getDB();

$pageTitle = CURRENT_LANG === 'hi' 
  ? 'आरु (AARU) - वेद-सम्मत। विज्ञान-प्रमाणित। शुद्ध आयुर्वेदिक औषधियां'
  : 'AARU Ayurveda - Rooted in Ayurveda. Verified by Science. 100% NABL Tested';

// Fetch Bestsellers
$stmtBest = $db->query("SELECT * FROM products WHERE is_bestseller = 1 LIMIT 8");
$bestsellers = $stmtBest->fetchAll();

// Fetch Categories
$stmtCats = $db->query("SELECT * FROM categories ORDER BY display_order ASC LIMIT 8");
$categories = $stmtCats->fetchAll();

// Fetch Vaidyas
$stmtDocs = $db->query("SELECT * FROM doctors_vaidyas LIMIT 3");
$doctors = $stmtDocs->fetchAll();

require_once __DIR__ . '/includes/header.php';
?>

<!-- Hero Section -->
<section class="relative bg-gradient-to-b from-[#FAF6EC] via-[#F4EFE2] to-[#FAF6EC] pt-12 pb-20 border-b border-[#E8DEC8] overflow-hidden">
  <!-- Subtle decorative Vedic mandala backdrop -->
  <div class="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-[#C8922B]/5 blur-3xl pointer-events-none"></div>
  <div class="absolute -left-20 top-40 w-96 h-96 rounded-full bg-[#1F4D3A]/5 blur-3xl pointer-events-none"></div>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      
      <!-- Left Copy Column -->
      <div class="lg:col-span-7 space-y-6 text-center lg:text-left">
        
        <!-- Eyebrow Tag -->
        <div class="inline-flex items-center space-x-2 bg-[#DDE5D6] text-[#1F4D3A] px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase shadow-sm">
          <span class="w-2 h-2 rounded-full bg-[#1F4D3A]"></span>
          <span>100% NABL Lab Tested • Zero Toxic Heavy Metals</span>
        </div>

        <!-- Main Headline -->
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1F4D3A] tracking-tight leading-[1.15] font-serif-luxury">
          <?= CURRENT_LANG === 'hi' 
            ? 'आयुर्वेद, अब <span class="text-[#C8922B]">प्रमाण</span> के साथ।' 
            : 'Authentic Ayurveda, <br>Now <span class="text-[#C8922B]">Openly Proven</span>.' ?>
        </h1>

        <!-- Subheading -->
        <p class="text-base sm:text-lg text-[#7A6B5D] max-w-2xl leading-relaxed">
          <?= CURRENT_LANG === 'hi'
            ? 'पारंपरिक संहिताओं पर आधारित शुद्ध रसायन। हम हर निर्माण बैच की स्वतंत्र NABL लैब रिपोर्ट सार्वजनिक करते हैं ताकि आपको मिले 100% शुद्ध और सुरक्षित स्वास्थ्य।'
            : 'Never wonder what is inside your Ayurvedic supplements. Scan any batch QR code to inspect complete third-party NABL ISO/IEC 17025 lab reports for heavy metals, microbial purity, and active botanical assays.' ?>
        </p>

        <!-- CTA Buttons -->
        <div class="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
          <a href="<?= url('prakriti-quiz.php') ?>" class="w-full sm:w-auto btn-gold px-8 py-4 rounded-xl text-sm font-bold tracking-wide shadow-lg flex items-center justify-center space-x-2">
            <span>✨</span>
            <span><?= CURRENT_LANG === 'hi' ? 'अपनी प्रकृति जानें (2-मिनट क्विज़)' : 'Find Your Regimen (2-Min Quiz)' ?></span>
          </a>
          <a href="<?= url('shop.php') ?>" class="w-full sm:w-auto btn-forest px-8 py-4 rounded-xl text-sm font-bold tracking-wide shadow-lg flex items-center justify-center space-x-2">
            <span>🌿</span>
            <span><?= CURRENT_LANG === 'hi' ? 'सभी औषधियां देखें' : 'Explore Proven Formulations' ?></span>
          </a>
        </div>

        <!-- Quick Batch Verification Search Bar -->
        <div class="pt-4 max-w-md mx-auto lg:mx-0">
          <div class="bg-white p-2 rounded-2xl border border-[#D5C7B0] shadow-sm flex items-center space-x-2">
            <span class="text-xs font-mono font-bold text-[#1F4D3A] pl-3">Batch#</span>
            <input type="text" id="quick-batch-input" placeholder="e.g. AARU-24-GT01 or AARU-24-SH02" class="w-full text-xs py-2 bg-transparent focus:outline-none uppercase font-mono tracking-wider text-[#1F4D3A]">
            <button onclick="window.location.href='<?= url('verify-batch.php') ?>?batch=' + encodeURIComponent(document.getElementById('quick-batch-input').value.trim())" class="btn-forest px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap">
              Verify CoA
            </button>
          </div>
          <p class="text-[11px] text-[#7A6B5D] mt-1.5 pl-2">
            Try verifying: <a href="<?= url('verify-batch.php?batch=AARU-24-GT01') ?>" class="underline text-[#C8922B] font-mono">AARU-24-GT01</a> or <a href="<?= url('verify-batch.php?batch=AARU-24-SH02') ?>" class="underline text-[#C8922B] font-mono">AARU-24-SH02</a>
          </p>
        </div>

      </div>

      <!-- Right Visual Column / Hero Feature Card -->
      <div class="lg:col-span-5">
        <div class="relative bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DEC8] shadow-2xl space-y-6">
          
          <div class="flex items-center justify-between border-b border-[#E8DEC8] pb-4">
            <div>
              <span class="text-[11px] font-bold text-[#C8922B] uppercase tracking-wider">Independent Lab Audit</span>
              <h3 class="font-bold text-lg text-[#1F4D3A] font-serif-luxury">NABL Certificate #TC-8192</h3>
            </div>
            <span class="bg-emerald-100 text-emerald-800 font-bold text-xs px-2.5 py-1 rounded-full flex items-center space-x-1">
              <span>✓</span>
              <span>100% PASSED</span>
            </span>
          </div>

          <!-- Heavy Metal Safety Table -->
          <div class="space-y-3">
            <div class="text-xs font-bold text-[#3B2F25] flex justify-between">
              <span>Heavy Metal Parameter</span>
              <span>WHO / AYUSH Limit</span>
              <span>AARU Tested</span>
            </div>
            <div class="space-y-2 text-xs divide-y divide-gray-100">
              <div class="flex justify-between items-center pt-2">
                <span class="font-medium text-[#7A6B5D]">Lead (Pb)</span>
                <span class="text-gray-400">Max 10.0 ppm</span>
                <span class="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">0.28 ppm (Safe)</span>
              </div>
              <div class="flex justify-between items-center pt-2">
                <span class="font-medium text-[#7A6B5D]">Mercury (Hg)</span>
                <span class="text-gray-400">Max 1.0 ppm</span>
                <span class="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">&lt; 0.01 ppm</span>
              </div>
              <div class="flex justify-between items-center pt-2">
                <span class="font-medium text-[#7A6B5D]">Arsenic (As)</span>
                <span class="text-gray-400">Max 3.0 ppm</span>
                <span class="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">0.12 ppm</span>
              </div>
              <div class="flex justify-between items-center pt-2">
                <span class="font-medium text-[#7A6B5D]">Cadmium (Cd)</span>
                <span class="text-gray-400">Max 0.3 ppm</span>
                <span class="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">0.04 ppm</span>
              </div>
            </div>
          </div>

          <!-- Featured Product Teaser in Box -->
          <div class="bg-[#FAF6EC] rounded-2xl p-4 border border-[#E8DEC8] flex items-center space-x-4">
            <div class="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-2xl border border-[#E8DEC8] flex-shrink-0">
              🍯
            </div>
            <div class="flex-1 min-w-0">
              <span class="text-[10px] text-[#C8922B] font-bold uppercase tracking-wider">Batch AARU-24-SH02</span>
              <h4 class="font-bold text-sm text-[#1F4D3A] truncate">Himalayan Shilajit Gold Resin</h4>
              <p class="text-xs text-[#7A6B5D]">68.4% Fulvic Acid • 24K Swarna Bhasma</p>
            </div>
            <a href="<?= url('verify-batch.php?batch=AARU-24-SH02') ?>" class="btn-gold p-2 rounded-lg text-xs" title="View Full Report">
              →
            </a>
          </div>

          <p class="text-[11px] text-center text-[#7A6B5D]">
            🛡️ Tested at ISO/IEC 17025 accredited analytical facility.
          </p>

        </div>
      </div>

    </div>
  </div>
</section>

<!-- Concern-Based Categories -->
<section class="py-16 bg-[#FAF6EC]">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col md:flex-row justify-between items-end mb-10">
      <div>
        <span class="text-xs font-bold text-[#C8922B] uppercase tracking-wider">Classical Vedic Formulations</span>
        <h2 class="text-3xl font-extrabold text-[#1F4D3A] font-serif-luxury mt-1">
          <?= CURRENT_LANG === 'hi' ? 'स्वास्थ्य चिंताओं के अनुसार चुनें' : 'Shop by Health Concern' ?>
        </h2>
        <p class="text-sm text-[#7A6B5D] mt-1">Formulated in exact Charaka & Sushruta Samhita proportions.</p>
      </div>
      <a href="<?= url('shop.php') ?>" class="mt-4 md:mt-0 text-sm font-bold text-[#1F4D3A] hover:text-[#C8922B] flex items-center space-x-1">
        <span>View all 12 Categories</span>
        <span>→</span>
      </a>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      <?php 
      $icons = [
        'gut-digestion' => '🌾',
        'womens-wellness' => '🌸',
        'mens-vitality' => '⚡',
        'metabolic-balance' => '⚖️',
        'joint-bone' => '🦴',
        'sleep-mind' => '🌙',
        'daily-rasayana' => '🍯',
        'classical-medicines' => '📜'
      ];
      foreach ($categories as $cat): 
        $catIcon = $icons[$cat['slug']] ?? '🌿';
      ?>
        <a href="<?= url('shop.php?category=' . urlencode($cat['slug'])) ?>" class="botanical-card bg-[#F4EFE2] border border-[#E8DEC8] rounded-2xl p-5 flex flex-col justify-between hover:bg-white hover:border-[#C8922B]/40 transition-all group">
          <div>
            <div class="w-12 h-12 rounded-xl bg-white border border-[#E8DEC8] flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
              <?= $catIcon ?>
            </div>
            <?php if (!empty($cat['badge'])): ?>
              <span class="text-[9px] font-bold text-[#C8922B] bg-[#FAF0D9] px-2 py-0.5 rounded-full inline-block mb-1">
                <?= htmlspecialchars($cat['badge']) ?>
              </span>
            <?php endif; ?>
            <h3 class="font-bold text-sm sm:text-base text-[#1F4D3A] group-hover:text-[#C8922B] transition-colors font-serif-luxury">
              <?= htmlspecialchars(_f($cat, 'name')) ?>
            </h3>
            <p class="text-xs text-[#7A6B5D] line-clamp-2 mt-1 leading-relaxed">
              <?= htmlspecialchars(_f($cat, 'description')) ?>
            </p>
          </div>
          <span class="mt-4 text-xs font-bold text-[#1F4D3A] flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
            <span>Explore</span>
            <span>→</span>
          </span>
        </a>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- Bestsellers Section -->
<section class="py-16 bg-[#F4EFE2] border-t border-b border-[#E8DEC8]">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col md:flex-row justify-between items-end mb-10">
      <div>
        <span class="text-xs font-bold text-[#C8922B] uppercase tracking-wider">Top Formulations</span>
        <h2 class="text-3xl font-extrabold text-[#1F4D3A] font-serif-luxury mt-1">
          <?= CURRENT_LANG === 'hi' ? 'सर्वाधिक लोकप्रिय एवं प्रामाणिक योग' : 'Proven Ayurvedic Bestsellers' ?>
        </h2>
        <p class="text-sm text-[#7A6B5D] mt-1">Lab-verified purity, 100% AYUSH compliant, backed by thousands of reviews.</p>
      </div>
      <a href="<?= url('shop.php') ?>" class="mt-4 md:mt-0 text-sm font-bold text-[#1F4D3A] hover:text-[#C8922B] flex items-center space-x-1">
        <span>Browse full apothecary</span>
        <span>→</span>
      </a>
    </div>

    <!-- Product Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <?php foreach ($bestsellers as $p): ?>
        <?php require __DIR__ . '/includes/product_card.php'; ?>
      <?php endforeach; ?>
    </div>

  </div>
</section>

<!-- Interactive Prakriti Quiz Promo Banner -->
<section class="py-16 bg-[#1F4D3A] text-white relative overflow-hidden">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      
      <div class="lg:col-span-8 space-y-4 text-center lg:text-left">
        <span class="text-xs font-bold text-[#C8922B] tracking-wider uppercase bg-[#143527] px-3 py-1 rounded-full inline-block">
          Ancient Diagnostic Tool
        </span>
        <h2 class="text-3xl sm:text-4xl font-extrabold font-serif-luxury leading-tight">
          <?= CURRENT_LANG === 'hi' ? 'अपनी जन्मजात प्रकृति को पहचानें: वात, पित्त या कफ?' : 'Discover Your Inherent Prakriti: Vata, Pitta or Kapha?' ?>
        </h2>
        <p class="text-sm sm:text-base text-[#DDE5D6] max-w-2xl leading-relaxed">
          In Ayurveda, one person’s nectar is another’s poison. Take our 2-minute diagnostic assessment based on Charaka Samhita to uncover your unique Dosha balance, customized diet guidelines (Pathya), and targeted herbal regimens.
        </p>
        <div class="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-[#DDE5D6]">
          <span class="flex items-center space-x-1"><span>✓</span><span>6 Quick Diagnostic Traits</span></span>
          <span class="flex items-center space-x-1"><span>✓</span><span>Instant Ayurvedic Diet Chart</span></span>
          <span class="flex items-center space-x-1"><span>✓</span><span>Daily Dinacharya Routine</span></span>
        </div>
      </div>

      <div class="lg:col-span-4 text-center">
        <a href="<?= url('prakriti-quiz.php') ?>" class="inline-block btn-gold px-10 py-5 rounded-2xl text-base font-extrabold tracking-wide shadow-2xl hover:scale-105 transition-all">
          ✨ Take Free Prakriti Quiz →
        </a>
        <p class="text-[11px] text-[#DDE5D6]/80 mt-3">Over 48,000+ individuals assessed this month.</p>
      </div>

    </div>
  </div>
</section>

<!-- Vaidya Advisory Board / Doctor Panel -->
<section class="py-16 bg-[#FAF6EC]">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center max-w-3xl mx-auto mb-12">
      <span class="text-xs font-bold text-[#C8922B] uppercase tracking-wider">Clinical Guidance</span>
      <h2 class="text-3xl font-extrabold text-[#1F4D3A] font-serif-luxury mt-1">
        <?= CURRENT_LANG === 'hi' ? 'हमारे मुख्य आयुर्वेदिक वैद्य एवं विशेषज्ञ' : 'Formulated by Senior Vaidyas & Researchers' ?>
      </h2>
      <p class="text-sm text-[#7A6B5D] mt-2">Every formulation is vetted by classical scholars holding BAMS and MD (Ayurveda) degrees.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <?php foreach ($doctors as $doc): ?>
        <div class="bg-white border border-[#E8DEC8] rounded-2xl p-6 text-center space-y-4 shadow-sm hover:shadow-md transition-shadow">
          <div class="w-24 h-24 mx-auto rounded-full bg-[#F4EFE2] border-2 border-[#C8922B] flex items-center justify-center text-4xl overflow-hidden">
            👨‍⚕️
          </div>
          <div>
            <h3 class="font-bold text-lg text-[#1F4D3A] font-serif-luxury"><?= htmlspecialchars($doc['name']) ?></h3>
            <span class="text-xs font-semibold text-[#C8922B] block"><?= htmlspecialchars($doc['qualification']) ?></span>
            <span class="text-[11px] text-[#7A6B5D]"><?= (int)$doc['experience_years'] ?>+ Years of Clinical Practice</span>
          </div>
          <p class="text-xs text-[#7A6B5D] leading-relaxed line-clamp-3">
            <?= htmlspecialchars($doc['bio']) ?>
          </p>
          <a href="<?= url('contact.php') ?>" class="inline-block text-xs font-bold text-[#1F4D3A] hover:text-[#C8922B] pt-2">
            Book Consultation →
          </a>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
