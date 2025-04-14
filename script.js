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

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    fetch("http://localhost:3000/check-username", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username })
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          alert(data.message);
        } else {
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
                document.getElementById("regUsername").value = "";
                document.getElementById("regPassword").value = "";
                document.getElementById("regConfirmPassword").value = "";
                document.getElementById("regEmail").value = "";
                // Redirect to the login page or another page
              }
            });
        }
      });
  });

  // Handle Login Submit
  document.getElementById("submitLogin").addEventListener("click", () => {
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

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
        }
      });
  });
});*/

document.addEventListener("DOMContentLoaded", () => {
  const welcomePage = document.getElementById("welcomePage");
  const registerForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");
  const userDashboard = document.getElementById("userDashboard");
  const welcomeMessage = document.getElementById("welcomeMessage");

  // Show Register Form
  document.getElementById("registerBtn").addEventListener("click", () => {
    welcomePage.style.display = "none";
    registerForm.style.display = "block";
  });

  // Show Login Form
  document.getElementById("loginBtn").addEventListener("click", () => {
    welcomePage.style.display = "none";
    loginForm.style.display = "block";
  });

  // Back to Welcome from Register
  document.getElementById("backToWelcomeFromRegister").addEventListener("click", () => {
    registerForm.style.display = "none";
    welcomePage.style.display = "block";
  });

  // Back to Welcome from Login
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

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Check if username is taken
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
          // Proceed to register
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
                // Show user dashboard
                registerForm.style.display = "none";
                userDashboard.style.display = "block";
                welcomeMessage.textContent = `Welcome, ${name}!`;

                // Clear form
                document.getElementById("regName").value = "";
                document.getElementById("regAge").value = "";
                document.getElementById("regGoal").value = "lose weight";
                document.getElementById("regExperience").value = "";
                document.getElementById("regEmail").value = "";
                document.getElementById("regUsername").value = "";
                document.getElementById("regPassword").value = "";
                document.getElementById("regConfirmPassword").value = "";
              }
            })
            .catch(err => console.error("Error during registration:", err));
        }
      })
      .catch(err => console.error("Error checking username:", err));
  });

  // Handle Login Submit
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
          loginForm.style.display = "none";
          userDashboard.style.display = "block";
          welcomeMessage.textContent = `Welcome, ${data.user.name}!`;

          // Clear form
          document.getElementById("loginUsername").value = "";
          document.getElementById("loginPassword").value = "";
        }
      })
      .catch(err => console.error("Login Error:", err));
  });

  // Handle Logout
  document.getElementById("logoutBtn").addEventListener("click", () => {
    userDashboard.style.display = "none";
    welcomePage.style.display = "block";
    welcomeMessage.textContent = "";
  });
});
