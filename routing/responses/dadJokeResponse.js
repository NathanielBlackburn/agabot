const TextResponse = require('@responses/textResponse');
const DadJokesService = require('@services/dadJokes/dadJokesService');

module.exports = class DadJokeResponse extends TextResponse {

  async fetch() {
    const dadJokesService = new DadJokesService();
    this.text = await dadJokesService.random();
  }

};
