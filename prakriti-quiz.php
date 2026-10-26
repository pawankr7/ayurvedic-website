<?php
/**
 * AARU AYURVEDA - Interactive Prakriti Dosha Diagnostic Quiz
 */
require_once __DIR__ . '/config/config.php';
$db = getDB();

$stmt = $db->query("SELECT * FROM quiz_questions ORDER BY id ASC");
$questions = $stmt->fetchAll();

$pageTitle = 'Prakriti Dosha Diagnostic Quiz | AARU Ayurveda';
$pageDescription = 'Discover your inherent Ayurvedic constitution (Vata, Pitta, Kapha) with our 2-minute clinical diagnostic test. Get personalized diet guidelines and herbal regimens.';

require_once __DIR__ . '/includes/header.php';
?>

<div class="bg-gradient-to-b from-[#FAF6EC] to-[#F4EFE2] py-12 border-b border-[#E8DEC8]">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
    <span class="inline-block bg-[#FAF0D9] text-[#C8922B] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-[#E6CA8D]">
      ✨ 2-Minute Classical Diagnostic
    </span>
    <h1 class="text-3xl sm:text-5xl font-extrabold text-[#1F4D3A] font-serif-luxury">
      <?= CURRENT_LANG === 'hi' ? 'अपनी जन्मजात प्रकृति को पहचानें' : 'Know Your Prakriti: Vata, Pitta or Kapha?' ?>
    </h1>
    <p class="text-xs sm:text-sm text-[#7A6B5D] max-w-2xl mx-auto leading-relaxed">
      In Ayurveda, health begins with self-knowledge. Based on the fundamental physiological principles of Charaka Samhita, this assessment reveals your biological blueprint and personalized herbal remedies.
    </p>

    <!-- Quiz Progress Bar -->
    <div class="max-w-md mx-auto pt-4" id="progress-container">
      <div class="flex justify-between text-xs text-[#7A6B5D] mb-1 font-semibold">
        <span id="step-counter">Trait 1 of <?= count($questions) ?></span>
        <span id="step-pct">0% Complete</span>
      </div>
      <div class="w-full bg-[#E8DEC8] h-2.5 rounded-full overflow-hidden">
        <div id="quiz-progress" class="bg-[#1F4D3A] h-2.5 rounded-full transition-all duration-300" style="width: 16%"></div>
      </div>
    </div>
  </div>
</div>

<main class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
  
  <!-- Step Container for Questions -->
  <div id="quiz-steps-container">
    <?php foreach ($questions as $idx => $q): 
      $options = json_decode($q['options_json'] ?? '[]', true);
      $stepNum = $idx + 1;
    ?>
      <div class="quiz-step <?= $stepNum === 1 ? '' : 'hidden' ?> bg-white rounded-3xl p-6 sm:p-10 border border-[#E8DEC8] shadow-lg space-y-6" data-step="<?= $stepNum ?>">
        <div class="border-b border-[#E8DEC8] pb-4">
          <span class="text-xs font-bold text-[#C8922B] uppercase tracking-wider">Trait #<?= $stepNum ?></span>
          <h2 class="text-xl sm:text-2xl font-bold text-[#1F4D3A] font-serif-luxury mt-1">
            <?= htmlspecialchars(_f($q, 'trait')) ?>
          </h2>
        </div>

        <div class="space-y-3">
          <?php foreach ($options as $opt): ?>
            <label class="block cursor-pointer p-4 rounded-2xl border-2 border-[#E8DEC8] hover:border-[#1F4D3A] transition-all bg-[#FAF6EC] hover:bg-white text-sm text-[#3B2F25] flex items-center space-x-3">
              <input type="radio" name="trait_<?= $q['id'] ?>" value="<?= htmlspecialchars($opt['dosha']) ?>" class="w-4 h-4 accent-[#1F4D3A]" onchange="selectOption(<?= $stepNum ?>, '<?= $opt['dosha'] ?>')">
              <span class="leading-relaxed">
                <?= htmlspecialchars(CURRENT_LANG === 'hi' && !empty($opt['hindiText']) ? $opt['hindiText'] : $opt['text']) ?>
              </span>
            </label>
          <?php endforeach; ?>
        </div>

        <?php if ($stepNum > 1): ?>
          <button onclick="prevStep(<?= $stepNum ?>)" class="text-xs font-bold text-[#7A6B5D] hover:text-[#1F4D3A] flex items-center space-x-1 pt-2">
            <span>←</span>
            <span>Previous Question</span>
          </button>
        <?php endif; ?>
      </div>
    <?php endforeach; ?>

    <!-- Final Lead Capture Step -->
    <div id="quiz-lead-step" class="hidden bg-white rounded-3xl p-6 sm:p-10 border border-[#E8DEC8] shadow-lg space-y-6">
      <div class="text-center border-b border-[#E8DEC8] pb-4">
        <span class="text-xs font-bold text-[#C8922B] uppercase tracking-wider">Final Step</span>
        <h2 class="text-2xl font-bold text-[#1F4D3A] font-serif-luxury mt-1">Where Should We Send Your Detailed Ayurvedic Profile?</h2>
        <p class="text-xs text-[#7A6B5D] mt-1">Receive customized Pathya (diet chart) and Dinacharya routine.</p>
      </div>

      <form id="lead-form" onsubmit="submitQuiz(event)" class="space-y-4">
        <div>
          <label class="block text-xs font-bold text-[#1F4D3A] mb-1">Your Full Name *</label>
          <input type="text" id="lead-name" required placeholder="e.g. Anjali Sharma" class="w-full text-xs px-4 py-3 rounded-xl border border-[#D5C7B0] focus:outline-none focus:border-[#1F4D3A]">
        </div>

        <div>
          <label class="block text-xs font-bold text-[#1F4D3A] mb-1">WhatsApp / Phone Number *</label>
          <input type="tel" id="lead-phone" required placeholder="e.g. +91 98765 43210" class="w-full text-xs px-4 py-3 rounded-xl border border-[#D5C7B0] focus:outline-none focus:border-[#1F4D3A]">
        </div>

        <div>
          <label class="block text-xs font-bold text-[#1F4D3A] mb-1">Email Address (Optional)</label>
          <input type="email" id="lead-email" placeholder="e.g. anjali@gmail.com" class="w-full text-xs px-4 py-3 rounded-xl border border-[#D5C7B0] focus:outline-none focus:border-[#1F4D3A]">
        </div>

        <div>
          <label class="block text-xs font-bold text-[#1F4D3A] mb-1">Primary Health Focus</label>
          <select id="lead-concern" class="w-full text-xs px-4 py-3 rounded-xl border border-[#D5C7B0] bg-white text-[#3B2F25] focus:outline-none focus:border-[#1F4D3A]">
            <option value="gut">Gut, Acidity & Digestion</option>
            <option value="sleep">Sleep & Stress Relief</option>
            <option value="vitality">Stamina & Physical Energy</option>
            <option value="women">Hormonal Balance & Periods</option>
            <option value="joints">Joint Mobility & Back Care</option>
            <option value="rasayana">Daily Immunity & Rejuvenation</option>
          </select>
        </div>

        <button type="submit" id="submit-quiz-btn" class="w-full btn-gold py-4 rounded-xl text-sm font-extrabold uppercase tracking-wider shadow-lg flex items-center justify-center space-x-2">
          <span>Calculate My Dosha & Reveal Regimen</span>
          <span>→</span>
        </button>
      </form>
    </div>

  </div>

  <!-- Dynamic Results Section -->
  <div id="quiz-results" class="hidden space-y-8">
    <div class="bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#1F4D3A]/20 shadow-xl space-y-6">
      
      <!-- Dominant Dosha Card Header -->
      <div class="text-center space-y-2 border-b border-[#E8DEC8] pb-6">
        <span class="text-xs font-bold text-[#C8922B] uppercase tracking-wider">Your Clinical Diagnostic Outcome</span>
        <h2 class="text-3xl sm:text-4xl font-extrabold text-[#1F4D3A] font-serif-luxury">
          Your Dominant Constitution is: <span id="res-dominant" class="text-[#C8922B]"></span>
        </h2>
        <div class="flex justify-center items-center space-x-6 text-xs font-mono font-bold pt-2">
          <span class="text-[#1F4D3A]">Vata: <span id="score-vata">0</span></span>
          <span class="text-[#C8922B]">Pitta: <span id="score-pitta">0</span></span>
          <span class="text-emerald-700">Kapha: <span id="score-kapha">0</span></span>
        </div>
      </div>

      <!-- Description -->
      <div class="bg-[#FAF6EC] rounded-2xl p-6 border border-[#E8DEC8] space-y-2">
        <h3 class="font-bold text-sm text-[#1F4D3A] font-serif-luxury">Clinical Dosha Analysis</h3>
        <p id="res-description" class="text-xs text-[#7A6B5D] leading-relaxed"></p>
      </div>

      <!-- Diet & Lifestyle Guidelines -->
      <div class="bg-[#F4EFE2] rounded-2xl p-6 border border-[#E8DEC8] space-y-3">
        <h3 class="font-bold text-sm text-[#1F4D3A] font-serif-luxury">Recommended Pathya (Dietary Rules)</h3>
        <ul id="res-diet" class="text-xs text-[#7A6B5D] space-y-1.5 list-disc pl-5"></ul>
      </div>

      <!-- Targeted Regimens -->
      <div class="space-y-4 pt-4 border-t border-[#E8DEC8]">
        <div>
          <span class="text-xs font-bold text-[#C8922B] uppercase tracking-wider">Targeted Pharmacopoeia</span>
          <h3 class="text-xl font-bold text-[#1F4D3A] font-serif-luxury">Doctor-Prescribed Formulations for You</h3>
        </div>
        <div id="res-products" class="grid grid-cols-1 sm:grid-cols-2 gap-4"></div>
      </div>

      <div class="text-center pt-4">
        <button onclick="window.location.reload()" class="text-xs font-bold text-[#7A6B5D] hover:text-[#1F4D3A] underline">
          Retake Diagnostic Quiz
        </button>
      </div>

    </div>
  </div>

</main>

<script>
const totalSteps = <?= count($questions) ?>;
const answers = {};

function selectOption(step, dosha) {
  answers[step] = dosha;
  
  if (step < totalSteps) {
    nextStep(step);
  } else {
    // Show lead step
    document.querySelector(`.quiz-step[data-step="${step}"]`).classList.add('hidden');
    document.getElementById('quiz-lead-step').classList.remove('hidden');
    document.getElementById('quiz-progress').style.width = '100%';
    document.getElementById('step-counter').textContent = 'Final Step';
    document.getElementById('step-pct').textContent = '100%';
  }
}

function nextStep(currentStep) {
  document.querySelector(`.quiz-step[data-step="${currentStep}"]`).classList.add('hidden');
  const next = currentStep + 1;
  const nextEl = document.querySelector(`.quiz-step[data-step="${next}"]`);
  if (nextEl) nextEl.classList.remove('hidden');

  const pct = Math.round((next / totalSteps) * 100);
  document.getElementById('quiz-progress').style.width = pct + '%';
  document.getElementById('step-counter').textContent = `Trait ${next} of ${totalSteps}`;
  document.getElementById('step-pct').textContent = pct + '%';
}

function prevStep(currentStep) {
  document.querySelector(`.quiz-step[data-step="${currentStep}"]`).classList.add('hidden');
  const prev = currentStep - 1;
  const prevEl = document.querySelector(`.quiz-step[data-step="${prev}"]`);
  if (prevEl) prevEl.classList.remove('hidden');

  const pct = Math.round((prev / totalSteps) * 100);
  document.getElementById('quiz-progress').style.width = pct + '%';
  document.getElementById('step-counter').textContent = `Trait ${prev} of ${totalSteps}`;
  document.getElementById('step-pct').textContent = pct + '%';
}

function submitQuiz(e) {
  e.preventDefault();
  const btn = document.getElementById('submit-quiz-btn');
  btn.disabled = true;
  btn.textContent = 'Analyzing Diagnostic Profile...';

  const formData = new FormData();
  formData.append('name', document.getElementById('lead-name').value);
  formData.append('phone', document.getElementById('lead-phone').value);
  formData.append('email', document.getElementById('lead-email').value);
  formData.append('concern', document.getElementById('lead-concern').value);
  
  Object.values(answers).forEach(val => {
    formData.append('answers[]', val);
  });

  fetch('<?= url("api/quiz.php") ?>', {
    method: 'POST',
    body: formData
  })
  .then(r => r.json())
  .then(data => {
    if (data.success) {
      document.getElementById('quiz-steps-container').classList.add('hidden');
      document.getElementById('progress-container').classList.add('hidden');
      document.getElementById('quiz-results').classList.remove('hidden');

      document.getElementById('res-dominant').textContent = data.dominant + ' Dosha';
      document.getElementById('score-vata').textContent = data.scores.vata;
      document.getElementById('score-pitta').textContent = data.scores.pitta;
      document.getElementById('score-kapha').textContent = data.scores.kapha;
      document.getElementById('res-description').textContent = data.description;

      const dietList = document.getElementById('res-diet');
      dietList.innerHTML = '';
      data.diet.forEach(tip => {
        const li = document.createElement('li');
        li.textContent = tip;
        dietList.appendChild(li);
      });

      const prodContainer = document.getElementById('res-products');
      prodContainer.innerHTML = '';
      data.products.forEach(p => {
        const div = document.createElement('div');
        div.className = 'bg-[#FAF6EC] rounded-2xl p-4 border border-[#E8DEC8] flex items-center justify-between space-x-3';
        div.innerHTML = `
          <div>
            <span class="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-mono">Batch: ${p.default_batch || 'AARU'}</span>
            <h4 class="font-bold text-sm text-[#1F4D3A] mt-1">${p.name_en}</h4>
            <span class="font-bold text-sm text-[#C8922B]">₹${Number(p.price).toLocaleString('en-IN')}</span>
          </div>
          <button onclick="addToCart('${p.id}', 1, '${p.default_batch}')" class="btn-forest px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap">
            + Add to Bag
          </button>
        `;
        prodContainer.appendChild(div);
      });

      window.scrollTo({ top: 150, behavior: 'smooth' });
    }
  });
}
</script>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
