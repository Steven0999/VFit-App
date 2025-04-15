document.addEventListener("DOMContentLoaded", () => {
  // Show that JavaScript is working
  const jsMessage = document.createElement("p");
  jsMessage.textContent = "JavaScript is working!";
  jsMessage.style.color = "lime";
  document.body.appendChild(jsMessage);

  // Page elements
  const welcomePage = document.getElementById("welcomePage");
  const registerForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");

  const registerBtn = document.getElementById("registerBtn");
  const loginBtn = document.getElementById("loginBtn");
  const backToWelcomeFromRegister = document.getElementById("backToWelcomeFromRegister");
  const backToWelcomeFromLogin = document.getElementById("backToWelcomeFromLogin");
  const submitRegister = document.getElementById("submitRegister");
  const submitLogin = document.getElementById("submitLogin");

  // Create Dashboard
  const dashboard = document.createElement("div");
  dashboard.id = "dashboard";
  dashboard.style.display = "none";
  document.body.appendChild(dashboard);

  // Logout button
  const logoutBtn = document.createElement("button");
  logoutBtn.textContent = "Logout";
  logoutBtn.style.marginTop = "20px";
  logoutBtn.addEventListener("click", () => {
    dashboard.style.display = "none";
    welcomePage.style.display = "block";
  });
  dashboard.appendChild(logoutBtn);

  // Navigation buttons
  registerBtn.addEventListener("click", () => {
    welcomePage.style.display = "none";
    registerForm.style.display = "block";
  });

  loginBtn.addEventListener("click", () => {
    welcomePage.style.display = "none";
    loginForm.style.display = "block";
  });

  backToWelcomeFromRegister.addEventListener("click", () => {
    registerForm.style.display = "none";
    welcomePage.style.display = "block";
  });

  backToWelcomeFromLogin.addEventListener("click", () => {
    loginForm.style.display = "none";
    welcomePage.style.display = "block";
  });

  // Simulate Registration
  submitRegister.addEventListener("click", (event) => {
    event.preventDefault();

    const name = document.getElementById("regName").value;

    if (!name) {
      alert("Please enter your name.");
      return;
    }

    registerForm.style.display = "none";
    showDashboard(name);
  });

  // Simulate Login
  submitLogin.addEventListener("click", (event) => {
    event.preventDefault();

    const username = document.getElementById("loginUsername").value;

    if (!username) {
      alert("Enter username to login.");
      return;
    }

    loginForm.style.display = "none";
    showDashboard(username);
  });

  function showDashboard(name) {
    dashboard.innerHTML = `<h2>Welcome, ${name}!</h2>`;
    dashboard.appendChild(logoutBtn);
    dashboard.style.display = "block";
  }
});

/*document.addEventListener("DOMContentLoaded", () => {
  // Confirm JS is working
  const message = document.createElement("p");
  message.textContent = "JavaScript is working!";
  message.style.color = "lime";
  message.style.fontWeight = "bold";
  document.body.appendChild(message);

  // DOM elements
  const welcomePage = document.getElementById("welcomePage");
  const registerForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");

  const registerBtn = document.getElementById("registerBtn");
  const loginBtn = document.getElementById("loginBtn");
  const backToWelcomeFromRegister = document.getElementById("backToWelcomeFromRegister");
  const backToWelcomeFromLogin = document.getElementById("backToWelcomeFromLogin");
  const submitRegister = document.getElementById("submitRegister");
  const submitLogin = document.getElementById("submitLogin");

  // Create a dashboard element
  const dashboard = document.createElement("div");
  dashboard.id = "dashboard";
  dashboard.style.display = "none";
  document.body.appendChild(dashboard);

  // Logout button
  const logoutBtn = document.createElement("button");
  logoutBtn.textContent = "Logout";
  logoutBtn.style.marginTop = "20px";
  logoutBtn.addEventListener("click", () => {
    dashboard.style.display = "none";
    welcomePage.style.display = "block";
  });
  dashboard.appendChild(logoutBtn);

  // Show Register Form
  registerBtn.addEventListener("click", () => {
    welcomePage.style.display = "none";
    registerForm.style.display = "block";
  });

  // Show Login Form
  loginBtn.addEventListener("click", () => {
    welcomePage.style.display = "none";
    loginForm.style.display = "block";
  });

  // Back buttons
  backToWelcomeFromRegister.addEventListener("click", () => {
    registerForm.style.display = "none";
    welcomePage.style.display = "block";
  });

  backToWelcomeFromLogin.addEventListener("click", () => {
    loginForm.style.display = "none";
    welcomePage.style.display = "block";
  });

  // Handle Registration Submit
  submitRegister.addEventListener("click", (event) => {
    event.preventDefault();

    const name = document.getElementById("regName").value;
    const age = document.getElementById("regAge").value;
    const goal = document.getElementById("regGoal").value;
    const experience = document.getElementById("regExperience").value;
    const email = document.getElementById("regEmail").value;
    const username = document.getElementById("regUsername").value;
    const password = document.getElementById("regPassword").value;
    const confirmPassword = document.getElementById("regConfirmPassword").value;

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    fetch("http://localhost:3000/check-username", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username })
    })
      .then(res => res.json())
      .then(data => {
        if (!data.success) {
          alert(data.message);
        } else {
          fetch("http://localhost:3000/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, age, goal, experience, email, username, password })
          })
            .then(res => res.json())
            .then(data => {
              if (!data.success) {
                alert(data.message);
              } else {
                alert("Registration successful!");

                registerForm.style.display = "none";
                showDashboard(name);

                // Clear fields
                document.getElementById("regName").value = "";
                document.getElementById("regAge").value = "";
                document.getElementById("regGoal").value = "lose weight";
                document.getElementById("regExperience").value = "";
                document.getElementById("regEmail").value = "";
                document.getElementById("regUsername").value = "";
                document.getElementById("regPassword").value = "";
                document.getElementById("regConfirmPassword").value = "";
              }
            });
        }
      })
      .catch(err => console.error("Error:", err));
  });

  // Handle Login Submit
  submitLogin.addEventListener("click", (event) => {
    event.preventDefault();

    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    })
      .then(res => res.json())
      .then(data => {
        if (!data.success) {
          alert(data.message);
        } else {
          loginForm.style.display = "none";
          showDashboard(data.user.name);

          document.getElementById("loginUsername").value = "";
          document.getElementById("loginPassword").value = "";
        }
      })
      .catch(err => console.error("Error:", err));
  });

  function showDashboard(name) {
    dashboard.innerHTML = `<h2>Welcome, ${name}!</h2>`;
    dashboard.appendChild(logoutBtn);
    dashboard.style.display = "block";
  }
});*/
