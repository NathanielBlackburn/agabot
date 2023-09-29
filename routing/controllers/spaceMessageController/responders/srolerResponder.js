const matchers = require('@models/matchers');
const SrolerResponse = require('@responses/srolerResponse');

module.exports = class SrolerResponder {

  constructor(alwaysResponds = false) {
    this.alwaysResponds = alwaysResponds;
  }

  respondsTo(message, user, originalMessage) {
    if (this.alwaysResponds) {
      this.matches = ['', originalMessage];
      return true;
    }
    this.matches = originalMessage.match(matchers.Sroler) || [];
    return this.matches.length;
  }

  async respond(responseHandler) {
    await (new SrolerResponse(responseHandler, this.matches)).send();
  }

};