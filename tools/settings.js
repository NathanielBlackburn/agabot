const settings = {

  serverProtocol: '',
  serverHost: '',
  resourcesPath: 'resources'

};

module.exports = class {

  static get serverProtocol() {
    return settings.serverProtocol;
  }

  static get serverHost() {
    return settings.serverHost;
  }

  static get resourcesPath() {
    return settings.resourcesPath;
  }

  static setServerParameters(request) {
    settings.serverProtocol = request.protocol;
    settings.serverHost = request.get('host');
  }

};
