const cron = require('node-crontab');

// List all cron jobs
const listCrons = () => {
  const jobs = cron.list();
  jobs.forEach(job => {
    console.log(`ID: ${job.id}`);
    console.log(`Command: ${job.command}`);
    console.log(`Schedule: ${job.schedule}`);
    console.log('---------------------------');
  });
};

// Add a new cron job
const addCron = () => {
  const newJob = cron.create('* * * * *', 'echo "Hello, World!"');
  cron.save(newJob);
  console.log('New cron job added successfully.');
};

// Delete a cron job by ID
const deleteCron = (cronId) => {
  cron.remove(cronId);
  console.log('Cron job deleted successfully.');
};

// Edit a cron job by ID
const editCron = (cronId, newSchedule, newCommand) => {
  const job = cron.load(cronId);
  job.schedule = newSchedule;
  job.command = newCommand;
  cron.save(job);
  console.log('Cron job edited successfully.');
};

// Usage examples
listCrons(); // List all cron jobs
addCron(); // Add a new cron job
deleteCron(123); // Delete cron job with ID 123
editCron(456, '0 0 * * *', 'node script.js'); // Edit cron job with ID 456
