const twitch = require('./action/twitch');
const twitter = require('./action/twitter');

const action = new Map();

action.set("getStream", twitch.getStream);
action.set("testAction", twitch.testAction);
// action.set("tweet_create", twitch.testAction);
// action.set("follow", twitch.testAction);
// action.set("direct_message", twitch.testAction);
// action.set("tweet_delete", twitch.testAction);

module.exports.action = action;



const checkAction = new Map();

checkAction.set("getStream", twitch.checkGetStream);

module.exports.checkAction = checkAction;



const infoAction = new Map();

infoAction.set("twitch", {name: "twitch", actions: twitch.twitchInfo}, {name: "twtich", actions: twitter.twitterInfo});

module.exports.infoAction = infoAction;