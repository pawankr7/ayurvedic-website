<?php
/**
 * AARU AYURVEDA - Our Story & Philosophy
 */
require_once __DIR__ . '/config/config.php';
$db = getDB();

$stmt = $db->query("SELECT * FROM doctors_vaidyas");
$doctors = $stmt->fetchAll();

$pageTitle = 'Our Story & Vedic Philosophy | AARU Ayurveda';
$pageDescription = 'Learn how AARU was founded to restore radical scientific transparency to classical Ayurvedic medicine.';

require_once __DIR__ . '/includes/header.php';
?>

<div class="bg-[#FAF6EC] py-14 border-b border-[#E8DEC8]">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
    <span class="inline-block bg-[#DDE5D6] text-[#1F4D3A] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
      🌿 Our Story & Mission
    </span>
    <h1 class="text-3xl sm:text-5xl font-extrabold text-[#1F4D3A] font-serif-luxury">
      <?= CURRENT_LANG === 'hi' ? 'आरु की उत्पत्ति: वेद-सम्मत, विज्ञान-प्रमाणित' : 'Rooted in Ayurveda. Verified by Science.' ?>
    </h1>
    <p class="text-sm sm:text-base text-[#7A6B5D] max-w-2xl mx-auto leading-relaxed">
      We created AARU with a single unwavering promise: to banish contaminated, unstandardized herbal powders and replace them with authentic classical formulations backed by open, verifiable NABL laboratory audits.
    </p>
  </div>
</div>

<main class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
  
  <!-- 3 Pillars of Transparency -->
  <section class="grid grid-cols-1 md:grid-cols-3 gap-8">
    <div class="bg-white rounded-3xl p-6 border border-[#E8DEC8] space-y-3 shadow-sm">
      <div class="text-3xl text-[#1F4D3A]">📜</div>
      <h3 class="font-bold text-base text-[#1F4D3A] font-serif-luxury">1. Samhita Authenticity</h3>
      <p class="text-xs text-[#7A6B5D] leading-relaxed">
        We do not invent arbitrary fads. Every formula adheres strictly to classical texts like Charaka Samhita, Sushruta Samhita, and Sharangadhara Samhita.
      </p>
    </div>

    <div class="bg-white rounded-3xl p-6 border border-[#E8DEC8] space-y-3 shadow-sm">
      <div class="text-3xl text-[#C8922B]">🔬</div>
      <h3 class="font-bold text-base text-[#1F4D3A] font-serif-luxury">2. Open NABL Testing</h3>
      <p class="text-xs text-[#7A6B5D] leading-relaxed">
        Every batch undergoes ICP-MS heavy metal screening and active compound assays at independent ISO/IEC 17025 accredited analytical facilities.
      </p>
    </div>

    <div class="bg-white rounded-3xl p-6 border border-[#E8DEC8] space-y-3 shadow-sm">
      <div class="text-3xl text-[#1F4D3A]">🌱</div>
      <h3 class="font-bold text-base text-[#1F4D3A] font-serif-luxury">3. Ethical Wild Harvesting</h3>
      <p class="text-xs text-[#7A6B5D] leading-relaxed">
        Our botanicals are responsibly hand-collected from their natural high-altitude geographic origin — Pratapgarh Amla, Western Ghats Haritaki, and 18,000 ft Himalayan Shilajit.
      </p>
    </div>
  </section>

  <!-- Doctor Panel -->
  <section class="space-y-8">
    <div class="text-center max-w-2xl mx-auto space-y-2">
      <span class="text-xs font-bold text-[#C8922B] uppercase tracking-wider">Clinical Integrity</span>
      <h2 class="text-3xl font-extrabold text-[#1F4D3A] font-serif-luxury">Our Vaidya Advisory Council</h2>
      <p class="text-xs text-[#7A6B5D]">Governed by scholars with over 50+ combined years of classical Ayurvedic healing.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <?php foreach ($doctors as $d): ?>
        <div class="bg-white rounded-2xl p-6 border border-[#E8DEC8] text-center space-y-3 shadow-sm">
          <div class="w-20 h-20 mx-auto rounded-full bg-[#FAF6EC] border border-[#C8922B] flex items-center justify-center text-3xl">
            👨‍⚕️
          </div>
          <h3 class="font-bold text-base text-[#1F4D3A] font-serif-luxury"><?= htmlspecialchars($d['name']) ?></h3>
          <span class="text-xs font-semibold text-[#C8922B] block"><?= htmlspecialchars($d['qualification']) ?></span>
          <p class="text-xs text-[#7A6B5D] leading-relaxed"><?= htmlspecialchars($d['bio']) ?></p>
        </div>
      <?php endforeach; ?>
    </div>
  </section>

</main>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
