const matchers = require('@models/matchers');
const SrolerResponse = require('@responses/srolerResponse');

module.exports = class SrolerResponder {

  respondsTo(message, user, originalMessage) {
    this.matches = originalMessage.match(matchers.Sroler) || [];
    return this.matches.length;
  }

  async respond(responseHandler) {
    await (new SrolerResponse(responseHandler, this.matches)).send();
  }

};