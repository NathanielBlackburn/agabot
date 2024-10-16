// TODO: Unify naming in giphyQueries and othe statics
// TODO: Add dotenv for Google Service Account credentials

require('./tools/moduleAliasConfigurator')(__dirname);

require('@tools/jobScheduler/jobScheduler')();

const express = require('express'),
	app = express(),
	port = process.env.PORT || 9001,
	fs = require('fs').promises;
global.plugins = [];

(async () => {
	const config = JSON.parse(await fs.readFile('config/config.json', {encoding: 'utf8', flag: 'r'}));
	if (config.plugins) {
		config.plugins.forEach(plugin => {
			require(plugin.package);
		});
	}
    process.env.GOOGLE_APPLICATION_CREDENTIALS = './config/agabot-rand-research-service-account-creds.json';
	require('@routing/routes')(app, express, config);
	app.listen(port);
    console.log(`Agabot REST server started on port ${port}, ${(new Date()).toString()}.`);
})().catch(error => {
	console.error(`Error loading config file: ${error.message}`);
	console.error(error.stack);
	process.exit(1);
});
