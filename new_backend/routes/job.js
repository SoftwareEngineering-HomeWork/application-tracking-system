const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Job = require("../models/Job_Model");

// POST request to create a job (no changes here)
router.post('/', (req, res) => {
    const { recruiterId, job_id, salary_min, salary_max, ...jobData } = req.body;
    
    if (!recruiterId || !job_id) {
      return res.status(400).json({ error: 'recruiterId and job_id are required' });
    }
  
    const newJob = new Job({
      recruiter_id: recruiterId,
      job_id: job_id, // Include job_id
      salary_range: {
        min: salary_min,
        max: salary_max
      },
      ...jobData,
    });
  
    newJob
      .save()
      .then((job) => {
        res.status(200).json(job);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: 'Failed to post job' });
      });
  });

// GET request to fetch jobs
router.get('/', (req, res) => {
    const { recruiterId } = req.query; // Get recruiterId from query parameters

    const filter = recruiterId ? { recruiter_id: recruiterId } : {}; // Filter by recruiterId if provided

    // Fetch jobs based on the filter
    Job.find(filter)
        .then((jobs) => {
            if (!jobs || jobs.length === 0) {
                return res.status(404).json({ message: 'No jobs found' });
            }
            
            res.status(200).json(jobs); // Return the jobs in the response
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'Failed to fetch jobs' });
        });
});

module.exports = router;
