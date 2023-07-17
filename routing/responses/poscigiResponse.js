const TextResponse = require('@responses/textResponse');
const PoscigiService = require('@services/poscigi/poscigiService');

module.exports = class PoscigiResponse extends TextResponse {

  async fetch() {
    const poscigiService = new PoscigiService();
    const news = await poscigiService.lastNews(3);
    this.text = news.map(_ => `${_.title}\n${_.url}`).join("\n\n");
  }

};