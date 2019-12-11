const matchers = require('@models/matchers');
const DadJokeResponse = require('@responses/dadJokeResponse');

module.exports = class DadJokeResponder {

  respondsTo(message, user) {
    return message.match(matchers.Joke) != null;
  }

  async respond(responseHandler) {
    await (new DadJokeResponse(responseHandler)).send();
  }

};
