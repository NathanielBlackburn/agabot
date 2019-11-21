const settings = {

  serverProtocol: '',
  serverHost: '',
  resourcesPath: 'resources',
  apiConfig: null

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

  static get apiConfig() {
    return settings.apiConfig;
  }

  static setServerParameters(request) {
    settings.serverProtocol = request.protocol;
    settings.serverHost = request.get('host');
  }

  static setApiConfig(config) {
    settings.apiConfig = config;
  }

};
