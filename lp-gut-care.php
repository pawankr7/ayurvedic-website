<?php
/**
 * AARU AYURVEDA - High Conversion Ad Landing Page: Gut & Digestion Care
 */
require_once __DIR__ . '/config/config.php';
$db = getDB();

$stmt = $db->prepare("SELECT * FROM products WHERE slug = 'triphala-gut-detox' LIMIT 1");
$stmt->execute();
$product = $stmt->fetch();

$pageTitle = 'Classical Triphala Colon & Agni Detox | AARU Ayurveda';
$pageDescription = 'Restore natural overnight bowel regularity without dependency. 100% NABL lab tested with zero toxic heavy metals.';

require_once __DIR__ . '/includes/header.php';
?>

<div class="bg-gradient-to-b from-[#FAF6EC] to-[#F4EFE2] py-12 border-b border-[#E8DEC8]">
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      
      <div class="lg:col-span-7 space-y-4">
        <span class="bg-[#DDE5D6] text-[#1F4D3A] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          ★ India’s Most Transparent Gut Cleanse
        </span>
        <h1 class="text-3xl sm:text-5xl font-extrabold text-[#1F4D3A] font-serif-luxury leading-tight">
          Wake Up Light, Clean & Energized Every Morning.
        </h1>
        <p class="text-sm text-[#7A6B5D] leading-relaxed">
          Traditional 1:2:4 ratio of Haritaki, Bibhitaki, and Amalaki. Gently eliminates metabolic toxins (Ama) and gas without cramps, diarrhea, or habitual dependency.
        </p>

        <div class="pt-2 flex items-baseline space-x-3">
          <span class="text-3xl font-extrabold text-[#1F4D3A]"><?= formatPrice($product['price'] ?? 449) ?></span>
          <span class="text-base text-gray-400 line-through"><?= formatPrice($product['original_price'] ?? 599) ?></span>
          <span class="text-xs font-bold text-[#C8922B] bg-[#FAF0D9] px-2 py-0.5 rounded">25% OFF</span>
        </div>

        <div class="pt-2">
          <button onclick="addToCart('<?= $product['id'] ?? 'prod-001' ?>', 1, '<?= $product['default_batch'] ?? 'AARU-24-GT01' ?>')" class="btn-gold px-8 py-4 rounded-xl text-sm font-extrabold uppercase tracking-wider shadow-xl hover:scale-105 transition-all">
            Order Triphala Now — Free Express Delivery →
          </button>
        </div>
      </div>

      <div class="lg:col-span-5 bg-white rounded-3xl p-6 border border-[#E8DEC8] shadow-xl text-center space-y-4">
        <div class="text-7xl">🌾</div>
        <h3 class="font-bold text-lg text-[#1F4D3A] font-serif-luxury">NABL Batch #AARU-24-GT01</h3>
        <div class="text-xs space-y-1.5 text-left bg-[#FAF6EC] p-4 rounded-2xl border border-[#E8DEC8]">
          <p class="flex justify-between"><span>Lead (Pb):</span><strong class="text-emerald-700">0.28 ppm (Pass)</strong></p>
          <p class="flex justify-between"><span>Mercury (Hg):</span><strong class="text-emerald-700">&lt; 0.01 ppm (Pass)</strong></p>
          <p class="flex justify-between"><span>E. Coli:</span><strong class="text-emerald-700">Absent in 1g (Pass)</strong></p>
        </div>
        <a href="<?= url('verify-batch.php?batch=AARU-24-GT01') ?>" class="inline-block text-xs font-bold text-[#C8922B] hover:underline">
          View Complete Laboratory Report →
        </a>
      </div>

    </div>
  </div>
</div>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
