<?php
/**
 * AARU AYURVEDA - Admin Batch CoA Audit
 */
require_once dirname(__DIR__) . '/config/config.php';
$db = getDB();

$stmt = $db->query("SELECT * FROM batches ORDER BY report_date DESC");
$batches = $stmt->fetchAll();

$pageTitle = 'Batch CoA Audit & Lab Reports | AARU Admin';
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
      <h1 class="font-bold text-base tracking-wide font-serif-luxury">NABL Batch CoA Audit</h1>
    </div>
    <a href="<?= url('admin/index.php') ?>" class="text-xs text-[#FAF6EC] hover:text-[#C8922B]">← Back to Dashboard</a>
  </header>

  <nav class="bg-white border-b border-[#E8DEC8] px-6 py-2.5 flex space-x-6 text-xs font-bold text-[#7A6B5D] overflow-x-auto">
    <a href="<?= url('admin/index.php') ?>" class="hover:text-[#1F4D3A]">Dashboard</a>
    <a href="<?= url('admin/products.php') ?>" class="hover:text-[#1F4D3A]">Products & Stock</a>
    <a href="<?= url('admin/orders.php') ?>" class="hover:text-[#1F4D3A]">Orders & Fulfillment</a>
    <a href="<?= url('admin/batches.php') ?>" class="text-[#1F4D3A] border-b-2 border-[#1F4D3A] pb-1">Batch CoA Audit</a>
    <a href="<?= url('admin/leads.php') ?>" class="hover:text-[#1F4D3A]">Prakriti Quiz Leads</a>
    <a href="<?= url('admin/claims.php') ?>" class="hover:text-[#1F4D3A] text-[#C8922B]">⚖️ Claims Auditor</a>
  </nav>

  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold text-[#1F4D3A] font-serif-luxury">NABL Laboratory Batch Certificates (<?= count($batches) ?>)</h2>
    </div>

    <div class="bg-white rounded-3xl p-6 border border-[#E8DEC8] shadow-sm overflow-x-auto">
      <table class="w-full text-xs text-left border border-[#E8DEC8] rounded-xl overflow-hidden">
        <thead class="bg-[#F4EFE2] text-[#3B2F25] font-bold">
          <tr>
            <th class="p-3">Batch Code</th>
            <th class="p-3">Product Name</th>
            <th class="p-3">Testing Laboratory</th>
            <th class="p-3">Report Date</th>
            <th class="p-3">Status</th>
            <th class="p-3 text-right">Certificate</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[#E8DEC8]">
          <?php foreach ($batches as $b): ?>
            <tr class="hover:bg-[#FAF6EC]">
              <td class="p-3 font-mono font-bold text-[#1F4D3A]"><?= htmlspecialchars($b['batch_number']) ?></td>
              <td class="p-3 font-semibold"><?= htmlspecialchars($b['product_name']) ?></td>
              <td class="p-3 text-gray-600"><?= htmlspecialchars($b['testing_lab']) ?></td>
              <td class="p-3 text-gray-500"><?= htmlspecialchars($b['report_date']) ?></td>
              <td class="p-3">
                <span class="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                  ✓ <?= htmlspecialchars($b['status']) ?>
                </span>
              </td>
              <td class="p-3 text-right">
                <a href="<?= url('verify-batch.php?batch=' . urlencode($b['batch_number'])) ?>" target="_blank" class="text-xs text-[#C8922B] font-bold hover:underline">
                  Inspect CoA →
                </a>
              </td>
            </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
    </div>
  </main>

</body>
</html>
