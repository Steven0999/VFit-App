window.addEventListener('DOMContentLoaded', () => {
  const registerBtn = document.getElementById('registerBtn');
  const loginBtn = document.getElementById('loginBtn');

  const welcomePage = document.getElementById('welcomePage');
  const registerForm = document.getElementById('registerForm');
  const loginForm = document.getElementById('loginForm');

  registerBtn.addEventListener('click', () => {
    welcomePage.style.display = 'none';
    registerForm.style.display = 'block';
  });

  loginBtn.addEventListener('click', () => {
    welcomePage.style.display = 'none';
    loginForm.style.display = 'block';
  });
});
