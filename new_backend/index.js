/* eslint-disable */
const express = require("express");
const connectDB = require("./connect");
const cors = require("cors");
const signupRouter = require("./routes/signup");
const loginRouter = require("./routes/login");
const recruiterLoginRouter = require("./routes/recruiterlogin");
const recruitersignupRouter = require("./routes/recruitersignup");
const profileRouter = require("./routes/profile");
const recruiterprofileRouter = require("./routes/recruiterprofile");
const applicationRouter = require("./routes/applications");
const locationRouter = require('./routes/locations');
const skillRouter = require('./routes/skills');
const experienceRouter = require('./routes/experience');
const matchingRouter = require('./routes/recruitermatching');
const jobRouter = require('./routes/job');
const directApplicationRouter = require('./routes/directapplications')
const resumeRouter = require('./routes/resumes')
// const authmiddleware = require("./middlewares/authorization");
const app = express();
const port = 5001;

connectDB();

app.use(express.json());
app.use(cors());

// Use the middleware for all routes except signup and login
// app.use((req, res, next) => {
//     if (req.path === '/users/signup' || req.path === '/users/login') {
//         return next(); // Skip middleware for signup and login
//     }
//     authmiddleware(req, res, next); // Apply middleware for other routes
// });

app.use("/recruiter/signup", recruitersignupRouter);
app.use("/recruiter/login", recruiterLoginRouter);
app.use("/users/signup", signupRouter);
app.use("/users/login", loginRouter);
app.use("/profile", profileRouter);
app.use("/recruiterprofile", recruiterprofileRouter);
app.use("/applications", applicationRouter);
app.use("/recruiter/locations", locationRouter);
app.use("/recruiter/skills", skillRouter);
app.use("/recruiter/experience", experienceRouter);
app.use('/recruiter/matches', matchingRouter);
app.use('/recruiter/jobs', jobRouter);
app.use('/applications/apply', directApplicationRouter);
app.use('/resume', resumeRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the Application Tracking Systems API");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
