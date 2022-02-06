const twitterWebhooks = require('twitter-webhooks');

var userActivityWebhook;

function initTwitter(app) {
    twitterWebhooks.userActivity({
        serverUrl: '127.0.0.1',
        route: '/',
        consumerKey: 'placeholder',
        consumerSecret: 'placeholder',
        accessToken: 'placeholder',
        accessTokenSecret: 'placeholder',
        app
    });

    userActivityWebhook.register();

    // temp exemple for a random user events
    userActivityWebhook.subscribe({
        userId: '[TWITTER USER ID]',
        accessToken: '[TWITTER USER ACCESS TOKEN]',
        accessTokenSecret: '[TWITTER USER ACCESS TOKEN SECRET]'
    })
        .then(function (userActivity) {
            userActivity
                .on('favorite', (data) => console.log(userActivity.id + ' - favorite'))
                .on('tweet_create', (data) => console.log(userActivity.id + ' - tweet_create'))
                .on('follow', (data) => console.log(userActivity.id + ' - follow'))
                .on('direct_message', (data) => console.log(userActivity.id + ' - direct_message'))
                .on('tweet_delete', (data) => console.log(userActivity.id + ' - tweet_delete'))
        });

    //listen to any user activity
    userActivityWebhook.on('event', (event, userId, data) => console.log(userId + ' - favorite'));

    //listen to unknown payload (in case of api new features)
    userActivityWebhook.on('unknown-event', (rawData) => console.log(rawData));
}