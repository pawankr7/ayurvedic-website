<?php
/**
 * AARU AYURVEDA - Consult a Vaidya & Contact Page
 */
require_once __DIR__ . '/config/config.php';
$db = getDB();

$msg = '';
$err = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = clean($_POST['name'] ?? '');
    $email = clean($_POST['email'] ?? '');
    $phone = clean($_POST['phone'] ?? '');
    $type = clean($_POST['type'] ?? 'Doctor Consultation');
    $subject = clean($_POST['subject'] ?? 'Consultation Request');
    $message = clean($_POST['message'] ?? '');

    if (empty($name) || empty($phone) || empty($message)) {
        $err = 'Please fill out your Name, Phone/WhatsApp, and description.';
    } else {
        try {
            $stmt = $db->prepare("INSERT INTO contact_messages (name, email, phone, subject, message, consultation_type)
                VALUES (:name, :email, :phone, :subject, :message, :type)");
            $stmt->execute([
                ':name' => $name,
                ':email' => $email,
                ':phone' => $phone,
                ':subject' => $subject,
                ':message' => $message,
                ':type' => $type
            ]);
            $msg = 'Dhanyavaad! Your inquiry has been routed to our Senior Vaidya advisory desk. We will reach out on WhatsApp/Phone shortly.';
        } catch (PDOException $e) {
            $err = 'Failed to submit request: ' . $e->getMessage();
        }
    }
}

$pageTitle = 'Consult a Senior Vaidya | AARU Ayurveda';
$pageDescription = 'Book a 1-on-1 consultation with certified BAMS Ayurvedic physicians or reach customer care.';

require_once __DIR__ . '/includes/header.php';
?>

<div class="bg-[#FAF6EC] py-12 border-b border-[#E8DEC8]">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
    <span class="inline-block bg-[#DDE5D6] text-[#1F4D3A] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
      🩺 Personalized Care
    </span>
    <h1 class="text-3xl sm:text-5xl font-extrabold text-[#1F4D3A] font-serif-luxury">
      <?= CURRENT_LANG === 'hi' ? 'आयुर्वेदिक वैद्य से परामर्श करें' : 'Consult a Senior Vaidya' ?>
    </h1>
    <p class="text-xs sm:text-sm text-[#7A6B5D] max-w-2xl mx-auto leading-relaxed">
      Whether you need advice selecting the right herb for your Prakriti or have questions about a batch certificate, our clinical team is here to guide you.
    </p>
  </div>
</div>

<main class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
    
    <!-- Left Form -->
    <div class="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-[#E8DEC8] shadow-sm space-y-6">
      <h2 class="text-xl font-bold text-[#1F4D3A] font-serif-luxury">Send a Consultation Request</h2>

      <?php if (!empty($msg)): ?>
        <div class="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl font-medium">
          <?= htmlspecialchars($msg) ?>
        </div>
      <?php endif; ?>

      <?php if (!empty($err)): ?>
        <div class="p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium">
          <?= htmlspecialchars($err) ?>
        </div>
      <?php endif; ?>

      <form method="POST" class="space-y-4">
        <div>
          <label class="block text-xs font-bold text-[#1F4D3A] mb-1">Your Full Name *</label>
          <input type="text" name="name" required placeholder="e.g. Vikramaditya" class="w-full text-xs px-4 py-3 rounded-xl border border-[#D5C7B0] focus:outline-none focus:border-[#1F4D3A]">
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold text-[#1F4D3A] mb-1">Phone / WhatsApp Number *</label>
            <input type="tel" name="phone" required placeholder="e.g. +91 98765 43210" class="w-full text-xs px-4 py-3 rounded-xl border border-[#D5C7B0] focus:outline-none focus:border-[#1F4D3A]">
          </div>
          <div>
            <label class="block text-xs font-bold text-[#1F4D3A] mb-1">Email Address</label>
            <input type="email" name="email" placeholder="e.g. vikram@gmail.com" class="w-full text-xs px-4 py-3 rounded-xl border border-[#D5C7B0] focus:outline-none focus:border-[#1F4D3A]">
          </div>
        </div>

        <div>
          <label class="block text-xs font-bold text-[#1F4D3A] mb-1">Consultation Category</label>
          <select name="type" class="w-full text-xs px-4 py-3 rounded-xl border border-[#D5C7B0] bg-white text-[#3B2F25] focus:outline-none focus:border-[#1F4D3A]">
            <option value="Doctor Consultation">General Health & Prakriti Consultation</option>
            <option value="Gut Health">Gut Health, Bloating & Constipation</option>
            <option value="Men Vitality">Men's Stamina & Shilajit Advice</option>
            <option value="Women Wellness">PCOD / Hormonal Support</option>
            <option value="Batch Lab Inquiry">Lab Report & CoA Question</option>
          </select>
        </div>

        <div>
          <label class="block text-xs font-bold text-[#1F4D3A] mb-1">Health Concern / Question *</label>
          <textarea name="message" required rows="4" placeholder="Describe symptoms, diet habits, or the specific product you need guidance on..." class="w-full text-xs px-4 py-3 rounded-xl border border-[#D5C7B0] focus:outline-none focus:border-[#1F4D3A]"></textarea>
        </div>

        <button type="submit" class="w-full btn-forest py-4 rounded-xl text-xs uppercase tracking-wider font-extrabold shadow-md">
          Request Vaidya Callback →
        </button>
      </form>
    </div>

    <!-- Right Information Column -->
    <div class="lg:col-span-5 space-y-6">
      <div class="bg-[#FAF6EC] rounded-3xl p-6 sm:p-8 border border-[#E8DEC8] space-y-4 text-xs">
        <h3 class="font-bold text-base text-[#1F4D3A] font-serif-luxury">Direct Channels</h3>
        <div class="space-y-3 text-[#7A6B5D]">
          <div>
            <strong class="text-[#1F4D3A] block">WhatsApp Doctor Desk:</strong>
            <a href="https://wa.me/919876543210" class="text-[#C8922B] hover:underline font-bold">+91 98765 43210</a>
          </div>
          <div>
            <strong class="text-[#1F4D3A] block">Clinical Email:</strong>
            <a href="mailto:care@aaruayurveda.com" class="text-[#C8922B] hover:underline font-bold">care@aaruayurveda.com</a>
          </div>
          <div>
            <strong class="text-[#1F4D3A] block">Manufacturing Facility & Labs:</strong>
            <span>RIICO Industrial Growth Centre, Phase-II, Neemrana, Rajasthan 301705</span>
          </div>
          <div>
            <strong class="text-[#1F4D3A] block">Working Hours:</strong>
            <span>Monday – Saturday: 9:00 AM – 7:00 PM IST</span>
          </div>
        </div>
      </div>
    </div>

  </div>
</main>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
