const TextResponse = require('@responses/textResponse');
const ChineseHoroscopeService = require('@services/horoscope/chineseHoroscopeService');
const dynamicTexts = require('@models/dynamicTexts');

module.exports = class ChineseHoroscopeResponse extends TextResponse {

    constructor(responseHandler, sign) {
        super(responseHandler, '');
        this.sign = sign;
    }


    async fetch() {
        const horoscopeService = new ChineseHoroscopeService();
        const horoscope = await horoscopeService.get(this.sign);
        this.text = `*${dynamicTexts.HoroscopeForToday(horoscope.name)}*\n${horoscope.text}`;
    }

};