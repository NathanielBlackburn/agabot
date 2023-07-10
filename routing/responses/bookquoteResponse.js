const TextResponse = require('@responses/textResponse');
const BookquoteRepository = require('@repositories/bookquotes/bookquoteRepository');

module.exports = class BookquoteResponse extends TextResponse {

  async fetch() {
    const bookquoteRepository = new BookquoteRepository();
    this.text = await bookquoteRepository.random();
  }

};
