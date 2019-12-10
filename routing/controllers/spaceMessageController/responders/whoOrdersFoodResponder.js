const matchers = require('@models/matchers');
const staticTexts = require('@models/staticTexts');
const dynamicTexts = require('@models/dynamicTexts');
const arrayToolkit = require('@tools/arrayToolkit');
const TextResponse = require('@responses/textResponse');

module.exports = class WhoOrdersFoodResponder {

  respondsTo(message, user, originalMessage) {
    this.message = message;
    this.originalMessage = originalMessage;
    return message.match(matchers.WhoOrdersFood) != null;
  }

  respond(responseHandler) {
    const names = this.originalMessage.replace(matchers.WhoOrdersFood, '').trim();
    const nameList = names.split(names.includes(',') ? ',' : ' ');
    const chosenName = arrayToolkit.randomElement(nameList);
    const response = chosenName.includes('Marcin')
      ? dynamicTexts.MarcinOrdersFood(chosenName.trim())
      : staticTexts.SomeoneOrdersFood.replace('[chosenName]', chosenName.trim());
    (new TextResponse(responseHandler, response)).send();
  }

};
