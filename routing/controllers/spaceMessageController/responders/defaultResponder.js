const matchers = require('@models/matchers');
const dynamicTexts = require('@models/dynamicTexts');
const TextResponse = require('@responses/textResponse');

module.exports = class DefaultResponder {

  respondsTo(message, user) {
    return true;
  }

  async respond(responseHandler) {
    await (new TextResponse(responseHandler, dynamicTexts.DontUnderstand)).send();
  }
};
