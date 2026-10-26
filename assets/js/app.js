/**
 * AARU AYURVEDA - Core Frontend JavaScript Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initCartDrawer();
  initMobileNav();
});

// Toast notification helper
function showToast(message, type = 'success') {
  let toast = document.getElementById('toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notification';
    toast.className = 'fixed bottom-6 right-6 z-50 bg-[#1F4D3A] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center space-x-3 transition-transform duration-300';
    document.body.appendChild(toast);
  }
  
  const icon = type === 'success' 
    ? '<svg class="w-5 h-5 text-[#C8922B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>'
    : '<svg class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';

  toast.innerHTML = `${icon}<span class="text-sm font-medium">${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

// Cart Drawer Controller
function openCart() {
  document.body.classList.add('cart-open');
}

function closeCart() {
  document.body.classList.remove('cart-open');
}

function initCartDrawer() {
  const openButtons = document.querySelectorAll('.cart-open-btn');
  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openCart();
    });
  });

  const closeBtn = document.getElementById('close-cart-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeCart);
  }

  const backdrop = document.getElementById('cart-backdrop');
  if (backdrop) {
    backdrop.addEventListener('click', closeCart);
  }
}

// Mobile Navbar Toggle
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
}

// AJAX Add to Cart
function addToCart(productId, quantity = 1, batchCode = '') {
  const formData = new FormData();
  formData.append('action', 'add');
  formData.append('product_id', productId);
  formData.append('quantity', quantity);
  formData.append('batch_code', batchCode);

  const apiUrl = window.AARU_BASE_URL ? window.AARU_BASE_URL + '/api/cart.php' : 'api/cart.php';

  fetch(apiUrl, {
    method: 'POST',
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      updateCartUI(data.cart);
      showToast(data.message || 'Added to regimen cart');
      openCart();
    } else {
      showToast(data.error || 'Failed to add item', 'error');
    }
  })
  .catch(err => {
    console.error('Cart error:', err);
    showToast('Network error, please retry', 'error');
  });
}

// AJAX Update Quantity
function updateCartQuantity(productId, delta) {
  const formData = new FormData();
  formData.append('action', 'update_qty');
  formData.append('product_id', productId);
  formData.append('delta', delta);

  const apiUrl = window.AARU_BASE_URL ? window.AARU_BASE_URL + '/api/cart.php' : 'api/cart.php';

  fetch(apiUrl, {
    method: 'POST',
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      updateCartUI(data.cart);
    }
  });
}

// AJAX Remove Item
function removeCartItem(productId) {
  const formData = new FormData();
  formData.append('action', 'remove');
  formData.append('product_id', productId);

  const apiUrl = window.AARU_BASE_URL ? window.AARU_BASE_URL + '/api/cart.php' : 'api/cart.php';

  fetch(apiUrl, {
    method: 'POST',
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      updateCartUI(data.cart);
      showToast('Item removed from cart');
    }
  });
}

// Refresh Cart DOM
function updateCartUI(cart) {
  // Update badge count
  const badges = document.querySelectorAll('.cart-count-badge');
  badges.forEach(b => {
    b.textContent = cart.count;
    if (cart.count > 0) {
      b.classList.remove('hidden');
    } else {
      b.classList.add('hidden');
    }
  });

  // Update Free Shipping Progress Bar
  const progBar = document.getElementById('shipping-progress-bar');
  const progText = document.getElementById('shipping-progress-text');
  if (progBar && progText) {
    progBar.style.width = cart.freeShippingProgress + '%';
    if (cart.freeShippingNeeded <= 0) {
      progText.innerHTML = '🎉 <span class="font-bold text-emerald-700">Congratulations! Free Shipping Unlocked!</span>';
    } else {
      progText.innerHTML = `Add <span class="font-bold text-[#1F4D3A]">₹${cart.freeShippingNeeded}</span> more for <span class="font-bold">FREE Express Delivery</span>`;
    }
  }

  // Update subtotal
  const subtotalElems = document.querySelectorAll('.cart-subtotal-val');
  subtotalElems.forEach(el => {
    el.textContent = '₹' + Number(cart.subtotal).toLocaleString('en-IN');
  });

  // Update Cart Drawer Items List
  const container = document.getElementById('cart-drawer-items');
  if (!container) return;

  if (cart.count === 0) {
    container.innerHTML = `
      <div class="py-16 text-center text-[#7A6B5D]">
        <svg class="w-16 h-16 mx-auto mb-4 text-[#DDE5D6]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
        <p class="font-medium text-lg text-[#3B2F25]">Your Ayurvedic cart is empty</p>
        <p class="text-sm mt-1">Discover pure, lab-verified formulations.</p>
        <a href="${window.AARU_BASE_URL || ''}/shop.php" class="mt-4 inline-block btn-forest px-6 py-2 rounded-full text-sm">Explore Formulations</a>
      </div>
    `;
    return;
  }

  let html = '';
  Object.values(cart.items).forEach(item => {
    html += `
      <div class="flex items-center space-x-4 py-4 border-b border-[#E8DEC8]">
        <div class="w-16 h-16 bg-[#F4EFE2] rounded-lg flex items-center justify-center p-1 text-[#1F4D3A] font-bold text-xs border border-[#E8DEC8] flex-shrink-0">
          ${item.image ? `<img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover rounded" onerror="this.onerror=null;this.parentNode.innerHTML='🌿';"/>` : '🌿'}
        </div>
        <div class="flex-1 min-w-0">
          <h4 class="text-sm font-semibold text-[#1F4D3A] truncate">${item.name}</h4>
          ${item.batch ? `<span class="text-[10px] text-emerald-800 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded font-mono">Batch: ${item.batch}</span>` : ''}
          <div class="flex items-center justify-between mt-2">
            <div class="flex items-center border border-[#D5C7B0] rounded bg-white">
              <button onclick="updateCartQuantity('${item.id}', -1)" class="px-2 py-0.5 text-xs text-[#3B2F25] hover:bg-[#FAF6EC]">-</button>
              <span class="px-2 py-0.5 text-xs font-semibold">${item.quantity}</span>
              <button onclick="updateCartQuantity('${item.id}', 1)" class="px-2 py-0.5 text-xs text-[#3B2F25] hover:bg-[#FAF6EC]">+</button>
            </div>
            <span class="font-bold text-sm text-[#1F4D3A]">₹${Number(item.price * item.quantity).toLocaleString('en-IN')}</span>
          </div>
        </div>
        <button onclick="removeCartItem('${item.id}')" class="text-gray-400 hover:text-red-500 p-1" title="Remove">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
        </button>
      </div>
    `;
  });

  container.innerHTML = html;
}
