const prerender = require('prerender');

const forwardHeaders = require('./plugins/forwardHeaders');
const stripHtml = require('./plugins/stripHtml');
const healthcheck = require('./plugins/healthcheck');
const removePrefetchTags = require('./plugins/removePrefetchTags');
const additionalBlockedResources = require('./plugins/additionalBlockedResources');
const log = require('./plugins/log');

const options = {
	pageDoneCheckInterval : 500,
	pageLoadTimeout: 20000,
	waitAfterLastRequest: 250,
	chromeFlags: [ '--no-sandbox', '--headless', '--disable-gpu', '--remote-debugging-port=9222', '--hide-scrollbars' ],
};
console.log('Starting with options:', options);

const server = prerender(options);

server.use(log);
server.use(healthcheck('healthz'));
// server.use(forwardHeaders);
server.use(prerender.removeScriptTags());
server.use(removePrefetchTags);

server.use(prerender.blockResources());
server.use(additionalBlockedResources);

server.use(prerender.httpHeaders());
if (process.env.DEBUG_PAGES) {
	server.use(prerender.logger());
}
server.use(stripHtml);

server.start();
