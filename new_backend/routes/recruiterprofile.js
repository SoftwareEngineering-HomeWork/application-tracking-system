const express = require('express');
const router = express.Router();
const Recruiters = require('../models/Recruiter'); 
const getUserIdFromHeader = require('../helpers/get_userid');

//Path to get back profile details
router.get('/', async(req, res) => {
    try {
        const userid = getUserIdFromHeader(req); 
        let user = await Recruiters.findById(userid);
        if (!user) {
            return res.status(500).json({ error: "Internal server error, cannot get profile data" });
        }

        const profileInformation = 
        {
            skills: user.skills,
            job_levels: user.job_levels,
            locations: user.locations,
        };

        return res.status(200).json(profileInformation);
        }
        catch (error) 
        {
        return res.status(500).json({ error: "Internal server error, cannot get profile data" });
    }
});

//Path to update profile details
router.post('/', async (req, res) => {
    try {
        const userid = getUserIdFromHeader(req); 
        console.log("This is the userId", userid);
        const user = await Recruiters.findById(userid); 

        if (!user) {
            return res.status(404).json({ error: "Recruiter not found" });
        }

        const data = req.body; 

        // Update other user fields
        Object.keys(data).forEach(key => {
             user.set(key, data[key]);
        });

        await user.save(); 
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error, cannot update profile data" });
    }
});

module.exports = router;
