const schedule = require('node-schedule');
const scheduledJobs = [];
const jobsToSchedule = [
  
];

module.exports = () => {
  jobsToSchedule.forEach(job => scheduledJobs.push(schedule.scheduleJob(job.schedule, job.action)));
};
