const url = require('url');

class Resource {

  constructor(path) {
    this.path = path;
  }

  get url() {
    const Settings = require('@tools/settings');
    return url.format({
      protocol: Settings.serverProtocol,
      host: Settings.serverHost,
      pathname: `${Settings.resourcesPath}/${this.path}`
    });
  }
}

module.exports = {

  Images: {
    Gondola: new Resource('images/gondola2.png')
  }

};
