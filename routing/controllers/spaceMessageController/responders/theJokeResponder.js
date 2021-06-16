const matchers = require('@models/matchers');
const TheJokeResponse = require('@responses/theJokeResponse');

module.exports = class TheJokeResponder {

  respondsTo(message, user) {
    return message.match(matchers.Derbot) != null && user.hash == 'dbf57225ea526eca69c2b13eb89dd47e7c1b48ce38cab1ba1ca2fb3728999335';
  }

  async respond(responseHandler) {
    await (new TheJokeResponse(responseHandler)).send();
  }

};
