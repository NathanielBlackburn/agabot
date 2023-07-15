const matchers = require('@models/matchers');
const PoscigiResponse = require('@responses/poscigiResponse');

module.exports = class PoscigiResponse {

  respondsTo(message, user) {
    return message.match(matchers.Poscigi) != null;
  }

  async respond(responseHandler) {
    await (new PoscigiResponse(responseHandler)).send();
  }

};