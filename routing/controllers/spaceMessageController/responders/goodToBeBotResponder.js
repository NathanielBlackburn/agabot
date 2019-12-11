const matchers = require('@models/matchers');
const staticTexts = require('@models/staticTexts');
const TextResponse = require('@responses/textResponse');

module.exports = class NewDayNewPossibilitiesResponder {

  respondsTo(message, user) {
    return message.match(matchers.GoodToBeBot) != null;
  }

  async respond(responseHandler) {
    await (new TextResponse(responseHandler, staticTexts.GoodToBeBot)).send();
  }
};
