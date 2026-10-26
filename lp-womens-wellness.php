<?php
/**
 * AARU AYURVEDA - High Conversion Ad Landing Page: Women's Wellness
 */
require_once __DIR__ . '/config/config.php';
$db = getDB();

$stmt = $db->prepare("SELECT * FROM products WHERE slug = 'shatavari-pcod-hormone-balance' LIMIT 1");
$stmt->execute();
$product = $stmt->fetch();

$pageTitle = 'Shatavari Hormonal Balance & PCOD Support | AARU Ayurveda';
$pageDescription = 'Classical herbal nourishment for regular periods, uterine tone and calm hormonal transition.';

require_once __DIR__ . '/includes/header.php';
?>

<div class="bg-gradient-to-b from-[#FAF6EC] to-[#F4EFE2] py-12 border-b border-[#E8DEC8]">
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      
      <div class="lg:col-span-7 space-y-4">
        <span class="bg-[#FAF0D9] text-[#C8922B] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-[#E6CA8D]">
          🌸 Doctor Formulated Female Rasayana
        </span>
        <h1 class="text-3xl sm:text-5xl font-extrabold text-[#1F4D3A] font-serif-luxury leading-tight">
          Hormonal Harmony, Classical Purity & Vitality.
        </h1>
        <p class="text-sm text-[#7A6B5D] leading-relaxed">
          Formulated with wild-harvested Himalayan Shatavari, Ashoka bark, and Lodhra to support smooth menstrual cycles, soothe pelvic spasms, and promote emotional balance without synthetic steroids.
        </p>

        <div class="pt-2 flex items-baseline space-x-3">
          <span class="text-3xl font-extrabold text-[#1F4D3A]"><?= formatPrice($product['price'] ?? 549) ?></span>
          <span class="text-base text-gray-400 line-through"><?= formatPrice($product['original_price'] ?? 699) ?></span>
          <span class="text-xs font-bold text-[#C8922B] bg-[#FAF0D9] px-2 py-0.5 rounded">Save 21%</span>
        </div>

        <div class="pt-2">
          <button onclick="addToCart('<?= $product['id'] ?? 'prod-003' ?>', 1, '<?= $product['default_batch'] ?? 'AARU-24-SW01' ?>')" class="btn-gold px-8 py-4 rounded-xl text-sm font-extrabold uppercase tracking-wider shadow-xl hover:scale-105 transition-all">
            Order Shatavari Regimen — Free Shipping →
          </button>
        </div>
      </div>

      <div class="lg:col-span-5 bg-white rounded-3xl p-6 border border-[#E8DEC8] shadow-xl text-center space-y-4">
        <div class="text-7xl">🌸</div>
        <h3 class="font-bold text-lg text-[#1F4D3A] font-serif-luxury">NABL Batch #AARU-24-SW01</h3>
        <div class="text-xs space-y-1.5 text-left bg-[#FAF6EC] p-4 rounded-2xl border border-[#E8DEC8]">
          <p class="flex justify-between"><span>Lead (Pb):</span><strong class="text-emerald-700">0.31 ppm (Safe)</strong></p>
          <p class="flex justify-between"><span>Active Saponins:</span><strong class="text-emerald-700">22.4% w/w (High Potency)</strong></p>
          <p class="flex justify-between"><span>Pesticides:</span><strong class="text-emerald-700">Zero Detected</strong></p>
        </div>
        <a href="<?= url('verify-batch.php?batch=AARU-24-SW01') ?>" class="inline-block text-xs font-bold text-[#C8922B] hover:underline">
          View Complete Laboratory Report →
        </a>
      </div>

    </div>
  </div>
</div>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
