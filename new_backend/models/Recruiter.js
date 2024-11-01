const mongoose = require("mongoose");
const User = require("./User");

const recruiterSchema = new mongoose.Schema({
  companyname: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  skills: [{ type: mongoose.Schema.Types.Mixed }],
  job_levels: [{ type: mongoose.Schema.Types.Mixed }],
  locations: [{ type: mongoose.Schema.Types.Mixed }],
});

const Recruiter = mongoose.model("Recruiter", recruiterSchema);

// Method to convert user data to JSON
userSchema.methods.toJSON = function () {
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

  const matchingUsers = await User.find({
    $expr: {
      $and: [
        { $gte: [{ $size: { $setIntersection: [skills, "$skills"] } }, 2] },
        { $eq: [job_levels[0], "$job_levels"] },
        {
          $gte: [{ $size: { $setIntersection: [locations, "$locations"] } }, 1],
        },
      ],
    },
  });

  return matchingUsers;
};

module.exports = Recruiter;
