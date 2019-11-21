const TextCard = require('@response/responseCards/textCard');
const ImageCard = require('@response/responseCards/imageCard');

const GiphyService = require('@services/giphy/giphyService');
const DadJokesService = require('@services/dadJokes/dadJokesService');
const SucharyService = require('@services/suchary/sucharyService');
const OpenWeatherMapService = require('@services/openWeatherMap/openWeatherMapService');
const Weather = require('@models/weather');

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
    dadJokesService.random(joke => this.sendText(new TextCard(joke)));
  }

  sendPolishJoke() {
    const sucharyService = new SucharyService();
    sucharyService.random(joke => this.sendText(new TextCard(joke)));
  }

  sendWeather() {
    const openWeatherService = new OpenWeatherMapService();
    openWeatherService.get(json => {
      const weather = new Weather(json);
      this.sendText(weather.toString());
    });
  }

};
