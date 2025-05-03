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

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Schema & Model
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

// Routes
app.post("/check-username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      return res.json({ success: false, message: "Username is already taken." });
    }
    res.json({ success: true, message: "Username is available." });
  } catch {
    res.status(500).json({ success: false, message: "Server error." });
  }
});

app.post("/register", async (req, res) => {
  try {
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      return res.json({ success: false, message: "Username already exists." });
    }

    const newUser = new User(req.body);
    await newUser.save();
    res.json({ success: true, message: "Registration successful!" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Registration failed." });
  }
});

app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user || user.password !== req.body.password) {
      return res.json({ success: false, message: "Invalid username or password." });
    }
    res.json({
      success: true,
      message: "Login successful",
      user: {
        name: user.name,
        goal: user.goal,
        age: user.age,
        experience: user.experience,
        email: user.email
      }
    });
  } catch {
    res.status(500).json({ success: false, message: "Login error." });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
