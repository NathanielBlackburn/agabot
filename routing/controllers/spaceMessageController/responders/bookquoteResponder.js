const matchers = require('@models/matchers');
const BookquoteResponse = require('@responses/bookquoteResponse');

module.exports = class BookquoteResponder {

  respondsTo(message, user) {
    return message.match(matchers.Bookquote) != null;
  }

  async respond(responseHandler) {
    await (new BookquoteResponse(responseHandler)).send();
  }

};
