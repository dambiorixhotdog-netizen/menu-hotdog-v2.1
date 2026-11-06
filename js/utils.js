// Genera un beep de notificación usando Web Audio API
function playOrderBeep() {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.3);
  } catch (e) {
    console.log("Audio no soportado.");
  }
}

// Formatea número a moneda simple
function formatPrice(value) {
  return `$${value}`;
}

// Calcula subtotal del carrito
function calculateCartSubtotal() {
  return AppState.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

// Calcula total de ítems
function calculateCartCount() {
  return AppState.cart.reduce((sum, item) => sum + item.qty, 0);
}