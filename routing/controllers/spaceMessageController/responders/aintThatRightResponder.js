const matchers = require('@models/matchers');
const dynamicTexts = require('@models/dynamicTexts');
const TextResponse = require('@responses/textResponse');

module.exports = class AintThatRightResponder {

  respondsTo(message, user) {
    return message.match(matchers.AintThatRight) != null;
  }

  respond(responseHandler) {
    (new TextResponse(responseHandler, dynamicTexts.OfCourse)).send();
  }
};
