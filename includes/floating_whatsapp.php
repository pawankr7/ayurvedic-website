<?php
/**
 * AARU AYURVEDA - Floating WhatsApp Consultation Trigger
 */
$whatsappMsg = urlencode(CURRENT_LANG === 'hi' ? 'नमस्ते आरु आयुर्वेद, मुझे अपनी स्वास्थ्य समस्या के लिए सही औषधि की सलाह चाहिए।' : 'Namaste AARU, I would like guidance on selecting the right Ayurvedic formulation for my health goals.');
?>
<a href="https://wa.me/919876543210?text=<?= $whatsappMsg ?>" target="_blank" rel="noopener noreferrer" class="fixed bottom-20 lg:bottom-8 right-5 z-40 bg-[#25D366] hover:bg-[#20ba59] text-white p-3.5 rounded-full shadow-2xl flex items-center space-x-2 transition-all hover:scale-110 group border-2 border-white/50" aria-label="Chat with Vaidya on WhatsApp">
  <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.288.043.088.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086.159.058 1.011.477 1.184.564.173.087.289.13.332.202.043.073.043.419-.101.824z"/>
  </svg>
  <span class="hidden group-hover:inline-block text-xs font-bold pr-1">
    <?= CURRENT_LANG === 'hi' ? 'वैद्य सहायता' : 'Vaidya Consult' ?>
  </span>
</a>
