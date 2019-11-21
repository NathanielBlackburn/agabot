const BaseController = require('@controllers/baseController');
const TextCard = require('@response/responseCards/textCard');

module.exports = class SpaceAdditionController extends BaseController {

  respond() {
    this.httpResponse.json(new TextCard('Cześć ludzie.'));
  }

};
