const TextCard = require('@response/responseCards/textCard');
const ImageCard = require('@response/responseCards/imageCard');

const ResourcePath = require('@models/resourcePath');

const GiphyService = require('@services/giphy/giphyService');
const DadJokesService = require('@services/dadJokes/dadJokesService');
const SucharyService = require('@services/suchary/sucharyService');

module.exports = class Response {

  constructor(request, responseHandler) {
    this.request = request;
    this.responseHandler = responseHandler;
  }

  text(text) {
    this.responseHandler.json(new TextCard(text));
  }

  image(tag) {
    this.responseHandler.json(new ImageCard([ResourcePath.image(tag)], true));
  }

  giphy(query) {
    const giphyService = new GiphyService();
    giphyService.get(query, url => this.responseHandler.json(new ImageCard([url])));
  }

  englishJoke() {
    const dadJokesService = new DadJokesService();
    dadJokesService.random(joke => this.responseHandler.json(new TextCard(joke)));
  }

  polishJoke() {
    const sucharyService = new SucharyService();
    sucharyService.random(joke => this.responseHandler.json(new TextCard(joke)));
  }

};
