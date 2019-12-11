const matchers = require('@models/matchers');
const WeatherResponse = require('@responses/weatherResponse');

module.exports = class WeatherResponder {

  respondsTo(message, user) {
    this.matches = message.match(matchers.Weather) || [];
    return this.matches.length;

  }

  async respond(responseHandler) {
    await (new WeatherResponse(responseHandler, this.matches)).send();
  }

};
