const promisifyHttp = require('@tools/promisifyHttp');
const https = promisifyHttp(require('https'));
const cheerio = require('cheerio');
const stringToolkit = require('@tools/stringToolkit');

const horoscopeBaseURLString = 'https://www.wrozbyonline.pl/horoskop/';
const signs = {
    'koziorozec': {
        urlSuffix: '1/koziorozec',
        name: 'Koziorożec'
    },
    'wodnik': {
        urlSuffix: '2/wodnik',
        name: 'Wodnik'
    },
    'ryby': {
        urlSuffix: '3/ryby',
        name: 'Ryby'
    },
    'baran': {
        urlSuffix: '4/baran',
        name: 'Baran'
    },
    'byk': {
        urlSuffix: '5/byk',
        name: 'Byk'
    },
    'bliznieta': {
        urlSuffix: '6/bliznieta',
        name: 'Bliźnięta'
    },
    'rak': {
        urlSuffix: '7/rak',
        name: 'Rak'
    },
    'lew': {
        urlSuffix: '8/lew',
        name: 'Lew'
    },
    'panna': {
        urlSuffix: '9/panna',
        name: 'Panna'
    },
    'waga': {
        urlSuffix: '10/waga',
        name: 'Waga'
    },
    'skorpion': {
        urlSuffix: '11/skorpion',
        name: 'Skorpion'
    },
    'strzelec': {
        urlSuffix: '12/strzelec',
        name: 'Strzelec'
    }
};

module.exports = class DerbotJokesService {

  async get(sign) {
    const horoscopeData = await https.request(`${horoscopeBaseURLString}${signs[sign].urlSuffix}`, {});
    const $ = cheerio.load(horoscopeData);
    let list = $('#sliders .horoskop_slider').eq(0).find('.horoskop_element').filter((index, element) => {
        return stringToolkit.removeDiacritics($(element).find('h3').text().toLowerCase().trim()) == sign;
    });
    return {
        text: $(list[0]).find('p').text().trim(),
        name: signs[sign].name
    };
  }

};
