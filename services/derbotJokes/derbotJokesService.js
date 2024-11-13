const https = require('@tools/https');
const cheerio = require('cheerio');
const arrayToolkit = require('@tools/arrayToolkit');

const derbotServices = [
  {
    url: 'https://piszsuchary.pl/losuj',
    selector: 'div.container > main.content article.image-container > figure > figcaption'
  },
];

module.exports = class DerbotJokesService {

  async random() {
    const derbotService = arrayToolkit.randomElement(derbotServices);
    const jokeData = await https.request(derbotService.url);
    const $ = cheerio.load(jokeData);
    return $(derbotService.selector).first().text()
      .replace(/^[\s\n]+/g, '')
      .replace(/\n+/g, '\n')
      .trim();
  }

};
