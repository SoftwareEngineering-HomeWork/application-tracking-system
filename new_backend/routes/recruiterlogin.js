const express = require('express');
const bcrypt = require('bcrypt');
const Recruiters = require('../models/Recruiter');  
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

router.post('/', async (req, res) => {
  try {
    const { companyname, password } = req.body;

    if (!companyname || !password) {
      return res.status(400).json({ error: 'Companyname or password missing' });
    }

    const recruiter = await Recruiters.findOne({ companyname });
    if (!recruiter) {
      return res.status(400).json({ error: 'Wrong companyname or password' });
    }

    // Compare the hashed password
    const isMatch = await bcrypt.compare(password, recruiter.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Wrong companyname or password' });
    }

    const token = `${user._id}.${uuidv4()}`;

    // Prepare profile information
    const profileInfo = {
      id: recruiter._id,
      companyname: recruiter.companynameName,
      skills: recruiter.skills,
      locations: recruiter.locations,
      jobLevels: recruiter.job_levels,
    };

    return res.json({ profile: profileInfo,token});
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
