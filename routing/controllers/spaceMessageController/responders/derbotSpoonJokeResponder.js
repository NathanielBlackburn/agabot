const matchers = require('@models/matchers');
const DerbotSpoonJokeResponse = require('@responses/derbotSpoonJokeResponse');

module.exports = class DerbotSpoonJokeResponder {

  respondsTo(message, user) {
    return message.match(matchers.DerbotOLyzce) != null;
  }

  async respond(responseHandler) {
    await (new DerbotSpoonJokeResponse(responseHandler)).send();
  }

};
