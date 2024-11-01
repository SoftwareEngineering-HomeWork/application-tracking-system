const express = require("express");
const bcrypt = require("bcrypt");
const Users = require("../models/User"); // Import the User model
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { fullName, username, password } = req.body;
    console.log("This is the body", req.body);

    if (!fullName || !username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Checking if the user already exists
    const existingUser = await Users.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creating a new user
    const newUser = new Users({
      fullName,
      username,
      password: hashedPassword, // Store the hashed password
    });

    await newUser.save(); // Save the user to the database

    res.status(201).json({
      message: "User created successfully",
      user: newUser.toJSON(),
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Error creating user" });
  }
});

module.exports = router;
