const BaseController = require('@controllers/baseController');
const User = require('@models/user');

const NewDayNewPossibilitiesResponder = require('@controllers/spaceMessageController/responders/newDayNewPossibilitiesResponder');
const HoroscopeResponder = require('@controllers/spaceMessageController/responders/horoscopeResponder');
const ChineseHoroscopeResponder = require('@controllers/spaceMessageController/responders/chineseHoroscopeResponder');
const AintThatRightResponder = require('@controllers/spaceMessageController/responders/aintThatRightResponder');
const GoodToBeBotResponder = require('@controllers/spaceMessageController/responders/goodToBeBotResponder');
const WhatsUpResponder = require('@controllers/spaceMessageController/responders/whatsUpResponder');
const NoFuckupResponder = require('@controllers/spaceMessageController/responders/noFuckupResponder');
const FuckupResponder = require('@controllers/spaceMessageController/responders/fuckupResponder');
const WontFuckUpResponder = require('@controllers/spaceMessageController/responders/wontFuckUpResponder');
const WillFuckUpResponder = require('@controllers/spaceMessageController/responders/willFuckUpResponder');
const WeatherResponder = require('@controllers/spaceMessageController/responders/weatherResponder');
const DadJokeResponder = require('@controllers/spaceMessageController/responders/dadJokeResponder');
const TheJokeResponder = require('@controllers/spaceMessageController/responders/theJokeResponder');
const DerbotJokeResponder = require('@controllers/spaceMessageController/responders/derbotJokeResponder');
const BookquoteResponder = require('@controllers/spaceMessageController/responders/bookquoteResponder');
const DerbotSpoonJokeResponder = require('@controllers/spaceMessageController/responders/derbotSpoonJokeResponder');
const WhoOrdersFoodResponder = require('@controllers/spaceMessageController/responders/whoOrdersFoodResponder');
const PoscigiResponder = require('@controllers/spaceMessageController/responders/poscigiResponder');
const DemotywatoryResponder = require('@controllers/spaceMessageController/responders/demotywatoryResponder');
const DefaultResponder = require('@controllers/spaceMessageController/responders/defaultResponder');

const responders = [
    new NewDayNewPossibilitiesResponder(),
    new HoroscopeResponder(),
    new ChineseHoroscopeResponder(),
    new AintThatRightResponder(),
    new GoodToBeBotResponder(),
    new WhatsUpResponder(),
    new NoFuckupResponder(),
    new FuckupResponder(),
    new WontFuckUpResponder(),
    new WillFuckUpResponder(),
    new WeatherResponder(),
    new DerbotSpoonJokeResponder(),    
    new DadJokeResponder(),
    new TheJokeResponder(),
    new DerbotJokeResponder(),
    new DemotywatoryResponder(),
    new BookquoteResponder(),
    new WhoOrdersFoodResponder(),
    new PoscigiResponder(),
].concat(global.plugins.map(plugin => new plugin.responderClass));

module.exports = class SpaceMessageController extends BaseController {

    respond() {
        const message = this.normaliseMessage(this.request.body.message.text).replace('@Agabot', '');
        const originalMessage = this.request.body.message.text.replace('@Agabot', '');
        const sender = User.create(this.request.body.message.sender.email);
        let responder = responders.find(responder => responder.respondsTo(message, sender, originalMessage));
        if (!responder) {
            responder = new DefaultResponder();
        }
        responder
            .respond(this.responseHandler)
            .catch((err) => {
                console.error(err);
                this.respondWithDefaultError(err);
            });
    }
};
