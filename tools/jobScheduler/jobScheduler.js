const schedule = require('node-schedule');
const scheduledJobs = [];
const jobsToSchedule = [
  require('@tools/jobScheduler/jobs/dailyGreetingJob')
];

module.exports = () => {
  jobsToSchedule.forEach(job => scheduledJobs.push(schedule.scheduleJob(job.schedule, job.action)));
};
