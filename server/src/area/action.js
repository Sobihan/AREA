const twitch = require('./action/twitch');

const action = new Map();

action.set("testgetStream", twitch.testgetStream);
action.set("testAction", twitch.testAction);

module.exports.action = action;