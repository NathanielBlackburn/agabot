const https = require('https');

module.exports = class GiphyService {

  get(query, callback) {
    const Settings = require('@tools/settings');
    const apiKey = Settings.apiConfig.giphy.apiKey;
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
