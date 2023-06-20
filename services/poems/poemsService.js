const promisifyHttp = require('@tools/promisifyHttp');
const https = promisifyHttp(require('https'));

module.exports = class PoemsService {

  async random() {
    const poemData = await https.request(
      'https://poetrydb.org/random,linecount/1;12/lines,author,title.json',
      {
        headers: {
          'Accept': 'application/json'
        }
      }
    );
    return JSON.parse(poemData).pop();
  }

};
