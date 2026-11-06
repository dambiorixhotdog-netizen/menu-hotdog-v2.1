// ===== QR CODE =====
function generateQRCode() {
  const qrContainer = document.getElementById("qrcode");
  if (!qrContainer) return;
  qrContainer.innerHTML = "";
  new QRCode(qrContainer, {
    text: window.location.href,
    width: 160,
    height: 160,
    colorDark: "#111827",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });
}

function openQRModal() {
  document.getElementById('qrModal').classList.remove('hidden');
}

function closeQRModal() {
  document.getElementById('qrModal').classList.add('hidden');
}

// ===== IMPRESIÓN DE TICKET =====
function printTicket() {
  window.print();
}

// ===== INICIALIZACIÓN =====
window.addEventListener('DOMContentLoaded', () => {
  updateCartUI();     // Inicializa el carrito en 0
  generateQRCode();   // Genera el QR
});