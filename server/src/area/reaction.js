const test = require('./reaction/test');
const discord = require('./reaction/discord');
const email = require('./reaction/email');

const reaction = new Map();

reaction.set("testReaction", test.testReaction);
reaction.set("sendServerMessages", discord.sendServerMessages);
reaction.set("sendPrivateMessages", discord.sendPrivateMessages);
reaction.set("sendEmail", email.sendEmail);

module.exports.reaction = reaction;



const checkReaction = new Map();

checkReaction.set("testReaction", test.checkTestReaction);
checkReaction.set("sendServerMessages", discord.checkSendServerMessages);
checkReaction.set("sendPrivateMessages", discord.checkSendPrivateMessages);
checkReaction.set("sendEmail", email.checkSendEmail);

module.exports.checkReaction = checkReaction;



const infoReaction = new Map();

//infoReaction.set("testInfo", {name: "testInfo", reactions: test.testInfo});
//infoReaction.set("twitch", {name: "twitch", reactions: test.testInfo});
infoReaction.set("discord", {name: "discord", reactions: discord.discordInfo});
infoReaction.set("email", {name: "email", reactions: email.emailInfo});

module.exports.infoReaction = infoReaction;