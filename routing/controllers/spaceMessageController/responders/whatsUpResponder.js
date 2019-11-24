const matchers = require('@models/matchers');
const staticTexts = require('@models/staticTexts');
const TextResponse = require('@responses/textResponse');

module.exports = class WhatsUpResponder {

  respondsTo(message, user) {
    return message.match(matchers.WhatsUp) != null;
  }

  respond(responseHandler) {
    (new TextResponse(responseHandler, staticTexts.Nothing)).send();
  }
};
