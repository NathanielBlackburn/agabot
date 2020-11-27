const matchers = require('@models/matchers');
const HoroscopeResponse = require('@responses/horoscopeResponse');

module.exports = class HoroscopeResponder {

  respondsTo(message, user, originalMessage) {
    this.message = message;
    this.originalMessage = originalMessage;
    return message.match(matchers.Horoscope) != null;
  }

  async respond(responseHandler) {
    const sign = this.message.match(matchers.Horoscope)[1];
    await (new HoroscopeResponse(responseHandler, sign)).send();
  }

};
