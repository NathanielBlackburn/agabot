const https = require('https');

module.exports = class DadJokesService {

  random(callback) {
    const jokeRequest = https.request(
      'https://icanhazdadjoke.com/', {
        headers: {
          'Accept': 'application/json'
        }
      },
      jokeResponse => {
        let data = '';
        jokeResponse.on('data', chunk => data += chunk);
        jokeResponse.on('end', () => {
          const json = JSON.parse(data);
          const joke = json.joke;
          callback(joke);
        });
      }
    );
    jokeRequest.end();
  }

};
