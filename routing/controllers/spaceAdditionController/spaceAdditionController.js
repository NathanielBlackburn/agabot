const BaseController = require('@controllers/baseController');
const TextResponse = require('@responses/textResponse');
const staticTexts = require('@models/staticTexts');

module.exports = class SpaceAdditionController extends BaseController {

  respond() {
    (new TextResponse(this.responseHandler, staticTexts.HelloGuys))
      .send()
      .catch(error => console.error(error));
  }

};
