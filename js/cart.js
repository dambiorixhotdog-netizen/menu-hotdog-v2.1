// ===== AGREGAR AL CARRITO =====
function handleAddToCart(itemId) {
  const item = window.menuData.find(i => i.id === itemId);
  if (!item) return;

  if (item.hasVariants) {
    openOptionModal(item); 
  } else {
    addToCart({ id: item.id, name: item.name, price: item.price, variant: null });
  }
}

// ===== MODAL DE VARIANTES =====
function openOptionModal(item) {
  const modal = document.getElementById('priceOptionModal');
  document.getElementById('optionModalTitle').innerText = item.name;

  document.getElementById('optionModalOptions').innerHTML = item.options.map(opt => `
    <button onclick="selectOptionAndAdd('${item.id}', '${opt.label}', ${opt.price})"
      class="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-amber-500/50 p-3 rounded-xl flex items-center justify-between text-left transition-all">
      <span class="text-sm font-semibold text-white">${opt.label}</span>
      <span class="font-title font-black text-amber-400 text-sm">$${opt.price}</span>
    </button>
  `).join('');

  modal.classList.remove('hidden');
}

function closeOptionModal() {
  document.getElementById('priceOptionModal').classList.add('hidden');
}

function selectOptionAndAdd(itemId, variantLabel, price) {
  const item = window.menuData.find(i => i.id === itemId);
  if (!item) return;

  addToCart({
    id: `${item.id}-${variantLabel}`,
    name: `${item.name} (${variantLabel})`,
    price,
    variant: variantLabel
  });
  closeOptionModal();
}

// ===== LÓGICA DEL CARRITO =====
function addToCart(product) {
  const existing = AppState.cart.find(i => i.id === product.id);
  if (existing) {
    existing.qty += 1;
  } else {
    AppState.cart.push({ ...product, qty: 1 });
  }
  updateCartUI();
  animateCartButton();
}

function animateCartButton() {
  const cartBar = document.getElementById('floatingCartBtn');
  if (cartBar) {
    cartBar.classList.add('scale-105');
    setTimeout(() => cartBar.classList.remove('scale-105'), 150);
  }
}

function changeQty(id, delta) {
  const item = AppState.cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    AppState.cart = AppState.cart.filter(i => i.id !== id);
  }
  updateCartUI();
}

// ===== ACTUALIZAR UI DEL CARRITO =====
function updateCartUI() {
  const totalItems = calculateCartCount();
  const subtotal = calculateCartSubtotal();

  const cartBadge = document.getElementById('cartBadgeCount');
  if (cartBadge) cartBadge.innerText = totalItems;
  
  const mobileBadge = document.getElementById('mobileCartBadge');
  if (mobileBadge) mobileBadge.innerText = totalItems;

  const cartBarTotal = document.getElementById('cartBarTotal');
  if (cartBarTotal) cartBarTotal.innerText = formatPrice(subtotal);

  document.getElementById('cartSubtotal').innerText = formatPrice(subtotal);
  document.getElementById('cartTotal').innerText = formatPrice(subtotal);

  const itemsContainer = document.getElementById('cartItemsContainer');

  if (AppState.cart.length === 0) {
    itemsContainer.innerHTML = `
      <div class="py-12 text-center text-slate-500 space-y-2">
        <i class="fa-solid fa-cart-flatbed text-4xl text-slate-700"></i>
        <p class="text-sm">Tu carrito está vacío.</p>
        <p class="text-xs text-slate-600">Agrega algo rico de nuestro menú.</p>
      </div>
    `;
    return;
  }

  itemsContainer.innerHTML = AppState.cart.map(item => `
    <div class="py-3 flex items-center justify-between gap-3">
      <div class="flex-grow">
        <h4 class="text-sm font-bold text-white leading-tight">${item.name}</h4>
        <span class="text-xs text-amber-400 font-medium">$${item.price} c/u</span>
      </div>
      <div class="flex items-center space-x-2 bg-slate-800 rounded-lg p-1 border border-slate-700">
        <button onclick="changeQty('${item.id}', -1)" class="w-6 h-6 rounded bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-bold flex items-center justify-center">
          <i class="fa-solid fa-minus"></i>
        </button>
        <span class="text-xs font-bold text-white px-1.5">${item.qty}</span>
        <button onclick="changeQty('${item.id}', 1)" class="w-6 h-6 rounded bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-bold flex items-center justify-center">
          <i class="fa-solid fa-plus"></i>
        </button>
      </div>
      <div class="text-right min-w-[50px]">
        <span class="text-sm font-bold text-white">$${item.price * item.qty}</span>
      </div>
    </div>
  `).join('');
}

// ===== DRAWER TOGGLE =====
function openCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  const backdrop = document.getElementById('cartBackdrop');
  const panel = document.getElementById('cartPanel');
  drawer.classList.remove('invisible');
  setTimeout(() => {
    backdrop.classList.remove('opacity-0');
    panel.classList.remove('translate-x-full');
  }, 10);
}

function closeCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  const backdrop = document.getElementById('cartBackdrop');
  const panel = document.getElementById('cartPanel');
  backdrop.classList.add('opacity-0');
  panel.classList.add('translate-x-full');
  setTimeout(() => drawer.classList.add('invisible'), 300);
}