const matchers = require('@models/matchers');
const FoodResponse = require('@responses/foodResponse');
module.exports = class GimmeFoodResponder {

  respondsTo(message, user) {
    return message.match(matchers.Food) != null;
  }

  async respond(responseHandler) {
    await (new FoodResponse(responseHandler)).send();
  }
};
