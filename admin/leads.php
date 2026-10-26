<?php
/**
 * AARU AYURVEDA - Admin Prakriti Quiz Leads Manager
 */
require_once dirname(__DIR__) . '/config/config.php';
$db = getDB();

$stmt = $db->query("SELECT * FROM quiz_leads ORDER BY created_at DESC");
$leads = $stmt->fetchAll();

$pageTitle = 'Prakriti Quiz Leads Manager | AARU Admin';
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
      <h1 class="font-bold text-base tracking-wide font-serif-luxury">Prakriti Diagnostic Leads</h1>
    </div>
    <a href="<?= url('admin/index.php') ?>" class="text-xs text-[#FAF6EC] hover:text-[#C8922B]">← Back to Dashboard</a>
  </header>

  <nav class="bg-white border-b border-[#E8DEC8] px-6 py-2.5 flex space-x-6 text-xs font-bold text-[#7A6B5D] overflow-x-auto">
    <a href="<?= url('admin/index.php') ?>" class="hover:text-[#1F4D3A]">Dashboard</a>
    <a href="<?= url('admin/products.php') ?>" class="hover:text-[#1F4D3A]">Products & Stock</a>
    <a href="<?= url('admin/orders.php') ?>" class="hover:text-[#1F4D3A]">Orders & Fulfillment</a>
    <a href="<?= url('admin/batches.php') ?>" class="hover:text-[#1F4D3A]">Batch CoA Audit</a>
    <a href="<?= url('admin/leads.php') ?>" class="text-[#1F4D3A] border-b-2 border-[#1F4D3A] pb-1">Prakriti Quiz Leads</a>
    <a href="<?= url('admin/claims.php') ?>" class="hover:text-[#1F4D3A] text-[#C8922B]">⚖️ Claims Auditor</a>
  </nav>

  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold text-[#1F4D3A] font-serif-luxury">Diagnostic Quiz Leads (<?= count($leads) ?>)</h2>
      <a href="data:text/csv;charset=utf-8,<?= urlencode("Name,Phone,Email,Dosha,Concern\n" . implode("\n", array_map(fn($l) => "{$l['full_name']},{$l['phone']},{$l['email']},{$l['primary_dosha']},{$l['selected_concern']}", $leads))) ?>" download="prakriti_leads.csv" class="btn-forest px-4 py-2 rounded-xl text-xs font-bold shadow-sm">
        Export CSV
      </a>
    </div>

    <div class="bg-white rounded-3xl p-6 border border-[#E8DEC8] shadow-sm overflow-x-auto">
      <table class="w-full text-xs text-left border border-[#E8DEC8] rounded-xl overflow-hidden">
        <thead class="bg-[#F4EFE2] text-[#3B2F25] font-bold">
          <tr>
            <th class="p-3">Patient Name</th>
            <th class="p-3">Contact (WhatsApp)</th>
            <th class="p-3">Dominant Dosha</th>
            <th class="p-3">Scores (V/P/K)</th>
            <th class="p-3">Primary Concern</th>
            <th class="p-3">Submitted On</th>
            <th class="p-3 text-right">Action</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[#E8DEC8]">
          <?php foreach ($leads as $l): ?>
            <tr class="hover:bg-[#FAF6EC]">
              <td class="p-3 font-bold text-[#1F4D3A]"><?= htmlspecialchars($l['full_name']) ?></td>
              <td class="p-3">
                <a href="https://wa.me/<?= preg_replace('/\D/', '', $l['phone']) ?>" target="_blank" class="text-emerald-700 font-bold hover:underline flex items-center space-x-1">
                  <span>💬</span>
                  <span><?= htmlspecialchars($l['phone']) ?></span>
                </a>
                <span class="text-[10px] text-gray-400"><?= htmlspecialchars($l['email'] ?: 'No email') ?></span>
              </td>
              <td class="p-3 font-bold text-[#C8922B]"><?= htmlspecialchars($l['primary_dosha']) ?></td>
              <td class="p-3 font-mono text-[11px]">V:<?= $l['vata_score'] ?> P:<?= $l['pitta_score'] ?> K:<?= $l['kapha_score'] ?></td>
              <td class="p-3 capitalize"><?= htmlspecialchars($l['selected_concern']) ?></td>
              <td class="p-3 text-gray-400"><?= htmlspecialchars($l['created_at']) ?></td>
              <td class="p-3 text-right">
                <a href="https://wa.me/<?= preg_replace('/\D/', '', $l['phone']) ?>?text=<?= urlencode("Namaste {$l['full_name']}, this is Vaidya Desk at AARU Ayurveda regarding your {$l['primary_dosha']} Prakriti diet chart.") ?>" target="_blank" class="btn-gold px-2.5 py-1 rounded text-[10px] font-bold">
                  Send WhatsApp Protocol
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
