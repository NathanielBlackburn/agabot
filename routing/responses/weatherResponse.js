const TextResponse = require('@responses/textResponse');
const OpenWeatherMapService = require('@services/openWeatherMap/openWeatherMapService');

module.exports = class WeatherResponse extends TextResponse {

  fetch(callback) {
    const openWeatherService = new OpenWeatherMapService();
    openWeatherService.get(weather => {
      this.text = weather.toString();
      callback();
    });
  }

};
