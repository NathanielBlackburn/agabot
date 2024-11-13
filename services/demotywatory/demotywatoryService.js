const https = require('@tools/https');
const cheerio = require('cheerio');

module.exports = class DemotywatoryService {

    async random() {
        const random = await https.request('https://demotywatory.pl/losuj');
        const $ = cheerio.load(random);
        return $('div.demot_pic img').attr('src');
    }
};