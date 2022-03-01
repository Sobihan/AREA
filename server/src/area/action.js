const twitch = require('./action/twitch');
const poem = require('./action/poem');
const nasa = require('./action/nasa');
const youtube = require('./action/youtube');

const action = new Map();

action.set("getStream", twitch.getStream);
action.set("getRandomPoem", poem.getRandomPoem);
action.set("getAPOD", nasa.getAPOD);
action.set("NewLike", youtube.NewLike);
action.set("overXLike", youtube.overXLike);
action.set("newView", youtube.newView);
action.set("overXView", youtube.overXView);
action.set("newVideos", youtube.newVideos);
action.set("newViewer", youtube.newViewer);

module.exports.action = action;



const checkAction = new Map();

checkAction.set("getStream", twitch.checkGetStream);
checkAction.set("getRandomPoem", poem.checkGetRandomPoem);
checkAction.set("getAPOD", nasa.checkGetAPOD);
checkAction.set("NewLike", youtube.checkNewLike);
checkAction.set("overXLike", youtube.checkOverXLike);
checkAction.set("newView", youtube.checkNewView);
checkAction.set("overXView", youtube.checkOverXView);
checkAction.set("newVideos", youtube.checkNewVideos);
checkAction.set("newViewer", youtube.checkNewViewer);

module.exports.checkAction = checkAction;



const infoAction = new Map();

infoAction.set("twitch", {name: "twitch", actions: twitch.twitchInfo});
infoAction.set("poem", {name: "poem", actions: poem.poemInfo});
infoAction.set("nasa", {name: "nasa", actions: nasa.nasaInfo});
infoAction.set("youtube", {name: "youtube", actions: youtube.youtubeInfo});

module.exports.infoAction = infoAction;