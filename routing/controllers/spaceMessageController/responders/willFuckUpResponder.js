const matchers = require('@models/matchers');
const giphyQueries = require('@services/giphy/giphyQueries');
const GiphyResponse = require('@responses/giphyResponse');

module.exports = class WillFuckUpResponder {

  respondsTo(message, user) {
    return message.match(matchers.WillFuckUp) != null;
  }

  async respond(responseHandler) {
    await (new GiphyResponse(responseHandler, giphyQueries.Jebnie)).send();
  }
};
