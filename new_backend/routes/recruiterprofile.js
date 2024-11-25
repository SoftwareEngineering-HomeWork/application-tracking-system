const express = require("express");
const router = express.Router();
const Recruiters = require("../models/Recruiter");
const getUserIdFromHeader = require("../helpers/get_userid");

//Path to get back profile details
router.get("/", async (req, res) => {
  try {
    // console.log(req.headers)
    const username = getUserIdFromHeader(req);
    let user = await Recruiters.findOne({username});
    console.log("user", user)
    if (!user) {
      return res
        .status(500)
        .json({ error: "Internal server error, cannot get profile data" });
    }

    const profileInformation = {
      username: user.username,
      fullName: user.fullName,
      email: user.email,
      companyName: user.companyName,
      contact: user.contact,
      location: user.location,
    };

    return res.status(200).json(profileInformation);
  } catch (error) {
    console.log("error", error)
    return res
      .status(500)
      .json({ error: "Internal server error, cannot get profile data" });
  }
});

//Path to update profile details
router.post("/", async (req, res) => {
  try {
    const userid = getUserIdFromHeader(req);
    console.log("This is the userId", userid);
    const user = await Recruiters.findOne({ username: userid });

    if (!user) {
      return res.status(404).json({ error: "Recruiter not found" });
    }

    const data = req.body;
    console.log("data: ", data)
    // Update other user fields
    Object.keys(data).forEach((key) => {
      user.set(key, data[key]);
    });

    await user.save();
    return res.status(200).json(user);
  } catch (error) {
    console.log("error: ", error)
    return res
      .status(500)
      .json({ error: "Internal server error, cannot update profile data" });
  }
});

module.exports = router;
