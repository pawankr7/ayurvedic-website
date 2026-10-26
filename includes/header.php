<?php
/**
 * AARU AYURVEDA - Header Component
 */
require_once dirname(__DIR__) . '/config/config.php';
require_once dirname(__DIR__) . '/includes/i18n.php';

$cart = getCartSummary();
$pageTitle = $pageTitle ?? (CURRENT_LANG === 'hi' ? 'आरु आयुर्वेद - शुद्ध एवं प्रमाणित' : 'AARU Ayurveda - Rooted in Ayurveda. Verified by Science.');
$pageDescription = $pageDescription ?? 'Explore authentic, lab-verified Ayurvedic medicines, Shilajit, Triphala, and personalized Dosha wellness. Every batch tested for zero heavy metals.';
?>
<!DOCTYPE html>
<html lang="<?= CURRENT_LANG ?>" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?= htmlspecialchars($pageTitle) ?></title>
  <meta name="description" content="<?= htmlspecialchars($pageDescription) ?>">
  <link rel="icon" href="<?= url('favicon.ico') ?>" type="image/x-icon">

  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            forest: {
              DEFAULT: '#1F4D3A',
              dark: '#143527',
              light: '#2C684E',
            },
            gold: {
              DEFAULT: '#C8922B',
              hover: '#B07E20',
              light: '#F7E9CF',
            },
            cream: {
              DEFAULT: '#FAF6EC',
              card: '#F4EFE2',
            },
            earth: '#3B2F25',
            sage: '#DDE5D6',
          }
        }
      }
    }
  </script>

  <!-- Custom Styles -->
  <link rel="stylesheet" href="<?= asset('css/style.css') ?>">

  <script>
    window.AARU_BASE_URL = '<?= BASE_URL ?>';
    window.CURRENT_LANG = '<?= CURRENT_LANG ?>';
  </script>
</head>
<body class="bg-[#FAF6EC] text-[#3B2F25] min-h-screen flex flex-col antialiased">

  <!-- Top Announcement Bar -->
  <div class="bg-[#1F4D3A] text-[#FAF6EC] py-2 px-4 text-xs md:text-sm font-medium">
    <div class="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center space-y-1 sm:space-y-0 text-center sm:text-left">
      <div class="flex items-center space-x-2">
        <span class="inline-block w-2 h-2 rounded-full bg-[#C8922B] animate-pulse"></span>
        <span><?= CURRENT_LANG === 'hi' ? '100% एनएबीएल लैब प्रमाणित • शून्य विषाक्त हेवी मेटल्स • निःशुल्क एक्सप्रेस डिलीवरी ₹599+' : '100% NABL Lab Tested • Zero Toxic Heavy Metals • Free Express Shipping on ₹599+' ?></span>
      </div>
      <div class="flex items-center space-x-4">
        <a href="<?= url('verify-batch.php') ?>" class="text-[#C8922B] hover:underline font-semibold flex items-center space-x-1">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
          <span><?= CURRENT_LANG === 'hi' ? 'बैच रिपोर्ट जांचें' : 'Verify Any Batch CoA' ?></span>
        </a>
        <span class="text-gray-400">|</span>
        <!-- Language Switcher -->
        <div class="flex items-center space-x-1 bg-[#143527] px-2 py-0.5 rounded text-xs">
          <a href="?lang=en" class="<?= CURRENT_LANG === 'en' ? 'text-[#C8922B] font-bold' : 'text-gray-300 hover:text-white' ?>">EN</a>
          <span>/</span>
          <a href="?lang=hi" class="<?= CURRENT_LANG === 'hi' ? 'text-[#C8922B] font-bold' : 'text-gray-300 hover:text-white' ?>">हिन्दी</a>
        </div>
      </div>
    </div>
  </div>

  <!-- Main Navigation Header -->
  <header class="sticky top-0 z-40 bg-[#FAF6EC]/95 backdrop-blur-md border-b border-[#E8DEC8] transition-all">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        
        <!-- Logo -->
        <div class="flex items-center space-x-3">
          <a href="<?= url('index.php') ?>" class="flex items-center space-x-2 group">
            <div class="w-10 h-10 rounded-full bg-[#1F4D3A] text-[#FAF6EC] flex items-center justify-center font-bold text-xl shadow-md border border-[#C8922B]/40 group-hover:scale-105 transition-transform">
              आ
            </div>
            <div>
              <span class="text-2xl font-bold tracking-tight text-[#1F4D3A] font-serif-luxury">AARU</span>
              <span class="block text-[10px] tracking-wider uppercase text-[#C8922B] font-semibold"><?= CURRENT_LANG === 'hi' ? 'प्रमाणित आयुर्वेद' : 'Verified Ayurveda' ?></span>
            </div>
          </a>
        </div>

        <!-- Desktop Navigation Links -->
        <nav class="hidden lg:flex items-center space-x-7 text-sm font-medium text-[#3B2F25]">
          <a href="<?= url('index.php') ?>" class="hover:text-[#1F4D3A] transition-colors"><?= __t('nav.home', 'Home') ?></a>
          <a href="<?= url('shop.php') ?>" class="hover:text-[#1F4D3A] transition-colors font-semibold text-[#1F4D3A]"><?= __t('nav.shop', 'Shop All') ?></a>
          <a href="<?= url('prakriti-quiz.php') ?>" class="hover:text-[#C8922B] transition-colors flex items-center space-x-1 font-semibold text-[#C8922B]">
            <span>✨ <?= __t('nav.prakritiQuiz', 'Prakriti Quiz') ?></span>
          </a>
          <a href="<?= url('verify-batch.php') ?>" class="hover:text-[#1F4D3A] transition-colors"><?= __t('nav.verifyBatch', 'Verify Batch') ?></a>
          <a href="<?= url('quality.php') ?>" class="hover:text-[#1F4D3A] transition-colors"><?= __t('nav.quality', 'Quality & Labs') ?></a>
          <a href="<?= url('about.php') ?>" class="hover:text-[#1F4D3A] transition-colors"><?= __t('nav.about', 'Our Story') ?></a>
          <a href="<?= url('blog.php') ?>" class="hover:text-[#1F4D3A] transition-colors"><?= __t('nav.blog', 'Herb Library') ?></a>
        </nav>

        <!-- Right Action Items -->
        <div class="flex items-center space-x-4">
          <!-- Track Order Link -->
          <a href="<?= url('track-order.php') ?>" class="hidden sm:flex text-xs font-medium text-[#7A6B5D] hover:text-[#1F4D3A] items-center space-x-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
            <span><?= CURRENT_LANG === 'hi' ? 'ऑर्डर ट्रैक करें' : 'Track Order' ?></span>
          </a>

          <!-- Admin Link -->
          <a href="<?= url('admin/index.php') ?>" class="hidden sm:inline-block px-2.5 py-1 text-xs font-semibold text-[#1F4D3A] bg-[#DDE5D6] hover:bg-[#c9d4c1] rounded-md transition-colors" title="Admin Control Panel">
            <?= CURRENT_LANG === 'hi' ? 'एडमिन' : 'Admin' ?>
          </a>

          <!-- Cart Trigger Button -->
          <button class="cart-open-btn relative p-2.5 rounded-full bg-[#1F4D3A] text-white hover:bg-[#143527] transition-all shadow-md hover:scale-105" aria-label="Open Regimen Cart">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
            <span class="cart-count-badge <?= $cart['count'] > 0 ? '' : 'hidden' ?> absolute -top-1 -right-1 bg-[#C8922B] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#FAF6EC] shadow">
              <?= $cart['count'] ?>
            </span>
          </button>

          <!-- Mobile Hamburger -->
          <button id="mobile-menu-toggle" class="lg:hidden p-2 rounded-lg text-[#1F4D3A] hover:bg-[#E8DEC8]/50" aria-label="Toggle menu">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
          </button>
        </div>

      </div>

      <!-- Mobile Dropdown Menu -->
      <div id="mobile-menu" class="hidden lg:hidden py-4 border-t border-[#E8DEC8] space-y-2 text-sm font-medium">
        <a href="<?= url('index.php') ?>" class="block px-3 py-2 rounded-md hover:bg-[#E8DEC8] text-[#1F4D3A]"><?= __t('nav.home', 'Home') ?></a>
        <a href="<?= url('shop.php') ?>" class="block px-3 py-2 rounded-md hover:bg-[#E8DEC8] font-bold text-[#1F4D3A]"><?= __t('nav.shop', 'Shop All') ?></a>
        <a href="<?= url('prakriti-quiz.php') ?>" class="block px-3 py-2 rounded-md bg-[#FAF0D9] text-[#C8922B] font-semibold">✨ <?= __t('nav.prakritiQuiz', 'Take Prakriti Quiz') ?></a>
        <a href="<?= url('verify-batch.php') ?>" class="block px-3 py-2 rounded-md hover:bg-[#E8DEC8] text-[#1F4D3A]"><?= __t('nav.verifyBatch', 'Verify Batch CoA') ?></a>
        <a href="<?= url('quality.php') ?>" class="block px-3 py-2 rounded-md hover:bg-[#E8DEC8] text-[#1F4D3A]"><?= __t('nav.quality', 'Quality & Labs') ?></a>
        <a href="<?= url('about.php') ?>" class="block px-3 py-2 rounded-md hover:bg-[#E8DEC8] text-[#1F4D3A]"><?= __t('nav.about', 'Our Story') ?></a>
        <a href="<?= url('blog.php') ?>" class="block px-3 py-2 rounded-md hover:bg-[#E8DEC8] text-[#1F4D3A]"><?= __t('nav.blog', 'Herb Library') ?></a>
        <a href="<?= url('track-order.php') ?>" class="block px-3 py-2 rounded-md hover:bg-[#E8DEC8] text-[#7A6B5D]"><?= CURRENT_LANG === 'hi' ? 'ऑर्डर ट्रैक करें' : 'Track Order' ?></a>
        <a href="<?= url('admin/index.php') ?>" class="block px-3 py-2 rounded-md bg-[#DDE5D6] text-[#1F4D3A] font-semibold"><?= CURRENT_LANG === 'hi' ? 'एडमिन पोर्टल' : 'Admin Portal' ?></a>
      </div>

    </div>
  </header>

  <!-- Reusable Interactive Cart Drawer -->
  <?php require_once __DIR__ . '/cart_drawer.php'; ?>
