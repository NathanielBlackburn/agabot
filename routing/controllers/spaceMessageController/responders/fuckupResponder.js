const matchers = require('@models/matchers');
const giphyQueries = require('@services/giphy/giphyQueries');
const GiphyResponse = require('@responses/giphyResponse');

module.exports = class FuckupResponder {

  respondsTo(message, user) {
    return message.match(matchers.Fuckup) != null;
  }

  async respond(responseHandler) {
    await (new GiphyResponse(responseHandler, giphyQueries.Jeblo)).send();
  }
};
