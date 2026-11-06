import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4';

// URL Y LLAVE CORREGIDAS
const supabase = createClient('https://eiphlylrwwijogoyqwns.supabase.co', 'sb_publishable_afTPTTSnyflSQpDVZLzlvA_1G08TBJp');

const loginForm = document.getElementById('loginForm');
supabase.auth.getSession().then(({ data: { session } }) => { 
  if (session) window.location.href = 'admin.html'; 
});

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.getElementById('loginBtn').innerText = 'Verificando...';
    
    const { error } = await supabase.auth.signInWithPassword({
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
    });
    
    if (error) {
      document.getElementById('errorMsg').innerText = error.message;
      document.getElementById('errorMsg').classList.remove('hidden');
      document.getElementById('loginBtn').innerText = 'Iniciar Sesión';
    } else {
      window.location.href = 'admin.html';
    }
  });
}