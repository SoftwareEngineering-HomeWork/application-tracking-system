const express = require("express");
const bcrypt = require("bcrypt");
const Users = require("../models/User");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username or password missing" });
    }

    // Find the user by username
    const user = await Users.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Wrong username or password" });
    }

    // Compare the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Wrong username or password" });
    }

    // Generate a new token
    const token = `${user._id}.${uuidv4()}`;
    const expiry = new Date(Date.now() + 86400000).toISOString(); // 1 day expiry

    // Update user's auth tokens
    user.authTokens.push({ token, expiry });
    await user.save();

    // Prepare profile information
    const profileInfo = {
      id: user._id,
      fullName: user.fullName,
      userId: user.username,
      institution: user.institution,
      skills: user.skills,
      phone_number: user.phone_number,
      address: user.address,
      locations: user.locations,
      jobLevels: user.job_levels,
      email: user.email,
    };

    return res.json({ profile: profileInfo, token, expiry });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
