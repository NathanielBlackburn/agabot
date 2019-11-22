const Response = require('@responses/response');
const TextCard = require('@responses/responseCards/textCard');

module.exports = class TextResponse extends Response {

  constructor(request, responseHandler, text) {
    super(request, responseHandler);
    this.text = text;
  }

  send() {
    this.fetch(() => this.responseHandler.json(new TextCard(this.text)));
  }

  fetch(callback) {
    callback();
  }

};
