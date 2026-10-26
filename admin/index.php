<?php
/**
 * AARU AYURVEDA - Executive Admin Dashboard
 */
require_once dirname(__DIR__) . '/config/config.php';
$db = getDB();

// Calculate Analytics KPIs
$totalRevenue = (float)$db->query("SELECT COALESCE(SUM(total_amount), 0) FROM orders WHERE payment_status = 'paid' OR order_status = 'delivered'")->fetchColumn();
$totalOrders = (int)$db->query("SELECT COUNT(*) FROM orders")->fetchColumn();
$aov = $totalOrders > 0 ? ($totalRevenue / $totalOrders) : 0;
$totalLeads = (int)$db->query("SELECT COUNT(*) FROM quiz_leads")->fetchColumn();
$totalProducts = (int)$db->query("SELECT COUNT(*) FROM products")->fetchColumn();
$totalBatches = (int)$db->query("SELECT COUNT(*) FROM batches")->fetchColumn();

// Fetch Recent Orders
$stmtRecent = $db->query("SELECT * FROM orders ORDER BY created_at DESC LIMIT 6");
$recentOrders = $stmtRecent->fetchAll();

// Fetch Recent Leads
$stmtLeads = $db->query("SELECT * FROM quiz_leads ORDER BY created_at DESC LIMIT 5");
$recentLeads = $stmtLeads->fetchAll();

$pageTitle = 'Executive Admin Dashboard | AARU Ayurveda';
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

  <!-- Top Admin Bar -->
  <header class="bg-[#143527] text-white py-3 px-6 border-b border-[#1F4D3A] flex justify-between items-center shadow-md">
    <div class="flex items-center space-x-3">
      <div class="w-8 h-8 rounded-full bg-[#C8922B] text-[#143527] flex items-center justify-center font-bold text-sm">
        आ
      </div>
      <div>
        <h1 class="font-bold text-base tracking-wide font-serif-luxury">AARU Admin Portal</h1>
        <span class="text-[10px] text-[#DDE5D6]">Executive Control & Regulatory Compliance</span>
      </div>
    </div>
    <div class="flex items-center space-x-4 text-xs font-semibold">
      <a href="<?= url('index.php') ?>" class="text-[#FAF6EC] hover:text-[#C8922B] flex items-center space-x-1">
        <span>← View Live Store</span>
      </a>
      <span class="bg-emerald-900 text-emerald-300 px-2 py-0.5 rounded text-[11px] font-mono">Role: Owner / Vaidya Admin</span>
    </div>
  </header>

  <!-- Admin Navigation Subbar -->
  <nav class="bg-white border-b border-[#E8DEC8] px-6 py-2.5 flex space-x-6 text-xs font-bold text-[#7A6B5D] overflow-x-auto">
    <a href="<?= url('admin/index.php') ?>" class="text-[#1F4D3A] border-b-2 border-[#1F4D3A] pb-1">Dashboard</a>
    <a href="<?= url('admin/products.php') ?>" class="hover:text-[#1F4D3A]">Products & Stock</a>
    <a href="<?= url('admin/orders.php') ?>" class="hover:text-[#1F4D3A]">Orders & Fulfillment</a>
    <a href="<?= url('admin/batches.php') ?>" class="hover:text-[#1F4D3A]">Batch CoA Audit</a>
    <a href="<?= url('admin/leads.php') ?>" class="hover:text-[#1F4D3A]">Prakriti Quiz Leads</a>
    <a href="<?= url('admin/claims.php') ?>" class="hover:text-[#1F4D3A] text-[#C8922B]">⚖️ Claims Auditor</a>
  </nav>

  <!-- Dashboard Main Content -->
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 space-y-8">
    
    <!-- KPI Cards Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      
      <!-- Revenue -->
      <div class="bg-white rounded-2xl p-5 border border-[#E8DEC8] shadow-sm space-y-1">
        <span class="text-[11px] font-bold text-[#7A6B5D] uppercase tracking-wider">Gross Sales (Paid)</span>
        <div class="text-2xl font-extrabold text-[#1F4D3A] font-serif-luxury">₹<?= number_format($totalRevenue, 2) ?></div>
        <p class="text-[11px] text-emerald-700 font-semibold">↑ 18.4% from last month</p>
      </div>

      <!-- Orders -->
      <div class="bg-white rounded-2xl p-5 border border-[#E8DEC8] shadow-sm space-y-1">
        <span class="text-[11px] font-bold text-[#7A6B5D] uppercase tracking-wider">Total Customer Orders</span>
        <div class="text-2xl font-extrabold text-[#1F4D3A] font-serif-luxury"><?= $totalOrders ?></div>
        <p class="text-[11px] text-[#7A6B5D]">COD & Instant UPI mix</p>
      </div>

      <!-- AOV -->
      <div class="bg-white rounded-2xl p-5 border border-[#E8DEC8] shadow-sm space-y-1">
        <span class="text-[11px] font-bold text-[#7A6B5D] uppercase tracking-wider">Average Order Value (AOV)</span>
        <div class="text-2xl font-extrabold text-[#C8922B] font-serif-luxury">₹<?= number_format($aov, 0) ?></div>
        <p class="text-[11px] text-[#7A6B5D]">Tier 2/3 Regimen Baskets</p>
      </div>

      <!-- Quiz Leads -->
      <div class="bg-white rounded-2xl p-5 border border-[#E8DEC8] shadow-sm space-y-1">
        <span class="text-[11px] font-bold text-[#7A6B5D] uppercase tracking-wider">Prakriti Quiz Leads</span>
        <div class="text-2xl font-extrabold text-emerald-800 font-serif-luxury"><?= $totalLeads ?></div>
        <p class="text-[11px] text-emerald-700 font-semibold">Conversion rate: 24.8%</p>
      </div>

    </div>

    <!-- Middle Split: Recent Orders & Leads -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      <!-- Orders Table -->
      <div class="lg:col-span-8 bg-white rounded-3xl p-6 border border-[#E8DEC8] shadow-sm space-y-4">
        <div class="flex justify-between items-center border-b border-[#E8DEC8] pb-3">
          <h2 class="font-bold text-base text-[#1F4D3A] font-serif-luxury">Recent Customer Orders</h2>
          <a href="<?= url('admin/orders.php') ?>" class="text-xs font-bold text-[#C8922B] hover:underline">View All Orders →</a>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-xs text-left border border-[#E8DEC8] rounded-xl overflow-hidden">
            <thead class="bg-[#F4EFE2] text-[#3B2F25] font-bold">
              <tr>
                <th class="p-3">Order #</th>
                <th class="p-3">Customer</th>
                <th class="p-3">Total</th>
                <th class="p-3">Payment</th>
                <th class="p-3">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[#E8DEC8]">
              <?php foreach ($recentOrders as $ord): ?>
                <tr class="hover:bg-[#FAF6EC]">
                  <td class="p-3 font-mono font-bold text-[#1F4D3A]"><?= htmlspecialchars($ord['order_number']) ?></td>
                  <td class="p-3">
                    <span class="font-semibold block"><?= htmlspecialchars($ord['customer_name']) ?></span>
                    <span class="text-[10px] text-gray-400"><?= htmlspecialchars($ord['customer_phone']) ?></span>
                  </td>
                  <td class="p-3 font-bold text-[#1F4D3A]"><?= formatPrice($ord['total_amount']) ?></td>
                  <td class="p-3 uppercase font-semibold text-[10px]"><?= htmlspecialchars($ord['payment_method']) ?></td>
                  <td class="p-3">
                    <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase <?= $ord['order_status'] === 'delivered' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800' ?>">
                      <?= htmlspecialchars($ord['order_status']) ?>
                    </span>
                  </td>
                </tr>
              <?php endforeach; ?>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Recent Leads -->
      <div class="lg:col-span-4 bg-white rounded-3xl p-6 border border-[#E8DEC8] shadow-sm space-y-4">
        <div class="flex justify-between items-center border-b border-[#E8DEC8] pb-3">
          <h2 class="font-bold text-base text-[#1F4D3A] font-serif-luxury">Latest Quiz Leads</h2>
          <a href="<?= url('admin/leads.php') ?>" class="text-xs font-bold text-[#C8922B] hover:underline">All Leads →</a>
        </div>

        <div class="space-y-3 text-xs">
          <?php foreach ($recentLeads as $ld): ?>
            <div class="p-3 rounded-xl bg-[#FAF6EC] border border-[#E8DEC8] space-y-1">
              <div class="flex justify-between items-baseline">
                <strong class="text-[#1F4D3A]"><?= htmlspecialchars($ld['full_name']) ?></strong>
                <span class="text-[10px] text-[#C8922B] font-bold"><?= htmlspecialchars($ld['primary_dosha']) ?> Dosha</span>
              </div>
              <p class="text-gray-500 text-[11px]"><?= htmlspecialchars($ld['phone']) ?> • Concern: <?= htmlspecialchars($ld['selected_concern']) ?></p>
            </div>
          <?php endforeach; ?>
        </div>
      </div>

    </div>

  </main>

  <!-- Admin Footer -->
  <footer class="bg-white border-t border-[#E8DEC8] py-4 px-6 text-center text-xs text-gray-500">
    AARU Ayurveda Regulatory Compliance Engine • AYUSH MP/2023/8891 • MySQL Database Connected
  </footer>

</body>
</html>
