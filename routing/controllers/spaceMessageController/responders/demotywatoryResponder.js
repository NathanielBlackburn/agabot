const matchers = require('@models/matchers');
const DemotywatoryResponse = require('@responses/demotywatoryResponse');

module.exports = class DemotywatoryResponder {

  respondsTo(message, user) {
    return message.match(matchers.Demotywatory) != null;
  }

  async respond(responseHandler) {
    await (new DemotywatoryResponse(responseHandler)).send();
  }

};