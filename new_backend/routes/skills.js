const express = require('express');
const router = express.Router();
const Recruiter = require('../models/Recruiter'); 

// New route to get locations from the recruiter
router.get('/', async (req, res) => {
    // console.log("The get request is being called")
    try {
        let recruiterId = req.query.recruiterId;
        if(!recruiterId) recruiterId='672d14402a464994cb7e066d';
        const recruiter = await Recruiter.findById(recruiterId);
        
        if (!recruiter) {
            return res.status(404).json({ message: 'Recruiter not found' });
        }
        // console.log(recruiter)

        res.json(recruiter.skills);
    } catch (error) {
        console.log("This is the error",error)
        res.status(500).json({ message: 'Server error', error });
    }
});

router.post("/", async (req, res) => {
  let { id, newSkill } = req.body;
  console.log("This is the newskill",newSkill)
  if(!id) id='672d14402a464994cb7e066d';

  try {
    const recruiter = await Recruiter.findById(id);
    if (!recruiter) {
      return res.status(404).send("Recruiter not found");
    }

    recruiter.skills.push(newSkill);
    await recruiter.save();

    res.status(200).send(recruiter);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

module.exports=router;
