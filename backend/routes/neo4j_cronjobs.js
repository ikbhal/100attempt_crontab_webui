// routes/cronjobs.js

const express = require('express');
const router = express.Router();
const driver = require('../db');


let nextJobId = 1; // Custom ID counter for job nodes

// Create a new Cron job
router.post('/', (req, res) => {
  const { name, schedule, command } = req.body;

  const session = driver.session();

  const query = `
    CREATE (job:CronJob {id: $jobId, name: $name, schedule: $schedule, command: $command})
    RETURN job
  `;

  const params = { jobId: nextJobId, name, schedule, command };

  session.run(query, params)
    .then(result => {
      session.close();

      const job = result.records[0].get('job').properties;
      nextJobId++; // Increment the custom ID counter for the next job
      res.status(201).json(job);
    })
    .catch(error => {
      session.close();
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    });
});


// Get a Cron job by ID
router.get('/:id', (req, res) => {
  const jobId = parseInt(req.params.id);

  const session = driver.session();

  const query = `
    MATCH (job:CronJob)
    WHERE job.id = $jobId
    RETURN job
  `;

  const params = { jobId };

  session.run(query, params)
    .then(result => {
      session.close();

      if (result.records.length === 0) {
        res.status(404).json({ error: 'Job not found' });
      } else {
        const job = result.records[0].get('job').properties;
        res.json(job);
      }
    })
    .catch(error => {
      session.close();
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    });
});


// Get all Cron jobs
router.get('/', (req, res) => {
  const session = driver.session();

  const query = `
    MATCH (job:CronJob)
    RETURN job {.id, .name, .schedule, .command}
  `;

  session.run(query)
    .then(result => {
      session.close();

      const jobs = result.records.map(record => ({
        ...record.get('job')
      }));
      res.json(jobs);
    })
    .catch(error => {
      session.close();
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    });
});



// Delete a Cron job by ID
router.delete('/:id', (req, res) => {
  const jobId = req.params.id;

  const session = driver.session();

  const query = `
    MATCH (job:CronJob)
    WHERE job.id = $jobId
    DELETE job
  `;

  const params = { jobId };

  session.run(query, params)
    .then(() => {
      session.close();
      res.json({ message: 'Job deleted successfully' });
    })
    .catch(error => {
      session.close();
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    });
});


module.exports = router;
