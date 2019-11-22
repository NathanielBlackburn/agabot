const ImageResponse = require('@responses/imageResponse');
const GiphyService = require('@services/giphy/giphyService');

module.exports = class GiphyResponse extends ImageResponse {

  constructor(request, responseHandler, query) {
    super(request, responseHandler, null, false);
    this.query = query;
  }

  fetch(callback) {
    const giphyService = new GiphyService();
    giphyService.get(this.query, url => {
      this.url = url;
      callback();
    });
  }

};
