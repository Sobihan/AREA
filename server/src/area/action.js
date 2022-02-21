const twitch = require('./action/twitch');
const poem = require('./action/poem');
const nasa = require('./action/nasa');

const action = new Map();

action.set("getStream", twitch.getStream);
action.set("testAction", twitch.testAction);
action.set("getRandomPoem", poem.getRandomPoem);
action.set("getAPOD", nasa.getAPOD);

module.exports.action = action;



const checkAction = new Map();

checkAction.set("getStream", twitch.checkGetStream);
checkAction.set("testAction", twitch.checktestAction);
checkAction.set("getRandomPoem", poem.checkGetRandomPoem);
checkAction.set("getAPOD", nasa.checkGetAPOD);

module.exports.checkAction = checkAction;



const infoAction = new Map();

infoAction.set("twitch", {name: "twitch", actions: twitch.twitchInfo});
infoAction.set("poem", {name: "poem", actions: poem.poemInfo});
infoAction.set("nasa", {name: "nasa", actions: nasa.nasaInfo});

module.exports.infoAction = infoAction;