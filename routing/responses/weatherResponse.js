const TextResponse = require('@responses/textResponse');
const OpenWeatherMapService = require('@services/openWeatherMap/openWeatherMapService');
const City = require('@services/openWeatherMap/city');

module.exports = class WeatherResponse extends TextResponse {

  constructor(responseHandler, matches) {
    super(responseHandler, '');
    this.matches = matches;
  }


  fetch(callback) {
    const city = new City(this.matches[1]);
    const openWeatherService = new OpenWeatherMapService(city);
    openWeatherService.get(weather => {
      this.text = weather.toString();
      callback();
    });
  }

};
