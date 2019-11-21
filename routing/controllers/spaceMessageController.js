const BaseController = require('@controllers/baseController');
const User = require('@models/user');
const GiphyQueries = require('@models/giphyQueries');
const Resource = require('@models/resource');
const Matchers = require('@models/matchers');
const Response = require('@response/response');
const StaticTexts = require('@models/staticTexts');
const DynamicTexts = require('@models/dynamicTexts');

module.exports = class SpaceMessageController extends BaseController {

  respond() {
    const messageText = this.simplifyMessage(this.request.body.message.text);
    const sender = User.create(this.request.body.message.sender.email);
    const response = new Response(this.request, this.responseHandler);
    switch (true) {
      case messageText.match(Matchers.NewDayNewPossibilities) != null && sender == User.Bolo:
        response.text(DynamicTexts.OffendBolo);
        break;
      case messageText.match(Matchers.NewDayNewPossibilities) != null:
        response.giphy(GiphyQueries.NewDayNewPossibilities);
        break;
      case messageText.match(/(?:co|no) nie\?/i) != null && sender == User.Bolo:
        response.text(DynamicTexts.OffendBolo);
        break;
      case messageText.match(/(?:co|no) nie\?/i) != null:
        response.text(DynamicTexts.OfCourse);
        break;
      case messageText.match(Matchers.GoodToBeBot) != null:
        response.text(StaticTexts.GoodToBeBot);
        break;
      case messageText.includes('co tam'):
        response.text(StaticTexts.Nothing);
        break;
      case messageText.includes('pogoda'):
        response.text(StaticTexts.Shitty);
        break;
      case messageText.includes('nie jeblo'):
        response.giphy(GiphyQueries.NieJeblo);
        break;
      case messageText.includes('jeblo'):
        response.giphy(GiphyQueries.Jeblo);
        break;
      case messageText.includes('jebnie'):
        response.giphy(GiphyQueries.Jebnie);
        break;
      case messageText.match(Matchers.Joke) != null:
        response.englishJoke();
        break;
      case messageText.match(Matchers.Derbot) != null:
        response.polishJoke();
        break;
      case messageText.match(Matchers.Food) != null:
        response.image(Resource.Image.Gondola);
        break;
      default:
        response.text(DynamicTexts.DontUnderstand);
    }
  }

};
