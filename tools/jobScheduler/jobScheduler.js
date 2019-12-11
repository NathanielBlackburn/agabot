const schedule = require('node-schedule');
let scheduledJobs = [];
const jobsToSchedule = [

];

module.exports = () => {
  scheduledJobs = jobsToSchedule.map(job => schedule.scheduleJob(job.schedule, job.action));
};
