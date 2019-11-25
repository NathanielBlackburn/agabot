const https = require('https');
const queries = require('@services/giphy/giphyQueries');

module.exports = class GiphyService {

  static get Queries() {
    return queries;
  }

  get(query, callback) {
    const settings = require('@tools/settings');
    const apiKey = settings.apiConfig.giphy.apiKey;
    const giphyRequest = https.request(
      `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&rating=r&tag=${query.randomTag}`, {
        headers: {
          'Accept': 'application/json'
        }
      },
      giphyResponse => {
        let data = '';
        giphyResponse.on('data', chunk => data += chunk);
        giphyResponse.on('end', () => {
          let json = JSON.parse(data);
          let url = json.data.image_original_url;
          callback(url);
        });
      }
    );
    giphyRequest.end();
  }

};
