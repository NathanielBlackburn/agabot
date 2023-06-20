const matchers = require('@models/matchers');
const PoemResponse = require('@responses/poemResponse');

module.exports = class PoemResponder {

  respondsTo(message, user) {
    return message.match(matchers.Derbot) != null;
  }

  async respond(responseHandler) {
    await (new PoemResponse(responseHandler)).send();
  }

};
