const express = require("express");
const Recruiter = require("../models/Recruiter");

const router = express.Router();


router.get("/", async (req, res) => {
  console.log("Hello")
  try {
    let recruiterId = req.query.recruiterId;
    if(!recruiterId) recruiterId='672d14402a464994cb7e066d';
    const recruiter = await Recruiter.findById(recruiterId);
    if (!recruiter) {
      return res.status(404).send({ message: "Recruiter not found" });
    }

    const matchingUsers = await recruiter.findMatchingUsers();
    console.log("These are the matching users",matchingUsers)
    res.status(200).send(matchingUsers);
  } catch (error) {
    console.log("This is the error",error)
    res.status(500).send({ message: "Server error", error });
  }
});

module.exports=router;
