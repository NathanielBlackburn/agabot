const Response = require('@responses/response');
const ImageCard = require('@responses/responseCards/imageCard');

module.exports = class ImageResponse extends Response {

  constructor(responseHandler, url, clickable) {
    super(responseHandler);
    this.url = url;
    this.clickable = clickable;
  }

  fetch(callback) {
    callback();
  }

  send() {
    this.fetch(() => this.responseHandler.json(new ImageCard(this.url, this.clickable)));
  }

};
