const matchers = require('@models/matchers');
const resources = require('@models/resources');
const ResourceImageResponse = require('@responses/resourceImageResponse');

module.exports = class GimmeFoodResponder {

  respondsTo(message, user) {
    return message.match(matchers.Food) != null;
  }

  async respond(responseHandler) {
    await (new ResourceImageResponse(responseHandler, resources.Images.Gondola)).send();
  }
};
