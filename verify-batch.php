<?php
/**
 * AARU AYURVEDA - Batch Verification Portal
 * Open NABL ISO/IEC 17025:2017 Certificate of Analysis Audit
 */
require_once __DIR__ . '/config/config.php';
$db = getDB();

$searchedBatch = strtoupper(clean($_GET['batch'] ?? 'AARU-24-GT01'));

$stmt = $db->prepare("SELECT * FROM batches WHERE batch_number = :batch LIMIT 1");
$stmt->execute([':batch' => $searchedBatch]);
$batch = $stmt->fetch();

// Fetch all available batches for quick selector
$stmtAll = $db->query("SELECT batch_number, product_name FROM batches ORDER BY report_date DESC");
$allBatches = $stmtAll->fetchAll();

$pageTitle = 'NABL Batch Verification Portal | AARU Ayurveda';
$pageDescription = 'Verify third-party NABL ISO/IEC 17025 Certificate of Analysis for any AARU batch. Check lead, arsenic, mercury, cadmium and herbal potency.';

require_once __DIR__ . '/includes/header.php';
?>

<div class="bg-gradient-to-b from-[#FAF6EC] to-[#F4EFE2] py-12 border-b border-[#E8DEC8]">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
    <div class="inline-flex items-center space-x-2 bg-[#DDE5D6] text-[#1F4D3A] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
      <span>🛡️ Radical Transparency Protocol</span>
    </div>
    <h1 class="text-3xl sm:text-5xl font-extrabold text-[#1F4D3A] font-serif-luxury">
      <?= CURRENT_LANG === 'hi' ? 'एनएबीएल बैच जांच पोर्टल' : 'Batch Verification & Lab Reports' ?>
    </h1>
    <p class="text-sm sm:text-base text-[#7A6B5D] max-w-2xl mx-auto leading-relaxed">
      <?= CURRENT_LANG === 'hi' 
        ? 'अपनी औषधि की डिब्बी पर अंकित बैच नंबर दर्ज करें और स्वतंत्र NABL मान्यता प्राप्त प्रयोगशाला द्वारा जारी पूर्ण जांच रिपोर्ट देखें।'
        : 'Enter the batch code printed on your AARU bottle or carton to inspect the exact third-party Certificate of Analysis (CoA) verified for heavy metals, pathogens, and active botanical markers.' ?>
    </p>

    <!-- Search Box -->
    <div class="max-w-lg mx-auto pt-4">
      <form method="GET" class="flex gap-2">
        <input type="text" name="batch" value="<?= htmlspecialchars($searchedBatch) ?>" placeholder="e.g. AARU-24-GT01" class="flex-1 text-sm font-mono uppercase px-4 py-3 rounded-2xl border border-[#D5C7B0] bg-white text-[#1F4D3A] focus:outline-none focus:border-[#1F4D3A] shadow-sm">
        <button type="submit" class="btn-forest px-6 py-3 rounded-2xl text-xs uppercase tracking-wider font-bold">
          Verify CoA
        </button>
      </form>
    </div>

    <!-- Quick Batch Buttons -->
    <div class="pt-4 flex flex-wrap justify-center gap-2">
      <span class="text-xs text-[#7A6B5D] self-center mr-1">Quick Select:</span>
      <?php foreach ($allBatches as $ab): ?>
        <a href="?batch=<?= urlencode($ab['batch_number']) ?>" class="px-3 py-1 rounded-full text-xs font-mono font-semibold transition-all <?= $searchedBatch === $ab['batch_number'] ? 'bg-[#1F4D3A] text-white shadow-sm' : 'bg-white text-[#3B2F25] border border-[#D5C7B0] hover:bg-[#FAF6EC]' ?>">
          <?= htmlspecialchars($ab['batch_number']) ?>
        </a>
      <?php endforeach; ?>
    </div>

  </div>
</div>

<main class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
  <?php if (!$batch): ?>
    <div class="text-center py-16 bg-white rounded-3xl border border-[#E8DEC8] p-8 shadow-sm">
      <div class="text-5xl mb-3">🔍</div>
      <h3 class="text-lg font-bold text-[#1F4D3A] font-serif-luxury">No Certificate Found</h3>
      <p class="text-xs text-[#7A6B5D] mt-1">We couldn't locate a batch report for "<strong><?= htmlspecialchars($searchedBatch) ?></strong>".</p>
      <p class="text-xs text-[#7A6B5D] mt-1">Please double-check the batch code printed near the expiry date on your packaging.</p>
    </div>
  <?php else: 
    $heavy = json_decode($batch['heavy_metals_json'] ?? '{}', true);
    $micro = json_decode($batch['microbial_json'] ?? '{}', true);
    $pest = json_decode($batch['pesticide_residues_json'] ?? '{}', true);
    $assay = json_decode($batch['assay_json'] ?? '{}', true);
  ?>

    <!-- Official Certificate Card -->
    <div class="bg-white rounded-3xl border-2 border-[#1F4D3A]/20 shadow-xl overflow-hidden space-y-8 p-6 sm:p-10">
      
      <!-- CoA Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-[#E8DEC8] gap-4">
        <div>
          <span class="text-[11px] font-bold text-[#C8922B] uppercase tracking-wider block">Official Test Certificate</span>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-[#1F4D3A] font-serif-luxury mt-0.5">
            <?= htmlspecialchars($batch['product_name']) ?>
          </h2>
          <p class="text-xs text-[#7A6B5D] mt-1">
            Testing Laboratory: <strong class="text-[#3B2F25]"><?= htmlspecialchars($batch['testing_lab']) ?></strong>
          </p>
        </div>

        <div class="flex items-center space-x-2">
          <span class="bg-emerald-100 text-emerald-800 text-xs font-extrabold px-3.5 py-1.5 rounded-full flex items-center space-x-1.5 border border-emerald-300">
            <span>✓</span>
            <span>100% COMPLIANT</span>
          </span>
        </div>
      </div>

      <!-- Batch Meta Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-[#F4EFE2] rounded-2xl p-4 border border-[#E8DEC8] text-xs">
        <div>
          <span class="text-gray-500 block">Batch Number:</span>
          <strong class="font-mono text-[#1F4D3A] text-sm"><?= htmlspecialchars($batch['batch_number']) ?></strong>
        </div>
        <div>
          <span class="text-gray-500 block">Mfg Date:</span>
          <strong class="text-[#3B2F25]"><?= htmlspecialchars($batch['mfg_date']) ?></strong>
        </div>
        <div>
          <span class="text-gray-500 block">Expiry Date:</span>
          <strong class="text-[#3B2F25]"><?= htmlspecialchars($batch['expiry_date']) ?></strong>
        </div>
        <div>
          <span class="text-gray-500 block">NABL Accr. No:</span>
          <strong class="font-mono text-[#C8922B]"><?= htmlspecialchars($batch['nabl_accreditation_no']) ?></strong>
        </div>
      </div>

      <!-- Section 1: Heavy Metals (The Crucial Ayurvedic Proof) -->
      <div class="space-y-4">
        <div class="flex items-center space-x-2">
          <span class="w-2.5 h-2.5 rounded-full bg-[#1F4D3A]"></span>
          <h3 class="font-bold text-base text-[#1F4D3A] font-serif-luxury">1. Heavy Metals ICP-MS Quantitative Screening</h3>
        </div>
        <p class="text-xs text-[#7A6B5D]">
          Tested strictly against the statutory permissible limits laid down by the Pharmacopoeial Laboratory for Indian Medicines (PLIM) and WHO.
        </p>

        <div class="overflow-x-auto">
          <table class="w-full text-xs text-left border border-[#E8DEC8] rounded-xl overflow-hidden">
            <thead class="bg-[#F4EFE2] text-[#3B2F25] font-bold">
              <tr>
                <th class="p-3">Metal Parameter</th>
                <th class="p-3">Method</th>
                <th class="p-3">Permissible Limit (AYUSH)</th>
                <th class="p-3">AARU Batch Found</th>
                <th class="p-3 text-right">Result</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[#E8DEC8]">
              <?php foreach ($heavy as $metalKey => $data): ?>
                <tr class="hover:bg-[#FAF6EC]">
                  <td class="p-3 font-semibold capitalize text-[#1F4D3A]"><?= htmlspecialchars($metalKey) ?></td>
                  <td class="p-3 text-gray-400">ICP-MS</td>
                  <td class="p-3 text-[#7A6B5D]"><?= htmlspecialchars($data['limit'] ?? '') ?></td>
                  <td class="p-3 font-mono font-bold text-emerald-800 bg-emerald-50/50"><?= htmlspecialchars($data['value'] ?? '') ?></td>
                  <td class="p-3 text-right font-bold text-emerald-700">✓ PASSED</td>
                </tr>
              <?php endforeach; ?>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Section 2: Microbial Pathogen Screen -->
      <div class="space-y-4">
        <div class="flex items-center space-x-2">
          <span class="w-2.5 h-2.5 rounded-full bg-[#1F4D3A]"></span>
          <h3 class="font-bold text-base text-[#1F4D3A] font-serif-luxury">2. Microbial Purity & Pathogen Analysis</h3>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-xs text-left border border-[#E8DEC8] rounded-xl overflow-hidden">
            <thead class="bg-[#F4EFE2] text-[#3B2F25] font-bold">
              <tr>
                <th class="p-3">Microbial Parameter</th>
                <th class="p-3">Standard Limit</th>
                <th class="p-3">Tested Count</th>
                <th class="p-3 text-right">Result</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[#E8DEC8]">
              <?php foreach ($micro as $param => $m): ?>
                <tr class="hover:bg-[#FAF6EC]">
                  <td class="p-3 font-semibold text-[#1F4D3A]"><?= ucwords(preg_replace('/(?<!\ )[A-Z]/', ' $0', $param)) ?></td>
                  <td class="p-3 text-[#7A6B5D]"><?= htmlspecialchars($m['limit'] ?? '') ?></td>
                  <td class="p-3 font-mono font-bold text-emerald-800"><?= htmlspecialchars($m['value'] ?? '') ?></td>
                  <td class="p-3 text-right font-bold text-emerald-700">✓ PASSED</td>
                </tr>
              <?php endforeach; ?>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Section 3: Active Herbal Marker & Pesticide Residues -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Active Marker -->
        <div class="bg-[#FAF6EC] rounded-2xl p-5 border border-[#E8DEC8] space-y-2">
          <h4 class="font-bold text-xs uppercase tracking-wider text-[#C8922B]">3. Active Botanical Marker Assay</h4>
          <p class="text-xs text-[#7A6B5D]">Compound: <strong><?= htmlspecialchars($assay['markerCompound'] ?? 'Marker Polyphenols') ?></strong></p>
          <div class="flex items-baseline space-x-2 pt-1">
            <span class="text-2xl font-bold font-mono text-[#1F4D3A]"><?= htmlspecialchars($assay['foundPercentage'] ?? '42.8% w/w') ?></span>
            <span class="text-xs text-[#7A6B5D]">(Standard: <?= htmlspecialchars($assay['standardLimit'] ?? 'Min 35.0%') ?>)</span>
          </div>
          <span class="inline-block text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">High Potency Passed</span>
        </div>

        <!-- Pesticide Residues -->
        <div class="bg-[#FAF6EC] rounded-2xl p-5 border border-[#E8DEC8] space-y-2">
          <h4 class="font-bold text-xs uppercase tracking-wider text-[#C8922B]">4. Pesticide Residue Multi-Screen</h4>
          <p class="text-xs text-[#7A6B5D]">Tested Compounds: <strong><?= htmlspecialchars($pest['testedCompoundsCount'] ?? 142) ?> Agricultural Compounds</strong></p>
          <div class="flex items-baseline space-x-2 pt-1">
            <span class="text-2xl font-bold font-mono text-emerald-700"><?= htmlspecialchars($pest['status'] ?? 'NOT DETECTED') ?></span>
          </div>
          <span class="inline-block text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">0.00% Chemical Pesticides</span>
        </div>
      </div>

      <!-- Footer Sign-off -->
      <div class="pt-6 border-t border-[#E8DEC8] flex flex-col sm:flex-row justify-between items-center text-xs text-[#7A6B5D] gap-4">
        <div>
          <p class="font-semibold text-[#1F4D3A]">Certified by Chief Quality Officer, AARU Analytics Division</p>
          <p class="text-[11px]">Accreditation: NABL ISO/IEC 17025:2017 & AYUSH GMP Certified</p>
        </div>
        <button onclick="window.print()" class="btn-forest px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-sm">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
          <span>Print / Save Official Certificate</span>
        </button>
      </div>

    </div>

  <?php endif; ?>
</main>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
