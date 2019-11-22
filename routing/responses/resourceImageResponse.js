const ImageResponse = require('@responses/imageResponse');

module.exports = class ResourceImageResponse extends ImageResponse {

  constructor(request, responseHandler, resource) {
    super(request, responseHandler, resource.url, true);
  }

};
