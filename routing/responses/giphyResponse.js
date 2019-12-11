const ImageResponse = require('@responses/imageResponse');
const GiphyService = require('@services/giphy/giphyService');

module.exports = class GiphyResponse extends ImageResponse {

  constructor(responseHandler, query) {
    super(responseHandler, null, false);
    this.query = query;
  }

  async fetch() {
    const giphyService = new GiphyService();
    this.url = await giphyService.get(this.query);
  }

};
