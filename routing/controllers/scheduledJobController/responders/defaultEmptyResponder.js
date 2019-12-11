module.exports = class DefaultEmptyResponder {

  respondsTo() {
    return true;
  }

  async respond(responseHandler) {
    responseHandler.status(204).end();
  }
};
