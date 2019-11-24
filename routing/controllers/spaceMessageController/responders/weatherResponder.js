const matchers = require('@models/matchers');
const WeatherResponse = require('@responses/weatherResponse');

module.exports = class WeatherResponder {

  respondsTo(message, user) {
    return message.match(matchers.Weather) != null;
  }

  respond(responseHandler) {
    (new WeatherResponse(responseHandler)).send();
  }

};
