const express = require('express');
const router = express.Router();
const Users = require('../models/User');
const Applications = require('../models/Applications.js'); // Assuming this exists or create one
const getUserIdFromHeader = require('../helpers/get_userid');

// Apply for a job
router.post('/', async (req, res) => {
  try {
    const userId = getUserIdFromHeader(req);
    const { jobId } = req.body;

    if (!jobId) {
      return res.status(400).json({ error: 'Job ID is required' });
    }

    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const existingApplication = await Applications.findOne({ userId, jobId });
    if (existingApplication) {
      return res.status(400).json({ error: 'You have already applied to this job' });
    }
    const newApplication = new Applications({
      userId,
      jobId,
      candidateInfo: {
        fullName: user.fullName,
        email: user.email,
        skills: user.skills,
        resume: user.resume,
      },
    });

    await newApplication.save();
    return res.status(200).json({ message: 'Successfully applied to the job' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// GET user applications (fetch jobs the user has applied to)
router.get('/', async (req, res) => {
  try {
    const userId = getUserIdFromHeader(req); // Fetch user ID from the request header
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const applications = await Applications.find({ userId }); // Assuming jobId references Job model
    if (!applications || applications.length === 0) {
      return res.status(404).json({ message: 'No applications found' });
    }
    // Send back the list of job IDs that the user has applied for
    const appliedJobIds = applications.map(application => application.jobId);
    return res.status(200).json(appliedJobIds);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
