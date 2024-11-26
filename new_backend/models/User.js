const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  authTokens: [{ type: mongoose.Schema.Types.Mixed }],
  email: { type: String },
  linkedinId: { type: String },
  githubId: { type: String },
  applications: [{ type: mongoose.Schema.Types.Mixed }],
  resume: { type: String },
  skills: [{ type: mongoose.Schema.Types.Mixed }],
  job_levels: [{ type: mongoose.Schema.Types.Mixed }],
  locations: [{ type: mongoose.Schema.Types.Mixed }],
  institution: { type: String },
  phone_number: { type: String },
  address: { type: String },
  extensionDetails: [{ type: mongoose.Schema.Types.Mixed }],
});

// Method to convert user data to JSON
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  return {
    id: userObject._id,
    fullName: userObject.fullName,
    username: userObject.username,
    linkedinId: userObject.linkedinId,
    githubId: userObject.githubId,
  };
};

const User = mongoose.model("User", userSchema);

module.exports = User;
