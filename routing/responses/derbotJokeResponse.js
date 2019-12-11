const TextResponse = require('@responses/textResponse');
const DerbotJokesService = require('@services/derbotJokes/derbotJokesService');

module.exports = class DerbotJokeResponse extends TextResponse {

  async fetch() {
    const derbotJokesService = new DerbotJokesService();
    this.text = await derbotJokesService.random();
  }

};
