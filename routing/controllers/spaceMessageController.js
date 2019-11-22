const BaseController = require('@controllers/baseController');
const User = require('@models/user');

const TextResponse = require('@responses/textResponse');
const ResourceImageResponse = require('@responses/resourceImageResponse');
const GiphyResponse = require('@responses/giphyResponse');
const DadJokeResponse = require('@responses/dadJokeResponse');
const DerbotJokeResponse = require('@responses/derbotJokeResponse');
const WeatherResponse = require('@responses/weatherResponse');

const giphyQueries = require('@models/giphyQueries');
const matchers = require('@models/matchers');
const staticTexts = require('@models/staticTexts');
const dynamicTexts = require('@models/dynamicTexts');
const resources = require('@models/resources');

module.exports = class SpaceMessageController extends BaseController {

  respond() {
    const messageText = this.simplifyMessage(this.request.body.message.text);
    const sender = User.create(this.request.body.message.sender.email);
    switch (true) {
      case messageText.match(matchers.NewDayNewPossibilities) != null: {
        const response = new GiphyResponse(this.request, this.responseHandler, giphyQueries.NewDayNewPossibilities);
        response.send();
      } break;
      case messageText.match(/(?:co|no) nie\?/i) != null: {
        const response = new TextResponse(this.request, this.responseHandler, dynamicTexts.OfCourse);
        response.send();
      } break;
      case messageText.match(matchers.GoodToBeBot) != null: {
        const response = new TextResponse(this.request, this.responseHandler, staticTexts.GoodToBeBot);
        response.send();
      } break;
      case messageText.includes('co tam'): {
        const response = new TextResponse(this.request, this.responseHandler, staticTexts.Nothing);
        response.send();
      } break;
      case messageText.includes('nie jeblo'): {
        const response = new GiphyResponse(this.request, this.responseHandler, giphyQueries.NieJeblo);
        response.send();
      } break;
      case messageText.includes('jeblo'): {
        const response = new GiphyResponse(this.request, this.responseHandler, giphyQueries.Jeblo);
        response.send();
      } break;
      case messageText.includes('jebnie'): {
        const response = new GiphyResponse(this.request, this.responseHandler, giphyQueries.Jebnie);
        response.send();
      } break;
      case messageText.match(matchers.Weather) != null: {
        const response = new WeatherResponse(this.request, this.responseHandler);
        response.send();
      } break;
      case messageText.match(matchers.Joke) != null: {
        const response = new DadJokeResponse(this.request, this.responseHandler);
        response.send();
      } break;
      case messageText.match(matchers.Derbot) != null: {
        const response = new DerbotJokeResponse(this.request, this.responseHandler);
        response.send();
      } break;
      case messageText.match(matchers.Food) != null: {
        const response = new ResourceImageResponse(this.request, this.responseHandler, resources.Images.Gondola);
        response.send();
      } break;
      default: {
        const response = new TextResponse(this.request, this.responseHandler, dynamicTexts.DontUnderstand);
        response.send();
      }
    }
  }

};
