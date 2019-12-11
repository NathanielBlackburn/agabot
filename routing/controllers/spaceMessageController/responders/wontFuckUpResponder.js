const matchers = require('@models/matchers');
const giphyQueries = require('@services/giphy/giphyQueries');
const GiphyResponse = require('@responses/giphyResponse');

module.exports = class WillNotFuckUpResponder {

  respondsTo(message, user) {
    return message.match(matchers.WillNotFuckUp) != null;
  }

  async respond(responseHandler) {
    await (new GiphyResponse(responseHandler, giphyQueries.NieJebnie)).send();
  }
};
