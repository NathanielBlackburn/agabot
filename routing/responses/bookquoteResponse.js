const TextResponse = require('@responses/textResponse');
const BookquoteRepository = require('@repositories/bookquotes/bookquoteRepository');
const Author = require('@repositories/bookquotes/author');

module.exports = class BookquoteResponse extends TextResponse {

  constructor(responseHandler, matches) {
    super(responseHandler, '');
    this.matches = matches;
  }

  async fetch() {
    const author = new Author(this.matches[1]);

    const bookquoteRepository = new BookquoteRepository(author);
    this.text = await bookquoteRepository.random();
  }

};
