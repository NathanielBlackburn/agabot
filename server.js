require('module-alias/register');

const express = require('express'),
	app = express(),
	port = process.env.PORT || 9001;
	fs = require('fs').promises;

const startServer = async () => {
	// const config = JSON.parse(await fs.readFile('config/config.json', {encoding: 'utf8', flag: 'r'}));
	require('@routing/routes')(app, express);
	app.listen(port);
  console.log(`Agabot-Ansible HTTP server started on port ${port}.`);
};

startServer().catch(error => {
	console.error(`Error loading config file: ${error.message}`);
	console.error(error.stack);
	process.exit(1);
});
