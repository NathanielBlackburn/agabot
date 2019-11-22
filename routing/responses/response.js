module.exports = class Response {

  constructor(request, responseHandler) {
    this.request = request;
    this.responseHandler = responseHandler;
  }

};
