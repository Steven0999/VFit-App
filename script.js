document.addEventListener("DOMContentLoaded", () => {
  const welcomePage = document.getElementById("welcomePage");
  const registerForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");

  const token = localStorage.getItem("token");

  // Show dashboard if token exists
  if (token) {
    showDashboard();
    return;
  }

  // Buttons for switching between forms
  const registerBtn = document.getElementById("registerBtn");
  const loginBtn = document.getElementById("loginBtn");

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

  // Go back to Welcome Page from Register Form
  document.getElementById("backToWelcomeFromRegister").addEventListener("click", () => {
    registerForm.style.display = "none";
    welcomePage.style.display = "block";
  });

  // Go back to Welcome Page from Login Form
  document.getElementById("backToWelcomeFromLogin").addEventListener("click", () => {
    loginForm.style.display = "none";
    welcomePage.style.display = "block";
  });

  // Handle Registration Submit
  document.getElementById("submitRegister").addEventListener("click", () => {
    const name = document.getElementById("regName").value;
    const age = document.getElementById("regAge").value;
    const goal = document.getElementById("regGoal").value;
    const experience = document.getElementById("regExperience").value;
    const email = document.getElementById("regEmail").value;
    const username = document.getElementById("regUsername").value;
    const password = document.getElementById("regPassword").value;
    const confirmPassword = document.getElementById("regConfirmPassword").value;

    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Check if username is available
    fetch("http://localhost:3000/check-username", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username })
    })
      .then(res => res.json())
      .then(data => {
        if (!data.success) {
          alert(data.message); // If username is already taken
        } else {
          // Proceed to register if username is unique
          fetch("http://localhost:3000/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name, age, goal, experience, email, username, password
            })
          })
            .then(res => res.json())
            .then(data => {
              if (!data.success) {
                alert(data.message);
              } else {
                alert(data.message);

                // Clear fields after successful registration
                document.getElementById("regName").value = "";
                document.getElementById("regAge").value = "";
                document.getElementById("regGoal").value = "lose weight";
                document.getElementById("regExperience").value = "";
                document.getElementById("regEmail").value = "";
                document.getElementById("regUsername").value = "";
                document.getElementById("regPassword").value = "";
                document.getElementById("regConfirmPassword").value = "";

                // Show Welcome Page after successful registration
                registerForm.style.display = "none";
                welcomePage.style.display = "block";
              }
            })
            .catch(err => console.error("Error:", err));
        }
      })
      .catch(err => console.error("Error:", err));
  });

  // Handle Login Submit
  document.getElementById("submitLogin").addEventListener("click", () => {
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    // Send login credentials to backend
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
          // Save the JWT token and user data to localStorage
          localStorage.setItem("token", data.token);
          localStorage.setItem("username", data.user.username);
          localStorage.setItem("name", data.user.name);

          // Show the personalized dashboard
          showDashboard();
        }
      })
      .catch(err => console.error("Error:", err));
  });

  // Show Dashboard after successful login
  function showDashboard() {
    document.getElementById("welcomePage").style.display = "none";
    document.getElementById("registerForm").style.display = "none";
    document.getElementById("loginForm").style.display = "none";

    const dashboard = document.getElementById("dashboard");
    dashboard.style.display = "block";
    dashboard.innerHTML = `
      <h2>Welcome, ${localStorage.getItem("name")}!</h2>
      <button id="logoutBtn">Logout</button>
    `;

    // Logout Button Logic
    document.getElementById("logoutBtn").addEventListener("click", () => {
      localStorage.clear(); // Clear the token and user data
      location.reload();    // Reload the page to show the welcome page again
    });
  }
});
