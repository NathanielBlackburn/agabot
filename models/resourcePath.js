const Resource = require('@models/resource');

const url = require('url');

const imageMap = (() => {
  const imageMap = {};
  imageMap[Resource.Image.Gondola] = 'gondola2.png';
  return imageMap;
})();

module.exports = {

  image: (tag) => {
    const Settings = require('@tools/settings');
    return url.format({
      protocol: Settings.serverProtocol,
      host: Settings.serverHost,
      pathname: `${Settings.resourcesPath}/${imageMap[tag]}`
    });
  }

};
