module.exports = class BookquotesRepository {

  async random() {
    const quotes = require('@data/bookquotes/paulo.json');
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    console.log(quote);
    return `${quote.quote}\n\n- *${quote.author}*, _${quote.book}_`
  }

};
