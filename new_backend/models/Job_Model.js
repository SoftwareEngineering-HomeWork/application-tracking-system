const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  recruiter_id: { type: String, ref: 'Recruiter', required: true },
  job_id: { type: String, required: true, unique: true }, // Add unique job_id
  job_title: { type: String, required: true },
  job_description: { type: String, required: false },
  job_location: { type: String, required: false },
  job_type: { type: String, required: false },
  experience_level: { type: String, required: false },
  salary_range: {
    min: { type: Number, required: false },
    max: { type: Number, required: false },
  },
  skills_required: [{ type: String, required: false }],
  job_category: { type: String, required: false },
  application_url_or_email: { type: String, required: false },
  deadline: { type: Date, required: false },
  jd_upload: {
    file_name: { type: String, required: false },
    file_path: { type: String, required: false },
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Job', jobSchema);
