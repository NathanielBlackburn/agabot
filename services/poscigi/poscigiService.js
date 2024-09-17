const promisifyHttp = require('@tools/promisifyHttp');
const https = promisifyHttp(require('https'));
const cheerio = require('cheerio');

module.exports = class PoscigiService {

    async lastNews(count = 5) {
        const poscigi = await https.request('https://poscigi.pl', {});
        console.error(poscigi);
        const $ = cheerio.load(poscigi);
        return $('h3.entry-title a').slice(0, count).get().map(elem => ({ title: elem.attribs.title, url: elem.attribs.href }));
    }

    async randomNews(count = 5) {
        const entries = await this.lastNews(10) 
        return entries.sort(() => 0.5 - Math.random()).slice(0, count);
    }
};