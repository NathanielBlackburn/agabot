const http = require('http');
const cheerio = require('cheerio');

module.exports = class SucharyService {

  random(callback) {
    const jokeRequest = http.request(
      'http://piszsuchary.pl/losuj',
      {},
      jokeResponse => {
        let data = '';
        jokeResponse.on('data', chunk => data += chunk);
        jokeResponse.on('end', () => {
          console.log('----SUCHAR------');
          console.log(data);
          console.log('---SUCHAR END---');
          const $ = cheerio.load(data);
          const joke = $('div.kot_na_suchara a img').attr('alt').replace(/^\s*$\r?\n/gm, '');
          console.log(joke);
          callback(joke);
        });
      }
    );
    jokeRequest.end();
  }

};
