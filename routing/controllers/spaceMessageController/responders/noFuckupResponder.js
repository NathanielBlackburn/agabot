const matchers = require('@models/matchers');
const giphyQueries = require('@models/giphyQueries');
const GiphyResponse = require('@responses/giphyResponse');

module.exports = class NoFuckupResponder {

  respondsTo(message, user) {
    return message.match(matchers.NoFuckup) != null;
  }

  respond(responseHandler) {
    (new GiphyResponse(responseHandler, giphyQueries.NieJeblo)).send();
  }
};
