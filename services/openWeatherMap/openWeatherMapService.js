const http = require('http');

const CachedService = require('@services/cachedService');
const Weather = require('@models/weather');

module.exports = class OpenWeatherMapService extends CachedService {

  constructor(city) {
    super();
    this.city = city;
  }

  static get cacheParams() {
    return {
      ttl: 60 * 10,
      checkPeriod: 2,
      key: 'openWeatherData'
    };
  }

  get(callback) {
    const data = this.constructor.cache.get(this.constructor.cacheParams.key);
    if (data && data[this.city.id]) {
      callback(data[this.city.id]);
    } else {
      this.fetch((data) => {
        const result = {};
        result[this.city.id] = data;
        this.set(result);
        callback(data);
      });
    }
  }

  fetch(callback) {
    const settings = require('@tools/settings');
    const apiKey = settings.apiConfig.openWeatherMap.apiKey;
    const weatherRequest = http.request(
      `http://api.openweathermap.org/data/2.5/weather?id=${this.city.id}&appid=${apiKey}&units=metric`, {
        headers: {
          'Accept': 'application/json'
        }
      },
      weatherResponse => {
        let data = '';
        weatherResponse.on('data', chunk => data += chunk);
        weatherResponse.on('end', () => {
          callback(new Weather(JSON.parse(data), this.city));
        });
      }
    );
    weatherRequest.end();
  }

};
