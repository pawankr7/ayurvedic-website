<?php
/**
 * AARU AYURVEDA - Order Tracking Portal
 */
require_once __DIR__ . '/config/config.php';
$db = getDB();

$query = clean($_GET['q'] ?? '');
$order = null;
$searched = false;

if (!empty($query)) {
    $searched = true;
    $stmt = $db->prepare("SELECT * FROM orders WHERE order_number = :q OR customer_phone = :q ORDER BY created_at DESC LIMIT 1");
    $stmt->execute([':q' => $query]);
    $order = $stmt->fetch();
}

$pageTitle = 'Track Order | AARU Ayurveda';
$pageDescription = 'Track the live transit and delivery status of your Ayurvedic order.';

require_once __DIR__ . '/includes/header.php';
?>

<div class="bg-[#FAF6EC] py-12 border-b border-[#E8DEC8]">
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
    <span class="inline-block bg-[#DDE5D6] text-[#1F4D3A] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
      📦 Delhivery & BlueDart Express
    </span>
    <h1 class="text-3xl sm:text-4xl font-extrabold text-[#1F4D3A] font-serif-luxury">
      Track Your Shipment
    </h1>
    <p class="text-xs sm:text-sm text-[#7A6B5D] max-w-xl mx-auto leading-relaxed">
      Enter your Order Number (e.g. AARU-ORD-8821) or your 10-digit registered phone number to check live courier status.
    </p>

    <!-- Search Form -->
    <div class="max-w-md mx-auto pt-4">
      <form method="GET" class="flex gap-2">
        <input type="text" name="q" value="<?= htmlspecialchars($query) ?>" placeholder="Order # or Phone number" required class="flex-1 text-xs px-4 py-3 rounded-2xl border border-[#D5C7B0] bg-white text-[#1F4D3A] focus:outline-none focus:border-[#1F4D3A] shadow-sm">
        <button type="submit" class="btn-forest px-6 py-3 rounded-2xl text-xs uppercase tracking-wider font-bold">
          Track
        </button>
      </form>
    </div>
  </div>
</div>

<main class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
  <?php if ($searched && !$order): ?>
    <div class="text-center py-12 bg-white rounded-3xl border border-[#E8DEC8] p-8 shadow-sm">
      <div class="text-4xl mb-2">🔍</div>
      <h3 class="text-base font-bold text-[#1F4D3A] font-serif-luxury">No Order Found</h3>
      <p class="text-xs text-[#7A6B5D] mt-1">We couldn't find any orders matching "<strong><?= htmlspecialchars($query) ?></strong>".</p>
      <p class="text-xs text-[#7A6B5D] mt-1">Please verify the number entered or check your confirmation email.</p>
    </div>
  <?php elseif ($order): 
    $items = json_decode($order['items_json'] ?? '[]', true);
  ?>
    <div class="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DEC8] shadow-lg space-y-6">
      
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-[#E8DEC8] gap-2">
        <div>
          <span class="text-[10px] font-bold text-[#C8922B] uppercase tracking-wider">Order Status</span>
          <h2 class="text-xl font-bold text-[#1F4D3A] font-serif-luxury"><?= htmlspecialchars($order['order_number']) ?></h2>
          <span class="text-xs text-[#7A6B5D]">Placed on: <?= htmlspecialchars($order['created_at']) ?></span>
        </div>
        <span class="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase">
          <?= htmlspecialchars($order['order_status']) ?>
        </span>
      </div>

      <!-- Shipment Progress Bar -->
      <div class="bg-[#FAF6EC] rounded-2xl p-5 border border-[#E8DEC8] space-y-4">
        <div class="grid grid-cols-3 text-center text-xs font-bold">
          <div class="text-[#1F4D3A]">
            <div class="w-8 h-8 rounded-full bg-[#1F4D3A] text-white flex items-center justify-center mx-auto mb-1">✓</div>
            <span>Confirmed</span>
          </div>
          <div class="text-[#C8922B]">
            <div class="w-8 h-8 rounded-full bg-[#C8922B] text-white flex items-center justify-center mx-auto mb-1">✈️</div>
            <span>In Transit</span>
          </div>
          <div class="text-gray-400">
            <div class="w-8 h-8 rounded-full bg-[#E8DEC8] text-gray-500 flex items-center justify-center mx-auto mb-1">📦</div>
            <span>Delivered</span>
          </div>
        </div>

        <div class="pt-3 border-t border-[#E8DEC8] flex flex-col sm:flex-row justify-between text-xs text-[#7A6B5D] gap-2">
          <span>Carrier: <strong><?= htmlspecialchars($order['courier_partner']) ?></strong></span>
          <span>AWB: <strong class="font-mono text-[#1F4D3A]"><?= htmlspecialchars($order['tracking_number'] ?? 'DELH882910') ?></strong></span>
          <span>Payment: <strong><?= strtoupper($order['payment_method']) ?></strong></span>
        </div>
      </div>

      <!-- Items in Order -->
      <div class="space-y-2">
        <h3 class="font-bold text-xs uppercase tracking-wider text-[#7A6B5D]">Formulations in Package</h3>
        <div class="divide-y divide-[#E8DEC8] text-xs">
          <?php foreach ($items as $it): ?>
            <div class="py-2.5 flex justify-between items-center">
              <span><?= (int)$it['quantity'] ?>x <?= htmlspecialchars($it['name']) ?></span>
              <span class="font-bold text-[#1F4D3A]"><?= formatPrice($it['price'] * $it['quantity']) ?></span>
            </div>
          <?php endforeach; ?>
        </div>
      </div>

    </div>
  <?php endif; ?>
</main>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
