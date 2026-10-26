<?php
/**
 * AARU AYURVEDA - Full Cart View Page
 */
require_once __DIR__ . '/config/config.php';
$cartSummary = getCartSummary();

$pageTitle = 'Your Ayurvedic Regimen Bag | AARU Ayurveda';
$pageDescription = 'Review your Ayurvedic supplements, batch numbers, savings and proceed to checkout.';

require_once __DIR__ . '/includes/header.php';
?>

<div class="bg-[#FAF6EC] py-8 border-b border-[#E8DEC8]">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 class="text-3xl font-extrabold text-[#1F4D3A] font-serif-luxury">
      <?= CURRENT_LANG === 'hi' ? 'आपकी दिनचर्या थैली (Cart)' : 'Your Regimen Bag' ?>
    </h1>
    <p class="text-xs text-[#7A6B5D] mt-1">Review lab-tested formulations before secure checkout.</p>
  </div>
</div>

<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
  <?php if (empty($cartSummary['items'])): ?>
    <div class="text-center py-20 bg-white rounded-3xl border border-[#E8DEC8] p-8 shadow-sm">
      <div class="text-6xl mb-4 text-[#1F4D3A]">🌿</div>
      <h2 class="text-2xl font-bold text-[#1F4D3A] font-serif-luxury">Your Regimen Bag is Empty</h2>
      <p class="text-xs text-[#7A6B5D] mt-1">Start by adding lab-verified Ayurvedic herbal medicines.</p>
      <div class="mt-6 flex justify-center gap-4">
        <a href="<?= url('shop.php') ?>" class="btn-forest px-6 py-3 rounded-xl text-xs uppercase tracking-wider font-bold">
          Explore Formulations
        </a>
        <a href="<?= url('prakriti-quiz.php') ?>" class="btn-gold px-6 py-3 rounded-xl text-xs uppercase tracking-wider font-bold">
          Take 2-Min Prakriti Quiz
        </a>
      </div>
    </div>
  <?php else: ?>
    
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
      
      <!-- Items Table Column -->
      <div class="lg:col-span-8 space-y-4">
        
        <!-- Free Shipping Bar -->
        <div class="bg-[#FAF0D9] p-4 rounded-2xl border border-[#E6CA8D] text-xs">
          <div class="flex justify-between items-center mb-1.5 font-medium">
            <?php if ($cartSummary['freeShippingNeeded'] <= 0): ?>
              <span class="font-bold text-emerald-800">🎉 Free Express Shipping Unlocked Across India!</span>
            <?php else: ?>
              <span>Add <strong class="text-[#1F4D3A]">₹<?= $cartSummary['freeShippingNeeded'] ?></strong> more to unlock <strong>FREE Express Delivery</strong></span>
            <?php endif; ?>
            <span class="font-bold text-[#C8922B]">Threshold: ₹<?= FREE_SHIPPING_THRESHOLD ?></span>
          </div>
          <div class="w-full bg-[#E8DEC8] rounded-full h-2 overflow-hidden">
            <div class="bg-[#1F4D3A] h-2 rounded-full" style="width: <?= $cartSummary['freeShippingProgress'] ?>%"></div>
          </div>
        </div>

        <!-- Items Card -->
        <div class="bg-white rounded-2xl border border-[#E8DEC8] divide-y divide-[#E8DEC8] overflow-hidden shadow-sm">
          <?php foreach ($cartSummary['items'] as $item): ?>
            <div class="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div class="flex items-center space-x-4">
                <div class="w-16 h-16 bg-[#F4EFE2] rounded-xl flex items-center justify-center p-1 text-[#1F4D3A] font-bold text-xs border border-[#E8DEC8] flex-shrink-0">
                  <?php if (!empty($item['image'])): ?>
                    <img src="<?= htmlspecialchars($item['image']) ?>" alt="<?= htmlspecialchars($item['name']) ?>" class="w-full h-full object-cover rounded" onerror="this.onerror=null;this.parentNode.innerHTML='🌿';">
                  <?php else: ?>
                    🌿
                  <?php endif; ?>
                </div>
                <div>
                  <h3 class="font-bold text-base text-[#1F4D3A] font-serif-luxury"><?= htmlspecialchars($item['name']) ?></h3>
                  <?php if (!empty($item['batch'])): ?>
                    <a href="<?= url('verify-batch.php?batch=' . urlencode($item['batch'])) ?>" class="text-[10px] text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-mono inline-block mt-0.5 hover:underline">
                      Batch: <?= htmlspecialchars($item['batch']) ?> (Verified CoA)
                    </a>
                  <?php endif; ?>
                  <span class="block text-xs text-[#7A6B5D] mt-1">Price per unit: <?= formatPrice($item['price']) ?></span>
                </div>
              </div>

              <div class="flex items-center justify-between w-full sm:w-auto sm:space-x-8">
                <!-- Quantity Controls -->
                <div class="flex items-center border border-[#D5C7B0] rounded-lg bg-white">
                  <button onclick="updateCartQuantity('<?= $item['id'] ?>', -1); location.reload();" class="px-3 py-1 text-sm font-bold text-[#3B2F25] hover:bg-[#FAF6EC]">-</button>
                  <span class="px-3 py-1 text-xs font-bold"><?= (int)$item['quantity'] ?></span>
                  <button onclick="updateCartQuantity('<?= $item['id'] ?>', 1); location.reload();" class="px-3 py-1 text-sm font-bold text-[#3B2F25] hover:bg-[#FAF6EC]">+</button>
                </div>

                <!-- Total -->
                <span class="font-bold text-base text-[#1F4D3A]">
                  <?= formatPrice($item['price'] * $item['quantity']) ?>
                </span>

                <!-- Delete -->
                <button onclick="removeCartItem('<?= $item['id'] ?>'); location.reload();" class="text-gray-400 hover:text-red-500 p-1" title="Remove item">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
              </div>

            </div>
          <?php endforeach; ?>
        </div>

        <div class="flex justify-between items-center text-xs">
          <a href="<?= url('shop.php') ?>" class="text-[#1F4D3A] hover:underline font-bold flex items-center space-x-1">
            <span>← Continue Shopping</span>
          </a>
        </div>

      </div>

      <!-- Summary Column -->
      <div class="lg:col-span-4 space-y-4">
        <div class="bg-white rounded-2xl p-6 border border-[#E8DEC8] shadow-sm space-y-4">
          <h3 class="font-bold text-lg text-[#1F4D3A] font-serif-luxury border-b border-[#E8DEC8] pb-3">Order Summary</h3>

          <div class="space-y-2 text-xs text-[#7A6B5D]">
            <div class="flex justify-between">
              <span>Items Total:</span>
              <span class="font-bold text-[#3B2F25]"><?= formatPrice($cartSummary['subtotal']) ?></span>
            </div>
            <div class="flex justify-between">
              <span>Express Air Shipping:</span>
              <span><?= $cartSummary['shippingFee'] == 0 ? '<strong class="text-emerald-700">FREE</strong>' : formatPrice($cartSummary['shippingFee']) ?></span>
            </div>
            <div class="flex justify-between text-emerald-800 bg-emerald-50 p-2 rounded-lg">
              <span>Prepaid UPI Discount (5%):</span>
              <span class="font-bold font-mono">- <?= formatPrice($cartSummary['subtotal'] * 0.05) ?></span>
            </div>
          </div>

          <div class="pt-3 border-t border-[#E8DEC8] flex justify-between items-baseline">
            <span class="font-bold text-sm text-[#3B2F25]">Estimated Total:</span>
            <span class="font-extrabold text-2xl text-[#1F4D3A]"><?= formatPrice($cartSummary['total']) ?></span>
          </div>

          <a href="<?= url('checkout.php') ?>" class="w-full block text-center btn-gold py-4 rounded-xl font-bold text-sm tracking-wide shadow-md hover:shadow-lg">
            Proceed to Secure Checkout →
          </a>

          <div class="text-[11px] text-center text-[#7A6B5D] space-y-1">
            <p>🔒 256-Bit SSL Encrypted Banking & Razorpay</p>
            <p>✓ Cash on Delivery (COD) Available Pan-India</p>
          </div>
        </div>
      </div>

    </div>

  <?php endif; ?>
</main>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
