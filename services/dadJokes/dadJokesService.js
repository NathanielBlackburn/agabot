const https = require('@tools/https');

module.exports = class DadJokesService {

  async random() {
    const jokeData = await https.request('https://icanhazdadjoke.com/', { headers: { 'Accept': 'application/json' } });
    return JSON.parse(jokeData).joke;
  }
};
