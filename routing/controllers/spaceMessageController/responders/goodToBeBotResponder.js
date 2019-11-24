const matchers = require('@models/matchers');
const staticTexts = require('@models/staticTexts');
const TextResponse = require('@responses/textResponse');

module.exports = class NewDayNewPossibilitiesResponder {

  respondsTo(message, user) {
    return message.match(matchers.GoodToBeBot) != null;
  }

  respond(responseHandler) {
    (new TextResponse(responseHandler, staticTexts.GoodToBeBot)).send();
  }
};
