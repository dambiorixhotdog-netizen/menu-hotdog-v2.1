import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4';

const supabase = createClient('https://eiphlylrwwijogoyqwns.supabase.co', 'sb_publishable_afTPTTSnyflSQpDVZLzlvA_1G08TBJp');

window.menuData = [];
window.categoriesData = [];

async function loadPublicData() {
  try {
    const { data: cats, error: errCats } = await supabase.from('categories').select('*').order('sort_order');
    const { data: prods, error: errProds } = await supabase.from('products').select('*').eq('is_available', true);
    
    if (errCats) throw errCats;
    if (errProds) throw errProds;

    window.categoriesData = cats || [];
    
    window.menuData = (prods || []).map(p => ({
      id: p.id,
      category: p.category_name,
      name: p.name,
      price: p.price,
      desc: p.description,
      hasVariants: p.has_variants,
      options: p.options,
      image_url: p.image_url
    }));

    renderCategories();
  } catch (error) {
    console.error("Error cargando menú público:", error);
  }
}

function renderCategories() {
  const container = document.getElementById('categoriesGrid');
  if (!container) return;

  if (window.categoriesData.length === 0) {
    container.innerHTML = '<p class="text-center text-slate-500 col-span-full py-8">Cargando menú...</p>';
    return;
  }

  // Tarjetas con el diseño original (40% imagen, 60% texto)
  container.innerHTML = window.categoriesData.map(cat => {
    const imageUrl = cat.image_url || 'https://res.cloudinary.com/a1fyaupj/image/upload/v1792886979/jiras50ep0ujnnioeyky.jpg';
    
    return `
      <div onclick="openCategoryModal('${cat.name}')" class="cursor-pointer bg-slate-900 border border-slate-800 hover:border-amber-500/40 rounded-2xl overflow-hidden transition-all hover:shadow-lg group flex flex-col h-32">
        <div class="flex h-full">
          <div class="w-2/5 h-full overflow-hidden"><img src="${imageUrl}" alt="${cat.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"></div>
          <div class="w-3/5 p-4 flex flex-col justify-center items-start"><h3 class="font-title font-extrabold text-white text-lg leading-snug group-hover:text-amber-300 transition-colors uppercase">${cat.name}</h3><span class="text-amber-500 text-xs font-bold mt-1 flex items-center gap-1 group-hover:gap-2 transition-all">Ver Productos <i class="fa-solid fa-arrow-right"></i></span></div>
        </div>
      </div>
    `;
  }).join('');
}

window.openCategoryModal = function(categoryName) {
  const modal = document.getElementById('categoryProductsModal');
  const title = document.getElementById('modalCategoryTitle');
  const grid = document.getElementById('modalProductsGrid');
  
  const btnBack = document.getElementById('btnMobileBack');
  if (btnBack) btnBack.classList.remove('hidden');

  title.innerText = categoryName;
  const filtered = window.menuData.filter(item => item.category === categoryName);
  
  if (filtered.length === 0) {
    grid.innerHTML = '<p class="text-center text-slate-500 col-span-full py-8">No hay productos.</p>';
  } else {
    grid.innerHTML = filtered.map(item => {
      const priceDisplay = item.hasVariants ? `$${item.options[0].price} - $${item.options[1].price}` : `$${item.price}`;
      const imgHtml = item.image_url ? `<img src="${item.image_url}" class="w-full h-32 object-cover rounded-t-xl mb-2">` : '';
      
      return `
        <div class="bg-slate-800 border border-slate-700/80 hover:border-amber-500/40 rounded-2xl p-0 overflow-hidden flex flex-col justify-between transition-all hover:shadow-lg group">
          ${imgHtml}
          <div class="p-4 space-y-2">
            <div class="flex items-start justify-between gap-2">
              <span class="text-[10px] font-bold text-amber-500/90 uppercase tracking-wider bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">${item.category}</span>
              <span class="font-title font-black text-amber-400 text-lg">${priceDisplay}</span>
            </div>
            <h3 class="font-title font-extrabold text-white text-base leading-snug group-hover:text-amber-300 transition-colors">${item.name}</h3>
            <p class="text-xs text-slate-400 line-clamp-2 leading-relaxed">${item.desc}</p>
          </div>
          <div class="px-4 pb-4 flex items-center justify-between">
            <span class="text-[11px] text-slate-500 font-medium">D’AMBIORIX</span>
            <button onclick="handleAddToCart('${item.id}')" class="bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-700 hover:to-amber-600 text-slate-950 font-bold px-3.5 py-1.5 rounded-xl text-xs shadow flex items-center gap-1.5 active:scale-95 transition-all"><i class="fa-solid fa-plus"></i> Agregar</button>
          </div>
        </div>
      `;
    }).join('');
  }
  modal.classList.remove('hidden');
}

window.closeCategoryModal = function() { 
  document.getElementById('categoryProductsModal').classList.add('hidden'); 
  
  const btnBack = document.getElementById('btnMobileBack');
  if (btnBack) btnBack.classList.add('hidden');
}

window.handleSearch = function() {}
window.clearSearch = function() {}

loadPublicData();