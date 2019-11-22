const agabotRouter = require('@routing/agabotRouter');
const settings = require('@tools/settings');

module.exports = (app, express, config) => {
  settings.setApiConfig(config);
  app.use(express.json());
  app.use((request, responseHandler, next) => {
    settings.setServerParameters(request);
    next();
  });
  app.use('/resources', express.static(settings.resourcesPath));
  app.use('/agabot/ansible', agabotRouter);
  app.use((request, response) => response.status(404).end());
};
