import { supabase } from './supabase.js';

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