const StringToolkit = require('@tools/stringToolkit');

module.exports = class BaseController {

    constructor(request, responseHandler) {
      this.request = request;
      this.responseHandler = responseHandler;
    }

    simplifyMessage(text) {
      return StringToolkit.removeDiacritics(text).replace(/ +/g, ' ').trim().toLowerCase();
    }

};
