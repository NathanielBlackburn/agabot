const TextResponse = require('@responses/textResponse');
const HoroscopeService = require('@services/horoscope/horoscopeService');
const dynamicTexts = require('@models/dynamicTexts');

module.exports = class HoroscopeResponse extends TextResponse {

  constructor(responseHandler, sign) {
    super(responseHandler, '');
    this.sign = sign;
  }
    

  async fetch() {
    const horoscopeService = new HoroscopeService();
    const horoscope = await horoscopeService.get(this.sign);
    this.text = `*${dynamicTexts.HoroscopeForToday(horoscope.name)}*\n${horoscope.text}`;
  }

};
