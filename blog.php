<?php
/**
 * AARU AYURVEDA - Herbal Encyclopedia & Wellness Journal
 */
require_once __DIR__ . '/config/config.php';
$db = getDB();

$stmtBlogs = $db->query("SELECT * FROM blog_posts ORDER BY created_at DESC");
$blogs = $stmtBlogs->fetchAll();

$stmtIngs = $db->query("SELECT * FROM ingredients_wiki ORDER BY name_en ASC");
$ingredients = $stmtIngs->fetchAll();

$pageTitle = 'Herbal Encyclopedia & Ayurvedic Journal | AARU Ayurveda';
$pageDescription = 'Deep dive into classical Ayurvedic herbs, Triphala, Ashwagandha, Shilajit, Dinacharya routines, and clinical research.';

require_once __DIR__ . '/includes/header.php';
?>

<div class="bg-[#FAF6EC] py-12 border-b border-[#E8DEC8]">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
    <span class="inline-block bg-[#FAF0D9] text-[#C8922B] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
      📖 Knowledge Repository
    </span>
    <h1 class="text-3xl sm:text-5xl font-extrabold text-[#1F4D3A] font-serif-luxury">
      <?= CURRENT_LANG === 'hi' ? 'जड़ी-बूटी ज्ञानकोष एवं आयुर्वेद पत्रिका' : 'Herbal Encyclopedia & Wellness Journal' ?>
    </h1>
    <p class="text-xs sm:text-sm text-[#7A6B5D] max-w-2xl mx-auto leading-relaxed">
      Evidence-based guides exploring botanical pharmacology, classical Samhita references, and daily Ayurvedic lifestyle.
    </p>
  </div>
</div>

<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
  
  <!-- Clinical Blog Articles -->
  <section class="space-y-6">
    <h2 class="text-2xl font-bold text-[#1F4D3A] font-serif-luxury">Featured Clinical Essays</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <?php foreach ($blogs as $b): 
        $tags = json_decode($b['tags_json'] ?? '[]', true);
      ?>
        <article class="bg-white rounded-2xl border border-[#E8DEC8] overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
          <div class="p-6 space-y-3">
            <div class="flex items-center space-x-2 text-[11px] text-[#C8922B] font-bold uppercase tracking-wider">
              <span><?= htmlspecialchars($b['category']) ?></span>
              <span>•</span>
              <span class="text-gray-400 font-normal"><?= htmlspecialchars($b['read_time']) ?></span>
            </div>
            <h3 class="font-bold text-lg text-[#1F4D3A] font-serif-luxury leading-snug">
              <?= htmlspecialchars(_f($b, 'title')) ?>
            </h3>
            <p class="text-xs text-[#7A6B5D] leading-relaxed line-clamp-3">
              <?= htmlspecialchars(_f($b, 'excerpt')) ?>
            </p>
          </div>
          <div class="p-6 pt-0 border-t border-[#E8DEC8]/60 mt-4 flex justify-between items-center text-xs text-[#7A6B5D]">
            <span>By <?= htmlspecialchars($b['author']) ?></span>
            <span class="text-[#1F4D3A] font-bold">Read Article →</span>
          </div>
        </article>
      <?php endforeach; ?>
    </div>
  </section>

  <!-- Botanical Herb Encyclopedia -->
  <section class="space-y-6">
    <div>
      <h2 class="text-2xl font-bold text-[#1F4D3A] font-serif-luxury">Classical Botanical Monographs</h2>
      <p class="text-xs text-[#7A6B5D] mt-1">Pharmacological analysis of supreme Rasayana herbs used across AARU formulations.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <?php foreach ($ingredients as $ing): ?>
        <div class="bg-[#F4EFE2] rounded-2xl p-6 border border-[#E8DEC8] space-y-3">
          <div class="flex items-center space-x-2">
            <span class="text-2xl">🌱</span>
            <div>
              <h3 class="font-bold text-base text-[#1F4D3A] font-serif-luxury"><?= htmlspecialchars(_f($ing, 'name')) ?></h3>
              <span class="text-xs italic text-[#7A6B5D]"><?= htmlspecialchars($ing['botanical_name']) ?></span>
            </div>
          </div>
          <p class="text-xs text-[#7A6B5D] leading-relaxed line-clamp-3">
            <?= htmlspecialchars(_f($ing, 'overview')) ?>
          </p>
          <div class="text-[11px] text-[#1F4D3A] bg-white p-2.5 rounded-xl border border-[#E8DEC8] space-y-1">
            <p><strong>Rasa (Taste):</strong> <?= htmlspecialchars($ing['rasa']) ?></p>
            <p><strong>Virya (Potency):</strong> <?= htmlspecialchars($ing['virya']) ?></p>
            <p><strong>Prabhava:</strong> <?= htmlspecialchars($ing['prabhava']) ?></p>
          </div>
          <?php if (!empty($ing['related_product_slug'])): ?>
            <a href="<?= url('product.php?slug=' . urlencode($ing['related_product_slug'])) ?>" class="block text-xs font-bold text-[#C8922B] hover:underline pt-1">
              View Formulations with this Herb →
            </a>
          <?php endif; ?>
        </div>
      <?php endforeach; ?>
    </div>
  </section>

</main>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
