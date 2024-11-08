const express = require('express');
const router = express.Router();
const Recruiter = require('../models/Recruiter'); 


router.get('/', async (req, res) => {
    try {
        let recruiterId = req.query.recruiterId;
        if(!recruiterId) recruiterId='672d14402a464994cb7e066d';
        const recruiter = await Recruiter.findById(recruiterId);
        
        if (!recruiter) {
            return res.status(404).json({ message: 'Recruiter not found' });
        }
        // console.log(recruiter)

        res.json(recruiter.job_levels);
    } catch (error) {
        console.log("This is the error",error)
        res.status(500).json({ message: 'Server error', error });
    }
});

router.post("/", async (req, res) => {
  let { id, newLevel } = req.body;
  if(!id) id='672d14402a464994cb7e066d';

  try {
    const recruiter = await Recruiter.findById(id);
    if (!recruiter) {
      return res.status(404).send("Recruiter not found");
    }

    recruiter.job_levels.push(newLevel);
    await recruiter.save();

    res.status(200).send(recruiter);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

module.exports=router;
