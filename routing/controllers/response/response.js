const TextCard = require('@response/responseCards/textCard');
const ImageCard = require('@response/responseCards/imageCard');

const GiphyService = require('@services/giphy/giphyService');
const DadJokesService = require('@services/dadJokes/dadJokesService');
const SucharyService = require('@services/suchary/sucharyService');

module.exports = class Response {

  constructor(request, responseHandler) {
    this.request = request;
    this.responseHandler = responseHandler;
  }

  sendText(text) {
    this.responseHandler.json(new TextCard(text));
  }

  sendImage(resource) {
    this.responseHandler.json(new ImageCard([resource.url], true));
  }

  sendGiphy(query) {
    const giphyService = new GiphyService();
    giphyService.get(query, url => this.responseHandler.json(new ImageCard([url])));
  }

  sendEnglishJoke() {
    const dadJokesService = new DadJokesService();
    dadJokesService.random(joke => this.responseHandler.json(new TextCard(joke)));
  }

  sendPolishJoke() {
    const sucharyService = new SucharyService();
    sucharyService.random(joke => this.responseHandler.json(new TextCard(joke)));
  }

};
