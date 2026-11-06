// Catálogo completo del menú
const menuData = [
  // RIKI
  { id: 'riki-1', category: 'Riki', name: 'RIKI DE POLLO', price: 70, desc: 'Pan suave relleno de jugosa carne de pollo sazonada al estilo de la casa.' },
  { id: 'riki-2', category: 'Riki', name: 'RIKI DE HUEVO', price: 50, desc: 'Delicioso riki tradicional preparado con huevo fresco a la plancha.' },
  { id: 'riki-3', category: 'Riki', name: 'RIKI DE PIERNA', price: 70, desc: 'Exquisita pierna de cerdo Horneada en suave pan artesanal.' },
  { id: 'riki-4', category: 'Riki', name: 'RIKI MIXTO', price: 80, desc: 'Combinación perfecta de carnes para un sabor único e intenso.' },

  // HOT DOG
  { id: 'hd-1', category: 'Hot Dog', name: 'HOT DOG AL VAPOR', price: 100, desc: 'Clásico hot dog al vapor súper tierno con salsas de la casa y repollo.' },
  { id: 'hd-2', category: 'Hot Dog', name: 'HOT DOG A LA PLANCHA', price: 100, desc: 'Salchicha doradita a la plancha con topping de papitas crunch y aderezos.' },
  { id: 'hd-3', category: 'Hot Dog', name: 'SALCHICHA CON VEGETALES', price: 70, desc: 'Salchicha salteada a la plancha acompañada de frescos vegetales.' },

  // TACOS
  { id: 'taco-1', category: 'Tacos', name: 'Tacos de Pollo', price: 90, desc: 'Tortillas rellenas de pechuga de pollo desmenuzada y salsa especial.' },
  { id: 'taco-2', category: 'Tacos', name: 'Tacos de Pierna', price: 90, desc: 'Tortillas rellenas de sabrosa pierna de cerdo jugosa y sazonada.' },
  { id: 'taco-3', category: 'Tacos', name: 'Tacos Mixtos', price: 90, desc: 'La combinación ideal de pollo y pierna en tortilla caliente.' },
  { id: 'taco-4', category: 'Tacos', name: 'Tacos de Vegetales', price: 90, desc: 'Variedad de vegetales frescos salteados con aderezo de la casa.' },

  // SANDWICHES
  { id: 'sw-1', category: 'Sandwiches', name: 'SANDWICH DE PIERNA', price: 250, desc: 'Abundante pierna de cerdo con vegetal fresco y aderezos en pan tostado.' },
  { id: 'sw-2', category: 'Sandwiches', name: 'SANDWICH DE POLLO', price: 250, desc: 'Pechuga de pollo a la plancha en pan tostado con vegetales.' },
  { id: 'sw-3', category: 'Sandwiches', name: 'SANDWICH MIXTO', price: 250, desc: 'Combinación generosa de pollo y pierna con aderezos y vegetales.' },
  { id: 'sw-4', category: 'Sandwiches', name: 'CLUB SANDWICH', price: 350, desc: 'El rey de los sándwiches: capas de jamón, queso, pollo, tocineta y vegetal.' },
  { id: 'sw-5', category: 'Sandwiches', name: 'SANDWICH JAMÓN Y QUESO', price: 100, desc: 'Clásico sándwich tostado con jamón de calidad y queso fundido.' },
  { id: 'sw-6', category: 'Sandwiches', name: 'PATACÓN', price: 275, desc: 'Crujiente platano verde frito relleno de carne a elección, queso y salsas.' },

  // HAMBURGUESAS
  { id: 'burg-1', category: 'Hamburguesas', name: 'HAMBURGUESA SENCILLA', price: 150, desc: 'Jugosa carne artesanal con vegetales frescos y salsas de la casa.' },
  { id: 'burg-2', category: 'Hamburguesas', name: 'CHEESEBURGER', price: 170, desc: 'Carne a la parrilla cubierta de queso cheddar derretido.' },
  { id: 'burg-3', category: 'Hamburguesas', name: 'BACON CHEESE BURGER', price: 190, desc: 'Carne jugosa, queso fundido y crujientes tiras de tocineta.' },
  { id: 'burg-4', category: 'Hamburguesas', name: 'BACON CHEESE DOBLE CARNE', price: 230, desc: 'Doble porción de carne jugosa, queso extra y abundante tocineta.' },

  // HAMBURGUESAS CON PAPA
  { id: 'burgp-1', category: 'Hamburguesas', name: 'HAMBURGUESA CON PAPAS', price: 210, desc: 'Hamburguesa sencilla acompañada de una ración de papas fritas doraditas.' },
  { id: 'burgp-2', category: 'Hamburguesas', name: 'CHEESEBURGER CON PAPAS', price: 230, desc: 'Hamburguesa con queso cheddar acompañada de papas fritas.' },
  { id: 'burgp-3', category: 'Hamburguesas', name: 'BACON CHEESE BURGER CON PAPAS', price: 250, desc: 'Hamburguesa con tocineta y queso acompañada de papas fritas.' },
  { id: 'burgp-4', category: 'Hamburguesas', name: 'BACON CHEESE DOBLE CARNE CON PAPAS', price: 290, desc: 'Doble carne, queso, tocineta y ración de papas fritas.' },

  // BURRITOS
  { id: 'bur-1', category: 'Burritos', name: 'Burrito de Pollo', price: 250, desc: 'Tortilla gigante envuelta con jugoso pollo, queso y vegetales.' },
  { id: 'bur-2', category: 'Burritos', name: 'Burrito de Pierna', price: 270, desc: 'Tortilla gigante rellena de pierna sazonada y vegetales.' },
  { id: 'bur-3', category: 'Burritos', name: 'Burrito de Vegetales', price: 220, desc: 'Opción ligera y sabrosa repleta de vegetales salteados y queso.' },
  { id: 'bur-4', category: 'Burritos', name: 'Burrito Mixto', price: 270, desc: 'La mejor mezcla de pollo y pierna con salsa y vegetales.' },
  { id: 'bur-5', category: 'Burritos', name: 'Burrito sin vegetal', price: 300, desc: 'Pura carne y queso derretido en tortilla caliente, sin vegetales.' },

  // BEBIDAS
  { id: 'beb-1', category: 'Bebidas', name: 'JUGOS', price: 60, desc: 'Jugos naturales fríos y refrescantes.' },
  { id: 'beb-2', category: 'Bebidas', name: 'REFRESCO', price: 50, desc: 'Refresco embotellado variado frío.' },
  { id: 'beb-3', category: 'Bebidas', name: 'AGUA', price: 30, desc: 'Botella de agua purificada.' },

  // YAROA
  { id: 'yar-1', category: 'Yaroa', name: 'YAROA PAPA GRANDE', price: 400, desc: 'Capa abundante de papas fritas, carne a elección, queso fundido y salsas.' },
  { id: 'yar-2', category: 'Yaroa', name: 'YAROA PLÁTANO GRANDE', price: 370, desc: 'Dulce plátano maduro majado con carne, capa gruesa de queso fundido.' },
  { id: 'yar-3', category: 'Yaroa', name: 'YAROA MIXTA GRANDE', price: 370, desc: 'Base combinada de papas y plátano maduro con mezcla de carnes.' },
  { id: 'yar-4', category: 'Yaroa', name: 'YAROA PAPA MEDIANA', price: 350, desc: 'Porción mediana de yaroa sobre papas fritas y queso gratinado.' },
  { id: 'yar-5', category: 'Yaroa', name: 'YAROA PLÁTANO MEDIANA', price: 330, desc: 'Porción mediana de plátano maduro con abundante queso.' },
  { id: 'yar-6', category: 'Yaroa', name: 'YAROA MIXTA MEDIANA', price: 320, desc: 'Tamaño mediano con base mixta de plátano y papas.' },
  { id: 'yar-7', category: 'Yaroa', name: 'YAROA PAPA PEQUEÑA', price: 250, desc: 'Porción personal de yaroa en papas fritas.' },
  { id: 'yar-8', category: 'Yaroa', name: 'YAROA PLÁTANO PEQUEÑA', price: 230, desc: 'Porción personal de plátano maduro con carne y queso.' },
  { id: 'yar-9', category: 'Yaroa', name: 'YAROA MIXTA PEQUEÑA', price: 230, desc: 'Porción personal con combinación de papas y plátano.' },

  // QUESADILLAS
  { id: 'ques-1', category: 'Quesadillas', name: 'QUESADILLA DE POLLO', price: 250, desc: 'Tortilla tostada de harina con queso derretido y jugoso pollo.' },
  { id: 'ques-2', category: 'Quesadillas', name: 'QUESADILLA DE PIERNA', price: 250, desc: 'Tortilla a la plancha cargada de queso y pierna de cerdo.' },
  { id: 'ques-3', category: 'Quesadillas', name: 'QUESADILLA MIXTA', price: 250, desc: 'Mezcla sabrosa de pollo, pierna y doble queso.' },

  // ADICIONALES
  { id: 'adic-1', category: 'Adicionales', name: 'EXTRA POLLO', price: 60, desc: 'Porción adicional de pollo sazonado.' },
  { id: 'adic-2', category: 'Adicionales', name: 'EXTRA PIERNA', price: 60, desc: 'Porción extra de jugosa pierna horneada.' },
  { id: 'adic-3', category: 'Adicionales', name: 'EXTRA QUESO', price: 60, desc: 'Porción extra de queso gratinado.' },
  { id: 'adic-4', category: 'Adicionales', name: 'EXTRA CARNE', price: 60, desc: 'Porción extra de carne.' },
  { id: 'adic-5', category: 'Adicionales', name: 'PAPA PEQUEÑA', price: 100, desc: 'Ración individual de papas fritas crujientes.' },
  { id: 'adic-6', category: 'Adicionales', name: 'PAPA MEDIANA', price: 200, desc: 'Ración mediana para compartir de papas fritas.' },

  // SALCHIPAPAS
  { id: 'salch-1', category: 'Salchipapas', name: 'SALCHIPAPAS PEQUEÑA', price: 250, desc: 'Papas fritas crujientes con salchicha troceada y salsas.' },
  { id: 'salch-2', category: 'Salchipapas', name: 'SALCHIPAPAS MEDIANA', price: 310, desc: 'Porción mediana ideal para compartir de salchipapas.' },
  { id: 'salch-3', category: 'Salchipapas', name: 'SALCHIPAPAS GRANDE', price: 350, desc: 'Bandeja grande de papas y salchichas llenas de sabor.' },
  { id: 'salch-4', category: 'Salchipapas', name: 'SALCHIPATANO PEQUEÑA', price: 200, desc: 'Deliciosa combinación de plátano frito con salchichas troceadas.' },

  // CARNES (con variantes de precio)
  {
    id: 'car-1',
    category: 'Carnes',
    name: 'ALITAS FRITAS',
    hasVariants: true,
    options: [
      { label: 'Porción Pequeña', price: 300 },
      { label: 'Porción Grande', price: 500 }
    ],
    desc: 'Crujientes alitas fritas sazonadas con especias de la casa.'
  },
  { id: 'car-2', category: 'Carnes', name: 'ALITA BBQ', price: 450, desc: 'Alitas bañadas en una rica e intensa salsa BBQ ahumada.' },
  {
    id: 'car-3',
    category: 'Carnes',
    name: 'PECHURINA',
    hasVariants: true,
    options: [
      { label: 'Porción Pequeña', price: 300 },
      { label: 'Porción Grande', price: 500 }
    ],
    desc: 'Tiras empanizadas de pechuga doradas y crujientes.'
  },
  {
    id: 'car-4',
    category: 'Carnes',
    name: 'CARNE SALADA',
    hasVariants: true,
    options: [
      { label: 'Porción Pequeña', price: 300 },
      { label: 'Porción Grande', price: 500 }
    ],
    desc: 'Sabrosa carne de cerdo salada frita al estilo dominicano.'
  },
  {
    id: 'car-5',
    category: 'Carnes',
    name: 'COSTILLITAS',
    hasVariants: true,
    options: [
      { label: 'Porción Pequeña', price: 400 },
      { label: 'Porción Grande', price: 700 }
    ],
    desc: 'Tiernas costillitas fritas llenas de sazón.'
  },
  { id: 'car-6', category: 'Carnes', name: 'CHORIZO', price: 60, desc: 'Sabroso chorizo a la plancha.' }
];

const categories = [
  'Todos', 'Riki', 'Hot Dog', 'Tacos', 'Sandwiches', 'Hamburguesas',
  'Burritos', 'Bebidas', 'Yaroa', 'Quesadillas', 'Adicionales',
  'Salchipapas', 'Carnes'
];