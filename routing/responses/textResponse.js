const Response = require('@responses/response');
const TextCard = require('@responses/responseCards/textCard');

module.exports = class TextResponse extends Response {

  constructor(responseHandler, text) {
    super(responseHandler);
    this.text = text;
  }

  async send() {
    await this.fetch();
    this.responseHandler.json(new TextCard(this.text));
  }

  async fetch() {
    return;
  }

};
