/*const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB & Mongoose setup
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB via Mongoose"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define User Schema
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  goal: String,
  experience: Number,
  email: String,
  username: { type: String, unique: true },
  password: String,
});

const User = mongoose.model("User", userSchema);

// Routes

// Check if username is taken
app.post("/check-username", async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username });

    if (user) {
      return res.json({ success: false, message: "Username is already taken." });
    }

    return res.json({ success: true, message: "Username is available." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
});

// Register a new user
app.post("/register", async (req, res) => {
  try {
    const { name, age, goal, experience, email, username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.json({ success: false, message: "Username is already taken." });
    }

    const newUser = new User({ name, age, goal, experience, email, username, password });
    await newUser.save();

    res.json({ success: true, message: "Registration successful." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error during registration." });
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.json({ success: false, message: "Username not found." });
    }

    if (user.password !== password) {
      return res.json({ success: false, message: "Incorrect password." });
    }

    res.json({
      success: true,
      message: "Login successful.",
      user: {
        name: user.name,
        email: user.email,
        goal: user.goal,
        experience: user.experience,
        age: user.age,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error during login." });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});*/

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  goal: String,
  experience: Number,
  email: String,
  username: { type: String, unique: true },
  password: String
});

const User = mongoose.model("User", userSchema);

// Check if username is taken
app.post("/check-username", async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username });

    if (user) {
      return res.json({ success: false, message: "Username is already taken." });
    }

    return res.json({ success: true, message: "Username is available." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
});

// Register
app.post("/register", async (req, res) => {
  try {
    const { name, age, goal, experience, email, username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.json({ success: false, message: "Username is already taken." });
    }

    const newUser = new User({ name, age, goal, experience, email, username, password });
    await newUser.save();

    res.json({ success: true, message: "Registration successful." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error during registration." });
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.json({ success: false, message: "Username not found." });
    }

    if (user.password !== password) {
      return res.json({ success: false, message: "Incorrect password." });
    }

    res.json({
      success: true,
      message: "Login successful.",
      user: {
        name: user.name,
        age: user.age,
        goal: user.goal,
        experience: user.experience,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error during login." });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
