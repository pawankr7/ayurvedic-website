<?php
/**
 * AARU AYURVEDA - Pincode Serviceability & Delivery Estimate API
 */

header('Content-Type: application/json; charset=utf-8');
require_once dirname(__DIR__) . '/config/config.php';

$pincode = clean($_GET['pincode'] ?? $_POST['pincode'] ?? '');

if (strlen($pincode) !== 6 || !ctype_digit($pincode)) {
    echo json_encode([
        'serviceable' => false,
        'message' => 'Please enter a valid 6-digit Indian PIN code'
    ]);
    exit;
}

// Prefix based estimation
$firstDigit = (int)$pincode[0];
$metroPincodes = ['110001', '400001', '560001', '700001', '600001', '500001'];

$days = in_array($pincode, $metroPincodes) ? '2-3 Business Days' : '3-5 Business Days';
$codAvailable = true;

echo json_encode([
    'serviceable' => true,
    'pincode' => $pincode,
    'estimatedDelivery' => $days,
    'codAvailable' => $codAvailable,
    'courier' => 'Delhivery Express / BlueDart B2C Air',
    'message' => "Delivering to $pincode by $days via Express Air. Cash on Delivery is Available."
]);
