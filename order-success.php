<?php
/**
 * AARU AYURVEDA - Order Confirmation Page
 */
require_once __DIR__ . '/config/config.php';

$order = $_SESSION['last_order'] ?? null;
$orderNumber = clean($_GET['order'] ?? ($order['order_number'] ?? ''));

if (!empty($orderNumber) && !$order) {
    $db = getDB();
    $stmt = $db->prepare("SELECT * FROM orders WHERE order_number = :ord LIMIT 1");
    $stmt->execute([':ord' => $orderNumber]);
    $dbOrder = $stmt->fetch();
    if ($dbOrder) {
        $order = [
            'order_number' => $dbOrder['order_number'],
            'name' => $dbOrder['customer_name'],
            'phone' => $dbOrder['customer_phone'],
            'email' => $dbOrder['customer_email'],
            'address' => $dbOrder['shipping_address'] . ', ' . $dbOrder['city'] . ' - ' . $dbOrder['pincode'],
            'total' => (float)$dbOrder['total_amount'],
            'payment_method' => $dbOrder['payment_method'],
            'tracking_number' => $dbOrder['tracking_number'],
            'items' => json_decode($dbOrder['items_json'] ?? '[]', true)
        ];
    }
}

$pageTitle = 'Order Confirmed | AARU Ayurveda';
$pageDescription = 'Thank you for your order. Your authentic Ayurvedic formulation is being prepared under strict quality control.';

require_once __DIR__ . '/includes/header.php';
?>

<main class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
  <?php if (!$order): ?>
    <div class="text-center py-16 bg-white rounded-3xl border border-[#E8DEC8] p-8 shadow-sm">
      <h2 class="text-xl font-bold text-[#1F4D3A] font-serif-luxury">No Recent Order Found</h2>
      <p class="text-xs text-[#7A6B5D] mt-1">If you placed an order earlier, track it using your phone number or Order ID.</p>
      <a href="<?= url('track-order.php') ?>" class="mt-4 inline-block btn-forest px-6 py-2 rounded-xl text-xs font-bold">
        Track Your Order →
      </a>
    </div>
  <?php else: ?>
    
    <div class="bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#1F4D3A]/20 shadow-xl space-y-6">
      
      <!-- Success Icon & Header -->
      <div class="text-center space-y-2 border-b border-[#E8DEC8] pb-6">
        <div class="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-3xl mx-auto shadow-sm">
          ✓
        </div>
        <span class="text-xs font-bold text-[#C8922B] uppercase tracking-wider block">Order Successfully Placed</span>
        <h1 class="text-3xl font-extrabold text-[#1F4D3A] font-serif-luxury">
          Dhanyavaad, <?= htmlspecialchars($order['name']) ?>!
        </h1>
        <p class="text-xs sm:text-sm text-[#7A6B5D]">
          Your order <strong>#<?= htmlspecialchars($order['order_number']) ?></strong> has been received and sent to our GMP dispensary for dispatch.
        </p>
      </div>

      <!-- Tracking & Shipment Box -->
      <div class="bg-[#FAF6EC] rounded-2xl p-5 border border-[#E8DEC8] space-y-3 text-xs">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <span class="text-gray-500 block">Courier Partner:</span>
            <strong class="text-sm text-[#1F4D3A]">Delhivery Express Air</strong>
          </div>
          <div>
            <span class="text-gray-500 block">AWB Tracking Number:</span>
            <strong class="font-mono text-sm text-[#C8922B]"><?= htmlspecialchars($order['tracking_number']) ?></strong>
          </div>
          <div>
            <span class="text-gray-500 block">Estimated Delivery:</span>
            <strong class="text-sm text-emerald-800">Within 3-4 Business Days</strong>
          </div>
        </div>

        <div class="pt-2 border-t border-[#E8DEC8] flex flex-col sm:flex-row justify-between items-center text-[11px] text-[#7A6B5D] gap-2">
          <span>Delivery Address: <strong><?= htmlspecialchars($order['address']) ?></strong></span>
          <span class="font-bold text-[#1F4D3A]">Paid via <?= strtoupper($order['payment_method']) ?> (<?= formatPrice($order['total']) ?>)</span>
        </div>
      </div>

      <!-- Items Ordered -->
      <div class="space-y-3">
        <h3 class="font-bold text-sm text-[#1F4D3A] font-serif-luxury">Items in this Regimen Shipment</h3>
        <div class="divide-y divide-[#E8DEC8] border border-[#E8DEC8] rounded-2xl overflow-hidden bg-[#FAF6EC]">
          <?php foreach ($order['items'] as $item): ?>
            <div class="p-3.5 flex justify-between items-center text-xs">
              <div class="flex items-center space-x-3">
                <span class="font-bold text-[#1F4D3A]"><?= (int)$item['quantity'] ?>x</span>
                <div>
                  <h4 class="font-semibold text-[#3B2F25]"><?= htmlspecialchars($item['name']) ?></h4>
                  <?php if (!empty($item['batch'])): ?>
                    <a href="<?= url('verify-batch.php?batch=' . urlencode($item['batch'])) ?>" class="text-[10px] text-emerald-800 font-mono underline">
                      Verified Batch: <?= htmlspecialchars($item['batch']) ?>
                    </a>
                  <?php endif; ?>
                </div>
              </div>
              <span class="font-bold text-[#1F4D3A]"><?= formatPrice($item['price'] * $item['quantity']) ?></span>
            </div>
          <?php endforeach; ?>
        </div>
      </div>

      <!-- Actions -->
      <div class="pt-4 flex flex-col sm:flex-row gap-4">
        <a href="https://wa.me/919876543210?text=<?= urlencode('Hello AARU team, I placed order #' . $order['order_number'] . '. Please share dispatch updates on WhatsApp.') ?>" target="_blank" class="flex-1 bg-[#25D366] text-white py-3.5 rounded-xl text-xs font-bold text-center flex items-center justify-center space-x-2 shadow hover:bg-[#20ba59]">
          <span>💬 Get WhatsApp Updates on Dispatch</span>
        </a>
        <a href="<?= url('shop.php') ?>" class="btn-forest px-6 py-3.5 rounded-xl text-xs font-bold text-center">
          Back to Apothecary
        </a>
      </div>

    </div>

  <?php endif; ?>
</main>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
