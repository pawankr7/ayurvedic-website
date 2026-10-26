<?php
/**
 * AARU AYURVEDA - Footer Component
 */
?>
  <!-- Trust Signals Row -->
  <section class="border-t border-b border-[#E8DEC8] bg-[#F4EFE2] py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div class="flex flex-col items-center space-y-2 p-3">
          <div class="w-12 h-12 rounded-full bg-[#1F4D3A]/10 text-[#1F4D3A] flex items-center justify-center text-xl">
            🔬
          </div>
          <h4 class="font-bold text-sm text-[#1F4D3A] font-serif-luxury"><?= CURRENT_LANG === 'hi' ? '100% एनएबीएल जांच' : '100% NABL Lab Tested' ?></h4>
          <p class="text-xs text-[#7A6B5D]"><?= CURRENT_LANG === 'hi' ? 'हर बैच में लेड, मर्करी व आर्सेनिक की जांच' : 'Zero lead, mercury & heavy metals' ?></p>
        </div>
        <div class="flex flex-col items-center space-y-2 p-3">
          <div class="w-12 h-12 rounded-full bg-[#C8922B]/10 text-[#C8922B] flex items-center justify-center text-xl">
            📜
          </div>
          <h4 class="font-bold text-sm text-[#1F4D3A] font-serif-luxury"><?= CURRENT_LANG === 'hi' ? 'आयुष मंत्रालय स्वीकृत' : 'AYUSH Certified' ?></h4>
          <p class="text-xs text-[#7A6B5D]"><?= CURRENT_LANG === 'hi' ? 'पारंपरिक चरक व सुश्रुत संहिताओं पर आधारित' : 'Classical Samhita formulations' ?></p>
        </div>
        <div class="flex flex-col items-center space-y-2 p-3">
          <div class="w-12 h-12 rounded-full bg-[#1F4D3A]/10 text-[#1F4D3A] flex items-center justify-center text-xl">
            🚚
          </div>
          <h4 class="font-bold text-sm text-[#1F4D3A] font-serif-luxury"><?= CURRENT_LANG === 'hi' ? 'कैश ऑन डिलीवरी (COD)' : 'Pan-India COD & Fast Air' ?></h4>
          <p class="text-xs text-[#7A6B5D]"><?= CURRENT_LANG === 'hi' ? '19,000+ पिनकोड पर सुरक्षित होम डिलीवरी' : 'Delivering across 19,000+ PIN codes' ?></p>
        </div>
        <div class="flex flex-col items-center space-y-2 p-3">
          <div class="w-12 h-12 rounded-full bg-[#C8922B]/10 text-[#C8922B] flex items-center justify-center text-xl">
            🩺
          </div>
          <h4 class="font-bold text-sm text-[#1F4D3A] font-serif-luxury"><?= CURRENT_LANG === 'hi' ? 'वैद्य परामर्श सहायता' : 'Vaidya Consultations' ?></h4>
          <p class="text-xs text-[#7A6B5D]"><?= CURRENT_LANG === 'hi' ? 'अनुभवी बीएएमएस चिकित्सकों से सीधी बात' : 'Direct advisory with certified doctors' ?></p>
        </div>
      </div>
    </div>
  </section>

  <!-- Mandatory Statutory Medical Disclaimer -->
  <section class="bg-[#FAF0D9] border-b border-[#E6CA8D] py-4 px-4 text-center">
    <div class="max-w-4xl mx-auto">
      <p class="text-[11px] leading-relaxed text-[#7A6B5D]">
        <strong class="text-[#3B2F25]">⚖️ <?= CURRENT_LANG === 'hi' ? 'वैधानिक चिकित्सा अस्वीकरण (Statutory AYUSH Disclaimer):' : 'Mandatory Statutory AYUSH Disclaimer:' ?></strong>
        <?= CURRENT_LANG === 'hi' 
          ? 'इस वेबसाइट पर प्रस्तुत जानकारी और उत्पाद किसी भी गंभीर बीमारी के निदान, उपचार अथवा पूर्ण निवारण का कानूनी दावा नहीं करते। गर्भवती या स्तनपान कराने वाली महिलाएं एवं किसी गंभीर रोग से ग्रसित व्यक्ति उपयोग से पूर्व अपने योग्य आयुर्वेदिक वैद्य अथवा चिकित्सक से अवश्य परामर्श करें।'
          : 'These statements have not been evaluated as an absolute cure for any chronic disease under the Drugs & Magic Remedies Act. Consult a qualified Ayurvedic physician before use, especially if pregnant, nursing, or undergoing allopathic treatment.' ?>
      </p>
    </div>
  </section>

  <!-- Main Footer -->
  <footer class="bg-[#143527] text-[#FAF6EC] pt-14 pb-12 mt-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
        
        <!-- Brand Column -->
        <div class="lg:col-span-2 space-y-4">
          <div class="flex items-center space-x-2">
            <div class="w-9 h-9 rounded-full bg-[#C8922B] text-[#143527] flex items-center justify-center font-bold text-lg">
              आ
            </div>
            <span class="text-2xl font-bold tracking-tight text-white font-serif-luxury">AARU (आरु)</span>
          </div>
          <p class="text-xs text-[#DDE5D6] leading-relaxed pr-4">
            <?= CURRENT_LANG === 'hi' 
              ? 'आरु आयुर्वेद — भारत के प्राचीन वैदिक ज्ञान और आधुनिक वैज्ञानिक प्रमाण का संगम। हम हर बैच की NABL टेस्ट रिपोर्ट सार्वजनिक करते हैं ताकि आपके परिवार को मिले 100% शुद्ध और सुरक्षित स्वास्थ्य।' 
              : 'Rooted in Ayurveda. Verified by Science. We eliminate guesswork in herbal wellness by publishing third-party NABL ISO/IEC 17025 Certificate of Analysis for every production batch.' ?>
          </p>
          <div class="pt-2 text-xs text-[#C8922B] font-semibold space-y-1">
            <p>📞 WhatsApp Support: +91 98765 43210</p>
            <p>✉️ Doctor Helpline: care@aaruayurveda.com</p>
            <p>📍 GMP Unit: RIICO Industrial Area, Neemrana, Rajasthan, India</p>
          </div>
        </div>

        <!-- Concern Links -->
        <div class="space-y-3">
          <h4 class="font-bold text-sm text-[#C8922B] uppercase tracking-wider font-serif-luxury"><?= CURRENT_LANG === 'hi' ? 'स्वास्थ्य श्रेणियां' : 'Concerns' ?></h4>
          <ul class="text-xs space-y-2 text-[#DDE5D6]">
            <li><a href="<?= url('shop.php?category=gut-digestion') ?>" class="hover:text-white transition-colors">Gut & Digestion Care</a></li>
            <li><a href="<?= url('shop.php?category=womens-wellness') ?>" class="hover:text-white transition-colors">Women's Wellness (PCOD)</a></li>
            <li><a href="<?= url('shop.php?category=mens-vitality') ?>" class="hover:text-white transition-colors">Pure Shilajit & Stamina</a></li>
            <li><a href="<?= url('shop.php?category=sleep-mind') ?>" class="hover:text-white transition-colors">Sleep, Stress & Ashwagandha</a></li>
            <li><a href="<?= url('shop.php?category=joint-bone') ?>" class="hover:text-white transition-colors">Joint & Bone Care</a></li>
            <li><a href="<?= url('shop.php?category=daily-rasayana') ?>" class="hover:text-white transition-colors">Daily Rasayana & Ghee</a></li>
          </ul>
        </div>

        <!-- Transparency & Tools -->
        <div class="space-y-3">
          <h4 class="font-bold text-sm text-[#C8922B] uppercase tracking-wider font-serif-luxury"><?= CURRENT_LANG === 'hi' ? 'प्रमाण व साधन' : 'Proof & Tools' ?></h4>
          <ul class="text-xs space-y-2 text-[#DDE5D6]">
            <li><a href="<?= url('verify-batch.php') ?>" class="hover:text-white transition-colors flex items-center space-x-1"><span>🔍</span><span>Verify Batch CoA</span></a></li>
            <li><a href="<?= url('prakriti-quiz.php') ?>" class="hover:text-white transition-colors flex items-center space-x-1"><span>✨</span><span>Prakriti Dosha Quiz</span></a></li>
            <li><a href="<?= url('quality.php') ?>" class="hover:text-white transition-colors">Quality & NABL Labs</a></li>
            <li><a href="<?= url('blog.php') ?>" class="hover:text-white transition-colors">Herbal Encyclopedia</a></li>
            <li><a href="<?= url('about.php') ?>" class="hover:text-white transition-colors">Vaidya Advisory Council</a></li>
            <li><a href="<?= url('track-order.php') ?>" class="hover:text-white transition-colors">Track Courier Status</a></li>
          </ul>
        </div>

        <!-- Legal & Regulatory -->
        <div class="space-y-3">
          <h4 class="font-bold text-sm text-[#C8922B] uppercase tracking-wider font-serif-luxury"><?= CURRENT_LANG === 'hi' ? 'नीतियां व नियम' : 'Policies & Legal' ?></h4>
          <ul class="text-xs space-y-2 text-[#DDE5D6]">
            <li><a href="<?= url('policies/medical-disclaimer.php') ?>" class="hover:text-white transition-colors">Medical Disclaimer</a></li>
            <li><a href="<?= url('policies/shipping.php') ?>" class="hover:text-white transition-colors">Shipping & Delivery Policy</a></li>
            <li><a href="<?= url('policies/refund.php') ?>" class="hover:text-white transition-colors">Cancellation & Refunds</a></li>
            <li><a href="<?= url('policies/privacy.php') ?>" class="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="<?= url('policies/terms.php') ?>" class="hover:text-white transition-colors">Terms of Service</a></li>
            <li><a href="<?= url('admin/index.php') ?>" class="text-[#C8922B] hover:underline font-semibold">Admin Panel Login</a></li>
          </ul>
        </div>

      </div>

      <!-- Copyright Bar -->
      <div class="pt-8 border-t border-[#1F4D3A] flex flex-col sm:flex-row justify-between items-center text-xs text-gray-400 space-y-2 sm:space-y-0">
        <p>© <?= date('Y') ?> AARU Ayurveda Private Limited. All Rights Reserved. Reg. AYUSH MP/2023/8891.</p>
        <div class="flex items-center space-x-3 text-xs">
          <span>COD Available</span>
          <span>•</span>
          <span>UPI 5% Discount</span>
          <span>•</span>
          <span>ISO 17025 Accredited</span>
        </div>
      </div>
    </div>
  </footer>

  <!-- Sticky Mobile Bottom Bar -->
  <?php require_once __DIR__ . '/sticky_mobile_bar.php'; ?>

  <!-- Floating WhatsApp Chat -->
  <?php require_once __DIR__ . '/floating_whatsapp.php'; ?>

  <!-- Core Javascript Engine -->
  <script src="<?= asset('js/app.js') ?>"></script>
</body>
</html>
