const TextResponse = require('@responses/textResponse');
const DadJokesService = require('@services/dadJokes/dadJokesService');

module.exports = class DadJokeResponse extends TextResponse {

  fetch(callback) {
    const dadJokesService = new DadJokesService();
    dadJokesService.random(joke => {
      this.text = joke;
      callback();
    });
  }

};
