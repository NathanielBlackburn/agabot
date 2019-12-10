const TextResponse = require('@responses/textResponse');
const OpenWeatherMapService = require('@services/openWeatherMap/openWeatherMapService');
const City = require('@services/openWeatherMap/city');
const staticTexts = require('@models/staticTexts');

module.exports = class WeatherResponse extends TextResponse {

  constructor(responseHandler, matches) {
    super(responseHandler, '');
    this.matches = matches;
  }


  fetch(callback) {
    const city = new City(this.matches[1]);
    if (city.id == -1) {
      this.text = staticTexts.NoWeatherForNoCities;
      callback();
      return;
    }

    const openWeatherService = new OpenWeatherMapService(city);
    openWeatherService.get(weather => {
      this.text = weather.toString();
      callback();
    });
  }

};
