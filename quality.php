<?php
/**
 * AARU AYURVEDA - Quality & Analytical Lab Standards
 */
require_once __DIR__ . '/config/config.php';

$pageTitle = 'Quality Standards & NABL Labs | AARU Ayurveda';
$pageDescription = 'Discover how AARU tests every batch for heavy metals, microbial count, pesticide residue and botanical potency.';

require_once __DIR__ . '/includes/header.php';
?>

<div class="bg-[#FAF6EC] py-14 border-b border-[#E8DEC8]">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
    <span class="inline-block bg-[#DDE5D6] text-[#1F4D3A] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
      🔬 Science-Backed Purity
    </span>
    <h1 class="text-3xl sm:text-5xl font-extrabold text-[#1F4D3A] font-serif-luxury">
      Our Quality & Analytical Standards
    </h1>
    <p class="text-sm sm:text-base text-[#7A6B5D] max-w-2xl mx-auto leading-relaxed">
      Why soil absorption matters, how unregulated powders accumulate lead, and why AARU subjects 100% of batches to independent ISO/IEC 17025 accredited laboratory testing.
    </p>
  </div>
</div>

<main class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
  
  <!-- Comparative Standards Table -->
  <div class="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8DEC8] shadow-lg space-y-6">
    <div class="border-b border-[#E8DEC8] pb-4">
      <h2 class="text-xl sm:text-2xl font-bold text-[#1F4D3A] font-serif-luxury">
        Heavy Metal Safety Comparison: Legal Limits vs AARU Strict Standard
      </h2>
      <p class="text-xs text-[#7A6B5D] mt-1">Our formulations undergo Inductively Coupled Plasma Mass Spectrometry (ICP-MS).</p>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-xs text-left border border-[#E8DEC8] rounded-xl overflow-hidden">
        <thead class="bg-[#F4EFE2] text-[#3B2F25] font-bold">
          <tr>
            <th class="p-3.5">Heavy Metal</th>
            <th class="p-3.5">AYUSH Statutory Maximum</th>
            <th class="p-3.5">WHO Guideline</th>
            <th class="p-3.5 text-right font-extrabold text-[#1F4D3A]">AARU Internal Strict Limit</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[#E8DEC8]">
          <tr class="hover:bg-[#FAF6EC]">
            <td class="p-3.5 font-bold text-[#1F4D3A]">Lead (Pb)</td>
            <td class="p-3.5 text-gray-500">10.0 ppm</td>
            <td class="p-3.5 text-gray-500">10.0 ppm</td>
            <td class="p-3.5 text-right font-bold text-emerald-800 bg-emerald-50">&lt; 1.0 ppm (10x cleaner)</td>
          </tr>
          <tr class="hover:bg-[#FAF6EC]">
            <td class="p-3.5 font-bold text-[#1F4D3A]">Arsenic (As)</td>
            <td class="p-3.5 text-gray-500">3.0 ppm</td>
            <td class="p-3.5 text-gray-500">3.0 ppm</td>
            <td class="p-3.5 text-right font-bold text-emerald-800 bg-emerald-50">&lt; 0.5 ppm (6x cleaner)</td>
          </tr>
          <tr class="hover:bg-[#FAF6EC]">
            <td class="p-3.5 font-bold text-[#1F4D3A]">Cadmium (Cd)</td>
            <td class="p-3.5 text-gray-500">0.3 ppm</td>
            <td class="p-3.5 text-gray-500">0.3 ppm</td>
            <td class="p-3.5 text-right font-bold text-emerald-800 bg-emerald-50">&lt; 0.1 ppm (3x cleaner)</td>
          </tr>
          <tr class="hover:bg-[#FAF6EC]">
            <td class="p-3.5 font-bold text-[#1F4D3A]">Mercury (Hg)</td>
            <td class="p-3.5 text-gray-500">1.0 ppm</td>
            <td class="p-3.5 text-gray-500">1.0 ppm</td>
            <td class="p-3.5 text-right font-bold text-emerald-800 bg-emerald-50">&lt; 0.05 ppm (20x cleaner)</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="pt-4 flex justify-between items-center text-xs">
      <span class="text-[#7A6B5D]">Verify your own bottle now on our portal:</span>
      <a href="<?= url('verify-batch.php') ?>" class="btn-gold px-4 py-2 rounded-xl font-bold">
        Verify Batch CoA →
      </a>
    </div>
  </div>

</main>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
