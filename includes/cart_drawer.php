<?php
/**
 * AARU AYURVEDA - Interactive Slide-Over Cart Drawer
 */
$cartSummary = getCartSummary();
?>
<!-- Cart Backdrop -->
<div id="cart-backdrop" class="fixed inset-0 bg-black/60 z-50 transition-opacity"></div>

<!-- Slide-out Drawer Panel -->
<div id="cart-drawer" class="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#FAF6EC] z-50 shadow-2xl flex flex-col border-l border-[#E8DEC8]">
  
  <!-- Drawer Header -->
  <div class="p-5 border-b border-[#E8DEC8] flex items-center justify-between bg-[#F4EFE2]">
    <div class="flex items-center space-x-2">
      <div class="w-8 h-8 rounded-full bg-[#1F4D3A] text-white flex items-center justify-center font-bold text-xs">
        आ
      </div>
      <div>
        <h3 class="font-bold text-lg text-[#1F4D3A] font-serif-luxury"><?= CURRENT_LANG === 'hi' ? 'आपकी दिनचर्या थैली' : 'Your Regimen Bag' ?></h3>
        <p class="text-xs text-[#7A6B5D]"><?= CURRENT_LANG === 'hi' ? '100% एनएबीएल लैब प्रमाणित योग' : '100% NABL Lab Tested Formulations' ?></p>
      </div>
    </div>
    <button id="close-cart-btn" class="p-2 text-[#7A6B5D] hover:text-[#1F4D3A] hover:bg-[#E8DEC8]/60 rounded-full transition-colors" aria-label="Close cart">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
    </button>
  </div>

  <!-- Free Shipping Progress Threshold -->
  <div class="bg-[#FAF0D9] p-3.5 border-b border-[#E6CA8D] text-xs">
    <div class="flex justify-between items-center mb-1.5 font-medium" id="shipping-progress-text">
      <?php if ($cartSummary['freeShippingNeeded'] <= 0 && $cartSummary['subtotal'] > 0): ?>
        <span class="font-bold text-emerald-800">🎉 Congratulations! Free Shipping Unlocked!</span>
      <?php else: ?>
        <span>Add <span class="font-bold text-[#1F4D3A]">₹<?= $cartSummary['freeShippingNeeded'] ?></span> more for <span class="font-bold">FREE Express Delivery</span></span>
      <?php endif; ?>
      <span class="text-[11px] text-[#C8922B] font-bold">Goal: ₹<?= FREE_SHIPPING_THRESHOLD ?></span>
    </div>
    <div class="w-full bg-[#E8DEC8] rounded-full h-2 overflow-hidden">
      <div id="shipping-progress-bar" class="bg-[#1F4D3A] h-2 rounded-full transition-all duration-300" style="width: <?= $cartSummary['freeShippingProgress'] ?>%"></div>
    </div>
  </div>

  <!-- Items List Container -->
  <div id="cart-drawer-items" class="flex-1 overflow-y-auto p-5 divide-y divide-[#E8DEC8]">
    <?php if (empty($cartSummary['items'])): ?>
      <div class="py-20 text-center text-[#7A6B5D]">
        <div class="w-16 h-16 mx-auto mb-4 bg-[#F4EFE2] rounded-full flex items-center justify-center text-[#1F4D3A] text-2xl">
          🌿
        </div>
        <p class="font-medium text-lg text-[#3B2F25]"><?= CURRENT_LANG === 'hi' ? 'आपकी थैली अभी खाली है' : 'Your Ayurvedic bag is empty' ?></p>
        <p class="text-xs text-[#7A6B5D] mt-1"><?= CURRENT_LANG === 'hi' ? 'अपनी प्रकृति के अनुसार प्रामाणिक उत्पाद चुनें।' : 'Discover pure, batch-tested herbs.' ?></p>
        <a href="<?= url('shop.php') ?>" class="mt-5 inline-block btn-forest px-6 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold">
          <?= CURRENT_LANG === 'hi' ? 'उत्पाद देखें' : 'Explore Formulations' ?>
        </a>
      </div>
    <?php else: ?>
      <?php foreach ($cartSummary['items'] as $item): ?>
        <div class="flex items-center space-x-4 py-4">
          <div class="w-16 h-16 bg-[#F4EFE2] rounded-lg flex items-center justify-center p-1 text-[#1F4D3A] font-bold text-xs border border-[#E8DEC8] flex-shrink-0">
            <?php if (!empty($item['image'])): ?>
              <img src="<?= htmlspecialchars($item['image']) ?>" alt="<?= htmlspecialchars($item['name']) ?>" class="w-full h-full object-cover rounded" onerror="this.onerror=null;this.parentNode.innerHTML='🌿';">
            <?php else: ?>
              🌿
            <?php endif; ?>
          </div>
          <div class="flex-1 min-w-0">
            <h4 class="text-sm font-semibold text-[#1F4D3A] truncate"><?= htmlspecialchars($item['name']) ?></h4>
            <?php if (!empty($item['batch'])): ?>
              <span class="text-[10px] text-emerald-800 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded font-mono">
                Batch: <?= htmlspecialchars($item['batch']) ?>
              </span>
            <?php endif; ?>
            <div class="flex items-center justify-between mt-2">
              <div class="flex items-center border border-[#D5C7B0] rounded bg-white">
                <button onclick="updateCartQuantity('<?= $item['id'] ?>', -1)" class="px-2 py-0.5 text-xs text-[#3B2F25] hover:bg-[#FAF6EC]">-</button>
                <span class="px-2 py-0.5 text-xs font-semibold"><?= (int)$item['quantity'] ?></span>
                <button onclick="updateCartQuantity('<?= $item['id'] ?>', 1)" class="px-2 py-0.5 text-xs text-[#3B2F25] hover:bg-[#FAF6EC]">+</button>
              </div>
              <span class="font-bold text-sm text-[#1F4D3A]">₹<?= number_format($item['price'] * $item['quantity'], 0) ?></span>
            </div>
          </div>
          <button onclick="removeCartItem('<?= $item['id'] ?>')" class="text-gray-400 hover:text-red-500 p-1" title="Remove item">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
          </button>
        </div>
      <?php endforeach; ?>
    <?php endif; ?>
  </div>

  <!-- Drawer Footer Checkout Panel -->
  <div class="p-5 bg-[#F4EFE2] border-t border-[#E8DEC8] space-y-3">
    <!-- Subtotal Row -->
    <div class="flex justify-between items-center text-sm">
      <span class="text-[#7A6B5D]"><?= CURRENT_LANG === 'hi' ? 'कुल राशि (Subtotal)' : 'Bag Subtotal' ?>:</span>
      <span class="cart-subtotal-val font-bold text-lg text-[#1F4D3A]"><?= formatPrice($cartSummary['subtotal']) ?></span>
    </div>

    <!-- Extra UPI Discount Tag -->
    <div class="bg-[#EEF3E9] border border-[#DDE5D6] rounded-lg p-2 text-xs flex items-center space-x-2 text-[#1F4D3A]">
      <svg class="w-4 h-4 text-[#C8922B] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
      <span>Instant <strong>5% Extra Off</strong> on Instant Prepaid UPI at Checkout!</span>
    </div>

    <!-- CTAs -->
    <div class="space-y-2 pt-1">
      <a href="<?= url('checkout.php') ?>" class="w-full block text-center btn-gold py-3 rounded-xl font-bold text-sm tracking-wide shadow-md">
        <?= CURRENT_LANG === 'hi' ? 'सुरक्षित चेकआउट करें' : 'Proceed to Secure Checkout' ?> →
      </a>
      <a href="<?= url('cart.php') ?>" class="w-full block text-center text-xs text-[#7A6B5D] hover:text-[#1F4D3A] font-semibold py-1">
        <?= CURRENT_LANG === 'hi' ? 'पूरी थैली देखें (View Full Bag)' : 'View Full Bag & Promo Codes' ?>
      </a>
    </div>

    <p class="text-[11px] text-center text-[#7A6B5D] flex items-center justify-center space-x-1">
      <svg class="w-3.5 h-3.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
      <span>256-Bit SSL Encrypted • Cash on Delivery Available</span>
    </p>
  </div>

</div>
