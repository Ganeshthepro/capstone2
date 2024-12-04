const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const bcrypt = require('bcrypt');
const UserModel=require("./models/login-signup")

const app = express();

// Middleware to parse JSON and enable CORS
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/login-signup")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

// POST route for user signup (creating a new user)
app.post('/user', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user and save to the database
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save(); // Save to MongoDB
    res.status(201).send({ message: "User created successfully", data: { name, email } });
  } catch (err) {
    res.status(500).send({ message: "Error creating user", error: err.message });
  }
});

// POST route for login (authenticating the user)
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }

    // Compare the hashed password with the input password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send({ message: "Invalid credentials" });
    }

    // Successful login, return user data or token (for now, just user info)
    res.status(200).send({ message: "Login successful", user: { name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).send({ message: "Server error", error: err.message });
  }
});

// Start the server
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
