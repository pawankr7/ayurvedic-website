<?php
/**
 * AARU AYURVEDA - Cart API Endpoint (JSON)
 */

header('Content-Type: application/json; charset=utf-8');
require_once dirname(__DIR__) . '/config/config.php';

$action = $_POST['action'] ?? $_GET['action'] ?? 'get';
$db = getDB();

if ($action === 'add') {
    $productId = clean($_POST['product_id'] ?? '');
    $qty = max(1, (int)($_POST['quantity'] ?? 1));
    $batchCode = clean($_POST['batch_code'] ?? '');

    if (empty($productId)) {
        echo json_encode(['success' => false, 'error' => 'Product ID is required']);
        exit;
    }

    // Fetch product details from DB
    $stmt = $db->prepare("SELECT id, name_en, name_hi, price, default_batch, images_json FROM products WHERE id = :id OR slug = :slug LIMIT 1");
    $stmt->execute([':id' => $productId, ':slug' => $productId]);
    $prod = $stmt->fetch();

    if (!$prod) {
        echo json_encode(['success' => false, 'error' => 'Product not found']);
        exit;
    }

    $images = json_decode($prod['images_json'] ?? '[]', true);
    $heroImage = !empty($images[0]) ? $images[0] : '';
    $finalBatch = $batchCode ?: ($prod['default_batch'] ?: 'AARU-STD');

    $cartKey = $prod['id'];

    if (isset($_SESSION['cart'][$cartKey])) {
        $_SESSION['cart'][$cartKey]['quantity'] += $qty;
    } else {
        $_SESSION['cart'][$cartKey] = [
            'id' => $prod['id'],
            'name' => _f($prod, 'name'),
            'price' => (float)$prod['price'],
            'quantity' => $qty,
            'batch' => $finalBatch,
            'image' => $heroImage
        ];
    }

    echo json_encode([
        'success' => true,
        'message' => 'Added to your regimen cart',
        'cart' => getCartSummary()
    ]);
    exit;
}

if ($action === 'update_qty') {
    $productId = clean($_POST['product_id'] ?? '');
    $delta = (int)($_POST['delta'] ?? 0);

    if (isset($_SESSION['cart'][$productId])) {
        $_SESSION['cart'][$productId]['quantity'] += $delta;
        if ($_SESSION['cart'][$productId]['quantity'] <= 0) {
            unset($_SESSION['cart'][$productId]);
        }
    }

    echo json_encode([
        'success' => true,
        'cart' => getCartSummary()
    ]);
    exit;
}

if ($action === 'remove') {
    $productId = clean($_POST['product_id'] ?? '');
    if (isset($_SESSION['cart'][$productId])) {
        unset($_SESSION['cart'][$productId]);
    }

    echo json_encode([
        'success' => true,
        'cart' => getCartSummary()
    ]);
    exit;
}

// Default: return cart state
echo json_encode([
    'success' => true,
    'cart' => getCartSummary()
]);
