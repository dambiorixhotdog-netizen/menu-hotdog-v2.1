import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4';
const supabase = createClient('https://eiphlylrwwijogoyqwns.supabase.co', 'sb_publishable_afTPTTSnyflSQpDVZLzlvA_1G08TBJp');

// Mostrar/Ocultar campo de dirección
window.addEventListener('DOMContentLoaded', () => {
  const orderType = document.getElementById('orderType');
  const addressContainer = document.getElementById('addressContainer');
  
  if (orderType && addressContainer) {
    orderType.addEventListener('change', (e) => {
      if (e.target.value === 'Domicilio') {
        addressContainer.classList.remove('hidden');
      } else {
        addressContainer.classList.add('hidden');
      }
    });
  }
});

// ===== COMPARTIR UBICACIÓN GPS =====
function shareLocation() {
  if (!navigator.geolocation) {
    alert("Tu navegador no soporta la geolocalización. Por favor, escribe tu dirección manualmente.");
    return;
  }

  const btn = event.target;
  const originalText = btn.innerHTML;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Obteniendo...';
  btn.disabled = true;

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      
      // Crear enlace de Google Maps
      const mapUrl = `https://www.google.com/maps?q=${lat},${lng}`;
      
      // Guardar en el input oculto
      document.getElementById('customerLocationURL').value = mapUrl;
      
      // Mostrar confirmación
      const statusMsg = document.getElementById('locationStatus');
      statusMsg.classList.remove('hidden');
      
      btn.innerHTML = '<i class="fa-solid fa-check"></i> Ubicación Adjuntada';
      btn.classList.replace('bg-blue-600', 'bg-green-600');
      btn.classList.replace('hover:bg-blue-500', 'hover:bg-green-500');
      btn.disabled = false;
    },
    (error) => {
      alert("No pudimos obtener tu ubicación. Asegúrate de dar permisos al navegador o escribe la dirección manualmente.");
      btn.innerHTML = originalText;
      btn.disabled = false;
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
  );
}
window.shareLocation = shareLocation;

// ===== CONFIRMAR PEDIDO =====
async function confirmOrder() {
  if (AppState.cart.length === 0) {
    alert('Tu carrito está vacío. Agrega productos antes de confirmar.');
    return;
  }

  const customerNameInput = document.getElementById('customerName');
  const customerName = customerNameInput ? customerNameInput.value.trim() : '';
  if (!customerName) {
    alert('Por favor ingresa tu nombre para el turno.');
    if (customerNameInput) customerNameInput.focus();
    return;
  }

  const orderTypeInput = document.getElementById('orderType');
  const paymentMethodInput = document.getElementById('paymentMethod');
  const notesInput = document.getElementById('orderNotes');
  const addressInput = document.getElementById('customerAddress');
  const locationInput = document.getElementById('customerLocationURL');

  const orderType = orderTypeInput ? orderTypeInput.value : 'Para Llevar';
  const paymentMethod = paymentMethodInput ? paymentMethodInput.value : 'Efectivo';
  const notes = notesInput ? notesInput.value.trim() : '';
  const address = addressInput ? addressInput.value.trim() : '';
  const locationURL = locationInput ? locationInput.value : '';

  if (orderType === 'Domicilio' && !address && !locationURL) {
    alert('Por favor ingresa tu dirección o comparte tu ubicación para el envío a domicilio.');
    if (addressInput) addressInput.focus();
    return;
  }

  const turnoNum = `#T-${AppState.orderCounter}`;
  AppState.orderCounter++;
  saveOrderCounter();

  const newOrder = {
    id: 'ORD-' + Date.now(),
    turno: turnoNum,
    customer: customerName,
    type: orderType,
    payment: paymentMethod,
    notes: notes,
    address: address,
    locationURL: locationURL, // Guardamos el link de Google Maps
    items: [...AppState.cart],
    total: calculateCartSubtotal(),
    status: APP_CONFIG.orderStatus.PREPARING,
    date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

  AppState.currentTicket = newOrder;
  AppState.cart = [];
  updateCartUI();
  closeCartDrawer();
  playOrderBeep();

  showTicketModal(newOrder);

  showTicketModal(newOrder);
  // Sin setTimeout: iOS bloquea window.open si no es en el mismo tick del clic
  await sendWhatsAppOrder(newOrder);
}
// ===== MOSTRAR EL TICKET =====
function showTicketModal(order) {
  document.getElementById('ticketTurnoDisplay').innerText = order.turno;
  document.getElementById('ticketCustomer').innerText = order.customer;
  document.getElementById('ticketType').innerText = order.type;
  document.getElementById('ticketPayment').innerText = order.payment;
  document.getElementById('ticketDate').innerText = order.date;
  document.getElementById('ticketTotal').innerText = `$${order.total}`;

  const addressRow = document.getElementById('ticketAddressRow');
  const addressText = document.getElementById('ticketAddress');
  if (order.type === 'Domicilio' && order.address) {
    addressRow.classList.remove('hidden');
    addressText.innerText = order.address;
  } else {
    addressRow.classList.add('hidden');
  }

  // Mostrar link de Google Maps en el ticket
  const mapRow = document.getElementById('ticketMapRow');
  const mapLink = document.getElementById('ticketMapLink');
  if (order.type === 'Domicilio' && order.locationURL) {
    mapRow.classList.remove('hidden');
    mapLink.href = order.locationURL;
  } else {
    mapRow.classList.add('hidden');
  }

  const notesContainer = document.getElementById('ticketNotesContainer');
  if (order.notes) {
    document.getElementById('ticketNotes').innerText = order.notes;
    notesContainer.classList.remove('hidden');
  } else {
    notesContainer.classList.add('hidden');
  }

  document.getElementById('ticketItemsList').innerHTML = order.items.map(item => `
    <div class="py-1 flex justify-between items-center text-xs">
      <span class="text-slate-300 font-medium">${item.qty}x ${item.name}</span>
      <span class="text-amber-400 font-bold">$${item.price * item.qty}</span>
    </div>
  `).join('');

  document.getElementById('ticketModal').classList.remove('hidden');
}

function closeTicketModal() {
  document.getElementById('ticketModal').classList.add('hidden');
}

// ===== ENVIAR A WHATSAPP =====
async function sendWhatsAppOrder(orderToSend) {
  const t = orderToSend || AppState.currentTicket;
  if (!t) return;

  let phone = APP_CONFIG.whatsappPhone;
  try {
    const { data } = await supabase.from('categories').select('whatsapp_phone').limit(1);
    if (data && data.length > 0 && data[0].whatsapp_phone) {
      phone = data[0].whatsapp_phone;
    }
  } catch (error) {
    console.warn("Usando número por defecto.");
  }
  // ✅ NUEVO: sanitizar el número
  phone = phone.replace(/\D/g, '');
  
  let message = `*NUEVO PEDIDO - D’AMBIORIX HOTDOG*\n`;
  message += `*TURNO:* ${t.turno}\n`;
  message += `*Cliente:* ${t.customer}\n`;
  message += `*Tipo:* ${t.type}\n`;
  
  if (t.type === 'Domicilio') {
    if (t.address) message += `*Dirección:* ${t.address}\n`;
    if (t.locationURL) message += `*Ubicación GPS:* ${t.locationURL}\n`;
  }
  
  message += `*Pago:* ${t.payment}\n\n`;
  message += `*DETALLE DEL PEDIDO:*\n`;
  t.items.forEach(item => {
    message += `• ${item.qty}x ${item.name} - $${item.price * item.qty}\n`;
  });
  if (t.notes) message += `\n*Notas:* ${t.notes}\n`;
  message += `\n*TOTAL: $${t.total}*`;

   const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  const link = document.createElement('a');
  link.href = url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Exponer funciones
window.confirmOrder = confirmOrder;
window.closeTicketModal = closeTicketModal;
window.sendWhatsAppOrder = sendWhatsAppOrder;