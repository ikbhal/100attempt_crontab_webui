// routes/cronjobs.js

const express = require('express');
const router = express.Router();
const driver = require('../db');

// Mock data for demonstration purposes
const cronJobs = [
  { id: 1, name: 'Job 1', schedule: '0 0 * * *' },
  { id: 2, name: 'Job 2', schedule: '0 12 * * *' },
  { id: 3, name: 'Job 3', schedule: '0 */6 * * *' }
];

// GET /api/cronjobs
router.get('/', (req, res) => {
  res.json(cronJobs);
});

// POST /api/cronjobs
router.post('/', (req, res) => {
    // Extract the job details from the request body
    const { name, schedule, command } = req.body;
  
    // Create a new Cron job object with the provided details
    const newJob = {
      id: cronJobs.length + 1,
      name,
      schedule,
      command
    };
  
    // Add the new job to the list
    cronJobs.push(newJob);
  
    res.status(201).json(newJob);
  });
  
  // DELETE /api/cronjobs/:id
router.delete('/:id', (req, res) => {
  const jobId = parseInt(req.params.id);

  // Find the index of the job with the specified ID
  const jobIndex = cronJobs.findIndex(job => job.id === jobId);

  if (jobIndex === -1) {
    // Job not found
    res.status(404).json({ error: 'Job not found' });
  } else {
    // Remove the job from the list
    cronJobs.splice(jobIndex, 1);

    res.json({ message: 'Job deleted successfully' });
  }
});


// GET /api/cronjobs/:id
router.get('/:id', (req, res) => {
  const jobId = parseInt(req.params.id);

  // Find the job with the specified ID
  const job = cronJobs.find(job => job.id === jobId);

  if (!job) {
    // Job not found
    res.status(404).json({ error: 'Job not found' });
  } else {
    res.json(job);
  }
});

module.exports = router;
