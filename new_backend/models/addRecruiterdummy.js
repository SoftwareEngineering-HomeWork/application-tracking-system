const Recruiter=require('./Recruiter')

const mongoose = require('mongoose'); // Add Mongoose import
require('dotenv').config(); // Add dotenv to load environment variables

console.log(process.env.MONGO_URI);
// Connect to the database
mongoose.connect("", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => addrecruiter())
.catch((error) => console.error("Database connection error:", error));

// ... existing code ...

function addrecruiter()
{

const newRecruiter = new Recruiter({
  companyname: "oracle",
  password: "oracle",
  skills: [], 
  job_levels: [],
  locations: []
});

newRecruiter.save()
  .then(() => console.log("Recruiter added successfully"))
  .catch((error) => console.error("Error adding recruiter:", error));

}