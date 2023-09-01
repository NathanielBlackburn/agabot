const Author = require('@repositories/bookquotes/author');

module.exports = class BookquotesRepository {

  constructor(author) {
    this.author = author;
  }

  async random() {
    let quotes;
    switch (true) {
      case this.author.is(Author.PTerry):
        quotes = require('@data/bookquotes/pterry.json');
        break;
      default:
        quotes = require('@data/bookquotes/paulo.json');
    }
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    return `${quote.quote}\n\n- *${quote.author}*, _${quote.book}_`
  }

};
