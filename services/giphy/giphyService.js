const promisifyHttp = require('@tools/promisifyHttp');
const https = promisifyHttp(require('https'));
const queries = require('@services/giphy/giphyQueries');

module.exports = class GiphyService {

  static get Queries() {
    return queries;
  }

  async get(query) {
    const settings = require('@tools/settings');
    const apiKey = settings.apiConfig.giphy.apiKey;
    const data = await https.request(
      `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&rating=r&tag=${query.randomTag}`,
      {
        headers: {
          'Accept': 'application/json'
        }
      }
    );
    let url = JSON.parse(data).data.image_original_url;
    return url;
  }

};
