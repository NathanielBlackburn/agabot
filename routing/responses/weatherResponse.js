const TextResponse = require('@responses/textResponse');
const OpenWeatherMapService = require('@services/openWeatherMap/openWeatherMapService');
const City = require('@services/openWeatherMap/city');
const staticTexts = require('@models/staticTexts');

module.exports = class WeatherResponse extends TextResponse {

  constructor(responseHandler, matches) {
    super(responseHandler, '');
    this.matches = matches;
  }


  async fetch() {
    const city = new City(this.matches[1]);
    if (city.id == -1) {
      this.text = staticTexts.NoWeatherForNoCities;
      return;
    }

    const openWeatherService = new OpenWeatherMapService(city);
    this.text = (await openWeatherService.get()).interpretation({showCityName: true});
  }

};
