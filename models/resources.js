const url = require('url');

class Resource {

  constructor(path) {
    this.path = path;
  }

  get url() {
    const settings = require('@tools/settings');
    return url.format({
      protocol: settings.serverProtocol,
      host: settings.serverHost,
      pathname: `${settings.resourcesPath}/${this.path}`
    });
  }
}

module.exports = {

  Images: {
    Gondola: new Resource('images/gondola2.png')
  }

};
