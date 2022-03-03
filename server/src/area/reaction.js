const test = require('./reaction/test');
const discord = require('./reaction/discord');

const reaction = new Map();

reaction.set("testReaction", test.testReaction);
reaction.set("sendServerMessages", discord.sendServerMessages);
reaction.set("sendPrivateMessages", discord.sendPrivateMessages);

module.exports.reaction = reaction;



const checkReaction = new Map();

checkReaction.set("testReaction", test.checkTestReaction);
checkReaction.set("sendServerMessages", discord.checkSendServerMessages);
checkReaction.set("sendPrivateMessages", discord.checkSendPrivateMessages);

module.exports.checkReaction = checkReaction;



const infoReaction = new Map();

//infoReaction.set("testInfo", {name: "testInfo", reactions: test.testInfo});
//infoReaction.set("twitch", {name: "twitch", reactions: test.testInfo});
infoReaction.set("discord", {name: "discord", reactions: discord.discordInfo});

module.exports.infoReaction = infoReaction;