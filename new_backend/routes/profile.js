const express = require("express");
const router = express.Router();
const Users = require("../models/User");
const getUserIdFromHeader = require("../helpers/get_userid");

//Path to get back profile details
router.get("/", async (req, res) => {
  try {
    // console.log("req: ", req)
    const userid = getUserIdFromHeader(req);
    let user = await Users.findById(userid);
    if (!user) {
      return res
        .status(500)
        .json({ error: "Internal server error, cannot get profile data" });
    }

    const profileInformation = {
      skills: user.skills,
      job_levels: user.job_levels,
      locations: user.locations,
      institution: user.institution,
      phone_number: user.phone_number,
      address: user.address,
      email: user.email,
      linkedinId: user.linkedinId,
      githubId: user.githubId,
      fullName: user.fullName,
      extensionDetails: user.extensionDetails,
    };

    return res.status(200).json(profileInformation);
  } catch (error) {
    console.log("This is the error", error);
    return res
      .status(500)
      .json({ error: "Internal server error, cannot get profile data" });
  }
});

//Path to update profile details
router.post("/", async (req, res) => {
  try {
    // console.log("req: ", req)
    const userid = getUserIdFromHeader(req);
    console.log("This is the userId", userid);
    const user = await Users.findById(userid);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const data = req.body;

    // Update other user fields
    Object.keys(data).forEach((key) => {
      if (key == "extensionDetails") {
        let temp = user.get(key);
        temp = [...temp, ...data[key]];
        user.set(key, temp);
      } else user.set(key, data[key]);
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
