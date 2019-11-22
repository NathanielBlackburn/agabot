const TextResponse = require('@responses/textResponse');
const DerbotJokesService = require('@services/derbotJokes/derbotJokesService');

module.exports = class DerbotJokeResponse extends TextResponse {

  fetch(callback) {
    const derbotJokesService = new DerbotJokesService();
    derbotJokesService.random(joke => {
      this.text = joke;
      callback();
    });
  }

};
