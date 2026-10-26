<?php
/**
 * AARU AYURVEDA - High Conversion Ad Landing Page: Joint Care
 */
require_once __DIR__ . '/config/config.php';
$db = getDB();

$stmt = $db->prepare("SELECT * FROM products WHERE slug = 'shallaki-guggul-joint-flex' LIMIT 1");
$stmt->execute();
$product = $stmt->fetch();

$pageTitle = 'Shallaki & Guggulu Joint Flexibility Formula | AARU Ayurveda';
$pageDescription = 'Relieve morning knee stiffness and back discomfort with standardized Boswellic acid and purified Shuddha Guggulu.';

require_once __DIR__ . '/includes/header.php';
?>

<div class="bg-gradient-to-b from-[#FAF6EC] to-[#F4EFE2] py-12 border-b border-[#E8DEC8]">
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      
      <div class="lg:col-span-7 space-y-4">
        <span class="bg-[#DDE5D6] text-[#1F4D3A] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          🦴 Classical Sandhivata Support
        </span>
        <h1 class="text-3xl sm:text-5xl font-extrabold text-[#1F4D3A] font-serif-luxury leading-tight">
          Walk, Climb & Move Without Knee & Back Stiffness.
        </h1>
        <p class="text-sm text-[#7A6B5D] leading-relaxed">
          Powered by 65% standardized Boswellic acids from Shallaki and Triphala-purified Guggulu to soothe localized inflammation and protect joint cartilage naturally.
        </p>

        <div class="pt-2 flex items-baseline space-x-3">
          <span class="text-3xl font-extrabold text-[#1F4D3A]"><?= formatPrice($product['price'] ?? 599) ?></span>
          <span class="text-base text-gray-400 line-through"><?= formatPrice($product['original_price'] ?? 799) ?></span>
          <span class="text-xs font-bold text-[#C8922B] bg-[#FAF0D9] px-2 py-0.5 rounded">Save 25%</span>
        </div>

        <div class="pt-2">
          <button onclick="addToCart('<?= $product['id'] ?? 'prod-005' ?>', 1, '<?= $product['default_batch'] ?? 'AARU-24-JT01' ?>')" class="btn-gold px-8 py-4 rounded-xl text-sm font-extrabold uppercase tracking-wider shadow-xl hover:scale-105 transition-all">
            Order Shallaki Guggulu — Free Delivery →
          </button>
        </div>
      </div>

      <div class="lg:col-span-5 bg-white rounded-3xl p-6 border border-[#E8DEC8] shadow-xl text-center space-y-4">
        <div class="text-7xl">🦴</div>
        <h3 class="font-bold text-lg text-[#1F4D3A] font-serif-luxury">NABL Batch #AARU-24-JT01</h3>
        <div class="text-xs space-y-1.5 text-left bg-[#FAF6EC] p-4 rounded-2xl border border-[#E8DEC8]">
          <p class="flex justify-between"><span>Boswellic Acid:</span><strong class="text-emerald-700">66.2% w/w (Pass)</strong></p>
          <p class="flex justify-between"><span>Heavy Metals:</span><strong class="text-emerald-700">0% Detected</strong></p>
          <p class="flex justify-between"><span>GMP Batch Status:</span><strong class="text-emerald-700">100% Passed</strong></p>
        </div>
        <a href="<?= url('verify-batch.php?batch=AARU-24-JT01') ?>" class="inline-block text-xs font-bold text-[#C8922B] hover:underline">
          View Complete Laboratory Report →
        </a>
      </div>

    </div>
  </div>
</div>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
