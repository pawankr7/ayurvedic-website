<?php
/**
 * AARU AYURVEDA - Admin Products Management
 */
require_once dirname(__DIR__) . '/config/config.php';
$db = getDB();

$msg = '';
// Handle In-Stock toggle or Price update
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = clean($_POST['action'] ?? '');
    $prodId = clean($_POST['product_id'] ?? '');

    if ($action === 'toggle_stock') {
        $stmt = $db->prepare("UPDATE products SET in_stock = IF(in_stock=1, 0, 1) WHERE id = :id");
        $stmt->execute([':id' => $prodId]);
        $msg = 'Stock status updated successfully.';
    } elseif ($action === 'update_price') {
        $newPrice = (float)($_POST['price'] ?? 0);
        if ($newPrice > 0) {
            $stmt = $db->prepare("UPDATE products SET price = :price WHERE id = :id");
            $stmt->execute([':price' => $newPrice, ':id' => $prodId]);
            $msg = 'Price updated successfully.';
        }
    }
}

$stmt = $db->query("SELECT * FROM products ORDER BY category_id ASC, name_en ASC");
$products = $stmt->fetchAll();

$pageTitle = 'Product Inventory & Stock | AARU Admin';
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?= htmlspecialchars($pageTitle) ?></title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="<?= asset('css/style.css') ?>">
</head>
<body class="bg-[#F4EFE2] text-[#3B2F25] min-h-screen flex flex-col font-sans">

  <header class="bg-[#143527] text-white py-3 px-6 border-b border-[#1F4D3A] flex justify-between items-center shadow-md">
    <div class="flex items-center space-x-3">
      <div class="w-8 h-8 rounded-full bg-[#C8922B] text-[#143527] flex items-center justify-center font-bold text-sm">आ</div>
      <h1 class="font-bold text-base tracking-wide font-serif-luxury">AARU Products Management</h1>
    </div>
    <a href="<?= url('admin/index.php') ?>" class="text-xs text-[#FAF6EC] hover:text-[#C8922B]">← Back to Dashboard</a>
  </header>

  <nav class="bg-white border-b border-[#E8DEC8] px-6 py-2.5 flex space-x-6 text-xs font-bold text-[#7A6B5D] overflow-x-auto">
    <a href="<?= url('admin/index.php') ?>" class="hover:text-[#1F4D3A]">Dashboard</a>
    <a href="<?= url('admin/products.php') ?>" class="text-[#1F4D3A] border-b-2 border-[#1F4D3A] pb-1">Products & Stock</a>
    <a href="<?= url('admin/orders.php') ?>" class="hover:text-[#1F4D3A]">Orders & Fulfillment</a>
    <a href="<?= url('admin/batches.php') ?>" class="hover:text-[#1F4D3A]">Batch CoA Audit</a>
    <a href="<?= url('admin/leads.php') ?>" class="hover:text-[#1F4D3A]">Prakriti Quiz Leads</a>
    <a href="<?= url('admin/claims.php') ?>" class="hover:text-[#1F4D3A] text-[#C8922B]">⚖️ Claims Auditor</a>
  </nav>

  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold text-[#1F4D3A] font-serif-luxury">Ayurvedic Formulations (<?= count($products) ?>)</h2>
      <?php if (!empty($msg)): ?>
        <span class="text-xs bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-bold"><?= htmlspecialchars($msg) ?></span>
      <?php endif; ?>
    </div>

    <div class="bg-white rounded-3xl p-6 border border-[#E8DEC8] shadow-sm overflow-x-auto">
      <table class="w-full text-xs text-left border border-[#E8DEC8] rounded-xl overflow-hidden">
        <thead class="bg-[#F4EFE2] text-[#3B2F25] font-bold">
          <tr>
            <th class="p-3">Product Name</th>
            <th class="p-3">Category</th>
            <th class="p-3">Current Price</th>
            <th class="p-3">Default Batch</th>
            <th class="p-3">Stock Status</th>
            <th class="p-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[#E8DEC8]">
          <?php foreach ($products as $p): ?>
            <tr class="hover:bg-[#FAF6EC]">
              <td class="p-3">
                <span class="font-bold text-[#1F4D3A] block"><?= htmlspecialchars($p['name_en']) ?></span>
                <span class="text-[10px] text-gray-400 font-mono"><?= htmlspecialchars($p['id']) ?> • <?= htmlspecialchars($p['form']) ?></span>
              </td>
              <td class="p-3 text-gray-500 capitalize"><?= htmlspecialchars(str_replace('-', ' ', $p['category_id'])) ?></td>
              <td class="p-3">
                <form method="POST" class="flex items-center space-x-1">
                  <input type="hidden" name="action" value="update_price">
                  <input type="hidden" name="product_id" value="<?= $p['id'] ?>">
                  <input type="number" name="price" value="<?= (int)$p['price'] ?>" class="w-20 px-2 py-1 text-xs border border-[#D5C7B0] rounded font-bold font-mono">
                  <button type="submit" class="text-[10px] bg-[#1F4D3A] text-white px-2 py-1 rounded">Save</button>
                </form>
              </td>
              <td class="p-3 font-mono text-[#C8922B] font-semibold"><?= htmlspecialchars($p['default_batch']) ?></td>
              <td class="p-3">
                <span class="px-2 py-0.5 rounded text-[10px] font-bold <?= $p['in_stock'] ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800' ?>">
                  <?= $p['in_stock'] ? 'IN STOCK' : 'OUT OF STOCK' ?>
                </span>
              </td>
              <td class="p-3 text-right">
                <form method="POST" class="inline">
                  <input type="hidden" name="action" value="toggle_stock">
                  <input type="hidden" name="product_id" value="<?= $p['id'] ?>">
                  <button type="submit" class="text-xs text-[#7A6B5D] hover:text-[#1F4D3A] underline font-medium">
                    Toggle Availability
                  </button>
                </form>
              </td>
            </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
    </div>
  </main>

</body>
</html>
