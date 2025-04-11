function register() {
  const name = document.getElementById('regName').value;
  const age = document.getElementById('regAge').value;
  const goal = document.getElementById('regGoal').value;
  const experience = document.getElementById('regExperience').value;
  const email = document.getElementById('regEmail').value;
  const username = document.getElementById('regUsername').value;
  const password = document.getElementById('regPassword').value;
  const confirm = document.getElementById('regConfirm').value;

  if (password !== confirm) {
    alert("Passwords do not match");
    return;
  }

  const user = {
    name, age, goal, experience, email, username, password, verified: false
  };

  localStorage.setItem(`user-${username}`, JSON.stringify(user));
  document.getElementById('registerForm').style.display = 'none';
  document.getElementById('verifyEmail').style.display = 'block';
}

function completeVerification() {
  const keys = Object.keys(localStorage).filter(k => k.startsWith('user-'));
  const userKey = keys[keys.length - 1];
  const user = JSON.parse(localStorage.getItem(userKey));
  user.verified = true;
  localStorage.setItem(userKey, JSON.stringify(user));

  document.getElementById('verifyEmail').style.display = 'none';
  document.getElementById('loginForm').style.display = 'block';
}

function login() {
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;
  const userStr = localStorage.getItem(`user-${username}`);

  if (!userStr) return alert("User not found");

  const user = JSON.parse(userStr);
  if (!user.verified) return alert("Please verify your email first");
  if (user.password !== password) return alert("Wrong password");

  document.getElementById('auth').style.display = 'none';
  document.getElementById('home').style.display = 'block';

  document.getElementById('displayName').innerText = user.name;
  document.getElementById('displayGoal').innerText = user.goal;
  document.getElementById('displayExperience').innerText = user.experience;
}
