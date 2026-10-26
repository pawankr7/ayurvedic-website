<?php
/**
 * AARU AYURVEDA - Claims Review & Compliance Auditor
 * Enforces Drugs and Magic Remedies (Objectionable Advertisements) Act compliance
 */
require_once dirname(__DIR__) . '/config/config.php';
$db = getDB();

$stmt = $db->query("SELECT * FROM claims_audit ORDER BY id ASC");
$claims = $stmt->fetchAll();

$pageTitle = 'AYUSH Regulatory Claims Auditor | AARU Admin';
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
      <h1 class="font-bold text-base tracking-wide font-serif-luxury">AYUSH Regulatory Claims Auditor</h1>
    </div>
    <a href="<?= url('admin/index.php') ?>" class="text-xs text-[#FAF6EC] hover:text-[#C8922B]">← Back to Dashboard</a>
  </header>

  <nav class="bg-white border-b border-[#E8DEC8] px-6 py-2.5 flex space-x-6 text-xs font-bold text-[#7A6B5D] overflow-x-auto">
    <a href="<?= url('admin/index.php') ?>" class="hover:text-[#1F4D3A]">Dashboard</a>
    <a href="<?= url('admin/products.php') ?>" class="hover:text-[#1F4D3A]">Products & Stock</a>
    <a href="<?= url('admin/orders.php') ?>" class="hover:text-[#1F4D3A]">Orders & Fulfillment</a>
    <a href="<?= url('admin/batches.php') ?>" class="hover:text-[#1F4D3A]">Batch CoA Audit</a>
    <a href="<?= url('admin/leads.php') ?>" class="hover:text-[#1F4D3A]">Prakriti Quiz Leads</a>
    <a href="<?= url('admin/claims.php') ?>" class="text-[#1F4D3A] border-b-2 border-[#1F4D3A] pb-1 text-[#C8922B]">⚖️ Claims Auditor</a>
  </nav>

  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 space-y-6">
    <div class="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 leading-relaxed">
      <strong>⚖️ Regulatory Notice:</strong> Under the Drugs and Magic Remedies (Objectionable Advertisements) Act and Rule 170 of Drugs & Cosmetics Rules, terms claiming guaranteed cures for diabetes, cancer, blindness, or kidney stones are strictly illegal in marketing copy. This automated audit flags prohibited words and provides compliant Ayurvedic alternatives.
    </div>

    <div class="bg-white rounded-3xl p-6 border border-[#E8DEC8] shadow-sm overflow-x-auto">
      <table class="w-full text-xs text-left border border-[#E8DEC8] rounded-xl overflow-hidden">
        <thead class="bg-[#F4EFE2] text-[#3B2F25] font-bold">
          <tr>
            <th class="p-3">Category & Product</th>
            <th class="p-3">Proposed Marketing Phrase</th>
            <th class="p-3">Flagged Words</th>
            <th class="p-3">Recommended Compliant Copy</th>
            <th class="p-3">Compliance Status</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[#E8DEC8]">
          <?php foreach ($claims as $c): 
            $flags = json_decode($c['flagged_keywords_json'] ?? '[]', true);
          ?>
            <tr class="hover:bg-[#FAF6EC] align-top">
              <td class="p-3">
                <span class="font-bold text-[#1F4D3A] block"><?= htmlspecialchars($c['product_name']) ?></span>
                <span class="text-[10px] text-gray-500 uppercase"><?= htmlspecialchars($c['category']) ?></span>
              </td>
              <td class="p-3 text-red-700 bg-red-50/50 line-through max-w-xs">
                <?= htmlspecialchars($c['proposed_phrase']) ?>
              </td>
              <td class="p-3">
                <?php foreach ($flags as $f): ?>
                  <span class="inline-block bg-red-100 text-red-800 text-[10px] font-bold px-1.5 py-0.5 rounded mr-1 mb-1">
                    <?= htmlspecialchars($f) ?>
                  </span>
                <?php endforeach; ?>
              </td>
              <td class="p-3 text-emerald-800 bg-emerald-50/50 font-semibold max-w-xs">
                <?= htmlspecialchars($c['recommended_compliant_phrase']) ?>
              </td>
              <td class="p-3">
                <span class="bg-emerald-100 text-emerald-800 font-bold text-[10px] px-2 py-0.5 rounded">
                  ✓ <?= htmlspecialchars($c['ayush_compliance_status']) ?>
                </span>
              </td>
            </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
    </div>
  </main>

</body>
</html>
