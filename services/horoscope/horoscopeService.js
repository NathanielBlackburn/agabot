const https = require('@tools/https');
const cheerio = require('cheerio');
const stringToolkit = require('@tools/stringToolkit');

const horoscopeBaseURLString = 'https://www.wrozbyonline.pl/horoskop/horoskop-dzienny/';
const signs = {
    'koziorozec': {
        urlSuffix: 'koziorozec',
        name: 'Koziorożec'
    },
    'wodnik': {
        urlSuffix: 'wodnik',
        name: 'Wodnik'
    },
    'ryby': {
        urlSuffix: 'ryby',
        name: 'Ryby'
    },
    'baran': {
        urlSuffix: 'baran',
        name: 'Baran'
    },
    'byk': {
        urlSuffix: 'byk',
        name: 'Byk'
    },
    'bliznieta': {
        urlSuffix: 'bliznieta',
        name: 'Bliźnięta'
    },
    'rak': {
        urlSuffix: 'rak',
        name: 'Rak'
    },
    'lew': {
        urlSuffix: 'lew',
        name: 'Lew'
    },
    'panna': {
        urlSuffix: 'panna',
        name: 'Panna'
    },
    'waga': {
        urlSuffix: 'waga',
        name: 'Waga'
    },
    'skorpion': {
        urlSuffix: 'skorpion',
        name: 'Skorpion'
    },
    'strzelec': {
        urlSuffix: 'strzelec',
        name: 'Strzelec'
    }
};

module.exports = class HoroscopeService {

    async get(sign) {
        const horoscopeData = await https.request(`${horoscopeBaseURLString}${signs[sign].urlSuffix}`);
        const $ = cheerio.load(horoscopeData);
        let text = $('#horoskop_opis_in div p').first().text().trim();
        let madeBy = $('#horoskop_opis_in div p.horoskopwrozka').first().text().trim();
        return {
            text: `${text}\n\n${madeBy}`,
            name: signs[sign].name
        };
    }

};