const TextResponse = require('@responses/textResponse');
const staticTexts = require('@models/staticTexts');

module.exports = class DerbotSpoonJokeResponse extends TextResponse {

  async fetch() {
    this.text = staticTexts.Spoon;
  }

};
