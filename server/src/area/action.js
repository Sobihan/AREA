const twitch = require('./action/twitch');
const poem = require('./action/poem');

const action = new Map();

action.set("getStream", twitch.getStream);
action.set("testAction", twitch.testAction);
action.set("getRandomPoem", poem.getRandomPoem);

module.exports.action = action;



const checkAction = new Map();

checkAction.set("getStream", twitch.checkGetStream);
checkAction.set("testAction", twitch.checktestAction);
checkAction.set("getRandomPoem", poem.checkGetRandomPoem);

module.exports.checkAction = checkAction;



const infoAction = new Map();

infoAction.set("twitch", {name: "twitch", actions: twitch.twitchInfo});
infoAction.set("poem", {name: "poem", reactions: poem.poemInfo});

module.exports.infoAction = infoAction;