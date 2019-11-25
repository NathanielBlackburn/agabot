const Weather = require('@models/weather');

module.exports = class OpenWeatherMapServiceMock {

  fetch(callback) {
    const currentDate = new Date();
    callback(new Weather({
      main: {
        temp: 13
      },
      clouds: {
        all: 20
      },
      sys: {
        sunrise: currentDate.valueOf() - 1000 * 60 * 60 * 6,
        sunset: (currentDate.valueOf() + 1000 * 60 * 60 * 6,
      },
      wind: {
        speed: 1
      },
      weather: []
    }));
  }

};
