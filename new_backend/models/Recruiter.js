const mongoose = require("mongoose");
const User = require("./User");

const recruiterSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  password: { type: String, required: true },
  authTokens: [{ type: mongoose.Schema.Types.Mixed }],
  email: { type: String, required: false },
  companyName: { type: String, required: false },
  location:  {type: String, required: false },
  contact: { type: String, required: false },
});



// Method to convert user data to JSON
recruiterSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  return {
    id: userObject._id,
    username: userObject.username,
    fullName: userObject.fullName
  };
};

// Method to find matching users based on recruiter's criteria
recruiterSchema.methods.findMatchingUsers = async function () {
  const recruiter = this;

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
