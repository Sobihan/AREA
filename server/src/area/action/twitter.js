const twitterWebhooks = require('twitter-webhooks');

exports.init = async (app) => {
	const userActivityWebhook = twitterWebhooks.userActivity({
        serverUrl: '127.0.0.1',
        route: '/twitter',
        consumerKey: 'placeholder',
        consumerSecret: 'placeholder',
		accessToken: 'placeholder',
		accessTokenSecret: 'holder',
		environment: 'yeayea',
		app
	});

    const hooks = await userActivityWebhook.getWebhook();
	if (hooks.length == 0)
		userActivityWebhook.register()
	userActivityWebhook.on('event', (event, userId, data) => {
		if (event == 'tweet_create') {
			const res = {user: userId, message: data.text}
            // TODO call reaction
		}
	});
}

exports.subcribe_user = async (userId, accessToken, accessTokenSecret) => {
	const userActivityWebhook = twitterWebhooks.userActivity({
        serverUrl: '127.0.0.1',
        route: '/twitter',
        consumerKey: 'placeholder',
        consumerSecret: 'placeholder',
    }).catch(err => {
		console.error(err)
	});

    userActivityWebhook.subscribe({
        userId: userId,
        accessToken: accessToken,
        accessTokenSecret: accessTokenSecret
    });
}

exports.unsubscribe_user = async(userId, userToken, secretToken) => {
	const userActivityWebhook = twitterWebhooks.userActivity({
        serverUrl: '127.0.0.1',
        route: '/twitter',
        consumerKey: 'placeholder',
        consumerSecret: 'placeholder',
	});

	userActivityWebhook.unsubscribe({
		userId: userId,
		accessToken: userToken,
		accessTokenSecret: secretToken
	}).catch(err => {
		console.error(err)
	});
}

const twitchInfo = new Map();

twitchInfo.set("tweet_create", {
    name: "tweet_create",
    description: "I am a description",
    args: [
        {userId: "The user id"}
    ]
});

module.exports.twitchInfo = twitchInfo;