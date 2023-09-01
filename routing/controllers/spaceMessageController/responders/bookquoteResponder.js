const matchers = require('@models/matchers');
const BookquoteResponse = require('@responses/bookquoteResponse');

module.exports = class BookquoteResponder {

  respondsTo(message, user) {
    this.matches = message.match(matchers.Bookquote) || [];
    return this.matches.length;
  }

  async respond(responseHandler) {
    await (new BookquoteResponse(responseHandler, this.matches)).send();
  }

};
