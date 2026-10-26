<?php
/**
 * AARU AYURVEDA - Shop Catalog Page
 */
require_once __DIR__ . '/config/config.php';
$db = getDB();

$selectedCategory = clean($_GET['category'] ?? '');
$searchQuery = clean($_GET['q'] ?? '');
$sortBy = clean($_GET['sort'] ?? 'bestseller');

// Fetch all categories for filter bar
$stmtCats = $db->query("SELECT * FROM categories ORDER BY display_order ASC");
$categories = $stmtCats->fetchAll();

// Build query
$sql = "SELECT * FROM products WHERE 1=1";
$params = [];

if (!empty($selectedCategory)) {
    $sql .= " AND category_id = :category";
    $params[':category'] = $selectedCategory;
}

if (!empty($searchQuery)) {
    $sql .= " AND (name_en LIKE :search OR name_hi LIKE :search OR description_en LIKE :search)";
    $params[':search'] = '%' . $searchQuery . '%';
}

switch ($sortBy) {
    case 'price_low':
        $sql .= " ORDER BY price ASC";
        break;
    case 'price_high':
        $sql .= " ORDER BY price DESC";
        break;
    case 'rating':
        $sql .= " ORDER BY rating DESC";
        break;
    case 'newest':
        $sql .= " ORDER BY created_at DESC";
        break;
    default:
        $sql .= " ORDER BY is_bestseller DESC, rating DESC";
        break;
}

$stmtProds = $db->prepare($sql);
$stmtProds->execute($params);
$products = $stmtProds->fetchAll();

$pageTitle = CURRENT_LANG === 'hi' 
    ? 'आयुर्वेदिक औषधियां एवं योग - आरु (AARU) ऑनलाइन शॉप'
    : 'Shop Proven Ayurvedic Formulations - AARU Apothecary';

require_once __DIR__ . '/includes/header.php';
?>

<div class="bg-[#FAF6EC] py-8 border-b border-[#E8DEC8]">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
    <!-- Breadcrumb -->
    <nav class="text-xs text-[#7A6B5D] mb-4 flex items-center space-x-2">
      <a href="<?= url('index.php') ?>" class="hover:underline">Home</a>
      <span>/</span>
      <span class="font-bold text-[#1F4D3A]"><?= CURRENT_LANG === 'hi' ? 'दुकान (Shop All)' : 'Apothecary' ?></span>
      <?php if (!empty($selectedCategory)): ?>
        <span>/</span>
        <span class="text-[#C8922B] font-bold"><?= htmlspecialchars($selectedCategory) ?></span>
      <?php endif; ?>
    </nav>

    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 class="text-3xl font-extrabold text-[#1F4D3A] font-serif-luxury">
          <?= CURRENT_LANG === 'hi' ? 'शास्त्रीय एवं प्रमाण-सम्मत औषधियां' : 'Authentic Ayurvedic Apothecary' ?>
        </h1>
        <p class="text-xs text-[#7A6B5D] mt-1">
          Showing <?= count($products) ?> lab-verified formulations. All batches tested for zero toxic heavy metals.
        </p>
      </div>

      <!-- Search & Sort Bar -->
      <form method="GET" class="flex flex-wrap items-center gap-2 w-full md:w-auto">
        <?php if (!empty($selectedCategory)): ?>
          <input type="hidden" name="category" value="<?= htmlspecialchars($selectedCategory) ?>">
        <?php endif; ?>
        
        <div class="relative flex-1 md:w-64">
          <input type="text" name="q" value="<?= htmlspecialchars($searchQuery) ?>" placeholder="Search herb or concern..." class="w-full text-xs px-3 py-2.5 rounded-xl border border-[#D5C7B0] bg-white text-[#3B2F25] focus:outline-none focus:border-[#1F4D3A]">
          <?php if (!empty($searchQuery)): ?>
            <a href="<?= url('shop.php' . (!empty($selectedCategory) ? '?category=' . urlencode($selectedCategory) : '')) ?>" class="absolute right-2.5 top-2.5 text-xs text-gray-400 hover:text-black">✕</a>
          <?php endif; ?>
        </div>

        <select name="sort" onchange="this.form.submit()" class="text-xs px-3 py-2.5 rounded-xl border border-[#D5C7B0] bg-white text-[#3B2F25] focus:outline-none focus:border-[#1F4D3A]">
          <option value="bestseller" <?= $sortBy === 'bestseller' ? 'selected' : '' ?>>Sort: Bestsellers</option>
          <option value="rating" <?= $sortBy === 'rating' ? 'selected' : '' ?>>Sort: Highest Rated</option>
          <option value="price_low" <?= $sortBy === 'price_low' ? 'selected' : '' ?>>Price: Low to High</option>
          <option value="price_high" <?= $sortBy === 'price_high' ? 'selected' : '' ?>>Price: High to Low</option>
        </select>
      </form>
    </div>

    <!-- Category Pill Filter Tabs -->
    <div class="flex items-center space-x-2 overflow-x-auto py-4 mt-4 no-scrollbar">
      <a href="<?= url('shop.php') ?>" class="px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors <?= empty($selectedCategory) ? 'bg-[#1F4D3A] text-white shadow-sm' : 'bg-[#F4EFE2] text-[#3B2F25] hover:bg-[#E8DEC8]' ?>">
        All Concerns
      </a>
      <?php foreach ($categories as $cat): ?>
        <a href="<?= url('shop.php?category=' . urlencode($cat['slug'])) ?>" class="px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors <?= $selectedCategory === $cat['slug'] ? 'bg-[#1F4D3A] text-white shadow-sm' : 'bg-[#F4EFE2] text-[#3B2F25] hover:bg-[#E8DEC8]' ?>">
          <?= htmlspecialchars(_f($cat, 'name')) ?>
        </a>
      <?php endforeach; ?>
    </div>

  </div>
</div>

<!-- Products Catalog Grid -->
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
  <?php if (empty($products)): ?>
    <div class="text-center py-20 bg-[#F4EFE2] rounded-3xl border border-[#E8DEC8] p-8">
      <div class="text-5xl mb-4">🌿</div>
      <h3 class="text-lg font-bold text-[#1F4D3A] font-serif-luxury">No formulations matched your query</h3>
      <p class="text-xs text-[#7A6B5D] mt-1">Try clearing your search term or browsing all categories.</p>
      <a href="<?= url('shop.php') ?>" class="mt-4 inline-block btn-forest px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider">
        Reset Filters
      </a>
    </div>
  <?php else: ?>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <?php foreach ($products as $p): ?>
        <?php require __DIR__ . '/includes/product_card.php'; ?>
      <?php endforeach; ?>
    </div>
  <?php endif; ?>
</div>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
