const ImageResponse = require('@responses/imageResponse');
const DemotywatoryService = require('@services/demotywatory/demotywatoryService');

module.exports = class DemotywatoryResponse extends ImageResponse {

  constructor(responseHandler) {
    super(responseHandler, null, true);
  }

  async fetch() {
    const demotywatoryService = new DemotywatoryService();
    this.url = await demotywatoryService.random();
  }

};