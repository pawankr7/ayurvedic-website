<?php
/**
 * AARU AYURVEDA - Batch Verification API Endpoint
 */

header('Content-Type: application/json; charset=utf-8');
require_once dirname(__DIR__) . '/config/config.php';

$batchCode = clean($_GET['batch'] ?? $_POST['batch'] ?? '');
if (empty($batchCode)) {
    echo json_encode(['success' => false, 'error' => 'Batch number is required']);
    exit;
}

$db = getDB();
$stmt = $db->prepare("SELECT * FROM batches WHERE batch_number = :code LIMIT 1");
$stmt->execute([':code' => strtoupper($batchCode)]);
$batch = $stmt->fetch();

if (!$batch) {
    echo json_encode([
        'success' => false,
        'error' => "No NABL test report found for batch: " . htmlspecialchars($batchCode)
    ]);
    exit;
}

// Decode JSON fields
$batch['heavy_metals'] = json_decode($batch['heavy_metals_json'] ?? '{}', true);
$batch['microbial'] = json_decode($batch['microbial_json'] ?? '{}', true);
$batch['pesticide_residues'] = json_decode($batch['pesticide_residues_json'] ?? '{}', true);
$batch['assay'] = json_decode($batch['assay_json'] ?? '{}', true);

echo json_encode([
    'success' => true,
    'batch' => $batch
]);
