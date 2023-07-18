// src/App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000'
});

function App() {
  const [cronJobs, setCronJobs] = useState([]);
  const [newJob, setNewJob] = useState({ name: '', schedule: '', command: '' });

  useEffect(() => {
    // Fetch Cron jobs from the server
    api.get('/api/cronjobs')
      .then(response => {
        setCronJobs(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleInputChange = event => {
    setNewJob({ ...newJob, [event.target.name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();

    // Send a POST request to create a new Cron job
    api.post('/api/cronjobs', newJob)
      .then(response => {
        setCronJobs([...cronJobs, response.data]);
        setNewJob({ name: '', schedule: '', command: '' });
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleDelete = jobId => {
    // Send a DELETE request to delete the Cron job
    api.delete(`/api/cronjobs/${jobId}`)
      .then(() => {
        const updatedJobs = cronJobs.filter(job => job.id !== jobId);
        setCronJobs(updatedJobs);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Cron Job Management</h1>

      <form onSubmit={handleSubmit}>
      <input
          type="text"
          name="name"
          placeholder="Job Name"
          value={newJob.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="schedule"
          placeholder="Schedule"
          value={newJob.schedule}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="command"
          placeholder="Command"
          value={newJob.command}
          onChange={handleInputChange}
        />
        <button type="submit">Add Cron Job</button>
      </form>

      <ul>
        {cronJobs.map(job => (
          <li key={job.id}>
            {job.name}
            <button onClick={() => handleDelete(job.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
