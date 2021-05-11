const promisifyHttp = require('@tools/promisifyHttp');
const https = promisifyHttp(require('http'));
const cheerio = require('cheerio');

const horoscopeURLTemplate = 'http://horoskopy.fazi.pl/horoskop-codzienny-chinski-<sign>-mobile.html';
const signs = {
    'szczur': {
        slug: 'szczur',
        name: 'Szczur'
    },
    'bawol': {
        slug: 'bawol',
        name: 'Bawół'
    },
    'tygrys': {
        slug: 'tygrys',
        name: 'Tygrys'
    },
    'krolik': {
        slug: 'krolik',
        name: 'Królik'
    },
    'smok': {
        slug: 'smok',
        name: 'Smok'
    },
    'waz': {
        slug: 'waz',
        name: 'Wąż'
    },
    'kon': {
        slug: 'kon',
        name: 'Koń'
    },
    'koza': {
        slug: 'koza',
        name: 'Koza'
    },
    'malpa': {
        slug: 'malpa',
        name: 'Małpa'
    },
    'kogut': {
        slug: 'kogut',
        name: 'Kogut'
    },
    'pies': {
        slug: 'pies',
        name: 'Pies'
    },
    'swinia': {
        slug: 'swinia',
        name: 'Świnia'
    }
};

module.exports = class ChineseHoroscopeService {

    async get(sign) {
        const horoscopeData = await https.request(horoscopeURLTemplate.replace('<sign>', signs[sign].slug), {}, { binary: true, resultEncoding: 'ISO-8859-2' });
        const $ = cheerio.load(horoscopeData);
        const text = $('#glowny div.tekstb5:nth-child(4) table div.j > div.j > font[color="black"] > font[color="blue"]').text().split('\n')[0].trim();
        return {
            text: text,
            name: signs[sign].name
        };
    }

};