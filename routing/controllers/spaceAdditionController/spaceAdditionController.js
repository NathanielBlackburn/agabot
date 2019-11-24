const BaseController = require('@controllers/baseController');
const TextResponse = require('@responses/textResponse');
const staticTexts = require('@models/staticTexts');

module.exports = class SpaceAdditionController extends BaseController {

  respond() {
    const response = new TextResponse(this.request, this.responseHandler, staticTexts.HelloGuys);
    response.send();
  }

};
