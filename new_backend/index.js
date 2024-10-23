const express = require('express');
const connectDB = require('./connect');
const cors = require('cors');
const signupRouter = require('./routes/signup');
const loginRouter = require('./routes/login');
const profileRouter = require('./routes/profile');
const authmiddleware = require('./middlewares/authorization');
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

app.use('/users/signup', signupRouter);
app.use('/users/login', loginRouter);
app.use('/profile',profileRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the Application Tracking Systems API');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
