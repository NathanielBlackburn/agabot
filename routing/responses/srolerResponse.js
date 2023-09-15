const TextResponse = require('@responses/textResponse');
const srolateText = require('@tools/sroler/sroler').srolateText;

module.exports = class SrolerResponse extends TextResponse {

  constructor(responseHandler, matches) {
    super(responseHandler, '');
    this.matches = matches;
  }


  async fetch() {
    this.text = srolateText(this.matches[1]);
  }

};
