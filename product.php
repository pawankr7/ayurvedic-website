<?php
/**
 * AARU AYURVEDA - Product Details Page
 */
require_once __DIR__ . '/config/config.php';
$db = getDB();

$slug = clean($_GET['slug'] ?? '');
if (empty($slug)) {
    header("Location: " . url('shop.php'));
    exit;
}

$stmt = $db->prepare("SELECT * FROM products WHERE slug = :slug OR id = :id LIMIT 1");
$stmt->execute([':slug' => $slug, ':id' => $slug]);
$product = $stmt->fetch();

if (!$product) {
    header("Location: " . url('shop.php'));
    exit;
}

$images = json_decode($product['images_json'] ?? '[]', true);
$benefits = json_decode($product['benefits_json'] ?? '[]', true);
$hindiBenefits = json_decode($product['hindi_benefits_json'] ?? '[]', true);
$ingredients = json_decode($product['ingredients_json'] ?? '[]', true);
$availableBatches = json_decode($product['available_batches_json'] ?? '[]', true);
$currentBatch = $product['default_batch'] ?: (!empty($availableBatches[0]) ? $availableBatches[0] : 'AARU-STD');

// Fetch Batch Details if available
$stmtBatch = $db->prepare("SELECT * FROM batches WHERE batch_number = :batch LIMIT 1");
$stmtBatch->execute([':batch' => $currentBatch]);
$batchInfo = $stmtBatch->fetch();
$heavyMetals = json_decode($batchInfo['heavy_metals_json'] ?? '{}', true);

// Fetch Related Products
$stmtRel = $db->prepare("SELECT * FROM products WHERE category_id = :cat AND id != :id LIMIT 4");
$stmtRel->execute([':cat' => $product['category_id'], ':id' => $product['id']]);
$related = $stmtRel->fetchAll();

$pageTitle = _f($product, 'name') . ' - 100% NABL Lab Tested | AARU Ayurveda';
$pageDescription = _f($product, 'subtitle') ?: _f($product, 'description');

require_once __DIR__ . '/includes/header.php';
?>

<div class="bg-[#FAF6EC] py-6 border-b border-[#E8DEC8]">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Breadcrumb -->
    <nav class="text-xs text-[#7A6B5D] flex items-center space-x-2">
      <a href="<?= url('index.php') ?>" class="hover:underline">Home</a>
      <span>/</span>
      <a href="<?= url('shop.php') ?>" class="hover:underline">Apothecary</a>
      <span>/</span>
      <a href="<?= url('shop.php?category=' . urlencode($product['category_id'])) ?>" class="hover:underline capitalize"><?= htmlspecialchars(str_replace('-', ' ', $product['category_id'])) ?></a>
      <span>/</span>
      <span class="font-bold text-[#1F4D3A] truncate"><?= htmlspecialchars(_f($product, 'name')) ?></span>
    </nav>
  </div>
</div>

<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
    
    <!-- Left: Gallery Column -->
    <div class="lg:col-span-6 space-y-4">
      <div class="bg-[#F4EFE2] rounded-3xl p-8 border border-[#E8DEC8] flex items-center justify-center aspect-square relative shadow-inner overflow-hidden">
        <?php if (!empty($images[0])): ?>
          <img id="main-product-img" src="<?= htmlspecialchars($images[0]) ?>" alt="<?= htmlspecialchars(_f($product, 'name')) ?>" class="max-h-full max-w-full object-contain drop-shadow-xl" onerror="this.onerror=null;this.parentNode.innerHTML='<div class=\'text-8xl text-[#1F4D3A]\'>🌿</div>';">
        <?php else: ?>
          <div class="text-8xl text-[#1F4D3A]">🌿</div>
        <?php endif; ?>

        <!-- Batch CoA Pill -->
        <a href="<?= url('verify-batch.php?batch=' . urlencode($currentBatch)) ?>" class="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm border border-[#1F4D3A]/20 rounded-xl p-3 text-xs text-[#1F4D3A] flex items-center justify-between shadow-sm hover:bg-white transition-all">
          <div class="flex items-center space-x-2">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <div>
              <span class="font-bold">NABL ISO/IEC 17025 Batch Report</span>
              <span class="block text-[10px] text-[#7A6B5D] font-mono">Code: <?= htmlspecialchars($currentBatch) ?></span>
            </div>
          </div>
          <span class="text-xs font-bold text-[#C8922B] bg-[#FAF0D9] px-2.5 py-1 rounded-md">View CoA →</span>
        </a>
      </div>

      <!-- Thumbnails -->
      <?php if (count($images) > 1): ?>
        <div class="flex space-x-3 overflow-x-auto py-2">
          <?php foreach ($images as $idx => $img): ?>
            <button onclick="document.getElementById('main-product-img').src='<?= htmlspecialchars($img) ?>'" class="w-16 h-16 rounded-xl border-2 border-[#E8DEC8] bg-[#F4EFE2] p-1 flex-shrink-0 hover:border-[#1F4D3A] transition-all">
              <img src="<?= htmlspecialchars($img) ?>" class="w-full h-full object-cover rounded" alt="Thumbnail <?= $idx ?>">
            </button>
          <?php endforeach; ?>
        </div>
      <?php endif; ?>
    </div>

    <!-- Right: Purchase & Information Column -->
    <div class="lg:col-span-6 space-y-6">
      
      <div>
        <div class="flex items-center space-x-2 mb-2">
          <span class="badge-gold text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            <?= htmlspecialchars($product['certificate_type'] ?? 'AYUSH') ?> Certified
          </span>
          <span class="text-xs text-[#7A6B5D]">•</span>
          <span class="text-xs text-[#7A6B5D] font-medium capitalize"><?= htmlspecialchars($product['form'] ?? 'Tablet') ?></span>
          <span class="text-xs text-[#7A6B5D]">•</span>
          <span class="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">In Stock</span>
        </div>

        <h1 class="text-3xl sm:text-4xl font-extrabold text-[#1F4D3A] font-serif-luxury leading-tight">
          <?= htmlspecialchars(_f($product, 'name')) ?>
        </h1>

        <p class="text-sm text-[#7A6B5D] mt-2 leading-relaxed">
          <?= htmlspecialchars(_f($product, 'subtitle') ?: _f($product, 'description')) ?>
        </p>

        <!-- Rating Row -->
        <div class="flex items-center space-x-3 mt-3 text-xs">
          <div class="flex items-center text-[#C8922B]">
            ★ <span class="font-bold ml-1 text-[#3B2F25]"><?= number_format((float)$product['rating'], 1) ?></span>
          </div>
          <span class="text-[#7A6B5D]">•</span>
          <span class="text-[#7A6B5D] font-medium"><?= (int)$product['reviews_count'] ?> verified patient reviews</span>
        </div>
      </div>

      <!-- Pricing Box -->
      <div class="bg-[#F4EFE2] rounded-2xl p-5 border border-[#E8DEC8] space-y-3">
        <div class="flex items-baseline space-x-3">
          <span class="text-3xl font-extrabold text-[#1F4D3A]"><?= formatPrice($product['price']) ?></span>
          <?php if ((float)$product['original_price'] > (float)$product['price']): ?>
            <span class="text-base text-gray-400 line-through"><?= formatPrice($product['original_price']) ?></span>
            <span class="text-xs font-bold text-[#C8922B] bg-[#FAF0D9] px-2 py-0.5 rounded">
              Save <?= (int)$product['discount_pct'] ?>%
            </span>
          <?php endif; ?>
        </div>

        <!-- Tier 2/3 Free Delivery & UPI Tag -->
        <div class="text-xs text-[#1F4D3A] space-y-1 pt-1">
          <p class="flex items-center space-x-1.5 font-medium">
            <span>🚚</span>
            <span>Free Express Delivery on orders over ₹599</span>
          </p>
          <p class="flex items-center space-x-1.5 font-medium text-emerald-800">
            <span>⚡</span>
            <span>Extra <strong>5% Instant Discount</strong> on Prepaid UPI checkout</span>
          </p>
        </div>
      </div>

      <!-- 30-Day Regimen Subscription Option -->
      <?php if (!empty($product['subscription_eligible'])): ?>
        <div class="border-2 border-[#C8922B]/40 bg-[#FAF0D9]/50 rounded-2xl p-4 flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <input type="checkbox" id="subscription-toggle" class="w-5 h-5 accent-[#C8922B] rounded">
            <div>
              <label for="subscription-toggle" class="font-bold text-xs text-[#1F4D3A] block cursor-pointer">
                Subscribe for 30-Day Regimen Refill (Save Extra 15%)
              </label>
              <span class="text-[11px] text-[#7A6B5D]">Auto-delivered every month. Cancel anytime with 1-click.</span>
            </div>
          </div>
          <span class="text-xs font-bold text-[#C8922B] font-mono">
            <?= formatPrice((float)$product['price'] * 0.85) ?>/mo
          </span>
        </div>
      <?php endif; ?>

      <!-- Quantity & Add to Cart -->
      <div class="flex items-center space-x-4 pt-2">
        <div class="flex items-center border border-[#D5C7B0] rounded-xl bg-white p-1">
          <button onclick="let q = document.getElementById('prod-qty'); if(q.value > 1) q.value--;" class="px-3 py-2 text-sm text-[#3B2F25] hover:bg-[#FAF6EC] rounded-lg font-bold">-</button>
          <input type="number" id="prod-qty" value="1" min="1" max="10" class="w-12 text-center text-sm font-bold bg-transparent focus:outline-none">
          <button onclick="let q = document.getElementById('prod-qty'); q.value++;" class="px-3 py-2 text-sm text-[#3B2F25] hover:bg-[#FAF6EC] rounded-lg font-bold">+</button>
        </div>

        <button onclick="addToCart('<?= $product['id'] ?>', parseInt(document.getElementById('prod-qty').value), '<?= $currentBatch ?>')" class="flex-1 btn-gold py-3.5 rounded-xl text-sm uppercase tracking-wider font-extrabold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
          <span><?= CURRENT_LANG === 'hi' ? 'थैली में जोड़ें' : 'Add to Regimen Bag' ?></span>
        </button>
      </div>

      <!-- Pincode Estimator Tool -->
      <div class="bg-white rounded-2xl p-4 border border-[#E8DEC8] space-y-2">
        <label class="text-xs font-bold text-[#1F4D3A] flex items-center space-x-1">
          <span>📍</span>
          <span>Estimate Delivery Date & COD Availability</span>
        </label>
        <div class="flex space-x-2">
          <input type="text" id="check-pincode" maxlength="6" placeholder="Enter 6-digit Pincode" class="flex-1 text-xs px-3 py-2 rounded-xl border border-[#D5C7B0] focus:outline-none focus:border-[#1F4D3A]">
          <button onclick="checkPincodeDelivery()" class="btn-forest px-4 py-2 rounded-xl text-xs font-bold">Check</button>
        </div>
        <p id="pincode-result" class="text-xs text-[#7A6B5D] hidden"></p>
      </div>

    </div>

  </div>

  <!-- Deep Botanical Ingredients Breakdown -->
  <?php if (!empty($ingredients)): ?>
    <section class="mt-16 bg-[#F4EFE2] rounded-3xl p-6 sm:p-10 border border-[#E8DEC8]">
      <div class="max-w-3xl mb-8">
        <span class="text-xs font-bold text-[#C8922B] uppercase tracking-wider">Botanical Provenance</span>
        <h2 class="text-2xl sm:text-3xl font-extrabold text-[#1F4D3A] font-serif-luxury mt-1">
          Active Ingredients & Origin
        </h2>
        <p class="text-xs text-[#7A6B5D] mt-1">Every botanical is wild-harvested at peak pharmacological potency and cold-extracted.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <?php foreach ($ingredients as $ing): ?>
          <div class="bg-white rounded-2xl p-5 border border-[#E8DEC8] space-y-2 shadow-sm">
            <div class="flex items-center space-x-2">
              <span class="text-xl">🌿</span>
              <div>
                <h4 class="font-bold text-sm text-[#1F4D3A]"><?= htmlspecialchars($ing['name'] ?? '') ?></h4>
                <span class="text-[11px] italic text-[#7A6B5D]"><?= htmlspecialchars($ing['botanicalName'] ?? '') ?></span>
              </div>
            </div>
            <div class="text-xs space-y-1 pt-2 border-t border-[#E8DEC8] text-[#7A6B5D]">
              <p><strong>Part Used:</strong> <?= htmlspecialchars($ing['partUsed'] ?? 'Whole Herb') ?></p>
              <p><strong>Harvest Region:</strong> <?= htmlspecialchars($ing['sourceRegion'] ?? 'Western Ghats, India') ?></p>
              <p><strong>Extraction:</strong> <?= htmlspecialchars($ing['extractionMethod'] ?? 'Traditional Decoction') ?></p>
              <p class="text-[#1F4D3A] pt-1"><strong>Action:</strong> <?= htmlspecialchars($ing['whyItWorks'] ?? '') ?></p>
            </div>
          </div>
        <?php endforeach; ?>
      </div>
    </section>
  <?php endif; ?>

  <!-- Dosage, References & Safety -->
  <section class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
    <div class="bg-white rounded-2xl p-6 border border-[#E8DEC8] space-y-2">
      <h3 class="font-bold text-sm text-[#1F4D3A] font-serif-luxury flex items-center space-x-1.5">
        <span>🥄</span>
        <span>Dosage & How to Take</span>
      </h3>
      <p class="text-xs text-[#7A6B5D] leading-relaxed">
        <?= htmlspecialchars(_f($product, 'dosage')) ?>
      </p>
    </div>

    <div class="bg-white rounded-2xl p-6 border border-[#E8DEC8] space-y-2">
      <h3 class="font-bold text-sm text-[#1F4D3A] font-serif-luxury flex items-center space-x-1.5">
        <span>📜</span>
        <span>Classical Reference</span>
      </h3>
      <p class="text-xs text-[#7A6B5D] leading-relaxed">
        <?= htmlspecialchars($product['classical_reference'] ?: 'Charaka Samhita, Chikitsasthana Chapter 1 (Rasayana Pada)') ?>
      </p>
    </div>

    <div class="bg-white rounded-2xl p-6 border border-[#E8DEC8] space-y-2">
      <h3 class="font-bold text-sm text-[#1F4D3A] font-serif-luxury flex items-center space-x-1.5">
        <span>⚠️</span>
        <span>Who Should Avoid</span>
      </h3>
      <p class="text-xs text-[#7A6B5D] leading-relaxed">
        <?= htmlspecialchars(_f($product, 'who_should_avoid') ?: 'Pregnant or lactating mothers should consult their Ayurvedic physician before consumption.') ?>
      </p>
    </div>
  </section>

  <!-- Related Products -->
  <?php if (!empty($related)): ?>
    <section class="mt-16 pt-12 border-t border-[#E8DEC8]">
      <div class="flex justify-between items-end mb-8">
        <div>
          <span class="text-xs font-bold text-[#C8922B] uppercase tracking-wider">Synergistic Formulations</span>
          <h2 class="text-2xl font-extrabold text-[#1F4D3A] font-serif-luxury mt-1">Frequently Paired Together</h2>
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <?php foreach ($related as $p): ?>
          <?php require __DIR__ . '/includes/product_card.php'; ?>
        <?php endforeach; ?>
      </div>
    </section>
  <?php endif; ?>

</main>

<script>
function checkPincodeDelivery() {
  const pin = document.getElementById('check-pincode').value.trim();
  const res = document.getElementById('pincode-result');
  if (pin.length !== 6) {
    res.innerHTML = '<span class="text-red-500 font-semibold">Please enter a valid 6-digit Indian PIN code</span>';
    res.classList.remove('hidden');
    return;
  }

  fetch('<?= url("api/pincode.php") ?>?pincode=' + encodeURIComponent(pin))
    .then(r => r.json())
    .then(data => {
      res.classList.remove('hidden');
      if (data.serviceable) {
        res.innerHTML = `<span class="text-emerald-700 font-bold">✓ Serviceable!</span> Delivery by <strong>${data.estimatedDelivery}</strong>. Cash on Delivery is available.`;
      } else {
        res.innerHTML = `<span class="text-red-500 font-bold">✗</span> ${data.message}`;
      }
    });
}
</script>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
