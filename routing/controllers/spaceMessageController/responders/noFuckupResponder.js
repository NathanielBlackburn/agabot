const matchers = require('@models/matchers');
const giphyQueries = require('@services/giphy/giphyQueries');
const GiphyResponse = require('@responses/giphyResponse');

module.exports = class NoFuckupResponder {

  respondsTo(message, user) {
    return message.match(matchers.NoFuckup) != null;
  }

  async respond(responseHandler) {
    await (new GiphyResponse(responseHandler, giphyQueries.NieJeblo)).send();
  }
};
