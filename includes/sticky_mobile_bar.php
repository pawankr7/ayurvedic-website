<?php
/**
 * AARU AYURVEDA - Mobile Sticky Bottom Action Bar
 */
?>
<div class="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF6EC]/95 backdrop-blur-md border-t border-[#E8DEC8] px-3 py-2 flex items-center justify-around shadow-lg">
  <!-- Home -->
  <a href="<?= url('index.php') ?>" class="flex flex-col items-center text-[10px] text-[#7A6B5D] hover:text-[#1F4D3A]">
    <svg class="w-5 h-5 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
    <span>Home</span>
  </a>

  <!-- Shop -->
  <a href="<?= url('shop.php') ?>" class="flex flex-col items-center text-[10px] text-[#7A6B5D] hover:text-[#1F4D3A]">
    <svg class="w-5 h-5 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
    <span>Shop</span>
  </a>

  <!-- Prakriti Quiz -->
  <a href="<?= url('prakriti-quiz.php') ?>" class="flex flex-col items-center text-[10px] text-[#C8922B] font-bold">
    <div class="w-7 h-7 rounded-full bg-[#C8922B] text-white flex items-center justify-center -mt-3 shadow-md">
      ✨
    </div>
    <span>Quiz</span>
  </a>

  <!-- Verify Batch -->
  <a href="<?= url('verify-batch.php') ?>" class="flex flex-col items-center text-[10px] text-[#7A6B5D] hover:text-[#1F4D3A]">
    <svg class="w-5 h-5 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
    <span>Lab Batch</span>
  </a>

  <!-- Bag / Cart -->
  <button class="cart-open-btn relative flex flex-col items-center text-[10px] text-[#7A6B5D] hover:text-[#1F4D3A]">
    <svg class="w-5 h-5 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
    <span class="cart-count-badge <?= $cartSummary['count'] > 0 ? '' : 'hidden' ?> absolute -top-1 right-2 bg-[#C8922B] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
      <?= $cartSummary['count'] ?>
    </span>
    <span>Bag</span>
  </button>
</div>
