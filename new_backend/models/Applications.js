const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  userId: { type: String, ref: 'User', required: true },
  jobId: { type: String, required: true },
  candidateInfo: {
    fullName: { type: String, required: true },
    email: { type: String, required: false },
    linkedinId: {type: String, required: false},
    githubId: {type: String, required: false},
    skills: [{ type: mongoose.Schema.Types.Mixed }],
    resume: { type: String },
    phone_number: { type: String },
  },
  appliedAt: { type: Date, default: Date.now },
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
