// index.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
// Routes
const cronJobsRoute = require('./routes/cronjobs');
app.use('/api/cronjobs', cronJobsRoute);
// Define your API routes here

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
