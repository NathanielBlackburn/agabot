const promisifyHttp = require('@tools/promisifyHttp');
const http = promisifyHttp(require('http'));
const cheerio = require('cheerio');

module.exports = class DerbotJokesService {

  async random() {
    const jokeData = await http.request('http://piszsuchary.pl/losuj', {});
    const $ = cheerio.load(jokeData);
    return $('div.kot_na_suchara a img').attr('alt').replace(/^\s*$\r?\n/gm, '');
  }

};
