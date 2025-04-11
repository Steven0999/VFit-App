let currentUserKey = "";

function showRegister() {
  document.getElementById('welcomePage').style.display = 'none';
  document.getElementById('registerForm').style.display = 'block';
}

function showLogin() {
  document.getElementById('welcomePage').style.display = 'none';
  document.getElementById('loginForm').style.display = 'block';
}

function register() {
  const name = document.getElementById('regName').value;
  const age = document.getElementById('regAge').value;
  const goal = document.getElementById('regGoal').value;
  const experience = document.getElementById('regExperience').value;
  const email = document.getElementById('regEmail').value;
  const username = document.getElementById('regUsername').value;
  const password = document.getElementById('regPassword').value;
  const confirm = document.getElementById('regConfirm').value;

  if (!name || !age || !goal || !experience || !email || !username || !password || !confirm) {
    alert("Please fill in all fields.");
    return;
  }

  if (password !== confirm) {
    alert("Passwords do not match.");
    return;
  }

  const user = {
    name,
    age,
    goal,
    experience,
    email,
    username,
    password,
    verified: false
  };

  const userKey = `user-${username}`;
  localStorage.setItem(userKey, JSON.stringify(user));
  currentUserKey = userKey;

  document.getElementById('registerForm').style.display = 'none';
  document.getElementById('verifyEmail').style.display = 'block';
}

function completeVerification() {
  const user = JSON.parse(localStorage.getItem(currentUserKey));
  user.verified = true;
  localStorage.setItem(currentUserKey, JSON.stringify(user));

  document.getElementById('verifyEmail').style.display = 'none';
  document.getElementById('home').style.display = 'block';
  displayUser(user);
}

function login() {
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;
  const userKey = `user-${username}`;
  const userData = localStorage.getItem(userKey);

  if (!userData) {
    alert("User not found.");
    return;
  }

  const user = JSON.parse(userData);
  if (!user.verified) {
    alert("Please verify your email before logging in.");
    return;
  }

  if (user.password !== password) {
    alert("Incorrect password.");
    return;
  }

  document.getElementById('loginForm').style.display = 'none';
  document.getElementById('home').style.display = 'block';
  displayUser(user);
}

function displayUser(user) {
  document.getElementById('displayName').innerText = user.name;
  document.getElementById('displayGoal').innerText = user.goal;
  document.getElementById('displayExperience').innerText = user.experience;
}
