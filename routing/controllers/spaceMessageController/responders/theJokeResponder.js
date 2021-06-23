const matchers = require('@models/matchers');
const TheJokeResponse = require('@responses/theJokeResponse');

module.exports = class TheJokeResponder {

  respondsTo(message, user) {
    return message.match(matchers.Fafkulce) != null;
  }

  async respond(responseHandler) {
    await (new TheJokeResponse(responseHandler)).send();
  }

};
