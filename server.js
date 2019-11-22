require('module-alias/register');

// TODO: Extract response handlers from controllers
// TODO: Wrap-around for the http(s) requests

const express = require('express'),
	app = express(),
	port = process.env.PORT || 9001;
	fs = require('fs').promises;

const startServer = async () => {
	const config = JSON.parse(await fs.readFile('config/config.json', {encoding: 'utf8', flag: 'r'}));
	require('@routing/routes')(app, express, config);
	app.listen(port);
  console.log(`Agabot REST server started on port ${port}.`);
};

startServer().catch(error => {
	console.error(`Error loading config file: ${error.message}`);
	console.error(error.stack);
	process.exit(1);
});
