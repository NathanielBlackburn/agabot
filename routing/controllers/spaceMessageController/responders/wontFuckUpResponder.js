const matchers = require('@models/matchers');
const giphyQueries = require('@models/giphyQueries');
const GiphyResponse = require('@responses/giphyResponse');

module.exports = class WillNotFuckUpResponder {

  respondsTo(message, user) {
    return message.match(matchers.WillNotFuckUp) != null;
  }

  respond(responseHandler) {
    (new GiphyResponse(responseHandler, giphyQueries.NieJebnie)).send();
  }
};
