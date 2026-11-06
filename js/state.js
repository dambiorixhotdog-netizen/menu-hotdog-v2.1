// Estado global de la aplicación
const AppState = {
  currentCategory: 'Todos',
  cart: [],
  currentOrders: JSON.parse(localStorage.getItem(APP_CONFIG.storageKeys.orders) || '[]'),
  orderCounter: parseInt(localStorage.getItem(APP_CONFIG.storageKeys.counter) || APP_CONFIG.orderCounterStart),
  currentTicket: null
};

// Persistencia
function saveOrders() {
  localStorage.setItem(APP_CONFIG.storageKeys.orders, JSON.stringify(AppState.currentOrders));
}

function saveOrderCounter() {
  localStorage.setItem(APP_CONFIG.storageKeys.counter, AppState.orderCounter.toString());
}