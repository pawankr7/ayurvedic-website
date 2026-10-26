<?php
/**
 * AARU AYURVEDA - Core Application Configuration
 */

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

require_once __DIR__ . '/db.php';

// Base URL detection
$scriptDir = str_replace('\\', '/', dirname($_SERVER['SCRIPT_NAME']));
// Normalize base URL
if ($scriptDir === '/' || $scriptDir === '\\') {
    $baseUrl = '';
} else {
    // If inside a subfolder like /admin or /policies or /api, strip to root
    $parts = explode('/', trim($scriptDir, '/'));
    if (in_array(end($parts), ['admin', 'policies', 'api'])) {
        array_pop($parts);
    }
    $baseUrl = '/' . implode('/', $parts);
}
define('BASE_URL', rtrim($baseUrl, '/'));

// Language setup
if (isset($_GET['lang'])) {
    $requestedLang = strtolower(trim($_GET['lang']));
    if (in_array($requestedLang, ['en', 'hi'])) {
        $_SESSION['lang'] = $requestedLang;
    }
}
if (!isset($_SESSION['lang'])) {
    $_SESSION['lang'] = 'en';
}
define('CURRENT_LANG', $_SESSION['lang']);

// Initialize Cart in Session if not set
if (!isset($_SESSION['cart']) || !is_array($_SESSION['cart'])) {
    $_SESSION['cart'] = [];
}

// Brand constants
define('SITE_NAME', 'AARU (आरु)');
define('SITE_TAGLINE_EN', 'Rooted in Ayurveda. Verified by Science.');
define('SITE_TAGLINE_HI', 'आयुर्वेद, अब प्रमाण के साथ।');
define('FREE_SHIPPING_THRESHOLD', 599);
define('UPI_DISCOUNT_PERCENT', 5);
define('SUBSCRIPTION_DISCOUNT_PERCENT', 15);
define('SUPPORT_WHATSAPP', '+919876543210');
define('SUPPORT_EMAIL', 'care@aaruayurveda.com');

// Helper Functions
function url(string $path = ''): string {
    $cleanPath = ltrim($path, '/');
    return BASE_URL === '' ? '/' . $cleanPath : BASE_URL . '/' . $cleanPath;
}

function asset(string $path = ''): string {
    return url('assets/' . ltrim($path, '/'));
}

function formatPrice($amount): string {
    return '₹' . number_format((float)$amount, 0, '.', ',');
}

function clean($data): string {
    return htmlspecialchars(trim((string)$data), ENT_QUOTES, 'UTF-8');
}

// Language Field Helper: picks field_hi or field_en based on current language
function _f($item, string $fieldPrefix): string {
    if (is_array($item)) {
        if (CURRENT_LANG === 'hi' && !empty($item[$fieldPrefix . '_hi'])) {
            return $item[$fieldPrefix . '_hi'];
        }
        if (CURRENT_LANG === 'hi' && !empty($item['hindi' . ucfirst($fieldPrefix)])) {
            return $item['hindi' . ucfirst($fieldPrefix)];
        }
        return $item[$fieldPrefix . '_en'] ?? $item[$fieldPrefix] ?? '';
    }
    return '';
}

// Cart Helper Calculations
function getCartSummary(): array {
    $items = $_SESSION['cart'] ?? [];
    $count = 0;
    $subtotal = 0.0;

    foreach ($items as $item) {
        $qty = (int)($item['quantity'] ?? 1);
        $price = (float)($item['price'] ?? 0);
        $count += $qty;
        $subtotal += ($qty * $price);
    }

    $freeShippingNeeded = max(0, FREE_SHIPPING_THRESHOLD - $subtotal);
    $freeShippingProgress = min(100, round(($subtotal / FREE_SHIPPING_THRESHOLD) * 100));
    $shippingFee = ($subtotal >= FREE_SHIPPING_THRESHOLD || $subtotal == 0) ? 0 : 70;

    return [
        'items' => $items,
        'count' => $count,
        'subtotal' => $subtotal,
        'shippingFee' => $shippingFee,
        'freeShippingThreshold' => FREE_SHIPPING_THRESHOLD,
        'freeShippingNeeded' => $freeShippingNeeded,
        'freeShippingProgress' => $freeShippingProgress,
        'total' => $subtotal + $shippingFee
    ];
}
