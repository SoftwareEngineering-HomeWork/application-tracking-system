const mongoose = require("mongoose");
const User = require("./User");

const recruiterSchema = new mongoose.Schema({
  companyname: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  skills: [{ type: mongoose.Schema.Types.Mixed }],
  job_levels: [{ type: mongoose.Schema.Types.Mixed }],
  locations: [{ type: mongoose.Schema.Types.Mixed }],
});



// Method to convert user data to JSON
recruiterSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  return {
    id: userObject._id,
    companyname: userObject.username,
  };
};

// Method to find matching users based on recruiter's criteria
recruiterSchema.methods.findMatchingUsers = async function () {
  const recruiter = this;
  const { skills, job_levels, locations } = recruiter;

  // Log the recruiter's criteria
  console.log("Recruiter Skills:", skills);
  console.log("Recruiter Job Levels:", job_levels);
  console.log("Recruiter Locations:", locations);

  const matchingUsers = await User.find({
    $expr: {
      $and: [
        {
          $in: [job_levels[0], { $map: { input: "$job_levels", as: "jl", in: "$$jl.label" } }],
        },
        // {
        //   $gte: [{ $size: { $setIntersection: [skills, { $map: { input: "$skills", as: "s", in: "$$s.label" } }] } }, 2],
        // },
        // {
        //   $gte: [{ $size: { $setIntersection: [locations, { $map: { input: "$locations", as: "l", in: "$$l.label" } }] } }, 1],
        // },
      ],
    },
  });

  // Log the matching users found
  console.log("Matching Users:", matchingUsers);

  return matchingUsers;
};

const Recruiter = mongoose.model("Recruiter", recruiterSchema);

// Exporting the Recruiter model
module.exports = Recruiter;
