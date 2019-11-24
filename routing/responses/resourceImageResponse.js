const ImageResponse = require('@responses/imageResponse');

module.exports = class ResourceImageResponse extends ImageResponse {

  constructor(responseHandler, resource) {
    super(responseHandler, resource.url, true);
  }

};
