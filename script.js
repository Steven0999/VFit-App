/*document.addEventListener("DOMContentLoaded", () => {
  const registerBtn = document.getElementById("registerBtn");
  const loginBtn = document.getElementById("loginBtn");
  const welcomePage = document.getElementById("welcomePage");
  const registerForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");

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

    // Make POST request to backend to check if username is taken
    fetch("http://localhost:3000/check-username", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username })
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          alert(data.message); // If username is already taken
        } else {
          // Proceed to register if username is unique
          fetch("http://localhost:3000/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name,
              age,
              goal,
              experience,
              email,
              username,
              password
            })
          })
            .then((res) => res.json())
            .then((data) => {
              if (!data.success) {
                alert(data.message);
              } else {
                alert(data.message);
                document.getElementById("regUsername").value = ""; // Clear fields
                document.getElementById("regPassword").value = ""; // Clear fields
                document.getElementById("regConfirmPassword").value = ""; // Clear fields
                document.getElementById("regEmail").value = ""; // Clear fields
              }
            })
            .catch((err) => console.error("Error:", err));
        }
      })
      .catch((err) => console.error("Error:", err));
  });

  // Handle Login Submit
  document.getElementById("submitLogin").addEventListener("click", () => {
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    // Make POST request to backend for login
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          alert(data.message);
        } else {
          alert(`Welcome back, ${data.user.name}!`);
          document.getElementById("loginUsername").value = ""; // Clear fields
          document.getElementById("loginPassword").value = ""; // Clear fields
        }
      })
      .catch((err) => console.error("Error:", err));
  });
});*/
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

  // Buttons
  const registerBtn = document.getElementById("registerBtn");
  const loginBtn = document.getElementById("loginBtn");

  registerBtn.addEventListener("click", () => {
    welcomePage.style.display = "none";
    registerForm.style.display = "block";
  });

  loginBtn.addEventListener("click", () => {
    welcomePage.style.display = "none";
    loginForm.style.display = "block";
  });

  document.getElementById("backToWelcomeFromRegister").addEventListener("click", () => {
    registerForm.style.display = "none";
    welcomePage.style.display = "block";
  });

  document.getElementById("backToWelcomeFromLogin").addEventListener("click", () => {
    loginForm.style.display = "none";
    welcomePage.style.display = "block";
  });

  document.getElementById("submitRegister").addEventListener("click", () => {
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
            body: JSON.stringify({
              name, age, goal, experience, email, username, password
            })
          })
            .then(res => res.json())
            .then(data => {
              alert(data.message);
              if (data.success) {
                registerForm.reset();
              }
            });
        }
      })
      .catch(err => console.error("Error:", err));
  });

  document.getElementById("submitLogin").addEventListener("click", () => {
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
          localStorage.setItem("token", data.token);
          localStorage.setItem("username", data.user.username);
          localStorage.setItem("name", data.user.name);
          showDashboard();
        }
      })
      .catch(err => console.error("Error:", err));
  });

  function showDashboard() {
    document.body.innerHTML = `
      <h2>Welcome, ${localStorage.getItem("name")}!</h2>
      <button id="logoutBtn">Logout</button>
    `;
    document.getElementById("logoutBtn").addEventListener("click", () => {
      localStorage.clear();
      location.reload();
    });
  }
});
