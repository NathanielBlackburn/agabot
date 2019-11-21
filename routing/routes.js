const agabotRouter = require('@routing/agabotRouter');
const Settings = require('@tools/settings');

module.exports = (app, express, config) => {
  Settings.setApiConfig(config);
  app.use(express.json());
  app.use((request, responseHandler, next) => {
    Settings.setServerParameters(request);
    next();
  });
  app.use('/resources', express.static(Settings.resourcesPath));
  app.use('/agabot/ansible', agabotRouter);
  app.use((request, response) => response.status(404).end());
};
