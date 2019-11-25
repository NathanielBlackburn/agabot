const matchers = require('@models/matchers');
const giphyQueries = require('@services/giphy/giphyQueries');
const GiphyResponse = require('@responses/giphyResponse');

module.exports = class NewDayNewPossibilitiesResponder {

  respondsTo(message, user) {
    return message.match(matchers.NewDayNewPossibilities) != null;
  }

  respond(responseHandler) {
    (new GiphyResponse(responseHandler, giphyQueries.NewDayNewPossibilities)).send();
  }
};
