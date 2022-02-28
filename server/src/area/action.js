const twitch = require('./action/twitch');
const poem = require('./action/poem');
const nasa = require('./action/nasa');
const youtube = require('./action/youtube');

const action = new Map();

action.set("getStream", twitch.getStream);
action.set("testAction", twitch.testAction);
action.set("getRandomPoem", poem.getRandomPoem);
action.set("getAPOD", nasa.getAPOD);
action.set("NewLike", youtube.NewLike);
action.set("overXLike", youtube.overXLike);

module.exports.action = action;



const checkAction = new Map();

checkAction.set("getStream", twitch.checkGetStream);
checkAction.set("testAction", twitch.checktestAction);
checkAction.set("getRandomPoem", poem.checkGetRandomPoem);
checkAction.set("getAPOD", nasa.checkGetAPOD);
checkAction.set("NewLike", youtube.checkNewLike);
checkAction.set("overXLike", youtube.checkOverXLike);

module.exports.checkAction = checkAction;



const infoAction = new Map();

infoAction.set("twitch", {name: "twitch", actions: twitch.twitchInfo});
infoAction.set("poem", {name: "poem", actions: poem.poemInfo});
infoAction.set("nasa", {name: "nasa", actions: nasa.nasaInfo});
infoAction.set("youtube", {name: "youtube", actions: youtube.youtubeInfo});

module.exports.infoAction = infoAction;