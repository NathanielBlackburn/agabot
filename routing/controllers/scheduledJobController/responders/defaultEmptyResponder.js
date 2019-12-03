module.exports = class DefaultEmptyResponder {

  respondsTo() {
    return true;
  }

  respond(responseHandler) {
    responseHandler.status(204).end();
  }
};
