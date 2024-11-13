const https = require('@tools/https');

module.exports = class PoemsService {

  async random() {
    const poemData = await https.request('https://poetrydb.org/random,linecount/1;12/lines,author,title.json');
    return JSON.parse(poemData).pop();
  }

};
