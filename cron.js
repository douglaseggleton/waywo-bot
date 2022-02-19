const { handler } = require("./index");

var CronJob = require("cron").CronJob;

var job = new CronJob(
  process.env.SCHEDULE || "0 9 * * 1-5",
  handler,
  null,
  true,
  process.env.TIMEZONE || "Europe/London"
);

job.start();
