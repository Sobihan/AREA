const twitch = require('./action/twitch');

const action = new Map();

action.set("getStream", twitch.getStream);
action.set("testAction", twitch.testAction);

module.exports.action = action;



const checkAction = new Map();

checkAction.set("getStream", twitch.checkGetStream);

module.exports.checkAction = checkAction;



const infoAction = new Map();

infoAction.set("twitch", {name: "twitch", actions: twitch.twitchInfo});

module.exports.infoAction = infoAction;