const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Job = require("../models/Job_Model");

// POST request to create a job (no changes here)
router.post('/', (req, res) => {
    const { recruiterId, ...jobData } = req.body;  // Extract recruiterId and job data

    // Check if recruiterId is provided
    if (!recruiterId) {
        return res.status(400).json({ error: 'recruiterId is required' });
    }

    // Create a new Job document
    const newJob = new Job({
        recruiter_id: recruiterId,  // Set recruiter_id as ObjectId
        ...jobData,  // Spread other job data fields
    });

    // Save the new job to the database
    newJob.save()
      .then((job) => {
        res.status(200).json(job);  // Return the saved job in the response
      })
      .catch((err) => {
        console.log(err);  // Log any errors for debugging
        res.status(500).json({ error: 'Failed to post job' });
      });
});

// GET request to fetch jobs posted by a recruiter
router.get('/', (req, res) => {
    const { recruiterId } = req.query;  // Get recruiterId from query parameters

    // Check if recruiterId is provided
    if (!recruiterId) {
        return res.status(400).json({ error: 'recruiterId is required' });
    }

    // Fetch jobs by recruiterId
    Job.find({ recruiter_id: recruiterId })
        .then((jobs) => {
            if (!jobs || jobs.length === 0) {
                return res.status(404).json({ message: 'No jobs found for this recruiter' });
            }
            res.status(200).json(jobs);  // Return the jobs in the response
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'Failed to fetch jobs' });
        });
});

module.exports = router;
