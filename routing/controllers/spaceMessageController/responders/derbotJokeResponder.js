const matchers = require('@models/matchers');
const DerbotJokeResponse = require('@responses/derbotJokeResponse');

module.exports = class DerbotJokeResponder {

  respondsTo(message, user) {
    return message.match(matchers.Derbot) != null;
  }

  respond(responseHandler) {
    (new DerbotJokeResponse(responseHandler)).send();
  }

};
