const ImageResponse = require('@responses/imageResponse');
const GiphyService = require('@services/giphy/giphyService');

module.exports = class GiphyResponse extends ImageResponse {

  constructor(responseHandler, query) {
    super(responseHandler, null, false);
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
