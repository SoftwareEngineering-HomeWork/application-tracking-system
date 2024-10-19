const express = require('express');
const app = express();
const port = 5000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Application Tracking System API');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

