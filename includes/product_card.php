<?php
/**
 * AARU AYURVEDA - Reusable Product Card Component
 * Expects $p to be an associative array of a product row
 */
if (!isset($p)) return;

$pImages = json_decode($p['images_json'] ?? '[]', true);
$heroImg = !empty($pImages[0]) ? $pImages[0] : '';
$ingredients = json_decode($p['ingredients_json'] ?? '[]', true);
$ingSnippet = !empty($ingredients[0]['name']) ? $ingredients[0]['name'] : '';
if (!empty($ingredients[1]['name'])) $ingSnippet .= ' + ' . $ingredients[1]['name'];

$discount = (int)($p['discount_pct'] ?? 0);
$rating = (float)($p['rating'] ?? 4.8);
$reviews = (int)($p['reviews_count'] ?? 100);
$batch = $p['default_batch'] ?? 'AARU-STD';
?>
<div class="botanical-card bg-[#FAF6EC] border border-[#E8DEC8] rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-[#1F4D3A]/40 group">
  
  <div>
    <!-- Top Image Container -->
    <div class="relative bg-[#F4EFE2] aspect-[4/3] flex items-center justify-center p-4 overflow-hidden border-b border-[#E8DEC8]">
      
      <!-- Badges -->
      <div class="absolute top-3 left-3 flex flex-col gap-1 z-10">
        <?php if (!empty($p['is_bestseller'])): ?>
          <span class="badge-gold text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
            ★ Bestseller
          </span>
        <?php endif; ?>
        <?php if (!empty($p['certified'])): ?>
          <span class="bg-[#1F4D3A] text-white text-[9px] font-semibold px-2 py-0.5 rounded-full flex items-center space-x-1">
            <span>✓</span>
            <span><?= htmlspecialchars($p['certificate_type'] ?? 'AYUSH') ?></span>
          </span>
        <?php endif; ?>
      </div>

      <!-- Discount Tag -->
      <?php if ($discount > 0): ?>
        <div class="absolute top-3 right-3 bg-[#C8922B] text-white text-[11px] font-bold px-2 py-0.5 rounded-lg shadow-sm">
          <?= $discount ?>% OFF
        </div>
      <?php endif; ?>

      <!-- Product Visual / Illustration -->
      <a href="<?= url('product.php?slug=' . urlencode($p['slug'])) ?>" class="w-full h-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
        <?php if (!empty($heroImg)): ?>
          <img src="<?= htmlspecialchars($heroImg) ?>" alt="<?= htmlspecialchars(_f($p, 'name')) ?>" class="max-h-full max-w-full object-contain drop-shadow" onerror="this.onerror=null;this.parentNode.innerHTML='<div class=\'text-5xl text-[#1F4D3A]\'>🌿</div>';">
        <?php else: ?>
          <div class="w-20 h-20 rounded-full bg-[#E8DEC8] flex items-center justify-center text-4xl text-[#1F4D3A]">
            🌿
          </div>
        <?php endif; ?>
      </a>

      <!-- Quick Verify Batch Overlay Tag -->
      <a href="<?= url('verify-batch.php?batch=' . urlencode($batch)) ?>" class="absolute bottom-2 left-3 right-3 bg-white/90 backdrop-blur-sm border border-[#1F4D3A]/20 rounded-md py-1 px-2 text-[10px] text-[#1F4D3A] font-medium flex items-center justify-between hover:bg-white transition-colors" title="View NABL ISO 17025 Test Report">
        <span class="flex items-center space-x-1">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span>NABL Lab Batch: <strong class="font-mono"><?= htmlspecialchars($batch) ?></strong></span>
        </span>
        <span class="text-[#C8922B] font-bold">CoA →</span>
      </a>
    </div>

    <!-- Details Body -->
    <div class="p-4 space-y-2">
      <!-- Ratings & Reviews -->
      <div class="flex items-center space-x-2 text-xs">
        <div class="flex items-center text-[#C8922B]">
          ★ <span class="font-bold ml-1 text-[#3B2F25]"><?= number_format($rating, 1) ?></span>
        </div>
        <span class="text-[#7A6B5D]">(<?= $reviews ?> verified reviews)</span>
      </div>

      <!-- Title -->
      <h3 class="font-bold text-base text-[#1F4D3A] hover:text-[#C8922B] transition-colors line-clamp-1 font-serif-luxury">
        <a href="<?= url('product.php?slug=' . urlencode($p['slug'])) ?>">
          <?= htmlspecialchars(_f($p, 'name')) ?>
        </a>
      </h3>

      <!-- Subtitle / Herb snippet -->
      <p class="text-xs text-[#7A6B5D] line-clamp-2 leading-relaxed">
        <?= htmlspecialchars(_f($p, 'subtitle') ?: _f($p, 'description')) ?>
      </p>

      <?php if (!empty($ingSnippet)): ?>
        <div class="pt-1 flex items-center space-x-1 text-[11px] text-[#2C684E] font-medium">
          <span>🌱</span>
          <span class="truncate"><?= htmlspecialchars($ingSnippet) ?></span>
        </div>
      <?php endif; ?>
    </div>
  </div>

  <!-- Bottom Pricing & Action -->
  <div class="p-4 pt-0 border-t border-[#E8DEC8]/60 mt-2">
    <div class="flex items-baseline space-x-2 mb-3 pt-2">
      <span class="text-lg font-bold text-[#1F4D3A]"><?= formatPrice($p['price']) ?></span>
      <?php if ((float)$p['original_price'] > (float)$p['price']): ?>
        <span class="text-xs text-gray-400 line-through"><?= formatPrice($p['original_price']) ?></span>
      <?php endif; ?>
      <span class="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-semibold ml-auto">Free Delivery on ₹599+</span>
    </div>

    <button onclick="addToCart('<?= $p['id'] ?>', 1, '<?= $batch ?>')" class="w-full btn-forest py-2.5 rounded-xl text-xs uppercase tracking-wider font-bold flex items-center justify-center space-x-2 shadow-sm hover:shadow-md">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
      <span><?= CURRENT_LANG === 'hi' ? 'थैली में डालें' : 'Add to Regimen' ?></span>
    </button>
  </div>

</div>
