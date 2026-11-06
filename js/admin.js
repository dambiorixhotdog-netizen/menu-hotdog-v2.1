import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4';

const supabase = createClient('https://eiphlylrwwijogoyqwns.supabase.co', 'sb_publishable_afTPTTSnyflSQpDVZLzlvA_1G08TBJp');
let allProducts = [], allCategories = [];

async function initApp() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) { window.location.href = 'login.html'; return; }
  document.body.classList.remove('hidden');
  await loadCategoriesForSelect();
  await loadSettings();
  loadData();
}

document.getElementById('logoutBtn').addEventListener('click', async () => { 
  await supabase.auth.signOut(); 
  window.location.href = 'login.html'; 
});

async function uploadImage(file) {
  const formData = new FormData(); 
  formData.append('file', file); 
  formData.append('upload_preset', 'menu_hotdog_unsigned');
  
  const res = await fetch(`https://api.cloudinary.com/v1_1/a1fyaupj/image/upload`, { 
    method: 'POST', 
    body: formData 
  });
  
  const data = await res.json(); 
  return { url: data.secure_url, public_id: data.public_id };
}

window.showTab = function(tab) {
  document.getElementById('section-products').classList.toggle('hidden', tab !== 'products');
  document.getElementById('section-categories').classList.toggle('hidden', tab !== 'categories');
  document.getElementById('settings-section').classList.toggle('hidden', tab !== 'settings');
  
  document.getElementById('tab-products').className = tab === 'products' ? 'px-4 py-2 rounded-xl font-bold bg-amber-500 text-slate-950 whitespace-nowrap' : 'px-4 py-2 rounded-xl font-bold text-slate-400 whitespace-nowrap';
  document.getElementById('tab-categories').className = tab === 'categories' ? 'px-4 py-2 rounded-xl font-bold bg-amber-500 text-slate-950 whitespace-nowrap' : 'px-4 py-2 rounded-xl font-bold text-slate-400 whitespace-nowrap';
  document.getElementById('tab-settings').className = tab === 'settings' ? 'px-4 py-2 rounded-xl font-bold bg-amber-500 text-slate-950 whitespace-nowrap' : 'px-4 py-2 rounded-xl font-bold text-slate-400 whitespace-nowrap';
};

async function loadSettings() {
  const { data } = await supabase.from('categories').select('whatsapp_phone').limit(1);
  if (data && data.length > 0 && data[0].whatsapp_phone) {
    document.getElementById('whatsapp-number').value = data[0].whatsapp_phone;
  }
}

document.getElementById('settingsForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.innerText = 'Guardando...';
  
  const phone = document.getElementById('whatsapp-number').value.trim();
  
  const { error } = await supabase.from('categories').update({ whatsapp_phone: phone }).neq('id', '00000000-0000-0000-0000-000000000000');
  
  if (error) alert('Error al guardar: ' + error.message);
  else alert('Número de WhatsApp actualizado correctamente');
  
  btn.innerText = 'Guardar Número';
});

async function loadData() {
  document.getElementById('categoriesTable').innerHTML = allCategories.map(c => `
    <tr>
      <td class="p-4"><img src="${c.image_url || 'https://via.placeholder.com/50'}" class="w-10 h-10 rounded-md object-cover"></td>
      <td class="p-4 font-bold text-white">${c.name}</td>
      <td class="p-4 text-slate-400">${c.sort_order}</td>
      <td class="p-4 text-right">
        <button onclick="editCategory('${c.id}')" class="text-blue-400 mr-2"><i class="fa-solid fa-pen"></i></button>
        <button onclick="deleteCategory('${c.id}')" class="text-red-400"><i class="fa-solid fa-trash"></i></button>
      </td>
    </tr>
  `).join('');
  
  const { data: prods } = await supabase.from('products').select('*').order('created_at', { ascending: false });
  allProducts = prods || [];
  
  document.getElementById('productsTable').innerHTML = allProducts.map(p => `
    <tr>
      <td class="p-4"><img src="${p.image_url || 'https://via.placeholder.com/50'}" class="w-10 h-10 rounded-md object-cover"></td>
      <td class="p-4 font-bold text-white">${p.name} <br><span class="text-xs text-slate-500">${p.category_name}</span></td>
      <td class="p-4 text-amber-400 font-bold">$${p.price}</td>
      <td class="p-4 text-right">
        <button onclick="editProduct('${p.id}')" class="text-blue-400 mr-2"><i class="fa-solid fa-pen"></i></button>
        <button onclick="deleteProduct('${p.id}')" class="text-red-400"><i class="fa-solid fa-trash"></i></button>
      </td>
    </tr>
  `).join('');
}

async function loadCategoriesForSelect() {
  const { data } = await supabase.from('categories').select('*').order('sort_order');
  allCategories = data || [];
  document.getElementById('prod-cat').innerHTML = '<option value="">Selecciona...</option>' + allCategories.map(c => `<option value="${c.name}">${c.name}</option>`).join('');
}

window.showProductForm = () => { 
  document.getElementById('form-section').classList.remove('hidden'); 
  document.getElementById('productForm').reset(); 
  document.getElementById('prod-id').value = ''; 
  document.getElementById('img-preview').classList.add('hidden'); 
};

window.hideProductForm = () => document.getElementById('form-section').classList.add('hidden');

document.getElementById('prod-img').addEventListener('change', (e) => { 
  if (e.target.files[0]) { 
    const r = new FileReader(); 
    r.onload = (ev) => { 
      document.getElementById('img-preview').src = ev.target.result; 
      document.getElementById('img-preview').classList.remove('hidden'); 
    }; 
    r.readAsDataURL(e.target.files[0]); 
  } 
});

document.getElementById('prod-has-variants').addEventListener('change', (e) => document.getElementById('variants-section').classList.toggle('hidden', !e.target.checked));

document.getElementById('productForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('prod-id').value, file = document.getElementById('prod-img').files[0], hasVar = document.getElementById('prod-has-variants').checked;
  let imageUrl = null, imagePublicId = null;
  
  if (file) { 
    const up = await uploadImage(file); 
    imageUrl = up.url; 
    imagePublicId = up.public_id; 
  }
  
  if (id && !file) { 
    const ex = allProducts.find(p => p.id === id); 
    if (ex) { 
      imageUrl = ex.image_url; 
      imagePublicId = ex.image_public_id; 
    } 
  }
  
  let options = [];
  if (hasVar) {
    options = [
      { label: 'Porción Pequeña', price: parseFloat(document.getElementById('prod-price-small').value) }, 
      { label: 'Porción Grande', price: parseFloat(document.getElementById('prod-price-large').value) }
    ];
  }
  
  const payload = { 
    name: document.getElementById('prod-name').value, 
    price: parseFloat(document.getElementById('prod-price').value), 
    category_name: document.getElementById('prod-cat').value, 
    description: document.getElementById('prod-desc').value, 
    image_url: imageUrl, 
    image_public_id: imagePublicId, 
    has_variants: hasVar, 
    options: options 
  };
  
  if (id) await supabase.from('products').update(payload).eq('id', id); 
  else await supabase.from('products').insert([payload]);
  
  alert('Guardado'); 
  hideProductForm(); 
  loadData();
});

window.showCategoryForm = () => { 
  document.getElementById('category-form-section').classList.remove('hidden'); 
  document.getElementById('categoryForm').reset(); 
  document.getElementById('cat-id').value = ''; 
  document.getElementById('cat-order').value = allCategories.length + 1; 
  document.getElementById('cat-img-preview').classList.add('hidden'); 
};

window.hideCategoryForm = () => document.getElementById('category-form-section').classList.add('hidden');

document.getElementById('cat-img').addEventListener('change', (e) => { 
  if (e.target.files[0]) { 
    const r = new FileReader(); 
    r.onload = (ev) => { 
      document.getElementById('cat-img-preview').src = ev.target.result; 
      document.getElementById('cat-img-preview').classList.remove('hidden'); 
    }; 
    r.readAsDataURL(e.target.files[0]); 
  } 
});

document.getElementById('categoryForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('cat-id').value, file = document.getElementById('cat-img').files[0];
  let imageUrl = null;
  
  if (file) { 
    const up = await uploadImage(file); 
    imageUrl = up.url; 
  }
  
  if (id && !file) { 
    const ex = allCategories.find(c => c.id === id); 
    if (ex) imageUrl = ex.image_url; 
  }
  
  const payload = { 
    name: document.getElementById('cat-name').value, 
    sort_order: parseInt(document.getElementById('cat-order').value), 
    image_url: imageUrl 
  };
  
  if (id) await supabase.from('categories').update(payload).eq('id', id); 
  else await supabase.from('categories').insert([payload]);
  
  alert('Guardado'); 
  hideCategoryForm(); 
  await loadCategoriesForSelect(); 
  loadData();
});

window.editProduct = (id) => { 
  const p = allProducts.find(x => x.id === id); 
  if (!p) return; 
  showProductForm(); 
  document.getElementById('form-title').innerText = 'Editar'; 
  document.getElementById('prod-id').value = p.id; 
  document.getElementById('prod-name').value = p.name; 
  document.getElementById('prod-price').value = p.price; 
  document.getElementById('prod-cat').value = p.category_name; 
  document.getElementById('prod-desc').value = p.description || ''; 
  if (p.image_url) { 
    document.getElementById('img-preview').src = p.image_url; 
    document.getElementById('img-preview').classList.remove('hidden'); 
  } 
  if (p.has_variants) { 
    document.getElementById('prod-has-variants').checked = true; 
    document.getElementById('variants-section').classList.remove('hidden'); 
    document.getElementById('prod-price-small').value = p.options[0].price; 
    document.getElementById('prod-price-large').value = p.options[1].price; 
  } 
};

window.deleteProduct = async (id) => { 
  if (confirm('¿Eliminar?')) { 
    await supabase.from('products').delete().eq('id', id); 
    loadData(); 
  } 
};

window.editCategory = (id) => { 
  const c = allCategories.find(x => x.id === id); 
  if (!c) return; 
  showCategoryForm(); 
  document.getElementById('category-form-title').innerText = 'Editar'; 
  document.getElementById('cat-id').value = c.id; 
  document.getElementById('cat-name').value = c.name; 
  document.getElementById('cat-order').value = c.sort_order; 
  if (c.image_url) { 
    document.getElementById('cat-img-preview').src = c.image_url; 
    document.getElementById('cat-img-preview').classList.remove('hidden'); 
  } 
};

window.deleteCategory = async (id) => { 
  if (confirm('¿Eliminar?')) { 
    const { error } = await supabase.from('categories').delete().eq('id', id); 
    if (error) alert('Tiene productos.'); 
    else { 
      await loadCategoriesForSelect(); 
      loadData(); 
    } 
  } 
};

initApp();