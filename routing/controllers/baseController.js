const stringToolkit = require('@tools/stringToolkit');

module.exports = class BaseController {

    constructor(request, responseHandler) {
      this.request = request;
      this.responseHandler = responseHandler;
    }

    simplifyMessage(text) {
      return stringToolkit.removeDiacritics(text).replace(/ +/g, ' ').trim().toLowerCase();
    }

};
