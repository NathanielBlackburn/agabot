const https = require('@tools/https');
const CachedService = require('@services/cachedService');
const Weather = require('@services/openWeatherMap/weather');

module.exports = class OpenWeatherMapService extends CachedService {

  get name() {
    return 'OpenWeatherMapService';
  }

  constructor(city) {
    super();
    this.city = city;
  }

  get cacheParams() {
    return {
      ttl: 60 * 10,
      checkPeriod: 2
    };
  }

  get cacheKey() {
    return `openWeatherData_${this.city.id}`;
  }

  async fetch() {
    const settings = require('@tools/settings');
    const apiKey = settings.apiConfig.openWeatherMap.apiKey;
    return new Weather(JSON.parse(await https.request(
      `http://api.openweathermap.org/data/2.5/weather?id=${this.city.id}&appid=${apiKey}&units=metric`
    )), this.city);
  }

};
