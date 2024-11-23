const express = require("express");
const bcrypt = require("bcrypt");
const Recruiters = require("../models/Recruiter");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

router.post("/", async (req, res) => {
  try {
    const { username, password,} = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "username or password missing" });
    }

    const recruiter = await Recruiters.findOne({ username });
    if (!recruiter) {
      return res.status(400).json({ error: "Wrong username or password" });
    }

    // Compare the hashed password
    const isMatch = await bcrypt.compare(password, recruiter.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Wrong password" });
    }
    const token = `${recruiter._id}.${uuidv4()}`;
    // Prepare profile information
    const profileInfo = {
      id: recruiter._id,
      username: recruiter.username,
      fullName: recruiter.fullName,
      email: recruiter.email,
    };
    return res.json({ profile: profileInfo, token });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
