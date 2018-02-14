const blockedFromEnv = (process.env.BLOCKED_RESOURCES || '').split(';').filter(e => e !== '');

const blockedResources = [
	"widget.intercom.io",
  "js.hsforms.net",
  "forms.hubspot.com",
  "platform.twitter.com",
  "ga.clearbit.com",
  "connect.facebook.net",
  "js.hs-analytics.net",
  "api.survicate.com",
  "snap.licdn.com",
  "v2.zopim.com",
  "assets.zendesk.com",
	...blockedFromEnv
];

module.exports = {
	tabCreated: (req, res, next) => {
		req.prerender.tab.Network.setBlockedURLs({
			urls: blockedResources
		}).then(() => {
			next();
		}).catch(() => {
			res.send(504);
		});
	}
};
