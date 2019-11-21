const BaseController = require('@controllers/baseController');
const User = require('@models/user');
const GiphyQueries = require('@models/giphyQueries');
const Matchers = require('@models/matchers');
const Response = require('@response/response');
const StaticTexts = require('@models/staticTexts');
const DynamicTexts = require('@models/dynamicTexts');

const resources = require('@models/resources');

module.exports = class SpaceMessageController extends BaseController {

  respond() {
    const messageText = this.simplifyMessage(this.request.body.message.text);
    const sender = User.create(this.request.body.message.sender.email);
    const response = new Response(this.request, this.responseHandler);
    switch (true) {
      case messageText.match(Matchers.NewDayNewPossibilities) != null:
        response.sendGiphy(GiphyQueries.NewDayNewPossibilities);
        break;
      case messageText.match(/(?:co|no) nie\?/i) != null:
        response.sendText(DynamicTexts.OfCourse);
        break;
      case messageText.match(Matchers.GoodToBeBot) != null:
        response.sendText(StaticTexts.GoodToBeBot);
        break;
      case messageText.includes('co tam'):
        response.sendText(StaticTexts.Nothing);
        break;
      case messageText.includes('pogoda'):
        response.sendText(StaticTexts.Shitty);
        break;
      case messageText.includes('nie jeblo'):
        response.sendGiphy(GiphyQueries.NieJeblo);
        break;
      case messageText.includes('jeblo'):
        response.sendGiphy(GiphyQueries.Jeblo);
        break;
      case messageText.includes('jebnie'):
        response.sendGiphy(GiphyQueries.Jebnie);
        break;
      case messageText.match(Matchers.Joke) != null:
        response.sendEnglishJoke();
        break;
      case messageText.match(Matchers.Derbot) != null:
        response.sendPolishJoke();
        break;
      case messageText.match(Matchers.Food) != null:
        response.sendImage(resources.Images.Gondola);
        break;
      default:
        response.sendText(DynamicTexts.DontUnderstand);
    }
  }

};
