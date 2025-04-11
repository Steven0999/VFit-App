// Basic Express server to register users and check for existing usernames
// Requires: express, cors, body-parser

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Simulate a database with an in-memory object
const users = {}; // { username: { name, age, goal, ... } }

app.use(cors());
app.use(bodyParser.json());

// Register endpoint
app.post('/register', (req, res) => {
  const { name, age, goal, experience, email, username, password } = req.body;

  if (!name || !age || !goal || !experience || !email || !username || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  if (users[username]) {
    return res.status(409).json({ success: false, message: 'Username already taken.' });
  }

  users[username] = { name, age, goal, experience, email, password, verified: false };

  console.log("New user registered:", users[username]);
  return res.status(201).json({ success: true, message: 'User registered successfully. Please verify your email.' });
});

// Simulate verification
app.post('/verify', (req, res) => {
  const { username } = req.body;

  if (!users[username]) {
    return res.status(404).json({ success: false, message: 'User not found.' });
  }

  users[username].verified = true;
  return res.status(200).json({ success: true, message: 'Email verified.' });
});

// Login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!users[username]) {
    return res.status(404).json({ success: false, message: 'User not found.' });
  }

  const user = users[username];

  if (!user.verified) {
    return res.status(403).json({ success: false, message: 'Email not verified.' });
  }

  if (user.password !== password) {
    return res.status(401).json({ success: false, message: 'Incorrect password.' });
  }

  return res.status(200).json({
    success: true,
    message: 'Login successful.',
    user: {
      name: user.name,
      goal: user.goal,
      experience: user.experience
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
