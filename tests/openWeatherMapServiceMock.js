const Weather = require('@services/openWeatherMap/weather');

module.exports = class OpenWeatherMapServiceMock {

  async fetch() {
    const currentDate = new Date();
    const weather = new Weather({
      main: {
        temp: 13
      },
      clouds: {
        all: 20
      },
      sys: {
        sunrise: currentDate.valueOf() - 1000 * 60 * 60 * 6,
        sunset: currentDate.valueOf() + 1000 * 60 * 60 * 6,
      },
      wind: {
        speed: 1
      },
      weather: []
    });
    return weather;
  }

};
