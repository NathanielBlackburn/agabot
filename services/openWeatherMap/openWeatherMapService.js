const http = require('http');

const CachedService = require('@services/cachedService');
const Weather = require('@models/weather');

const ZIELONA_GORA_ID = '7532225';

module.exports = class OpenWeatherMapService extends CachedService {

  static get cacheParams() {
    return {
      ttl: 60 * 10,
      checkPeriod: 2,
      key: 'openWeatherData'
    };
  }

  fetch(callback) {
    const settings = require('@tools/settings');
    const apiKey = settings.apiConfig.openWeatherMap.apiKey;
    const weatherRequest = http.request(
      `http://api.openweathermap.org/data/2.5/weather?id=${ZIELONA_GORA_ID}&appid=${apiKey}&units=metric`, {
        headers: {
          'Accept': 'application/json'
        }
      },
      weatherResponse => {
        let data = '';
        weatherResponse.on('data', chunk => data += chunk);
        weatherResponse.on('end', () => {
          callback(new Weather(JSON.parse(data)));
        });
      }
    );
    weatherRequest.end();
  }

};
