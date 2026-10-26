<?php
/**
 * AARU AYURVEDA - Admin Orders & Fulfillment
 */
require_once dirname(__DIR__) . '/config/config.php';
$db = getDB();

$msg = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $orderId = clean($_POST['order_id'] ?? '');
    $newStatus = clean($_POST['status'] ?? '');
    $tracking = clean($_POST['tracking_number'] ?? '');

    if (!empty($orderId) && !empty($newStatus)) {
        $stmt = $db->prepare("UPDATE orders SET order_status = :status, tracking_number = :tracking WHERE id = :id");
        $stmt->execute([':status' => $newStatus, ':tracking' => $tracking, ':id' => $orderId]);
        $msg = "Order status updated to $newStatus.";
    }
}

$stmt = $db->query("SELECT * FROM orders ORDER BY created_at DESC");
$orders = $stmt->fetchAll();

$pageTitle = 'Orders & Logistics Management | AARU Admin';
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
      <h1 class="font-bold text-base tracking-wide font-serif-luxury">AARU Orders & Fulfillment</h1>
    </div>
    <a href="<?= url('admin/index.php') ?>" class="text-xs text-[#FAF6EC] hover:text-[#C8922B]">← Back to Dashboard</a>
  </header>

  <nav class="bg-white border-b border-[#E8DEC8] px-6 py-2.5 flex space-x-6 text-xs font-bold text-[#7A6B5D] overflow-x-auto">
    <a href="<?= url('admin/index.php') ?>" class="hover:text-[#1F4D3A]">Dashboard</a>
    <a href="<?= url('admin/products.php') ?>" class="hover:text-[#1F4D3A]">Products & Stock</a>
    <a href="<?= url('admin/orders.php') ?>" class="text-[#1F4D3A] border-b-2 border-[#1F4D3A] pb-1">Orders & Fulfillment</a>
    <a href="<?= url('admin/batches.php') ?>" class="hover:text-[#1F4D3A]">Batch CoA Audit</a>
    <a href="<?= url('admin/leads.php') ?>" class="hover:text-[#1F4D3A]">Prakriti Quiz Leads</a>
    <a href="<?= url('admin/claims.php') ?>" class="hover:text-[#1F4D3A] text-[#C8922B]">⚖️ Claims Auditor</a>
  </nav>

  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold text-[#1F4D3A] font-serif-luxury">Customer Orders (<?= count($orders) ?>)</h2>
      <?php if (!empty($msg)): ?>
        <span class="text-xs bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-bold"><?= htmlspecialchars($msg) ?></span>
      <?php endif; ?>
    </div>

    <div class="bg-white rounded-3xl p-6 border border-[#E8DEC8] shadow-sm overflow-x-auto">
      <table class="w-full text-xs text-left border border-[#E8DEC8] rounded-xl overflow-hidden">
        <thead class="bg-[#F4EFE2] text-[#3B2F25] font-bold">
          <tr>
            <th class="p-3">Order Number</th>
            <th class="p-3">Customer & Contact</th>
            <th class="p-3">Shipping Address</th>
            <th class="p-3">Items Summary</th>
            <th class="p-3">Total</th>
            <th class="p-3">Status & Action</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[#E8DEC8]">
          <?php foreach ($orders as $ord): 
            $items = json_decode($ord['items_json'] ?? '[]', true);
          ?>
            <tr class="hover:bg-[#FAF6EC] align-top">
              <td class="p-3">
                <span class="font-mono font-bold text-[#1F4D3A] text-sm block"><?= htmlspecialchars($ord['order_number']) ?></span>
                <span class="text-[10px] text-gray-400"><?= htmlspecialchars($ord['created_at']) ?></span>
                <span class="inline-block mt-1 font-semibold uppercase text-[9px] px-1.5 py-0.5 rounded bg-gray-100">
                  <?= htmlspecialchars($ord['payment_method']) ?> (<?= htmlspecialchars($ord['payment_status']) ?>)
                </span>
              </td>
              <td class="p-3">
                <strong class="text-[#3B2F25] block"><?= htmlspecialchars($ord['customer_name']) ?></strong>
                <a href="https://wa.me/<?= preg_replace('/\D/', '', $ord['customer_phone']) ?>" target="_blank" class="text-emerald-700 font-bold hover:underline block">
                  💬 <?= htmlspecialchars($ord['customer_phone']) ?>
                </a>
                <span class="text-[10px] text-gray-500"><?= htmlspecialchars($ord['customer_email']) ?></span>
              </td>
              <td class="p-3 max-w-xs text-gray-600">
                <?= htmlspecialchars($ord['shipping_address']) ?><br>
                <strong><?= htmlspecialchars($ord['city']) ?>, <?= htmlspecialchars($ord['state']) ?> - <?= htmlspecialchars($ord['pincode']) ?></strong>
              </td>
              <td class="p-3 space-y-1">
                <?php foreach ($items as $it): ?>
                  <div class="text-[11px]">
                    <span class="font-bold text-[#1F4D3A]"><?= (int)$it['quantity'] ?>x</span>
                    <span><?= htmlspecialchars($it['name']) ?></span>
                  </div>
                <?php endforeach; ?>
              </td>
              <td class="p-3 font-bold text-sm text-[#1F4D3A]">
                <?= formatPrice($ord['total_amount']) ?>
              </td>
              <td class="p-3">
                <form method="POST" class="space-y-1.5">
                  <input type="hidden" name="order_id" value="<?= $ord['id'] ?>">
                  <select name="status" class="w-full text-xs px-2 py-1 rounded border border-[#D5C7B0] font-semibold bg-white">
                    <option value="confirmed" <?= $ord['order_status'] === 'confirmed' ? 'selected' : '' ?>>Confirmed</option>
                    <option value="processing" <?= $ord['order_status'] === 'processing' ? 'selected' : '' ?>>Processing</option>
                    <option value="shipped" <?= $ord['order_status'] === 'shipped' ? 'selected' : '' ?>>Shipped</option>
                    <option value="delivered" <?= $ord['order_status'] === 'delivered' ? 'selected' : '' ?>>Delivered</option>
                    <option value="cancelled" <?= $ord['order_status'] === 'cancelled' ? 'selected' : '' ?>>Cancelled</option>
                  </select>
                  <input type="text" name="tracking_number" value="<?= htmlspecialchars($ord['tracking_number'] ?? '') ?>" placeholder="AWB Number" class="w-full text-[11px] px-2 py-1 border border-[#D5C7B0] rounded font-mono">
                  <button type="submit" class="w-full btn-forest py-1 text-[11px] rounded font-bold">Update</button>
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
