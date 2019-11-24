const matchers = require('@models/matchers');
const dynamicTexts = require('@models/dynamicTexts');
const TextResponse = require('@responses/textResponse');

module.exports = class DefaultResponder {

  respondsTo(message, user) {
    return true;
  }

  respond(responseHandler) {
    (new TextResponse(responseHandler, dynamicTexts.DontUnderstand)).send();
  }
};
