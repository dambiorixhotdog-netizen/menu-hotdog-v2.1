// Configuración de Tailwind — debe ejecutarse ANTES de usar clases personalizadas
tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#E53E3E',
          darkRed: '#9B2C2C',
          amber: '#F6AD55',
          yellow: '#ECC94B',
          dark: '#1A202C',
          card: '#2D3748',
          surface: '#242C3D'
        }
      },
      fontFamily: {
        title: ['Montserrat', 'sans-serif'],
        body: ['Inter', 'sans-serif']
      }
    }
  }
};

// Constantes globales de negocio
const APP_CONFIG = {
  whatsappPhone: "18095550199",
  orderCounterStart: 101,
  storageKeys: {
    orders: "ambiorix_orders",
    counter: "ambiorix_order_counter"
  },
  orderStatus: {
    PREPARING: "En Preparación",
    READY: "Listo",
    DELIVERED: "Entregado"
  }
};