const stringToolkit = require('@tools/stringToolkit');
const staticTexts = require('@models/staticTexts');
const TextCard = require('@responses/responseCards/textCard');

module.exports = class BaseController {

    constructor(request, responseHandler) {
      this.request = request;
      this.responseHandler = responseHandler;
    }

    respondWithDefaultError(responseError) {
      console.log(this);
      console.log(responseError);
      this.responseHandler.json(new TextCard(staticTexts.Whoops));
    }

    normaliseMessage(text) {
      return stringToolkit.removeDiacritics(text.trim().toLowerCase()).replace(/ +/g, ' ');
    }

};
