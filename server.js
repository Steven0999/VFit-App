const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Serve static files from the /public directory
app.use(express.static(path.join(__dirname, '..', 'public')));

let users = []; // This is your in-memory "database" for users

app.post("/check-username", (req, res) => {
  const { username } = req.body;
  const userExists = users.some((user) => user.username === username);
  if (userExists) {
    return res.json({
      success: false,
      message: "Username is already taken, please choose another."
    });
  }
  return res.json({ success: true, message: "Username is available." });
});

app.post("/register", (req, res) => {
  const { name, age, goal, experience, email, username, password } = req.body;
  const userExists = users.some((user) => user.username === username);
  if (userExists) {
    return res.json({
      success: false,
      message: "Username is already taken, please choose another."
    });
  }
  users.push({ name, age, goal, experience, email, username, password });
  return res.json({
    success: true,
    message: "Registration successful. Please verify your email."
  });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((user) => user.username === username);
  if (!user) {
    return res.json({ success: false, message: "Username not found." });
  }
  if (user.password !== password) {
    return res.json({ success: false, message: "Invalid password." });
  }
  return res.json({
    success: true,
    message: "Login successful.",
    user
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
