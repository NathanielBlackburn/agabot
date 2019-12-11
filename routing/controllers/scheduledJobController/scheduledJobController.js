const BaseController = require('@controllers/baseController');

const DailyHelloResponder = require('@controllers/scheduledJobController/responders/dailyHelloResponder');
const DefaultEmptyResponder = require('@controllers/scheduledJobController/responders/defaultEmptyResponder');

const responders = [
  new DailyHelloResponder(),
];

module.exports = class ScheduledJobController extends BaseController {

  respond() {
    const jobName = this.request.body.jobName;
    const responder = responders.find(responder => responder.respondsTo(jobName))
      || (new DefaultEmptyResponder());
    responder
      .respond(this.responseHandler)
      .catch(error => console.error('error'));
  }

};
