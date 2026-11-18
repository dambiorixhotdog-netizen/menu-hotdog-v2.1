import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4';

const supabase = createClient('https://eiphlylrwwijogoyqwns.supabase.co', 'sb_publishable_afTPTTSnyflSQpDVZLzlvA_1G08TBJp');

window.siteSettings = null;

async function loadSiteSettings() {
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('id', APP_CONFIG.siteSettingsId)
      .maybeSingle();

    if (error) throw error;
    window.siteSettings = data || { ...APP_CONFIG.welcomeDefaults, id: APP_CONFIG.siteSettingsId };
  } catch (err) {
    console.warn('No se pudo cargar site_settings, usando defaults.', err);
    window.siteSettings = { ...APP_CONFIG.welcomeDefaults, id: APP_CONFIG.siteSettingsId };
  }
  renderWelcomeModal();
}

function getMenuUrl() {
  const s = window.siteSettings || {};
  if (s.menu_url && s.menu_url.trim()) return s.menu_url.trim();
  return window.location.origin + window.location.pathname;
}

function renderWelcomeModal() {
  const s = window.siteSettings || APP_CONFIG.welcomeDefaults;

  if (s.welcome_enabled === false) {
    const modal = document.getElementById('welcomeModal');
    if (modal) modal.classList.add('hidden');
    return;
  }

  const msgEl = document.getElementById('welcomeMessage');
  if (msgEl) msgEl.innerText = s.welcome_message || APP_CONFIG.welcomeDefaults.welcome_message;

  const waBtn = document.getElementById('welcomeWhatsappBtn');
  if (waBtn) {
    if (s.whatsapp_phone && s.whatsapp_phone.trim()) {
      waBtn.href = `https://wa.me/${s.whatsapp_phone.trim()}`;
      waBtn.classList.remove('hidden');
    } else {
      waBtn.classList.add('hidden');
    }
  }

  const igBtn = document.getElementById('welcomeInstagramBtn');
  if (igBtn) {
    if (s.instagram_url && s.instagram_url.trim()) {
      igBtn.href = s.instagram_url.trim();
      igBtn.classList.remove('hidden');
    } else {
      igBtn.classList.add('hidden');
    }
  }

  const locBtn = document.getElementById('welcomeLocationBtn');
  if (locBtn) {
    if (s.location_url && s.location_url.trim()) {
      locBtn.href = s.location_url.trim();
      locBtn.classList.remove('hidden');
    } else {
      locBtn.classList.add('hidden');
    }
  }

  const modal = document.getElementById('welcomeModal');
  if (modal) modal.classList.remove('hidden');
}

window.closeWelcomeModal = function () {
  const modal = document.getElementById('welcomeModal');
  if (modal) modal.classList.add('hidden');
};

window.welcomeGoToMenu = function () {
  window.closeWelcomeModal();
  const menu = document.getElementById('menuSection');
  if (menu) menu.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

window.copyMenuLink = async function () {
  const url = getMenuUrl();
  const btn = document.getElementById('welcomeCopyBtn');
  const originalHtml = btn ? btn.innerHTML : '';
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(url);
    } else {
      const ta = document.createElement('textarea');
      ta.value = url;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    if (btn) {
      btn.innerHTML = '<i class="fa-solid fa-check"></i> ¡Copiado!';
      setTimeout(() => { btn.innerHTML = originalHtml; }, 1800);
    }
  } catch (err) {
    alert('No se pudo copiar el enlace. Cópialo manualmente:\n' + url);
  }
};

loadSiteSettings();