<?php
/**
 * AARU AYURVEDA - Seamless Checkout Page
 */
require_once __DIR__ . '/config/config.php';
$cartSummary = getCartSummary();

$isEmptyCart = empty($cartSummary['items']);
$error = '';
$db = getDB();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = clean($_POST['name'] ?? '');
    $phone = clean($_POST['phone'] ?? '');
    $email = clean($_POST['email'] ?? '');
    $address = clean($_POST['address'] ?? '');
    $city = clean($_POST['city'] ?? '');
    $state = clean($_POST['state'] ?? '');
    $pincode = clean($_POST['pincode'] ?? '');
    $paymentMethod = clean($_POST['payment_method'] ?? 'upi');
    $isSubscription = !empty($_POST['subscription']);

    if (empty($name) || empty($phone) || empty($address) || empty($pincode)) {
        $error = 'Please fill in all mandatory delivery fields (Name, Phone, Address, Pincode).';
    } elseif (strlen($pincode) !== 6 || !ctype_digit($pincode)) {
        $error = 'Please enter a valid 6-digit Indian PIN code.';
    } else {
        // Calculate Totals
        $subtotal = $cartSummary['subtotal'];
        $discount = 0.0;

        if ($isSubscription) {
            $discount += ($subtotal * (SUBSCRIPTION_DISCOUNT_PERCENT / 100));
        }

        if ($paymentMethod === 'upi') {
            $discount += ($subtotal * (UPI_DISCOUNT_PERCENT / 100));
        }

        $shippingFee = ($subtotal >= FREE_SHIPPING_THRESHOLD) ? 0.0 : 70.0;
        $totalAmount = max(0, ($subtotal - $discount) + $shippingFee);

        $orderNumber = 'AARU-ORD-' . mt_rand(10000, 99999);
        $trackingNumber = 'DELH' . mt_rand(100000000, 999999999);

        try {
            $stmt = $db->prepare("INSERT INTO orders (
                order_number, customer_name, customer_phone, customer_email, shipping_address,
                city, state, pincode, payment_method, payment_status, order_status,
                subtotal, discount, shipping_fee, total_amount, items_json, tracking_number, courier_partner
            ) VALUES (
                :order_number, :customer_name, :customer_phone, :customer_email, :shipping_address,
                :city, :state, :pincode, :payment_method, :payment_status, 'confirmed',
                :subtotal, :discount, :shipping_fee, :total_amount, :items_json, :tracking_number, 'Delhivery Express Air'
            )");

            $stmt->execute([
                ':order_number' => $orderNumber,
                ':customer_name' => $name,
                ':customer_phone' => $phone,
                ':customer_email' => $email,
                ':shipping_address' => $address,
                ':city' => $city,
                ':state' => $state,
                ':pincode' => $pincode,
                ':payment_method' => $paymentMethod,
                ':payment_status' => ($paymentMethod === 'upi') ? 'paid' : 'pending',
                ':subtotal' => $subtotal,
                ':discount' => $discount,
                ':shipping_fee' => $shippingFee,
                ':total_amount' => $totalAmount,
                ':items_json' => json_encode($cartSummary['items'], JSON_UNESCAPED_UNICODE),
                ':tracking_number' => $trackingNumber
            ]);

            // Save order into session for success page
            $_SESSION['last_order'] = [
                'order_number' => $orderNumber,
                'name' => $name,
                'phone' => $phone,
                'email' => $email,
                'address' => $address . ', ' . $city . ', ' . $state . ' - ' . $pincode,
                'total' => $totalAmount,
                'payment_method' => $paymentMethod,
                'tracking_number' => $trackingNumber,
                'items' => $cartSummary['items']
            ];

            // Empty cart
            $_SESSION['cart'] = [];

            header("Location: " . url('order-success.php'));
            exit;

        } catch (PDOException $e) {
            $error = 'Order placement failed: ' . $e->getMessage();
        }
    }
}

$pageTitle = 'Secure Checkout | AARU Ayurveda';
$pageDescription = 'Complete your order with Cash on Delivery or Instant UPI. Fast express delivery across India.';

require_once __DIR__ . '/includes/header.php';
?>

<div class="bg-[#FAF6EC] py-8 border-b border-[#E8DEC8]">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 class="text-3xl font-extrabold text-[#1F4D3A] font-serif-luxury">
      <?= CURRENT_LANG === 'hi' ? 'सुरक्षित चेकआउट (Checkout)' : 'Secure Express Checkout' ?>
    </h1>
    <p class="text-xs text-[#7A6B5D] mt-1">256-Bit SSL Encrypted • Cash on Delivery & Instant UPI Available</p>
  </div>
</div>

<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
  <?php if ($isEmptyCart): ?>
    <div class="text-center py-20 bg-white rounded-3xl border border-[#E8DEC8] p-8 shadow-sm">
      <div class="text-6xl mb-4 text-[#1F4D3A]">🌿</div>
      <h2 class="text-2xl font-bold text-[#1F4D3A] font-serif-luxury">Your Regimen Bag is Empty</h2>
      <p class="text-xs text-[#7A6B5D] mt-1">Please select formulations or take the diagnostic quiz before checking out.</p>
      <div class="mt-6 flex justify-center gap-4">
        <a href="<?= url('shop.php') ?>" class="btn-forest px-6 py-3 rounded-xl text-xs uppercase tracking-wider font-bold">
          Explore Apothecary
        </a>
        <a href="<?= url('prakriti-quiz.php') ?>" class="btn-gold px-6 py-3 rounded-xl text-xs uppercase tracking-wider font-bold">
          Take Prakriti Quiz
        </a>
      </div>
    </div>
  <?php else: ?>
    <?php if (!empty($error)): ?>
      <div class="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center space-x-2">
        <span>⚠️</span>
        <span><?= htmlspecialchars($error) ?></span>
      </div>
    <?php endif; ?>

    <form method="POST" class="grid grid-cols-1 lg:grid-cols-12 gap-10">
    
    <!-- Shipping Information Form -->
    <div class="lg:col-span-7 space-y-6">
      
      <!-- Contact Details -->
      <div class="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DEC8] shadow-sm space-y-4">
        <h2 class="font-bold text-lg text-[#1F4D3A] font-serif-luxury border-b border-[#E8DEC8] pb-3 flex items-center space-x-2">
          <span>1.</span>
          <span>Contact & Shipping Details</span>
        </h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold text-[#1F4D3A] mb-1">Full Name *</label>
            <input type="text" name="name" required placeholder="e.g. Ramesh Chandra" class="w-full text-xs px-4 py-3 rounded-xl border border-[#D5C7B0] focus:outline-none focus:border-[#1F4D3A]">
          </div>
          <div>
            <label class="block text-xs font-bold text-[#1F4D3A] mb-1">WhatsApp / Mobile Number *</label>
            <input type="tel" name="phone" required placeholder="e.g. +91 98765 43210" class="w-full text-xs px-4 py-3 rounded-xl border border-[#D5C7B0] focus:outline-none focus:border-[#1F4D3A]">
          </div>
        </div>

        <div>
          <label class="block text-xs font-bold text-[#1F4D3A] mb-1">Email Address (For Tax Invoice & CoA)</label>
          <input type="email" name="email" placeholder="e.g. ramesh@gmail.com" class="w-full text-xs px-4 py-3 rounded-xl border border-[#D5C7B0] focus:outline-none focus:border-[#1F4D3A]">
        </div>

        <div>
          <label class="block text-xs font-bold text-[#1F4D3A] mb-1">Street Address, House/Flat No, Landmark *</label>
          <textarea name="address" required rows="2" placeholder="e.g. Flat 302, Royal Residency, Near Metro Pillar 140" class="w-full text-xs px-4 py-3 rounded-xl border border-[#D5C7B0] focus:outline-none focus:border-[#1F4D3A]"></textarea>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label class="block text-xs font-bold text-[#1F4D3A] mb-1">City / Town *</label>
            <input type="text" name="city" required placeholder="e.g. Jaipur" class="w-full text-xs px-4 py-3 rounded-xl border border-[#D5C7B0] focus:outline-none focus:border-[#1F4D3A]">
          </div>
          <div>
            <label class="block text-xs font-bold text-[#1F4D3A] mb-1">State *</label>
            <input type="text" name="state" required placeholder="e.g. Rajasthan" class="w-full text-xs px-4 py-3 rounded-xl border border-[#D5C7B0] focus:outline-none focus:border-[#1F4D3A]">
          </div>
          <div>
            <label class="block text-xs font-bold text-[#1F4D3A] mb-1">6-Digit PIN Code *</label>
            <input type="text" name="pincode" maxlength="6" required placeholder="e.g. 302001" class="w-full text-xs px-4 py-3 rounded-xl border border-[#D5C7B0] font-mono focus:outline-none focus:border-[#1F4D3A]">
          </div>
        </div>

      </div>

      <!-- Payment Method Selection -->
      <div class="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DEC8] shadow-sm space-y-4">
        <h2 class="font-bold text-lg text-[#1F4D3A] font-serif-luxury border-b border-[#E8DEC8] pb-3 flex items-center space-x-2">
          <span>2.</span>
          <span>Payment Method</span>
        </h2>

        <div class="space-y-3">
          <!-- UPI Option -->
          <label class="block cursor-pointer p-4 rounded-2xl border-2 border-emerald-500 bg-emerald-50/50 flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <input type="radio" name="payment_method" value="upi" checked class="w-4 h-4 accent-[#1F4D3A]">
              <div>
                <span class="font-bold text-sm text-[#1F4D3A] block">Instant Prepaid UPI (GPay, PhonePe, Paytm, QR)</span>
                <span class="text-xs text-emerald-800 font-semibold">⚡ Extra 5% Instant Savings Applied Automatically!</span>
              </div>
            </div>
            <span class="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">RECOMMENDED</span>
          </label>

          <!-- COD Option -->
          <label class="block cursor-pointer p-4 rounded-2xl border-2 border-[#E8DEC8] hover:border-[#1F4D3A] bg-[#FAF6EC] flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <input type="radio" name="payment_method" value="cod" class="w-4 h-4 accent-[#1F4D3A]">
              <div>
                <span class="font-bold text-sm text-[#3B2F25] block">Cash on Delivery (COD)</span>
                <span class="text-xs text-[#7A6B5D]">Pay cash or scan QR when delivery partner arrives at doorstep.</span>
              </div>
            </div>
            <span class="text-xs text-[#7A6B5D]">Standard</span>
          </label>
        </div>

        <!-- 30-Day Regimen Subscription Toggle -->
        <div class="border border-[#C8922B]/40 bg-[#FAF0D9]/50 rounded-2xl p-4 flex items-center space-x-3 mt-4">
          <input type="checkbox" name="subscription" id="sub-check" class="w-5 h-5 accent-[#C8922B] rounded">
          <label for="sub-check" class="text-xs text-[#3B2F25] cursor-pointer">
            <strong class="text-[#1F4D3A]">Enroll in 30-Day Monthly Regimen Refill:</strong> Save an additional <strong>15% OFF</strong> on all refills. Hassle-free automatic monthly delivery.
          </label>
        </div>

      </div>

    </div>

    <!-- Right Summary Column -->
    <div class="lg:col-span-5 space-y-4">
      <div class="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DEC8] shadow-sm space-y-4">
        <h3 class="font-bold text-lg text-[#1F4D3A] font-serif-luxury border-b border-[#E8DEC8] pb-3">Your Regimen Items</h3>

        <div class="divide-y divide-[#E8DEC8] max-h-72 overflow-y-auto pr-1">
          <?php foreach ($cartSummary['items'] as $item): ?>
            <div class="py-3 flex items-center justify-between text-xs">
              <div class="flex items-center space-x-2">
                <span class="font-bold text-[#1F4D3A]"><?= (int)$item['quantity'] ?>x</span>
                <div>
                  <h4 class="font-semibold text-[#3B2F25] truncate w-40"><?= htmlspecialchars($item['name']) ?></h4>
                  <span class="text-[10px] text-emerald-800 font-mono">Batch: <?= htmlspecialchars($item['batch'] ?? 'AARU') ?></span>
                </div>
              </div>
              <span class="font-bold text-[#1F4D3A]"><?= formatPrice($item['price'] * $item['quantity']) ?></span>
            </div>
          <?php endforeach; ?>
        </div>

        <div class="pt-3 border-t border-[#E8DEC8] space-y-2 text-xs text-[#7A6B5D]">
          <div class="flex justify-between">
            <span>Subtotal:</span>
            <span class="font-bold text-[#3B2F25]"><?= formatPrice($cartSummary['subtotal']) ?></span>
          </div>
          <div class="flex justify-between">
            <span>Express Shipping:</span>
            <span><?= $cartSummary['shippingFee'] == 0 ? '<strong class="text-emerald-700">FREE</strong>' : formatPrice($cartSummary['shippingFee']) ?></span>
          </div>
          <div class="flex justify-between text-emerald-800 bg-emerald-50 p-2 rounded-lg font-medium">
            <span>Instant Prepaid UPI Discount (5%):</span>
            <span class="font-bold font-mono">- <?= formatPrice($cartSummary['subtotal'] * 0.05) ?></span>
          </div>
        </div>

        <div class="pt-3 border-t border-[#E8DEC8] flex justify-between items-baseline">
          <span class="font-bold text-sm text-[#3B2F25]">Final Amount:</span>
          <span class="font-extrabold text-2xl text-[#1F4D3A]">
            <?= formatPrice(max(0, ($cartSummary['subtotal'] * 0.95) + $cartSummary['shippingFee'])) ?>
          </span>
        </div>

        <button type="submit" class="w-full btn-gold py-4 rounded-xl text-sm font-extrabold uppercase tracking-wider shadow-lg hover:shadow-xl">
          Confirm & Place Order →
        </button>

        <p class="text-[11px] text-center text-[#7A6B5D]">
          By placing your order, you agree to AARU’s terms of service and medical disclaimer.
        </p>

      </div>
    </div>

  </form>
  <?php endif; ?>
</main>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
